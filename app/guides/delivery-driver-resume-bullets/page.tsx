import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/delivery-driver-resume-bullets";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "30 Delivery Driver Resume Bullet Examples";
const PAGE_DESCRIPTION =
  "Use 30 delivery driver resume bullet examples for routes, inspections, loading, proof of delivery, customer service, safety, and verified results.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "delivery driver resume bullet examples",
    "delivery driver resume bullets",
    "delivery driver duties for resume",
    "delivery driver resume achievements",
    "delivery driver resume keywords",
    "courier resume bullet examples",
    "ATS delivery driver resume",
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
        alt: "Delivery driver resume bullet examples",
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
    title: "Route planning, navigation, and dispatch",
    description:
      "Use these examples when you reviewed assigned stops, followed approved routes, used navigation tools, or communicated with dispatch.",
    bullets: [
      "Reviewed assigned delivery stops, service windows, package instructions, vehicle limits, and route updates before departure.",
      "Used approved GPS, maps, route applications, and written directions to navigate delivery areas and locate authorized destinations.",
      "Adjusted the delivery sequence for approved traffic, weather, access, or customer constraints and communicated material changes to dispatch.",
      "Provided accurate status updates to dispatch regarding departures, arrivals, delays, unsuccessful stops, and required support.",
      "Followed established traffic and transportation procedures while completing assigned local or regional delivery routes.",
    ],
  },
  {
    title: "Vehicle inspection and safe operation",
    description:
      "Choose these examples when you completed authorized vehicle checks, reported defects, maintained supplies, or followed safe-driving procedures.",
    bullets: [
      "Completed assigned pre-trip and post-trip checks covering vehicle condition, tires, lights, fluids, mirrors, safety equipment, and visible defects.",
      "Reported mechanical problems, warning indicators, damage, or unsafe operating conditions to the responsible fleet or maintenance contact.",
      "Operated the authorized vehicle within license, weight, road, parking, speed, and company-policy requirements.",
      "Maintained approved vehicle cleanliness, fuel or charge levels, delivery equipment, and required supplies for scheduled routes.",
      "Applied defensive-driving and safe-parking practices while accounting for traffic, pedestrians, cyclists, loading areas, and weather conditions.",
    ],
  },
  {
    title: "Loading, cargo handling, and inventory checks",
    description:
      "Select these examples when you verified loads, handled packages, organized cargo, or completed authorized loading and unloading work.",
    bullets: [
      "Verified assigned packages or goods against manifests, shipping papers, labels, quantities, and destination information before departure.",
      "Loaded and organized deliveries according to route sequence, item requirements, vehicle capacity, and approved cargo-handling procedures.",
      "Secured authorized cargo and delivery equipment to reduce movement, damage, loss, and safety risks during transport.",
      "Handled fragile, perishable, temperature-sensitive, oversized, or restricted items only under applicable training and procedures.",
      "Unloaded and transferred deliveries using approved lifting, carrying, cart, hand-truck, or site-access practices.",
    ],
  },
  {
    title: "Delivery confirmation and customer service",
    description:
      "Use these examples when you confirmed recipients, captured proof of delivery, communicated with customers, or followed handoff instructions.",
    bullets: [
      "Confirmed the authorized recipient, destination, item count, and delivery instructions before completing each handoff.",
      "Captured required signatures, photographs, scans, timestamps, receipts, or delivery notes using the approved proof-of-delivery process.",
      "Communicated courteously with customers about arrival, access, placement, payment, return, or delivery questions within assigned authority.",
      "Protected customer addresses, contact details, access instructions, order information, and delivery records from unauthorized disclosure.",
      "Reported damaged, missing, refused, inaccessible, or incorrectly addressed deliveries and followed the assigned exception procedure.",
    ],
  },
  {
    title: "Records, returns, payments, and team support",
    description:
      "Choose these examples when you maintained delivery records, processed authorized returns or payments, supported the warehouse, or completed route closeout.",
    bullets: [
      "Maintained accurate route, mileage, stop, delivery, exception, payment, fuel, and vehicle records required for the assigned role.",
      "Collected authorized delivery payments and issued required receipts using approved cash, card, mobile, or account procedures.",
      "Returned undelivered, refused, damaged, reusable, or collected items with complete status details and supporting documentation.",
      "Coordinated route handoffs, loading questions, schedule changes, and unresolved deliveries with dispatch, warehouse staff, and supervisors.",
      "Completed end-of-route closeout by returning equipment, documents, payments, undelivered items, and vehicle information through assigned controls.",
    ],
  },
  {
    title: "Achievement-focused bullets with verified metrics",
    description:
      "Replace every bracketed placeholder only with information you can verify and appropriately disclose from route logs, delivery systems, vehicle records, customer feedback, or performance reviews.",
    bullets: [
      "Completed an average of [X] verified deliveries per [shift/day] across [approved route, area, or stop type].",
      "Maintained a verified on-time delivery rate of [X%] across [approved period or delivery volume].",
      "Drove [X] verified miles during [period] while meeting the documented [safety, inspection, or compliance measure].",
      "Reduced the verified [route time, mileage, fuel use, failed-stop, damage, or delivery-error measure] from [X] to [Y] after applying [supported action].",
      "Received a verified [customer rating, proof-of-delivery accuracy, or completion measure] of [X] across [approved period or delivery volume].",
    ],
  },
] as const;

const keywordGroups = [
  {
    title: "Routes and driving",
    items: [
      "route planning",
      "GPS navigation",
      "local deliveries",
      "dispatch communication",
      "time management",
      "traffic laws",
    ],
  },
  {
    title: "Vehicle and safety",
    items: [
      "pre-trip inspection",
      "vehicle inspection",
      "defensive driving",
      "safety procedures",
      "maintenance reporting",
      "clean driving record",
    ],
  },
  {
    title: "Cargo and delivery",
    items: [
      "loading and unloading",
      "cargo securement",
      "package handling",
      "shipping documents",
      "proof of delivery",
      "inventory verification",
    ],
  },
  {
    title: "Systems and customer support",
    items: [
      "customer service",
      "delivery tracking",
      "handheld scanners",
      "mobile delivery apps",
      "returns processing",
      "payment collection",
    ],
  },
] as const;

const tailoringSteps = [
  "Read the target job description and mark its vehicle type, license requirement, route area, goods, delivery volume, physical work, inspections, customer handoffs, systems, payments, and schedule.",
  "Choose only examples that match vehicles, routes, cargo, equipment, customer contact, payments, records, and safety responsibilities you genuinely handled.",
  "Replace general wording with the real vehicle, route type, navigation tool, package or product, scanner, delivery process, customer setting, and dispatch system you used.",
  "Add verified evidence such as stops, deliveries, miles, on-time rate, proof-of-delivery accuracy, customer feedback, route time, fuel use, or damage records.",
  "Remove any CDL, endorsement, clean record, accident-free mileage, hazardous-material work, forklift use, perfect delivery rate, or improvement you cannot verify and appropriately disclose.",
] as const;

const faqItems = [
  {
    question: "How many bullets should a delivery driver role include?",
    answer:
      "A recent and relevant delivery driver role commonly needs four to six focused bullets. Use fewer for older positions. Prioritize vehicle type, routes, inspections, loading, delivery confirmation, customer service, records, safety, and verified results that match the target job.",
  },
  {
    question: "What are good action verbs for a delivery driver resume?",
    answer:
      "Useful verbs include delivered, transported, navigated, inspected, loaded, unloaded, verified, secured, documented, communicated, collected, and reported. Choose verbs that accurately reflect your responsibility and the work you performed.",
  },
  {
    question: "Should every delivery driver bullet include a metric?",
    answer:
      "No. A strong bullet can describe the vehicle, route, cargo, inspection, delivery system, customer handoff, exception process, or safety responsibility. Use metrics when accurate and appropriate to disclose, but never invent deliveries, miles, on-time rates, accident-free records, fuel savings, or customer ratings.",
  },
  {
    question: "Which delivery driver ATS keywords should I use?",
    answer:
      "Use terms from the target job description that truthfully match your work. Common examples include route planning, GPS navigation, vehicle inspection, defensive driving, dispatch communication, loading and unloading, proof of delivery, delivery tracking, customer service, and handheld scanners.",
  },
  {
    question: "Can gig, volunteer, or personal delivery work count as experience?",
    answer:
      "Yes, when described accurately. Gig, volunteer, community, meal, pharmacy, retail, or small-business delivery work can show navigation, reliability, customer communication, package handling, and record keeping. Identify the arrangement truthfully and do not present independent or unpaid work as employment by a company.",
  },
  {
    question: "Do I need a CDL for a delivery driver resume?",
    answer:
      "Not every delivery role requires a commercial driver’s license. Requirements depend on the vehicle, weight, cargo, employer, and jurisdiction. List the exact current license, class, and endorsements you hold only when accurate, and compare them with the target job’s stated requirements.",
  },
  {
    question: "Can I claim a clean driving record or accident-free miles?",
    answer:
      "Only when the claim is accurate, supported for the stated period, and appropriate to disclose. Do not convert a lack of known incidents into a lifetime clean record, and do not invent an accident-free mileage estimate. Use the exact verified scope or omit the claim.",
  },
  {
    question: "Can I copy these delivery driver bullets exactly?",
    answer:
      "Use them as adaptable writing models. Change the vehicle, route, goods, tools, customer setting, delivery process, scope, and outcome so every statement reflects your real work. Replace bracketed placeholders only with verified and appropriately disclosed information.",
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

export default function DeliveryDriverResumeBulletsPage() {
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
        name: "Delivery Driver Resume Bullet Examples",
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
              <span className="text-slate-300">Delivery Driver Bullets</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Delivery Driver Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              30 Delivery Driver Resume Bullet Examples
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Describe routes, vehicle inspections, loading, cargo handling,
              proof of delivery, customer service, safety, and route closeout
              with clear, ATS-friendly bullets. Adapt every claim to your real
              license, responsibilities, and evidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-bullet-generator#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Delivery Driver Bullets
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
                Delivery driver ATS keywords
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No invented safety record
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
                Show safe, reliable delivery work without invented claims
              </h2>

              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="text-xl font-semibold text-blue-200">
                  Strong action verb + delivery task + vehicle, route, cargo,
                  customer, or system context + accurate outcome
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                      Weak
                    </p>
                    <p className="mt-3 leading-7 text-slate-300">
                      Responsible for delivering packages to customers.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                      Stronger
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      Completed assigned delivery routes using approved
                      navigation tools, confirmed each customer handoff, and
                      recorded proof of delivery through the mobile system.
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
                30 delivery driver resume bullet examples
              </h2>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Choose only examples that reflect vehicles, routes, goods,
                systems, and customer handoffs you genuinely handled. Replace
                bracketed placeholders with verified, non-sensitive information
                from route logs, delivery systems, vehicle records, or reviews.
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
                Delivery driver resume keywords
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Do not add every keyword. Compare the target job description
                with your real experience and use only vehicle, route, license,
                safety, cargo, customer-service, and system terms you can explain
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
                How to write delivery driver bullets without metrics
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                If reliable figures are unavailable, describe the vehicle, route
                type, navigation tools, inspections, goods, loading process,
                customer handoff, records, and exceptions you handled. A
                specific truthful example is stronger than invented miles,
                delivery counts, on-time rates, or safety claims.
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
                How to tailor these bullets to a delivery driver job
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
                  href="/guides/warehouse-worker-resume-bullets"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Warehouse Worker Resume Bullets
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Review picking, packing, shipping, receiving, inventory,
                    safety, equipment, quality, and verified results.
                  </p>
                </Link>

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
                Turn your delivery experience into stronger bullets
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
                Use only vehicles, licenses, routes, cargo, systems, safety
                records, metrics, and outcomes you can truthfully explain and
                appropriately disclose.
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

      <HumanAtsReviewCta source="delivery-driver-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Examples are educational and must be adapted to
        accurately reflect your experience.
      </footer>
    </main>
  );
}
