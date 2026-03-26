"use client"

import { useTranslations } from "next-intl"

export function BlogHeaderSection() {
  const t = useTranslations("BlogPage")

  return (
    <section aria-label="Blog overview" className="pt-16 pb-8 lg:pt-20 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>
    </section>
  )
}
