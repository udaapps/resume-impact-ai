import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://resume-impact-ai.vercel.app";
const PAGE_PATH = "/guides/customer-service-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:
    "Customer Service Resume Bullet Examples (25+) | Resume Impact AI",
  description:
    "Use 25+ customer service resume bullet examples, ATS keywords, writing formulas, and before-and-after examples to strengthen your resume.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title:
      "Customer Service Resume Bullet Examples (25+) | Resume Impact AI",
    description:
      "Practical customer service resume bullet examples, ATS keywords, and achievement-focused writing guidance.",
    url: PAGE_URL,
    siteName: "Resume Impact AI",
    type: "article",
  },
  twitter: {
    card: "summary",
    title:
      "Customer Service Resume Bullet Examples (25+)",
    description:
      "Build stronger, ATS-friendly customer service resume bullets with examples and practical guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const bulletGroups = [
  {
    title: "Customer support and communication",
    description:
      "Use these examples when your work focused on answering questions, solving problems, and communicating across support channels.",
    bullets: [
      "Resolved an average of [X] customer inquiries per day across phone, email, and live chat while maintaining a professional and helpful tone.",
      "Explained products, policies, billing details, and account procedures in clear language to help customers make informed decisions.",
      "Responded to customer questions within established service-level targets and documented each interaction accurately.",
      "Built positive customer relationships by listening carefully, confirming needs, and providing practical next steps.",
      "Followed up on unresolved cases to confirm completion and reduce repeat customer contacts.",
    ],
  },
  {
    title: "Complaint resolution and de-escalation",
    description:
      "Choose these when you handled frustrated customers, escalations, refunds, or sensitive service issues.",
    bullets: [
      "De-escalated customer complaints by identifying the main concern, explaining available options, and agreeing on a practical resolution.",
      "Investigated billing, delivery, and account issues and coordinated with internal teams to complete corrective actions.",
      "Processed eligible refunds, replacements, and account adjustments according to company policy.",
      "Escalated complex or high-risk cases with complete notes, supporting evidence, and a clear summary of previous actions.",
      "Recognized recurring complaint patterns and shared findings with supervisors to support service improvements.",
    ],
  },
  {
    title: "CRM, ticketing, and documentation",
    description:
      "These examples show accuracy, organization, and confidence with customer service systems.",
    bullets: [
      "Recorded customer conversations, actions, and outcomes in the CRM to maintain accurate and searchable case histories.",
      "Managed support tickets from initial contact through resolution while updating status, priority, and ownership.",
      "Categorized inquiries and applied consistent tags to improve reporting and route cases to the correct teams.",
      "Maintained customer records with accurate contact, order, and account information.",
      "Used saved responses and knowledge-base articles while adapting each reply to the customer’s specific situation.",
    ],
  },
  {
    title: "Teamwork, training, and process improvement",
    description:
      "Use these for senior customer service, team support, coaching, or improvement responsibilities.",
    bullets: [
      "Collaborated with sales, operations, finance, and technical teams to resolve customer issues that required cross-functional support.",
      "Trained new team members on service standards, CRM workflows, escalation procedures, and product knowledge.",
      "Created or updated internal support guides to improve consistency and reduce avoidable handling errors.",
      "Shared customer feedback with relevant teams to support product, policy, and workflow improvements.",
      "Supported team performance during high-volume periods by prioritizing urgent cases and assisting colleagues with complex inquiries.",
    ],
  },
  {
    title: "Achievement-focused bullets with metrics",
    description:
      "Replace every bracketed placeholder with a number you can verify. Never invent metrics.",
    bullets: [
      "Handled [X]+ customer contacts per day while maintaining a customer satisfaction score of [Y%].",
      "Reduced average response time by [X%] by improving ticket prioritization and using approved response templates.",
      "Achieved a first-contact resolution rate of [X%] by asking focused questions and completing accurate troubleshooting.",
      "Improved customer retention by [X%] through proactive follow-up and personalized resolution options.",
      "Maintained [X%] quality-assurance compliance across customer conversations, documentation, and policy procedures.",
    ],
  },
];

const keywordGroups = [
  {
    title: "Core customer service",
    items: [
      "customer support",
      "complaint resolution",
      "customer satisfaction",
      "customer retention",
      "relationship building",
      "product knowledge",
    ],
  },
  {
    title: "Channels and systems",
    items: [
      "phone support",
      "email support",
      "live chat",
      "CRM",
      "ticketing system",
      "knowledge base",
    ],
  },
  {
    title: "Performance and operations",
    items: [
      "first-contact resolution",
      "service-level agreement",
      "case documentation",
      "escalation management",
      "quality assurance",
      "response time",
    ],
  },
  {
    title: "Transferable skills",
    items: [
      "active listening",
      "de-escalation",
      "problem-solving",
      "written communication",
      "team collaboration",
      "attention to detail",
    ],
  },
];

const faqItems = [
  {
    question:
      "How many customer service bullet points should I include?",
    answer:
      "A recent and relevant role commonly needs three to six focused bullets. Use fewer for older or less relevant positions. Prioritize achievements, complexity, and evidence over a long list of routine duties.",
  },
  {
    question:
      "Should every resume bullet include a number?",
    answer:
      "No. Metrics are useful when they are accurate and meaningful, but a strong bullet can also describe scope, difficulty, systems used, collaboration, or the result of your work.",
  },
  {
    question:
      "Which ATS keywords should I add?",
    answer:
      "Use terms that appear in the target job description and truthfully match your experience. Common examples include CRM, ticketing systems, complaint resolution, customer satisfaction, escalation management, live chat, and first-contact resolution.",
  },
  {
    question:
      "Can I copy these bullets exactly?",
    answer:
      "Treat them as adaptable examples. Change the channel, task, tools, scope, and result so each bullet accurately represents your own work. Replace bracketed placeholders only with verified information.",
  },
  {
    question:
      "What should an entry-level candidate write?",
    answer:
      "Focus on communication, reliability, customer-facing experience, teamwork, problem-solving, handling payments or orders, and learning products or procedures quickly. Relevant volunteer, retail, hospitality, and internship experience can also support a customer service application.",
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

export default function CustomerServiceResumeBulletsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Customer Service Resume Bullet Examples (25+)",
    description:
      "Customer service resume bullet examples, ATS keywords, writing formulas, and practical customization guidance.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    mainEntityOfPage: PAGE_URL,
    author: {
      "@type": "Organization",
      name: "Resume Impact AI",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Resume Impact AI",
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
        name: "Customer Service Resume Bullet Examples",
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
            Resume Impact AI
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
                Customer Service Bullets
              </span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Customer Service Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Customer Service Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Use these 25 achievement-focused examples to describe
              customer support, complaint resolution, CRM work,
              teamwork, and measurable service results. Adapt every
              bullet to match your real experience and target job.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Customer Service Bullets
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
                25 examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                ATS keyword guidance
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented claims
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Published{" "}
              <time dateTime="2026-08-02">August 2, 2026</time>
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
                Build each bullet around action, scope, and result
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + customer service task + scope or
                  tool + accurate result
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for helping customers.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Resolved customer inquiries across phone and email,
                      documented each case in the CRM, and followed up on
                      unresolved account issues.
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
                25 customer service resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Select only the examples that reflect work you actually
                performed. Replace bracketed placeholders with verified
                figures from reports, schedules, quality reviews, or
                performance records.
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
                Customer service resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job
                description with your experience, then use the terms
                that accurately describe your skills, tools, and
                responsibilities.
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

            <section aria-labelledby="tailoring-heading">
              <h2
                id="tailoring-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to tailor the bullets to a job description
              </h2>

              <ol className="mt-7 space-y-4">
                {[
                  "Read the job description and mark repeated duties, systems, channels, and performance measures.",
                  "Choose examples that match responsibilities you genuinely handled.",
                  "Replace general wording with the exact tool or channel you used, such as Salesforce, Zendesk, phone, email, or live chat.",
                  "Add verified scope when available, such as daily case volume, satisfaction score, response time, or first-contact resolution.",
                  "Remove any claim you cannot explain confidently during an interview.",
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
                Turn your real experience into stronger bullets
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Add your job title, responsibility, achievement, and
                verified metric to generate three tailored bullet
                options. Review every result before using it.
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
                  25 bullet examples
                </a>
                <a
                  href="#keywords-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS keywords
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
                Use only truthful responsibilities, tools,
                achievements, and metrics. Strong wording should improve
                presentation—not create experience you do not have.
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
          </aside>
        </div>
      </article>

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-500">
        © 2026 Resume Impact AI. Examples are educational and must be
        adapted to accurately reflect your experience.
      </footer>
    </main>
  );
}
