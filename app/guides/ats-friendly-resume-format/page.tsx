import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/ats-friendly-resume-format";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "ATS-Friendly Resume Format: Guide and Checklist";
const PAGE_DESCRIPTION =
  "Build an ATS-friendly resume format with a safe layout, clear sections, PDF and DOCX guidance, parsing tests, practical examples, and a final checklist.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "ATS friendly resume format",
    "ATS resume format",
    "best resume format for ATS",
    "ATS friendly resume template",
    "ATS resume formatting",
    "can ATS read PDF",
    "resume parsing test",
    "ATS resume checklist",
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
        alt: "ATS-friendly resume format guide and checklist",
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

const formatLayers = [
  {
    title: "Parseable structure",
    description:
      "The document should expose readable text in a predictable order so contact details, employers, dates, education, skills, and bullets can be extracted without relying on images or decorative positioning.",
  },
  {
    title: "Relevant content",
    description:
      "A clean layout cannot replace role alignment. Use job-description terminology only where it truthfully matches your experience, tools, projects, education, or credentials.",
  },
  {
    title: "Human readability",
    description:
      "A recruiter may review the original file, extracted fields, or both. Clear hierarchy, concise bullets, consistent dates, and enough white space still matter after parsing.",
  },
] as const;

const safestBaseline = [
  {
    title: "Use one clear reading order",
    description:
      "A straightforward single-column body is the safest baseline when you do not know which parser or application workflow the employer uses.",
  },
  {
    title: "Keep contact details in the document body",
    description:
      "Place your name, location, phone, email, and relevant profile link near the top of the main document instead of relying on a header, footer, image, or text box.",
  },
  {
    title: "Use standard section headings",
    description:
      "Choose recognizable labels such as Professional Summary, Skills, Work Experience, Projects, Education, and Certifications.",
  },
  {
    title: "Choose a common readable font",
    description:
      "Use a professional font such as Arial, Calibri, Aptos, Times New Roman, Georgia, or Helvetica at a comfortable size with consistent styling.",
  },
  {
    title: "Write dates consistently",
    description:
      "Use one clear pattern such as “January 2023 – Present” or “01/2023 – Present” throughout the document. Do not alternate between several formats.",
  },
  {
    title: "Use ordinary text and bullets",
    description:
      "Prefer standard text, familiar punctuation, and simple bullet characters. Do not use an icon as the only label for a phone number, email, skill, or section.",
  },
  {
    title: "Keep important evidence as text",
    description:
      "Job titles, employers, skills, achievements, certifications, and metrics should be typed text—not content embedded inside a logo, chart, screenshot, or image.",
  },
  {
    title: "Follow the employer's upload instructions",
    description:
      "If the application requests a particular file type, filename pattern, page limit, or field entry, that instruction takes priority over generic resume advice.",
  },
] as const;

const safetyMatrix = [
  {
    label: "Safest baseline",
    symbol: "✓",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    summary:
      "Simple elements that support a predictable reading order and remain easy for a person to review.",
    items: [
      "Single-column main content",
      "Standard section headings",
      "Common readable fonts",
      "Consistent Month Year or MM/YYYY dates",
      "Text-based contact details",
      "Simple bullet lists",
      "Clearly named PDF or DOCX file",
    ],
  },
  {
    label: "Depends—test carefully",
    symbol: "≈",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    summary:
      "Some modern systems can process these elements, but the result can vary by parser, document type, export method, and layout complexity.",
    items: [
      "Basic two-column layouts",
      "Simple tables used for alignment",
      "Information in headers or footers",
      "Text boxes and sidebars",
      "Less common fonts",
      "Decorative separators and symbols",
      "Hyperlinked text without a visible URL",
    ],
  },
  {
    label: "Higher parsing risk",
    symbol: "!",
    className: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    summary:
      "These choices can hide important information, produce missing text, or make the extracted reading order difficult to understand.",
    items: [
      "Scanned or image-only PDFs",
      "Resume text stored inside graphics",
      "Photos used instead of text labels",
      "Complex nested tables",
      "Overlapping design elements",
      "Unusual characters replacing words",
      "Password-protected or corrupted files",
    ],
  },
] as const;

const fileTypeRows = [
  {
    situation: "The application specifies PDF",
    choice: "Submit a text-based PDF",
    reason:
      "Follow the stated requirement. Confirm that text can be selected and copied and that the exported file is not a flattened image.",
  },
  {
    situation: "The application specifies DOCX",
    choice: "Submit DOCX",
    reason:
      "Use the requested format and open the final file on another device or compatible editor to check layout stability.",
  },
  {
    situation: "Both PDF and DOCX are accepted",
    choice: "Use the cleanest tested version",
    reason:
      "PDF can preserve visual layout; DOCX is a common parser-supported format. Choose the version whose text order and content survive your checks.",
  },
  {
    situation: "The employer gives no file guidance",
    choice: "Use text-based PDF or simple DOCX",
    reason:
      "Both are supported by common recruiting systems. Avoid scanned PDFs and complex formatting, and keep an alternate version ready.",
  },
  {
    situation: "The portal extracts information into fields",
    choice: "Review every populated field",
    reason:
      "Correct the name, employer, title, dates, education, and contact details before submitting. Successful upload does not prove accurate extraction.",
  },
] as const;

const sectionRows = [
  {
    section: "Name and contact information",
    heading: "No special heading required",
    guidance:
      "Use text near the top of the main body. Include current phone and email, general location, and relevant professional links. A full street address is usually unnecessary unless specifically requested.",
  },
  {
    section: "Professional summary",
    heading: "Professional Summary or Summary",
    guidance:
      "Use a short, role-relevant overview supported by the resume. Do not add target-job requirements that you cannot prove elsewhere.",
  },
  {
    section: "Skills",
    heading: "Skills or Technical Skills",
    guidance:
      "Use plain text for genuine tools, methods, languages, systems, and role skills. Group related skills only when the labels remain clear.",
  },
  {
    section: "Employment",
    heading: "Work Experience or Professional Experience",
    guidance:
      "Show job title, employer, location when useful, dates, and concise bullets. Keep each role's information together and use the same pattern throughout.",
  },
  {
    section: "Projects",
    heading: "Projects",
    guidance:
      "Identify the project, context, contribution, relevant tools, and truthful result. Do not present coursework or personal projects as paid employment.",
  },
  {
    section: "Education and credentials",
    heading: "Education and Certifications",
    guidance:
      "List the accurate degree or credential, institution or issuer, and completion or validity details when relevant. Keep expired or incomplete status clear.",
  },
] as const;

const parsingTests = [
  {
    title: "Highlight test",
    description:
      "Open the final PDF and try to select your name, headings, dates, and bullets with the cursor. If important text cannot be selected, the file may contain image-based content.",
  },
  {
    title: "Copy-and-paste test",
    description:
      "Copy the entire resume and paste it into a plain-text editor. Check whether sections, employers, titles, dates, skills, and bullets appear in a logical order without missing characters.",
  },
  {
    title: "File conversion test",
    description:
      "If your editor supports it, save a temporary plain-text copy and inspect the result. This is an approximation, not a replica of every ATS parser, but it can reveal obvious extraction problems.",
  },
  {
    title: "Portal field review",
    description:
      "After uploading, examine every field the application fills automatically. Correct parsing mistakes before submission instead of assuming the uploaded document was understood correctly.",
  },
  {
    title: "Human review",
    description:
      "Open the final file at normal zoom and on a second device when possible. Confirm that headings, line breaks, dates, links, spacing, and page breaks remain readable.",
  },
] as const;

const commonMistakes = [
  {
    title: "Treating ATS-friendly as a guarantee",
    description:
      "Employers use different systems, configurations, screening questions, workflows, and human review processes. A safer format can reduce avoidable parsing risk, but it cannot guarantee ranking, an interview, or a hiring decision.",
  },
  {
    title: "Optimizing layout while ignoring relevance",
    description:
      "A perfectly extracted resume can still be a poor match. Formatting, job-description alignment, qualifications, and clear evidence are separate parts of the application.",
  },
  {
    title: "Putting contact details only in a header",
    description:
      "Some parsers may skip or misclassify header, footer, and text-box content. Keep essential contact information in the primary reading flow.",
  },
  {
    title: "Using graphics as evidence",
    description:
      "Skill bars, star ratings, charts, logos, and icons may look appealing but often communicate little precise evidence. Replace them with recognizable text and supported context.",
  },
  {
    title: "Uploading a scanned PDF",
    description:
      "A document can look correct while containing no extractable text. Export from the original editor rather than printing, photographing, or scanning the pages as images.",
  },
  {
    title: "Adding unsupported keywords",
    description:
      "Parsing and keyword presence do not verify a claim. Use ResumeClimb Truth Match to distinguish confirmed experience from related or unconfirmed requirements before editing.",
  },
] as const;

const finalChecklist = [
  "I followed the file type and document instructions in the job posting.",
  "My name and contact details appear as text in the main document body.",
  "The resume has one clear reading order and no overlapping content.",
  "I used familiar headings for summary, skills, experience, projects, education, and certifications.",
  "Employers, titles, locations, and dates follow a consistent pattern.",
  "Important qualifications and achievements are text—not images, charts, or icons.",
  "The final PDF allows important text to be highlighted and copied.",
  "The plain-text copy preserves the main sections in a logical order.",
  "I reviewed every field populated by the application portal.",
  "Keywords appear naturally and only where my evidence supports them.",
  "Every tool, credential, metric, result, date, and scope claim is accurate.",
  "The original document is readable to a person at normal zoom.",
] as const;

const faqItems = [
  {
    question: "What is an ATS-friendly resume format?",
    answer:
      "It is a resume structure designed to keep important text readable and organized when a recruiting system extracts information. A safe baseline uses a clear reading order, standard headings, text-based content, consistent dates, and a supported file type while remaining readable to a person.",
  },
  {
    question: "Is PDF or DOCX better for ATS?",
    answer:
      "Follow the employer's instructions first. Common recruiting systems support both text-based PDF and DOCX, but parsing can vary by system and document complexity. Never use a scanned or image-only PDF, and test the final file before submitting.",
  },
  {
    question: "Can an ATS read a two-column resume?",
    answer:
      "Some modern parsers can process basic columns, but results can vary by system, file type, export method, and layout. A single-column main body remains the safer choice when compatibility is more important than compact design.",
  },
  {
    question: "Can I put contact information in the header?",
    answer:
      "Some systems may read it, but important contact information can be skipped or misclassified when it appears only in a header, footer, or text box. Put essential contact details near the top of the main document body.",
  },
  {
    question: "Which section headings are safest for ATS?",
    answer:
      "Use familiar headings such as Professional Summary, Skills, Work Experience, Projects, Education, and Certifications. Creative labels may be clear to a person but harder for automated extraction to categorize consistently.",
  },
  {
    question: "How can I test whether my resume is parseable?",
    answer:
      "Try highlighting text in the final PDF, copy the full document into a plain-text editor, inspect the reading order, and review every field populated after a portal upload. These checks can reveal obvious issues but cannot reproduce every employer's ATS configuration.",
  },
  {
    question: "Does an ATS-friendly resume need keywords?",
    answer:
      "Formatting and keyword alignment are different checks. Use relevant job-description terminology naturally when it accurately reflects your experience. Do not add a missing tool, credential, skill, or result merely to improve a comparison score.",
  },
  {
    question: "Can any tool guarantee that my resume will pass ATS?",
    answer:
      "No. ATS products, employer settings, screening questions, recruiter searches, and hiring workflows differ. ResumeClimb AI provides an educational analysis, not an employer-issued score or a guarantee of ranking, interviews, or employment.",
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

export default function AtsFriendlyResumeFormatPage() {
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
        name: "ATS-Friendly Resume Format",
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
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              AI Bullet Generator
            </Link>
            <Link
              href="/ats-resume-checker"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
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
              <span className="text-slate-300">ATS-Friendly Format</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Practical ATS Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ATS-Friendly Resume Format: A Practical Guide and Checklist
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Build a resume with a clear reading order, recognizable sections,
              text-based evidence, and a tested file format. Learn what is
              safest, what depends on the parser, and what creates avoidable
              risk—without chasing a fictional universal ATS guarantee.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Check Resume Against a Job
              </Link>
              <a
                href="#checklist-heading"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                View the Final Checklist
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                Safe formatting baseline
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                PDF and DOCX decision guide
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No false pass guarantee
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="definition-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                More than a template
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What makes a resume ATS-friendly?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                An ATS-friendly resume keeps important information available as
                readable text, organizes it in a predictable sequence, and uses
                a file type accepted by the employer. Compatibility is only one
                layer: the content must also match the role truthfully and remain
                clear to the person who reviews it.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {formatLayers.map((layer, index) => (
                  <section
                    key={layer.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">
                      {layer.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {layer.description}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="baseline-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Low-risk starting point
              </p>
              <h2
                id="baseline-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                The safest ATS-friendly resume format baseline
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                No layout works identically in every employer system. These
                choices reduce unnecessary complexity and give both software and
                people a clearer document to review.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {safestBaseline.map((item) => (
                  <section
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-300"
                      >
                        ✓
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="matrix-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
                Formatting safety matrix
              </p>
              <h2
                id="matrix-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Safest, variable, and higher-risk resume elements
              </h2>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {safetyMatrix.map((category) => (
                  <section
                    key={category.label}
                    className={`rounded-2xl border p-6 ${category.className}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 font-bold">
                        {category.symbol}
                      </span>
                      <h3 className="text-xl font-bold">{category.label}</h3>
                    </div>
                    <p className="mt-5 leading-7 text-slate-300">
                      {category.summary}
                    </p>
                    <ul className="mt-5 space-y-3 text-sm text-slate-300">
                      {category.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="file-type-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                PDF vs DOCX
              </p>
              <h2
                id="file-type-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Which resume file type should you submit?
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                There is no responsible universal answer that ignores the
                employer&apos;s instructions. Common platforms support multiple
                document types, while the quality of the export and complexity
                of the layout can affect extraction.
              </p>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Application situation
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Recommended choice
                      </th>
                      <th className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                        Why
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                    {fileTypeRows.map((row) => (
                      <tr key={row.situation}>
                        <td className="px-5 py-5 align-top font-semibold text-slate-200">
                          {row.situation}
                        </td>
                        <td className="px-5 py-5 align-top text-blue-200">
                          {row.choice}
                        </td>
                        <td className="px-5 py-5 align-top leading-7 text-slate-400">
                          {row.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-6">
                <h3 className="text-lg font-bold text-amber-200">
                  Do not confuse “opens correctly” with “parsed correctly”
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  A portal may accept a file even when some extracted fields are
                  missing or wrong. Always inspect the application form after
                  upload and correct every field before submission.
                </p>
              </div>
            </section>

            <section aria-labelledby="structure-heading">
              <h2
                id="structure-heading"
                className="text-3xl font-bold tracking-tight"
              >
                A clear ATS-friendly resume structure
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Use only sections that serve your application, but keep their
                names and internal patterns recognizable. A typical experienced
                candidate can begin with the following order.
              </p>

              <div className="mt-8 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-950/80 p-5 font-mono text-sm leading-7 text-slate-200 sm:p-6">
{`FULL NAME
City, State/Country | Phone | Email | LinkedIn or Portfolio

PROFESSIONAL SUMMARY
Two or three concise lines aligned with the target role and supported
by the experience below.

SKILLS
Confirmed tools, methods, systems, languages, and role skills.

WORK EXPERIENCE
Job Title | Employer | Location | Month Year – Month Year
• Action + task + relevant context + accurate result
• Action + task + tool, scope, stakeholder, or supported outcome

PROJECTS
Project Name | Context | Date when useful
• Contribution + method or tool + truthful result

EDUCATION
Degree or Program | Institution | Completion information

CERTIFICATIONS
Credential | Issuer | Current status or date when relevant`}
                </pre>
              </div>

              <div className="mt-8 space-y-5">
                {sectionRows.map((row) => (
                  <section
                    key={row.section}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <div className="grid gap-3 md:grid-cols-[190px_220px_minmax(0,1fr)] md:gap-5">
                      <h3 className="font-bold text-white">{row.section}</h3>
                      <p className="font-semibold text-blue-300">
                        {row.heading}
                      </p>
                      <p className="leading-7 text-slate-400">
                        {row.guidance}
                      </p>
                    </div>
                  </section>
                ))}
              </div>

              <Link
                href="/guides/how-to-list-education-on-resume"
                className="mt-6 inline-flex font-semibold text-blue-300 hover:text-blue-200"
              >
                Learn how to format every resume education scenario →
              </Link>
            </section>

            <section aria-labelledby="testing-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Test before applying
              </p>
              <h2
                id="testing-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Five practical resume parsing checks
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                These checks do not recreate every commercial parser. They help
                you detect missing text, broken order, image-only content, and
                obvious upload errors before the employer sees the application.
              </p>

              <ol className="mt-8 space-y-5">
                {parsingTests.map((test, index) => (
                  <li
                    key={test.title}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {test.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {test.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="keywords-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="keywords-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                Formatting does not prove keyword relevance
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                A parser may extract a term successfully, but that does not mean
                the term is relevant, supported, or persuasive. Classify target
                requirements as Confirmed, Related, or Not Confirmed before you
                add or rewrite them. Keep unsupported tools, credentials, and
                outcomes out of the resume.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="inline-flex font-semibold text-blue-300 hover:text-blue-200"
                >
                  Learn how to find and use ATS resume keywords →
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="inline-flex font-semibold text-blue-300 hover:text-blue-200"
                >
                  Learn the complete Truth Match tailoring method →
                </Link>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Common ATS resume format mistakes
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {commonMistakes.map((mistake) => (
                  <section
                    key={mistake.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {mistake.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {mistake.description}
                    </p>
                  </section>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="checklist-heading"
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Before submitting
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                ATS-friendly resume format checklist
              </h2>

              <ul className="mt-7 grid gap-4 md:grid-cols-2">
                {finalChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-emerald-500/20 bg-slate-950/60 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-300"
                    >
                      ✓
                    </span>
                    <span className="leading-6 text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="sources-heading">
              <h2
                id="sources-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Technical references for parsing guidance
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Resume parsing behavior varies. These current recruiting-system
                support resources document supported file types and examples of
                formatting that can interfere with extraction.
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Greenhouse: Unsuccessful Resume Parse
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Examples include image-based documents and complex resumes
                    using tables, headers, footers, graphics, or text boxes.
                  </p>
                </a>

                <a
                  href="https://help.lever.co/hc/en-us/articles/20087345054749-Understanding-resume-parsing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Lever: Understanding Resume Parsing
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Lists supported document types, explains extracted fields,
                    and distinguishes readable documents from image files.
                  </p>
                </a>
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
                Check format, structure, and job alignment together
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                ResumeClimb AI reviews formatting signals, resume sections, and
                job-description keyword evidence. Treat every result as an
                educational estimate and review the final document yourself.
              </p>
              <Link
                href="/ats-resume-checker"
                className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Open the Free ATS Resume Checker
              </Link>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">On this page</h2>
              <nav className="mt-4 space-y-3 text-sm">
                <a href="#definition-heading" className="block text-slate-400 hover:text-white">
                  What ATS-friendly means
                </a>
                <a href="#baseline-heading" className="block text-slate-400 hover:text-white">
                  Safest baseline
                </a>
                <a href="#matrix-heading" className="block text-slate-400 hover:text-white">
                  Format safety matrix
                </a>
                <a href="#file-type-heading" className="block text-slate-400 hover:text-white">
                  PDF vs DOCX
                </a>
                <a href="#structure-heading" className="block text-slate-400 hover:text-white">
                  Resume structure
                </a>
                <a href="#testing-heading" className="block text-slate-400 hover:text-white">
                  Parsing tests
                </a>
                <a href="#mistakes-heading" className="block text-slate-400 hover:text-white">
                  Mistakes to avoid
                </a>
                <a href="#checklist-heading" className="block text-slate-400 hover:text-white">
                  Final checklist
                </a>
                <a href="#faq-heading" className="block text-slate-400 hover:text-white">
                  FAQ
                </a>
              </nav>
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
              <h2 className="font-bold text-emerald-200">Safest default</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use a simple reading order, standard headings, text-based
                evidence, consistent dates, and the file type requested by the
                employer. Test the final export before submitting.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">No universal pass</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                ATS platforms and employer workflows differ. A clean format can
                reduce parsing risk but cannot guarantee ranking, recruiter
                review, an interview, or employment.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Checker
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Tailoring Guide
                </Link>
                <Link
                  href="/resume-bullet-generator"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  AI Resume Bullet Generator
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="ats-format-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Guidance and tool results are educational and do
        not guarantee employer ATS outcomes.
      </footer>
    </main>
  );
}
