import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/data-analyst-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Data Analyst Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 data analyst resume bullet examples and ATS keywords for SQL, Python, Excel, dashboards, reporting, automation, and business insights.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "data analyst resume bullet examples",
    "data analyst resume bullets",
    "data analyst resume examples",
    "data analyst resume keywords",
    "SQL resume bullet points",
    "data analytics achievements",
    "ATS data analyst resume",
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
        alt: "Data analyst resume bullet examples",
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
    title: "Data cleaning, preparation, and validation",
    description:
      "Use these examples when you prepared raw data, corrected quality issues, standardized fields, or documented datasets.",
    bullets: [
      "Cleaned and standardized data from multiple sources by resolving missing values, duplicate records, inconsistent formats, and invalid entries.",
      "Created repeatable validation checks to identify data-quality issues before information reached dashboards and stakeholder reports.",
      "Combined spreadsheet, database, and operational data into analysis-ready datasets with consistent definitions and field formats.",
      "Documented data sources, transformation steps, business rules, and known limitations so analyses could be reviewed and reproduced.",
      "Investigated unexpected values with source-system owners and corrected confirmed issues without changing valid business activity.",
    ],
  },
  {
    title: "SQL, Excel, and analytical querying",
    description:
      "Choose these examples when you queried databases, analyzed spreadsheets, joined datasets, or answered ad hoc business questions.",
    bullets: [
      "Wrote SQL queries using joins, aggregations, filters, and window functions to answer recurring and ad hoc business questions.",
      "Built Excel analysis models with formulas, pivot tables, lookup functions, and structured checks for operational reporting.",
      "Translated stakeholder questions into clear data requirements, query logic, dimensions, measures, and comparison periods.",
      "Validated query results against source totals and known benchmarks before sharing conclusions with decision-makers.",
      "Created reusable query templates for common customer, product, revenue, service, and operational analyses.",
    ],
  },
  {
    title: "Dashboards, visualization, and KPI reporting",
    description:
      "Use these bullets for Tableau, Power BI, Excel dashboards, recurring reports, data visualization, or KPI ownership.",
    bullets: [
      "Developed dashboards that presented key performance indicators, trends, targets, and exceptions in a clear decision-ready format.",
      "Partnered with report users to define KPI calculations, filters, drill-down needs, refresh schedules, and access requirements.",
      "Designed charts and tables that matched the business question and avoided unnecessary visual complexity or misleading comparisons.",
      "Maintained recurring reports by checking data refreshes, investigating variances, and documenting changes to metric definitions.",
      "Consolidated fragmented reporting into a consistent dashboard view so teams could use the same approved performance measures.",
    ],
  },
  {
    title: "Business insights and stakeholder communication",
    description:
      "Select these examples when your analysis supported decisions, explained trends, identified opportunities, or influenced business action.",
    bullets: [
      "Analyzed customer, product, and operational trends to identify patterns, exceptions, and areas requiring further investigation.",
      "Presented analytical findings in plain language and separated confirmed evidence from assumptions and recommended next steps.",
      "Segmented data by relevant customer, product, channel, region, or time-period dimensions to reveal differences hidden in overall totals.",
      "Supported planning discussions with scenario analysis that showed how different assumptions could affect expected outcomes.",
      "Worked with stakeholders to convert analytical findings into owned actions, follow-up measures, and review dates.",
    ],
  },
  {
    title: "Python, automation, and cross-functional data work",
    description:
      "Use these examples when you automated analysis, used Python, improved data workflows, or collaborated with technical and business teams.",
    bullets: [
      "Used Python and pandas to clean, combine, analyze, and export datasets for repeatable reporting and exploratory analysis.",
      "Automated recurring data-preparation and reporting steps while preserving validation checks and clear exception handling.",
      "Partnered with data engineering and system teams to clarify source fields, refresh timing, transformation logic, and data dependencies.",
      "Reviewed analytical workflows for manual bottlenecks and introduced reusable scripts, templates, or documented procedures.",
      "Supported user acceptance testing for reporting changes by comparing expected results with source data and approved business rules.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with a figure you can verify from approved reports, project records, dashboards, or performance reviews.",
    bullets: [
      "Reduced recurring report preparation time by [X%] by automating data cleaning, validation, and export steps with [tool].",
      "Improved data accuracy from [X%] to [Y%] by introducing validation rules and resolving recurring source-data issues.",
      "Built [X] dashboards used by [Y] stakeholders to monitor [Z] approved business performance measures.",
      "Analyzed [X]+ records across [Y] data sources to identify an opportunity that supported [$Z] in verified savings or revenue.",
      "Reduced dashboard refresh time by [X%] by optimizing queries, removing unnecessary transformations, and improving dataset design.",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Data tools",
    items: [
      "SQL",
      "Python",
      "Microsoft Excel",
      "pandas",
      "Power BI",
      "Tableau",
    ],
  },
  {
    title: "Analysis and data quality",
    items: [
      "data cleaning",
      "data validation",
      "exploratory data analysis",
      "trend analysis",
      "segmentation",
      "statistical analysis",
    ],
  },
  {
    title: "Reporting and visualization",
    items: [
      "dashboard development",
      "data visualization",
      "KPI reporting",
      "automated reporting",
      "ad hoc analysis",
      "business intelligence",
    ],
  },
  {
    title: "Business and collaboration",
    items: [
      "requirements gathering",
      "stakeholder communication",
      "process automation",
      "data documentation",
      "business insights",
      "cross-functional collaboration",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark repeated tools, data sources, analytical methods, stakeholders, and business areas.",
  "Select examples that match analysis you genuinely performed and the level of ownership you actually held.",
  "Replace general wording with the real database, spreadsheet, language, dashboard tool, dataset, KPI, or business question.",
  "Add verified evidence such as records analyzed, reports automated, stakeholders supported, time saved, accuracy improved, or value identified.",
  "Remove any tool, statistical method, result, dataset scale, or business-impact claim you could not explain confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a data analyst role include?",
    answer:
      "A recent and relevant data analyst role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize technical work, data complexity, stakeholder use, and verified outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for a data analyst resume?",
    answer:
      "Useful verbs include analyzed, queried, cleaned, validated, automated, developed, visualized, identified, interpreted, presented, optimized, and documented. Choose verbs that accurately describe your contribution.",
  },
  {
    question: "Should every data analyst bullet include a metric?",
    answer:
      "No. A strong bullet can show dataset complexity, tools used, analytical method, stakeholder need, data-quality improvement, or decision supported. Use numbers when they are accurate and meaningful, but never invent savings, revenue, or accuracy results.",
  },
  {
    question: "Which data analyst ATS keywords should I use?",
    answer:
      "Use keywords from the target job description that truthfully match your skills. Common examples include SQL, Python, Excel, Tableau, Power BI, data cleaning, data visualization, dashboard development, KPI reporting, statistical analysis, and business intelligence.",
  },
  {
    question: "What can an entry-level data analyst write?",
    answer:
      "Focus on relevant projects, internships, coursework, volunteer analysis, or previous work involving spreadsheets, reporting, data quality, research, dashboards, or process improvement. Explain the question, dataset, method, tools, and result without presenting practice projects as paid employment.",
  },
  {
    question: "Can I copy these data analyst bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the dataset, tool, analytical method, stakeholder, scope, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified information.",
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

export default function DataAnalystResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-07",
    dateModified: "2026-08-07",
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
        name: "Data Analyst Resume Bullet Examples",
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
              <span className="text-slate-300">Data Analyst Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Data Analyst Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Data Analyst Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe SQL, Python, Excel, data cleaning, dashboards, reporting,
              automation, and business insights with clear, ATS-friendly
              bullets. Adapt every example to your real work and verified
              results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Data Analyst Bullets
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
                Data analyst ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented impact
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-07">August 7, 2026</time>
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
                Connect technical analysis to a clear business purpose
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + data task + tool or scope + accurate
                  business outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for creating reports.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Built a Power BI dashboard that combined validated sales
                      and customer data, clarified KPI trends, and helped
                      managers identify accounts requiring follow-up.
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
                30 data analyst resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect work you performed. Replace
                bracketed placeholders with verified information from approved
                reports, dashboards, project records, or performance reviews.
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
                Data analyst resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real skills and use only tools, methods, and business
                terms you can explain and demonstrate.
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
                How to show analytical impact without confidential figures
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If customer data, revenue, costs, or record counts are
                confidential, describe the business question, data sources,
                analytical method, validation work, audience, and decision
                supported. Avoid exposing protected data or inventing a metric.
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
                How to tailor these bullets to a data analyst job
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
                  href="/guides/software-engineer-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Software Engineer Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review technical implementation, databases, performance,
                    testing, automation, and engineering-impact examples.
                  </p>
                </Link>

                <Link
                  href="/guides/project-manager-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Project Manager Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review stakeholder communication, planning, reporting, risk,
                    delivery, and cross-functional leadership examples.
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
                Turn your data work into stronger resume bullets
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
                  href="#without-metrics-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Confidential figures
                </a>
                <a
                  href="#tailoring-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Tailoring steps
                </a>
                <a
                  href="#related-guides-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Related guides
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
              <h2 className="font-bold text-emerald-200">Accuracy reminder</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use only tools, data sources, methods, projects, metrics, and
                business outcomes you can truthfully explain. Do not expose
                confidential or personally identifiable information.
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

      <HumanAtsReviewCta source="data-analyst-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
