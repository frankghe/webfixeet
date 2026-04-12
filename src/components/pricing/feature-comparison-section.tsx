"use client"

import { useTranslations } from "next-intl"
import { Check, Minus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type FeatureValue = boolean | string

interface Feature {
  labelKey: string
  starter: FeatureValue
  pro: FeatureValue
  enterprise: FeatureValue
}

export function FeatureComparisonSection() {
  const t = useTranslations("PricingPage")

  const features: Feature[] = [
    {
      labelKey: "teamMembers",
      starter: "2",
      pro: "10",
      enterprise: "10+",
    },
    {
      labelKey: "projects",
      starter: t("oneProject"),
      pro: t("oneProjectDepth2"),
      enterprise: t("unlimitedProjects"),
    },
    {
      labelKey: "defects",
      starter: t("unlimited"),
      pro: t("unlimited"),
      enterprise: t("unlimited"),
    },
    {
      labelKey: "defectLifecycle",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "joinOrganizations",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "photoDocumentation",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "videoDocumentation",
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "teamManagement",
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "contractorManagement",
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      labelKey: "visitManagement",
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "projectsProgressDashboard",
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      labelKey: "exportPdf",
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "emailSupport",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      labelKey: "aiScheduling",
      starter: false,
      pro: "optionalAi",
      enterprise: "optionalAi",
    },
    {
      labelKey: "aiDocumentSearch",
      starter: false,
      pro: "optionalAi",
      enterprise: "optionalAi",
    },
  ]

  function renderValue(value: FeatureValue) {
    if (value === "optionalAi") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
          <Sparkles className="size-3.5" />
        </span>
      )
    }
    if (typeof value === "string") {
      return <span className="text-sm font-medium text-foreground">{value}</span>
    }
    return value ? (
      <Check className="mx-auto size-4 text-success" aria-label="Included" />
    ) : (
      <Minus
        className="mx-auto size-4 text-muted-foreground/40"
        aria-label="Not included"
      />
    )
  }

  const tiers = [
    t("starter"),
    t("pro"),
    t("enterprise"),
  ]

  return (
    <section
      aria-label="Feature comparison"
      className="py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t("comparePlans")}
          </h2>
          <p className="text-muted-foreground">{t("comparePlansSubtitle")}</p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-muted/50">
                <th className="py-4 px-6 text-left font-semibold text-foreground w-1/3">
                  {t("feature")}
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier}
                    className="py-4 px-6 text-center font-semibold text-foreground"
                  >
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10 bg-card">
              {features.map((feature) => (
                <tr
                  key={feature.labelKey}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3.5 px-6 font-medium text-foreground">
                    {t(feature.labelKey as Parameters<typeof t>[0])}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    {renderValue(feature.starter)}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    {renderValue(feature.pro)}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    {renderValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-6">
          {(["starter", "pro", "enterprise"] as const).map(
            (tierKey, tierIdx) => {
              const tierName = tiers[tierIdx]
              return (
                <div
                  key={tierKey}
                  className="rounded-xl ring-1 ring-foreground/10 overflow-hidden"
                >
                  <div className="bg-muted/50 px-4 py-3 border-b border-foreground/10">
                    <h3 className="font-semibold text-foreground">{tierName}</h3>
                  </div>
                  <div className="bg-card divide-y divide-foreground/10">
                    {features.map((feature) => {
                      const value = feature[tierKey]
                      return (
                        <div
                          key={feature.labelKey}
                          className={cn(
                            "flex items-center justify-between px-4 py-3",
                            typeof value === "boolean" &&
                              !value &&
                              "opacity-60"
                          )}
                        >
                          <span className="text-sm text-foreground">
                            {t(feature.labelKey as Parameters<typeof t>[0])}
                          </span>
                          <span className="ml-4 shrink-0">
                            {renderValue(value)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}
