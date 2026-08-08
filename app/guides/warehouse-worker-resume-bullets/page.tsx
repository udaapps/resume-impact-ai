import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/warehouse-worker-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Warehouse Worker Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 warehouse worker resume bullet examples for picking, packing, shipping, receiving, inventory, safety, equipment, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "warehouse worker resume bullet examples",
    "warehouse resume bullets",
    "warehouse associate resume bullets",
    "warehouse duties for resume",
    "warehouse resume achievements",
    "warehouse resume keywords",
    "ATS warehouse resume",
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
        alt: "Warehouse worker resume bullet examples",
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
    title: "Order picking and fulfillment",
    description:
      "Use these examples when you picked products, checked quantities, used pick lists or scanners, and staged completed orders.",
    bullets: [
      "Picked products from assigned storage locations using approved pick lists or scanning procedures and verified item and quantity details before staging.",
      "Checked product codes, descriptions, lot details, and order quantities and reported discrepancies before completing each pick.",
      "Organized picked items by order, route, customer, or dispatch schedule to support accurate handoff to packing and shipping teams.",
      "Replenished approved pick locations from reserve stock and recorded movements through the assigned inventory process.",
      "Prioritized urgent, scheduled, and standard orders according to supervisor instructions and established fulfillment cutoffs.",
    ],
  },
  {
    title: "Packing, labeling, and shipping",
    description:
      "Choose these examples when you packed orders, applied labels, prepared pallets, checked documents, or supported outbound shipments.",
    bullets: [
      "Inspected picked items for visible damage and order accuracy before packing them with the approved materials and protection method.",
      "Applied shipping labels and handling marks and checked destination details against the available order documents before dispatch.",
      "Prepared cartons, totes, or pallets for outbound movement and kept completed orders separated by route, carrier, or loading area.",
      "Recorded packed quantities and shipment status in the assigned system and escalated missing, damaged, or mismatched items.",
      "Supported carrier and loading handoffs by organizing completed shipments and providing the required labels, counts, and documents.",
    ],
  },
  {
    title: "Receiving, putaway, and inventory",
    description:
      "Select these examples when you received deliveries, checked incoming goods, stored inventory, completed counts, or investigated stock differences.",
    bullets: [
      "Received incoming goods and compared available item, quantity, and condition details with purchase orders, packing lists, or receiving documents.",
      "Reported shortages, overages, damage, and labeling differences through the approved receiving and escalation process.",
      "Placed accepted stock in assigned storage locations and recorded putaway movements using the workplace inventory procedure.",
      "Completed scheduled cycle counts and documented differences for review instead of changing inventory records without authorization.",
      "Maintained clear product labels and storage locations to support accurate picking, stock visibility, and orderly inventory movement.",
    ],
  },
  {
    title: "Safety, equipment, and warehouse organization",
    description:
      "Use these examples only for safety practices and equipment you were trained and authorized to perform.",
    bullets: [
      "Followed approved personal protective equipment, lifting, traffic, and material-handling procedures during assigned warehouse tasks.",
      "Completed required pre-use checks for authorized equipment and reported damage, faults, or unsafe conditions before operation.",
      "Kept aisles, exits, workstations, and staging areas clear and returned tools and materials to designated locations after use.",
      "Separated damaged, leaking, rejected, or unidentified items and notified the responsible person according to workplace procedure.",
      "Operated only the material-handling equipment covered by current workplace training, authorization, and applicable certification requirements.",
    ],
  },
  {
    title: "Quality, teamwork, and process support",
    description:
      "Choose these examples when you completed quality checks, coordinated handoffs, supported busy periods, or helped improve daily workflows.",
    bullets: [
      "Completed assigned quality checks at picking, packing, receiving, or dispatch stages and recorded exceptions for correction.",
      "Coordinated with receiving, inventory, packing, shipping, and customer-service teams to resolve order and stock questions.",
      "Communicated incomplete orders, location problems, equipment issues, and shipment delays during shift handoffs.",
      "Supported peak workloads by moving between trained warehouse tasks while maintaining required safety and quality procedures.",
      "Shared recurring error or workflow observations with supervisors and followed approved process changes after instruction or training.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with data you can verify from WMS reports, count records, quality checks, schedules, or performance reviews.",
    bullets: [
      "Picked an average of [X]+ order lines per [shift/day] while maintaining a verified accuracy rate of [Y%].",
      "Packed [X]+ orders per [shift/week] and met the documented [quality, damage, or dispatch measure] of [Y].",
      "Processed [X]+ inbound or outbound shipments per [week/month] with [Y%] verified document or inventory accuracy.",
      "Reduced picking, packing, or labeling errors by [X%] after applying [verified check, layout, or workflow change].",
      "Completed [X]+ scheduled inventory counts with a verified record accuracy of [Y%] during [approved period].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Picking and fulfillment",
    items: [
      "order picking",
      "pick and pack",
      "order fulfillment",
      "RF scanner",
      "product verification",
      "order staging",
    ],
  },
  {
    title: "Inventory and systems",
    items: [
      "inventory control",
      "cycle counting",
      "stock replenishment",
      "putaway",
      "WMS",
      "inventory accuracy",
    ],
  },
  {
    title: "Shipping and receiving",
    items: [
      "shipping and receiving",
      "loading and unloading",
      "packing",
      "labeling",
      "palletizing",
      "shipment documentation",
    ],
  },
  {
    title: "Safety and equipment",
    items: [
      "safety procedures",
      "PPE",
      "material handling",
      "pallet jack",
      "forklift operation",
      "quality control",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark the products, warehouse tasks, shift requirements, systems, equipment, safety rules, and performance measures it names.",
  "Choose only examples that match work you genuinely performed and equipment you were trained and authorized to use.",
  "Replace general wording with the real product type, order process, scanner, WMS, document, storage method, handoff, or team you supported.",
  "Add verified evidence such as order lines, shipments, units, accuracy, damage rate, inventory differences, turnaround time, or approved safety measures.",
  "Remove any equipment, certification, hazardous-material responsibility, team leadership, volume, accuracy rate, or improvement you could not explain confidently in an interview.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a warehouse role include?",
    answer:
      "A recent and relevant warehouse role commonly needs three to six focused bullets. Use fewer for older positions. Prioritize order fulfillment, inventory, shipping or receiving, safety, equipment you were authorized to use, and verified results that match the target job.",
  },
  {
    question: "What are good action verbs for a warehouse resume?",
    answer:
      "Useful verbs include picked, packed, received, inspected, verified, labeled, staged, loaded, replenished, counted, recorded, organized, and coordinated. Choose verbs that accurately describe your responsibilities and authority.",
  },
  {
    question: "Should every warehouse resume bullet include a metric?",
    answer:
      "No. A strong bullet can describe the product, workflow, system, equipment, safety procedure, quality check, shift handoff, or responsibility you handled. Use numbers when they are accurate and meaningful, but never invent order volumes, accuracy rates, time savings, or safety records.",
  },
  {
    question: "Which warehouse ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include order picking, packing, shipping and receiving, inventory control, cycle counting, RF scanner, WMS, putaway, palletizing, material handling, safety procedures, and quality control.",
  },
  {
    question: "What can I write for a warehouse resume with no experience?",
    answer:
      "Use transferable evidence from retail stockrooms, delivery support, manufacturing, moving, volunteering, school projects, or other physical and organized work. Focus on reliability, following instructions, checking quantities, organizing items, teamwork, safety, and accurate records without presenting unpaid practice as warehouse employment.",
  },
  {
    question: "Can I list forklift operation without certification?",
    answer:
      "List forklift operation only when you genuinely operated the equipment and can accurately state your training, workplace authorization, and any certification required for the target role or location. Do not imply current certification from observation, limited practice, or unrelated equipment experience.",
  },
  {
    question: "Is a warehouse worker different from a warehouse associate?",
    answer:
      "Employers often use the titles interchangeably, but the duties can vary. One role may focus on picking and packing while another includes receiving, inventory, equipment, or shipping. Use the title and responsibilities that accurately match your employment record and the target job.",
  },
  {
    question: "Can I copy these warehouse bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the product, task, system, equipment, scope, shift context, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified information.",
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

export default function WarehouseWorkerResumeBulletsPage() {
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
        name: "Warehouse Worker Resume Bullet Examples",
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
              <span className="text-slate-300">Warehouse Worker Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Warehouse Worker Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Warehouse Worker Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe picking, packing, shipping, receiving, inventory,
              safety, equipment, quality, and warehouse teamwork with clear,
              ATS-friendly bullets. Use examples with or without metrics and
              adapt every claim to your real work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Warehouse Bullets
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
                Warehouse ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented credentials
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
                Show warehouse responsibility with specific, truthful evidence
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + warehouse task + product, system, or
                  scope + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for picking and packing orders.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Picked products using approved scanning procedures,
                      verified item and quantity details, and staged completed
                      orders for packing.
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
                30 warehouse worker and associate resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect warehouse work you performed.
                Replace bracketed placeholders with verified information from
                WMS reports, count records, quality checks, schedules, or
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
                Warehouse worker resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only tasks, systems,
                equipment, training, and procedures you can explain
                confidently.
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
                How to write warehouse bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If you do not have reliable order, shipment, inventory,
                accuracy, or time figures, describe the products handled,
                workflow stage, system used, quality check, safety procedure,
                shift handoff, and responsibility you held. A specific truthful
                example is stronger than an invented number.
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
                How to tailor these bullets to a warehouse job
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
                    Review communication, issue handling, records, follow-up,
                    teamwork, and service-result examples for transferable
                    experience.
                  </p>
                </Link>

                <Link
                  href="/guides/administrative-assistant-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Administrative Assistant Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review document, record, data-entry, purchasing,
                    coordination, and team-support examples.
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
                Turn your warehouse experience into stronger resume bullets
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
                  Examples without metrics
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
                Use only tasks, products, systems, equipment, training,
                authorizations, volumes, metrics, and outcomes you can
                truthfully explain. Do not claim a license or certification you
                do not hold.
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

      <HumanAtsReviewCta source="warehouse-worker-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
