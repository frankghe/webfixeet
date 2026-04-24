export type BlogCategory = "Defect Management" | "Construction Tech" | "Best Practices" | "Industry Insights"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  author: string
  date: string
  readTime: string
  coverImage: string
  body: string
  isUntranslated?: boolean
}

export const categories: BlogCategory[] = [
  "Defect Management",
  "Construction Tech",
  "Best Practices",
  "Industry Insights",
]
