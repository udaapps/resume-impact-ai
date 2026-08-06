import type { Metadata } from "next";
import Link from "next/link";

const pageUrl =
  "https://www.resumeclimbai.com/guides/resume-bullets-without-metrics";

const pageTitle = "How to Write Strong Resume Bullets Without Metrics";

const socialTitle =
  "How to Write Strong Resume Bullets Without Metrics | ResumeClimb AI";

const pageDescription =
  "Learn how to write strong, specific, and ATS-friendly resume bullet points when you do not have numbers or metrics, with formulas and practical examples.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  authors: [{ name: "UDA Apps" }],
  creator: "UDA Apps",
  publisher: "UDA Apps",
  category: "career",
  keywords: [
    "resume bullets without metrics",
    "resume bullet points without numbers",
    "how to write resume bullet points",
    "strong resume bullet examples",
    "ATS friendly resume bullets",
    "resume accomplishment examples",
    "resume action verbs",
  ],
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    siteName: "ResumeClimb AI",
    title: socialTitle,
    description: pageDescription,
    publishedTime: "2026-08-06T00:00:00.000Z",
    modifiedTime: "2026-08-06T00:00:00.000Z",
    authors: ["UDA Apps"],
    images: [
      {
        url: "https://www.resumeclimbai.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "How to write strong resume bullets without metrics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: pageDescription,
    images: ["https://www.resumeclimbai.com/opengraph-image.png"],
  },
};

const faqItems = [
  {
    question: "Can a resume bullet be strong without numbers?",
    answer:
      "Yes. A strong bullet can show scope, ownership, complexity, quality, speed, or a positive outcome even when an exact number is unavailable. It should still be specific and truthful.",
  },
  {
    question: "Should I estimate a metric for my resume?",
    answer:
      "Only use an estimate when you can explain and support it honestly. Never invent a percentage, revenue figure, team size, or other result simply to make a bullet sound stronger.",
  },
  {
    question: "What can I use instead of percentages on a resume?",
    answer:
      "You can describe frequency, audience, responsibility, complexity, turnaround time, business purpose, quality improvement, collaboration, or the problem your work helped solve.",
  },
  {
    question: "How long should a resume bullet point be?",
    answer:
      "Most bullets are easiest to scan when they communicate one main achievement in one or two lines. Remove filler words and keep the action, context, and outcome clear.",
  },
  {
    question: "Do ATS systems require numbers in resume bullets?",
    answer:
      "No. Numbers can add useful evidence, but ATS software also looks for relevant skills, job-specific language, readable structure, and experience that aligns with the role.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: "How to Write Strong Resume Bullets Without Metrics",
      description: pageDescription,
      url: pageUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
      },
      datePublished: "2026-08-06T00:00:00.000Z",
      dateModified: "2026-08-06T00:00:00.000Z",
      inLanguage: "en-US",
      author: {
        "@type": "Organization",
        name: "UDA Apps",
        url: "https://www.resumeclimbai.com",
      },
      publisher: {
        "@type": "Organization",
        name: "ResumeClimb AI",
        url: "https://www.resumeclimbai.com",
      },
      image: "https://www.resumeclimbai.com/opengraph-image.png",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ResumeClimb AI",
          item: "https://www.resumeclimbai.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resume Bullets Without Metrics",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const examples = [
  {
    role: "Customer service",
    weak: "Helped customers with problems.",
    strong:
      "Resolved complex customer account issues across phone and email channels while maintaining clear, empathetic communication.",
  },
  {
    role: "Administrative support",
    weak: "Managed office documents.",
    strong:
      "Organized confidential records and standardized document workflows to make information easier for the team to retrieve.",
  },
  {
    role: "Retail",
    weak: "Assisted customers and stocked shelves.",
    strong:
      "Guided customers toward suitable products and maintained accurate, well-organized displays during busy store hours.",
  },
  {
    role: "Project coordination",
    weak: "Worked with different teams on projects.",
    strong:
      "Coordinated priorities, updates, and handoffs across cross-functional teams to keep project work moving toward agreed deadlines.",
  },
  {
    role: "Entry-level candidate",
    weak: "Completed a group project at university.",
    strong:
      "Collaborated with a student team to research user needs, present findings, and deliver a practical solution by the project deadline.",
  },
];

const alternativeEvidence = [
  {
    title: "Scope",
    text: "Show what you handled: customer requests, project stages, schedules, records, product areas, or multiple communication channels.",
  },
  {
    title: "Frequency",
    text: "Use honest terms such as daily, weekly, recurring, high-volume, time-sensitive, or during peak periods when exact counts are unknown.",
  },
  {
    title: "Complexity",
    text: "Mention difficult cases, competing priorities, confidential information, technical requirements, or cross-functional coordination.",
  },
  {
    title: "Quality",
    text: "Describe improvements in accuracy, consistency, clarity, reliability, compliance, organization, or customer experience.",
  },
  {
    title: "Outcome",
    text: "Explain what your work enabled: faster handoffs, fewer delays, smoother service, better decisions, or easier access to information.",
  },
  {
    title: "Ownership",
    text: "Clarify whether you led, coordinated, created, reviewed, improved, trained, resolved, or supported a meaningful part of the work.",
  },
];

export default function ResumeBulletsWithoutMetricsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white transition hover:text-blue-400"
          >
            ResumeClimb AI
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-3">
            <Link
              href="/ats-resume-checker"
              className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
            >
              ATS Checker
            </Link>
            <Link
              href="/#generator"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Generate Bullets
            </Link>
          </nav>
        </div>
      </header>

      <article>
        <section className="border-b border-slate-800 bg-gradient-to-b from-blue-950/40 to-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400"
            >
              <Link href="/" className="transition hover:text-blue-400">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span>Guides</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">Resume Bullets</span>
            </nav>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Resume Writing Guide
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to Write Strong Resume Bullets Without Metrics
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              You do not need to invent percentages or revenue figures to write
              an impressive resume. Learn how to show scope, skill, ownership,
              and impact when exact numbers are unavailable.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
              <span>By UDA Apps</span>
              <span aria-hidden="true">•</span>
              <time dateTime="2026-08-06">August 6, 2026</time>
              <span aria-hidden="true">•</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-4xl">
            <section aria-labelledby="short-answer">
              <div className="rounded-3xl border border-blue-900/70 bg-blue-950/30 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  The short answer
                </p>
                <h2
                  id="short-answer"
                  className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  Replace missing numbers with specific evidence
                </h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Start with a strong action verb, name the work you performed,
                  explain how or where you performed it, and finish with the
                  value it created. Your evidence can be scope, frequency,
                  difficulty, quality, ownership, or a clear outcome—not only a
                  percentage.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <p className="font-semibold text-white">Simple formula</p>
                  <p className="mt-2 text-lg leading-8 text-blue-300">
                    Action verb + task or scope + method or context + outcome
                  </p>
                </div>
              </div>
            </section>

            <section id="why-metrics-help" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                Why metrics help—and why they are not always necessary
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Numbers make results easier to understand. A recruiter can
                quickly picture “reduced response time by 20%” or “supported 40
                customers per day.” However, many employees are never given
                access to performance data. Students, career changers,
                assistants, support staff, and people working in confidential
                environments may also have useful achievements that cannot be
                reduced to a reliable number.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                The goal is not to force a metric into every line. The goal is
                to give the reader credible evidence that shows what you did,
                how you approached it, and why the work mattered. A specific,
                truthful bullet without numbers is stronger than a dramatic but
                unsupported claim.
              </p>
            </section>

            <section id="alternatives" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                Six types of evidence you can use instead of metrics
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                When you cannot use a percentage, dollar value, or exact count,
                choose the most relevant evidence from the options below.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {alternativeEvidence.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="method" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                A four-step method for writing the bullet
              </h2>

              <ol className="mt-8 space-y-6">
                <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                      1
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Choose a precise action verb
                      </h3>
                      <p className="mt-3 leading-7 text-slate-400">
                        Replace passive openings such as “responsible for” or
                        “helped with” with a verb that reflects your real role.
                        Useful choices include resolved, coordinated, created,
                        improved, reviewed, trained, organized, supported, and
                        maintained.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                      2
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Name the task and its scope
                      </h3>
                      <p className="mt-3 leading-7 text-slate-400">
                        Be clearer than the job description. Identify the type
                        of customers, records, projects, systems, products, or
                        team activity involved. Relevant details help both
                        recruiters and ATS tools understand your experience.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                      3
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Explain how you did the work
                      </h3>
                      <p className="mt-3 leading-7 text-slate-400">
                        Add a method, tool, skill, or working condition when it
                        strengthens the line. You might mention cross-functional
                        collaboration, careful documentation, customer
                        communication, process standardization, research, or
                        quality checks.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                      4
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">
                        End with a credible outcome
                      </h3>
                      <p className="mt-3 leading-7 text-slate-400">
                        Describe the practical value of the work without
                        exaggeration. Outcomes may include clearer decisions,
                        smoother handoffs, more consistent service, improved
                        accuracy, reduced confusion, or on-time delivery.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </section>

            <section id="examples" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                Resume bullet examples without numbers
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Notice how each improved example adds context and value without
                inventing a metric.
              </p>

              <div className="mt-8 space-y-6">
                {examples.map((example) => (
                  <div
                    key={example.role}
                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50"
                  >
                    <h3 className="border-b border-slate-800 px-6 py-4 text-lg font-semibold text-blue-300">
                      {example.role}
                    </h3>
                    <div className="grid gap-5 p-6 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-rose-400">
                          Weak
                        </p>
                        <p className="mt-3 leading-7 text-slate-400">
                          {example.weak}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                          Stronger
                        </p>
                        <p className="mt-3 leading-7 text-slate-200">
                          {example.strong}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="find-evidence" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                Questions that help you find hidden evidence
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                If your first draft still sounds like a basic duty, answer a few
                of these questions before rewriting it:
              </p>
              <ul className="mt-6 space-y-3 text-slate-300">
                {[
                  "Who depended on this work—customers, managers, teammates, or another department?",
                  "What made the task difficult, urgent, sensitive, or important?",
                  "Which tool, process, or professional skill did you use?",
                  "Did you create, improve, organize, solve, prevent, or coordinate something?",
                  "What became clearer, faster, easier, safer, or more consistent because of your work?",
                  "Did someone trust you with ownership, training, quality checks, or confidential information?",
                ].map((question) => (
                  <li key={question} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="mistakes" className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-bold tracking-tight">
                Common mistakes to avoid
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Inventing a number",
                    text: "A false metric can damage your credibility. Use a truthful qualitative result when reliable data is not available.",
                  },
                  {
                    title: "Listing only responsibilities",
                    text: "A duty tells the reader what the role required. Add context, method, ownership, or outcome to show how you performed it.",
                  },
                  {
                    title: "Using vague praise",
                    text: "Words such as excellent, successful, and outstanding are weak without evidence. Describe the work instead of rating yourself.",
                  },
                  {
                    title: "Forcing every detail into one sentence",
                    text: "Keep one main idea per bullet. A concise, focused line is easier for both recruiters and ATS systems to scan.",
                  },
                  {
                    title: "Copying keywords you cannot support",
                    text: "Use relevant language from the job description only when it accurately reflects your real skills and experience.",
                  },
                ].map((mistake) => (
                  <div
                    key={mistake.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
                  >
                    <h3 className="font-semibold text-white">
                      {mistake.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {mistake.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-14" aria-labelledby="final-checklist">
              <div className="rounded-3xl border border-emerald-900/60 bg-emerald-950/20 p-6 sm:p-8">
                <h2
                  id="final-checklist"
                  className="text-3xl font-bold tracking-tight"
                >
                  Final checklist
                </h2>
                <ul className="mt-6 space-y-3">
                  {[
                    "The bullet begins with a clear action verb.",
                    "It names a specific task, responsibility, or achievement.",
                    "It includes useful context, scope, method, or complexity.",
                    "It explains a credible outcome or business purpose.",
                    "It uses job-relevant language that reflects your real experience.",
                    "Every claim is accurate and can be explained in an interview.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 leading-7 text-slate-200"
                    >
                      <span className="font-bold text-emerald-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24 pt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Frequently Asked Questions
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Resume bullets without metrics FAQ
              </h2>
              <div className="mt-8 space-y-4">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                  >
                    <summary className="cursor-pointer list-none pr-6 font-semibold text-white marker:content-none">
                      {item.question}
                    </summary>
                    <p className="mt-4 leading-7 text-slate-400">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="pt-14">
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-center shadow-2xl shadow-blue-950/40 sm:p-10">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Turn your real experience into stronger resume bullets
                </h2>
                <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
                  Enter your job title and responsibility. Metrics are optional,
                  so you can create stronger wording without inventing numbers.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/#generator"
                    className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    Generate Resume Bullets
                  </Link>
                  <Link
                    href="/ats-resume-checker"
                    className="rounded-full border border-blue-300/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Check Your Resume
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="font-semibold text-white">In this guide</p>
              <nav aria-label="Table of contents" className="mt-5">
                <ul className="space-y-3 text-sm text-slate-400">
                  <li>
                    <a href="#why-metrics-help" className="hover:text-blue-400">
                      Why metrics help
                    </a>
                  </li>
                  <li>
                    <a href="#alternatives" className="hover:text-blue-400">
                      Evidence alternatives
                    </a>
                  </li>
                  <li>
                    <a href="#method" className="hover:text-blue-400">
                      Four-step method
                    </a>
                  </li>
                  <li>
                    <a href="#examples" className="hover:text-blue-400">
                      Resume examples
                    </a>
                  </li>
                  <li>
                    <a href="#find-evidence" className="hover:text-blue-400">
                      Find hidden evidence
                    </a>
                  </li>
                  <li>
                    <a href="#mistakes" className="hover:text-blue-400">
                      Common mistakes
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-blue-400">
                      FAQ
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </article>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>© 2026 ResumeClimb AI. Built by UDA Apps.</p>
      </footer>
    </main>
  );
}
