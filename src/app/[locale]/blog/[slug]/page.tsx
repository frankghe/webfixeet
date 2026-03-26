import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { routing } from "@/i18n/routing"

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: "BlogPosts" })
  const post = getPostBySlug(slug)
  if (!post) return {}

  const title = t(`${slug}.title`)
  const excerpt = t(`${slug}.excerpt`)

  return {
    title,
    description: excerpt,
    openGraph: {
      title: `${title} | Fixeet Blog`,
      description: excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "BlogPosts" })

  const translatedPost = {
    ...post,
    title: t(`${slug}.title`),
    excerpt: t(`${slug}.excerpt`),
    body: t(`${slug}.body`),
  }

  const relatedPosts = getRelatedPosts(slug).map((rp) => ({
    ...rp,
    title: t(`${rp.slug}.title`),
    excerpt: t(`${rp.slug}.excerpt`),
  }))

  return (
    <>
      <BlogPostContent post={translatedPost} relatedPosts={relatedPosts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: translatedPost.title,
            description: translatedPost.excerpt,
            author: { "@type": "Organization", name: post.author },
            datePublished: post.date,
            publisher: { "@type": "Organization", name: "Fixeet" },
          }),
        }}
      />
    </>
  )
}
