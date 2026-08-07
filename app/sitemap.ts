import type { MetadataRoute } from "next";

const baseUrl = "https://www.resumeclimbai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ats-resume-checker`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume-bullet-generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-08-07"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/resume-bullets-without-metrics`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/customer-service-resume-bullets`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/software-engineer-resume-bullets`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/administrative-assistant-resume-bullets`,
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/project-manager-resume-bullets`,
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/sales-resume-bullets`,
      lastModified: new Date("2026-08-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
