import type { Metadata } from "next"
import { use } from "react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { PricingHeaderSection } from "@/components/pricing/pricing-header-section"
import { PricingTiersSection } from "@/components/pricing/pricing-tiers-section"
import { FeatureComparisonSection } from "@/components/pricing/feature-comparison-section"
import { EnterpriseCtaSection } from "@/components/pricing/enterprise-cta-section"
import { FaqSection } from "@/components/pricing/faq-section"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  return {
    title: t("pricing.title"),
    description: t("pricing.description"),
    openGraph: {
      title: `${t("pricing.title")} | Fixeet`,
      description: t("pricing.description"),
    },
  }
}

export default function PricingPage({ params }: Props) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return (
    <>
      <PricingHeaderSection />
      <PricingTiersSection />
      <FeatureComparisonSection />
      <EnterpriseCtaSection />
      <FaqSection />
    </>
  )
}
