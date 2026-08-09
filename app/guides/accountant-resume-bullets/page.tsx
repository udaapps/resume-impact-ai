import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/accountant-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Accountant Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 accountant resume bullet examples and ATS keywords for reconciliations, financial reporting, month-end close, AP/AR, audits, tax, and Excel.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "accountant resume bullet examples",
    "accountant resume bullets",
    "accounting resume bullet points",
    "staff accountant resume examples",
    "accountant resume keywords",
    "accounting achievements",
    "ATS accountant resume",
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
        alt: "Accountant resume bullet examples",
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
    title: "General ledger and month-end close",
    description:
      "Use these examples when you prepared journal entries, maintained ledger accounts, supported close activities, or reviewed account activity.",
    bullets: [
      "Prepared and posted journal entries with supporting documentation and reviewed account coding before the month-end close.",
      "Maintained general-ledger schedules and investigated unusual balances, duplicate postings, and unsupported transactions.",
      "Coordinated assigned month-end close activities, tracked dependencies, and completed reconciliations by internal reporting deadlines.",
      "Reviewed recurring accruals, prepayments, and fixed-asset activity and recorded approved adjustments in the accounting system.",
      "Documented close procedures, account owners, review evidence, and follow-up items to support a consistent reporting process.",
    ],
  },
  {
    title: "Reconciliations and financial reporting",
    description:
      "Choose these examples when you reconciled accounts, prepared financial statements, analyzed variances, or supported management reporting.",
    bullets: [
      "Reconciled bank, balance-sheet, and control accounts and researched differences using source records and approved supporting documents.",
      "Prepared monthly financial reports and schedules in accordance with the organization’s approved accounting policies and review process.",
      "Analyzed actual results against budget, forecast, and prior periods and explained confirmed drivers behind material variances.",
      "Validated report totals against general-ledger balances and corrected confirmed mapping, timing, or classification issues before release.",
      "Prepared supporting schedules for revenue, expenses, assets, liabilities, and cash balances for management and external review.",
    ],
  },
  {
    title: "Accounts payable, receivable, and cash",
    description:
      "Use these bullets for invoice processing, vendor records, customer balances, collections, payment support, and cash monitoring.",
    bullets: [
      "Reviewed supplier invoices for required approvals, purchase documentation, tax treatment, coding, and duplicate-payment risk before posting.",
      "Maintained accounts-receivable records, applied customer payments, investigated account differences, and followed up on approved overdue balances.",
      "Prepared payment schedules and supporting files while following authorization limits, segregation-of-duties controls, and banking procedures.",
      "Monitored cash receipts and disbursements and provided current balance information to support short-term cash planning.",
      "Resolved invoice, statement, and payment discrepancies with vendors, customers, purchasing teams, and internal account owners.",
    ],
  },
  {
    title: "Budgeting, forecasting, and business support",
    description:
      "Select these examples when your accounting work supported budgets, forecasts, cost reviews, planning, or non-finance stakeholders.",
    bullets: [
      "Supported annual budgeting and periodic forecasting by consolidating approved assumptions, historical results, and departmental submissions.",
      "Prepared cost and spending analyses that helped budget owners understand trends, commitments, and material exceptions.",
      "Partnered with operational teams to clarify transaction details, resolve coding questions, and improve the accuracy of financial reporting.",
      "Built Excel schedules using formulas, pivot tables, lookups, and validation checks for recurring accounting and management reports.",
      "Translated accounting results into clear explanations of timing, classification, volume, and cost drivers for non-finance stakeholders.",
    ],
  },
  {
    title: "Audit, controls, tax, and process improvement",
    description:
      "Use these examples only when they match your actual responsibilities, authority, reporting framework, and credential status.",
    bullets: [
      "Prepared audit schedules, supporting documents, and account explanations and tracked information requests through completion.",
      "Performed assigned control activities, retained review evidence, and escalated confirmed exceptions through the approved process.",
      "Supported tax, payroll, or statutory filings by preparing reconciled schedules and providing records to authorized internal or external specialists.",
      "Mapped manual accounting steps and introduced approved templates, system rules, or checklists that improved consistency and traceability.",
      "Assisted with accounting-system changes by validating opening balances, account mappings, user workflows, and sample transactions before release.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace each bracketed placeholder only with a figure you can verify and disclose appropriately. Remove the metric if the evidence is unavailable or confidential.",
    bullets: [
      "Shortened the month-end close from [X] to [Y] business days by standardizing schedules, ownership, and review checkpoints.",
      "Reconciled [X]+ accounts across [Y] entities and cleared [Z%] of aged reconciling items through documented follow-up.",
      "Reduced overdue receivables by [X%] by improving account review, customer follow-up, and dispute documentation.",
      "Processed and reviewed [X]+ monthly invoices with [Y%] verified accuracy while following approval and coding controls.",
      "Saved [X] staff hours per reporting cycle by automating an approved reconciliation or reporting workflow in [tool].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Core accounting",
    items: [
      "general ledger",
      "journal entries",
      "month-end close",
      "account reconciliation",
      "financial statements",
      "variance analysis",
    ],
  },
  {
    title: "Payables, receivables, and cash",
    items: [
      "accounts payable",
      "accounts receivable",
      "invoice processing",
      "collections",
      "cash flow",
      "bank reconciliation",
    ],
  },
  {
    title: "Reporting, controls, and planning",
    items: [
      "financial reporting",
      "internal controls",
      "audit support",
      "budgeting",
      "forecasting",
      "regulatory compliance",
    ],
  },
  {
    title: "Accounting systems and tools",
    items: [
      "Microsoft Excel",
      "QuickBooks",
      "SAP",
      "Oracle",
      "NetSuite",
      "enterprise resource planning (ERP)",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark the accounting processes, reporting framework, systems, industries, entity scope, and credentials it requests.",
  "Select examples that match work you genuinely performed and the level of preparation, review, approval, or ownership you actually held.",
  "Replace general wording with the real account type, report, transaction, system, stakeholder, close activity, or control you handled.",
  "Add verified evidence such as accounts reconciled, invoices processed, close time, overdue balances, reporting frequency, entities supported, or hours saved.",
  "Remove any software, accounting standard, certification, authority, financial result, or metric you could not explain and support in an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should an accountant role include?",
    answer:
      "A recent and relevant accounting role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize close responsibilities, reconciliations, reporting, controls, systems, business support, and verified outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for an accountant resume?",
    answer:
      "Useful verbs include prepared, reconciled, analyzed, reviewed, validated, maintained, resolved, supported, forecasted, documented, automated, and improved. Choose the verb that accurately reflects whether you prepared, reviewed, approved, or merely assisted with the work.",
  },
  {
    question: "What metrics can accountants use on a resume?",
    answer:
      "Useful metrics may include close-cycle time, number of accounts or entities, invoice volume, overdue balances, aged reconciling items, reporting frequency, budget scope, error reduction, audit adjustments, and staff hours saved. Use only figures you can verify and disclose appropriately.",
  },
  {
    question: "Which accountant ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your experience. Common examples include general ledger, journal entries, month-end close, account reconciliation, financial reporting, accounts payable, accounts receivable, variance analysis, internal controls, audit support, Excel, and the accounting system you actually used.",
  },
  {
    question: "Should I list GAAP, IFRS, CPA, ACCA, or another credential?",
    answer:
      "List an accounting framework only when you genuinely worked with it in the stated context. Use the official name and accurate status for every license, membership, or qualification. Do not present planned, incomplete, expired, or unsupported credentials as current.",
  },
  {
    question: "What can an entry-level accountant write?",
    answer:
      "Use relevant internships, supervised work, accounting projects, coursework, volunteer responsibilities, or previous roles involving invoices, records, reconciliations, spreadsheets, reporting, or controls. Label the context accurately and do not present practice work as paid professional experience.",
  },
  {
    question: "Can I copy these accountant bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the account, process, system, scope, authority, stakeholder, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function AccountantResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-09",
    dateModified: "2026-08-09",
    inLanguage: "en-US",
    mainEntityOfPage: PAGE_URL,
    citation: [
      "https://www.onetonline.org/link/summary/13-2011.00",
      "https://www.onetonline.org/link/demand/13-2011.00",
    ],
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
        name: "Accountant Resume Bullet Examples",
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
              <span className="text-slate-300">Accountant Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Accountant Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Accountant Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe reconciliations, financial reporting, month-end close,
              accounts payable and receivable, audits, controls, budgeting, and
              accounting systems with clear, ATS-friendly bullets. Adapt every
              example to your real responsibilities and verified results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Accountant Bullets
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
                Accountant ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented credentials
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-09">August 9, 2026</time>
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
                Connect the accounting task to scope and a credible outcome
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + accounting process + system or scope +
                  accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for account reconciliations.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Reconciled bank and general-ledger accounts, investigated
                      exceptions using supporting records, and cleared confirmed
                      discrepancies before month-end reporting.
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
                30 accountant resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect work you performed. Replace
                bracketed placeholders with verified information from approved
                reports, reconciliations, accounting records, or performance
                reviews.
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
                Accountant resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real work and use only processes, systems, standards,
                and credentials you can explain and support.
              </p>
              <Link
                href="/guides/resume-keywords-for-ats"
                className="mt-5 inline-flex font-semibold text-amber-300 hover:text-amber-200"
              >
                Learn how to find and use ATS keywords truthfully →
              </Link>

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
                How to show accounting impact without confidential figures
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If balances, revenue, costs, budgets, customer information, or
                transaction volumes are confidential, describe the account type,
                reporting frequency, process, control, stakeholders, and
                verified improvement without exposing protected information or
                inventing a number.
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
                How to tailor these bullets to an accountant job
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

            <section aria-labelledby="research-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Research basis
              </p>
              <h2
                id="research-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What this accountant guide covers
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                The examples reflect common accountant work such as examining
                accounting records, preparing financial statements, supporting
                audits, maintaining controls, and using accounting software.
                Responsibilities, standards, systems, and credential rules vary
                by employer, industry, and country, so the target job
                description remains the final source for tailoring.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://www.onetonline.org/link/summary/13-2011.00"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    O*NET: Accountants and Auditors
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Occupational scope covering accounting records, financial
                    statements, advice, audits, and financial data systems.
                  </p>
                </a>

                <a
                  href="https://www.onetonline.org/link/demand/13-2011.00"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    O*NET: In-Demand Accounting Technology
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Current job-posting signals for tools including Microsoft
                    Excel, QuickBooks, and SAP.
                  </p>
                </a>
              </div>
            </section>

            <section aria-labelledby="related-guides-heading">
              <h2
                id="related-guides-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Related resume guides
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Link
                  href="/guides/data-analyst-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Data Analyst Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review Excel, data validation, reporting, dashboards,
                    analysis, automation, and stakeholder-impact examples.
                  </p>
                </Link>

                <Link
                  href="/guides/how-to-write-work-experience-on-resume"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    How to Write Resume Work Experience
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Format roles, dates, promotions, freelance work, and
                    evidence-based achievements clearly and consistently.
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
                Turn your accounting work into stronger resume bullets
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
                  href="#research-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Research basis
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
                Use only accounting processes, systems, standards, authority,
                credentials, figures, and outcomes you can truthfully support.
                Do not expose confidential financial or personal information.
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

      <HumanAtsReviewCta source="accountant-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
