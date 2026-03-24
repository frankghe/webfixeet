import type { MetadataRoute } from "next";

const BASE_URL = "https://fixeet.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact"];
  const locales = ["he", "en"];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );
}
