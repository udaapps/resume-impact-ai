import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/cashier-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Cashier Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 cashier resume bullet examples for POS transactions, payments, returns, customer service, till balancing, promotions, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "cashier resume bullet examples",
    "cashier resume bullets",
    "cashier duties for resume",
    "cashier resume achievements",
    "cashier resume keywords",
    "cashier resume with no experience",
    "ATS cashier resume",
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
        alt: "Cashier resume bullet examples",
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
    title: "Checkout and POS transactions",
    description:
      "Use these examples when you scanned items, entered orders, processed sales, issued receipts, or worked with an approved point-of-sale system.",
    bullets: [
      "Processed customer purchases through the approved POS system and confirmed items, prices, discounts, payment method, and receipt delivery.",
      "Scanned merchandise and entered approved product or service codes while checking obvious price, quantity, and item discrepancies.",
      "Completed cash, card, contactless, voucher, and other authorized payment transactions using established verification procedures.",
      "Issued receipts and provided correct change after confirming the amount tendered and the total displayed by the register.",
      "Paused and escalated transactions involving unclear prices, restricted items, declined payments, or authorization requirements.",
    ],
  },
  {
    title: "Cash drawer and payment accuracy",
    description:
      "Choose these examples when you prepared a till, maintained transaction records, balanced a drawer, or followed cash-control procedures.",
    bullets: [
      "Prepared the assigned register with authorized starting funds and verified the till setup according to opening procedures.",
      "Maintained organized cash, receipts, coupons, vouchers, and transaction documents throughout the shift using approved controls.",
      "Counted the assigned drawer and reconciled cash and transaction records at shift close according to store procedures.",
      "Reported cash variances, duplicate charges, payment errors, or suspicious transactions promptly without altering supporting records.",
      "Protected payment information, register access, credentials, and cash-handling details in accordance with assigned security procedures.",
    ],
  },
  {
    title: "Customer service, returns, and problem resolution",
    description:
      "Select these examples when you greeted customers, answered questions, processed authorized returns, or resolved routine checkout concerns.",
    bullets: [
      "Greeted customers, confirmed their requests, and provided clear information about checkout steps, payment options, and approved store policies.",
      "Processed eligible returns, exchanges, credits, and refunds after checking required receipts, item conditions, and authorization rules.",
      "Resolved routine price, coupon, receipt, and payment questions and requested supervisor support when an exception exceeded assigned authority.",
      "Listened to customer concerns, maintained a calm and respectful tone, and explained the available next step without making unsupported promises.",
      "Directed product, account, delivery, warranty, or complex complaint questions to the appropriate team with an accurate summary of the issue.",
    ],
  },
  {
    title: "Promotions, loyalty programs, and product support",
    description:
      "Use these examples when you explained approved promotions, supported loyalty enrollment, answered product questions, or completed permitted sales-support tasks.",
    bullets: [
      "Explained current promotions, discounts, loyalty benefits, and redemption conditions using approved and accurate information.",
      "Invited eligible customers to join authorized rewards or membership programs without misrepresenting benefits or enrollment terms.",
      "Answered routine product-location, availability, price, and promotion questions and referred specialist questions to the responsible department.",
      "Applied approved coupons, discounts, employee benefits, and loyalty rewards only after completing required validation steps.",
      "Communicated relevant add-on or complementary options when requested or required by the role without pressuring customers or making false claims.",
    ],
  },
  {
    title: "Checkout readiness, teamwork, and store support",
    description:
      "Choose these examples when you maintained the checkout area, managed queues, bagged purchases, restocked supplies, or supported coworkers.",
    bullets: [
      "Maintained an organized checkout area with required receipt paper, bags, approved supplies, and visible customer information.",
      "Bagged or wrapped purchases according to item type, customer request, store procedure, and applicable safety requirements.",
      "Monitored queue conditions and notified the responsible team when additional checkout support or customer direction was needed.",
      "Coordinated register handoffs, breaks, shift changes, and unresolved transaction notes with supervisors and authorized coworkers.",
      "Supported approved stocking, facing, price-check, pickup, cleaning, or closing tasks while maintaining responsibility for assigned checkout duties.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with information you can verify and appropriately disclose from POS reports, till records, schedules, customer feedback, or performance reviews.",
    bullets: [
      "Processed an average of [X] verified transactions per [shift/day] while meeting the recorded [accuracy, service, or compliance measure].",
      "Handled [verified amount or range] in authorized payments per [shift/day] and met the documented till-balancing requirement.",
      "Maintained a verified transaction accuracy rate of [X%] across [approved period or transaction volume].",
      "Completed [X]+ eligible returns, exchanges, or customer-service transactions during [period] while meeting the verified [quality or response measure].",
      "Improved the verified [checkout time, queue, loyalty, customer-feedback, or error measure] from [X] to [Y] after applying [supported action].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Transactions and POS",
    items: [
      "point-of-sale systems",
      "cash handling",
      "payment processing",
      "cash register",
      "barcode scanning",
      "receipt issuance",
    ],
  },
  {
    title: "Customer service",
    items: [
      "customer service",
      "complaint resolution",
      "returns and exchanges",
      "store policies",
      "product knowledge",
      "customer communication",
    ],
  },
  {
    title: "Accuracy and checkout operations",
    items: [
      "drawer reconciliation",
      "till balancing",
      "transaction accuracy",
      "loss prevention",
      "checkout operations",
      "queue management",
    ],
  },
  {
    title: "Sales and team support",
    items: [
      "loyalty programs",
      "promotions",
      "upselling",
      "merchandising",
      "inventory support",
      "team collaboration",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark its retail, grocery, hospitality, food-service, pharmacy, ticketing, or other checkout environment, POS system, payments, returns, promotions, and shift expectations.",
  "Choose only examples that match transactions, customer support, cash access, discounts, returns, closing tasks, and sales responsibilities you genuinely performed.",
  "Replace general wording with the real POS, payment method, product type, store policy, customer request, promotion, shift, or checkout process you handled.",
  "Add verified evidence such as transaction volume, till accuracy, payment range, customer feedback, returns completed, queue time, loyalty enrollment, or training records.",
  "Remove any perfect accuracy, sales growth, cash amount, loss-prevention result, supervisor authority, customer rating, or improvement you cannot verify and appropriately disclose.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a cashier role include?",
    answer:
      "A recent and relevant cashier role commonly needs three to six focused bullets. Use fewer for older positions. Prioritize POS transactions, payment accuracy, customer service, returns, promotions, checkout operations, teamwork, and verified results that match the target job.",
  },
  {
    question: "What are good action verbs for a cashier resume?",
    answer:
      "Useful verbs include processed, handled, operated, scanned, balanced, reconciled, assisted, resolved, explained, verified, maintained, and supported. Choose verbs that accurately reflect the transactions and customer service you performed.",
  },
  {
    question: "Should every cashier bullet include a metric?",
    answer:
      "No. A strong bullet can describe payment types, POS tasks, returns, customer questions, store policies, promotions, security procedures, or teamwork. Use metrics when they are accurate and appropriate to disclose, but never invent transaction volume, drawer accuracy, sales, customer ratings, or money handled.",
  },
  {
    question: "Which cashier ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include POS systems, cash handling, payment processing, customer service, returns and exchanges, till balancing, transaction accuracy, loyalty programs, promotions, and loss prevention.",
  },
  {
    question: "What can I write on a cashier resume with no experience?",
    answer:
      "Use relevant evidence from school events, fundraising, volunteering, food service, hospitality, customer service, retail, inventory, or community activities. Show truthful examples of handling money, helping people, following procedures, basic math, reliability, communication, or learning a system without claiming paid cashier experience you do not have.",
  },
  {
    question: "How is a cashier different from a retail sales associate?",
    answer:
      "Cashiers focus primarily on checkout, payments, receipts, returns, and drawer procedures, while retail sales associates may spend more time helping customers select products, maintaining displays, and supporting the sales floor. Many roles combine both, so describe the duties you actually performed.",
  },
  {
    question: "Can I include exact cash amounts or drawer shortages?",
    answer:
      "Use only information you are authorized to disclose. A verified, non-sensitive range or approved transaction volume may show scope, but do not reveal register codes, security procedures, incident details, customer payment data, or restricted store information. Describe a variance factually and avoid implying blame or a resolution you did not own.",
  },
  {
    question: "Can I copy these cashier bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the checkout setting, POS, payment types, customer task, store procedure, scope, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function CashierResumeBulletsPage() {
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
        name: "Cashier Resume Bullet Examples",
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
              <span className="text-slate-300">Cashier Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Cashier Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Cashier Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe POS transactions, payment accuracy, customer service,
              returns, promotions, till balancing, checkout readiness, and
              teamwork with clear, ATS-friendly bullets. Adapt every claim to
              your real responsibilities and evidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Cashier Bullets
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
                Cashier ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented metrics
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
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
                Show transaction accuracy and service without invented claims
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + cashier task + payment, POS, customer,
                  or store context + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for working the cash register.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Processed customer purchases through the POS, confirmed
                      payment details, issued receipts, and escalated price or
                      authorization exceptions under store procedures.
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
                30 cashier resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect transactions and customer
                support you genuinely performed. Replace bracketed placeholders
                with verified, non-sensitive information from approved POS
                reports, till records, schedules, feedback, or reviews.
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
                Cashier resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only payment methods, systems,
                customer-service tasks, promotions, and responsibilities you
                can explain confidently.
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
                How to write cashier bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If reliable figures are unavailable, describe the POS tasks,
                payment methods, returns, customer questions, store policies,
                promotions, closing steps, and teamwork you handled. A specific
                truthful example is stronger than an invented transaction count,
                accuracy rate, customer score, or sales result.
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
                How to tailor these bullets to a cashier job
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
                  href="/guides/customer-service-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Customer Service Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review customer communication, complaint resolution, CRM,
                    follow-up, teamwork, and verified service examples.
                  </p>
                </Link>

                <Link
                  href="/guides/sales-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Sales Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review customer discovery, product presentations, closing,
                    account support, CRM, and verified sales examples.
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
                Turn your cashier experience into stronger bullets
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
                <a href="#formula-heading" className="block text-slate-400 hover:text-white">
                  Resume bullet formula
                </a>
                <a href="#examples-heading" className="block text-slate-400 hover:text-white">
                  30 bullet examples
                </a>
                <a href="#keywords-heading" className="block text-slate-400 hover:text-white">
                  ATS keywords
                </a>
                <a href="#without-metrics-heading" className="block text-slate-400 hover:text-white">
                  Examples without metrics
                </a>
                <a href="#tailoring-heading" className="block text-slate-400 hover:text-white">
                  Tailoring steps
                </a>
                <a href="#related-guides-heading" className="block text-slate-400 hover:text-white">
                  Related guides
                </a>
                <a href="#faq-heading" className="block text-slate-400 hover:text-white">
                  FAQ
                </a>
              </nav>
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <h2 className="font-bold text-emerald-200">Accuracy reminder</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use only transactions, systems, payment methods, customer tasks,
                cash-handling scope, metrics, and outcomes you can truthfully
                explain and appropriately disclose.
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

      <HumanAtsReviewCta source="cashier-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
