import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/about";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "About ResumeClimb AI | Truthful Resume Help";
const PAGE_DESCRIPTION =
  "Learn why ResumeClimb AI was created, how its free resume tools and guides are developed, and why truthful experience matters in every resume.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: PAGE_URL }],
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
        alt: "About ResumeClimb AI",
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

const principles = [
  {
    title: "Start with real experience",
    description:
      "A stronger resume should present genuine responsibilities, skills, projects, and results more clearly—not create experience a person does not have.",
  },
  {
    title: "Never invent a metric",
    description:
      "Numbers can strengthen a resume only when they are accurate. Our guidance includes practical ways to show scope, complexity, ownership, and outcomes when verified metrics are unavailable.",
  },
  {
    title: "Explain estimates honestly",
    description:
      "An ATS score is an educational estimate, not a guarantee that a particular employer or applicant tracking system will accept a resume.",
  },
  {
    title: "Make free help genuinely useful",
    description:
      "Visitors should receive actionable value from our free tools and guides before deciding whether they need any additional support.",
  },
] as const;

const resources = [
  {
    href: "/resume-bullet-generator",
    label: "Free writing tool",
    title: "AI Resume Bullet Generator",
    description:
      "Turn a real responsibility, achievement, and optional verified metric into clearer resume bullet options.",
    linkText: "Generate resume bullets",
  },
  {
    href: "/ats-resume-checker",
    label: "Free analysis tool",
    title: "ATS Resume Checker",
    description:
      "Compare a resume with a target job description and review keywords, structure, bullet quality, and practical improvement opportunities.",
    linkText: "Check a resume",
  },
  {
    href: "/guides",
    label: "Practical learning library",
    title: "Resume Writing Guides",
    description:
      "Use role-specific examples, ATS keyword guidance, writing formulas, and truthful customization advice.",
    linkText: "Explore resume guides",
  },
] as const;

const processSteps = [
  {
    number: "1",
    title: "Identify a real job-search problem",
    description:
      "We focus on questions job seekers actually face, such as writing bullets without metrics, matching a resume to a job, or describing role-specific work.",
  },
  {
    number: "2",
    title: "Create a practical solution",
    description:
      "Each tool or guide is designed to help a visitor complete a useful task, not simply repeat general resume advice.",
  },
  {
    number: "3",
    title: "Add accuracy safeguards",
    description:
      "We remind users to verify generated wording, remove unsupported claims, and include only skills, tools, achievements, and numbers they can explain truthfully.",
  },
  {
    number: "4",
    title: "Review and improve",
    description:
      "Content and tools are updated as we identify clearer explanations, useful examples, technical issues, and new user needs.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ResumeClimb AI",
      url: SITE_URL,
      description:
        "ResumeClimb AI provides free resume writing tools, an estimated ATS resume checker, and practical resume guides designed to improve the presentation of real experience.",
      creator: {
        "@type": "Organization",
        name: "UDA Apps",
      },
    },
    {
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
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
          name: "About ResumeClimb AI",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function AboutPage() {
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
            <Link
              href="/guides"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Resume Guides
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
              <span className="text-slate-300">About</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About ResumeClimb AI
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Better wording for real experience
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              ResumeClimb AI helps job seekers present their genuine work,
              skills, projects, and achievements more clearly. Our goal is not
              to manufacture an impressive story—it is to make a truthful one
              easier to understand.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Try the Free Bullet Generator
              </Link>
              <Link
                href="/guides"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Read Resume Guides
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Why we exist
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Resume help should be useful, understandable, and honest
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
              <p>
                Job seekers often know what they did but struggle to describe
                it in concise, professional language. Others are unsure which
                keywords matter, how an ATS may interpret a resume, or how to
                show impact when they do not have reliable numbers.
              </p>
              <p>
                ResumeClimb AI was created by UDA Apps to make those tasks
                easier through free tools and practical guidance. We build for
                people who want to improve the presentation of their real
                experience without adding false claims simply to sound more
                impressive.
              </p>
            </div>
          </section>

          <section aria-labelledby="principles-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Our principles
            </p>
            <h2
              id="principles-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              What guides every tool and article
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {principles.map((principle) => (
                <section
                  key={principle.title}
                  className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 font-bold text-emerald-300"
                  >
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {principle.description}
                  </p>
                </section>
              ))}
            </div>
          </section>

          <section aria-labelledby="resources-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
              What we provide
            </p>
            <h2
              id="resources-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Free tools and practical guidance for stronger resumes
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {resources.map((resource) => (
                <section
                  key={resource.href}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300">
                    {resource.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {resource.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-400">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.href}
                    className="mt-6 font-semibold text-blue-300 transition hover:text-blue-200"
                  >
                    {resource.linkText} →
                  </Link>
                </section>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="process-heading"
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
              How we work
            </p>
            <h2
              id="process-heading"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Build around a real user problem, then improve carefully
            </h2>

            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {processSteps.map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-emerald-200">
                What ResumeClimb AI can do
              </h2>
              <ul className="mt-5 space-y-3 leading-7 text-slate-300">
                <li>• Help organize and clarify information you provide.</li>
                <li>• Suggest stronger, more concise resume wording.</li>
                <li>• Highlight potential keyword and structure gaps.</li>
                <li>• Provide examples you can adapt to real experience.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-amber-200">
                What it cannot guarantee
              </h2>
              <ul className="mt-5 space-y-3 leading-7 text-slate-300">
                <li>• A particular ATS score from every employer.</li>
                <li>• Selection for an interview or a job offer.</li>
                <li>• Accuracy of information the user has not verified.</li>
                <li>• A replacement for personal judgment or professional advice.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-7 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Our continuing mission
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Help people communicate their value without compromising the truth
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-300">
              We will continue building useful resume tools and guides around
              genuine job-seeker needs. Every generated result remains a draft:
              review it, personalize it, and keep only statements that accurately
              represent your experience.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Improve My Resume Bullets
              </Link>
              <Link
                href="/ats-resume-checker"
                className="rounded-xl border border-slate-700 bg-slate-950/40 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Check My Resume
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
