import { describe, it, expect } from "vitest";
import en from "../../../messages/en.json";
import he from "../../../messages/he.json";

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return getKeys(value as Record<string, unknown>, fullKey);
    }
    return [fullKey];
  });
}

describe("Translation files", () => {
  it("English and Hebrew have the same translation keys", () => {
    const enKeys = getKeys(en).sort();
    const heKeys = getKeys(he).sort();
    expect(enKeys).toEqual(heKeys);
  });

  it("no translation values are empty strings", () => {
    const checkNoEmpty = (obj: Record<string, unknown>, path = "") => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim(), `Empty value at ${fullPath}`).not.toBe("");
        } else if (typeof value === "object" && value !== null) {
          checkNoEmpty(value as Record<string, unknown>, fullPath);
        }
      }
    };
    checkNoEmpty(en);
    checkNoEmpty(he);
  });

  it("contains required namespaces", () => {
    const requiredNamespaces = ["Metadata", "Navigation", "Footer", "Home"];
    for (const ns of requiredNamespaces) {
      expect(en).toHaveProperty(ns);
      expect(he).toHaveProperty(ns);
    }
  });
});
