"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/" as const, labelKey: "home" as const },
  { href: "/about" as const, labelKey: "about" as const },
  { href: "/contact" as const, labelKey: "contact" as const },
];

const localeLabels: Record<string, string> = {
  en: "EN",
  he: "עב",
};

export function Header() {
  const t = useTranslations("Navigation");
  const params = useParams();
  const locale = (params?.locale as string) ?? "he";
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-18 backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
          : "bg-muted/60"
      )}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 text-3xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="text-accent">Fix</span>
          <span>eet</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, labelKey }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "text-lg font-medium text-foreground underline underline-offset-4"
                    : "text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right side: language switcher + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Inline locale buttons */}
          <div className="flex items-center gap-0 text-sm">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1.5 text-muted-foreground select-none">
                    |
                  </span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "transition-colors",
                    loc === locale
                      ? "font-bold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {localeLabels[loc] ?? loc.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            data-track="header-request-demo"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90 px-5 text-base font-semibold"
            )}
          >
            {t("requestDemo")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t("openMenu")}
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-72 px-6 py-8">
            <SheetTitle className="sr-only">{t("openMenu")}</SheetTitle>

            {/* Logo */}
            <Link
              href="/"
              className="mb-6 inline-block text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
              onClick={() => setOpen(false)}
            >
              <span className="text-accent">Fix</span>
              <span>eet</span>
            </Link>

            {/* Mobile nav links */}
            <nav className="flex flex-col">
              {navLinks.map(({ href, labelKey }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-3 text-sm font-medium border-b border-border/40 last:border-0 transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t(labelKey)}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile language switcher */}
            <div className="mt-6 flex items-center gap-0 text-sm">
              {routing.locales.map((loc, i) => (
                <span key={loc} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-1.5 text-muted-foreground select-none">
                      |
                    </span>
                  )}
                  <button
                    onClick={() => {
                      switchLocale(loc);
                      setOpen(false);
                    }}
                    className={cn(
                      "transition-colors",
                      loc === locale
                        ? "font-bold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {localeLabels[loc] ?? loc.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Mobile CTA */}
            <Link
              href="/contact"
              data-track="mobile-request-demo"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              )}
            >
              {t("requestDemo")}
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
