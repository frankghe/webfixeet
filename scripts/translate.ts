/**
 * Translation script — syncs Hebrew translations from English source using OpenAI.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/translate.ts
 *
 * What it does:
 *   1. Reads messages/en.json and messages/he.json
 *   2. Finds all English strings missing from the Hebrew file
 *   3. Sends them in a single batched OpenAI request
 *   4. Merges the translations back into messages/he.json
 *
 * The script preserves existing Hebrew translations — it only fills in missing keys.
 * To force re-translation of a key, delete it from he.json first.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = resolve(__dirname, "..", "messages");
const EN_PATH = resolve(MESSAGES_DIR, "en.json");
const HE_PATH = resolve(MESSAGES_DIR, "he.json");

type JsonValue = string | number | boolean | null | JsonObj;
type JsonObj = { [key: string]: JsonValue };

/** Flatten a nested object into dot-separated key/value pairs (strings only). */
function flatten(obj: JsonObj, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[path] = value;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flatten(value as JsonObj, path));
    }
  }
  return result;
}

/** Unflatten dot-separated keys back into a nested object. */
function unflatten(flat: Record<string, string>): JsonObj {
  const result: JsonObj = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current: JsonObj = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current) || typeof current[parts[i]] !== "object") {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as JsonObj;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

/** Deep merge source into target (target values take precedence). */
function deepMerge(target: JsonObj, source: JsonObj): JsonObj {
  const result = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (
      key in result &&
      typeof result[key] === "object" &&
      result[key] !== null &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      result[key] = deepMerge(result[key] as JsonObj, value as JsonObj);
    } else if (!(key in result)) {
      result[key] = value;
    }
  }
  return result;
}

/** Reorder keys in obj to match the order in reference. */
function reorderKeys(obj: JsonObj, reference: JsonObj): JsonObj {
  const result: JsonObj = {};
  for (const key of Object.keys(reference)) {
    if (key in obj) {
      const refVal = reference[key];
      const objVal = obj[key];
      if (
        typeof refVal === "object" &&
        refVal !== null &&
        typeof objVal === "object" &&
        objVal !== null &&
        !Array.isArray(refVal) &&
        !Array.isArray(objVal)
      ) {
        result[key] = reorderKeys(objVal as JsonObj, refVal as JsonObj);
      } else {
        result[key] = objVal;
      }
    }
  }
  // Add any keys in obj not in reference at the end
  for (const key of Object.keys(obj)) {
    if (!(key in result)) {
      result[key] = obj[key];
    }
  }
  return result;
}

async function translateBatch(
  texts: Record<string, string>
): Promise<Record<string, string>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is required.\n" +
        "Usage: OPENAI_API_KEY=sk-... npx tsx scripts/translate.ts"
    );
  }

  const prompt = `Translate the following UI strings from English to Hebrew for a construction defect management SaaS product called "Fixeet".

Rules:
- Keep brand names unchanged: Fixeet, TestFlight, iOS, Android, Google Play, App Store
- Keep email addresses, URLs, and technical terms unchanged
- Keep placeholder patterns like {author}, {name} unchanged
- Use natural, professional Hebrew suitable for a B2B SaaS product
- Return ONLY a JSON object with the same keys and Hebrew translations as values
- No markdown fencing, no explanation — just the JSON object

${JSON.stringify(texts, null, 2)}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  let content: string = data.choices[0].message.content.trim();

  // Strip markdown fencing if present
  if (content.startsWith("```")) {
    content = content.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(content);
}

async function main() {
  const en: JsonObj = JSON.parse(readFileSync(EN_PATH, "utf-8"));
  const he: JsonObj = JSON.parse(readFileSync(HE_PATH, "utf-8"));

  const flatEn = flatten(en);
  const flatHe = flatten(he);

  // Find keys present in English but missing in Hebrew
  const missing: Record<string, string> = {};
  for (const [key, value] of Object.entries(flatEn)) {
    if (!(key in flatHe)) {
      missing[key] = value;
    }
  }

  const missingCount = Object.keys(missing).length;

  if (missingCount === 0) {
    console.log("All translations are up to date.");
    return;
  }

  console.log(`Found ${missingCount} missing translation(s). Translating...`);

  const translated = await translateBatch(missing);

  // Merge translations into Hebrew file
  const translatedNested = unflatten(translated);
  const merged = deepMerge(he, translatedNested);

  // Reorder keys to match English file structure
  const ordered = reorderKeys(merged, en);

  writeFileSync(HE_PATH, JSON.stringify(ordered, null, 2) + "\n", "utf-8");

  console.log(
    `Done. Translated ${Object.keys(translated).length} string(s) and wrote ${HE_PATH}.`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
