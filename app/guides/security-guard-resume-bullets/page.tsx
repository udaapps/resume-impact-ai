import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/security-guard-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Security Guard Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 security guard resume bullet examples for patrols, access control, CCTV, incident reports, emergency response, safety, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "security guard resume bullet examples",
    "security guard resume bullets",
    "security guard duties for resume",
    "security guard resume achievements",
    "security guard resume keywords",
    "security officer resume bullets",
    "ATS security guard resume",
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
        alt: "Security guard resume bullet examples",
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
    title: "Patrols and property checks",
    description:
      "Use these examples when you patrolled assigned areas, completed checkpoints, inspected access points, or reported safety and security concerns.",
    bullets: [
      "Completed assigned interior and exterior patrols and recorded required checkpoints, observations, and follow-up needs in the security log.",
      "Checked authorized doors, gates, windows, fences, lighting, locks, and restricted areas according to site procedures.",
      "Identified unusual activity, property damage, equipment issues, blocked exits, and safety hazards and reported observations through approved channels.",
      "Maintained a visible security presence in assigned areas while remaining attentive to people, property, vehicles, and environmental conditions.",
      "Secured designated areas at scheduled times and escalated missing keys, access failures, or unresolved perimeter concerns.",
    ],
  },
  {
    title: "Access control and visitor management",
    description:
      "Choose these examples when you verified access, managed visitors, controlled keys or badges, or followed entry and exit procedures.",
    bullets: [
      "Verified authorized employee, visitor, contractor, and delivery access using assigned identification, badge, list, or approval procedures.",
      "Maintained accurate visitor sign-in, badge, vehicle, delivery, and departure records without exposing restricted personal information.",
      "Issued and recovered authorized temporary badges, keys, or access items and documented transfers through the required control process.",
      "Provided clear entry, parking, waiting, escort, and restricted-area instructions using approved site information.",
      "Denied or paused unconfirmed access and contacted the responsible person when identification, authorization, or purpose could not be verified.",
    ],
  },
  {
    title: "CCTV, alarms, and security monitoring",
    description:
      "Select these examples when you monitored cameras, alarms, control panels, radios, or other assigned security systems.",
    bullets: [
      "Monitored assigned CCTV feeds, alarms, access-control alerts, and site communications for observable irregularities requiring attention.",
      "Acknowledged and escalated alarms according to site instructions and recorded the time, location, observable facts, and response taken.",
      "Used approved radios, phones, control-room systems, and incident channels to communicate concise security updates.",
      "Reviewed authorized camera views or access records for a specific reported event without exceeding assigned access or investigative authority.",
      "Reported camera, alarm, badge-reader, radio, lighting, or monitoring-system faults to the responsible technical or supervisory contact.",
    ],
  },
  {
    title: "Incident response, de-escalation, and emergencies",
    description:
      "Use these examples when you responded to disturbances, safety concerns, alarms, or emergencies within your training and post orders.",
    bullets: [
      "Assessed observable conditions, maintained a safe position, notified the required contact, and followed assigned incident-response procedures.",
      "Used calm, respectful communication to explain site rules, request cooperation, and reduce tension without overstating enforcement authority.",
      "Preserved the immediate area of an incident when required and avoided disturbing potential evidence beyond safety needs and assigned duties.",
      "Supported evacuations, medical calls, fire alarms, or other emergencies only within current training, site procedures, and dispatcher instructions.",
      "Requested supervisor, emergency-service, maintenance, or law-enforcement assistance when an incident exceeded assigned responsibility.",
    ],
  },
  {
    title: "Reports, handovers, and professional support",
    description:
      "Choose these examples when you wrote activity or incident reports, completed shift handovers, maintained equipment, or assisted site occupants.",
    bullets: [
      "Wrote factual daily activity and incident reports that separated direct observations, reported information, actions taken, and pending follow-up.",
      "Completed shift handovers with current site conditions, open incidents, access issues, equipment status, and required next actions.",
      "Maintained assigned radios, keys, badges, flashlights, logs, first-response supplies, and security equipment under established controls.",
      "Assisted employees, visitors, customers, and contractors with approved directions, site procedures, and safety information.",
      "Coordinated with supervisors, facilities, reception, operations, emergency responders, and authorized client contacts during assigned duties.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with information you can verify and appropriately disclose from patrol logs, access records, incident systems, audits, or performance reviews.",
    bullets: [
      "Completed [X] verified patrols or checkpoints per [shift/week] across the approved [site, area, or post type].",
      "Processed [X]+ authorized employee, visitor, contractor, or delivery entries per [shift/day] with [Y%] verified log accuracy.",
      "Documented [X]+ verified incidents or irregularities during [period] while meeting the recorded [report quality or submission measure].",
      "Improved the verified [response, patrol completion, access-log, handover, or report measure] from [X] to [Y] after applying [supported action].",
      "Maintained the verified [training, audit, equipment, checkpoint, or post-order compliance measure] of [X] across [approved period].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Patrol and access",
    items: [
      "security patrols",
      "access control",
      "perimeter checks",
      "property protection",
      "rule enforcement",
      "key control",
    ],
  },
  {
    title: "Monitoring and communication",
    items: [
      "CCTV monitoring",
      "video surveillance",
      "alarm response",
      "visitor screening",
      "badge systems",
      "radio communication",
    ],
  },
  {
    title: "Incidents and safety",
    items: [
      "incident reporting",
      "emergency response",
      "de-escalation",
      "conflict resolution",
      "safety procedures",
      "evacuation support",
    ],
  },
  {
    title: "Professional support",
    items: [
      "report writing",
      "shift handover",
      "loss prevention",
      "customer service",
      "first aid and CPR",
      "security license",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark its site type, post orders, patrols, access points, visitors, surveillance systems, incident duties, emergency expectations, schedule, and required credentials.",
  "Choose only examples that match posts, systems, equipment, incidents, public contact, reports, training, and security authority you genuinely held.",
  "Replace general wording with the real property type, patrol area, checkpoint, access system, camera platform, alarm, radio, incident process, and stakeholder you supported.",
  "Add verified evidence such as patrols, checkpoints, access records, visitors processed, incident reports, response times, audits, equipment checks, or training completion.",
  "Remove any license, armed status, weapon qualification, arrest, detention, use-of-force, first-aid action, theft reduction, perfect prevention, or incident outcome you cannot verify and disclose appropriately.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a security guard role include?",
    answer:
      "A recent and relevant security guard role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize site type, patrols, access control, monitoring, incident response, reports, public contact, credentials, and verified outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for a security guard resume?",
    answer:
      "Useful verbs include patrolled, monitored, verified, controlled, inspected, observed, reported, documented, responded, communicated, secured, and escalated. Choose verbs that accurately reflect your post orders, responsibility, and authority.",
  },
  {
    question: "Should every security guard bullet include a metric?",
    answer:
      "No. A strong bullet can describe the site, patrol procedure, access system, observed condition, incident process, report, communication, or handover responsibility. Use metrics when accurate and appropriate to disclose, but never invent property size, response time, incident reduction, prevention rate, or report accuracy.",
  },
  {
    question: "Which security guard ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include security patrols, access control, CCTV monitoring, alarm response, visitor screening, incident reporting, de-escalation, emergency response, report writing, and radio communication.",
  },
  {
    question: "What can I write on a security guard resume with no experience?",
    answer:
      "Use truthful evidence from reception, customer service, retail, warehouse, hospitality, event, volunteer, military, safety, or facility-support work. Show observation, reliability, rule communication, record keeping, conflict management, and emergency readiness without claiming security employment or authority you did not have.",
  },
  {
    question: "Which security licenses or certifications should I list?",
    answer:
      "Requirements vary by jurisdiction, employer, site, and armed or unarmed status. List only current credentials you actually hold, such as the applicable guard license, first aid, CPR, AED, fire-safety, screening, or role-specific training, with accurate issuer and expiration details when appropriate.",
  },
  {
    question: "Can I mention arrests, weapons, use of force, or confidential incidents?",
    answer:
      "Only describe actions you personally performed, were authorized and trained to perform, can verify, and may legally disclose. Do not imply police authority, armed status, detention powers, investigation ownership, medical treatment, or successful incident outcomes you did not have. Remove names and restricted incident details.",
  },
  {
    question: "Can I copy these security guard bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the site, post, patrol, system, equipment, incident process, scope, authority, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function SecurityGuardResumeBulletsPage() {
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
        name: "Security Guard Resume Bullet Examples",
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
              <span className="text-slate-300">Security Guard Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Security Guard Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Security Guard Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe patrols, access control, CCTV monitoring, alarms,
              incident response, reports, public contact, and emergency support
              with clear, ATS-friendly bullets. Adapt every claim to your real
              post orders, credentials, authority, and evidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Security Guard Bullets
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
                Security guard ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented authority or credentials
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
                Show alert, professional security work without invented claims
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + security task + site, post, system,
                  incident, or public context + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for watching the building and keeping it safe.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Completed assigned interior and exterior patrols,
                      documented checkpoints and observable irregularities, and
                      escalated access or safety concerns under post orders.
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
                30 security guard resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect posts, systems, incidents,
                training, and authority you genuinely held. Replace bracketed
                placeholders with verified, non-sensitive information from
                patrol logs, access records, incident systems, or reviews.
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
                Security guard resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only site, patrol, access,
                monitoring, incident, training, credential, and authority terms
                you can explain confidently.
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
                How to write security guard bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If reliable figures are unavailable or restricted, describe the
                site type, patrol method, access procedure, monitoring system,
                incident process, reports, handovers, and public contact you
                handled. A specific truthful example is stronger than invented
                response times, property sizes, or prevention rates.
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
                How to tailor these bullets to a security guard job
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
                  href="/guides/receptionist-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Receptionist Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review visitor support, calls, scheduling, records,
                    customer service, and front-desk coordination examples.
                  </p>
                </Link>

                <Link
                  href="/guides/warehouse-worker-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Warehouse Worker Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review receiving, inventory, safety, equipment, loading,
                    quality checks, teamwork, and verified results.
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
                Turn your security experience into stronger bullets
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
                Use only posts, systems, incidents, credentials, authority,
                safety responsibilities, metrics, and outcomes you can
                truthfully explain and appropriately disclose.
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

      <HumanAtsReviewCta source="security-guard-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
