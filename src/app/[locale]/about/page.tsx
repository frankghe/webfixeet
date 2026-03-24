import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://fixeet.co/${locale}/about`,
      languages: {
        he: "https://fixeet.co/he/about",
        en: "https://fixeet.co/en/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <>
      {/* Company Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("mission.title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("mission.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Deep-Dive Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("problemDeepDive.title")}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            <p className="text-muted-foreground">
              {t("problemDeepDive.marketPain")}
            </p>
            <p className="text-muted-foreground">
              {t("problemDeepDive.existingTools")}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">{t("vision.title")}</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("vision.description")}
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
