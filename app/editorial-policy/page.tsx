import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/editorial-policy";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Editorial Policy | ResumeClimb AI";
const PAGE_DESCRIPTION =
  "Learn how ResumeClimb AI researches, creates, reviews, and updates resume guides and AI-assisted content while protecting accuracy and transparency.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: `${SITE_URL}/about` }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "ResumeClimb AI editorial policy",
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

const editorialStandards = [
  {
    title: "People-first purpose",
    description:
      "Every page should help a job seeker complete a real task or understand a real resume problem. We do not publish a page only because a keyword exists.",
  },
  {
    title: "Original practical value",
    description:
      "Our guides are developed around the responsibilities, tools, language, and decisions relevant to each topic. We do not copy or lightly rewrite another publisher’s article.",
  },
  {
    title: "Truthful resume guidance",
    description:
      "Examples must not encourage visitors to claim experience, skills, qualifications, responsibilities, or achievements they do not have.",
  },
  {
    title: "Clear limitations",
    description:
      "We describe ATS scores, keyword matches, and AI-generated suggestions as estimates or guidance—not guaranteed employer outcomes.",
  },
  {
    title: "Readable and actionable content",
    description:
      "A visitor should be able to understand the recommendation, see a relevant example, and know what to do next without unnecessary complexity.",
  },
  {
    title: "Meaningful updates",
    description:
      "We change a page’s reviewed or modified date only when its guidance, examples, accuracy, structure, or usefulness has been substantively improved.",
  },
] as const;

const publishingSteps = [
  {
    number: "1",
    title: "Define the user need",
    description:
      "We begin with a specific job-seeker question, task, or difficulty and determine what a satisfying answer should help the visitor accomplish.",
  },
  {
    number: "2",
    title: "Research the topic",
    description:
      "We identify relevant role responsibilities, tools, terminology, ATS considerations, writing principles, and important limitations before drafting.",
  },
  {
    number: "3",
    title: "Develop useful examples",
    description:
      "Examples are organized by real work areas and written as adaptable models. Placeholder metrics are clearly marked and must be replaced only with verified information.",
  },
  {
    number: "4",
    title: "Review before publication",
    description:
      "UDA Apps reviews pages for clarity, relevance, unsupported promises, duplicated ideas, misleading wording, broken links, and technical presentation before publishing.",
  },
  {
    number: "5",
    title: "Monitor and improve",
    description:
      "After publication, we use technical checks, search performance, observed user needs, and identified weaknesses to prioritize meaningful improvements.",
  },
] as const;

const exampleRules = [
  "Treat every resume bullet as a model to adapt, not a claim to copy automatically.",
  "Replace bracketed figures such as [X%] or [$X] only with numbers supported by reliable records or personal evidence.",
  "Remove tools, responsibilities, or outcomes that do not accurately describe the user’s experience.",
  "Prefer specific, explainable language over exaggerated claims and unsupported superlatives.",
  "Review every AI-generated draft before adding it to a resume or sending an application.",
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      dateModified: "2026-08-07",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      author: {
        "@type": "Organization",
        name: "UDA Apps",
        url: `${SITE_URL}/about`,
      },
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
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
          name: "Editorial Policy",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

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
              href="/about"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              About
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
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">Editorial Policy</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Transparency and Quality
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ResumeClimb AI Editorial Policy
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This policy explains how we select topics, develop examples, use
              AI assistance, review claims, and improve published content. Our
              goal is to create practical resume help that serves people before
              search engines.
            </p>
            <p className="mt-6 text-sm text-slate-400">
              Last reviewed: <time dateTime="2026-08-07">August 7, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Editorial purpose
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Help job seekers present genuine experience more effectively
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
              <p>
                ResumeClimb AI publishes tools and educational content for
                people writing, reviewing, and tailoring resumes. We aim to
                answer practical questions completely enough that a visitor can
                take a useful next step.
              </p>
              <p>
                We do not create content to encourage fabricated experience or
                to promise employment outcomes. A resume remains the user’s
                personal document, and every suggestion must be checked against
                the user’s actual background and target job.
              </p>
            </div>
          </section>

          <section aria-labelledby="standards-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Publishing standards
            </p>
            <h2
              id="standards-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Standards applied to our tools and guides
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {editorialStandards.map((standard) => (
                <section
                  key={standard.title}
                  className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300"
                  >
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    {standard.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {standard.description}
                  </p>
                </section>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="process-heading"
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
              Our publishing process
            </p>
            <h2
              id="process-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              From user need to reviewed resource
            </h2>

            <ol className="mt-8 space-y-5">
              {publishingSteps.map((step) => (
                <li
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/15 font-bold text-violet-300">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
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

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                AI transparency
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                How AI assistance may be used
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-300">
                <p>
                  AI-assisted methods may help organize drafts, explore clearer
                  wording, structure example groups, and generate alternative
                  phrasing for review.
                </p>
                <p>
                  AI output is not treated as automatically accurate or ready
                  for publication. Published resources are reviewed for useful
                  structure, misleading claims, unsupported guarantees,
                  repetition, and consistency with our truth-first principles.
                </p>
                <p>
                  Visitors must also review generated resume content because an
                  AI tool cannot independently confirm their personal history.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Example integrity
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                How resume examples should be used
              </h2>
              <ul className="mt-5 space-y-3 leading-7 text-slate-300">
                {exampleRules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span aria-hidden="true" className="text-emerald-300">
                      ✓
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="ats-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
              ATS accuracy
            </p>
            <h2
              id="ats-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              We do not promise a universal ATS pass
            </h2>
            <div className="mt-7 rounded-3xl border border-amber-500/25 bg-amber-500/10 p-7 sm:p-8">
              <div className="space-y-4 leading-8 text-slate-300">
                <p>
                  Employers configure applicant tracking and recruitment
                  systems differently. ResumeClimb AI therefore describes its
                  score as an estimate based on the resume, target job
                  description, and checks available in the tool.
                </p>
                <p>
                  Keyword recommendations should be added only when they match
                  the applicant’s real knowledge or experience. A higher tool
                  score cannot guarantee an interview, selection decision, or
                  result from a specific employer.
                </p>
              </div>
              <Link
                href="/ats-resume-checker"
                className="mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Use the ATS Resume Checker
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-white">
                Updates and corrections
              </h2>
              <p className="mt-4 leading-8 text-slate-400">
                We review content when we identify an accuracy issue, unclear
                recommendation, broken experience, changing technical need, or
                meaningful opportunity to improve usefulness. Corrections are
                prioritized according to their potential impact on users.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                Publication dates are not changed simply to make old content
                appear new. A modified or reviewed date should represent a real
                editorial improvement or verification.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-white">
                Commercial transparency
              </h2>
              <p className="mt-4 leading-8 text-slate-400">
                Some pages may present an optional human resume review service
                after providing free tools or guidance. Paid assistance is
                identified separately and is not required to use the free
                ResumeClimb AI resources.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                When an external platform is used for an order, its role in
                payment and communication is stated near the relevant link.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-7 text-center sm:p-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Useful guidance should earn trust through accuracy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-300">
              ResumeClimb AI is developed and maintained by UDA Apps. Learn
              more about why the platform exists and the principles behind its
              tools and guides.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/about"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                About ResumeClimb AI
              </Link>
              <Link
                href="/guides"
                className="rounded-xl border border-slate-700 bg-slate-950/40 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Explore Resume Guides
              </Link>
            </div>
          </section>
        </div>
      </article>

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        <p>© 2026 ResumeClimb AI. Developed by UDA Apps.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>
          <Link href="/guides" className="transition hover:text-white">
            Resume Guides
          </Link>
          <Link
            href="/resume-bullet-generator"
            className="transition hover:text-white"
          >
            Bullet Generator
          </Link>
          <Link
            href="/ats-resume-checker"
            className="transition hover:text-white"
          >
            ATS Checker
          </Link>
        </div>
      </footer>
    </main>
  );
}
