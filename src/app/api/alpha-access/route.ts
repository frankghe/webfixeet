import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

const PLATFORM_URLS: Record<string, string> = {
  web: "https://app.fixeet.co",
  android: "/api/download/android_app_alpha",
  ios: "https://testflight.apple.com/join/89MFmf86",
};

async function sendNotificationEmail(
  email: string,
  platform: string,
  ip: string
): Promise<void> {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const dateTime = new Date().toLocaleString("en-IL", {
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

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  let email = "";
  let platform = "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as {
        email?: string;
        platform?: string;
      };
      email = body.email ?? "";
      platform = body.platform ?? "";
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  } else {
    const formData = await request.formData();
    email = formData.get("email")?.toString().trim() ?? "";
    platform = formData.get("platform")?.toString().trim() ?? "";
  }

  const targetUrl = PLATFORM_URLS[platform];

  if (!email || !targetUrl) {
    if (contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Email and platform are required" },
        { status: 400 }
      );
    }
    return NextResponse.redirect(new URL("/alpha_access", request.url), 303);
  }

  await sendNotificationEmail(email, platform, ip).catch(() => {});

  if (contentType.includes("application/json")) {
    return NextResponse.json({ success: true });
  }

  const absoluteTarget = targetUrl.startsWith("/")
    ? new URL(targetUrl, request.url).toString()
    : targetUrl;
  return NextResponse.redirect(absoluteTarget, 303);
}
