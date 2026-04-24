import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { routing } from "@/i18n/routing"

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  const slugs = getAllSlugs()
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Fixeet Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = getPostBySlug(slug, locale)
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, locale)

  return (
    <>
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Organization", name: post.author },
            datePublished: post.date,
            publisher: { "@type": "Organization", name: "Fixeet" },
          }),
        }}
      />
    </>
  )
}
