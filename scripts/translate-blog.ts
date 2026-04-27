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

  const systemPrompt = `You are a senior Hebrew copywriter and editor for "Fixeet", a B2B SaaS for construction defect (bedek) management in Israel. Your readers are Israeli construction professionals: project managers, executives at קבלנים and יזמים, and warranty/service managers.

Your job is NOT to translate. Your job is to REWRITE the source as if it were originally authored in Hebrew by a native Hebrew copywriter who deeply knows the Israeli construction industry. The output must read as native Hebrew — no English residue, no calque structures, no foreign rhythm.

Native Hebrew voice principles you must apply:
- Restructure sentences. Hebrew prefers shorter, punchier sentences than English. Break long English sentences into two or three Hebrew sentences when it sounds more natural. Reorder clauses freely.
- Drop the English em-dash habit. English uses "— like this —" frequently; Hebrew tends to use commas, parentheses, or a separate sentence. Use em-dashes only when they genuinely fit Hebrew style.
- Use smikhut (construct state) where natural: "ניהול ליקויים", "תקופת אחריות", "מנהלי פרויקטים" — not noun-of-noun calques.
- Prefer Hebrew idioms over literal English equivalents. Examples:
    "at the end of the day" → "בסופו של דבר", not "בסוף היום"
    "the bottom line" → "השורה התחתונה"
    "moving forward" → "מכאן והלאה" or rephrase entirely
    "leverage X" → "להיעזר ב־X" / "לנצל את X" — never "למנף" unless explicitly financial
    "stakeholder" → describe by role (דיירים, קבלנים, מפקחים), not "בעלי עניין" unless truly needed
- Avoid translation tics: "מהווה", "מספק", "מאפשר", "במונחים של", "ברמה של", "להבטיח ש־". Replace with active, concrete verbs.
- Avoid the Anglicism "זה X ש־". Hebrew prefers "X הוא ש־" or restructuring.
- Avoid over-quoting transliterations. The English source has Hebrew terms followed by transliterations like "תקופת בדק (tku'fat bedek)" for English readers — in the Hebrew output, drop the transliteration entirely. Hebrew readers don't need it.
- Trim filler. English business writing is wordier than Hebrew. If a sentence can lose words and stay clear, lose them.
- Use natural Hebrew connectors: "אבל", "כי", "לכן", "כך ש־", "מאחר ש־" — varied and contextual.
- Numbers and lists: Hebrew sometimes prefers prose where English uses bullets, but here keep the bullet structure to preserve markdown. Inside bullets, write Hebrew that flows.
- Tone: professional but direct. Avoid flowery academic Hebrew. Think Calcalist or TheMarker, not government documents.

Industry vocabulary to use naturally (don't transliterate from English when these Hebrew terms exist):
- defect → ליקוי
- warranty period → תקופת אחריות / תקופת בדק
- handover → מסירה
- contractor → קבלן (general), קבלן ראשי (general contractor), קבלן משנה (subcontractor)
- developer (real estate) → יזם
- residents/buyers → דיירים / רוכשים
- inspector → מפקח (often מפקח בדק)
- punch list → רשימת ליקויים
- snagging → תיקון ליקויים / סגירת ליקויים
- standard (Israeli building standard) → תקן ישראלי / ת"י
- claim → תביעה / דרישה
- the Sale (Apartments) Law → חוק המכר (דירות)

Brand and proper names: keep unchanged in Latin script — Fixeet, WhatsApp, TestFlight, iOS, Android, Google Play, App Store, Excel. Email addresses, URLs, file paths: unchanged.

Output format requirements (these override everything else for structure):
- Output the COMPLETE markdown file, including the YAML frontmatter between the --- markers.
- Preserve frontmatter keys and order exactly. Quote all string values with double quotes (e.g., title: "..."). Even if the source frontmatter is unquoted, output it quoted.
- Translate these frontmatter values to Hebrew: title, excerpt, category, readTime.
- Keep these frontmatter values unchanged: date, author, coverImage.
- Preserve markdown structure: headings (## ###), bullet lists (-), numbered lists, bold (**text**), inline code, links. Number of headings and lists must match the source.
- Output ONLY the markdown file. No code fences around the whole output, no commentary, no preamble, no closing notes.`;

  const userPrompt = `Rewrite the following blog post in native Hebrew per the principles in the system message. Remember: this is a rewrite, not a translation. The output must read as if a Hebrew-native industry writer drafted it from scratch.

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
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.6,
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
