import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/project-manager-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Project Manager Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 project manager resume bullet examples, ATS keywords, and writing tips for scope, schedules, budgets, risks, stakeholders, and delivery.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "project manager resume bullet examples",
    "project manager resume bullets",
    "project management resume examples",
    "project manager resume keywords",
    "project management achievements",
    "ATS project manager resume",
    "project manager action verbs",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Project manager resume bullet examples",
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

const bulletGroups = [
  {
    title: "Project planning, scope, and scheduling",
    description:
      "Use these examples when you defined project work, created plans, coordinated dependencies, or tracked milestones.",
    bullets: [
      "Developed project plans that defined objectives, deliverables, milestones, owners, dependencies, and acceptance criteria.",
      "Translated business requirements into a structured work plan and confirmed scope boundaries with sponsors and delivery teams.",
      "Maintained project schedules, reviewed upcoming dependencies, and followed up with task owners before milestone dates.",
      "Facilitated project kickoff sessions to align contributors on roles, timelines, communication expectations, and success measures.",
      "Reprioritized activities when requirements or resources changed while documenting the effect on scope and delivery dates.",
    ],
  },
  {
    title: "Stakeholder communication and reporting",
    description:
      "Choose these examples when you managed expectations, prepared status updates, facilitated meetings, or coordinated decisions.",
    bullets: [
      "Delivered concise project status reports covering completed work, upcoming milestones, risks, decisions, and required actions.",
      "Facilitated stakeholder meetings, documented decisions, assigned action owners, and tracked follow-up items through completion.",
      "Adapted project updates for executive, technical, operational, and customer audiences while maintaining consistent information.",
      "Clarified stakeholder requirements through structured discussions and documented agreed priorities before delivery work began.",
      "Escalated decisions with relevant context, available options, and likely project impacts to support timely sponsor action.",
    ],
  },
  {
    title: "Risk, issue, and change management",
    description:
      "Use these bullets to demonstrate proactive risk identification, issue resolution, governance, or change-control experience.",
    bullets: [
      "Maintained a risk and issue register with owners, response actions, target dates, and current status for regular review.",
      "Identified delivery risks early by reviewing dependencies, resource constraints, technical assumptions, and stakeholder readiness.",
      "Coordinated issue-resolution sessions across teams and tracked agreed actions until the project could proceed safely.",
      "Evaluated change requests for scope, schedule, cost, resource, and quality impacts before presenting recommendations for approval.",
      "Documented project decisions and approved changes to preserve accountability and reduce confusion during execution.",
    ],
  },
  {
    title: "Budget, resources, and vendor coordination",
    description:
      "Select these examples when you tracked spending, planned capacity, coordinated suppliers, or managed project resources.",
    bullets: [
      "Tracked project spending against approved budgets and highlighted forecast variances before they affected delivery decisions.",
      "Coordinated resource needs with functional managers and adjusted assignments around availability, priorities, and specialist skills.",
      "Reviewed vendor deliverables against agreed requirements, timelines, and acceptance criteria before approving completion.",
      "Prepared purchase, invoice, and contract-support documentation and followed up with procurement, finance, and suppliers.",
      "Balanced project priorities across time, cost, scope, and quality constraints while communicating tradeoffs to stakeholders.",
    ],
  },
  {
    title: "Agile delivery and cross-functional leadership",
    description:
      "Use these examples for Agile, Scrum, iterative delivery, team facilitation, process improvement, or launch coordination.",
    bullets: [
      "Coordinated cross-functional contributors across product, design, engineering, operations, and customer-facing teams.",
      "Facilitated sprint planning, reviews, retrospectives, and backlog discussions to keep priorities visible and actionable.",
      "Removed delivery blockers by connecting owners, clarifying decisions, and escalating unresolved dependencies at the right time.",
      "Supported release readiness by coordinating testing, training, documentation, communications, and operational handoffs.",
      "Led project closeout reviews to document outcomes, open items, lessons learned, and recommendations for future work.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with a figure you can verify from project plans, financial records, reports, or approved dashboards.",
    bullets: [
      "Delivered [X] projects valued at [$Y] while meeting approved scope, quality requirements, and stakeholder expectations.",
      "Improved on-time milestone completion from [X%] to [Y%] by strengthening dependency tracking and owner follow-up.",
      "Reduced project costs by [$X] or [Y%] through resource planning, vendor negotiation, and early variance review.",
      "Coordinated a cross-functional team of [X] contributors across [Y] departments to complete the project [Z] weeks ahead of schedule.",
      "Reduced open project risks by [X%] by assigning owners, defining response actions, and reviewing progress each week.",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Planning and delivery",
    items: [
      "project planning",
      "scope management",
      "project scheduling",
      "milestone tracking",
      "resource allocation",
      "project lifecycle",
    ],
  },
  {
    title: "Risk and governance",
    items: [
      "risk management",
      "issue resolution",
      "change control",
      "dependency management",
      "project governance",
      "quality assurance",
    ],
  },
  {
    title: "Stakeholders and commercial work",
    items: [
      "stakeholder management",
      "status reporting",
      "requirements gathering",
      "budget management",
      "vendor management",
      "contract coordination",
    ],
  },
  {
    title: "Methods and tools",
    items: [
      "Agile",
      "Scrum",
      "Waterfall",
      "Jira",
      "Microsoft Project",
      "Asana",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark repeated deliverables, methods, tools, industries, and leadership expectations.",
  "Select examples that match project work you genuinely performed and the level of responsibility you actually held.",
  "Replace general wording with the real project type, team, tool, stakeholder group, methodology, or deliverable.",
  "Add verified evidence such as budget, team size, project count, schedule improvement, cost reduction, or risk reduction when available.",
  "Remove any certification, method, tool, result, or leadership claim you could not explain confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a project manager role include?",
    answer:
      "A recent and relevant project management role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize project scale, leadership, delivery challenges, and outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for a project manager resume?",
    answer:
      "Useful verbs include led, delivered, planned, coordinated, facilitated, implemented, resolved, mitigated, negotiated, improved, launched, and streamlined. Select verbs that accurately reflect your contribution and authority.",
  },
  {
    question: "Should every project manager bullet include a number?",
    answer:
      "No. Metrics are valuable when they are accurate, but you can also demonstrate scope through project complexity, stakeholders, dependencies, methods, governance, decisions, and business outcomes. Never invent a budget or result.",
  },
  {
    question: "Which project manager ATS keywords should I use?",
    answer:
      "Use terms found in the target job description that truthfully match your background. Common examples include project planning, stakeholder management, risk management, budgeting, scheduling, change control, Agile, Scrum, Jira, and Microsoft Project.",
  },
  {
    question: "What should an entry-level project manager write?",
    answer:
      "Focus on project coordination, meeting support, task tracking, documentation, stakeholder communication, scheduling, reporting, risk follow-up, and cross-functional teamwork. Relevant internships, volunteer projects, events, operations, and administrative work can provide useful evidence.",
  },
  {
    question: "Can I copy these project manager bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the project, responsibility, method, scope, tool, and outcome so every statement reflects your real experience. Replace bracketed placeholders only with verified information.",
  },
] as const;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function ProjectManagerResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-07",
    dateModified: "2026-08-07",
    inLanguage: "en-US",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "UDA Apps",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ResumeClimb AI",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Project Manager Resume Bullet Examples",
        item: PAGE_URL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

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
              href="/guides"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Resume Guides
            </Link>
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

      <article>
        <header className="border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/guides" className="hover:text-white">
                Resume Guides
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">Project Manager Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Project Manager Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Project Manager Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe project planning, stakeholder communication, risks,
              budgets, resources, and delivery with clear, ATS-friendly bullets.
              Adapt every example to your actual projects and use only results
              you can verify.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Project Manager Bullets
              </Link>
              <Link
                href="/ats-resume-checker"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Check Resume Against a Job
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                30 original examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                ATS keyword guidance
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented results
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-07">August 7, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="formula-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Writing formula
              </p>
              <h2
                id="formula-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Build each bullet around leadership, scope, and outcome
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + project responsibility + scope or method
                  + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for managing projects.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Led cross-functional project planning, maintained the
                      delivery schedule, resolved dependencies, and provided
                      stakeholders with clear risk and milestone updates.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Resume examples
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                30 project manager resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Select only examples that reflect work you performed. Replace
                bracketed placeholders with verified figures from project plans,
                budgets, reports, dashboards, or approved records.
              </p>

              <div className="mt-8 space-y-8">
                {bulletGroups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {group.description}
                    </p>

                    <ul className="mt-6 space-y-4">
                      {group.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300"
                          >
                            ✓
                          </span>
                          <p className="leading-7 text-slate-200">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="keywords-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
                ATS keyword guidance
              </p>
              <h2
                id="keywords-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Project manager resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your experience and use only terms that accurately describe
                your methods, tools, responsibilities, and industry.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {keywordGroups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {group.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="without-metrics-heading"
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8"
            >
              <h2
                id="without-metrics-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How to show project impact without confidential numbers
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If budgets, customer names, or performance figures are
                confidential, describe the project type, complexity,
                stakeholders, dependencies, governance, decisions, and outcome.
                You can show credible impact without exposing protected details
                or inventing a metric.
              </p>
              <Link
                href="/guides/resume-bullets-without-metrics"
                className="mt-6 inline-flex font-semibold text-emerald-300 hover:text-emerald-200"
              >
                Read the complete no-metrics resume bullet guide →
              </Link>
            </section>

            <section aria-labelledby="tailoring-heading">
              <h2
                id="tailoring-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to tailor these bullets to a project manager job
              </h2>

              <ol className="mt-7 space-y-4">
                {tailoringSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-300">
                      {index + 1}
                    </span>
                    <p className="pt-1 leading-7 text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="related-guides-heading">
              <h2
                id="related-guides-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Related resume bullet guides
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Link
                  href="/guides/administrative-assistant-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Administrative Assistant Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Adapt scheduling, meeting, document, vendor, and team
                    support examples for project coordinator roles.
                  </p>
                </Link>

                <Link
                  href="/guides/software-engineer-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Software Engineer Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review technical delivery, performance, cloud, testing, and
                    leadership examples for technology projects.
                  </p>
                </Link>
              </div>
            </section>

            <section
              aria-labelledby="faq-heading"
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
            >
              <h2
                id="faq-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Frequently asked questions
              </h2>

              <div className="mt-7 divide-y divide-slate-800">
                {faqItems.map((item) => (
                  <section key={item.question} className="py-6 first:pt-0">
                    <h3 className="text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {item.answer}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-7 text-center sm:p-10">
              <h2 className="text-3xl font-bold text-white">
                Turn your project experience into stronger bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Add your job title, responsibility, achievement, and optional
                verified metric to generate three tailored bullet options.
                Review each result before using it on your resume.
              </p>
              <Link
                href="/resume-bullet-generator#generator"
                className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Open the Free AI Resume Bullet Generator
              </Link>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">On this page</h2>
              <nav className="mt-4 space-y-3 text-sm">
                <a
                  href="#formula-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Resume bullet formula
                </a>
                <a
                  href="#examples-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  30 bullet examples
                </a>
                <a
                  href="#keywords-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS keywords
                </a>
                <a
                  href="#without-metrics-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Confidential metrics
                </a>
                <a
                  href="#tailoring-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Tailoring steps
                </a>
                <a
                  href="#related-guides-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Related guides
                </a>
                <a
                  href="#faq-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  FAQ
                </a>
              </nav>
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <h2 className="font-bold text-emerald-200">Accuracy reminder</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use only truthful projects, responsibilities, tools,
                certifications, budgets, and results. Strong wording must not
                create experience or authority you did not have.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related tools</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/resume-bullet-generator"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  AI Resume Bullet Generator
                </Link>
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Free ATS Resume Checker
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">More resume guides</h2>
              <Link
                href="/guides"
                className="mt-4 block text-sm font-semibold text-blue-300 hover:text-blue-200"
              >
                Browse all ResumeClimb AI guides →
              </Link>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="project-manager-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
