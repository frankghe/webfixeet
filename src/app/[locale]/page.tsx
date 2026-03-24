import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  CalendarCheck,
  Eye,
  Users,
  UserCheck,
  Building2,
  HardHat,
  Key,
  Quote,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const problemPoints = [
    { key: "chasing" as const, icon: CircleAlert },
    { key: "frustration" as const, icon: CircleAlert },
    { key: "incomplete" as const, icon: CircleAlert },
    { key: "noVisibility" as const, icon: CircleAlert },
  ];

  const solutionPoints = [
    { key: "connected" as const, icon: CheckCircle2 },
    { key: "tracked" as const, icon: CheckCircle2 },
    { key: "visibility" as const, icon: CheckCircle2 },
  ];

  const features = [
    { key: "defectReporting" as const, icon: Camera },
    { key: "visitScheduling" as const, icon: CalendarCheck },
    { key: "realTimeStatus" as const, icon: Eye },
    { key: "multiStakeholder" as const, icon: Users },
  ];

  const audiences = [
    { key: "inspector" as const, icon: UserCheck },
    { key: "constructionCompany" as const, icon: Building2 },
    { key: "contractor" as const, icon: HardHat },
    { key: "apartmentOwner" as const, icon: Key },
  ];

  const testimonials = ["first", "second", "third"] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-start">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  render={<Link href="/contact" data-track="hero-request-demo" />}
                >
                  {t("hero.cta")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  render={<a href="#features" data-track="hero-learn-more" />}
                >
                  {t("hero.learnMore")}
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div
                className="aspect-video w-full max-w-xl rounded-lg bg-muted"
                role="img"
                aria-label={t("hero.imageAlt")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("problem.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {problemPoints.map(({ key, icon: Icon }) => (
              <Card key={key}>
                <CardContent className="flex items-start gap-4">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
                  <p>{t(`problem.points.${key}`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("solution.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {solutionPoints.map(({ key, icon: Icon }) => (
              <div key={key} className="flex flex-col items-center text-center">
                <Icon aria-hidden="true" className="size-8 text-accent" />
                <p className="mt-4 text-lg">{t(`solution.points.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("features.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ key, icon: Icon }) => (
              <Card key={key}>
                <CardHeader>
                  <Icon aria-hidden="true" className="size-8 text-accent" />
                  <CardTitle className="mt-2">
                    {t(`features.${key}.name`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(`features.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Value Proposition Cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("audiences.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ key, icon: Icon }) => (
              <Card key={key} className="flex flex-col">
                <CardHeader>
                  <Icon aria-hidden="true" className="size-8 text-accent" />
                  <CardTitle className="mt-2">
                    {t(`audiences.${key}.label`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    {t(`audiences.${key}.benefit`)}
                  </p>
                </CardContent>
                <div className="px-4 pb-4">
                  <Button variant="link" className="px-0" render={<Link href="/contact" data-track={`audience-learn-more-${key}`} />}>
                    {t(`audiences.${key}.link`)}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">
            {t("socialProof.title")}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((key) => (
              <Card key={key}>
                <CardContent className="flex flex-col gap-4">
                  <Quote aria-hidden="true" className="size-6 text-accent" />
                  <p className="italic text-muted-foreground">
                    {t(`socialProof.testimonials.${key}.quote`)}
                  </p>
                  <div className="mt-auto">
                    <p className="font-medium">
                      {t(`socialProof.testimonials.${key}.name`)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(`socialProof.testimonials.${key}.role`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12">
            <div
              className="h-16 rounded-lg bg-muted/50"
              role="img"
              aria-label={t("socialProof.logoStripAlt")}
            />
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="bg-accent/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {t("secondaryCta.title")}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              render={<Link href="/contact" data-track="secondary-request-demo" />}
            >
              {t("secondaryCta.requestDemo")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/contact" data-track="secondary-contact-us" />}
            >
              {t("secondaryCta.contactUs")}
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Fixeet",
            url: "https://fixeet.co",
            inLanguage: [
              { "@type": "Language", name: "Hebrew", alternateName: "he" },
              { "@type": "Language", name: "English", alternateName: "en" },
            ],
          }),
        }}
      />
    </>
  );
}
