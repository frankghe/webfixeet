"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { categories, type BlogCategory, type BlogPost } from "@/lib/blog-types"
import { CategoryFilter } from "./category-filter"
import { BlogCard } from "./blog-card"

interface BlogListingSectionProps {
  posts: BlogPost[]
}

export function BlogListingSection({ posts }: BlogListingSectionProps) {
  const t = useTranslations("BlogPage")

  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null)

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts

  return (
    <section aria-label="Blog articles" className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">{t("noArticles")}</p>
        )}

        <div className="flex justify-center pt-4">
          <span className="text-sm text-muted-foreground italic">{t("moreArticlesComing")}</span>
        </div>
      </div>
    </section>
  )
}
