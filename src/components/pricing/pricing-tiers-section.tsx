"use client"

import { useTranslations } from "next-intl"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Link } from "@/i18n/navigation"

export function PricingTiersSection() {
  const t = useTranslations("PricingPage")

  const tiers = [
    {
      key: "starter",
      name: t("starter"),
      audience: t("starterAudience"),
      description: t("starterDesc"),
      price: t("comingSoon"),
      cta: t("getStarted"),
      ctaHref: "/contact",
      highlighted: false,
      features: [
        { label: t("projectsPerMonth", { count: 5 }), included: true },
        { label: t("defectsPerMonth", { count: 50 }), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: false },
        { label: t("basicReporting"), included: true },
        { label: t("advancedReporting"), included: false },
        { label: t("multiStakeholderAccess"), included: false },
        { label: t("visitScheduling"), included: false },
        { label: t("emailSupport"), included: true },
        { label: t("prioritySupport"), included: false },
        { label: t("dedicatedAM"), included: false },
        { label: t("customIntegrations"), included: false },
        { label: t("apiAccess"), included: false },
      ],
    },
    {
      key: "professional",
      name: t("professional"),
      audience: t("professionalAudience"),
      description: t("professionalDesc"),
      price: t("comingSoon"),
      cta: t("getStarted"),
      ctaHref: "/contact",
      highlighted: true,
      badge: t("mostPopular"),
      features: [
        { label: t("projectsPerMonth", { count: 25 }), included: true },
        { label: t("defectsPerMonth", { count: 500 }), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: true },
        { label: t("basicReporting"), included: true },
        { label: t("advancedReporting"), included: true },
        { label: t("multiStakeholderAccess"), included: true },
        { label: t("visitScheduling"), included: true },
        { label: t("emailSupport"), included: true },
        { label: t("prioritySupport"), included: true },
        { label: t("dedicatedAM"), included: false },
        { label: t("customIntegrations"), included: false },
        { label: t("apiAccess"), included: false },
      ],
    },
    {
      key: "enterprise",
      name: t("enterprise"),
      audience: t("enterpriseAudience"),
      description: t("enterpriseDesc"),
      price: t("custom"),
      cta: t("contactUs"),
      ctaHref: "/contact",
      highlighted: false,
      features: [
        { label: t("unlimitedProjects"), included: true },
        { label: t("unlimitedDefects"), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: true },
        { label: t("basicReporting"), included: true },
        { label: t("advancedReporting"), included: true },
        { label: t("multiStakeholderAccess"), included: true },
        { label: t("visitScheduling"), included: true },
        { label: t("emailSupport"), included: true },
        { label: t("prioritySupport"), included: true },
        { label: t("dedicatedAM"), included: true },
        { label: t("customIntegrations"), included: true },
        { label: t("apiAccess"), included: true },
      ],
    },
  ]

  return (
    <section
      aria-label="Pricing tiers"
      className="py-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.key}
              className={cn(
                "relative flex flex-col overflow-visible",
                tier.highlighted &&
                  "ring-2 ring-accent/20 border-accent shadow-lg mt-4 lg:mt-0"
              )}
            >
              {tier.highlighted && tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground whitespace-nowrap shadow-sm">
                    {tier.badge}
                  </span>
                </div>
              )}
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">
                  {tier.audience}
                </p>
                <CardDescription className="mt-1">{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-foreground">
                    {tier.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <ul className="space-y-2.5">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      ) : (
                        <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/60"
                        )}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href={tier.ctaHref}
                  className={cn(
                    buttonVariants({
                      variant: tier.highlighted ? "default" : "outline",
                      size: "lg",
                    }),
                    "w-full",
                    tier.highlighted && "bg-accent text-accent-foreground hover:bg-accent/90"
                  )}
                >
                  {tier.cta}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
