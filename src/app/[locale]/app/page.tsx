import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
            <Badge className="mb-4 bg-accent text-accent-foreground">
              {t("hero.badge")}
            </Badge>
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
                    <Link
                      href="/contact?ref=alpha"
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
                  viewBox="0 0 192 192"
                  aria-hidden="true"
                >
                  <path fill="none" d="M0 0h192v192H0V0z" />
                  <path
                    fill="#4285F4"
                    d="M21.7 22.592c-.4 1.599-.7 3.298-.7 5.097v136.522c0 1.799.2 3.398.7 5.097l76.052-75.357L21.7 22.592z"
                  />
                  <path
                    fill="#34A853"
                    d="m95.753 95.95 38.076-37.679-82.748-47.473C47.983 8.999 44.485 8 40.887 8 31.693 8 23.998 14.196 21.7 22.592L95.753 95.95z"
                  />
                  <path
                    fill="#EA4335"
                    d="M95.153 92.052 21.6 169.308v.1C23.898 177.804 31.593 184 40.788 184c3.698 0 7.096-.999 10.094-2.698l.2-.1 82.748-47.273-38.677-41.877z"
                  />
                  <path
                    fill="#FBBC04"
                    d="m169.507 78.86-35.778-20.588-40.175 35.48 40.375 39.977 35.578-20.288c6.196-3.298 10.493-9.794 10.493-17.29-.1-7.497-4.297-13.993-10.493-17.291z"
                  />
                </svg>
              </div>
              <h2 className="text-center text-xl font-semibold">
                {t("platforms.android.name")}
              </h2>
              <p className="mt-3 flex-1 text-center text-muted-foreground">
                {t("platforms.android.description")}
              </p>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  render={
                    <Link
                      href="/contact?ref=alpha"
                      data-track="app-page-android-cta"
                    />
                  }
                >
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
              <div className="mt-6">
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  render={
                    <Link
                      href="/contact?ref=alpha"
                      data-track="app-page-ios-cta"
                    />
                  }
                >
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
