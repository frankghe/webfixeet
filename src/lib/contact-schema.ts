import { z } from "zod";

export const contactRoles = [
  "inspector",
  "constructionCompany",
  "contractor",
  "propertyOwner",
  "investorPartner",
  "other",
] as const;

export type ContactRole = (typeof contactRoles)[number];

export const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().optional().default(""),
  role: z.enum(contactRoles, { message: "Role is required" }),
  companyName: z.string().optional().default(""),
  message: z.string().min(1, "Message is required"),
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;
