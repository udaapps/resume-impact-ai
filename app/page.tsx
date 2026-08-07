import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_TITLE = "Free AI Resume Tools & Writing Guides | ResumeClimb AI";
const PAGE_DESCRIPTION =
  "Build a stronger resume with free AI tools, an ATS resume checker, role-specific bullet examples, and practical resume writing guides.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ResumeClimb AI",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "ResumeClimb AI resume tools and writing guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image.png`],
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

const tools = [
  {
    href: "/resume-bullet-generator",
    label: "AI Writing Tool",
    title: "Free AI Resume Bullet Generator",
    description:
      "Turn a real responsibility, achievement, and optional verified metric into three clear resume bullet options.",
    features: [
      "Three bullet options per generation",
      "ATS-focused wording",
      "Achievement-focused structure",
    ],
    cta: "Generate resume bullets",
    accent: "blue",
  },
  {
    href: "/ats-resume-checker",
    label: "Resume Analysis Tool",
    title: "Free ATS Resume Checker",
    description:
      "Compare your resume with a target job description and review keywords, structure, bullet quality, and formatting guidance.",
    features: [
      "Estimated ATS resume score",
      "Matched and missing keywords",
      "Actionable improvement guidance",
    ],
    cta: "Check your resume",
    accent: "emerald",
  },
] as const;

const guides = [
  {
    href: "/guides/resume-bullets-without-metrics",
    category: "Resume Writing Fundamentals",
    title: "How to Write Strong Resume Bullets Without Metrics",
    description:
      "Show scope, complexity, ownership, quality, and outcomes without inventing numbers.",
  },
  {
    href: "/guides/customer-service-resume-bullets",
    category: "Customer Service",
    title: "25 Customer Service Resume Bullet Examples",
    description:
      "Adapt examples for customer support, complaints, CRM work, communication, and service results.",
  },
  {
    href: "/guides/administrative-assistant-resume-bullets",
    category: "Administrative Support",
    title: "30 Administrative Assistant Resume Bullet Examples",
    description:
      "Describe scheduling, documents, office operations, vendor coordination, and team support.",
  },
  {
    href: "/guides/software-engineer-resume-bullets",
    category: "Software Engineering",
    title: "30 Software Engineer Resume Bullet Examples",
    description:
      "Write stronger bullets for software development, APIs, cloud, testing, performance, and leadership.",
  },
] as const;

const workflowSteps = [
  {
    number: "1",
    title: "Start with real experience",
    description:
      "Identify a responsibility, project, achievement, tool, or result you can explain truthfully.",
  },
  {
    number: "2",
    title: "Improve the wording",
    description:
      "Use the bullet generator and writing guides to make the action, scope, and outcome clearer.",
  },
  {
    number: "3",
    title: "Check job alignment",
    description:
      "Compare the resume with the target job and add only keywords that accurately match your experience.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ResumeClimb AI",
      description: PAGE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ResumeClimb AI",
      url: SITE_URL,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#resources`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#resources`,
      name: "ResumeClimb AI tools and guides",
      numberOfItems: tools.length + guides.length,
      itemListElement: [...tools, ...guides].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}${item.href}`,
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav
        aria-label="Main navigation"
        className="border-b border-slate-800 bg-slate-950/95"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white transition hover:text-blue-300"
          >
            ResumeClimb AI
          </Link>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/resume-bullet-generator"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              AI Bullet Generator
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              ATS Resume Checker
            </Link>
            <Link
              href="/guides"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Resume Guides
            </Link>
          </div>
        </div>
      </nav>

      <header className="overflow-hidden border-b border-slate-900 bg-gradient-to-b from-blue-950/50 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Free Resume Tools and Practical Guidance
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build a stronger resume with AI tools you can use responsibly
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Generate clearer resume bullet points, compare your resume with a
            target job, and learn from role-specific examples—without inventing
            skills, achievements, or metrics.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/resume-bullet-generator"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-500"
            >
              Generate Resume Bullets
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
            >
              Check Your Resume
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
              Free AI tools
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
              ATS-focused guidance
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
              Truthful resume writing
            </span>
          </div>
        </div>
      </header>

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              ResumeClimb AI Tools
            </p>
            <h2
              id="tools-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Start with the tool that matches your next task
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Use the writing tool to improve individual bullet points or the
              checker to compare a complete resume with a target job.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {tools.map((tool) => {
              const isBlue = tool.accent === "blue";

              return (
                <article
                  key={tool.href}
                  className={`flex flex-col rounded-3xl border p-7 sm:p-9 ${
                    isBlue
                      ? "border-blue-500/30 bg-blue-500/10"
                      : "border-emerald-500/30 bg-emerald-500/10"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                      isBlue ? "text-blue-300" : "text-emerald-300"
                    }`}
                  >
                    {tool.label}
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-4 leading-8 text-slate-300">
                    {tool.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className={
                            isBlue ? "text-blue-300" : "text-emerald-300"
                          }
                        >
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tool.href}
                    className={`mt-8 inline-flex w-fit rounded-xl px-6 py-3 font-semibold text-white transition ${
                      isBlue
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-emerald-700 hover:bg-emerald-600"
                    }`}
                  >
                    {tool.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="workflow-heading"
        className="border-y border-slate-900 bg-slate-900/30 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="workflow-heading"
            className="text-center text-3xl font-bold tracking-tight"
          >
            A simple and truthful resume improvement workflow
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {workflowSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="guides-heading"
        className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Free Resume Writing Guides
              </p>
              <h2
                id="guides-heading"
                className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Learn from practical and role-specific examples
              </h2>
              <p className="mt-4 leading-8 text-slate-400">
                Choose a guide, adapt only the examples that match your real
                experience, and review every claim before using it.
              </p>
            </div>

            <Link
              href="/guides"
              className="inline-flex w-fit rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
            >
              Browse all resume guides
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {guides.map((guide) => (
              <article
                key={guide.href}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                  {guide.category}
                </p>
                <h3 className="mt-4 text-xl font-bold leading-7 text-white">
                  {guide.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">
                  {guide.description}
                </p>
                <Link
                  href={guide.href}
                  className="mt-6 inline-flex font-semibold text-blue-300 transition hover:text-blue-200"
                >
                  Read {guide.category} guide →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HumanAtsReviewCta source="homepage" />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8 text-center sm:p-10">
          <h2 className="text-3xl font-bold text-white">
            Ready to improve your resume?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            Start with one real responsibility or compare your existing resume
            with the job you want to apply for.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/resume-bullet-generator"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Use the Bullet Generator
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
            >
              Use the ATS Checker
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Built by UDA Apps.
      </footer>
    </main>
  );
}
