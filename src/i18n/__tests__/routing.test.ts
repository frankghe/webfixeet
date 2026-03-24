import { describe, it, expect } from "vitest";
import { routing } from "../routing";

describe("i18n routing configuration", () => {
  it("defines Hebrew and English as supported locales", () => {
    expect(routing.locales).toEqual(["he", "en"]);
  });

  it("sets Hebrew as the default locale", () => {
    expect(routing.defaultLocale).toBe("he");
  });

  it("uses 'always' locale prefix mode", () => {
    expect(routing.localePrefix).toBe("always");
  });
});
