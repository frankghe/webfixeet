import { describe, it, expect } from "vitest";
import en from "../../../../messages/en.json";
import he from "../../../../messages/he.json";

describe("Home page translations", () => {
  it("English translations have all required Home keys", () => {
    expect(en.Home.hero.title).toBe("Manage Construction Defects Without the Chaos");
    expect(en.Home.hero.subtitle).toBeTruthy();
    expect(en.Home.hero.cta).toBe("Request a Demo");
    expect(en.Home.hero.learnMore).toBe("Learn More");
    expect(en.Home.hero.imageAlt).toBeTruthy();
    expect(en.Home.comingSoon).toBe("Coming Soon");
  });

  it("Hebrew translations have all required Home keys", () => {
    expect(he.Home.hero.title).toBe("נהל ליקויי בנייה בלי הכאוס");
    expect(he.Home.hero.subtitle).toBeTruthy();
    expect(he.Home.hero.cta).toBe("בקש הדגמה");
    expect(he.Home.hero.learnMore).toBe("למד עוד");
    expect(he.Home.hero.imageAlt).toBeTruthy();
    expect(he.Home.comingSoon).toBe("בקרוב");
  });

  it("Navigation translations include language switcher labels", () => {
    expect(he.Navigation.languageSwitcher).toBe("English");
    expect(en.Navigation.languageSwitcher).toBe("עברית");
  });

  it("English translations have all section keys", () => {
    // Problem
    expect(en.Home.problem.title).toBeTruthy();
    expect(en.Home.problem.points.chasing).toBeTruthy();
    expect(en.Home.problem.points.frustration).toBeTruthy();
    expect(en.Home.problem.points.incomplete).toBeTruthy();
    expect(en.Home.problem.points.noVisibility).toBeTruthy();

    // Solution
    expect(en.Home.solution.title).toBeTruthy();
    expect(en.Home.solution.points.connected).toBeTruthy();
    expect(en.Home.solution.points.tracked).toBeTruthy();
    expect(en.Home.solution.points.visibility).toBeTruthy();

    // Features
    expect(en.Home.features.title).toBeTruthy();
    expect(en.Home.features.defectReporting.name).toBeTruthy();
    expect(en.Home.features.visitScheduling.name).toBeTruthy();
    expect(en.Home.features.realTimeStatus.name).toBeTruthy();
    expect(en.Home.features.multiStakeholder.name).toBeTruthy();

    // Audiences
    expect(en.Home.audiences.title).toBeTruthy();
    expect(en.Home.audiences.inspector.label).toBeTruthy();
    expect(en.Home.audiences.constructionCompany.label).toBeTruthy();
    expect(en.Home.audiences.contractor.label).toBeTruthy();
    expect(en.Home.audiences.apartmentOwner.label).toBeTruthy();

    // Social proof
    expect(en.Home.socialProof.title).toBeTruthy();
    expect(en.Home.socialProof.testimonials.first.name).toBeTruthy();
    expect(en.Home.socialProof.testimonials.second.name).toBeTruthy();
    expect(en.Home.socialProof.testimonials.third.name).toBeTruthy();

    // Secondary CTA
    expect(en.Home.secondaryCta.title).toBeTruthy();
    expect(en.Home.secondaryCta.requestDemo).toBeTruthy();
    expect(en.Home.secondaryCta.contactUs).toBeTruthy();
  });

  it("Hebrew and English have matching Home key structure", () => {
    function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          return getKeys(value as Record<string, unknown>, path);
        }
        return [path];
      });
    }

    const enKeys = getKeys(en.Home).sort();
    const heKeys = getKeys(he.Home).sort();
    expect(enKeys).toEqual(heKeys);
  });
});
