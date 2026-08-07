import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/sales-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Sales Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 sales resume bullet examples, ATS keywords, and writing tips for prospecting, closing, revenue, account growth, CRM, and customer retention.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "sales resume bullet examples",
    "sales resume bullets",
    "sales representative resume examples",
    "sales resume achievements",
    "sales resume keywords",
    "ATS sales resume",
    "sales action verbs",
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
        alt: "Sales resume bullet examples",
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
    title: "Lead generation and prospecting",
    description:
      "Use these examples when you researched prospects, created outreach, qualified leads, or developed a sales territory.",
    bullets: [
      "Researched target accounts, industries, and decision-makers to build focused prospect lists for outbound outreach.",
      "Generated new sales conversations through phone, email, social outreach, referrals, events, and follow-up campaigns.",
      "Qualified inbound and outbound leads by confirming business needs, priorities, timing, and the appropriate next step.",
      "Developed a territory plan that prioritized high-potential accounts, existing opportunities, and time-sensitive follow-ups.",
      "Personalized outreach around each prospect's likely challenges instead of relying on a single generic sales message.",
    ],
  },
  {
    title: "Discovery, presentations, and solution selling",
    description:
      "Choose these examples when you assessed customer needs, presented solutions, created proposals, or handled objections.",
    bullets: [
      "Conducted discovery conversations to understand customer goals, pain points, current processes, and decision criteria.",
      "Delivered product demonstrations and sales presentations tailored to the audience's priorities, questions, and use cases.",
      "Translated customer requirements into clear solution recommendations while setting accurate expectations about capabilities.",
      "Prepared proposals that summarized customer needs, recommended options, pricing, implementation considerations, and next steps.",
      "Addressed objections by clarifying concerns, providing relevant evidence, and agreeing on a practical path forward.",
    ],
  },
  {
    title: "Negotiation, closing, and revenue",
    description:
      "Use these bullets to describe opportunity management, commercial discussions, closing work, and revenue responsibility.",
    bullets: [
      "Managed opportunities from initial qualification through proposal, negotiation, approval, and signed agreement.",
      "Negotiated pricing, terms, and implementation expectations within approved commercial guidelines and margin requirements.",
      "Coordinated with finance, legal, operations, and delivery teams to resolve contract questions before closing.",
      "Re-engaged stalled opportunities with relevant updates, revised options, and clear next-step commitments.",
      "Maintained consistent follow-up throughout the sales cycle while respecting customer timelines and decision processes.",
    ],
  },
  {
    title: "Account management, retention, and growth",
    description:
      "Select these examples when you managed customer relationships, renewals, retention risks, upselling, or account expansion.",
    bullets: [
      "Built long-term customer relationships through regular communication, reliable follow-up, and a clear understanding of account goals.",
      "Conducted account reviews to discuss adoption, outcomes, open concerns, upcoming priorities, and growth opportunities.",
      "Identified retention risks early and coordinated with support, operations, and product teams to address customer concerns.",
      "Recommended relevant upsell and cross-sell options based on demonstrated customer needs rather than unsupported assumptions.",
      "Coordinated post-sale handoffs so implementation and service teams received complete customer requirements and commitments.",
    ],
  },
  {
    title: "CRM, pipeline, and cross-functional sales work",
    description:
      "Use these examples to show accurate CRM use, forecasting, pipeline discipline, and collaboration with other business teams.",
    bullets: [
      "Maintained accurate CRM records with current contact details, activities, opportunity stages, values, risks, and next actions.",
      "Reviewed pipeline health regularly and prioritized opportunities based on qualification, customer engagement, and realistic timing.",
      "Prepared sales forecasts using current opportunity evidence and clearly identified assumptions that could affect closing dates.",
      "Collaborated with marketing on lead quality, campaign follow-up, customer segments, and messaging feedback from sales conversations.",
      "Shared recurring customer questions and competitive insights with product, marketing, and leadership teams.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with a figure you can verify from CRM reports, commission statements, approved dashboards, or performance reviews.",
    bullets: [
      "Achieved [X%] of annual sales quota by closing [$Y] in new and expansion revenue across [Z] customer accounts.",
      "Grew territory revenue by [X%] by prioritizing high-potential prospects and expanding relationships with existing customers.",
      "Generated [$X] in qualified pipeline through targeted outreach, referrals, events, and timely inbound-lead follow-up.",
      "Improved opportunity win rate from [X%] to [Y%] by strengthening discovery, qualification, and proposal alignment.",
      "Maintained a customer retention rate of [X%] while identifying [$Y] in verified renewal and account-growth opportunities.",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Prospecting and acquisition",
    items: [
      "lead generation",
      "prospecting",
      "cold calling",
      "outbound sales",
      "lead qualification",
      "territory management",
    ],
  },
  {
    title: "Sales cycle and communication",
    items: [
      "needs analysis",
      "solution selling",
      "product demonstrations",
      "proposal development",
      "negotiation",
      "closing",
    ],
  },
  {
    title: "CRM and pipeline",
    items: [
      "CRM",
      "Salesforce",
      "HubSpot",
      "pipeline management",
      "sales forecasting",
      "opportunity management",
    ],
  },
  {
    title: "Performance and account growth",
    items: [
      "quota attainment",
      "revenue growth",
      "account management",
      "customer retention",
      "upselling",
      "cross-selling",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark repeated customer types, sales channels, products, tools, and performance expectations.",
  "Select examples that match sales work you genuinely performed and the level of commercial responsibility you actually held.",
  "Replace general language with the real product, market, territory, customer segment, sales motion, or CRM you used.",
  "Add verified results such as quota attainment, revenue, pipeline, conversion, retention, deal size, or account growth when available.",
  "Remove any product knowledge, sales result, customer ownership, tool, or revenue claim you could not explain confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "How many sales bullet points should I include per role?",
    answer:
      "A recent and relevant sales role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize sales activity, customer complexity, commercial responsibility, and verified outcomes that match the target job.",
  },
  {
    question: "What are good action verbs for a sales resume?",
    answer:
      "Useful verbs include generated, qualified, prospected, presented, negotiated, closed, achieved, expanded, retained, converted, forecasted, and exceeded. Choose verbs that accurately describe what you did.",
  },
  {
    question: "Should every sales resume bullet include a number?",
    answer:
      "No. Accurate metrics are especially useful in sales, but a strong bullet can also show customer type, sales-cycle complexity, product knowledge, territory responsibility, negotiation, collaboration, or account ownership. Never invent revenue or quota results.",
  },
  {
    question: "Which sales ATS keywords should I use?",
    answer:
      "Use keywords from the target job description that truthfully match your experience. Common examples include lead generation, prospecting, CRM, pipeline management, sales forecasting, account management, negotiation, closing, customer retention, Salesforce, and HubSpot.",
  },
  {
    question: "What can an entry-level sales candidate write?",
    answer:
      "Focus on customer communication, product explanation, outreach, lead follow-up, appointment setting, handling objections, CRM updates, teamwork, and reliable follow-through. Retail, hospitality, fundraising, customer service, internship, and volunteer experience may provide relevant evidence.",
  },
  {
    question: "Can I copy these sales bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the customer, product, channel, responsibility, tool, scope, and outcome so each statement reflects your real experience. Replace bracketed placeholders only with verified information.",
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

export default function SalesResumeBulletsPage() {
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
        name: "Sales Resume Bullet Examples",
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
              <span className="text-slate-300">Sales Resume Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Sales Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Sales Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe prospecting, discovery, presentations, negotiation,
              closing, account growth, CRM work, and verified sales results with
              clear, ATS-friendly bullets tailored to your actual experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Sales Resume Bullets
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
                Sales ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented revenue
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
                Build each bullet around sales action, scope, and outcome
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + sales responsibility + customer or method
                  + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for selling products to customers.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Qualified customer needs, presented relevant product
                      options, addressed objections, and maintained timely
                      follow-up throughout the sales process.
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
                30 sales resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect work you actually performed.
                Replace bracketed placeholders with figures you can verify from
                CRM reports, approved dashboards, commission statements, or
                performance reviews.
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
                Sales resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target sales job with your
                experience and use only terms that accurately describe your
                customers, channels, tools, responsibilities, and results.
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
                How to write sales bullets without revenue numbers
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If you cannot verify quota, revenue, pipeline, or conversion
                figures, describe the customer segment, territory, sales
                channel, product complexity, sales-cycle stage, account
                ownership, or problem you helped resolve. A truthful specific
                bullet is stronger than an invented number.
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
                How to tailor these bullets to a sales job
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
                    Adapt customer communication, complaint resolution, CRM,
                    retention, and service-quality examples.
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
                    Review stakeholder communication, planning, risk, commercial
                    coordination, and leadership examples.
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
                Turn your real sales experience into stronger bullets
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
                  Bullets without metrics
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
                Use only truthful customers, products, tools, territories,
                revenue, quota results, and achievements. Strong wording must
                not create sales experience you did not have.
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

      <HumanAtsReviewCta source="sales-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
