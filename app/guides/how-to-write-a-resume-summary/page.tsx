import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/how-to-write-a-resume-summary";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "How to Write a Resume Summary";
const PAGE_DESCRIPTION =
  "Write a clear, truthful resume summary with an evidence-first formula, 18 adaptable examples, ATS keyword guidance, and advice for every career stage.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ResumeClimb AI`,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "how to write a resume summary",
    "resume summary examples",
    "professional summary for resume",
    "resume summary formula",
    "ATS resume summary",
    "entry level resume summary",
    "career change resume summary",
    "resume summary without metrics",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: "How to Write a Resume Summary: Formula and Examples",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "How to write a truthful professional resume summary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Resume Summary: Formula and Examples",
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

const openingOptions = [
  {
    title: "Professional summary",
    bestFor:
      "Candidates who can connect relevant experience, skills, projects, education, or results to the target role.",
    focus:
      "What you have done, what you can support, and which evidence is most relevant now.",
  },
  {
    title: "Resume objective",
    bestFor:
      "Some entry-level candidates, career changers, or applicants whose immediate direction needs brief clarification.",
    focus:
      "The role you are targeting plus supported transferable skills, training, education, or project evidence—not only what you want.",
  },
  {
    title: "Professional headline",
    bestFor:
      "Candidates who need a compact label above a summary or whose resume benefits from a one-line role focus.",
    focus:
      "An accurate role identity or specialization, such as Data Analyst | SQL, Excel, and Dashboard Reporting.",
  },
] as const;

const formulaParts = [
  {
    label: "Accurate professional identity",
    guidance:
      "Use your real role, field, qualification, or supported target direction. Do not inflate seniority or change employment history.",
  },
  {
    label: "Relevant scope or context",
    guidance:
      "Add verified years only when useful, or describe the environment, customers, projects, responsibilities, or work area without a number.",
  },
  {
    label: "Two or three supported strengths",
    guidance:
      "Choose skills, tools, methods, and responsibilities that match the job and appear elsewhere in your evidence.",
  },
  {
    label: "Credible contribution or result",
    guidance:
      "Use a verified metric when available. Otherwise show scope, ownership, quality, complexity, improvement, or a useful deliverable.",
  },
] as const;

const writingSteps = [
  {
    title: "Write the rest of the resume first",
    description:
      "Finish your skills, experience, projects, education, and certifications before summarizing them. The summary should reflect evidence already present below it.",
  },
  {
    title: "Read the target job description",
    description:
      "Mark the role, required skills, tools, responsibilities, credentials, and repeated priorities. Do not assume every phrase is equally important.",
  },
  {
    title: "Build a small evidence inventory",
    description:
      "List your most relevant roles, tasks, tools, projects, training, achievements, metrics, and transferable skills. Remove anything you cannot support.",
  },
  {
    title: "Select the strongest overlap",
    description:
      "Choose two or three employer priorities that are directly confirmed by your evidence. Related wording is not proof of an exact skill or tool.",
  },
  {
    title: "Draft two to four concise sentences",
    description:
      "Lead with identity and context, add the strongest confirmed skills, then show a supported contribution or the value of your work.",
  },
  {
    title: "Remove generic and repeated language",
    description:
      "Delete phrases that could describe almost anyone. Avoid repeating every skill from the skills section or every duty from the experience section.",
  },
  {
    title: "Run a final truth and relevance check",
    description:
      "Confirm that every title, year, tool, credential, metric, result, and keyword is accurate and can be explained confidently in an interview.",
  },
] as const;

const exampleGroups = [
  {
    title: "Customer, administrative, and operations examples",
    description:
      "Adapt the channels, systems, work setting, scope, and outcomes. Keep only claims that match your own experience.",
    examples: [
      {
        role: "Customer service representative",
        text: "Customer service professional with experience resolving inquiries across [confirmed channels], documenting cases in [confirmed system], and following up on unresolved issues. Brings strengths in [supported skill] and [supported responsibility] within [relevant environment].",
      },
      {
        role: "Administrative assistant",
        text: "Administrative support professional experienced in scheduling, document preparation, record maintenance, and communication with [supported stakeholder groups]. Known for organized follow-through and accurate handling of [confirmed work type].",
      },
      {
        role: "Receptionist",
        text: "Reception professional with experience supporting visitors, managing calls and messages, coordinating appointments, and maintaining front-desk records. Provides clear communication and dependable administrative support in [confirmed setting].",
      },
      {
        role: "Warehouse worker",
        text: "Warehouse professional experienced in [confirmed functions such as picking, packing, receiving, or inventory], routine quality checks, and safe material handling. Familiar with [verified equipment or system] and consistent documentation procedures.",
      },
      {
        role: "Office manager",
        text: "Office operations professional with experience coordinating facilities, vendors, purchasing, schedules, records, and team support. Brings organized oversight of [confirmed scope] and practical process follow-through across daily office needs.",
      },
      {
        role: "Executive assistant",
        text: "Executive support professional experienced in complex calendars, meeting coordination, travel, expenses, communications, and confidential documents. Supports [verified executive or team scope] through careful preparation and follow-up.",
      },
      {
        role: "Cashier",
        text: "Customer-focused cashier with experience processing [confirmed payment types], assisting with returns or inquiries, and maintaining accurate checkout records. Brings dependable service, attention to detail, and knowledge of [verified POS system or retail process].",
      },
      {
        role: "Delivery driver",
        text: "Delivery professional experienced in route preparation, vehicle inspections, safe loading, proof-of-delivery records, and customer handoffs. Holds [accurate license or credential] and follows [confirmed safety or documentation procedures].",
      },
      {
        role: "Security guard",
        text: "Security professional experienced in [confirmed duties such as patrols, access control, CCTV monitoring, or incident reporting]. Brings alert observation, accurate documentation, and calm communication within [verified environment].",
      },
    ],
  },
  {
    title: "Technical, project, sales, and analytics examples",
    description:
      "Name only the tools, methods, domains, responsibilities, and results you actually used or delivered.",
    examples: [
      {
        role: "Software engineer",
        text: "Software engineer with experience developing [confirmed product or system type] using [verified languages and frameworks]. Contributes across [supported areas such as APIs, testing, databases, or deployment] with attention to maintainability and user or business requirements.",
      },
      {
        role: "Project manager",
        text: "Project management professional experienced in planning, stakeholder communication, risk tracking, resource coordination, and delivery across [verified project context]. Applies [confirmed method] to maintain clear priorities and accountable follow-through.",
      },
      {
        role: "Sales representative",
        text: "Sales professional with experience in [confirmed sales activities], CRM documentation, customer discovery, presentations, and account follow-up. Supports [verified product, market, or customer segment] through needs-based communication and organized pipeline activity.",
      },
      {
        role: "Data analyst",
        text: "Data analyst experienced in [verified tools] for data cleaning, analysis, reporting, and dashboard development. Translates [confirmed data type or business questions] into clear findings for [supported stakeholder group].",
      },
    ],
  },
  {
    title: "Entry-level and career-transition examples",
    description:
      "Education, training, volunteering, personal projects, and transferable work can be valuable when their context is labeled honestly.",
    examples: [
      {
        role: "Entry-level candidate",
        text: "Entry-level [target field] candidate with training in [confirmed subject] and practical experience from [coursework, project, volunteering, or internship]. Brings supported strengths in [skill] and [skill] with a focus on [relevant responsibility].",
      },
      {
        role: "Recent graduate",
        text: "Recent [accurate degree or program] graduate with project experience in [confirmed area] using [verified tools or methods]. Developed strengths in [supported skills] through [coursework, capstone, internship, or volunteer context].",
      },
      {
        role: "Career changer",
        text: "[Current or previous field] professional transitioning toward [target field] with transferable experience in [confirmed responsibilities]. Supported by [relevant training, credential, or project] and practical strengths in [verified target-role skills].",
      },
      {
        role: "Returning after a career break",
        text: "[Accurate professional identity] returning to [field or work type] with prior experience in [confirmed strengths] and recent [training, volunteering, project, or credential]. Prepared to contribute through [supported capabilities] in [target context].",
      },
      {
        role: "Strong summary without metrics",
        text: "[Accurate role] experienced in [responsibility], [responsibility], and [confirmed tool or method] across [supported context]. Known for [evidence-based quality, ownership, complexity, or collaboration] and reliable delivery of [verified output].",
      },
    ],
  },
] as const;

const weakStrongExamples = [
  {
    label: "Generic adjectives",
    weak:
      "Results-driven, hardworking professional with excellent communication skills seeking a challenging role.",
    stronger:
      "Administrative support professional experienced in scheduling, document preparation, and customer communication across a busy service office.",
    reason:
      "The stronger version replaces unproven adjectives with supported work areas and context.",
  },
  {
    label: "Unsupported target keywords",
    weak:
      "Cloud engineer skilled in AWS, Docker, and Kubernetes.",
    stronger:
      "Software developer experienced in Node.js, REST APIs, PostgreSQL, and automated deployment workflows.",
    reason:
      "Use the second version when those are the confirmed skills. Related deployment experience does not prove AWS, Docker, Kubernetes, or a cloud-engineer title.",
  },
  {
    label: "Invented measurement",
    weak:
      "Improved operational efficiency by 35% through process optimization.",
    stronger:
      "Documented recurring workflow issues and coordinated process updates with operations and support teams.",
    reason:
      "The stronger version keeps the verified action and scope when no reliable percentage is available.",
  },
] as const;

const commonMistakes = [
  {
    title: "Writing the summary before the evidence",
    description:
      "A summary drafted first can become a wish list. Complete the resume body, then summarize the most relevant supported information.",
  },
  {
    title: "Using generic adjectives as proof",
    description:
      "Words such as hardworking, dynamic, strategic, and results-driven are not evidence by themselves. Replace them with specific work, context, or outcomes.",
  },
  {
    title: "Copying the employer's requirements",
    description:
      "A requested tool or qualification does not become yours because it appears in the summary. Confirm every keyword before using it.",
  },
  {
    title: "Inventing years or metrics",
    description:
      "Do not estimate experience length, revenue, percentages, team size, volume, or results. Use a truthful no-metrics structure when evidence is unavailable.",
  },
  {
    title: "Making the summary too long",
    description:
      "The summary is an introduction, not a second work-history section. Keep the strongest relevant points and remove repeated detail.",
  },
  {
    title: "Using one summary for every job",
    description:
      "Different roles prioritize different evidence. Adjust emphasis and supported terminology for each target job without changing the underlying facts.",
  },
] as const;

const finalChecklist = [
  "My summary appears after contact information and before the main resume sections.",
  "It reflects evidence already present in experience, projects, education, skills, or credentials.",
  "My professional identity and level are accurate.",
  "Every year, metric, team size, volume, tool, and qualification is verified.",
  "I selected two or three priorities that genuinely match the target job.",
  "Related wording was not converted into an unsupported exact claim.",
  "Keywords appear naturally and are not repeated for frequency alone.",
  "The summary shows useful context even when I do not have metrics.",
  "Entry-level, project, volunteer, or coursework evidence is labeled honestly.",
  "Generic adjectives were replaced with specific evidence where possible.",
  "The summary is concise and does not repeat the full skills or experience sections.",
  "I can explain every statement confidently during an interview.",
] as const;

const faqItems = [
  {
    question: "What is a professional summary on a resume?",
    answer:
      "A professional summary is a short introduction near the top of a resume that highlights the candidate's most relevant supported experience, skills, qualifications, and contributions for a target role.",
  },
  {
    question: "How long should a resume summary be?",
    answer:
      "A practical target is two to four concise sentences or a small set of focused bullets. The right length depends on the candidate and role, but the summary should remain an introduction rather than repeat the work history.",
  },
  {
    question: "Is a resume summary required?",
    answer:
      "No. A summary is optional. Use one when it helps connect relevant evidence to the target role. Remove it if it only repeats information, uses generic language, or takes space from stronger experience and project evidence.",
  },
  {
    question: "What is the difference between a resume summary and objective?",
    answer:
      "A summary emphasizes supported experience, skills, and contributions. An objective usually explains a target direction. Entry-level candidates and career changers can combine a brief direction with evidence from education, projects, volunteering, training, or transferable work.",
  },
  {
    question: "Can I write a resume summary with no experience?",
    answer:
      "Yes, when you have relevant education, coursework, projects, volunteering, training, or transferable skills. Identify the context honestly and do not present academic or personal work as paid employment.",
  },
  {
    question: "Does every resume summary need numbers?",
    answer:
      "No. Use a metric only when it is accurate, relevant, and supported. A strong no-metrics summary can show scope, responsibility, tools, stakeholders, complexity, quality, or the type of output delivered.",
  },
  {
    question: "Should I add ATS keywords to my resume summary?",
    answer:
      "Use a small number of important job-description terms when they accurately describe your evidence. Do not copy missing tools, credentials, responsibilities, or outcomes into the summary merely to improve a match estimate.",
  },
  {
    question: "Can I copy these resume summary examples exactly?",
    answer:
      "Treat them as structures, not personal claims. Replace bracketed fields with accurate details, remove any unsupported wording, and ensure the final summary matches information elsewhere in your resume.",
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

export default function HowToWriteResumeSummaryPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a Resume Summary: Formula and 18 Examples",
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
        name: "How to Write a Resume Summary",
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
        <header className="border-b border-slate-900 bg-gradient-to-b from-violet-950/40 to-slate-950">
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
              <span className="text-slate-300">Resume Summary Guide</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Evidence-First Resume Writing Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to Write a Resume Summary: Formula and 18 Examples
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Build a concise professional summary from evidence already in
              your resume. Use the formula, adaptable examples, keyword rules,
              and final checklist without inventing experience or results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Strengthen Your Evidence Bullets
              </Link>
              <Link
                href="/ats-resume-checker"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Compare Resume With a Job
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-violet-300">
                Evidence-first formula
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                18 adaptable examples
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                Metrics optional
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Start with purpose
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What is a resume summary?
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                A resume summary is a short introduction placed near the top of
                the document, usually after contact information. It helps a
                reader understand your relevant professional identity, skills,
                context, and contributions before reviewing the details below.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                A summary is optional. Keep it only when it adds useful context
                and reflects evidence elsewhere in the resume. It should not be
                a collection of impressive adjectives, copied job requirements,
                or unsupported promises.
              </p>

              <div className="mt-7 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-emerald-200">
                  Truth-first principle
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  If a statement is not supported by your experience, project,
                  education, training, volunteering, or credential, it does not
                  belong in the summary.
                </p>
              </div>
            </section>

            <section aria-labelledby="decision-heading">
              <h2
                id="decision-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume summary vs. objective vs. headline
              </h2>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {openingOptions.map((option) => (
                  <article
                    key={option.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {option.title}
                    </h3>
                    <p className="mt-4 text-sm font-semibold text-blue-300">
                      Best for
                    </p>
                    <p className="mt-2 leading-7 text-slate-400">
                      {option.bestFor}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-violet-300">
                      Main focus
                    </p>
                    <p className="mt-2 leading-7 text-slate-400">
                      {option.focus}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Writing formula
              </p>
              <h2
                id="formula-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                A four-part evidence-first resume summary formula
              </h2>

              <div className="mt-7 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold leading-8 text-blue-200">
                  Accurate identity + relevant context + supported strengths +
                  credible contribution
                </p>
              </div>

              <ol className="mt-7 space-y-5">
                {formulaParts.map((part, index) => (
                  <li
                    key={part.label}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
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
                How to write your resume summary step by step
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

            <section
              aria-labelledby="keywords-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="keywords-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How to use ATS keywords in a resume summary
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Select a small number of important job-description terms that
                your evidence directly confirms. Use them in normal sentences
                that explain your professional context. Do not copy an
                unconfirmed tool, credential, title, responsibility, or result.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                ResumeClimb Truth Match separates direct matches, related
                evidence, and terms that were not confirmed. A related concept
                may help you ask a better question, but it does not prove the
                exact requirement.
              </p>
              <Link
                href="/guides/resume-keywords-for-ats"
                className="mt-6 inline-flex font-semibold text-blue-200 hover:text-white"
              >
                Read the complete ATS resume keyword guide →
              </Link>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Adaptable structures
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                18 professional resume summary examples
              </h2>
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  These examples are templates, not facts about you. Replace
                  bracketed fields with verified details and remove every tool,
                  responsibility, credential, result, or context that does not
                  accurately reflect your background.
                </p>
              </div>

              <div className="mt-8 space-y-9">
                {exampleGroups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {group.description}
                    </p>
                    <div className="mt-6 space-y-4">
                      {group.examples.map((example, index) => (
                        <article
                          key={example.role}
                          className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                        >
                          <div className="flex gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-300">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="text-lg font-bold text-white">
                                {example.role}
                              </h4>
                              <p className="mt-3 leading-7 text-slate-300">
                                {example.text}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="rewrite-heading">
              <h2
                id="rewrite-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Weak and stronger resume summary examples
              </h2>

              <div className="mt-8 space-y-7">
                {weakStrongExamples.map((example) => (
                  <article
                    key={example.label}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {example.label}
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
              aria-labelledby="no-metrics-heading"
              className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 sm:p-8"
            >
              <h2
                id="no-metrics-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How to write a resume summary without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Numbers are optional. When reliable metrics are unavailable,
                describe verified scope, ownership, tools, stakeholders,
                complexity, quality, consistency, or the type of deliverable.
                Never estimate a percentage merely because examples online use
                one.
              </p>
              <Link
                href="/guides/resume-bullets-without-metrics"
                className="mt-6 inline-flex font-semibold text-violet-200 hover:text-white"
              >
                Learn how to show impact without invented numbers →
              </Link>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Common resume summary mistakes
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
                Final review
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Resume summary checklist
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
                These resources provide additional perspectives on summary
                purpose and selection. Adapt all advice to your evidence, role,
                country, industry, and application instructions.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://www.indeed.com/career-advice/resumes-cover-letters/writing-a-resume-summary-with-examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Indeed: Writing a Resume Summary
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Explains summary purpose, writing steps, formats, and career
                    stage considerations.
                  </p>
                </a>
                <a
                  href="https://www.careereducation.columbia.edu/resources/how-write-resume-profile-or-summary-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Columbia CCE: Resume Profile or Summary
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Connects position research, common qualifications, and
                    self-assessment when choosing what to highlight.
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
                Check the summary against the target job
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Compare your full resume with one job description, review
                confirmed and unconfirmed keyword evidence, then keep only
                summary claims that accurately reflect your background.
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
                  What a summary is
                </a>
                <a href="#decision-heading" className="block text-slate-400 hover:text-white">
                  Summary vs. objective
                </a>
                <a href="#formula-heading" className="block text-slate-400 hover:text-white">
                  Four-part formula
                </a>
                <a href="#steps-heading" className="block text-slate-400 hover:text-white">
                  Writing steps
                </a>
                <a href="#keywords-heading" className="block text-slate-400 hover:text-white">
                  ATS keywords
                </a>
                <a href="#examples-heading" className="block text-slate-400 hover:text-white">
                  18 examples
                </a>
                <a href="#rewrite-heading" className="block text-slate-400 hover:text-white">
                  Weak vs. stronger
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
              <h2 className="font-bold text-emerald-200">Write it last</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Complete the resume body first. Then summarize the strongest
                relevant evidence already present in the document.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">No invented proof</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Do not estimate years, metrics, revenue, scope, tools,
                credentials, or outcomes. A truthful no-metrics summary is
                stronger than an unsupported claim.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Keyword Guide
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Tailoring Guide
                </Link>
                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Bullets Without Metrics Guide
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

      <HumanAtsReviewCta source="resume-summary-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational templates and must be
        adapted to accurately reflect your own background.
      </footer>
    </main>
  );
}
