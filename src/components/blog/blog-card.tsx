"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog-data"
import { getBlogThumbnail } from "@/components/blog/blog-thumbnails"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("BlogPage")

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full border shadow-sm transition-shadow group-hover:shadow-md">
        <div className="aspect-[16/9] bg-muted/50 rounded-t-xl overflow-hidden">
          {getBlogThumbnail(post.slug)}
        </div>
        <CardHeader>
          <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime}</span>
            </div>
            <Badge variant="secondary">{post.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
