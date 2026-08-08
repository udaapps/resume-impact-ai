import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/resume-keywords-for-ats";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Resume Keywords for ATS: Find and Use Them";
const PAGE_DESCRIPTION =
  "Learn how to find ATS resume keywords in a job description, verify each term against your evidence, place keywords naturally, and avoid keyword stuffing.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ResumeClimb AI`,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "resume keywords for ATS",
    "ATS resume keywords",
    "resume keywords",
    "how to find keywords in a job description",
    "how to add keywords to a resume",
    "resume keyword examples",
    "ATS keyword matching",
    "resume keyword stuffing",
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
        alt: "Resume keywords for ATS truth-first guide",
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

const keywordTypes = [
  {
    title: "Job titles and role language",
    examples: "Data Analyst, Account Executive, Warehouse Associate",
    guidance:
      "Use a target title only when it accurately describes the role you held, the work you performed, or the position you are targeting in a clearly labeled summary. Do not rename past jobs in a misleading way.",
  },
  {
    title: "Hard skills and tools",
    examples: "SQL, Salesforce, inventory control, financial reporting",
    guidance:
      "Prioritize specific tools, systems, methods, and technical capabilities that the job requests and your resume evidence supports.",
  },
  {
    title: "Certifications and qualifications",
    examples: "PMP, CDL, CPR, bachelor's degree",
    guidance:
      "Use the official credential name and correct status. Never imply that an expired, incomplete, or planned qualification is current.",
  },
  {
    title: "Responsibilities and workflows",
    examples: "incident reporting, account reconciliation, route planning",
    guidance:
      "Connect each relevant phrase to work you genuinely performed instead of dropping it into an isolated keyword list.",
  },
  {
    title: "People and communication skills",
    examples: "stakeholder communication, de-escalation, team leadership",
    guidance:
      "Show these skills through context and actions. A supported example is more persuasive than a long list of self-assigned traits.",
  },
] as const;

const extractionSteps = [
  {
    title: "Read the entire job description",
    description:
      "Review the title, overview, responsibilities, minimum qualifications, preferred qualifications, tools, and application instructions before selecting any term.",
  },
  {
    title: "Mark specific requirements",
    description:
      "Highlight named tools, technical skills, certifications, methods, job duties, industry terms, and required experience. Give stated requirements more weight than generic promotional language.",
  },
  {
    title: "Notice repetition and emphasis",
    description:
      "A repeated phrase may signal importance, but repetition alone does not make it a requirement. Look at where the term appears and how the employer describes it.",
  },
  {
    title: "Group variants together",
    description:
      "Connect full names, acronyms, singular and plural forms, and closely related phrasing so you do not treat the same concept as several unrelated requirements.",
  },
  {
    title: "Compare every term with your evidence",
    description:
      "Check your work history, projects, education, training, credentials, and documented results. Classify the term before deciding whether it belongs in the resume.",
  },
  {
    title: "Prioritize the strongest truthful matches",
    description:
      "Start with important requirements you can support clearly. Do not weaken the resume by forcing every phrase from the posting into it.",
  },
] as const;

const truthMatchRows = [
  {
    label: "Confirmed",
    symbol: "✓",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    definition:
      "The resume or supporting evidence directly confirms the exact skill, tool, credential, responsibility, or equivalent wording.",
    example:
      "The job requires SQL, and your experience or project evidence explicitly describes work completed with SQL.",
    action:
      "Use the term naturally in the most relevant section and explain how you used it.",
  },
  {
    label: "Related",
    symbol: "≈",
    className: "border-blue-500/30 bg-blue-500/10 text-blue-200",
    definition:
      "The resume contains an adjacent concept, but it does not prove the exact requirement.",
    example:
      "The job requires CI/CD, while the resume mentions deployment workflows without confirming a CI/CD process or tool.",
    action:
      "Verify the exact experience first. Keep the original truthful wording if the requirement cannot be confirmed.",
  },
  {
    label: "Not confirmed",
    symbol: "?",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    definition:
      "No direct or controlled related evidence supports the requested skill, tool, credential, or responsibility.",
    example:
      "The job requires AWS, but your resume and project history contain no cloud-platform experience.",
    action:
      "Leave the term out. A missing requirement is safer than an unsupported claim.",
  },
] as const;

const placementRows = [
  {
    section: "Professional summary",
    bestUse:
      "Two or three high-priority role terms that summarize evidence shown elsewhere in the resume.",
    avoid:
      "A dense list of target-job requirements or a title that misrepresents your background.",
  },
  {
    section: "Skills",
    bestUse:
      "Confirmed tools, systems, languages, methods, and role skills in clear groups.",
    avoid:
      "Tools you only recognize, skills you plan to learn, or vague claims with no support.",
  },
  {
    section: "Work experience",
    bestUse:
      "Keywords inside bullets that explain the action, task, tool, scope, and accurate result.",
    avoid:
      "Repeating the same phrase in every bullet or adding it where it does not match the work.",
  },
  {
    section: "Projects",
    bestUse:
      "Confirmed project tools, methods, contributions, deliverables, and outcomes with honest context.",
    avoid:
      "Presenting practice, coursework, or personal projects as paid professional experience.",
  },
  {
    section: "Education and certifications",
    bestUse:
      "Accurate program, qualification, issuer, field of study, completion, and credential status.",
    avoid:
      "Changing the official credential name or hiding incomplete, expired, or pending status.",
  },
] as const;

const workedExamples = [
  {
    role: "Data analyst",
    jobTerms: "SQL, Power BI, data cleaning, dashboard reporting",
    evidence:
      "The candidate used SQL to clean datasets and built Excel dashboards. No Power BI work is documented.",
    use:
      "Use SQL, data cleaning, and dashboard reporting in accurate context. Keep Excel because it identifies the real tool.",
    leaveOut:
      "Do not replace Excel with Power BI or imply Power BI experience merely because both can be used for dashboards.",
    bullet:
      "Cleaned operational datasets with SQL and built Excel dashboards to support recurring performance reporting.",
  },
  {
    role: "Customer service representative",
    jobTerms: "Zendesk, escalation management, customer retention",
    evidence:
      "The candidate handled escalated tickets in Zendesk. No verified retention responsibility or result is available.",
    use:
      "Use Zendesk and escalation management because both are confirmed by the described work.",
    leaveOut:
      "Leave out customer retention unless the candidate genuinely owned retention activity or can support a relevant result.",
    bullet:
      "Resolved escalated customer tickets in Zendesk and documented follow-up actions for unresolved cases.",
  },
] as const;

const commonMistakes = [
  {
    title: "Adding every missing keyword",
    description:
      "A comparison result identifies wording differences; it does not give permission to claim every requirement. Confirm each term before editing.",
  },
  {
    title: "Creating a hidden keyword block",
    description:
      "White text, tiny text, repeated lists, and irrelevant keyword blocks reduce clarity and can mislead the reader. Write useful visible content instead.",
  },
  {
    title: "Replacing real tools with requested tools",
    description:
      "Related software can have overlapping purposes without being interchangeable. Excel dashboard work does not automatically prove Power BI experience.",
  },
  {
    title: "Overstating a past job title",
    description:
      "You can clarify an internal title with accurate context, but do not rewrite employment history to suggest authority or seniority you did not hold.",
  },
  {
    title: "Repeating keywords without evidence",
    description:
      "Frequency cannot replace context. One clear, supported example may be stronger than repeating the same term throughout the resume.",
  },
  {
    title: "Optimizing only for a score",
    description:
      "Resume matching tools provide estimates. The final document must remain accurate, readable, relevant, and defensible in an interview.",
  },
] as const;

const finalChecklist = [
  "I read the full job description, including required and preferred qualifications.",
  "I identified specific titles, skills, tools, methods, credentials, and responsibilities.",
  "I grouped full names, acronyms, and close wording variants before reviewing them.",
  "I classified each priority term as Confirmed, Related, or Not Confirmed.",
  "Every keyword I added reflects real work, education, training, projects, or credentials.",
  "Related wording was not treated as proof of an exact tool or requirement.",
  "Unconfirmed requirements were left out instead of being invented.",
  "Important keywords appear in useful context, not only in an isolated skills list.",
  "My experience bullets explain actions and responsibilities rather than repeating phrases.",
  "Acronyms and full names are used only when accurate and useful to the reader.",
  "The resume remains concise and readable without keyword stuffing.",
  "I can explain and support every final statement during an interview.",
] as const;

const faqItems = [
  {
    question: "What are resume keywords for ATS?",
    answer:
      "Resume keywords are job-relevant words and phrases such as titles, hard skills, tools, methods, certifications, responsibilities, and qualifications. Employers and recruiting systems may use these terms when searching or reviewing candidate information, but systems and workflows differ.",
  },
  {
    question: "Where can I find keywords in a job description?",
    answer:
      "Review the job title, responsibilities, required qualifications, preferred qualifications, named tools, credentials, and application instructions. Repetition can indicate emphasis, but the section and context matter more than frequency alone.",
  },
  {
    question: "Should I use the exact wording from the job description?",
    answer:
      "Use exact wording when it accurately describes your real experience and improves clarity. Do not replace a related skill, tool, credential, or job title with the employer's wording when the terms are not genuinely equivalent.",
  },
  {
    question: "How many keywords should I add to my resume?",
    answer:
      "There is no responsible universal number. Prioritize the job's most important requirements that you can support, then use them naturally in the relevant sections. Quality, evidence, and context matter more than reaching a keyword count.",
  },
  {
    question: "What should I do with a missing keyword?",
    answer:
      "First check whether your experience uses different but genuinely equivalent wording. If the exact requirement is only related or not confirmed, do not add it. You may address a real skills gap through future training, but do not present planned learning as current experience.",
  },
  {
    question: "Should I include both an acronym and its full name?",
    answer:
      "When both forms are commonly used and accurate, write the full name followed by the acronym at the first useful mention, such as Customer Relationship Management (CRM). Avoid repeating both forms unnaturally throughout the resume.",
  },
  {
    question: "Is repeating a keyword several times helpful?",
    answer:
      "Do not repeat a term merely to increase frequency. Use it where it adds accurate context—in a summary, skills section, project, or experience bullet. Excessive repetition can make the resume harder for a person to read.",
  },
  {
    question: "Do the right keywords guarantee an interview?",
    answer:
      "No. Keywords can improve alignment and help recruiters locate relevant evidence, but employer systems, screening questions, qualifications, competition, and human decisions vary. No guide or checker can guarantee an interview or job offer.",
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

export default function ResumeKeywordsForAtsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Resume Keywords for ATS: How to Find and Use Them Truthfully",
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
        name: "Resume Keywords for ATS",
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
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              AI Bullet Generator
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              ATS Resume Checker
            </Link>
          </div>
        </div>
      </nav>

      <article>
        <header className="border-b border-slate-900 bg-gradient-to-b from-blue-950/40 to-slate-950">
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
              <span className="text-slate-300">Resume Keywords for ATS</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Truth-First ATS Keyword Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Resume Keywords for ATS: How to Find and Use Them Truthfully
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Learn how to identify job-description keywords, compare every
              term with real evidence, place supported wording in the right
              resume sections, and leave unsupported requirements out.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Compare Resume and Job Description
              </Link>
              <Link
                href="/guides/how-to-tailor-resume-to-job-description"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Read the Resume Tailoring Guide
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                Evidence-first method
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Placement examples
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No keyword stuffing
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="definition-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Start with meaning
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What are resume keywords?
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Resume keywords are words and phrases that describe the role,
                skills, tools, qualifications, responsibilities, and experience
                an employer is seeking. Recruiters may search candidate records
                for these terms, and matching software may compare language in a
                resume with language in a job description.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                A keyword match does not prove proficiency, seniority, or
                eligibility. The term becomes useful only when it accurately
                represents evidence you can explain. Employer systems and
                review processes also differ, so keywords cannot guarantee a
                ranking, interview, or job offer.
              </p>

              <div className="mt-7 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-emerald-200">
                  The safe rule
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Mirror the employer&apos;s wording only when it truthfully
                  describes your work, education, training, project, or
                  credential. Never convert a related concept into an exact
                  claim merely to improve a match score.
                </p>
              </div>
            </section>

            <section aria-labelledby="types-heading">
              <h2
                id="types-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Five types of resume keywords to look for
              </h2>

              <div className="mt-8 space-y-5">
                {keywordTypes.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-bold text-blue-300">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-blue-300">
                          Examples: {item.examples}
                        </p>
                        <p className="mt-3 leading-7 text-slate-400">
                          {item.guidance}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="finding-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Manual keyword method
              </p>
              <h2
                id="finding-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                How to find keywords in a job description
              </h2>

              <ol className="mt-8 space-y-5">
                {extractionSteps.map((step, index) => (
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

            <section aria-labelledby="truth-match-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb Truth Match
              </p>
              <h2
                id="truth-match-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Classify the keyword before you add it
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                “Missing” is not the same as “safe to add.” Use these three
                evidence categories to decide what the comparison result means.
              </p>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {truthMatchRows.map((row) => (
                  <article
                    key={row.label}
                    className={`rounded-2xl border p-6 ${row.className}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 font-bold">
                        {row.symbol}
                      </span>
                      <h3 className="text-xl font-bold">{row.label}</h3>
                    </div>
                    <p className="mt-5 leading-7 text-slate-300">
                      {row.definition}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Example:</strong>{" "}
                      {row.example}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      <strong>Action:</strong> {row.action}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-6">
                <p className="leading-7 text-slate-300">
                  ResumeClimb Truth Match is an input-based comparison. It can
                  classify wording found in supplied text, but it cannot
                  independently verify employment history, skills, credentials,
                  or personal evidence.
                </p>
                <Link
                  href="/ats-resume-checker"
                  className="mt-4 inline-flex font-semibold text-blue-200 hover:text-white"
                >
                  Run a free Truth Match review →
                </Link>
              </div>
            </section>

            <section aria-labelledby="placement-heading">
              <h2
                id="placement-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Where to place keywords on your resume
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Put each supported term where it helps explain your candidacy.
                Do not repeat keywords simply to increase frequency.
              </p>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Resume section
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Best use
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Avoid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                    {placementRows.map((row) => (
                      <tr key={row.section}>
                        <td className="px-5 py-5 align-top font-semibold text-blue-200">
                          {row.section}
                        </td>
                        <td className="px-5 py-5 align-top leading-7 text-slate-300">
                          {row.bestUse}
                        </td>
                        <td className="px-5 py-5 align-top leading-7 text-slate-400">
                          {row.avoid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              aria-labelledby="acronym-heading"
              className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 sm:p-8"
            >
              <h2
                id="acronym-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How to handle acronyms and wording variants
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                When a full name and acronym are both common and accurate, use
                them together at the first useful mention: Customer
                Relationship Management (CRM), Search Engine Optimization
                (SEO), or Continuous Integration/Continuous Delivery (CI/CD).
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                This improves clarity for both technical and nontechnical
                readers. It does not justify claiming an acronym that your real
                experience does not support, and it is not necessary to repeat
                both forms in every section.
              </p>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Worked examples
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Use confirmed keywords and leave unsupported ones out
              </h2>

              <div className="mt-8 space-y-7">
                {workedExamples.map((example) => (
                  <article
                    key={example.role}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-2xl font-bold capitalize text-white">
                      {example.role} example
                    </h3>
                    <dl className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                        <dt className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                          Job-description terms
                        </dt>
                        <dd className="mt-3 leading-7 text-slate-300">
                          {example.jobTerms}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                        <dt className="text-sm font-semibold uppercase tracking-wide text-violet-300">
                          Available evidence
                        </dt>
                        <dd className="mt-3 leading-7 text-slate-300">
                          {example.evidence}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                        <dt className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                          Safe to use
                        </dt>
                        <dd className="mt-3 leading-7 text-slate-300">
                          {example.use}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                        <dt className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                          Leave out
                        </dt>
                        <dd className="mt-3 leading-7 text-slate-300">
                          {example.leaveOut}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                        Truthful final bullet
                      </p>
                      <p className="mt-3 leading-7 text-slate-200">
                        {example.bullet}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume keyword mistakes to avoid
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
                Before submitting
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Truth-first resume keyword checklist
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
                These resources illustrate real keyword-search functionality
                and established job-description review methods. They do not
                establish one universal rule for every employer or ATS.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://support.greenhouse.io/hc/en-us/articles/115004600186-Search-resumes-for-keywords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Greenhouse: Search Resumes for Keywords
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Official documentation showing how recruiters can use
                    full-text keyword search across candidate resumes.
                  </p>
                </a>

                <a
                  href="https://www.indeed.com/career-advice/resumes-cover-letters/finding-keywords-in-job-descriptions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Indeed: Finding Keywords in Job Descriptions
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Practical guidance for reviewing job descriptions and using
                    relevant terms in a resume.
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
                Compare keywords without inventing qualifications
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Paste your resume and target job description into ResumeClimb
                Truth Match to separate confirmed wording, related evidence,
                and requirements that were not confirmed.
              </p>
              <Link
                href="/ats-resume-checker"
                className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Open the Free ATS Resume Checker
              </Link>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">On this page</h2>
              <nav className="mt-4 space-y-3 text-sm">
                <a href="#definition-heading" className="block text-slate-400 hover:text-white">
                  What resume keywords are
                </a>
                <a href="#types-heading" className="block text-slate-400 hover:text-white">
                  Keyword types
                </a>
                <a href="#finding-heading" className="block text-slate-400 hover:text-white">
                  How to find keywords
                </a>
                <a href="#truth-match-heading" className="block text-slate-400 hover:text-white">
                  Truth Match method
                </a>
                <a href="#placement-heading" className="block text-slate-400 hover:text-white">
                  Where to place keywords
                </a>
                <a href="#examples-heading" className="block text-slate-400 hover:text-white">
                  Worked examples
                </a>
                <a href="#mistakes-heading" className="block text-slate-400 hover:text-white">
                  Mistakes to avoid
                </a>
                <a href="#checklist-heading" className="block text-slate-400 hover:text-white">
                  Final checklist
                </a>
                <a href="#faq-heading" className="block text-slate-400 hover:text-white">
                  FAQ
                </a>
              </nav>
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <h2 className="font-bold text-emerald-200">Truth-first rule</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use exact wording only when it accurately describes evidence
                from your real work, projects, education, training, or
                credentials.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">No guaranteed pass</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Employer systems and decisions differ. Keywords can improve
                alignment but cannot guarantee ranking, an interview, or a job
                offer.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Checker
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Tailoring Guide
                </Link>
                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS-Friendly Format Guide
                </Link>
                <Link
                  href="/resume-bullet-generator"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  AI Resume Bullet Generator
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="resume-keywords-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Guidance and tool results are educational and do
        not guarantee employer ATS outcomes.
      </footer>
    </main>
  );
}
