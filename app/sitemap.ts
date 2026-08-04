import type { MetadataRoute } from "next";

const SITE_URL = "https://https://www.resumeclimbai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ats-resume-checker`,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resume-bullet-generator`,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides/customer-service-resume-bullets`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides/software-engineer-resume-bullets`,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
