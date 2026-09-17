import type { Metadata } from "next";
import Link from "next/link"; // Added for internal linking

import AtsResumeCheckerClient from "@/components/ats/ats-resume-checker-client";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";
import AtsResumeCheckerSeoContent, {
  ATS_RESUME_CHECKER_FAQS,
} from "@/components/ats/ats-resume-checker-seo-content";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.resumeclimbai.com"
).replace(/\/$/, "");

const PAGE_URL = `${SITE_URL}/ats-resume-checker`;

const PAGE_TITLE = "Free ATS Resume Checker & Resume Score";
const SOCIAL_TITLE = `${PAGE_TITLE} | ResumeClimb AI`;

const DESCRIPTION =
  "Check your resume against a job description for free. Separate confirmed, related, and missing keywords, then review bullets, structure, and formatting.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: DESCRIPTION,
  keywords: [
    "free ATS resume checker",
    "ATS resume score",
    "resume keyword checker",
    "resume job match",
    "job description keyword match",
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
    siteName: "ResumeClimb AI",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeClimb AI free ATS resume checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
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
      name: PAGE_TITLE,
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
      name: "ResumeClimb AI ATS Resume Checker with Truth Match",
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
        "Truth Match classification for confirmed, related, and unconfirmed job keywords",
        "Resume structure analysis",
        "Achievement and bullet quality analysis",
        "Formatting and readability checks",
        "AI-assisted resume bullet rewriting",
        "ATS PDF report export",
      ],
      provider: {
        "@type": "Organization",
        name: "ResumeClimb AI",
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
          name: "ResumeClimb AI",
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
      
      {/* --- ADDED SEO & ADSENSE CONTENT SECTION --- */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">How the Free ATS Resume Checker Works</h2>
          
          <p className="mb-8 text-slate-300 leading-relaxed">
            Before your resume reaches a human recruiter, it often passes through an Applicant Tracking System (ATS). Our tool analyzes your resume against the specific job description you are targeting to ensure you have the highest chance of passing these automated filters.
          </p>

          <h3 className="mb-4 text-xl font-semibold text-white">What does the ATS Checker analyze?</h3>
          <ul className="mb-10 ml-5 list-disc space-y-3 text-slate-300">
            <li><strong className="text-white">Keyword Matching:</strong> Identifies hard skills, soft skills, and required qualifications mentioned in the job post that are missing from your resume.</li>
            <li><strong className="text-white">Format Compatibility:</strong> Checks if your resume uses standard formatting that robotic scanners can easily read (avoiding complex tables or graphics).</li>
            <li><strong className="text-white">Actionable Feedback:</strong> Provides an estimated ATS score and suggestions on how to reword your experience for better alignment.</li>
          </ul>

          <div className="mb-8 rounded-r-lg border-l-4 border-indigo-500 bg-indigo-950/30 p-5">
            <h3 className="mb-2 text-lg font-semibold text-indigo-300">The Golden Rule of Resume Keywords</h3>
            <p className="text-sm text-indigo-200/80">
              Only add suggested keywords if you actually possess that skill or experience. Our tool is designed to help you highlight your real qualifications, not to trick the system. Honesty is always the best policy.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-white">Privacy & Data Security</h3>
            <p className="text-slate-300 leading-relaxed">
              We value your privacy. The resume data and job descriptions you paste into our ATS Checker are processed temporarily to generate your analysis. We do not permanently store your resume, and we do not sell your personal data to third parties. For more details, please review our <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
      {/* --- END SEO & ADSENSE CONTENT SECTION --- */}

      <HumanAtsReviewCta source="ats-resume-checker" />
      <AtsResumeCheckerSeoContent />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © 2026 ResumeClimb AI. ATS results and AI rewrites are estimates and
        should be reviewed before use.
      </footer>
    </main>
  );
}