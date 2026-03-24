import { describe, it, expect } from "vitest";
import en from "../../../../../messages/en.json";
import he from "../../../../../messages/he.json";

describe("About page translations", () => {
  it("English translations have all required About keys", () => {
    expect(en.About.meta.title).toBeTruthy();
    expect(en.About.meta.description).toBeTruthy();
    expect(en.About.mission.title).toBeTruthy();
    expect(en.About.mission.description).toBeTruthy();
    expect(en.About.problemDeepDive.title).toBeTruthy();
    expect(en.About.problemDeepDive.marketPain).toBeTruthy();
    expect(en.About.problemDeepDive.existingTools).toBeTruthy();
    expect(en.About.vision.title).toBeTruthy();
    expect(en.About.vision.description).toBeTruthy();
  });

  it("Hebrew and English have matching About key structure", () => {
    function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          return getKeys(value as Record<string, unknown>, path);
        }
        return [path];
      });
    }

    const enKeys = getKeys(en.About).sort();
    const heKeys = getKeys(he.About).sort();
    expect(enKeys).toEqual(heKeys);
  });
});
