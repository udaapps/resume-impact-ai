import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/how-to-write-work-experience-on-resume";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "How to Write Resume Work Experience";
const PAGE_DESCRIPTION =
  "Write a clear resume work-experience section with truthful formatting, 14 adaptable examples, evidence-based bullets, ATS tips, and career-stage guidance.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ResumeClimb AI`,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "how to write work experience on a resume",
    "resume work experience examples",
    "resume experience section",
    "how to list jobs on a resume",
    "professional experience resume",
    "work history resume format",
    "resume job description examples",
    "ATS work experience section",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: "How to Write Resume Work Experience With Examples",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "How to write a truthful resume work experience section",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write Resume Work Experience With Examples",
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

const sectionNames = [
  {
    title: "Work Experience",
    bestFor:
      "A clear default when the section includes paid employment and the meaning is obvious for the target role.",
  },
  {
    title: "Professional Experience",
    bestFor:
      "A conventional alternative for established professional roles, contract work, or a career-focused employment history.",
  },
  {
    title: "Relevant Experience",
    bestFor:
      "A mixed section containing selected employment, internships, volunteering, projects, or leadership experiences relevant to the application.",
  },
  {
    title: "Additional Experience",
    bestFor:
      "Earlier or less relevant positions that provide useful context but do not need the same detail as recent target-related work.",
  },
] as const;

const entryFields = [
  {
    label: "Job title or role label",
    guidance:
      "Use the official title when possible. If it is unclear outside the organization, add a truthful clarifier in parentheses without inventing a promotion or different seniority.",
  },
  {
    label: "Employer or organization",
    guidance:
      "Use the correct organization, client arrangement, self-employment label, agency, volunteer organization, or project context.",
  },
  {
    label: "Location or work arrangement",
    guidance:
      "City and region may be included when useful. Remote or hybrid can be stated when accurate, but the employer's location and your work arrangement are different facts.",
  },
  {
    label: "Employment dates",
    guidance:
      "Use a consistent month-and-year or year-only format. Do not extend, shorten, or merge dates to conceal gaps or overlap.",
  },
  {
    label: "Focused bullet points",
    guidance:
      "Prioritize relevant responsibilities, projects, complexity, tools, contributions, and supported results. Recent relevant roles usually deserve more detail than older roles.",
  },
] as const;

const truthRules = [
  {
    title: "Keep titles and employers accurate",
    description:
      "Do not upgrade coordinator to manager, contractor to employee, intern to analyst, or a client project to full-time employment. Clarify unusual titles without changing their meaning.",
  },
  {
    title: "Keep dates and employment types accurate",
    description:
      "Label permanent, temporary, part-time, contract, freelance, internship, volunteer, seasonal, and self-employed work correctly when the distinction matters.",
  },
  {
    title: "Match verbs to your contribution",
    description:
      "Led, managed, coordinated, contributed, assisted, and observed represent different responsibilities. Choose the verb that preserves your real role.",
  },
  {
    title: "Verify scope, tools, and credentials",
    description:
      "Name only the systems, methods, customers, equipment, licenses, teams, budgets, and authority levels you actually used or held.",
  },
  {
    title: "Use results only when supported",
    description:
      "Do not invent revenue, savings, percentages, customer scores, volumes, rankings, time reductions, or causal relationships. A clear no-metrics bullet is valid.",
  },
  {
    title: "Respect confidentiality",
    description:
      "Describe your work without exposing private customer information, proprietary data, protected records, credentials, access details, or confidential business information.",
  },
] as const;

const writingSteps = [
  {
    title: "Create a complete private work inventory",
    description:
      "List roles, employers, dates, employment types, projects, responsibilities, tools, stakeholders, achievements, metrics, training, and promotions. This private inventory can be longer than the resume.",
  },
  {
    title: "Read the target job description",
    description:
      "Mark the employer's priorities: responsibilities, tools, methods, credentials, work setting, customers, deliverables, and recurring keywords.",
  },
  {
    title: "Select the most relevant experiences",
    description:
      "Choose roles and activities that demonstrate the strongest supported overlap. Relevance matters alongside recency, career progression, and application requirements.",
  },
  {
    title: "Set a consistent entry format",
    description:
      "Use the same order, date style, heading hierarchy, spacing, and bullet structure for comparable entries. Keep essential text selectable and readable.",
  },
  {
    title: "Extract the evidence from each role",
    description:
      "Write down what you did, the problem or need, tools and methods, who or what you supported, the output, and any reliable result.",
  },
  {
    title: "Draft action-led bullets",
    description:
      "Combine an accurate action verb with the task, useful context, and a supported result or contribution. Remove generic duty language when a precise action is available.",
  },
  {
    title: "Adjust detail by relevance",
    description:
      "Give recent and closely related experience more space. Summarize older, repetitive, or less relevant work unless it provides essential context.",
  },
  {
    title: "Run a final factual audit",
    description:
      "Verify every title, employer, date, employment type, tool, credential, responsibility, metric, result, and keyword before submitting the resume.",
  },
] as const;

const experienceExamples = [
  {
    title: "Customer service representative",
    context: "Paid employment example",
    header:
      "Customer Service Representative | [Employer] | [Location] | [Month Year]–Present",
    bullets: [
      "Resolved billing, order, and account inquiries across [confirmed channels] and documented each interaction in [verified CRM or system].",
      "Followed up on unresolved cases and coordinated with [supported internal teams] to complete next steps.",
      "Handled [verified contact volume] while meeting [supported quality or service measure], when reliable records are available.",
    ],
  },
  {
    title: "Administrative assistant",
    context: "Paid employment example",
    header:
      "Administrative Assistant | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Coordinated calendars, meetings, documents, and routine correspondence for [confirmed team or stakeholder group].",
      "Maintained [record type] using [verified system] and followed established filing and confidentiality procedures.",
      "Prepared reports, agendas, or presentation materials and tracked action items through completion.",
    ],
  },
  {
    title: "Software engineer",
    context: "Technical employment example",
    header:
      "Software Engineer | [Employer] | [Location or Remote] | [Month Year]–Present",
    bullets: [
      "Developed [confirmed feature or service] using [verified languages and frameworks] for [supported product or user context].",
      "Built or maintained [API, database, test, or integration] and documented relevant technical decisions.",
      "Collaborated with [confirmed teams] to investigate defects, review changes, and support reliable releases.",
    ],
  },
  {
    title: "Data analyst",
    context: "Analytics employment example",
    header:
      "Data Analyst | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Cleaned and analyzed [confirmed data type] using [verified tools] to answer [supported business question].",
      "Developed recurring dashboards or reports for [confirmed stakeholders] and documented data definitions and refresh steps.",
      "Investigated data-quality issues and coordinated corrections with [supported source-system or business teams].",
    ],
  },
  {
    title: "Project manager or coordinator",
    context: "Scope-sensitive example",
    header:
      "[Official Project Title] | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Maintained project plans, schedules, risks, decisions, and action items for [verified project scope].",
      "Coordinated status updates and follow-up across [confirmed stakeholder groups] using [verified method or tool].",
      "Delivered, supported, or contributed to [confirmed project output] without claiming budget, team, or outcome ownership not held.",
    ],
  },
  {
    title: "Sales representative",
    context: "Revenue-related example",
    header:
      "Sales Representative | [Employer] | [Location] | [Month Year]–Present",
    bullets: [
      "Qualified prospects, documented discovery notes in [verified CRM], and prepared product presentations for [confirmed customer segment].",
      "Managed follow-up across active opportunities and coordinated pricing or technical questions with relevant teams.",
      "Generated [verified revenue or attainment result] only when records clearly support the figure and your contribution.",
    ],
  },
  {
    title: "Warehouse worker",
    context: "Operations employment example",
    header:
      "Warehouse Worker | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Picked, packed, received, or shipped [confirmed product type] according to order and quality procedures.",
      "Updated inventory records in [verified system] and reported damaged, missing, or mismatched items.",
      "Operated [authorized equipment] and followed documented safety and material-handling requirements.",
    ],
  },
  {
    title: "Delivery driver",
    context: "Transport employment example",
    header: "Delivery Driver | [Employer] | [Location] | [Month Year]–Present",
    bullets: [
      "Completed route preparation, vehicle checks, loading, deliveries, and proof-of-delivery records for [confirmed service area].",
      "Communicated delays, address issues, or damaged items and followed approved escalation procedures.",
      "Maintained [accurate license, safety record, or delivery measure] only when current records support the claim.",
    ],
  },
  {
    title: "Security guard",
    context: "Protective-services example",
    header:
      "Security Guard | [Employer or Contractor] | [Site or Location] | [Month Year]–[Month Year]",
    bullets: [
      "Patrolled assigned areas, monitored access points, and documented incidents according to site procedures.",
      "Responded to alarms or requests within authorized responsibilities and escalated events to designated contacts.",
      "Used [verified CCTV, access-control, or reporting system] without overstating clearance or legal authority.",
    ],
  },
  {
    title: "Part-time or early work experience",
    context: "Entry-level example",
    header:
      "Part-Time Cashier | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Processed customer purchases and [confirmed payment types] using [verified POS system].",
      "Assisted with returns, product questions, checkout organization, and end-of-shift procedures.",
      "Balanced assigned till records according to store procedures when this was part of the role.",
    ],
  },
  {
    title: "Internship experience",
    context: "Learning context labeled honestly",
    header:
      "Data Analytics Intern | [Organization] | [Location or Remote] | [Month Year]–[Month Year]",
    bullets: [
      "Cleaned sample or operational data in [verified tool] and documented validation checks under team guidance.",
      "Prepared charts or dashboard components for [confirmed project] and incorporated reviewer feedback.",
      "Presented project findings to [confirmed audience] without presenting supervised internship work as independent professional ownership.",
    ],
  },
  {
    title: "Volunteer experience",
    context: "Unpaid contribution labeled honestly",
    header:
      "Volunteer Coordinator | [Organization] | [Location] | [Month Year]–Present",
    bullets: [
      "Scheduled volunteers for [confirmed event or service] and communicated assignment updates and practical instructions.",
      "Maintained participation records and prepared materials for [supported program].",
      "Coordinated with [confirmed community or internal groups] to address coverage and resource needs.",
    ],
  },
  {
    title: "Freelance or contract experience",
    context: "Client arrangement labeled accurately",
    header:
      "Freelance Web Developer | Self-Employed | Remote | [Month Year]–Present",
    bullets: [
      "Built and maintained [confirmed website or feature type] for [client type] using [verified technologies].",
      "Gathered requirements, documented scope, communicated progress, and completed agreed revisions.",
      "Do not list confidential clients, revenue, traffic, or business outcomes unless disclosure is permitted and evidence is reliable.",
    ],
  },
  {
    title: "Career-change transferable experience",
    context: "Past role connected without renaming it",
    header:
      "Operations Coordinator | [Employer] | [Location] | [Month Year]–[Month Year]",
    bullets: [
      "Analyzed recurring service issues, maintained tracking reports, and shared findings with operations stakeholders.",
      "Coordinated process documentation and follow-up across customer support, finance, and technical teams.",
      "Highlight confirmed analysis and coordination skills without changing the historical title to Data Analyst or Project Manager.",
    ],
  },
] as const;

const experienceGuideLinks: Record<string, string> = {
  "Customer service representative":
    "/guides/customer-service-resume-bullets",
  "Administrative assistant":
    "/guides/administrative-assistant-resume-bullets",
  "Software engineer": "/guides/software-engineer-resume-bullets",
  "Data analyst": "/guides/data-analyst-resume-bullets",
  "Project manager or coordinator":
    "/guides/project-manager-resume-bullets",
  "Sales representative": "/guides/sales-resume-bullets",
  "Warehouse worker": "/guides/warehouse-worker-resume-bullets",
  "Delivery driver": "/guides/delivery-driver-resume-bullets",
  "Security guard": "/guides/security-guard-resume-bullets",
  "Part-time or early work experience": "/guides/cashier-resume-bullets",
};

const specialFormats = [
  {
    title: "Promotions at the same employer",
    guidance:
      "List the employer once and show each official title with its own dates and relevant bullets. This preserves progression without merging responsibilities from different levels.",
    example:
      "[Employer] | [Location]\nTeam Lead | [Month Year]–Present\nCustomer Service Representative | [Month Year]–[Month Year]",
  },
  {
    title: "Multiple concurrent roles",
    guidance:
      "List each real role with accurate dates. Overlap is not automatically a problem; altering dates to hide it creates an inaccurate history.",
    example:
      "Part-Time Bookkeeper | [Employer] | [Dates]\nFreelance Designer | Self-Employed | [Overlapping dates]",
  },
  {
    title: "Temporary or agency work",
    guidance:
      "Identify the agency and assignment relationship clearly. Do not present the client organization as your direct employer when it was not.",
    example:
      "Administrative Assistant (Temporary Assignment) | [Agency], assigned to [Client if permitted] | [Dates]",
  },
  {
    title: "Self-employment or independent contracting",
    guidance:
      "Use an accurate functional title, Self-Employed or Independent Contractor, dates, and selected client work that can be disclosed.",
    example: "Independent Mobile App Developer | Self-Employed | [Dates]",
  },
  {
    title: "Seasonal or part-time employment",
    guidance:
      "Add Seasonal or Part-Time when it clarifies the arrangement. These roles can demonstrate relevant skills without being made to look permanent or full-time.",
    example: "Seasonal Warehouse Associate | [Employer] | [Dates]",
  },
  {
    title: "Remote or hybrid work",
    guidance:
      "Remote describes the work arrangement, not necessarily the employer's location. Use a consistent format that avoids implying a different legal employer location.",
    example: "Software Support Specialist | [Employer] | Remote | [Dates]",
  },
] as const;

const noMetricsEvidence = [
  {
    title: "Scope",
    description:
      "Describe supported customers, stakeholders, records, systems, products, locations, channels, or work types.",
  },
  {
    title: "Ownership",
    description:
      "State what you independently handled, coordinated, prepared, reviewed, maintained, or delivered.",
  },
  {
    title: "Complexity",
    description:
      "Explain competing priorities, sensitive records, technical dependencies, multiple channels, or cross-functional coordination.",
  },
  {
    title: "Quality and consistency",
    description:
      "Use accurate documentation, reliable follow-up, adherence to a real procedure, validation, or error prevention.",
  },
  {
    title: "Problem solved",
    description:
      "Name the complaint, defect, mismatch, risk, delay, information gap, or process issue you addressed.",
  },
  {
    title: "Deliverable",
    description:
      "Identify the report, dashboard, schedule, feature, guide, analysis, shipment, presentation, or process produced.",
  },
] as const;

const gapGuidance = [
  {
    title: "Do not falsify dates",
    description:
      "Use accurate employment dates and do not extend one role to cover another period. A truthful timeline is the starting point.",
  },
  {
    title: "Decide whether explanation adds value",
    description:
      "A gap does not always need a detailed resume entry. When context is helpful, a concise line, summary note, or cover-letter explanation may be enough.",
  },
  {
    title: "Include relevant activity honestly",
    description:
      "Training, study, volunteering, caregiving, projects, travel, or community work can be included when relevant and when you are comfortable doing so. Label the activity accurately.",
  },
  {
    title: "Protect private information",
    description:
      "You do not need to disclose sensitive medical, family, legal, or other personal details simply to fill space. Consider local expectations and seek qualified advice for legal concerns.",
  },
] as const;

const olderExperienceRules = [
  "Treat 10–15 years as common guidance, not a universal cutoff. Relevance, field, seniority, country, and application requirements matter.",
  "Keep recent and target-related roles detailed because they usually show current responsibilities and tools.",
  "Shorten earlier roles when they repeat later experience or no longer support the target position.",
  "Include older experience when it demonstrates a still-relevant qualification, progression, domain background, or achievement.",
  "Consider an Earlier Experience section with titles and employers but fewer or no bullets when a concise timeline is useful.",
  "Follow instructions that request a complete history, especially for some government, academic, regulated, or formal application processes.",
] as const;

const rewriteExamples = [
  {
    title: "Generic duty",
    weak: "Responsible for helping customers.",
    stronger:
      "Resolved billing and account inquiries across phone and email and documented follow-up actions in the CRM.",
    reason:
      "The rewrite identifies the issues, channels, and documentation process.",
  },
  {
    title: "Unsupported management scope",
    weak: "Managed the company-wide implementation project.",
    stronger:
      "Coordinated weekly status updates and tracked action items for the operations workstream of a system implementation.",
    reason:
      "The stronger version narrows the claim to the supported contribution and workstream.",
  },
  {
    title: "Invented measurement",
    weak: "Improved office efficiency by 35%.",
    stronger:
      "Standardized the document-intake checklist and clarified handoff steps for recurring office requests.",
    reason:
      "The process contribution remains clear without an unsupported percentage.",
  },
  {
    title: "Tool list without context",
    weak: "Used SQL, Python, Excel, and Power BI.",
    stronger:
      "Cleaned operational data with SQL and Excel and developed Power BI dashboards for weekly service reporting.",
    reason:
      "The rewrite shows how the confirmed tools supported a real output.",
  },
  {
    title: "Unclear freelance history",
    weak: "Web Developer | Various Companies",
    stronger:
      "Freelance Web Developer | Self-Employed | Remote | [Accurate dates]",
    reason:
      "The clearer header identifies the real working arrangement rather than implying direct employment by multiple clients.",
  },
  {
    title: "Career-change title inflation",
    weak: "Data Analyst | [Operations Employer]",
    stronger:
      "Operations Coordinator | [Employer] — Analyzed recurring service issues and maintained weekly tracking reports in Excel.",
    reason:
      "The official title remains accurate while the bullet highlights relevant analytical work.",
  },
] as const;

const commonMistakes = [
  {
    title: "Changing an official title to match the job ad",
    description:
      "A target title is not your historical title. Add a truthful clarifier when necessary, but do not manufacture seniority or a different occupation.",
  },
  {
    title: "Using one long list of routine duties",
    description:
      "Select the responsibilities, tools, complexity, projects, and contributions most relevant to the target role instead of copying a generic job description.",
  },
  {
    title: "Giving every role equal space",
    description:
      "Recent and relevant roles usually need more detail. Older, repetitive, or less relevant positions can be summarized.",
  },
  {
    title: "Mixing achievements from different roles",
    description:
      "Keep each contribution under the employer, title, and dates where it actually occurred. Do not move a result to create a stronger recent role.",
  },
  {
    title: "Hiding essential history in graphics",
    description:
      "Keep titles, employers, dates, and bullets readable and selectable. Decorative timelines, text boxes, icons, and complex columns may create parsing or accessibility problems.",
  },
  {
    title: "Keyword stuffing",
    description:
      "Use job-description terminology when it truthfully matches your evidence. Repetition does not create experience with a missing tool, method, credential, or responsibility.",
  },
] as const;

const finalChecklist = [
  "My section heading clearly describes the experience included.",
  "Every employer, organization, client arrangement, and self-employment label is accurate.",
  "Every job title and promotion level is accurate.",
  "Dates use one consistent format and have not been altered to hide gaps or overlap.",
  "Temporary, freelance, contract, internship, volunteer, seasonal, and part-time work is labeled honestly.",
  "Recent and relevant roles receive the most useful detail.",
  "Each bullet begins with an accurate action or contribution.",
  "Tools, methods, responsibilities, scope, credentials, and authority levels are supported.",
  "Every number, percentage, financial figure, volume, team size, and timeframe is verified.",
  "I used non-metric evidence where reliable numbers were unavailable.",
  "Important job-description terminology appears naturally only when confirmed.",
  "The section uses readable formatting and selectable text.",
  "Confidential, proprietary, and protected information has been removed.",
  "I can explain every entry and bullet confidently during an interview.",
] as const;

const faqItems = [
  {
    question:
      "What should I include in the work experience section of a resume?",
    answer:
      "Include an accurate job title, employer or organization, location or work arrangement when useful, employment dates, and focused bullets describing relevant responsibilities, tools, projects, contributions, and supported results.",
  },
  {
    question: "How many bullet points should each job have?",
    answer:
      "There is no universal number. Use enough focused bullets to communicate the most relevant evidence without repeating routine details. Recent target-related roles usually deserve more detail than older or less relevant positions.",
  },
  {
    question: "How far back should work experience go on a resume?",
    answer:
      "Ten to fifteen years is common guidance, but it is not a fixed rule. Consider relevance, seniority, industry, country, resume length, and the employer's instructions. Some applications require a more complete history.",
  },
  {
    question: "Can I change my job title to match the position?",
    answer:
      "Do not replace an official title with a different or more senior title. If the internal title is unclear, you can add a short, truthful functional clarification in parentheses while preserving the original meaning.",
  },
  {
    question: "How should I list promotions at the same company?",
    answer:
      "List the employer once, then show each official title with its own accurate dates and selected bullets. This makes progression clear and prevents responsibilities from different levels being merged.",
  },
  {
    question:
      "Can freelance, volunteer, internship, or project work count as experience?",
    answer:
      "Yes, when it is relevant. Label the context accurately and describe supported work and outputs. Do not present an unpaid project, internship, volunteer role, or client engagement as permanent paid employment.",
  },
  {
    question: "How should I address an employment gap?",
    answer:
      "Keep dates accurate. A gap does not always require a detailed resume explanation. If relevant, briefly identify training, education, volunteering, projects, caregiving, or another activity without disclosing private information you prefer to keep confidential.",
  },
  {
    question: "Does every work-experience bullet need a metric?",
    answer:
      "No. A strong bullet can show scope, ownership, complexity, quality, tools, stakeholders, problems solved, or a useful deliverable. Use a number only when it is accurate, relevant, and supported.",
  },
  {
    question: "How do I make my work experience ATS-friendly?",
    answer:
      "Use a conventional section heading, consistent job-entry structure, readable selectable text, and accurate job-relevant terminology. Follow the employer's file and application instructions. Applicant tracking systems vary, so no layout or keyword tactic guarantees selection.",
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

export default function HowToWriteWorkExperienceOnResumePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write Resume Work Experience With Examples",
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
        name: "How to Write Resume Work Experience",
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
              <span className="text-slate-300">Work Experience</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Evidence-First Resume Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to Write Work Experience on a Resume
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Format job titles, employers, dates, promotions, contract and
              volunteer work, then turn real responsibilities into clear,
              relevant, evidence-based resume bullets.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Write Resume Experience Bullets
              </Link>
              <Link
                href="/ats-resume-checker"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Compare Resume With a Job
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                14 adaptable examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Work-history templates
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No altered titles or dates
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
                Build the evidence center of your resume
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What is a resume work-experience section?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                The work-experience section presents your employment and other
                relevant experience in a clear timeline. It helps the reader
                understand where you worked, the role you held, when you held
                it, what you did, and which supported contributions matter to
                the target position.
              </p>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Reverse-chronological order—most recent experience first—is a
                common default. The right section name and content depend on
                whether you are presenting paid employment only or a broader mix
                of internships, volunteering, projects, and leadership.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {sectionNames.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {section.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {section.bestFor}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="template-heading">
              <h2
                id="template-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume work-experience entry template
              </h2>
              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="font-semibold text-blue-200">
                  [Official Job Title] | [Employer] | [Location or Work
                  Arrangement] | [Month Year]–[Month Year or Present]
                </p>
                <ul className="mt-5 space-y-3 text-slate-300">
                  <li>
                    • [Accurate action + specific responsibility + context]
                  </li>
                  <li>
                    • [Project or problem + your contribution + useful output]
                  </li>
                  <li>
                    • [Verified result, or non-metric evidence when unavailable]
                  </li>
                </ul>
              </div>

              <ol className="mt-7 space-y-5">
                {entryFields.map((field, index) => (
                  <li
                    key={field.label}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {field.label}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {field.guidance}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="truth-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb truth-first rules
              </p>
              <h2
                id="truth-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Preserve the real employment record
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {truthRules.map((rule) => (
                  <article
                    key={rule.title}
                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6"
                  >
                    <h3 className="text-lg font-bold text-emerald-200">
                      {rule.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {rule.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <h2
                id="steps-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to write resume work experience step by step
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

            <section aria-labelledby="examples-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Adaptable work-history structures
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                14 resume work-experience examples
              </h2>
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  These are educational structures, not claims about you.
                  Replace bracketed fields with accurate details, remove
                  unsupported language, and use a metric only when it is
                  verified and meaningfully connected to your work.
                </p>
              </div>

              <div className="mt-8 space-y-7">
                {experienceExamples.map((example, index) => (
                  <article
                    key={example.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-300">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                          {example.context}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white">
                          {example.title}
                        </h3>
                        {experienceGuideLinks[example.title] ? (
                          <Link
                            href={experienceGuideLinks[example.title]}
                            className="mt-2 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200"
                          >
                            View role-specific resume bullet examples →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="font-semibold leading-7 text-slate-200">
                        {example.header}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-4">
                      {example.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-slate-300">
                          <span
                            aria-hidden="true"
                            className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-300"
                          >
                            ✓
                          </span>
                          <span className="leading-7">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="special-heading">
              <h2
                id="special-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to format special work situations
              </h2>
              <div className="mt-8 space-y-5">
                {specialFormats.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {item.guidance}
                    </p>
                    <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950/70 p-4 font-sans text-sm leading-6 text-blue-200">
                      {item.example}
                    </pre>
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
                How to write experience bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Numbers are useful only when they are accurate and relevant.
                When reliable measurements are unavailable, use another type of
                evidence instead of estimating a percentage.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {noMetricsEvidence.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-violet-500/20 bg-slate-950/60 p-5"
                  >
                    <h3 className="font-bold text-violet-200">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
              <Link
                href="/guides/resume-bullets-without-metrics"
                className="mt-6 inline-flex font-semibold text-violet-200 hover:text-white"
              >
                Read the complete no-metrics bullet guide →
              </Link>
            </section>

            <section aria-labelledby="gaps-heading">
              <h2
                id="gaps-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Employment gaps without altered dates
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                A gap is not permission to change the timeline. Decide what
                information is relevant, useful, and appropriate for your
                circumstances while protecting private details.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {gapGuidance.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="older-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="older-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How far back should resume experience go?
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Many guides use 10–15 years as a starting point, but the right
                decision depends on relevance, career stage, industry, country,
                application requirements, and the value of earlier work.
              </p>
              <ul className="mt-6 space-y-4">
                {olderExperienceRules.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-200"
                    >
                      ✓
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="rewrites-heading">
              <h2
                id="rewrites-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Weak and stronger work-experience examples
              </h2>
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
                          Weak or unsafe
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

            <section
              aria-labelledby="ats-heading"
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
            >
              <h2
                id="ats-heading"
                className="text-3xl font-bold tracking-tight"
              >
                ATS-friendly work-experience formatting
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Use a conventional heading such as Work Experience, Professional Experience, or Relevant Experience.",
                  "Keep job titles, employers, dates, and bullet text selectable and readable.",
                  "Use one consistent entry order and date format.",
                  "Avoid decorative timelines, rating graphics, complex tables, and text boxes when they create parsing or accessibility problems.",
                  "Use accurate job-description terminology naturally when your evidence confirms it.",
                  "Do not add a missing tool, method, credential, responsibility, or result merely to improve a match estimate.",
                  "Follow the employer's file-type, date, and application-history instructions.",
                  "Remember that ATS products and employer configurations vary; no format or keyword tactic guarantees selection.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-200"
                    >
                      ✓
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="font-semibold text-blue-300 hover:text-white"
                >
                  Review the ATS-friendly format guide →
                </Link>
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="font-semibold text-blue-300 hover:text-white"
                >
                  Learn how to use ATS keywords →
                </Link>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Work-experience mistakes to avoid
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
                Resume work-experience checklist
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
                These resources provide additional perspectives on experience
                structure, bullet writing, relevance, and older work history.
                Adapt guidance to your field, country, evidence, and the
                employer's instructions.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://drexel.edu/scdc/professional-resources/application-materials/resumes/experience-description"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Drexel University: Describe Your Experience
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Covers entry details, reverse-chronological order, action
                    verbs, responsibilities, skills, and results.
                  </p>
                </a>
                <a
                  href="https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    MIT CAPD: Writing About Your Skills
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Connects action-led experience statements with context,
                    tasks, skills, achievements, and results.
                  </p>
                </a>
                <a
                  href="https://www.coursera.org/articles/how-far-back-should-your-resume-go"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Coursera: How Far Back Should a Resume Go?
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Discusses the common 10–15 year starting point and how
                    decisions vary across career stages and circumstances.
                  </p>
                </a>
                <a
                  href="https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Harvard: Creating a Strong Resume
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Emphasizes relevant strengths and tailoring the resume to
                    the type of position being pursued.
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
                Turn real experience into focused resume bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Add your official role, real responsibility, supported result,
                and verified metric when available. Review every generated
                option before adding it to your work history.
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
                  Section purpose
                </a>
                <a
                  href="#template-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Entry template
                </a>
                <a
                  href="#truth-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Truth-first rules
                </a>
                <a
                  href="#steps-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Writing steps
                </a>
                <a
                  href="#examples-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  14 examples
                </a>
                <a
                  href="#special-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Special formats
                </a>
                <a
                  href="#no-metrics-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Bullets without metrics
                </a>
                <a
                  href="#gaps-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Employment gaps
                </a>
                <a
                  href="#older-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Older experience
                </a>
                <a
                  href="#ats-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS formatting
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
                Preserve the record
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Keep titles, employers, employment types, dates, promotions,
                responsibilities, and results accurate.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">
                Relevance is not reinvention
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Emphasize transferable work without renaming a past role or
                adding tools, authority, and outcomes you did not have.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/guides/resume-action-verbs"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Action Verbs
                </Link>
                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Bullets Without Metrics
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Tailoring Guide
                </Link>
                <Link
                  href="/guides/skills-to-put-on-a-resume"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Skills to Put on a Resume
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

      <HumanAtsReviewCta source="resume-work-experience-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational structures and must be
        adapted to accurately reflect your own employment and experience.
      </footer>
    </main>
  );
}
