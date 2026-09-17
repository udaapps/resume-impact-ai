import type { Metadata } from "next";

import ResumeBulletGeneratorClient from "@/components/resume-bullet-generator-client";
import ResumeBulletGeneratorSeoContent, {
  resumeBulletGeneratorFaqs,
} from "@/components/resume-bullet-generator-seo-content";
import ResumeGuideLinks from "@/components/resume-guide-links";
import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const siteUrl = "https://www.resumeclimbai.com";
const pageUrl = `${siteUrl}/resume-bullet-generator`;

export const metadata: Metadata = {
  title: "Free AI Resume Bullet Generator",
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
    siteName: "ResumeClimb AI",
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
  name: "ResumeClimb AI Resume Bullet Generator",
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
          {/* --- ADDED SEO & ADSENSE CONTENT SECTION --- */}
          <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-slate-800">
              <h2 className="mb-6 text-2xl font-bold">How to Use the Free AI Resume Bullet Generator</h2>
              
              <div className="mb-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                  <h3 className="mb-2 text-lg font-semibold">1. Enter Experience</h3>
                  <p className="text-sm text-slate-600">Start with a basic responsibility, project, or task you completed. Be honest and factual.</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                  <h3 className="mb-2 text-lg font-semibold">2. Add Context (Optional)</h3>
                  <p className="text-sm text-slate-600">Include real metrics, tools used, or the scope of your work to make the output more accurate.</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                  <h3 className="mb-2 text-lg font-semibold">3. Generate & Refine</h3>
                  <p className="text-sm text-slate-600">Review the three AI-generated options. Pick the best one and tweak it to fit your resume perfectly.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Why use an AI bullet point writer?</h3>
                  <p className="leading-relaxed text-slate-600">
                    Writing a resume can be time-consuming. Often, job seekers struggle to start their bullet points with strong action verbs or format their achievements effectively. Our AI generator takes your raw experience and structures it into an Applicant Tracking System (ATS) friendly format. We focus on clarity and impact without inventing fake skills or metrics.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Frequently Asked Questions</h3>
                  <div className="space-y-5">
                    <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                      <h4 className="mb-1 font-medium text-slate-900">Does this tool hallucinate or make up lies?</h4>
                      <p className="text-sm text-slate-600">No. Unlike general AI chatbots, our tool is strictly prompted to use only the information you provide. It focuses on improving the phrasing, structure, and grammar of your real experience.</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                      <h4 className="mb-1 font-medium text-slate-900">Is this tool entirely free?</h4>
                      <p className="text-sm text-slate-600">Yes, the AI Resume Bullet Generator is 100% free to use. You can generate as many variations as you need to perfect your resume.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* --- END SEO & ADSENSE CONTENT SECTION --- */}

          <HumanAtsReviewCta source="resume-bullet-generator" />
          <ResumeGuideLinks />
          <ResumeBulletGeneratorSeoContent />
        </>
      </ResumeBulletGeneratorClient>
    </>
  );
}