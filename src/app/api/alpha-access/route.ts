import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, platform } = await request.json();
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (!email || !platform) {
      return NextResponse.json(
        { error: "Email and platform are required" },
        { status: 400 }
      );
    }

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

      const now = new Date();
      const dateTime = now.toLocaleString("en-IL", {
        timeZone: "Asia/Jerusalem",
        dateStyle: "full",
        timeStyle: "medium",
      });

      await transporter.sendMail({
        from: "contact@fixeet.co",
        to: "frank@ghenassia.org",
        subject: `Alpha Access: ${email} — ${platform}`,
        text: [
          `Alpha Access Notification`,
          ``,
          `Email: ${email}`,
          `Platform: ${platform}`,
          `Date/Time: ${dateTime}`,
          `IP Address: ${ip}`,
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
