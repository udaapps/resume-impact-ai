import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/resume-action-verbs";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "200+ Resume Action Verbs With Examples";
const PAGE_DESCRIPTION =
  "Choose precise resume action verbs from 220 categorized examples, match each verb to your real contribution, and write stronger evidence-based bullets.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ResumeClimb AI`,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "resume action verbs",
    "action words for resume",
    "resume power words",
    "strong action verbs for resume",
    "resume bullet action verbs",
    "verbs for resume achievements",
    "resume action verb examples",
    "ATS resume action words",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: "200+ Resume Action Verbs With Truthful Bullet Examples",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume action verbs with evidence-based bullet examples",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "200+ Resume Action Verbs With Examples",
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

const ownershipLevels = [
  {
    title: "You owned or led the work",
    examples: "Led, directed, managed, supervised, oversaw",
    guidance:
      "Use these only when you had genuine accountability, decision authority, team responsibility, or ownership of the work described.",
  },
  {
    title: "You coordinated the work",
    examples: "Coordinated, organized, facilitated, scheduled, aligned",
    guidance:
      "Use these when you connected people, timelines, information, resources, or follow-up without claiming full ownership.",
  },
  {
    title: "You contributed or supported",
    examples: "Collaborated, contributed, assisted, supported, prepared",
    guidance:
      "These can be accurate and strong when followed by a specific task, scope, tool, deliverable, or contribution.",
  },
  {
    title: "You learned or practiced",
    examples: "Completed, practiced, built, tested, analyzed",
    guidance:
      "Use project, coursework, training, or volunteer context honestly. Do not present learning activity as paid professional ownership.",
  },
] as const;

const formulaParts = [
  {
    label: "Precise action verb",
    guidance:
      "Choose a verb that matches what you personally did and your real contribution level.",
  },
  {
    label: "Specific task or deliverable",
    guidance:
      "Name the customer issue, report, feature, process, shipment, document, project, or other work completed.",
  },
  {
    label: "Useful scope, method, or tool",
    guidance:
      "Add the relevant channel, stakeholder, system, method, environment, volume, or complexity when supported.",
  },
  {
    label: "Accurate result or contribution",
    guidance:
      "Use a verified metric when available. Otherwise show quality, consistency, ownership, usefulness, complexity, or the output delivered.",
  },
] as const;

const writingSteps = [
  {
    title: "Write the facts before choosing the verb",
    description:
      "Record what you did, what you worked on, who or what it supported, which tools or methods you used, and what happened. Do not start by searching for an impressive word.",
  },
  {
    title: "Define your contribution level",
    description:
      "Decide whether you owned, led, coordinated, contributed, supported, observed, or learned the work. This prevents a stronger-sounding verb from changing the facts.",
  },
  {
    title: "Select the most precise action",
    description:
      "Prefer a verb that communicates the actual task. For example, analyzed, reconciled, configured, trained, scheduled, or resolved is clearer than worked on.",
  },
  {
    title: "Add the object of the action",
    description:
      "State what you analyzed, reconciled, configured, trained, scheduled, or resolved. A verb without a clear object remains vague.",
  },
  {
    title: "Add supported context",
    description:
      "Use accurate tools, channels, stakeholders, work settings, project types, product areas, or responsibilities that make the contribution understandable.",
  },
  {
    title: "Add evidence without inventing a metric",
    description:
      "Use a verified number when it adds meaning. If no reliable number exists, show the deliverable, scope, quality, process change, problem solved, or stakeholder supported.",
  },
  {
    title: "Audit the finished claim",
    description:
      "Confirm that the verb, ownership, tool, scope, metric, and result are accurate. Keep only statements you can explain confidently in an interview.",
  },
] as const;

const verbGroups = [
  {
    title: "Leadership and ownership",
    purpose:
      "Use when you genuinely directed people, work, decisions, or accountability.",
    caution:
      "Do not replace contributed with led merely to sound senior. Management and supervision are factual responsibilities.",
    verbs: [
      "Led",
      "Directed",
      "Managed",
      "Supervised",
      "Oversaw",
      "Chaired",
      "Delegated",
      "Mentored",
      "Mobilized",
      "Governed",
    ],
  },
  {
    title: "Planning and organization",
    purpose:
      "Use for timelines, priorities, resources, meetings, logistics, and structured preparation.",
    caution:
      "Name what you planned or coordinated and avoid implying budget or decision authority you did not hold.",
    verbs: [
      "Planned",
      "Organized",
      "Coordinated",
      "Scheduled",
      "Prioritized",
      "Allocated",
      "Arranged",
      "Prepared",
      "Structured",
      "Orchestrated",
    ],
  },
  {
    title: "Improvement and change",
    purpose:
      "Use when you changed a process, system, workflow, document, service, or result.",
    caution:
      "Improved and optimized imply a meaningful difference. Explain the change and use a result only when supported.",
    verbs: [
      "Improved",
      "Streamlined",
      "Optimized",
      "Simplified",
      "Standardized",
      "Updated",
      "Redesigned",
      "Refined",
      "Strengthened",
      "Revamped",
    ],
  },
  {
    title: "Creation and development",
    purpose:
      "Use for new products, resources, processes, systems, content, programs, or services.",
    caution:
      "Created and pioneered imply substantial authorship or origination. Use contributed or supported when the work was shared or limited.",
    verbs: [
      "Created",
      "Built",
      "Developed",
      "Designed",
      "Launched",
      "Established",
      "Introduced",
      "Formulated",
      "Produced",
      "Pioneered",
    ],
  },
  {
    title: "Research and analysis",
    purpose:
      "Use for questions, evidence, patterns, findings, risks, options, and evaluation work.",
    caution:
      "State what you examined and why. Research exposure does not automatically prove advanced statistical or domain expertise.",
    verbs: [
      "Analyzed",
      "Researched",
      "Investigated",
      "Evaluated",
      "Assessed",
      "Examined",
      "Audited",
      "Surveyed",
      "Interpreted",
      "Identified",
    ],
  },
  {
    title: "Technical and engineering work",
    purpose:
      "Use for software, systems, infrastructure, hardware, testing, and technical support.",
    caution:
      "Name only tools, languages, environments, and technical responsibilities you actually used.",
    verbs: [
      "Engineered",
      "Programmed",
      "Configured",
      "Integrated",
      "Deployed",
      "Tested",
      "Debugged",
      "Automated",
      "Maintained",
      "Troubleshot",
    ],
  },
  {
    title: "Data, measurement, and reporting",
    purpose:
      "Use for gathering, checking, modeling, monitoring, and communicating information.",
    caution:
      "Separate data collection from analysis and decision-making. State your actual role in the reporting process.",
    verbs: [
      "Collected",
      "Cleaned",
      "Validated",
      "Calculated",
      "Modeled",
      "Forecasted",
      "Visualized",
      "Reported",
      "Monitored",
      "Measured",
    ],
  },
  {
    title: "Sales and business development",
    purpose:
      "Use for leads, opportunities, accounts, negotiations, revenue activity, and customer growth.",
    caution:
      "Do not claim revenue, quota attainment, acquisition, or retention without reliable records and a clear connection to your work.",
    verbs: [
      "Prospected",
      "Pitched",
      "Negotiated",
      "Closed",
      "Sold",
      "Upsold",
      "Cross-sold",
      "Acquired",
      "Retained",
      "Expanded",
    ],
  },
  {
    title: "Customer service and support",
    purpose:
      "Use for inquiries, complaints, guidance, follow-up, documentation, and issue resolution.",
    caution:
      "Improved satisfaction and retention are result claims. Use them only when your evidence supports the connection.",
    verbs: [
      "Resolved",
      "Assisted",
      "Advised",
      "Responded",
      "Supported",
      "Guided",
      "Educated",
      "De-escalated",
      "Followed up",
      "Documented",
    ],
  },
  {
    title: "Writing and communication",
    purpose:
      "Use for documents, presentations, messages, explanations, publications, and language work.",
    caution:
      "Identify the audience, format, subject, or purpose. Communicated alone is usually too broad.",
    verbs: [
      "Wrote",
      "Authored",
      "Edited",
      "Presented",
      "Briefed",
      "Explained",
      "Communicated",
      "Corresponded",
      "Published",
      "Translated",
    ],
  },
  {
    title: "Collaboration and stakeholder work",
    purpose:
      "Use when results depended on shared work, consultation, alignment, or coordination across groups.",
    caution:
      "Name your contribution to the shared work. Collaboration does not mean you owned every team result.",
    verbs: [
      "Collaborated",
      "Partnered",
      "Consulted",
      "Facilitated",
      "Liaised",
      "Contributed",
      "Cooperated",
      "Aligned",
      "Convened",
      "Mediated",
    ],
  },
  {
    title: "Teaching, training, and enablement",
    purpose:
      "Use for instruction, onboarding, coaching, demonstrations, and capability building.",
    caution:
      "Distinguish formal training ownership from peer assistance, demonstrations, or participation in onboarding.",
    verbs: [
      "Trained",
      "Instructed",
      "Coached",
      "Tutored",
      "Demonstrated",
      "Onboarded",
      "Oriented",
      "Motivated",
      "Enabled",
      "Reinforced",
    ],
  },
  {
    title: "Administrative and records work",
    purpose:
      "Use for transactions, files, records, documents, tracking, routing, and information retrieval.",
    caution:
      "Add the record type, system, volume, stakeholder, or accuracy requirement when it helps explain the work.",
    verbs: [
      "Administered",
      "Processed",
      "Recorded",
      "Filed",
      "Tracked",
      "Cataloged",
      "Compiled",
      "Routed",
      "Transcribed",
      "Retrieved",
    ],
  },
  {
    title: "Finance and accounting",
    purpose:
      "Use for budgets, accounts, invoices, projections, payments, controls, and reconciliation.",
    caution:
      "Distinguish preparing, processing, reviewing, approving, and owning financial work. These represent different authority levels.",
    verbs: [
      "Budgeted",
      "Reconciled",
      "Invoiced",
      "Posted",
      "Balanced",
      "Estimated",
      "Projected",
      "Authorized",
      "Disbursed",
      "Verified",
    ],
  },
  {
    title: "Operations, warehouse, and logistics",
    purpose:
      "Use for equipment, production, inventory movement, fulfillment, shipping, and delivery work.",
    caution:
      "Keep equipment authorization, safety records, licenses, and independent operation claims exact.",
    verbs: [
      "Operated",
      "Assembled",
      "Installed",
      "Inspected",
      "Packed",
      "Shipped",
      "Received",
      "Fulfilled",
      "Dispatched",
      "Transported",
    ],
  },
  {
    title: "Safety, security, and compliance",
    purpose:
      "Use for protection, access, observation, rules, incident handling, and risk controls.",
    caution:
      "Do not overstate legal authority, clearance, certifications, enforcement powers, or responsibility for an entire safety program.",
    verbs: [
      "Secured",
      "Patrolled",
      "Enforced",
      "Safeguarded",
      "Detected",
      "Prevented",
      "Escalated",
      "Controlled",
      "Protected",
      "Complied",
    ],
  },
  {
    title: "Helping, care, and community work",
    purpose:
      "Use for client, patient, student, family, public, or community support when the verb matches your role.",
    caution:
      "Clinical, therapeutic, counseling, and regulated actions must match your training, authorization, credentials, and work setting.",
    verbs: [
      "Cared for",
      "Counseled",
      "Advocated",
      "Referred",
      "Screened",
      "Triaged",
      "Rehabilitated",
      "Comforted",
      "Accompanied",
      "Connected",
    ],
  },
  {
    title: "Marketing and creative work",
    purpose:
      "Use for audiences, campaigns, channels, messaging, brand assets, and content production.",
    caution:
      "Separate strategy ownership from execution support and connect performance claims only to reliable campaign evidence.",
    verbs: [
      "Marketed",
      "Promoted",
      "Campaigned",
      "Advertised",
      "Targeted",
      "Segmented",
      "Branded",
      "Curated",
      "Crafted",
      "Generated",
    ],
  },
  {
    title: "Human resources and people operations",
    purpose:
      "Use for recruiting, selection, onboarding, evaluation, engagement, and employee processes.",
    caution:
      "Hiring, appraisal, disciplinary, and employment-decision verbs imply specific responsibility or authority.",
    verbs: [
      "Recruited",
      "Interviewed",
      "Hired",
      "Sourced",
      "Selected",
      "Appraised",
      "Recognized",
      "Engaged",
      "Inducted",
      "Offboarded",
    ],
  },
  {
    title: "Problem-solving and recovery",
    purpose:
      "Use for diagnosing issues, correcting errors, restoring service, adapting, and removing obstacles.",
    caution:
      "Explain the problem and your action. Fixed or eliminated may overstate the outcome when the issue was only reduced or temporarily addressed.",
    verbs: [
      "Diagnosed",
      "Corrected",
      "Restored",
      "Remedied",
      "Adapted",
      "Adjusted",
      "Recovered",
      "Eliminated",
      "Addressed",
      "Fixed",
    ],
  },
  {
    title: "Efficiency and measurable results",
    purpose:
      "Use when supported evidence shows a change in time, cost, output, quality, volume, access, or performance.",
    caution:
      "These verbs imply a result. Do not add a percentage, amount, or causal connection that you cannot verify.",
    verbs: [
      "Reduced",
      "Increased",
      "Accelerated",
      "Shortened",
      "Saved",
      "Minimized",
      "Consolidated",
      "Centralized",
      "Digitized",
      "Modernized",
    ],
  },
  {
    title: "Support, participation, and early experience",
    purpose:
      "Use for accurate contributions in entry-level, internship, volunteer, training, and supporting roles.",
    caution:
      "These verbs can be effective when followed by specific work. Do not replace them with ownership language that changes your role.",
    verbs: [
      "Helped",
      "Participated",
      "Shadowed",
      "Observed",
      "Practiced",
      "Learned",
      "Completed",
      "Delivered",
      "Handled",
      "Performed",
    ],
  },
] as const;

const rewriteExamples = [
  {
    title: "Reporting",
    weak: "Responsible for weekly reports.",
    stronger:
      "Compiled and validated weekly operations reports for department managers using Excel and source-system data.",
    reason:
      "The rewrite names the actions, output, audience, tool, and source without inventing a performance result.",
  },
  {
    title: "Customer support",
    weak: "Worked on customer complaints.",
    stronger:
      "Resolved billing and account complaints across phone and email and documented follow-up actions in the CRM.",
    reason:
      "Resolved is appropriate only if you completed the issue. Use investigated, escalated, or assisted when that better matches your role.",
  },
  {
    title: "New-hire support",
    weak: "Led employee training.",
    stronger:
      "Assisted with new-hire onboarding by demonstrating service procedures and answering workflow questions.",
    reason:
      "The accurate support verb is stronger than an unsupported claim of training ownership.",
  },
  {
    title: "Project communication",
    weak: "Managed a major system implementation.",
    stronger:
      "Coordinated status updates, action items, and meeting follow-up for a cross-functional system implementation.",
    reason:
      "The rewrite shows a valuable contribution without claiming ownership of the entire implementation.",
  },
  {
    title: "Process improvement without a metric",
    weak: "Improved efficiency by 40% through process optimization.",
    stronger:
      "Standardized the intake checklist and documented handoff steps to create a more consistent review process.",
    reason:
      "The supported process change remains useful even when no reliable percentage is available.",
  },
  {
    title: "Technical team contribution",
    weak: "Spearheaded the cloud migration.",
    stronger:
      "Configured application settings and tested deployment workflows as part of the migration team.",
    reason:
      "The rewrite identifies the actual technical contribution and avoids unsupported leadership or full-project ownership.",
  },
  {
    title: "Spreadsheet work",
    weak: "Used Excel for finance tasks.",
    stronger:
      "Reconciled monthly expense records in Excel using formulas, filters, and pivot tables.",
    reason:
      "A precise finance verb plus the record type and functions demonstrates the skill in context.",
  },
  {
    title: "Security work",
    weak: "Maintained a safe environment.",
    stronger:
      "Patrolled assigned areas, monitored access points, and documented incidents according to site procedures.",
    reason:
      "The rewrite replaces a broad outcome claim with observable actions and documented scope.",
  },
] as const;

const carefulPhrases = [
  {
    phrase: "Responsible for / Duties included",
    guidance:
      "These phrases describe assignment rather than action. When accurate, begin with what you processed, prepared, resolved, maintained, coordinated, or delivered.",
  },
  {
    phrase: "Worked on / Helped with",
    guidance:
      "They are not always wrong, especially in supporting roles, but they need a specific contribution. Use assisted, contributed, prepared, tested, documented, or another precise verb when supported.",
  },
  {
    phrase: "Spearheaded / Pioneered / Revolutionized",
    guidance:
      "These imply major origination, ownership, or transformation. Use them only when the evidence and scope genuinely support that level.",
  },
  {
    phrase: "Improved / Increased / Reduced / Saved",
    guidance:
      "These are result verbs. Explain what changed and verify any number, timeframe, or causal connection before including it.",
  },
  {
    phrase: "Expert / Mastered / World-class",
    guidance:
      "These are not action verbs and are difficult to substantiate. Show the complexity, functions, outputs, credentials, or responsibility level instead.",
  },
  {
    phrase: "Single-handedly / Solely",
    guidance:
      "Avoid erasing collaborators or overstating individual ownership. Describe your contribution and the team or stakeholder context accurately.",
  },
] as const;

const noMetricsEvidence = [
  "Scope: the type of customers, stakeholders, products, records, systems, locations, or work supported.",
  "Ownership: what you independently handled, coordinated, reviewed, prepared, or delivered.",
  "Complexity: competing priorities, multiple channels, sensitive records, technical dependencies, or cross-functional work.",
  "Quality: accuracy, consistency, compliance with a real procedure, clear documentation, or reliable follow-through.",
  "Problem solved: the issue investigated, error corrected, risk addressed, or workflow clarified.",
  "Deliverable: the report, dashboard, feature, schedule, guide, shipment, presentation, analysis, or process produced.",
] as const;

const commonMistakes = [
  {
    title: "Choosing the strongest-sounding verb first",
    description:
      "Start with the facts. An impressive verb can quietly change a supporting contribution into an unsupported ownership or result claim.",
  },
  {
    title: "Beginning every bullet with the same verb",
    description:
      "Repetition can hide the range of your work. Use different precise verbs when the underlying actions are genuinely different.",
  },
  {
    title: "Using a synonym that changes responsibility",
    description:
      "Managed, coordinated, contributed, and assisted are not interchangeable. Select the word that preserves your actual role.",
  },
  {
    title: "Adding a result because the verb implies one",
    description:
      "Increased, reduced, improved, retained, and saved require support. Do not invent an outcome to complete a template.",
  },
  {
    title: "Replacing job-specific keywords with creative synonyms",
    description:
      "Action verbs improve clarity, but important tools, methods, responsibilities, and credentials should use accurate terminology that matches your evidence.",
  },
  {
    title: "Turning every duty into an achievement",
    description:
      "Routine responsibilities can still be valuable. Describe them clearly rather than manufacturing exceptional impact for every bullet.",
  },
] as const;

const finalChecklist = [
  "Every bullet starts with an action or contribution that accurately describes my work.",
  "The verb matches whether I owned, led, coordinated, contributed to, supported, or learned the work.",
  "I named the object of the action instead of leaving the verb vague.",
  "Tools, systems, methods, channels, stakeholders, and work settings are accurate.",
  "Result verbs are connected only to outcomes I can support.",
  "Every number, percentage, volume, timeframe, team size, and financial claim is verified.",
  "I used non-metric evidence when reliable numbers were unavailable.",
  "I did not erase collaborators or claim full ownership of shared work.",
  "Important job-specific keywords remain clear and truthful.",
  "Repeated verbs were changed only when a different verb remained accurate.",
  "Coursework, projects, volunteering, internships, and training are labeled honestly.",
  "I can explain the facts behind every verb and bullet during an interview.",
] as const;

const faqItems = [
  {
    question: "What are resume action verbs?",
    answer:
      "Resume action verbs are words or short phrases that describe what you did, such as analyzed, coordinated, resolved, built, trained, or documented. They are most useful when followed by a specific task, context, and supported contribution or result.",
  },
  {
    question: "Should every resume bullet start with an action verb?",
    answer:
      "Experience and project bullets commonly benefit from a clear action-led structure. The exact format may vary, but each bullet should make your contribution easy to understand without changing the facts.",
  },
  {
    question: "Are power words different from action verbs?",
    answer:
      "Power word is often a marketing label for strong-sounding language. Precision matters more than power. A simple verb that accurately reflects your work is better than dramatic wording that overstates ownership, seniority, or results.",
  },
  {
    question: "Which action verbs should I avoid on a resume?",
    answer:
      "Avoid or revise vague phrases such as responsible for and worked on when a precise action is available. Use high-ownership or result verbs such as spearheaded, transformed, increased, reduced, or saved only when your evidence supports them.",
  },
  {
    question: "Can I use the same action verb more than once?",
    answer:
      "Yes. Accuracy matters more than forced variety. If several bullets describe the same real action, repetition can be acceptable. When the actions differ, choose precise verbs that reveal that difference.",
  },
  {
    question: "How do I write a strong bullet without a metric?",
    answer:
      "Combine an accurate action verb with the task and evidence such as scope, ownership, complexity, quality, stakeholders, tools, problems solved, or deliverables. A number is optional and should be included only when reliable and relevant.",
  },
  {
    question: "Do action verbs improve ATS results?",
    answer:
      "Action verbs can make responsibilities easier to understand, but they do not replace relevant skills, tools, methods, credentials, and job-specific terminology. Applicant tracking systems and employer workflows vary, so no verb list guarantees selection.",
  },
  {
    question: "Can entry-level candidates use leadership action verbs?",
    answer:
      "Yes, when leadership is supported by a real project, student organization, volunteering, sport, caregiving, community activity, or work responsibility. Label the context honestly and do not inflate participation into management or supervision.",
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

export default function ResumeActionVerbsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "200+ Resume Action Verbs With Examples",
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
        name: "Resume Action Verbs",
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
            className="text-lg font-bold tracking-tight text-white"
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
              <span className="text-slate-300">Resume Action Verbs</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Truth-First Resume Writing Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              200+ Resume Action Verbs With Examples
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Choose from 220 categorized action verbs, match each word to your
              real contribution, and build clearer resume bullets without
              overstating ownership, seniority, or results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Evidence-Based Bullets
              </Link>
              <Link
                href="/guides/resume-bullets-without-metrics"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Write Bullets Without Metrics
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                220 unique action verbs
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                22 practical categories
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No inflated claims
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="definition-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Precision before power
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What makes an action verb strong?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                A strong resume action verb tells the reader what you actually
                did. Its value comes from precision—not drama. Analyzed,
                reconciled, configured, resolved, trained, and scheduled each
                communicate a different contribution.
              </p>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                The verb must preserve the facts. If you assisted with a
                project, changing assisted to led does not improve the bullet;
                it changes your role. Start with evidence, select the accurate
                verb, and then add useful context.
              </p>
            </section>

            <section aria-labelledby="ownership-heading">
              <h2
                id="ownership-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Match the verb to your contribution level
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {ownershipLevels.map((level) => (
                  <article
                    key={level.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {level.title}
                    </h3>
                    <p className="mt-3 font-semibold text-blue-300">
                      {level.examples}
                    </p>
                    <p className="mt-3 leading-7 text-slate-400">
                      {level.guidance}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Evidence-based bullet formula
              </p>
              <h2
                id="formula-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Action + task + context + supported result
              </h2>
              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Precise verb + specific work + useful scope or tool + accurate
                  result or contribution
                </p>
              </div>
              <ol className="mt-7 space-y-5">
                {formulaParts.map((part, index) => (
                  <li
                    key={part.label}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {part.label}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {part.guidance}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="steps-heading">
              <h2
                id="steps-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to choose the right resume action verb
              </h2>
              <ol className="mt-8 space-y-5">
                {writingSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="verbs-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Categorized action-word library
              </p>
              <h2
                id="verbs-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                220 resume action verbs by responsibility
              </h2>
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  Choose a verb only after confirming the underlying action.
                  Some words can fit more than one type of work, but their
                  meaning should remain accurate in your sentence.
                </p>
              </div>

              <div className="mt-8 space-y-7">
                {verbGroups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {group.purpose}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-amber-200">
                      <strong>Truth check:</strong> {group.caution}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {group.verbs.map((verb) => (
                        <li
                          key={verb}
                          className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-center font-semibold text-slate-200"
                        >
                          {verb}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="rewrites-heading">
              <h2
                id="rewrites-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Weak and stronger resume bullet examples
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                The stronger versions demonstrate structure. Use them only when
                the verb, task, tool, scope, and contribution accurately match
                your experience.
              </p>
              <div className="mt-8 space-y-7">
                {rewriteExamples.map((example) => (
                  <article
                    key={example.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {example.title}
                    </h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-rose-300">
                          Weak or unsupported
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.weak}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                          Stronger when supported
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.stronger}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Why:</strong>{" "}
                      {example.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="careful-heading">
              <h2
                id="careful-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume words and phrases to use carefully
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {carefulPhrases.map((item) => (
                  <article
                    key={item.phrase}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-amber-200">
                      {item.phrase}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {item.guidance}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="no-metrics-heading"
              className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 sm:p-8"
            >
              <h2
                id="no-metrics-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                Action verbs for bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                A number is optional. When reliable metrics are unavailable,
                combine an accurate action verb with another type of evidence:
              </p>
              <ul className="mt-6 space-y-4">
                {noMetricsEvidence.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-bold text-violet-200"
                    >
                      ✓
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/guides/resume-bullets-without-metrics"
                className="mt-6 inline-flex font-semibold text-violet-200 hover:text-white"
              >
                Read the complete no-metrics bullet guide →
              </Link>
            </section>

            <section
              aria-labelledby="ats-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="ats-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                Action verbs, ATS keywords, and job descriptions
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Action verbs describe what you did. Job-specific keywords often
                identify the tools, systems, methods, responsibilities,
                credentials, and subject areas the employer values. A strong
                bullet usually needs both an accurate action and clear context.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                Do not replace an important confirmed term with an unusual
                synonym merely to sound original. Use natural, accurate wording
                and remember that applicant tracking systems and employer
                configurations vary. No verb or keyword tactic guarantees an
                interview.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Learn how to use ATS keywords →
                </Link>
                <Link
                  href="/guides/skills-to-put-on-a-resume"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Choose supported resume skills →
                </Link>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Common action-verb mistakes
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {commonMistakes.map((mistake) => (
                  <article
                    key={mistake.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {mistake.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {mistake.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="checklist-heading"
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Final factual audit
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Resume action verb checklist
              </h2>
              <ul className="mt-7 grid gap-4 md:grid-cols-2">
                {finalChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-emerald-500/20 bg-slate-950/60 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-300"
                    >
                      ✓
                    </span>
                    <span className="leading-6 text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="references-heading">
              <h2
                id="references-heading"
                className="text-3xl font-bold tracking-tight"
              >
                References and further reading
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                These university career resources provide additional action verb
                lists and bullet-writing guidance. Use any suggested word only
                when it accurately describes your contribution.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-3">
                <a
                  href="https://capd.mit.edu/resources/resume-action-verbs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    MIT CAPD: Resume Action Verbs
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Provides action verbs organized around management,
                    communication, research, technical, and other skills.
                  </p>
                </a>
                <a
                  href="https://www.colorado.edu/career/job-searching/resumes-and-cover-letters/resumes/action-verbs-use-your-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    University of Colorado: Action Verbs
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Groups verbs by the type of responsibility or capability a
                    candidate wants to communicate.
                  </p>
                </a>
                <a
                  href="https://www.careereducation.columbia.edu/resources/resumes-impact-creating-strong-bullet-points"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Columbia CCE: Strong Bullet Points
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Connects action verbs with skills, responsibilities,
                    accomplishments, and impact-oriented bullet structures.
                  </p>
                </a>
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
                Turn your real work into stronger resume bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Add your job title, responsibility, supported achievement, and
                verified metric when available. ResumeClimb AI generates three
                options while restricting unsupported facts.
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
                  href="#definition-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  What makes a verb strong
                </a>
                <a
                  href="#ownership-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Contribution levels
                </a>
                <a
                  href="#formula-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Bullet formula
                </a>
                <a
                  href="#steps-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Selection steps
                </a>
                <a
                  href="#verbs-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  220 action verbs
                </a>
                <a
                  href="#rewrites-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Bullet rewrites
                </a>
                <a
                  href="#careful-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Words to use carefully
                </a>
                <a
                  href="#no-metrics-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Bullets without metrics
                </a>
                <a
                  href="#ats-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS and keywords
                </a>
                <a
                  href="#checklist-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Final checklist
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
              <h2 className="font-bold text-emerald-200">
                Facts choose the verb
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Decide what you did and your contribution level first. Then
                select the most precise word that preserves those facts.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">Power is not proof</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Led, transformed, increased, reduced, and saved can be useful,
                but only when your role and evidence support the claim.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/resume-bullet-generator"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  AI Resume Bullet Generator
                </Link>
                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Bullets Without Metrics
                </Link>
                <Link
                  href="/guides/skills-to-put-on-a-resume"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Skills to Put on a Resume
                </Link>
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Keyword Guide
                </Link>
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Checker
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="resume-action-verbs-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Action verbs and examples are educational and
        must be adapted to accurately reflect your own work.
      </footer>
    </main>
  );
}
