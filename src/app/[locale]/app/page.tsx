import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "App" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://fixeet.co/${locale}/app`,
      languages: {
        he: "https://fixeet.co/he/app",
        en: "https://fixeet.co/en/app",
      },
    },
  };
}

export default async function AppPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "App" });

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Platform Cards Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Web App Card */}
            <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h2 className="text-center text-xl font-semibold">
                {t("platforms.web.name")}
              </h2>
              <p className="mt-3 flex-1 text-center text-muted-foreground">
                {t("platforms.web.description")}
              </p>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  render={
                    <a
                      href="https://app.fixeet.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="app-page-web-cta"
                    />
                  }
                >
                  {t("platforms.web.cta")}
                </Button>
              </div>
            </div>

            {/* Android Card */}
            <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#34A853"
                    d="M1 2.43c0-.33.09-.65.25-.93L12.04 12 1.25 22.5A1.77 1.77 0 0 1 1 21.57V2.43z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M17.25 7.26 12.04 12l5.21 4.74 3.6-2.06c.66-.38 1.06-1.06 1.06-1.8 0-.74-.4-1.42-1.06-1.8l-3.6-2.82z"
                  />
                  <path
                    fill="#4285F4"
                    d="m1.25 22.5 10.79-10.5 5.21 4.74-13.13 7.2a1.77 1.77 0 0 1-2.87-1.44z"
                  />
                  <path
                    fill="#EA4335"
                    d="M17.25 7.26 4.12 .06A1.77 1.77 0 0 0 1.25 1.5L12.04 12l5.21-4.74z"
                  />
                </svg>
              </div>
              <h2 className="text-center text-xl font-semibold">
                {t("platforms.android.name")}
              </h2>
              <p className="mt-3 flex-1 text-center text-muted-foreground">
                {t("platforms.android.description")}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <Badge variant="secondary">{t("comingSoon")}</Badge>
                <Button size="lg" className="w-full" disabled>
                  {t("platforms.android.cta")}
                </Button>
              </div>
            </div>

            {/* iOS Card */}
            <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#555"
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
              </div>
              <h2 className="text-center text-xl font-semibold">
                {t("platforms.ios.name")}
              </h2>
              <p className="mt-3 flex-1 text-center text-muted-foreground">
                {t("platforms.ios.description")}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <Badge variant="secondary">{t("comingSoon")}</Badge>
                <Button size="lg" className="w-full" disabled>
                  {t("platforms.ios.cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
