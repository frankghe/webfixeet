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
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://fixeet.co/${locale}/privacy`,
      languages: {
        he: "https://fixeet.co/he/privacy",
        en: "https://fixeet.co/en/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <>
      {/* Title Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">

            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold">{t("introduction.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("introduction.body")}</p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold">{t("informationWeCollect.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("informationWeCollect.body")}</p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold">{t("howWeUse.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("howWeUse.body")}</p>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold">{t("dataSharing.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("dataSharing.body")}</p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold">{t("dataSecurity.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("dataSecurity.body")}</p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold">{t("yourRights.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("yourRights.body")}</p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl font-bold">{t("contactUs.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("contactUs.body")}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
