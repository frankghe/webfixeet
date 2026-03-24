import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, phone, role, companyName, message, honeypot } =
      result.data;

    // Honeypot check — silent rejection
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Only send email if SMTP is configured
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `Fixeet Contact Form: ${fullName} (${role})`,
        text: [
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Phone: ${phone || "N/A"}`,
          `Role: ${role}`,
          `Company: ${companyName || "N/A"}`,
          `\nMessage:\n${message}`,
        ].join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
