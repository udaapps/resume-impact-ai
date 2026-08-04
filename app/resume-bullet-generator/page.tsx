import type { Metadata } from "next";

import ResumeBulletGeneratorClient from "@/components/resume-bullet-generator-client";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";
import ResumeBulletGeneratorSeoContent, {
  resumeBulletGeneratorFaqs,
} from "@/components/resume-bullet-generator-seo-content";

const siteUrl = "https://resume-impact-ai.vercel.app";
const pageUrl = `${siteUrl}/resume-bullet-generator`;

export const metadata: Metadata = {
  title: "Free AI Resume Bullet Generator | Resume Impact AI",
  description:
    "Create strong, ATS-friendly resume bullet points with a free AI resume bullet generator. Turn responsibilities into clear, achievement-focused statements.",
  keywords: [
    "AI resume bullet generator",
    "free resume bullet generator",
    "resume bullet point generator",
    "ATS resume bullets",
    "resume achievement generator",
    "resume bullet examples",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "Resume Impact AI",
    title: "Free AI Resume Bullet Generator",
    description:
      "Turn job responsibilities into clear, ATS-friendly, achievement-focused resume bullet points.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Bullet Generator",
    description:
      "Create professional resume bullet points from your responsibilities and verified results.",
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

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Resume Impact AI Resume Bullet Generator",
  url: pageUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A web-based AI resume bullet generator that creates professional, ATS-friendly resume bullet point options from a user's job title, responsibility, achievement, and verified metric.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Three resume bullet options per generation",
    "ATS-focused wording",
    "Achievement-focused bullet writing",
    "Resume bullet library",
    "TXT, DOCX, and PDF export",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: resumeBulletGeneratorFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Resume Bullet Generator",
      item: pageUrl,
    },
  ],
};

export default function ResumeBulletGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ResumeBulletGeneratorClient>
        <>
          <HumanAtsReviewCta source="resume-bullet-generator" />
          <ResumeBulletGeneratorSeoContent />
        </>
      </ResumeBulletGeneratorClient>
    </>
  );
}
