"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog-data"

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const t = useTranslations("BlogPage")

  const paragraphs = post.body.split("\n\n")

  return (
    <article className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToBlog")}
        </Link>

        <header className="mb-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{t("by", { author: post.author })}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime}</span>
            <Badge variant="secondary">{post.category}</Badge>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            return (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {relatedPosts.length > 0 && (
          <section aria-label="Related posts" className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("relatedPosts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <Card className="h-full border shadow-sm transition-shadow group-hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base group-hover:text-accent transition-colors line-clamp-2">
                        {related.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
