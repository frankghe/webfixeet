import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  const teamMembers = ["first", "second", "third"] as const;

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

      {/* Team Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("team.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {teamMembers.map((key) => (
              <Card key={key} className="flex flex-col items-center text-center">
                <CardHeader className="items-center">
                  <div
                    className="size-24 rounded-full bg-muted"
                    role="img"
                    aria-label={t("team.avatarAlt", {
                      name: t(`team.members.${key}.name`),
                    })}
                  />
                  <CardTitle className="mt-4 text-lg">
                    {t(`team.members.${key}.name`)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t(`team.members.${key}.title`)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(`team.members.${key}.bio`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
