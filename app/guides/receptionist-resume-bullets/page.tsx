import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/receptionist-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Receptionist Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 receptionist resume bullet examples for front desk support, calls, scheduling, visitors, records, customer service, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "receptionist resume bullet examples",
    "receptionist resume bullets",
    "front desk receptionist resume bullets",
    "receptionist job description for resume",
    "receptionist resume achievements",
    "receptionist resume keywords",
    "ATS receptionist resume",
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
        alt: "Receptionist resume bullet examples",
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
    title: "Front desk and visitor support",
    description:
      "Use these examples when you welcomed visitors, managed check-ins, prepared reception areas, or coordinated front-desk activity.",
    bullets: [
      "Welcomed visitors, confirmed the purpose of each visit, notified the appropriate host, and followed approved check-in procedures.",
      "Managed visitor sign-in records, access badges, waiting-area updates, and host notifications according to workplace procedures.",
      "Prepared the reception area, meeting rooms, visitor materials, and daily schedules before expected appointments and events.",
      "Provided approved directions and general information while routing specialized questions to the correct person or department.",
      "Received couriers and deliveries, recorded required details, and notified recipients using established front-desk procedures.",
    ],
  },
  {
    title: "Phone, email, and message handling",
    description:
      "Choose these examples when you answered calls, managed a shared inbox, recorded messages, or routed requests.",
    bullets: [
      "Answered incoming calls, identified the purpose of each inquiry, and routed callers to the appropriate contact or department.",
      "Recorded complete phone messages with caller details, the reason for contact, and the requested follow-up action.",
      "Monitored a shared reception inbox and forwarded inquiries, documents, and appointment requests to responsible team members.",
      "Used approved scripts, directories, and reference information to answer routine questions and escalate exceptions.",
      "Handled phone and email communication during busy periods while keeping messages organized for accurate follow-up.",
    ],
  },
  {
    title: "Scheduling, appointments, and calendars",
    description:
      "Use these bullets when you booked appointments, coordinated calendars, prepared meeting details, or communicated schedule changes.",
    bullets: [
      "Scheduled, confirmed, rescheduled, and cancelled appointments using the approved calendar or booking system.",
      "Coordinated staff calendars and meeting-room availability and communicated confirmed schedule changes to participants.",
      "Sent appointment reminders and prepared the location, contact, document, or arrival details visitors needed in advance.",
      "Checked appointment types, duration, availability, and routing requirements before completing each booking.",
      "Followed established cancellation, late-arrival, and no-show procedures and documented the action taken.",
    ],
  },
  {
    title: "Records, documents, and office administration",
    description:
      "Select these examples when you updated records, managed documents, processed mail, prepared correspondence, or monitored supplies.",
    bullets: [
      "Updated authorized visitor, customer, client, or patient information and handled confidential records according to workplace policy.",
      "Scanned, filed, retrieved, and distributed documents using established naming, storage, access, and retention procedures.",
      "Sorted incoming mail and packages and distributed items to the correct recipients or designated collection points.",
      "Prepared routine correspondence, forms, visitor lists, meeting materials, and front-desk reports from approved information.",
      "Monitored reception and office supplies and submitted replenishment requests through the assigned purchasing process.",
    ],
  },
  {
    title: "Customer service, issue handling, and team support",
    description:
      "Use these examples when you supported customers, handled concerns within your authority, followed up on requests, or assisted other teams.",
    bullets: [
      "Listened to visitor and customer concerns, clarified the requested assistance, and routed or escalated issues within assigned authority.",
      "Explained approved procedures, appointment requirements, service information, and next steps in clear professional language.",
      "Coordinated with administrative, security, facilities, and customer-service teams to address front-desk requests.",
      "Followed up on pending visitor, appointment, and document requests and recorded each completed action in the appropriate system.",
      "Supported meetings, events, and new-starter arrivals by preparing access details, rooms, materials, and contact information.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with a figure you can verify from call logs, booking systems, visitor records, approved surveys, or performance reviews.",
    bullets: [
      "Handled an average of [X]+ calls and [Y]+ visitors per [day/week] while meeting the organization’s verified [quality measure].",
      "Scheduled and confirmed [X]+ appointments per [week/month] with a verified confirmation rate of [Y%].",
      "Reduced booking conflicts by [X%] after introducing [verified calendar, confirmation, or scheduling process].",
      "Processed [X]+ deliveries per [week/month] with [Y%] verified accuracy in receipt and recipient records.",
      "Improved the approved visitor or customer satisfaction measure from [X] to [Y] by applying [verified service change].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Front desk and visitors",
    items: [
      "front desk operations",
      "visitor management",
      "visitor check-in",
      "access badges",
      "host notification",
      "reception area",
    ],
  },
  {
    title: "Communication and service",
    items: [
      "multi-line phone system",
      "call routing",
      "message taking",
      "email correspondence",
      "customer service",
      "issue escalation",
    ],
  },
  {
    title: "Scheduling and administration",
    items: [
      "appointment scheduling",
      "calendar management",
      "meeting rooms",
      "data entry",
      "document management",
      "mail distribution",
    ],
  },
  {
    title: "Tools, records, and quality",
    items: [
      "Microsoft Office",
      "Google Workspace",
      "CRM",
      "scheduling software",
      "records management",
      "confidentiality",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark the setting, visitor types, call duties, scheduling work, records, software, privacy requirements, and service responsibilities.",
  "Select only examples that match front-desk or customer-facing work you genuinely performed and the authority you actually held.",
  "Replace general wording with the real workplace setting, phone system, booking tool, communication channel, document type, or team supported.",
  "Add verified evidence such as daily call or visitor volume, appointments coordinated, message accuracy, response time, or approved service feedback.",
  "Remove any software, medical or legal procedure, payment responsibility, security authority, volume, or result you could not explain confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a receptionist role include?",
    answer:
      "A recent and relevant receptionist role commonly needs three to six focused bullets. Use fewer for older positions. Prioritize front-desk ownership, communication, scheduling, records, customer service, and verified results that match the target job.",
  },
  {
    question: "What are good action verbs for a receptionist resume?",
    answer:
      "Useful verbs include welcomed, answered, routed, scheduled, confirmed, coordinated, recorded, updated, prepared, processed, explained, and followed up. Choose verbs that accurately describe your work.",
  },
  {
    question: "Should every receptionist bullet include a metric?",
    answer:
      "No. A strong bullet can show the workplace setting, visitor type, communication channel, scheduling complexity, records handled, procedure followed, or team supported. Use numbers when they are accurate and meaningful, but never invent call volumes, satisfaction scores, or accuracy rates.",
  },
  {
    question: "Which receptionist ATS keywords should I use?",
    answer:
      "Use keywords from the target job description that truthfully match your work. Common examples include front desk, visitor management, multi-line phone, call routing, appointment scheduling, calendar management, data entry, customer service, correspondence, confidentiality, and Microsoft Office.",
  },
  {
    question: "What can an entry-level receptionist write?",
    answer:
      "Use transferable evidence from retail, hospitality, customer service, school offices, volunteer roles, internships, or administrative work. Focus on greeting people, answering calls, scheduling, handling information, staying organized, following procedures, and escalating questions without presenting practice as paid receptionist experience.",
  },
  {
    question: "How is a receptionist different from an administrative assistant?",
    answer:
      "Receptionist work usually emphasizes first-contact duties such as visitors, phones, messages, appointments, and front-desk procedures. Administrative assistant roles often include broader document, calendar, meeting, reporting, and team-support responsibilities. Include only the responsibilities that match your actual role.",
  },
  {
    question: "Can I use these bullets for a medical, dental, hotel, or legal receptionist role?",
    answer:
      "Yes, but adapt the setting, visitor or client type, scheduling process, software, privacy rules, payments, and escalation procedures. Do not claim clinical, legal, billing, security, or compliance authority you did not have.",
  },
  {
    question: "Can I copy these receptionist bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the setting, task, system, audience, scope, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified information.",
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

export default function ReceptionistResumeBulletsPage() {
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
        name: "Receptionist Resume Bullet Examples",
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
              <span className="text-slate-300">Receptionist Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Receptionist Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Receptionist Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe front desk support, visitors, calls, messages,
              scheduling, records, customer service, and office coordination
              with clear, ATS-friendly bullets. Use examples with or without
              metrics and adapt every claim to your real work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Receptionist Bullets
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
                Receptionist ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented impact
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
                Show front-desk ownership with specific, truthful evidence
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + front-desk task + setting, system, or
                  scope + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for greeting visitors and answering phones.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Welcomed visitors, confirmed the purpose of each visit,
                      notified hosts, and followed approved check-in
                      procedures.
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
                30 receptionist and front desk resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only receptionist or front desk examples that reflect
                work you performed. Replace bracketed placeholders with
                verified information from call logs, booking systems, visitor
                records, approved surveys, or performance reviews.
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
                Receptionist resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only duties, tools,
                procedures, and service terms you can explain confidently.
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
                How to write receptionist bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If you do not have reliable call, visitor, appointment, or
                satisfaction figures, describe the setting, people supported,
                communication channels, systems used, procedures followed,
                scheduling complexity, and responsibility you held. A specific
                truthful example is stronger than an invented number.
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
                How to tailor these bullets to a receptionist job
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
                    Review scheduling, document management, office
                    communication, vendor coordination, and team-support
                    examples.
                  </p>
                </Link>

                <Link
                  href="/guides/customer-service-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Customer Service Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review customer communication, complaint handling, CRM,
                    follow-up, teamwork, and service-result examples.
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
                Turn your front-desk experience into stronger resume bullets
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
                  Examples without metrics
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
                Use only duties, software, procedures, volumes, metrics, and
                outcomes you can truthfully explain. Do not expose confidential
                visitor, customer, client, or patient information.
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

      <HumanAtsReviewCta source="receptionist-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
