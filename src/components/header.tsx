"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/" as const, labelKey: "home" as const },
  { href: "/about" as const, labelKey: "about" as const },
  { href: "/contact" as const, labelKey: "contact" as const },
];

export function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "he" ? "en" : "he";
  const isRTL = locale === "he";
  const sheetSide = isRTL ? "left" : "right";

  function switchLanguage() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          Fixeet
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, labelKey }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "text-sm font-medium text-foreground underline underline-offset-4"
                    : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right side: language switcher + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={switchLanguage}>
            {t("languageSwitcher")}
          </Button>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            render={<Link href="/contact" />}
          >
            {t("requestDemo")}
          </Button>
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

          <SheetContent side={sheetSide} showCloseButton={false} className="p-0">
            {/* Visually hidden title for accessibility */}
            <SheetTitle className="sr-only">{t("openMenu")}</SheetTitle>

            {/* Sheet header with close button using logical properties */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link
                href="/"
                className="text-lg font-bold text-foreground"
                onClick={() => setOpen(false)}
              >
                Fixeet
              </Link>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("closeMenu")}
                  />
                }
              >
                <X className="size-5" />
              </SheetClose>
            </div>

            {/* Mobile nav links */}
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map(({ href, labelKey }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={
                      isActive
                        ? "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-muted"
                        : "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    }
                  >
                    {t(labelKey)}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile language switcher + CTA */}
            <div className="flex flex-col gap-3 border-t border-border px-4 py-4 mt-auto">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  switchLanguage();
                  setOpen(false);
                }}
              >
                {t("languageSwitcher")}
              </Button>
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                render={<Link href="/contact" onClick={() => setOpen(false)} />}
              >
                {t("requestDemo")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
