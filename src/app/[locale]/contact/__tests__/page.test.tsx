import { describe, it, expect } from "vitest";
import en from "../../../../../messages/en.json";
import he from "../../../../../messages/he.json";

describe("Contact page translations", () => {
  it("English translations have all required Contact keys", () => {
    expect(en.Contact.meta.title).toBeTruthy();
    expect(en.Contact.meta.description).toBeTruthy();
    expect(en.Contact.title).toBeTruthy();
    expect(en.Contact.subtitle).toBeTruthy();
    expect(en.Contact.form.fullName).toBeTruthy();
    expect(en.Contact.form.email).toBeTruthy();
    expect(en.Contact.form.phone).toBeTruthy();
    expect(en.Contact.form.role).toBeTruthy();
    expect(en.Contact.form.companyName).toBeTruthy();
    expect(en.Contact.form.message).toBeTruthy();
    expect(en.Contact.form.submit).toBeTruthy();
    expect(en.Contact.form.submitting).toBeTruthy();
    expect(en.Contact.form.roles.inspector).toBeTruthy();
    expect(en.Contact.form.roles.constructionCompany).toBeTruthy();
    expect(en.Contact.form.roles.contractor).toBeTruthy();
    expect(en.Contact.form.roles.propertyOwner).toBeTruthy();
    expect(en.Contact.form.roles.investorPartner).toBeTruthy();
    expect(en.Contact.form.roles.other).toBeTruthy();
    expect(en.Contact.validation.fullNameRequired).toBeTruthy();
    expect(en.Contact.validation.emailRequired).toBeTruthy();
    expect(en.Contact.validation.emailInvalid).toBeTruthy();
    expect(en.Contact.validation.roleRequired).toBeTruthy();
    expect(en.Contact.validation.messageRequired).toBeTruthy();
    expect(en.Contact.success.title).toBeTruthy();
    expect(en.Contact.success.description).toBeTruthy();
    expect(en.Contact.error.title).toBeTruthy();
    expect(en.Contact.error.description).toBeTruthy();
    expect(en.Contact.error.retry).toBeTruthy();
    expect(en.Contact.info.title).toBeTruthy();
    expect(en.Contact.info.email).toBeTruthy();
    expect(en.Contact.info.location).toBeTruthy();
    expect(en.Contact.info.responseTime).toBeTruthy();
  });

  it("Hebrew and English have matching Contact key structure", () => {
    function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          return getKeys(value as Record<string, unknown>, path);
        }
        return [path];
      });
    }

    const enKeys = getKeys(en.Contact).sort();
    const heKeys = getKeys(he.Contact).sort();
    expect(enKeys).toEqual(heKeys);
  });
});
