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
                className="aspect-video w-full max-w-xl rounded-lg bg-muted/30 p-4 sm:p-6"
                role="img"
                aria-label={t("hero.imageAlt")}
              >
                <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  {/* ── Background subtle grid ── */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" stroke="var(--muted-foreground)" strokeWidth="0.3" strokeOpacity="0.25" fill="none"/>
                    </pattern>
                  </defs>
                  <rect width="640" height="360" fill="url(#grid)" />

                  {/* ══════════════════════════════════════════
                      LEFT PANEL — Building facade
                  ══════════════════════════════════════════ */}

                  {/* Building base shadow */}
                  <rect x="42" y="62" width="162" height="214" rx="4" fill="var(--muted)" fillOpacity="0.6" />

                  {/* Main building outline */}
                  <rect x="40" y="60" width="162" height="214" rx="4"
                    stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="round" />

                  {/* Roof line / parapet */}
                  <line x1="40" y1="88" x2="202" y2="88" stroke="var(--foreground)" strokeWidth="1.5" />

                  {/* Building label strip */}
                  <rect x="40" y="60" width="162" height="28" rx="4" fill="var(--muted-foreground)" fillOpacity="0.12" />
                  <text x="121" y="79" textAnchor="middle" fontSize="9" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" letterSpacing="1.2" fontWeight="600">TOWER A</text>

                  {/* Floor divisions */}
                  <line x1="40" y1="130" x2="202" y2="130" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 4" />
                  <line x1="40" y1="172" x2="202" y2="172" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 4" />
                  <line x1="40" y1="214" x2="202" y2="214" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 4" />

                  {/* Window grid — row 1 */}
                  <rect x="58" y="98" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="91" y="98" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="124" y="98" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="157" y="98" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />

                  {/* Window grid — row 2 */}
                  <rect x="58" y="140" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="91" y="140" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="124" y="140" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  {/* Defect marker window — highlighted */}
                  <rect x="157" y="140" width="24" height="20" rx="2" stroke="var(--accent)" strokeWidth="2" />
                  <circle cx="169" cy="150" r="4" fill="var(--accent)" fillOpacity="0.25" />
                  <circle cx="169" cy="150" r="2" fill="var(--accent)" />

                  {/* Window grid — row 3 */}
                  <rect x="58" y="182" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  {/* Another defect window */}
                  <rect x="91" y="182" width="24" height="20" rx="2" stroke="var(--accent)" strokeWidth="2" />
                  <circle cx="103" cy="192" r="2" fill="var(--accent)" />
                  <rect x="124" y="182" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="157" y="182" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />

                  {/* Window grid — row 4 */}
                  <rect x="58" y="224" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="91" y="224" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="124" y="224" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />
                  <rect x="157" y="224" width="24" height="20" rx="2" stroke="var(--foreground)" strokeWidth="1.2" />

                  {/* Ground / base line */}
                  <rect x="30" y="274" width="184" height="8" rx="2" fill="var(--muted-foreground)" fillOpacity="0.2" />
                  <line x1="30" y1="274" x2="214" y2="274" stroke="var(--foreground)" strokeWidth="1.5" />

                  {/* Construction crane — top left of building */}
                  <line x1="60" y1="60" x2="60" y2="32" stroke="var(--foreground)" strokeWidth="1.5" />
                  <line x1="60" y1="32" x2="130" y2="32" stroke="var(--foreground)" strokeWidth="1.5" />
                  <line x1="60" y1="32" x2="42" y2="40" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="3 2" />
                  <line x1="125" y1="32" x2="125" y2="48" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <circle cx="125" cy="50" r="3" fill="var(--muted-foreground)" fillOpacity="0.5" />

                  {/* Hard hat icon — small, near crane */}
                  <path d="M52 46 Q60 38 68 46 L68 50 L52 50 Z" stroke="var(--foreground)" strokeWidth="1.2" fill="var(--muted)" />
                  <line x1="50" y1="50" x2="70" y2="50" stroke="var(--foreground)" strokeWidth="1.2" />

                  {/* ══════════════════════════════════════════
                      CENTER PANEL — Digital defect tracker
                  ══════════════════════════════════════════ */}

                  {/* Panel card shadow */}
                  <rect x="242" y="47" width="182" height="238" rx="10" fill="var(--muted)" fillOpacity="0.7" />

                  {/* Panel card */}
                  <rect x="240" y="45" width="182" height="238" rx="10"
                    stroke="var(--foreground)" strokeWidth="2" />

                  {/* Card header */}
                  <rect x="240" y="45" width="182" height="36" rx="10" fill="var(--muted-foreground)" fillOpacity="0.1" />
                  <rect x="240" y="63" width="182" height="18" fill="var(--muted-foreground)" fillOpacity="0.1" />
                  {/* Three dots */}
                  <circle cx="258" cy="63" r="3.5" fill="var(--muted-foreground)" fillOpacity="0.4" />
                  <circle cx="270" cy="63" r="3.5" fill="var(--muted-foreground)" fillOpacity="0.4" />
                  <circle cx="282" cy="63" r="3.5" fill="var(--muted-foreground)" fillOpacity="0.4" />
                  {/* Panel title */}
                  <text x="331" y="67" textAnchor="middle" fontSize="10" fontFamily="sans-serif"
                    fill="var(--foreground)" fontWeight="700" letterSpacing="0.5">Defect Tracker</text>

                  {/* Divider */}
                  <line x1="240" y1="81" x2="422" y2="81" stroke="var(--foreground)" strokeWidth="1" strokeOpacity="0.3" />

                  {/* ── Checklist items ── */}

                  {/* Item 1 — resolved */}
                  <rect x="256" y="90" width="150" height="28" rx="5" fill="var(--muted)" fillOpacity="0.4" />
                  {/* Check circle filled — done */}
                  <circle cx="270" cy="104" r="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
                  <polyline points="265,104 269,108 276,99" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="284" y="100" width="70" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.35" />
                  <rect x="284" y="108" width="45" height="4" rx="2" fill="var(--muted-foreground)" fillOpacity="0.2" />
                  {/* Status badge — closed */}
                  <rect x="360" y="99" width="36" height="14" rx="7" fill="var(--accent)" fillOpacity="0.18" />
                  <text x="378" y="109" textAnchor="middle" fontSize="7" fontFamily="sans-serif"
                    fill="var(--accent)" fontWeight="700">DONE</text>

                  {/* Item 2 — in progress */}
                  <rect x="256" y="126" width="150" height="28" rx="5" fill="var(--muted)" fillOpacity="0.4" />
                  {/* Half-circle / in-progress indicator */}
                  <circle cx="270" cy="140" r="8" stroke="var(--muted-foreground)" strokeWidth="1.5" fill="none" strokeDasharray="18 12" />
                  <rect x="284" y="136" width="60" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.35" />
                  <rect x="284" y="144" width="38" height="4" rx="2" fill="var(--muted-foreground)" fillOpacity="0.2" />
                  {/* Status badge — in progress */}
                  <rect x="354" y="135" width="42" height="14" rx="7" fill="var(--foreground)" fillOpacity="0.08" stroke="var(--muted-foreground)" strokeWidth="0.8" />
                  <text x="375" y="145" textAnchor="middle" fontSize="7" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fontWeight="600">IN PROG</text>

                  {/* Item 3 — open / urgent */}
                  <rect x="256" y="162" width="150" height="28" rx="5" fill="var(--muted)" fillOpacity="0.4" />
                  {/* Open circle */}
                  <circle cx="270" cy="176" r="8" stroke="var(--foreground)" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
                  <rect x="284" y="172" width="65" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.35" />
                  <rect x="284" y="180" width="40" height="4" rx="2" fill="var(--muted-foreground)" fillOpacity="0.2" />
                  {/* Status badge — open red */}
                  <rect x="357" y="171" width="39" height="14" rx="7" fill="var(--foreground)" fillOpacity="0.06" stroke="var(--foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
                  <text x="376.5" y="181" textAnchor="middle" fontSize="7" fontFamily="sans-serif"
                    fill="var(--foreground)" fontWeight="600" fillOpacity="0.6">OPEN</text>

                  {/* Item 4 — resolved */}
                  <rect x="256" y="198" width="150" height="28" rx="5" fill="var(--muted)" fillOpacity="0.4" />
                  <circle cx="270" cy="212" r="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
                  <polyline points="265,212 269,216 276,207" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="284" y="208" width="55" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.35" />
                  <rect x="284" y="216" width="35" height="4" rx="2" fill="var(--muted-foreground)" fillOpacity="0.2" />
                  <rect x="360" y="207" width="36" height="14" rx="7" fill="var(--accent)" fillOpacity="0.18" />
                  <text x="378" y="217" textAnchor="middle" fontSize="7" fontFamily="sans-serif"
                    fill="var(--accent)" fontWeight="700">DONE</text>

                  {/* Progress bar area */}
                  <line x1="256" y1="244" x2="406" y2="244" stroke="var(--muted-foreground)" strokeWidth="0.5" strokeOpacity="0.4" />
                  <rect x="256" y="252" width="150" height="6" rx="3" fill="var(--muted-foreground)" fillOpacity="0.15" />
                  <rect x="256" y="252" width="97" height="6" rx="3" fill="var(--accent)" fillOpacity="0.7" />
                  <text x="256" y="270" fontSize="8" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fontWeight="500">12 of 18 resolved</text>

                  {/* ══════════════════════════════════════════
                      RIGHT PANEL — Stakeholder figures
                  ══════════════════════════════════════════ */}

                  {/* Stakeholder 1 — Resident / apartment owner */}
                  <circle cx="490" cy="96" r="16" stroke="var(--foreground)" strokeWidth="1.5" fill="var(--muted)" fillOpacity="0.5" />
                  {/* Head */}
                  <circle cx="490" cy="90" r="6" stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
                  {/* Body */}
                  <path d="M480 112 Q480 104 490 104 Q500 104 500 112" stroke="var(--foreground)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* Label */}
                  <text x="490" y="122" textAnchor="middle" fontSize="8" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fontWeight="600">Resident</text>

                  {/* Stakeholder 2 — Project Manager */}
                  <circle cx="555" cy="160" r="16" stroke="var(--foreground)" strokeWidth="1.5" fill="var(--muted)" fillOpacity="0.5" />
                  <circle cx="555" cy="154" r="6" stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
                  <path d="M545 176 Q545 168 555 168 Q565 168 565 176" stroke="var(--foreground)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* Hard hat on PM */}
                  <path d="M549 152 Q555 145 561 152 L561 155 L549 155 Z" stroke="var(--foreground)" strokeWidth="1" fill="var(--accent)" fillOpacity="0.25" />
                  <text x="555" y="185" textAnchor="middle" fontSize="8" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fontWeight="600">PM</text>

                  {/* Stakeholder 3 — Contractor / Tradesperson */}
                  <circle cx="490" cy="240" r="16" stroke="var(--foreground)" strokeWidth="1.5" fill="var(--muted)" fillOpacity="0.5" />
                  <circle cx="490" cy="234" r="6" stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
                  <path d="M480 256 Q480 248 490 248 Q500 248 500 256" stroke="var(--foreground)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* Wrench icon tiny */}
                  <line x1="486" y1="258" x2="492" y2="264" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="485" cy="257" r="2" stroke="var(--foreground)" strokeWidth="1" fill="none" />
                  <text x="490" y="272" textAnchor="middle" fontSize="8" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fontWeight="600">Contractor</text>

                  {/* ── Connection lines from checklist panel to stakeholders ── */}

                  {/* Panel → Resident */}
                  <path d="M422 100 C450 100 465 96 474 96"
                    stroke="var(--muted-foreground)" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.6" fill="none" />
                  <circle cx="422" cy="100" r="3" fill="var(--accent)" fillOpacity="0.6" />

                  {/* Panel → PM */}
                  <path d="M422 160 C450 160 520 160 539 160"
                    stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.8" fill="none" />
                  <circle cx="422" cy="160" r="3.5" fill="var(--accent)" />

                  {/* Panel → Contractor */}
                  <path d="M422 220 C450 220 465 240 474 240"
                    stroke="var(--muted-foreground)" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.6" fill="none" />
                  <circle cx="422" cy="220" r="3" fill="var(--accent)" fillOpacity="0.6" />

                  {/* Subtle vertical line connecting stakeholders */}
                  <line x1="507" y1="105" x2="533" y2="145" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.3" />
                  <line x1="507" y1="230" x2="533" y2="178" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.3" />

                  {/* ── Connection line from building to checklist panel ── */}
                  <path d="M202 150 C218 150 226 150 240 150"
                    stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.7" fill="none" />
                  <circle cx="202" cy="150" r="3.5" fill="var(--accent)" />

                  {/* Notification dot — floating on panel top-right */}
                  <circle cx="416" cy="52" r="7" fill="var(--accent)" />
                  <text x="416" y="56" textAnchor="middle" fontSize="8" fontFamily="sans-serif"
                    fill="white" fontWeight="700">3</text>

                  {/* ── Photo pin marker — small camera icon on building ── */}
                  {/* Pin at defect window 2 (row2,col4) = 169,150 */}
                  <line x1="169" y1="140" x2="195" y2="115" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.6" />
                  <rect x="188" y="106" width="22" height="16" rx="3" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
                  {/* Tiny camera */}
                  <rect x="191" y="109" width="13" height="9" rx="1.5" stroke="var(--accent)" strokeWidth="1" fill="none" />
                  <circle cx="197.5" cy="113.5" r="2.5" stroke="var(--accent)" strokeWidth="1" fill="none" />
                  <rect x="201" y="109" width="3" height="2" rx="0.5" fill="var(--accent)" fillOpacity="0.6" />

                  {/* ── Floating status tag near building ── */}
                  <rect x="18" y="155" width="62" height="22" rx="6"
                    fill="var(--muted)" stroke="var(--foreground)" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="30" cy="166" r="4" fill="var(--accent)" fillOpacity="0.4" />
                  <rect x="38" y="162" width="34" height="4" rx="2" fill="var(--muted-foreground)" fillOpacity="0.4" />
                  <rect x="38" y="169" width="22" height="3" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />

                  {/* ── Bottom floor label ── */}
                  <text x="121" y="294" textAnchor="middle" fontSize="8" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" letterSpacing="0.8">Fixeet Construction</text>

                  {/* ── Subtle brand watermark corner ── */}
                  <text x="620" y="350" textAnchor="end" fontSize="7" fontFamily="sans-serif"
                    fill="var(--muted-foreground)" fillOpacity="0.3" letterSpacing="0.5">fixeet</text>
                </svg>
              </div>
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
