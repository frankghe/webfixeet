"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { BlogCategory } from "@/lib/blog-types"

interface CategoryFilterProps {
  categories: BlogCategory[]
  selected: BlogCategory | null
  onSelect: (category: BlogCategory | null) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const t = useTranslations("BlogPage")

  return (
    <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
      <button
        role="tab"
        aria-selected={selected === null}
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          selected === null
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        {t("all")}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={selected === category}
          onClick={() => onSelect(category)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            selected === category
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
