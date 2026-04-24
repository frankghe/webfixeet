import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogCategory, BlogPost } from "./blog-types"

export type { BlogCategory, BlogPost }
export { categories } from "./blog-types"

const CONTENT_DIR = path.join(process.cwd(), "content/blog")

function readMarkdownFile(filePath: string): BlogPost | null {
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    slug: path.basename(filePath, ".md"),
    title: data.title,
    excerpt: data.excerpt,
    category: data.category as BlogCategory,
    author: data.author,
    date: data.date,
    readTime: data.readTime,
    coverImage: data.coverImage || "",
    body: content.trim(),
  }
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  let post = readMarkdownFile(path.join(CONTENT_DIR, locale, `${slug}.md`))
  if (!post && locale !== "he") {
    post = readMarkdownFile(path.join(CONTENT_DIR, "he", `${slug}.md`))
    if (post) post.isUntranslated = true
  }
  return post
}

export function getAllPosts(locale: string): BlogPost[] {
  const localeDir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(localeDir)) return []
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".md"))
  const posts = files
    .map((f) => readMarkdownFile(path.join(localeDir, f)))
    .filter((p): p is BlogPost => p !== null)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllSlugs(): string[] {
  const heDir = path.join(CONTENT_DIR, "he")
  if (!fs.existsSync(heDir)) return []
  return fs
    .readdirSync(heDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getRelatedPosts(
  slug: string,
  locale: string,
  limit = 3
): BlogPost[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
}
