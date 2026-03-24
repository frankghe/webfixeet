import { describe, it, expect } from "vitest";
import en from "../../../../messages/en.json";
import he from "../../../../messages/he.json";

describe("Home page translations", () => {
  it("English translations have all required Home keys", () => {
    expect(en.Home.hero.title).toBe("Manage Construction Defects Without the Chaos");
    expect(en.Home.hero.subtitle).toBeTruthy();
    expect(en.Home.hero.cta).toBe("Request a Demo");
    expect(en.Home.hero.learnMore).toBe("Learn More");
    expect(en.Home.comingSoon).toBe("Coming Soon");
  });

  it("Hebrew translations have all required Home keys", () => {
    expect(he.Home.hero.title).toBe("נהל ליקויי בנייה בלי הכאוס");
    expect(he.Home.hero.subtitle).toBeTruthy();
    expect(he.Home.hero.cta).toBe("בקש הדגמה");
    expect(he.Home.hero.learnMore).toBe("למד עוד");
    expect(he.Home.comingSoon).toBe("בקרוב");
  });

  it("Navigation translations include language switcher labels", () => {
    // Hebrew page shows "English" as the switcher label
    expect(he.Navigation.languageSwitcher).toBe("English");
    // English page shows Hebrew as the switcher label
    expect(en.Navigation.languageSwitcher).toBe("עברית");
  });
});
