export type BlogCategory = "Defect Management" | "Construction Tech" | "Best Practices" | "Industry Insights"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  author: string
  date: string
  readTime: string
  body: string
}

export const categories: BlogCategory[] = [
  "Defect Management",
  "Construction Tech",
  "Best Practices",
  "Industry Insights",
]

export const blogPosts: BlogPost[] = [
  {
    slug: "streamlining-construction-defect-tracking",
    title: "Streamlining Construction Defect Tracking",
    excerpt: "How digital tools are replacing spreadsheets and WhatsApp groups for managing construction defects during the warranty period.",
    category: "Defect Management",
    author: "Fixeet Team",
    date: "2026-03-20",
    readTime: "5 min read",
    body: "",
  },
  {
    slug: "reducing-repeat-visits-construction-sites",
    title: "5 Ways to Reduce Repeat Visits to Construction Sites",
    excerpt: "Practical strategies for getting defect repairs right the first time, saving time and money for contractors and residents alike.",
    category: "Best Practices",
    author: "Fixeet Team",
    date: "2026-03-15",
    readTime: "4 min read",
    body: "",
  },
  {
    slug: "warranty-period-management-israel",
    title: "Construction Warranty Period Management in Israel",
    excerpt: "Understanding the unique challenges of the bedek period in Israeli construction and how technology is transforming the process.",
    category: "Industry Insights",
    author: "Fixeet Team",
    date: "2026-03-10",
    readTime: "6 min read",
    body: "",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit)
}
