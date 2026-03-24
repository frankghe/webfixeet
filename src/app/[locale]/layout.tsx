import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const baseUrl = "https://fixeet.co";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title.default"),
      template: t("title.template"),
    },
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        he: `${baseUrl}/he`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Fixeet",
      title: t("title.default"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      locale: locale === "he" ? "he_IL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = locale === "he" ? "rtl" : "ltr";
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:start-4 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
          >
            {tNav("skipToContent")}
          </a>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {/* Analytics placeholder: inject analytics scripts here (e.g., Google Analytics, Plausible) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fixeet",
              url: "https://fixeet.co",
              description:
                "Fixeet connects you with trusted professionals for construction defect management and resolution.",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
