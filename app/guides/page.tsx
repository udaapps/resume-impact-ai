import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_URL = `${SITE_URL}/guides`;

const PAGE_TITLE = "Free Resume Writing Guides";

const PAGE_DESCRIPTION =
  "Explore practical resume writing guides, role-specific bullet examples, ATS keyword advice, and truthful methods for presenting your experience.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [
    {
      name: "UDA Apps",
      url: SITE_URL,
    },
  ],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "resume writing guides",
    "resume bullet examples",
    "ATS resume advice",
    "resume achievement examples",
    "resume action verbs",
    "resume keyword guidance",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: `${PAGE_TITLE} | ResumeClimb AI`,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "ResumeClimb AI resume writing guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | ResumeClimb AI`,
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

const guides = [
  {
    href: "/guides/how-to-tailor-resume-to-job-description",
    category: "Resume Tailoring",
    title: "How to Tailor Your Resume to a Job Description",
    description:
      "Use an evidence-first method to match employer priorities, classify keywords, rewrite the right sections, and avoid unsupported claims.",
    highlights: [
      "Confirmed, Related, and Not Confirmed",
      "Worked keyword evidence map",
      "Final tailoring checklist",
    ],
  },
  {
    href: "/guides/resume-bullets-without-metrics",
    category: "Resume Writing Fundamentals",
    title: "How to Write Strong Resume Bullets Without Metrics",
    description:
      "Learn how to show scope, ownership, complexity, quality, and impact when you do not have reliable numbers or percentages.",
    highlights: [
      "Evidence alternatives to metrics",
      "Four-step writing method",
      "Before-and-after examples",
    ],
  },
  {
    href: "/guides/customer-service-resume-bullets",
    category: "Customer Service",
    title: "25 Customer Service Resume Bullet Examples",
    description:
      "Use adaptable examples for customer support, complaint resolution, CRM work, teamwork, and verified service results.",
    highlights: [
      "25 role-specific examples",
      "Customer service ATS keywords",
      "Truthful tailoring steps",
    ],
  },
  {
    href: "/guides/administrative-assistant-resume-bullets",
    category: "Administrative Support",
    title: "30 Administrative Assistant Resume Bullet Examples",
    description:
      "Use original examples for scheduling, office communication, documents, records, vendors, executive support, and verified achievements.",
    highlights: [
      "30 administrative examples",
      "Role-specific ATS keywords",
      "No-metrics writing guidance",
    ],
  },
  {
    href: "/guides/receptionist-resume-bullets",
    category: "Reception and Front Desk",
    title: "30 Receptionist Resume Bullet Examples",
    description:
      "Use original examples for visitors, calls, messages, scheduling, records, customer service, office coordination, and verified results.",
    highlights: [
      "30 receptionist examples",
      "Front-desk ATS keywords",
      "Entry-level and no-metrics guidance",
    ],
  },
  {
    href: "/guides/warehouse-worker-resume-bullets",
    category: "Warehouse and Logistics",
    title: "30 Warehouse Worker Resume Bullet Examples",
    description:
      "Use original examples for picking, packing, shipping, receiving, inventory, safety, equipment, quality, and verified results.",
    highlights: [
      "30 warehouse examples",
      "Warehouse ATS keywords",
      "Equipment and credential accuracy",
    ],
  },
  {
    href: "/guides/office-manager-resume-bullets",
    category: "Office Operations",
    title: "30 Office Manager Resume Bullet Examples",
    description:
      "Use original examples for office operations, facilities, vendors, budgets, scheduling, onboarding, records, and verified results.",
    highlights: [
      "30 office manager examples",
      "Office operations ATS keywords",
      "Authority and confidentiality guidance",
    ],
  },
  {
    href: "/guides/executive-assistant-resume-bullets",
    category: "Executive Support",
    title: "30 Executive Assistant Resume Bullet Examples",
    description:
      "Use original examples for executive calendars, meetings, travel, expenses, communications, confidential documents, projects, and verified results.",
    highlights: [
      "30 executive assistant examples",
      "Executive-support ATS keywords",
      "Access and confidentiality guidance",
    ],
  },
  {
    href: "/guides/cashier-resume-bullets",
    category: "Retail and Customer Service",
    title: "30 Cashier Resume Bullet Examples",
    description:
      "Use original examples for POS transactions, payments, returns, customer service, till balancing, promotions, checkout support, and verified results.",
    highlights: [
      "30 cashier examples",
      "Cashier ATS keywords",
      "No-experience and no-metrics guidance",
    ],
  },
  {
    href: "/guides/delivery-driver-resume-bullets",
    category: "Delivery and Logistics",
    title: "30 Delivery Driver Resume Bullet Examples",
    description:
      "Use original examples for routes, inspections, loading, cargo handling, proof of delivery, customer service, safety, and verified results.",
    highlights: [
      "30 delivery driver examples",
      "Delivery and route ATS keywords",
      "License and safety-record accuracy",
    ],
  },
  {
    href: "/guides/security-guard-resume-bullets",
    category: "Security and Protective Services",
    title: "30 Security Guard Resume Bullet Examples",
    description:
      "Use original examples for patrols, access control, CCTV, alarms, incident response, reports, emergency support, and verified results.",
    highlights: [
      "30 security guard examples",
      "Security and incident ATS keywords",
      "Credential and authority accuracy",
    ],
  },
  {
    href: "/guides/software-engineer-resume-bullets",
    category: "Software Engineering",
    title: "30 Software Engineer Resume Bullet Examples",
    description:
      "Explore examples for backend, frontend, APIs, databases, cloud, DevOps, testing, performance, and technical leadership.",
    highlights: [
      "30 technical examples",
      "Engineering ATS keywords",
      "Useful impact metrics",
    ],
  },
  {
    href: "/guides/project-manager-resume-bullets",
    category: "Project Management",
    title: "30 Project Manager Resume Bullet Examples",
    description:
      "Use original examples for project planning, stakeholders, risks, budgets, resources, Agile delivery, and verified results.",
    highlights: [
      "30 project management examples",
      "Role-specific ATS keywords",
      "Confidential-metrics guidance",
    ],
  },
  {
    href: "/guides/sales-resume-bullets",
    category: "Sales",
    title: "30 Sales Resume Bullet Examples",
    description:
      "Use original examples for prospecting, discovery, presentations, closing, account growth, CRM, and verified sales results.",
    highlights: [
      "30 sales examples",
      "Sales ATS keywords",
      "Revenue accuracy guidance",
    ],
  },
  {
    href: "/guides/data-analyst-resume-bullets",
    category: "Data Analytics",
    title: "30 Data Analyst Resume Bullet Examples",
    description:
      "Use original examples for SQL, Python, Excel, data cleaning, dashboards, reporting, automation, and business insights.",
    highlights: [
      "30 data analyst examples",
      "Technical ATS keywords",
      "Confidential-data guidance",
    ],
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "ResumeClimb AI",
        url: SITE_URL,
      },
      mainEntity: {
        "@id": `${PAGE_URL}#guide-list`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#guide-list`,
      name: "ResumeClimb AI Resume Writing Guides",
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${SITE_URL}${guide.href}`,
      })),
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
          name: "Resume Writing Guides",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function GuidesPage() {
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
          </div>
        </div>
      </nav>

      <header className="border-b border-slate-900 bg-gradient-to-b from-blue-950/40 to-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-400"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-300">Resume Guides</span>
          </nav>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            ResumeClimb AI Learning Center
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Free Resume Writing Guides
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Learn how to write clearer, truthful, and ATS-friendly resume bullet
            points with practical formulas, role-specific examples, keyword
            guidance, and customization steps.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
              {guides.length} detailed guides
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
              385 role-specific examples
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
              No invented claims
            </span>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="all-guides-heading"
        className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              All Guides
            </p>
            <h2
              id="all-guides-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Choose the guide that matches your goal
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <article
                key={guide.href}
                className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                  {guide.category}
                </p>

                <h3 className="mt-4 text-2xl font-bold leading-8 text-white">
                  {guide.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {guide.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {guide.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="text-emerald-400">
                        ✓
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={guide.href}
                  className="mt-8 inline-flex w-fit rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Read the guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="guide-workflow-heading"
        className="border-y border-slate-900 bg-slate-900/30 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="guide-workflow-heading"
            className="text-center text-3xl font-bold tracking-tight"
          >
            A simple resume improvement workflow
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "Choose relevant examples",
                description:
                  "Start with a role-specific guide and select only examples that reflect work you genuinely performed.",
              },
              {
                number: "2",
                title: "Customize the evidence",
                description:
                  "Replace tools, scope, context, and placeholders with accurate details you can confidently explain.",
              },
              {
                number: "3",
                title: "Check job alignment",
                description:
                  "Compare the finished resume with the target job description and add only truthful, relevant keywords.",
              },
            ].map((step) => (
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

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8 text-center sm:p-10">
          <h2 className="text-3xl font-bold text-white">
            Ready to improve your own resume?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            Generate stronger bullet options from your real experience, then
            compare your resume with a target job description.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/resume-bullet-generator#generator"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Generate Resume Bullets
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
            >
              Check Your Resume
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
