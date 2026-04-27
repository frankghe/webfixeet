/**
 * Blog translation script — translates blog posts from English to Hebrew via OpenAI.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/translate-blog.ts <slug> [<slug2> ...]
 *
 * Reads content/blog/en/<slug>.md, sends to OpenAI gpt-4o, and writes
 * content/blog/he/<slug>.md (overwriting any existing translation).
 *
 * Frontmatter handling (instructed via prompt, enforced by the model):
 *   - title, excerpt, category, readTime are translated to Hebrew
 *   - date, author, coverImage are kept unchanged
 *
 * Body: translated to natural Hebrew while preserving all markdown formatting.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_EN = resolve(__dirname, "..", "content", "blog", "en");
const BLOG_HE = resolve(__dirname, "..", "content", "blog", "he");

async function translateMarkdown(source: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is required.\n" +
        "Usage: OPENAI_API_KEY=sk-... npx tsx scripts/translate-blog.ts <slug>"
    );
  }

  const prompt = `Translate the following markdown blog post from English to Hebrew for a construction defect management SaaS product called "Fixeet".

Rules:
- Output the COMPLETE markdown file, including the YAML frontmatter (between the --- markers).
- Preserve the frontmatter structure exactly: same keys, same order. Quote string values with double quotes (e.g. title: "...").
- Translate these frontmatter values to Hebrew: title, excerpt, category, readTime.
- Keep these frontmatter values unchanged: date, author, coverImage.
- Translate the markdown body to natural, professional Hebrew suitable for a B2B SaaS audience in the Israeli construction industry.
- Preserve ALL markdown formatting exactly: headings (##, ###), bullet lists (-), numbered lists (1., 2.), bold (**text**), inline code, links.
- Keep brand names unchanged: Fixeet, WhatsApp, TestFlight, iOS, Android, Google Play, App Store, Excel.
- Keep Hebrew legal/domain terms that already appear in the English source as Hebrew (e.g., תקופת בדק, חוק המכר, ליקוי, מסירה, תקן ישראלי). When the English source has a Hebrew term followed by a parenthetical transliteration like "תקופת בדק (tku'fat bedek)", keep both in the Hebrew output exactly the same way.
- Keep email addresses, URLs, and file paths unchanged.
- Output ONLY the translated markdown file. No code fences, no commentary, no preamble.

---SOURCE START---
${source}
---SOURCE END---`;

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

  // Strip markdown code fencing if the model added it despite instructions
  if (content.startsWith("```")) {
    content = content
      .replace(/^```(?:markdown|md)?\n?/, "")
      .replace(/\n?```$/, "");
  }

  return content;
}

async function translateOne(slug: string): Promise<void> {
  const enPath = resolve(BLOG_EN, `${slug}.md`);
  const hePath = resolve(BLOG_HE, `${slug}.md`);

  console.log(`Translating ${slug}...`);
  const source = readFileSync(enPath, "utf-8");
  const translated = await translateMarkdown(source);

  const final = translated.endsWith("\n") ? translated : translated + "\n";
  writeFileSync(hePath, final, "utf-8");
  console.log(`  wrote ${hePath}`);
}

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    console.error(
      "Usage: npx tsx scripts/translate-blog.ts <slug> [<slug2> ...]"
    );
    process.exit(1);
  }

  for (const slug of slugs) {
    await translateOne(slug);
  }

  console.log(`Done. Translated ${slugs.length} blog post(s).`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
