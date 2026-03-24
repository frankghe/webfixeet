import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fixeet | Professional Repair Services",
    template: "%s | Fixeet",
  },
  description:
    "Fixeet connects you with trusted professionals for home repairs, maintenance, and improvement services.",
  openGraph: {
    type: "website",
    siteName: "Fixeet",
    title: "Fixeet | Professional Repair Services",
    description:
      "Fixeet connects you with trusted professionals for home repairs, maintenance, and improvement services.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fixeet",
              url: "https://fixeet.com",
              description:
                "Fixeet connects you with trusted professionals for home repairs, maintenance, and improvement services.",
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
