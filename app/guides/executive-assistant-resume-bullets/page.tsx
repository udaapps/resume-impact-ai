import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/executive-assistant-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Executive Assistant Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 executive assistant resume bullet examples for calendars, meetings, travel, expenses, communications, projects, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "executive assistant resume bullet examples",
    "executive assistant resume bullets",
    "executive assistant duties for resume",
    "executive assistant resume achievements",
    "executive assistant resume keywords",
    "C-suite executive assistant resume",
    "ATS executive assistant resume",
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
        alt: "Executive assistant resume bullet examples",
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
    title: "Executive calendars and priority management",
    description:
      "Use these examples when you managed calendars, protected focus time, coordinated priorities, or resolved scheduling conflicts.",
    bullets: [
      "Managed complex executive calendars by confirming priorities, participants, locations, preparation time, and approved schedule changes.",
      "Reviewed incoming meeting requests against stated priorities and routed conflicts or unclear decisions to the executive for confirmation.",
      "Coordinated recurring leadership commitments, deadlines, and follow-up reminders using the organization’s approved calendar and task systems.",
      "Protected designated preparation and focus time while communicating necessary schedule adjustments to affected stakeholders.",
      "Prepared concise daily or weekly schedule summaries with confirmed meetings, locations, materials, travel time, and outstanding decisions.",
    ],
  },
  {
    title: "Meetings, communications, and stakeholders",
    description:
      "Choose these examples when you organized leadership meetings, prepared materials, managed correspondence, or coordinated stakeholders.",
    bullets: [
      "Coordinated leadership meetings by confirming attendees, objectives, agendas, rooms or virtual links, materials, and access requirements.",
      "Prepared meeting materials from approved information and distributed agendas, presentations, reports, and pre-reading within required timelines.",
      "Recorded assigned decisions and action items, confirmed owners and due dates, and followed up without changing the agreed scope.",
      "Drafted routine executive correspondence from approved direction and routed sensitive, legal, financial, or policy content for review.",
      "Served as an administrative contact for internal and external stakeholders and escalated requests requiring executive judgment or authorization.",
    ],
  },
  {
    title: "Travel, itineraries, and expense coordination",
    description:
      "Select these examples when you arranged authorized travel, prepared itineraries, processed expenses, or handled itinerary changes.",
    bullets: [
      "Arranged approved air, rail, ground transport, accommodation, and meeting logistics within organizational policy and confirmed traveler preferences.",
      "Prepared consolidated itineraries with reservations, addresses, contacts, time zones, transfer details, and approved supporting documents.",
      "Monitored authorized travel changes and communicated revised bookings, timing, costs, and required decisions to affected parties.",
      "Compiled expense records, receipts, categories, and business-purpose details and submitted complete reports through the assigned finance process.",
      "Reviewed travel and expense documentation for missing information and routed exceptions or approvals to the responsible budget owner.",
    ],
  },
  {
    title: "Documents, records, and confidential information",
    description:
      "Use these examples when you prepared executive documents, maintained records, or handled sensitive information under approved access rules.",
    bullets: [
      "Prepared reports, presentations, briefing notes, correspondence, and document packs using approved source material and formatting standards.",
      "Maintained executive files and records using assigned naming, version-control, retention, access, and secure-sharing procedures.",
      "Handled sensitive schedules, communications, personnel details, financial documents, and leadership materials with appropriate discretion.",
      "Proofread executive documents for formatting, completeness, consistency, and obvious errors before routing them for substantive approval.",
      "Retrieved authorized records and background materials for meetings, requests, and decisions without disclosing restricted information.",
    ],
  },
  {
    title: "Projects, follow-up, and process improvement",
    description:
      "Choose these examples when you tracked leadership actions, supported cross-functional projects, documented workflows, or improved administrative handoffs.",
    bullets: [
      "Tracked assigned leadership actions, owners, dependencies, due dates, and status updates and escalated blockers through agreed channels.",
      "Coordinated administrative workstreams across executives, department leaders, employees, clients, vendors, and external partners.",
      "Maintained project notes, decision logs, timelines, and supporting documents for initiatives within the assigned administrative scope.",
      "Documented recurring calendar, meeting, travel, expense, and communication workflows to support consistent handoffs and coverage.",
      "Identified recurring scheduling conflicts, missing information, and follow-up delays and proposed practical workflow improvements for approval.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with information you can verify and appropriately disclose from calendars, travel records, expense systems, project logs, or performance reviews.",
    bullets: [
      "Coordinated calendars for [X] executives across [Y] time zones while meeting the verified [scheduling, response, or conflict-reduction measure].",
      "Arranged [X]+ approved trips during [period] and achieved the verified [policy-compliance, change-response, or cost measure].",
      "Prepared materials and logistics for [X]+ leadership, client, or board meetings with [Y%] verified on-time completion.",
      "Processed [X]+ expense reports per [month/quarter] with [Y%] verified accuracy or on-time submission.",
      "Reduced administrative follow-up time from [X] to [Y] by implementing the verified [tracking, reminder, or handoff process].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Executive and calendar support",
    items: [
      "executive support",
      "C-suite support",
      "calendar management",
      "inbox management",
      "priority management",
      "stakeholder communication",
    ],
  },
  {
    title: "Meetings and communications",
    items: [
      "meeting coordination",
      "agenda preparation",
      "meeting minutes",
      "board materials",
      "presentation support",
      "correspondence management",
    ],
  },
  {
    title: "Travel and expenses",
    items: [
      "travel coordination",
      "itinerary management",
      "expense reporting",
      "invoice processing",
      "vendor coordination",
      "budget tracking",
    ],
  },
  {
    title: "Tools, records, and projects",
    items: [
      "Microsoft Outlook",
      "Microsoft Office",
      "Google Workspace",
      "document management",
      "confidential information",
      "project coordination",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark the executive level, calendar complexity, meeting types, travel, expenses, communications, projects, systems, and confidentiality expectations.",
  "Choose only examples that match support you genuinely provided and the access, discretion, financial responsibility, and decision authority you actually held.",
  "Replace general wording with the real calendar, meeting, stakeholder, itinerary, document, expense system, project, or communication process you supported.",
  "Add verified evidence such as executives supported, time zones, meetings prepared, trips arranged, expenses processed, deadlines tracked, or approved time savings.",
  "Remove any C-suite, board, budget, legal, personnel, strategic decision, confidential detail, or improvement claim you cannot explain and disclose appropriately.",
] as const;

const faqItems = [
  {
    question: "How many bullets should an executive assistant role include?",
    answer:
      "A recent and relevant executive assistant role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize calendar complexity, executive level, meetings, stakeholders, travel, expenses, confidential work, projects, and verified outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for an executive assistant resume?",
    answer:
      "Useful verbs include coordinated, managed, organized, prepared, scheduled, arranged, tracked, drafted, documented, processed, resolved, and streamlined. Choose verbs that accurately reflect your responsibility, access, and authority.",
  },
  {
    question: "Should every executive assistant bullet include a metric?",
    answer:
      "No. A strong bullet can describe calendar complexity, executive level, stakeholders, meeting scope, travel, systems, sensitive work, or follow-up responsibility. Use metrics when they are accurate and appropriate to disclose, but never invent executive counts, time saved, cost reductions, or error rates.",
  },
  {
    question: "Which executive assistant ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include executive support, calendar management, meeting coordination, travel coordination, expense reporting, stakeholder communication, document management, Microsoft Outlook, Google Workspace, and project coordination.",
  },
  {
    question: "What can I write if I have no executive assistant title?",
    answer:
      "Use relevant evidence from administrative assistant, office coordinator, receptionist, project coordinator, operations, hospitality, volunteer, or internship work. Show calendars, meetings, travel, communications, records, expenses, and follow-up you genuinely supported without changing your official title or claiming executive access you did not have.",
  },
  {
    question: "How is an executive assistant different from an administrative assistant?",
    answer:
      "Administrative assistants may support a team or department, while executive assistants commonly support senior leaders with complex priorities, sensitive communications, meetings, travel, and follow-up. Duties vary by employer, so describe your actual scope and executive level rather than relying on the title alone.",
  },
  {
    question: "Can I mention board, executive, or confidential information?",
    answer:
      "Use only information you are authorized to disclose. You can describe a meeting type, document category, process, or non-sensitive scope without revealing names, strategy, personnel data, legal matters, financial details, access credentials, or restricted decisions. If disclosure is uncertain, omit the detail.",
  },
  {
    question: "Can I copy these executive assistant bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the executive level, task, system, stakeholder, scope, access, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function ExecutiveAssistantResumeBulletsPage() {
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
        name: "Executive Assistant Resume Bullet Examples",
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
              <span className="text-slate-300">Executive Assistant Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Executive Assistant Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Executive Assistant Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe calendar management, meetings, travel, expenses,
              executive communications, confidential documents, and project
              follow-up with clear, ATS-friendly bullets. Adapt every claim to
              your real access, authority, and evidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Executive Assistant Bullets
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
                Executive assistant ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented access or authority
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
                Show trusted executive support without overstating authority
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + executive-support task + scope, system,
                  or stakeholder + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for managing the executive’s schedule.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Managed an executive calendar by confirming priorities,
                      participants, preparation time, and approved schedule
                      changes with affected stakeholders.
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
                30 executive assistant resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect support, access, and authority
                you genuinely held. Replace bracketed placeholders with
                verified, non-confidential information from approved calendars,
                travel records, expense systems, project logs, or reviews.
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
                Executive assistant resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only responsibilities,
                systems, executive scope, confidential work, and authority you
                can explain confidently.
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
                How to write executive assistant bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If reliable figures are unavailable or confidential, describe
                the executive level, calendar complexity, meeting type,
                stakeholders coordinated, systems used, documents prepared, and
                follow-up responsibility you held. A specific truthful example
                is stronger than an invented time saving or executive scope.
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
                How to tailor these bullets to an executive assistant job
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
                    Review scheduling, communication, document, meeting,
                    records, vendor, and administrative-support examples.
                  </p>
                </Link>

                <Link
                  href="/guides/office-manager-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Office Manager Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review office operations, facilities, vendors, budgets,
                    scheduling, onboarding, and process-improvement examples.
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
                Turn your executive-support experience into stronger bullets
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
                Use only responsibilities, systems, executive scope, access,
                confidential work, metrics, and outcomes you can truthfully
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

      <HumanAtsReviewCta source="executive-assistant-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
