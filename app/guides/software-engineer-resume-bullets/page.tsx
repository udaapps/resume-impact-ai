import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/software-engineer-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:
    "Software Engineer Resume Bullet Examples (30+) | ResumeClimb AI",
  description:
    "Use 30+ software engineer resume bullet examples for backend, frontend, APIs, cloud, DevOps, performance, testing, and leadership roles.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title:
      "Software Engineer Resume Bullet Examples (30+) | ResumeClimb AI",
    description:
      "Practical software engineer resume bullets, ATS keywords, writing formulas, and before-and-after examples.",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "Software Engineer Resume Bullet Examples (30+)",
    description:
      "Build stronger, ATS-friendly software engineering resume bullets with practical examples and keyword guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const bulletGroups = [
  {
    title: "Backend development and APIs",
    description:
      "Use these examples when your work focused on services, APIs, databases, integrations, or server-side systems.",
    bullets: [
      "Designed and maintained REST APIs that supported [X]+ daily requests across customer-facing and internal applications.",
      "Developed backend services using [language/framework] and integrated them with relational and NoSQL databases.",
      "Reduced API response time by [X%] by optimizing queries, caching repeated requests, and removing unnecessary processing.",
      "Implemented authentication, authorization, validation, and error-handling controls for production API endpoints.",
      "Integrated third-party payment, messaging, analytics, or identity services while documenting failure and retry behavior.",
    ],
  },
  {
    title: "Frontend and product development",
    description:
      "Choose these when you built user interfaces, design systems, dashboards, or customer-facing product features.",
    bullets: [
      "Built responsive web interfaces using [React/Vue/Angular] and reusable components aligned with product and design requirements.",
      "Improved page performance by [X%] through code splitting, lazy loading, image optimization, and reduced client-side JavaScript.",
      "Converted product requirements and design specifications into accessible, mobile-friendly application features.",
      "Created reusable UI components that reduced duplicate implementation work across [X] product screens.",
      "Collaborated with designers and backend engineers to deliver end-to-end features from planning through production release.",
    ],
  },
  {
    title: "Databases, performance, and reliability",
    description:
      "Use these to show measurable improvements in speed, availability, data quality, or operational stability.",
    bullets: [
      "Optimized SQL queries and database indexes, reducing average page or report load time by [X%].",
      "Designed database schemas, migrations, and data-access patterns for scalable application features.",
      "Investigated production incidents using logs, metrics, and traces and implemented fixes that prevented repeat failures.",
      "Improved service reliability by adding health checks, monitoring alerts, graceful error handling, and recovery procedures.",
      "Reduced recurring defects by adding automated regression tests and strengthening code-review checklists.",
    ],
  },
  {
    title: "Cloud, DevOps, and delivery",
    description:
      "These examples fit cloud infrastructure, deployment automation, CI/CD, containers, and release responsibilities.",
    bullets: [
      "Automated build, test, and deployment workflows using CI/CD pipelines, reducing manual release steps by [X%].",
      "Containerized services with Docker and standardized local, staging, and production environments.",
      "Deployed and maintained applications on [AWS/Azure/GCP] using documented infrastructure and access controls.",
      "Implemented environment-specific configuration, secrets management, and deployment validation for production releases.",
      "Improved deployment frequency from [old cadence] to [new cadence] while maintaining rollback and monitoring procedures.",
    ],
  },
  {
    title: "Testing, security, and code quality",
    description:
      "Select these when your contribution involved automated testing, secure development, maintainability, or engineering standards.",
    bullets: [
      "Created unit, integration, and end-to-end tests for critical workflows, increasing automated coverage to [X%].",
      "Reviewed pull requests for correctness, maintainability, security risks, and alignment with engineering standards.",
      "Resolved dependency, validation, and access-control vulnerabilities identified through security reviews and automated scanning.",
      "Refactored legacy modules into smaller, testable components without changing expected production behavior.",
      "Documented architecture decisions, API contracts, troubleshooting steps, and onboarding guidance for the engineering team.",
    ],
  },
  {
    title: "Leadership, collaboration, and delivery",
    description:
      "Use these for senior, lead, mentoring, planning, or cross-functional engineering experience.",
    bullets: [
      "Led technical planning for [feature/project], clarified dependencies, and coordinated delivery across engineering and product teams.",
      "Mentored [X] junior developers through pairing, code reviews, debugging support, and structured technical feedback.",
      "Translated business requirements into technical tasks, delivery estimates, risks, and implementation milestones.",
      "Partnered with product, design, QA, and operations teams to release features and resolve production issues.",
      "Presented technical trade-offs and recommendations to stakeholders, helping the team select a maintainable solution.",
    ],
  },
];

const keywordGroups = [
  {
    title: "Programming and frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "React",
      "Node.js",
      "Spring Boot",
    ],
  },
  {
    title: "Backend and data",
    items: [
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "microservices",
      "database design",
    ],
  },
  {
    title: "Cloud and delivery",
    items: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "cloud deployment",
    ],
  },
  {
    title: "Engineering practices",
    items: [
      "unit testing",
      "integration testing",
      "code review",
      "system design",
      "Agile",
      "observability",
      "performance optimization",
      "technical documentation",
    ],
  },
];

const faqItems = [
  {
    question:
      "How many bullets should a software engineer include for each job?",
    answer:
      "A recent and relevant role commonly needs four to six focused bullets. Older or less relevant roles may need two to four. Prioritize technical scope, measurable impact, complexity, ownership, and collaboration.",
  },
  {
    question:
      "Should I list every technology inside the experience section?",
    answer:
      "No. Mention technologies where they help explain what you built or improved. Keep a separate skills section for broader keyword coverage, and avoid repeating long tool lists in every bullet.",
  },
  {
    question:
      "What metrics can software engineers use?",
    answer:
      "Useful metrics may include response time, page speed, uptime, error rate, deployment frequency, test coverage, infrastructure cost, request volume, user count, processing time, defect reduction, or delivery time. Use only figures you can verify.",
  },
  {
    question:
      "How should an entry-level engineer write resume bullets?",
    answer:
      "Describe projects as real engineering work: the problem, technology, feature, technical decision, testing approach, deployment, users, or measurable result. Coursework, internships, open-source work, and personal projects can provide credible evidence.",
  },
  {
    question:
      "Can I copy these examples exactly?",
    answer:
      "Use them as structures rather than ready-made claims. Replace the technology, scope, action, and result so the final bullet accurately reflects your own work and target role.",
  },
];

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

export default function SoftwareEngineerResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Software Engineer Resume Bullet Examples (30+)",
    description:
      "Software engineer resume bullet examples, ATS keywords, writing formulas, and practical customization guidance.",
    datePublished: "2026-08-03",
    dateModified: "2026-08-03",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "ResumeClimb AI",
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
        name: "Software Engineer Resume Bullet Examples",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <nav className="border-b border-slate-800 bg-slate-950/95">
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
              <span>Resume Guides</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">
                Software Engineer Bullets
              </span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Software Engineering Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Software Engineer Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Use these 30 achievement-focused examples to describe
              backend, frontend, API, database, cloud, DevOps, testing,
              performance, and leadership work. Adapt each example to
              your real contribution and target job description.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Software Engineer Bullets
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
                30 examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Technical ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                Verified metrics only
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Published{" "}
              <time dateTime="2026-08-03">August 3, 2026</time>
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
                Show what you built, how you built it, and what improved
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Action verb + system or feature + technology or scope +
                  verified result
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Worked on backend APIs.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Developed REST APIs with Node.js and PostgreSQL,
                      added validation and caching, and reduced average
                      response time by 35%.
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
                30 software engineer resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose examples that match work you actually performed.
                Replace bracketed placeholders with accurate
                technologies, scale, dates, and metrics you can explain
                during an interview.
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
                          <p className="leading-7 text-slate-200">
                            {bullet}
                          </p>
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
                Software engineer resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every technology. Compare the job description
                with your real skills, then use the exact relevant terms
                in your skills and experience sections.
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

            <section aria-labelledby="metrics-heading">
              <h2
                id="metrics-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Useful software engineering resume metrics
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "API or page response time",
                  "Request, transaction, or user volume",
                  "Uptime, availability, or error rate",
                  "Build and deployment time",
                  "Deployment frequency",
                  "Cloud or infrastructure cost",
                  "Automated test coverage",
                  "Defects or incidents reduced",
                  "Processing time or throughput",
                  "Team, project, or feature scope",
                ].map((metric) => (
                  <div
                    key={metric}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-slate-300"
                  >
                    ✓ {metric}
                  </div>
                ))}
              </div>

              <p className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5 leading-7 text-amber-100">
                Do not estimate a number merely to make a bullet sound
                stronger. Use a verified figure or describe the scope
                and outcome without a metric.
              </p>
            </section>

            <section aria-labelledby="tailoring-heading">
              <h2
                id="tailoring-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to tailor the bullets to a software engineering job
              </h2>

              <ol className="mt-7 space-y-4">
                {[
                  "Mark the job description’s repeated technologies, system types, engineering practices, and ownership expectations.",
                  "Choose projects and achievements that prove the most important requirements.",
                  "Use the employer’s exact technology term only when it accurately matches your experience.",
                  "Describe your personal contribution instead of presenting the entire team’s work as your own.",
                  "Add verified scale or impact, then remove unnecessary implementation detail that does not support the target role.",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-300">
                      {index + 1}
                    </span>
                    <p className="pt-1 leading-7 text-slate-300">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
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
                Turn your engineering work into stronger resume bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Enter your role, responsibility, achievement, and
                verified metric to generate three tailored bullet
                options. Review every claim before using it.
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
                  href="#formula-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Resume bullet formula
                </a>
                <a
                  href="#examples-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  30 bullet examples
                </a>
                <a
                  href="#keywords-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS keywords
                </a>
                <a
                  href="#metrics-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Useful metrics
                </a>
                <a
                  href="#tailoring-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Tailoring steps
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
                Accuracy reminder
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use only truthful technologies, responsibilities,
                achievements, ownership, and metrics. Strong wording
                should improve presentation—not create experience you do
                not have.
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
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Free ATS Resume Checker
                </Link>
                <Link
                  href="/guides/customer-service-resume-bullets"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Customer Service Bullet Examples
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="software-engineer-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-500">
        © 2026 ResumeClimb AI. Examples are educational and must be
        adapted to accurately reflect your experience.
      </footer>
    </main>
  );
}
