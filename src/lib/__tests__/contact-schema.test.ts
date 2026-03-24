import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const validInput = {
  fullName: "Test User",
  email: "test@example.com",
  role: "inspector" as const,
  message: "Hello",
};

describe("contactSchema", () => {
  it("accepts valid input with all fields", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      phone: "+1234567890",
      companyName: "Acme Corp",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input with only required fields", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects missing fullName", () => {
    const result = contactSchema.safeParse({ ...validInput, fullName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("fullName");
    }
  });

  it("rejects missing email", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("email");
    }
  });

  it("rejects invalid email format", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("email");
    }
  });

  it("rejects missing role", () => {
    const result = contactSchema.safeParse({ ...validInput, role: undefined });
    expect(result.success).toBe(false);
  });

  it("rejects invalid role value", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      role: "invalid-role",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("role");
    }
  });

  it("rejects missing message", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("message");
    }
  });

  it("rejects non-empty honeypot (max 0 length)", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      honeypot: "bot-filled",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain("honeypot");
    }
  });
});
