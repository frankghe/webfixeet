import type { Metadata } from "next"
import { use } from "react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getAllPosts } from "@/lib/blog"
import { BlogHeaderSection } from "@/components/blog/blog-header-section"
import { BlogListingSection } from "@/components/blog/blog-listing-section"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return {
    title: t("blog.title"),
    description: t("blog.description"),
    openGraph: {
      title: `${t("blog.title")} | Fixeet`,
      description: t("blog.description"),
    },
  }
}

export default function BlogPage({ params }: Props) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const posts = getAllPosts(locale)

  return (
    <>
      <BlogHeaderSection />
      <BlogListingSection posts={posts} />
    </>
  )
}
