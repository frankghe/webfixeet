"use client"

import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"

export function EnterpriseCtaSection() {
  const t = useTranslations("PricingPage")

  return (
    <section
      aria-label="Enterprise contact"
      className="py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-muted/50 ring-1 ring-foreground/10 px-8 py-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t("needCustomPlan")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("needCustomPlanDesc")}
          </p>
          <div>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "bg-accent text-accent-foreground hover:bg-accent/90")}
            >
              {t("contactForEnterprise")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
