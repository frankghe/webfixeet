"use client"

import { useTranslations } from "next-intl"
import { Check, Minus, Sparkles } from "lucide-react"
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
      price: t("free"),
      priceDetail: null,
      cta: t("getStarted"),
      ctaHref: "/app",
      highlighted: false,
      disabled: false,
      features: [
        { label: t("upToMembers", { count: 2 }), included: true },
        { label: t("oneProject"), included: true },
        { label: t("unlimited") + " " + t("defects").toLowerCase(), included: true },
        { label: t("defectLifecycle"), included: true },
        { label: t("joinOrganizations"), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: false },
        { label: t("teamManagement"), included: false },
        { label: t("contractorManagement"), included: false },
        { label: t("visitManagement"), included: false },
        { label: t("emailSupport"), included: true },
      ],
      optionalAi: false,
    },
    {
      key: "pro",
      name: t("pro"),
      audience: t("proAudience"),
      description: t("proDesc"),
      price: `${t("nis")}99`,
      priceDetail: t("perMonthPerUser"),
      cta: t("comingSoon"),
      ctaHref: "/contact",
      highlighted: false,
      disabled: true,
      features: [
        { label: t("upToMembers", { count: 10 }), included: true },
        { label: t("oneProjectDepth2"), included: true },
        { label: t("unlimited") + " " + t("defects").toLowerCase(), included: true },
        { label: t("defectLifecycle"), included: true },
        { label: t("joinOrganizations"), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: true },
        { label: t("teamManagement"), included: true },
        { label: t("contractorManagement"), included: false },
        { label: t("visitManagement"), included: true },
        { label: t("emailSupport"), included: true },
      ],
      optionalAi: true,
    },
    {
      key: "enterprise",
      name: t("enterprise"),
      audience: t("enterpriseAudience"),
      description: t("enterpriseDesc"),
      price: `${t("nis")}79`,
      priceDetail: t("perMonthPerUser"),
      cta: t("comingSoon"),
      ctaHref: "/contact",
      highlighted: false,
      disabled: true,
      features: [
        { label: t("startsFrom", { count: 10 }), included: true },
        { label: t("unlimitedProjects") + " · " + t("unlimitedDepth"), included: true },
        { label: t("unlimited") + " " + t("defects").toLowerCase(), included: true },
        { label: t("defectLifecycle"), included: true },
        { label: t("joinOrganizations"), included: true },
        { label: t("photoDocumentation"), included: true },
        { label: t("videoDocumentation"), included: true },
        { label: t("teamManagement"), included: true },
        { label: t("contractorManagement"), included: true },
        { label: t("visitManagement"), included: true },
        { label: t("projectsProgressDashboard"), included: true },
        { label: t("emailSupport"), included: true },
      ],
      optionalAi: true,
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
              className="relative flex flex-col"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">
                  {tier.audience}
                </p>
                <CardDescription className="mt-1">{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.priceDetail && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {tier.priceDetail}
                    </p>
                  )}
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
                {tier.optionalAi && (
                  <div className="mt-4 pt-4 border-t border-foreground/10">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {t("optionalAi")}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2.5">
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span className="text-sm text-foreground">{t("aiScheduling")}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span className="text-sm text-foreground">{t("aiDocumentSearch")}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {tier.disabled ? (
                  <span
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                      }),
                      "w-full pointer-events-none opacity-50"
                    )}
                    aria-disabled="true"
                  >
                    {tier.cta}
                  </span>
                ) : (
                  <Link
                    href={tier.ctaHref}
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    )}
                  >
                    {tier.cta}
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
