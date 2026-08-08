import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/administrative-assistant-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "30 Administrative Assistant Resume Bullet Examples",
  description:
    "Use 30 administrative assistant resume bullet examples, ATS keywords, writing formulas, and practical tips to describe office support experience.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "30 Administrative Assistant Resume Bullet Examples",
    description:
      "Write stronger administrative assistant resume bullets with original examples, ATS keywords, and truthful achievement guidance.",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "30 Administrative Assistant Resume Bullet Examples",
    description:
      "Build clear, ATS-friendly administrative assistant resume bullets without inventing achievements or metrics.",
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
    title: "Calendar, scheduling, and meeting support",
    description:
      "Use these examples when you coordinated calendars, appointments, meetings, or travel arrangements.",
    bullets: [
      "Managed calendars for multiple team members, resolved scheduling conflicts, and confirmed changes with all participants.",
      "Coordinated meetings across departments by reserving rooms, preparing agendas, and distributing supporting documents.",
      "Scheduled appointments and maintained accurate calendar details, including locations, attendees, and virtual meeting links.",
      "Organized domestic and international travel arrangements while tracking itineraries, confirmations, and required documentation.",
      "Prepared meeting materials and recorded clear action items to help owners follow up on assigned tasks.",
    ],
  },
  {
    title: "Office communication and visitor support",
    description:
      "Choose these examples when you served as a first point of contact for employees, customers, vendors, or visitors.",
    bullets: [
      "Answered and routed phone calls, responded to routine inquiries, and directed complex requests to the appropriate team member.",
      "Welcomed visitors, confirmed appointments, completed sign-in procedures, and notified employee hosts promptly.",
      "Monitored shared email inboxes and prioritized messages based on urgency, ownership, and required response time.",
      "Drafted professional emails, letters, announcements, and internal updates using approved information and formatting.",
      "Maintained positive relationships with vendors and internal teams through clear communication and reliable follow-up.",
    ],
  },
  {
    title: "Documents, records, and data entry",
    description:
      "These examples highlight organization, accuracy, confidentiality, and document-control responsibilities.",
    bullets: [
      "Created and formatted reports, presentations, spreadsheets, and correspondence using Microsoft Office and Google Workspace.",
      "Entered and updated customer, employee, or operational data while checking records for completeness and accuracy.",
      "Maintained electronic and paper filing systems so authorized employees could locate current documents efficiently.",
      "Reviewed forms and supporting documents for missing information before submitting them for approval or processing.",
      "Handled confidential records according to company procedures and limited access to authorized team members.",
    ],
  },
  {
    title: "Office operations and vendor coordination",
    description:
      "Use these bullets for supplies, purchasing, invoices, facilities requests, mail, or general office operations.",
    bullets: [
      "Monitored office supply levels, prepared purchase requests, and coordinated deliveries to prevent avoidable shortages.",
      "Processed incoming and outgoing mail, packages, and courier requests while maintaining accurate delivery records.",
      "Matched invoices with purchase information and routed complete documentation to the appropriate approver.",
      "Submitted facilities and equipment requests, tracked progress, and communicated updates to affected employees.",
      "Maintained contact information, service details, and supporting records for office vendors and suppliers.",
    ],
  },
  {
    title: "Executive, team, and project support",
    description:
      "Choose these examples when you supported leaders, coordinated projects, or helped multiple teams stay organized.",
    bullets: [
      "Provided administrative support to senior leaders by organizing priorities, preparing documents, and tracking follow-up items.",
      "Maintained project trackers and contacted task owners for updates before status meetings and reporting deadlines.",
      "Supported employee onboarding by preparing workspace requests, orientation materials, schedules, and access checklists.",
      "Compiled information from multiple departments into consistent reports for management review.",
      "Documented recurring administrative procedures to help colleagues complete tasks accurately and consistently.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace each bracketed placeholder only with a number you can verify from schedules, reports, invoices, records, or performance reviews.",
    bullets: [
      "Coordinated [X]+ monthly meetings for [Y] team members while maintaining accurate calendars and timely schedule updates.",
      "Processed [X]+ records per week with [Y%] accuracy by validating required fields before submission.",
      "Reduced document retrieval time by [X%] by reorganizing shared folders and introducing consistent file-naming standards.",
      "Supported [X] leaders across [Y] departments by managing calendars, travel requests, reports, and follow-up tasks.",
      "Reduced office supply costs by [X%] by tracking usage, comparing vendor pricing, and consolidating routine orders.",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Administrative support",
    items: [
      "calendar management",
      "meeting coordination",
      "travel arrangements",
      "office administration",
      "executive support",
      "appointment scheduling",
    ],
  },
  {
    title: "Documents and systems",
    items: [
      "Microsoft Office",
      "Google Workspace",
      "data entry",
      "document management",
      "records management",
      "spreadsheet reporting",
    ],
  },
  {
    title: "Office operations",
    items: [
      "vendor coordination",
      "invoice processing",
      "office supplies",
      "mail distribution",
      "facilities requests",
      "expense reports",
    ],
  },
  {
    title: "Transferable skills",
    items: [
      "written communication",
      "attention to detail",
      "confidentiality",
      "time management",
      "organization",
      "cross-functional collaboration",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the job description and mark repeated tasks, tools, departments, and required skills.",
  "Select examples that match administrative work you genuinely performed.",
  "Replace general wording with the actual software, documents, stakeholders, or processes you used.",
  "Add verified scope when available, such as calendars managed, records processed, leaders supported, or time saved.",
  "Remove any statement you could not explain confidently and truthfully during an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should an administrative assistant role have?",
    answer:
      "A recent and relevant position commonly needs three to six focused bullets. Older or less relevant jobs can use fewer. Prioritize responsibilities and achievements that match the target administrative assistant job.",
  },
  {
    question: "What are good administrative assistant action verbs?",
    answer:
      "Useful verbs include coordinated, scheduled, organized, prepared, maintained, processed, reviewed, supported, documented, tracked, and resolved. Choose a verb that accurately describes what you did.",
  },
  {
    question: "Should every administrative assistant bullet include a metric?",
    answer:
      "No. A strong bullet can show scope through the people supported, systems used, documents handled, departments involved, complexity managed, or outcome achieved. Use numbers only when they are accurate and meaningful.",
  },
  {
    question: "Which ATS keywords should I use?",
    answer:
      "Use keywords from the target job description that truthfully match your experience. Common examples include calendar management, Microsoft Office, Google Workspace, data entry, meeting coordination, document management, invoice processing, and executive support.",
  },
  {
    question: "What can an entry-level administrative assistant write?",
    answer:
      "Focus on transferable experience such as scheduling, customer service, data entry, document formatting, handling calls, organizing files, coordinating events, processing payments, and supporting a team. Relevant school, volunteer, internship, retail, and hospitality experience can also demonstrate these skills.",
  },
  {
    question: "Can I copy these examples exactly?",
    answer:
      "Use them as writing models, then change the task, tool, scope, and result so every bullet reflects your own experience. Never add a responsibility, achievement, or number that you cannot verify.",
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

export default function AdministrativeAssistantResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "30 Administrative Assistant Resume Bullet Examples",
    description:
      "Original administrative assistant resume bullet examples, ATS keywords, writing formulas, and practical customization guidance.",
    datePublished: "2026-08-07",
    dateModified: "2026-08-07",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "ResumeClimb AI",
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
        name: "Administrative Assistant Resume Bullet Examples",
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

      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white"
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
              <span className="text-slate-300">
                Administrative Assistant Bullets
              </span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Administrative Assistant Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Administrative Assistant Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe scheduling, office communication, document management,
              vendor coordination, and team support with clear, ATS-friendly
              bullets. Adapt each example to your real work and use only
              achievements you can verify.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Administrative Assistant Bullets
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
                No invented metrics
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-500">
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
                Build each bullet around action, task, scope, and outcome
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + administrative task + tool or scope +
                  accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for scheduling meetings.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Coordinated cross-functional meetings, resolved calendar
                      conflicts, and distributed agendas and supporting
                      documents before each session.
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
                30 administrative assistant resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Select only examples that reflect work you actually performed.
                Replace bracketed placeholders with verified figures from
                schedules, records, reports, invoices, or performance reviews.
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
                Administrative assistant resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your experience, then use the terms that accurately
                describe your responsibilities, tools, and skills.
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
                How to write strong bullets without numbers
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If you do not have reliable metrics, describe complexity and
                scope through the leaders supported, departments involved,
                systems used, documents handled, deadlines met, or problems
                resolved. A truthful, specific bullet is stronger than an
                impressive number you cannot verify.
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
                How to tailor these bullets to a job description
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
                  href="/guides/customer-service-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Customer Service Resume Bullet Examples
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Adapt support, communication, complaint resolution, and CRM
                    examples for customer-facing administrative roles.
                  </p>
                </Link>

                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Resume Bullets Without Metrics
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Show scope, complexity, collaboration, and outcomes when you
                    do not have verified numbers.
                  </p>
                </Link>

                <Link
                  href="/guides/executive-assistant-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Executive Assistant Resume Bullet Examples
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review calendar, meeting, travel, expense, communication,
                    and executive-support examples for higher-scope roles.
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
                Turn your administrative experience into stronger bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Add your job title, responsibility, achievement, and optional
                verified metric to generate three tailored bullet options.
                Review every result before adding it to your resume.
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
                  Bullets without metrics
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
                Use only truthful responsibilities, tools, achievements, and
                metrics. Strong wording should improve presentation—not create
                experience you do not have.
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

      <HumanAtsReviewCta source="administrative-assistant-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-500">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
