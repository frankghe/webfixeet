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
  const t = await getTranslations({ locale, namespace: "Terms" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://fixeet.co/${locale}/terms`,
      languages: {
        he: "https://fixeet.co/he/terms",
        en: "https://fixeet.co/en/terms",
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });

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

            {/* Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-bold">{t("acceptance.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("acceptance.body")}</p>
            </div>

            {/* Use of Services */}
            <div>
              <h2 className="text-2xl font-bold">{t("useOfServices.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("useOfServices.body")}</p>
            </div>

            {/* User Accounts */}
            <div>
              <h2 className="text-2xl font-bold">{t("userAccounts.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("userAccounts.body")}</p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold">{t("intellectualProperty.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("intellectualProperty.body")}</p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold">{t("limitationOfLiability.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("limitationOfLiability.body")}</p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold">{t("termination.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("termination.body")}</p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold">{t("changesToTerms.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("changesToTerms.body")}</p>
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
