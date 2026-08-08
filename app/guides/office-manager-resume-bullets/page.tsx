import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/office-manager-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Office Manager Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 office manager resume bullet examples for operations, facilities, vendors, budgets, scheduling, onboarding, records, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "office manager resume bullet examples",
    "office manager resume bullets",
    "office manager duties for resume",
    "office manager resume achievements",
    "office manager resume keywords",
    "office operations resume bullets",
    "ATS office manager resume",
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
        alt: "Office manager resume bullet examples",
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
    title: "Office operations and facilities",
    description:
      "Use these examples when you coordinated daily office services, facilities requests, equipment, access, or workplace readiness.",
    bullets: [
      "Coordinated daily office operations across facilities, supplies, shared spaces, equipment, and administrative requests using established procedures.",
      "Logged workplace maintenance and repair requests, communicated access requirements, and followed up with responsible vendors or building contacts.",
      "Prepared workspaces, meeting areas, shared equipment, and access details for scheduled staff, visitors, and workplace activities.",
      "Maintained approved office asset and equipment records and reported damage, replacement needs, and ownership changes through the assigned process.",
      "Communicated planned service interruptions, building updates, and workplace procedures to affected teams using approved information.",
    ],
  },
  {
    title: "Scheduling, meetings, travel, and events",
    description:
      "Choose these examples when you managed calendars, meetings, rooms, travel logistics, or internal events.",
    bullets: [
      "Coordinated shared calendars, meeting rooms, participants, and required resources and communicated confirmed schedule changes.",
      "Prepared meeting logistics, agendas, materials, access instructions, catering details, and follow-up actions from approved information.",
      "Arranged authorized travel and accommodation within the assigned policy and recorded confirmations, changes, and supporting documents.",
      "Supported internal events by coordinating schedules, venues, vendors, supplies, participant information, and day-of logistics.",
      "Resolved routine calendar and room conflicts by confirming priorities and escalating decisions that exceeded assigned authority.",
    ],
  },
  {
    title: "Vendors, purchasing, expenses, and budgets",
    description:
      "Select these examples when you requested quotes, managed suppliers, processed invoices, tracked spending, or supported an approved budget.",
    bullets: [
      "Requested and compared vendor quotes against approved requirements and routed purchasing recommendations through the assigned authorization process.",
      "Maintained vendor contact, service, renewal, and document records and followed up on delivery, invoice, or performance questions.",
      "Processed approved purchase requests, invoices, expense records, and supporting documents using established finance procedures.",
      "Tracked authorized office spending against assigned categories and reported exceptions, missing documentation, or forecast concerns to budget owners.",
      "Monitored office supply levels and coordinated replenishment to maintain availability without creating unnecessary excess stock.",
    ],
  },
  {
    title: "Records, policies, onboarding, and staff support",
    description:
      "Use these examples when you maintained records, communicated procedures, coordinated new-starter logistics, or supported staff administration.",
    bullets: [
      "Maintained authorized office, vendor, asset, and administrative records using approved naming, access, retention, and confidentiality procedures.",
      "Communicated current office procedures and routed policy, HR, finance, legal, or compliance questions to the responsible specialists.",
      "Coordinated new-starter logistics including schedules, workspace requests, equipment handoffs, access steps, materials, and team notifications.",
      "Collected approved forms and administrative information and checked completion before routing items to the responsible team.",
      "Responded to staff questions about office services, supplies, rooms, facilities requests, and administrative processes within assigned authority.",
    ],
  },
  {
    title: "Team coordination and process improvement",
    description:
      "Choose these examples when you coordinated administrative work, trained colleagues, documented workflows, or improved office processes.",
    bullets: [
      "Prioritized incoming office requests and coordinated ownership, due dates, updates, and completion across responsible teams.",
      "Documented recurring office workflows, contacts, approvals, and escalation steps to support consistent administrative handoffs.",
      "Trained authorized team members on office systems, service procedures, records, and approved workplace processes.",
      "Reviewed recurring delays, errors, supply issues, and service questions and proposed practical process changes for approval.",
      "Coordinated with executives, administrative staff, facilities, finance, HR, IT, and external vendors to complete cross-functional office requests.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with data you can verify and disclose from approved budgets, invoices, service logs, schedules, or performance records.",
    bullets: [
      "Coordinated office operations for [X] staff across [Y] locations while meeting the verified [service, quality, or response measure].",
      "Reduced approved office costs by [X% or amount] after implementing [verified purchasing, vendor, inventory, or process change].",
      "Processed [X]+ invoices, purchase requests, or expense records per [month/quarter] with [Y%] verified accuracy.",
      "Coordinated onboarding logistics for [X]+ new starters during [approved period] and met the verified [readiness or completion measure].",
      "Reduced office-request turnaround time from [X] to [Y] by applying [verified intake, ownership, or follow-up process].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Office operations and facilities",
    items: [
      "office operations",
      "facilities coordination",
      "workplace services",
      "office equipment",
      "asset tracking",
      "space coordination",
    ],
  },
  {
    title: "Scheduling and support",
    items: [
      "calendar management",
      "meeting coordination",
      "travel arrangements",
      "event coordination",
      "administrative support",
      "executive support",
    ],
  },
  {
    title: "Vendors and finance",
    items: [
      "vendor management",
      "procurement",
      "budget administration",
      "invoice processing",
      "expense reporting",
      "office supply inventory",
    ],
  },
  {
    title: "People, records, and tools",
    items: [
      "onboarding coordination",
      "records management",
      "policy administration",
      "Microsoft Office",
      "Google Workspace",
      "process improvement",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark its office size, locations, facilities, vendors, budget responsibilities, calendars, onboarding work, systems, and reporting expectations.",
  "Choose only examples that match duties you genuinely performed and the financial, people, policy, or decision authority you actually held.",
  "Replace general wording with the real office service, vendor category, calendar, document, system, team, location, or process you supported.",
  "Add verified evidence such as staff or locations supported, requests completed, invoices processed, approved savings, onboarding volume, or turnaround time.",
  "Remove any budget ownership, negotiation result, HR decision, compliance authority, team supervision, confidential figure, or improvement you could not explain and disclose appropriately.",
] as const;

const faqItems = [
  {
    question: "How many bullets should an office manager role include?",
    answer:
      "A recent and relevant office manager role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize office operations, facilities, vendors, scheduling, records, staff support, process ownership, and verified results that match the target job.",
  },
  {
    question: "What are good action verbs for an office manager resume?",
    answer:
      "Useful verbs include coordinated, managed, organized, maintained, tracked, processed, prepared, implemented, documented, trained, resolved, and streamlined. Choose verbs that accurately reflect your responsibility and authority.",
  },
  {
    question: "Should every office manager bullet include a metric?",
    answer:
      "No. A strong bullet can describe the office scope, locations, vendors, processes, systems, stakeholders, confidential work, or responsibility you held. Use metrics when they are accurate, meaningful, and appropriate to disclose, but never invent savings, budget size, staff counts, or efficiency gains.",
  },
  {
    question: "Which office manager ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include office operations, facilities coordination, vendor management, procurement, budget administration, scheduling, onboarding coordination, records management, Microsoft Office, Google Workspace, and process improvement.",
  },
  {
    question: "What can I write if I have no office manager title?",
    answer:
      "Use relevant evidence from administrative assistant, receptionist, executive assistant, retail supervisor, hospitality, operations, volunteer, or project-coordination work. Show the office services, people, vendors, records, schedules, and processes you genuinely supported without changing your official title or claiming management authority you did not have.",
  },
  {
    question: "How is an office manager different from an administrative assistant?",
    answer:
      "Administrative assistants often support specific people or teams, while office managers commonly coordinate broader workplace operations, vendors, facilities, purchasing, and shared procedures. Duties vary by employer, so describe your actual scope rather than relying on the title alone.",
  },
  {
    question: "Can I include confidential budget, vendor, or staff information?",
    answer:
      "Use only information you are authorized to disclose. If exact figures are confidential, describe the approved scope with a truthful range, category, process, or non-sensitive result, or omit the figure. Never expose personal employee data, contract terms, account details, or restricted financial information.",
  },
  {
    question: "Can I copy these office manager bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the office setting, task, system, stakeholder, scope, authority, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function OfficeManagerResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-08",
    dateModified: "2026-08-08",
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
        name: "Office Manager Resume Bullet Examples",
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
              <span className="text-slate-300">Office Manager Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Office Manager Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Office Manager Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe office operations, facilities, vendors, budgets,
              scheduling, onboarding, records, team coordination, and process
              improvement with clear, ATS-friendly bullets. Adapt every claim
              to your real authority and evidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Office Manager Bullets
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
                Office manager ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented authority
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
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
                Show operational ownership without overstating authority
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + office responsibility + scope, system,
                  or stakeholder + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for running the office and ordering supplies.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Coordinated daily office services, monitored approved
                      supply levels, and routed facilities requests to
                      responsible vendors and building contacts.
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
                30 office manager resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect work and authority you
                genuinely held. Replace bracketed placeholders with verified,
                non-confidential information from approved records, budgets,
                invoices, schedules, or performance reviews.
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
                Office manager resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only responsibilities,
                systems, financial work, and authority you can explain
                confidently.
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
                How to write office manager bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If reliable figures are unavailable or confidential, describe
                the office scope, services coordinated, vendors supported,
                systems used, approvals followed, stakeholders involved, and
                responsibility you held. A specific truthful example is
                stronger than an invented saving, budget, or staff count.
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
                How to tailor these bullets to an office manager job
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
                    Review calendar, document, communication, vendor,
                    purchasing, executive-support, and administrative examples.
                  </p>
                </Link>

                <Link
                  href="/guides/receptionist-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Receptionist Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review front-desk, visitor, phone, scheduling, records,
                    customer-service, and office-coordination examples.
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
                Turn your office operations experience into stronger bullets
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
                <a href="#formula-heading" className="block text-slate-400 hover:text-white">
                  Resume bullet formula
                </a>
                <a href="#examples-heading" className="block text-slate-400 hover:text-white">
                  30 bullet examples
                </a>
                <a href="#keywords-heading" className="block text-slate-400 hover:text-white">
                  ATS keywords
                </a>
                <a href="#without-metrics-heading" className="block text-slate-400 hover:text-white">
                  Examples without metrics
                </a>
                <a href="#tailoring-heading" className="block text-slate-400 hover:text-white">
                  Tailoring steps
                </a>
                <a href="#related-guides-heading" className="block text-slate-400 hover:text-white">
                  Related guides
                </a>
                <a href="#faq-heading" className="block text-slate-400 hover:text-white">
                  FAQ
                </a>
              </nav>
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <h2 className="font-bold text-emerald-200">Accuracy reminder</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use only responsibilities, systems, authority, budgets,
                vendors, staff scope, metrics, and outcomes you can truthfully
                explain and appropriately disclose.
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

      <HumanAtsReviewCta source="office-manager-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
