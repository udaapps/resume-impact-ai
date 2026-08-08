import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/how-to-tailor-resume-to-job-description";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "How to Tailor Your Resume to a Job Description";
const PAGE_DESCRIPTION =
  "Learn how to tailor your resume to a job description with an honest keyword-matching method, worked example, section guide, and final checklist.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "how to tailor resume to job description",
    "tailor resume to job description",
    "match resume to job description",
    "resume keyword matching",
    "ATS resume tailoring",
    "targeted resume",
    "resume job match",
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
        alt: "How to tailor a resume to a job description",
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

const truthMatchGroups = [
  {
    label: "Confirmed",
    symbol: "✓",
    color: "emerald",
    meaning:
      "The exact requirement is supported by wording or clear evidence already present in your resume.",
    action:
      "Use the employer's exact term naturally where it accurately describes your work, skill, credential, or result.",
  },
  {
    label: "Related",
    symbol: "≈",
    color: "amber",
    meaning:
      "Your resume shows an adjacent concept, but it does not prove the employer's exact requirement.",
    action:
      "Clarify your real experience. Add the exact term only if you genuinely used it and can explain the connection.",
  },
  {
    label: "Not Confirmed",
    symbol: "?",
    color: "rose",
    meaning:
      "No direct or controlled related evidence for the requirement appears in the supplied resume.",
    action:
      "Leave it out unless you can support it with real work, a project, training, education, or a current credential.",
  },
] as const;

const tailoringSteps = [
  {
    title: "Separate requirements from general company language",
    description:
      "Mark the job title, responsibilities, tools, technical skills, certifications, education, experience level, and outcomes. Ignore benefits, culture statements, and repeated legal text that do not describe candidate qualifications.",
  },
  {
    title: "Identify the employer's priorities",
    description:
      "Give more attention to required items, repeated concepts, responsibilities listed near the top, and qualifications connected to several duties. Treat preferred items as useful, not automatically mandatory.",
  },
  {
    title: "Build a requirement-to-evidence map",
    description:
      "For each important requirement, write the job, project, course, certification, tool, task, or result that supports it. A blank evidence cell is a warning not to insert that term merely to improve a match score.",
  },
  {
    title: "Classify every important term",
    description:
      "Place each requirement in Confirmed, Related, or Not Confirmed. This prevents adjacent experience from being presented as exact experience and makes the remaining edits faster.",
  },
  {
    title: "Rewrite the most relevant sections",
    description:
      "Update the headline or summary, skills, experience bullets, projects, and certifications only where the evidence belongs. Lead with the most relevant supported information instead of rewriting your entire career history.",
  },
  {
    title: "Use exact wording in context",
    description:
      "When a term is confirmed, use the job description's wording inside a clear statement about what you did. Avoid disconnected keyword lists, hidden text, excessive repetition, and claims copied from the employer's responsibilities.",
  },
  {
    title: "Run a final truth and readability review",
    description:
      "Check that every tool, skill, credential, metric, outcome, and scope claim is accurate. Then proofread for clarity, consistent dates, standard section headings, and language you can confidently explain in an interview.",
  },
] as const;

const exampleRows = [
  {
    requirement: "Calendar management",
    resumeEvidence:
      "Coordinated executive calendars and scheduled cross-functional meetings.",
    classification: "Confirmed",
    action:
      "Use the exact term in a bullet and keep the supported executive context.",
  },
  {
    requirement: "Expense reporting",
    resumeEvidence:
      "Prepared monthly expense reports and reconciled supporting receipts.",
    classification: "Confirmed",
    action:
      "Prioritize this bullet because both the task and wording are supported.",
  },
  {
    requirement: "Salesforce",
    resumeEvidence:
      "Updated customer records in an unnamed CRM.",
    classification: "Related",
    action:
      "Do not replace CRM with Salesforce. Confirm the actual platform first.",
  },
  {
    requirement: "Vendor coordination",
    resumeEvidence: "No vendor responsibility appears in the resume.",
    classification: "Not Confirmed",
    action:
      "Leave it out unless another truthful role or project provides evidence.",
  },
] as const;

const sectionGuidance = [
  {
    title: "Headline and professional summary",
    description:
      "State the target role and two or three supported strengths that matter most to the employer. Do not claim the target title as past experience unless you actually held it; wording such as “customer service professional targeting account support roles” can preserve that distinction.",
  },
  {
    title: "Skills",
    description:
      "List confirmed tools, methods, languages, systems, and role skills using recognizable terms. A skills section can improve visibility, but it should not be used as a storage area for every phrase in the job posting.",
  },
  {
    title: "Work experience bullets",
    description:
      "Move the most relevant supported bullets higher within each role. Connect a strong action verb to the task, context, and accurate result. Preserve the original scope and do not convert team outcomes into individual ownership.",
  },
  {
    title: "Projects, education, and certifications",
    description:
      "Use these sections when they provide the strongest honest evidence for a requirement. A verified course project can support exposure to a tool, but it should not be described as years of professional production experience.",
  },
] as const;

const commonMistakes = [
  {
    title: "Copying the employer's responsibilities",
    description:
      "A job description says what the next employee may do. It does not prove that you have already done it. Convert only supported responsibilities into evidence-based resume statements.",
  },
  {
    title: "Treating related experience as an exact match",
    description:
      "Using a CRM does not automatically prove Salesforce experience. General cloud work does not automatically prove AWS. Keep the real tool or describe the transferable concept accurately.",
  },
  {
    title: "Adding every keyword",
    description:
      "A readable resume should prioritize meaningful requirements. Repeating terms without context can weaken clarity and create claims you cannot defend.",
  },
  {
    title: "Inventing metrics to sound accomplished",
    description:
      "Use a number only when it is accurate, relevant, and appropriately disclosed. Scope, complexity, ownership, quality, stakeholders, and process improvement can show value when reliable metrics are unavailable.",
  },
  {
    title: "Optimizing only for a scanner score",
    description:
      "ResumeClimb AI provides an educational comparison, not a score issued by an employer's ATS. The final resume must make sense to a recruiter and represent your evidence truthfully.",
  },
  {
    title: "Rewriting so heavily that facts change",
    description:
      "Stronger wording should improve relevance and clarity, not change your employer, seniority, authority, tools, dates, credentials, or results.",
  },
] as const;

const checklist = [
  "The target role and employer priorities are clear.",
  "Every important job-description term is classified as Confirmed, Related, or Not Confirmed.",
  "The summary uses only skills and experience supported elsewhere in the resume.",
  "Confirmed keywords appear naturally in the appropriate sections.",
  "Related evidence is not presented as proof of an exact tool, credential, or requirement.",
  "Unsupported requirements are omitted rather than hidden in a keyword list.",
  "The most relevant bullets appear before less relevant duties within each role.",
  "Every metric, outcome, team size, budget, timeline, and scope claim can be verified.",
  "Standard headings, consistent dates, clear formatting, and readable language are used.",
  "The final resume can be explained confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "What does it mean to tailor a resume to a job description?",
    answer:
      "Tailoring means selecting, organizing, and wording your real qualifications so the most relevant evidence is easy to find. It does not mean copying every requirement or changing facts to resemble the ideal candidate.",
  },
  {
    question: "Do I need a completely different resume for every job?",
    answer:
      "Usually no. Keep a complete master resume, then create a targeted version by adjusting the summary, skills, bullet order, selected projects, and supported terminology for each role. Major career changes may require a more substantial reorganization.",
  },
  {
    question: "Should I copy exact keywords from the job description?",
    answer:
      "Use an exact term when it truthfully describes your experience and is the clearest recognized wording. Do not copy a tool, credential, responsibility, or outcome that your evidence does not support, and do not repeat keywords unnaturally.",
  },
  {
    question: "What if I have related experience but not the exact requirement?",
    answer:
      "Describe the real adjacent experience and transferable skill. For example, name the CRM you actually used rather than claiming Salesforce. If you have genuine Salesforce training or project experience, identify that context accurately instead of presenting it as professional ownership.",
  },
  {
    question: "How many job-description keywords should be in my resume?",
    answer:
      "There is no universal correct number. Prioritize required, repeated, and role-defining terms that match your evidence. Natural context and relevance matter more than reaching a keyword count or repeating every phrase.",
  },
  {
    question: "Can I tailor a resume when I do not have metrics?",
    answer:
      "Yes. Show the scope, process, tools, stakeholders, complexity, ownership, quality, frequency, or problem addressed. Add metrics only when they are accurate and useful; a specific truthful statement is better than an invented percentage.",
  },
  {
    question: "Is a resume match score the same as an employer ATS score?",
    answer:
      "No. ResumeClimb AI's result is an educational comparison of the supplied resume and job description. It is not a score created by an employer, a hiring decision, or a guarantee that a particular applicant tracking system will rank the resume in a certain way.",
  },
  {
    question: "What should I do with a requirement I cannot confirm?",
    answer:
      "Leave it out of the resume unless you can support it through genuine work, education, training, a project, or a current credential. You may still apply when you do not meet every preferred item, but the resume should not manufacture the missing evidence.",
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

export default function TailorResumeToJobDescriptionPage() {
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
        name: "How to Tailor Your Resume to a Job Description",
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
              <span className="text-slate-300">Tailor Your Resume</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Truth-First Resume Tailoring Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to Tailor Your Resume to a Job Description
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Match your real experience to an employer&apos;s priorities without
              copying unsupported skills. Use the ResumeClimb Truth Match method
              to classify each requirement, rewrite the right sections, and
              complete a final evidence check before applying.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Compare Resume With a Job
              </Link>
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Rewrite a Supported Bullet
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                Evidence-first method
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Worked keyword example
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented qualifications
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="meaning-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Start with relevance, not repetition
              </p>
              <h2
                id="meaning-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What resume tailoring should actually change
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                A tailored resume presents the most relevant parts of your real
                background in language the employer can recognize. You may
                reorder bullets, select stronger examples, clarify tools, and use
                an exact job-description term when the evidence supports it. You
                should not change facts, imply a credential you do not hold, or
                copy a responsibility simply because it appears in the posting.
              </p>
              <div className="mt-7 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Employer requirement + your supporting evidence + accurate
                  context = a relevant, defensible resume statement
                </p>
              </div>
            </section>

            <section aria-labelledby="truth-match-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb Truth Match
              </p>
              <h2
                id="truth-match-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Classify job keywords before adding them
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                A missing phrase is not permission to add a claim. Compare each
                important requirement with your resume and supporting history,
                then place it in one of these three evidence categories.
              </p>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {truthMatchGroups.map((group) => {
                  const styles =
                    group.color === "emerald"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : group.color === "amber"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-200";

                  return (
                    <section
                      key={group.label}
                      className={`rounded-2xl border p-6 ${styles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 font-bold">
                          {group.symbol}
                        </span>
                        <h3 className="text-xl font-bold">{group.label}</h3>
                      </div>
                      <p className="mt-5 leading-7 text-slate-300">
                        {group.meaning}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-slate-400">
                        <span className="font-semibold text-white">Action:</span>{" "}
                        {group.action}
                      </p>
                    </section>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  Need help deciding which terms matter and where they belong?
                  Review the keyword types, evidence rules, placement table,
                  acronym guidance, and worked examples before editing.
                </p>
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="mt-3 inline-flex font-semibold text-blue-200 hover:text-white"
                >
                  Read the truth-first ATS resume keyword guide →
                </Link>
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
                Seven-step workflow
              </p>
              <h2
                id="steps-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                How to tailor your resume to a job description
              </h2>

              <ol className="mt-8 space-y-5">
                {tailoringSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
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

            <section aria-labelledby="example-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Worked example
              </p>
              <h2
                id="example-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Turn a job description into an evidence map
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                This fictional administrative-support example shows why a
                related term should not be treated as an exact match. The same
                method works for technical, operational, customer-facing, and
                management roles.
              </p>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
                <table className="min-w-[820px] w-full border-collapse text-left">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Job requirement
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Resume evidence
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Truth Match
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Safe tailoring action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                    {exampleRows.map((row) => (
                      <tr key={row.requirement}>
                        <td className="px-5 py-5 align-top font-semibold text-slate-200">
                          {row.requirement}
                        </td>
                        <td className="px-5 py-5 align-top leading-7 text-slate-400">
                          {row.resumeEvidence}
                        </td>
                        <td className="px-5 py-5 align-top">
                          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-200">
                            {row.classification}
                          </span>
                        </td>
                        <td className="px-5 py-5 align-top leading-7 text-slate-300">
                          {row.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-red-500/25 bg-slate-900/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                    Unsupported rewrite
                  </p>
                  <p className="mt-3 leading-7 text-slate-300">
                    Managed executive calendars, Salesforce, expense reporting,
                    and vendor coordination.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    This adds Salesforce and vendor coordination without direct
                    evidence.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/25 bg-slate-900/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                    Evidence-based rewrite
                  </p>
                  <p className="mt-3 leading-7 text-slate-200">
                    Coordinated executive calendars and cross-functional
                    meetings and prepared monthly expense reports with
                    supporting receipt reconciliation.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    This prioritizes the two confirmed requirements without
                    manufacturing the others.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="sections-heading">
              <h2
                id="sections-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Which resume sections should you tailor?
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {sectionGuidance.map((section) => (
                  <section
                    key={section.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {section.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {section.description}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume tailoring mistakes to avoid
              </h2>

              <div className="mt-7 space-y-4">
                {commonMistakes.map((mistake) => (
                  <section
                    key={mistake.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {mistake.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {mistake.description}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="checklist-heading"
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Before you apply
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Final tailored-resume checklist
              </h2>

              <ul className="mt-7 grid gap-4 md:grid-cols-2">
                {checklist.map((item) => (
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

            <section aria-labelledby="related-guides-heading">
              <h2
                id="related-guides-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Continue improving your evidence
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Write Strong Bullets Without Metrics
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Show scope, ownership, complexity, quality, and impact when
                    reliable numbers are unavailable.
                  </p>
                </Link>

                <Link
                  href="/guides"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Browse Role-Specific Resume Guides
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Find truthful bullet examples and ATS keyword guidance for
                    customer service, operations, technology, and other roles.
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
                Compare your resume with the target job
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                ResumeClimb Truth Match separates direct matches, related
                evidence, and unconfirmed requirements. Use the result as an
                educational review, then make only changes that accurately
                reflect your experience.
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
                <a href="#meaning-heading" className="block text-slate-400 hover:text-white">
                  What tailoring changes
                </a>
                <a href="#truth-match-heading" className="block text-slate-400 hover:text-white">
                  Truth Match method
                </a>
                <a href="#steps-heading" className="block text-slate-400 hover:text-white">
                  Seven tailoring steps
                </a>
                <a href="#example-heading" className="block text-slate-400 hover:text-white">
                  Worked example
                </a>
                <a href="#sections-heading" className="block text-slate-400 hover:text-white">
                  Sections to tailor
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
              <h2 className="font-bold text-emerald-200">
                Truth-first reminder
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A related term is not proof of the exact requirement. Add or
                rewrite a claim only when it accurately reflects experience,
                education, training, a project, or a credential you can explain.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related tools</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Checker
                </Link>
                <Link
                  href="/resume-bullet-generator"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  AI Resume Bullet Generator
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">Score context</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                ResumeClimb results are educational estimates. They are not
                scores issued by an employer or a guarantee of ATS ranking,
                interviews, or hiring outcomes.
              </p>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="tailored-resume-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Guidance is educational and must be applied to
        your real, supportable experience.
      </footer>
    </main>
  );
}
