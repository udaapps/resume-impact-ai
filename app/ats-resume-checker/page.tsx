import type { Metadata } from "next";

import AtsResumeCheckerClient from "@/components/ats/ats-resume-checker-client";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";
import AtsResumeCheckerSeoContent, {
  ATS_RESUME_CHECKER_FAQS,
} from "@/components/ats/ats-resume-checker-seo-content";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://resume-impact-ai.vercel.app"
).replace(/\/$/, "");

const PAGE_URL = `${SITE_URL}/ats-resume-checker`;

const TITLE =
  "Free ATS Resume Checker & Resume Score | Resume Impact AI";

const DESCRIPTION =
  "Check your resume against a job description with our free ATS resume checker. Find missing keywords, formatting issues, weak bullet points, and practical improvements.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "free ATS resume checker",
    "ATS resume score",
    "resume keyword checker",
    "resume job match",
    "ATS resume analyzer",
    "resume bullet checker",
    "resume formatting checker",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Resume Impact AI",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Impact AI free ATS resume checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${PAGE_URL}#application`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#application`,
      name: "Resume Impact AI ATS Resume Checker",
      url: PAGE_URL,
      description: DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Resume and job description comparison",
        "Estimated ATS resume score",
        "Matched and missing keyword analysis",
        "Resume structure analysis",
        "Achievement and bullet quality analysis",
        "Formatting and readability checks",
        "AI-assisted resume bullet rewriting",
        "ATS PDF report export",
      ],
      provider: {
        "@type": "Organization",
        name: "Resume Impact AI",
        url: SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Resume Impact AI",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Free ATS Resume Checker",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: ATS_RESUME_CHECKER_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function AtsResumeCheckerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <AtsResumeCheckerClient />
      <HumanAtsReviewCta source="ats-resume-checker" />
      <AtsResumeCheckerSeoContent />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © 2026 Resume Impact AI. ATS results and AI rewrites are estimates
        and should be reviewed before use.
      </footer>
    </main>
  );
}
