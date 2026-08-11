import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/how-to-list-education-on-resume";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "How to List Education on a Resume";
const PAGE_DESCRIPTION =
  "Learn where education should go and how to list degrees, current study, fields, courses, and certifications with 14 truthful resume examples.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "how to list education on a resume",
    "resume education section",
    "education on resume examples",
    "degree in progress resume",
    "unfinished degree on resume",
    "how to list high school on resume",
    "relevant coursework on resume",
    "certifications on resume",
    "should education be first on a resume",
    "education and certifications on resume",
    "course title on resume",
    "field of study meaning on resume",
    "how to list current education on resume",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: "How to List Education on a Resume: 14 Examples",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "How to list education accurately on a resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to List Education on a Resume: 14 Examples",
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

const entryFields = [
  {
    label: "Official qualification or program name",
    guidance:
      "Use the exact degree, diploma, certificate, trade qualification, high-school credential, or program name. Do not upgrade a course, concentration, or unfinished program into a completed degree.",
  },
  {
    label: "Institution or issuing organization",
    guidance:
      "Write the correct school, university, college, training provider, licensing body, or credential issuer. Do not imply accreditation or recognition that does not apply.",
  },
  {
    label: "Location",
    guidance:
      "City and region or country can be included when useful. For online study, name the institution rather than presenting the delivery platform as the credential issuer unless it was the issuer.",
  },
  {
    label: "Completion or expected date",
    guidance:
      "Use Graduated, Completed, Expected, In Progress, or dates attended accurately. Never use an expected date for a program you are no longer pursuing.",
  },
  {
    label: "Relevant optional details",
    guidance:
      "Add a major, minor, concentration, honors, GPA, coursework, thesis, capstone, academic project, or activity only when accurate, relevant, and useful for the target role.",
  },
] as const;

const educationTerms = [
  {
    term: "Degree or qualification",
    meaning:
      "The official credential or program level awarded or pursued, such as Bachelor of Science, Associate Degree, diploma, or trade qualification.",
    example: "Bachelor of Science",
  },
  {
    term: "Field of study",
    meaning:
      "The main academic subject, major, discipline, or specialization studied. It is not the institution name or the degree level.",
    example: "Computer Science, Accounting, or Marketing",
  },
  {
    term: "Course title",
    meaning:
      "The official name of a class, training course, or program. Use the wording supplied by the institution or provider and follow a form's instructions because the term can vary by country.",
    example: "Financial Accounting II or Introduction to Data Analytics",
  },
  {
    term: "Certification or license",
    meaning:
      "A credential issued by a named organization or authority, sometimes with an issue date, expiration date, or current-status requirement.",
    example: "Project Management Professional (PMP)",
  },
] as const;

const placementOptions = [
  {
    title: "Student or recent graduate",
    position: "Often near the top, after the summary or contact information",
    reason:
      "Education, coursework, academic projects, internships, and activities may provide the strongest relevant evidence when professional experience is limited.",
  },
  {
    title: "Experienced professional",
    position: "Usually after work experience",
    reason:
      "Recent professional contributions commonly carry more weight than detailed academic history. Keep education concise unless the role requires it.",
  },
  {
    title: "Career changer or recently trained candidate",
    position: "Place according to relevance",
    reason:
      "Relevant new study, certification, or training can appear earlier when it helps connect a verified transition to the target field.",
  },
  {
    title: "Credential-required role",
    position: "Make the required qualification easy to find",
    reason:
      "If the employer requires a particular degree, license, registration, or certification, present the exact current credential prominently without changing its status.",
  },
] as const;

const truthRules = [
  {
    title: "Completed means awarded",
    description:
      "Do not list a degree as completed until the institution has awarded it. Coursework, attendance, candidacy, and completion of some requirements are different facts.",
  },
  {
    title: "Expected means actively in progress",
    description:
      "Use an expected completion date only when you are currently pursuing the program and the date is a reasonable, supported expectation.",
  },
  {
    title: "Unfinished study needs a clear status",
    description:
      "Use Coursework toward, Studies in, Credits completed, or dates attended when accurate. Do not leave formatting that implies graduation.",
  },
  {
    title: "Grades and honors must be verified",
    description:
      "Use the official grading scale, GPA, classification, award, scholarship, or honor exactly. Do not convert grades between systems without an accepted basis.",
  },
  {
    title: "Courses are not automatically certifications",
    description:
      "Course completion, a certificate of completion, professional certification, license, and academic certificate can represent different assessment and authority levels.",
  },
  {
    title: "International equivalence requires care",
    description:
      "Keep the official credential name. Add a translated description or evaluated equivalency only when accurate and supported by an appropriate source.",
  },
] as const;

const writingSteps = [
  {
    title: "Review the employer's education requirements",
    description:
      "Identify required and preferred degrees, fields of study, licenses, certifications, training, coursework, and graduation status. Do not assume every job needs the same level of detail.",
  },
  {
    title: "Create an accurate education inventory",
    description:
      "Record official program names, institutions, locations, dates, status, majors, minors, grades, awards, relevant coursework, projects, licenses, and certifications.",
  },
  {
    title: "Choose what is relevant",
    description:
      "Prioritize education that confirms a requirement or provides useful evidence. Remove old or unrelated detail when it distracts from stronger qualifications.",
  },
  {
    title: "Select the correct status template",
    description:
      "Use a completed, in-progress, unfinished, high-school, vocational, international, course, or certification structure that preserves the real status.",
  },
  {
    title: "Decide section placement",
    description:
      "Place education earlier when it is among your strongest relevant qualifications and later when professional experience provides the primary evidence.",
  },
  {
    title: "Add only useful optional details",
    description:
      "Coursework, projects, GPA, honors, activities, and thesis details should support the target role—not turn the education section into a complete transcript.",
  },
  {
    title: "Run a final credential audit",
    description:
      "Verify every qualification name, institution, issuer, date, completion status, grade, honor, license, certification, and keyword before submitting.",
  },
] as const;

const educationExamples = [
  {
    title: "Completed bachelor's degree",
    context: "Standard completed-degree format",
    lines: [
      "Bachelor of Science in [Official Major]",
      "[University Name], [City, Region or Country]",
      "Graduated [Month Year]",
    ],
    note: "Add a minor, honors, or relevant project only when verified and useful.",
  },
  {
    title: "Master's degree with earlier degree",
    context: "Multiple completed degrees",
    lines: [
      "Master of [Official Field] | [University] | [Year]",
      "Bachelor of [Official Field] | [University] | [Year]",
    ],
    note: "List the most recent or highest relevant qualification first and use consistent formatting.",
  },
  {
    title: "Degree currently in progress",
    context: "Active study with expected completion",
    lines: [
      "Bachelor of [Official Field], In Progress",
      "[Institution], [Location]",
      "Expected [Month Year]",
    ],
    note: "Use Expected only while actively pursuing the program and update the date if circumstances change.",
  },
  {
    title: "Recent graduate with relevant detail",
    context: "Expanded entry for early career",
    lines: [
      "Bachelor of [Official Field] | [Institution] | [Year]",
      "Relevant Coursework: [Course], [Course], [Course]",
      "Capstone: [Accurate project title or short description]",
      "Honors: [Official verified honor]",
    ],
    note: "Select details that provide evidence for the target role and remove them as professional experience grows.",
  },
  {
    title: "Experienced professional with compact education",
    context: "Concise format after work history",
    lines: ["Bachelor of [Official Field] | [Institution]"],
    note: "A graduation date and academic detail may be optional unless required or useful. Never provide an inaccurate date.",
  },
  {
    title: "Unfinished degree not currently pursued",
    context: "Status made explicit",
    lines: [
      "Coursework toward Bachelor of [Official Field]",
      "[Institution], [Location] | [Accurate dates attended]",
      "Relevant Coursework: [Verified course names]",
    ],
    note: "Do not use Expected or wording that implies the degree was awarded when you are no longer enrolled.",
  },
  {
    title: "College study without a completed degree",
    context: "Credits or study stated accurately",
    lines: [
      "Studies in [Field] | [Institution] | [Dates attended]",
      "Completed [verified number] credits, if useful and supported",
    ],
    note: "Include this when it adds relevant knowledge or context. Do not estimate credits or completion percentage.",
  },
  {
    title: "High-school education",
    context: "When it is the most relevant completed education",
    lines: [
      "[Official High-School Credential]",
      "[School Name], [Location] | [Graduation Year or Expected Year]",
    ],
    note: "High school may be unnecessary after a higher qualification unless requested or specifically relevant.",
  },
  {
    title: "Vocational or trade qualification",
    context: "Practical training and credential",
    lines: [
      "[Official Trade, Diploma, or Vocational Qualification]",
      "[Institution or Training Provider], [Location] | [Completion Year]",
      "Training: [Relevant verified practical area]",
    ],
    note: "List any required license separately with its correct status and issuing body.",
  },
  {
    title: "Associate degree",
    context: "Completed two-year or equivalent qualification",
    lines: [
      "Associate of [Official Field]",
      "[College or Institution], [Location] | [Month Year]",
    ],
    note: "Use the institution's official degree wording rather than converting it into a bachelor's degree.",
  },
  {
    title: "Academic diploma or certificate",
    context: "Formal education credential",
    lines: [
      "[Official Diploma or Academic Certificate Name]",
      "[Institution], [Location] | [Completion Year]",
    ],
    note: "Keep academic certificates distinct from professional certifications and course-completion documents.",
  },
  {
    title: "Online course or training program",
    context: "Learning activity labeled accurately",
    lines: [
      "[Official Course or Program Name]",
      "[Issuing Institution or Provider] | Completed [Month Year]",
      "Project or Topics: [Relevant verified work]",
    ],
    note: "Do not call a course a degree or professional certification unless that is its official status.",
  },
  {
    title: "International education",
    context: "Official credential preserved",
    lines: [
      "[Official Credential Name in Original or Accurate English Form]",
      "[Institution], [City, Country] | [Year]",
      "Evaluated Equivalent: [Only when formally assessed and useful]",
    ],
    note: "Avoid self-declaring equivalency. Follow employer, immigration, licensing, or credential-evaluation instructions where applicable.",
  },
  {
    title: "Professional certification or license",
    context: "Separate credential section when appropriate",
    lines: [
      "[Full Official Credential Name] ([Recognized abbreviation, if applicable])",
      "[Issuing Organization] | Issued [Month Year] | Expires [Month Year, if applicable]",
      "Credential ID: [Include only when appropriate and safe]",
    ],
    note: "Use In Progress or Expected only when the issuer and status support it. Do not list expired credentials as current.",
  },
] as const;

const detailDecisions = [
  {
    title: "GPA or grade",
    includeWhen:
      "It is requested, meaningfully strong in the relevant grading system, recent, or useful for an early-career application.",
    caution:
      "Use the official value and scale. Do not convert, round, or recalculate without a valid basis.",
  },
  {
    title: "Relevant coursework",
    includeWhen:
      "Course names demonstrate knowledge requested by the job and stronger work or project evidence is limited.",
    caution:
      "Use official course names or accurate descriptions. Completing a course does not prove professional experience or mastery.",
  },
  {
    title: "Academic projects",
    includeWhen:
      "A project demonstrates relevant tools, methods, research, design, analysis, teamwork, or a useful deliverable.",
    caution:
      "Label academic, capstone, lab, or personal context honestly and distinguish your contribution from the team's output.",
  },
  {
    title: "Honors and awards",
    includeWhen:
      "The official recognition is verified and relevant or meaningful for your career stage.",
    caution:
      "Use the exact award name, institution, and date. Do not translate participation into an honor.",
  },
  {
    title: "Activities and leadership",
    includeWhen:
      "The activity provides relevant evidence of leadership, organization, communication, service, or technical involvement.",
    caution:
      "Use the official role and real contribution. Membership does not equal leadership or event ownership.",
  },
  {
    title: "Graduation dates",
    includeWhen:
      "They clarify current study, expected completion, recent education, or a required application timeline.",
    caution:
      "If included, dates must be accurate. Follow application instructions and local expectations when deciding whether older dates are necessary.",
  },
] as const;

const noDegreeGuidance = [
  {
    title: "Lead with the qualification you do have",
    description:
      "High school, vocational study, trade training, certificates, licenses, coursework, apprenticeships, and professional development can be relevant when labeled accurately.",
  },
  {
    title: "Use projects and experience as evidence",
    description:
      "Show the tools, tasks, outputs, customers, problems, or responsibilities that demonstrate capability. Do not imply a degree is unnecessary when the employer explicitly requires one.",
  },
  {
    title: "Separate education from skills",
    description:
      "A skill learned through work or a project can appear in Skills and Experience. The Education section should still identify the real learning program or credential.",
  },
  {
    title: "Do not create an equivalent degree",
    description:
      "Experience, self-study, and certificates may be valuable but should not be labeled as equivalent to a formal degree unless an authorized evaluation says so.",
  },
] as const;

const rewriteExamples = [
  {
    title: "Degree still in progress",
    weak: "Bachelor of Science in Computer Science | [University] | 2027",
    stronger:
      "Bachelor of Science in Computer Science, In Progress | [University] | Expected 2027",
    reason:
      "The stronger format makes current status and the expected date clear instead of implying completion.",
  },
  {
    title: "Unfinished program",
    weak: "Bachelor of Business Administration | [University]",
    stronger:
      "Coursework toward Bachelor of Business Administration | [University] | [Accurate dates attended]",
    reason:
      "The revised wording preserves relevant study without claiming that the degree was awarded.",
  },
  {
    title: "Online course presented as certification",
    weak: "Certified Data Analyst | [Course Platform]",
    stronger:
      "[Official Data Analysis Course Name] | [Actual Issuer] | Completed [Month Year]",
    reason:
      "A completed course should not be converted into a professional certification unless the official credential has that status.",
  },
  {
    title: "Unverified grade conversion",
    weak: "GPA: 3.8/4.0 (self-converted)",
    stronger:
      "[Official grade or classification and scale], or omit when an accepted conversion is unavailable",
    reason:
      "The final resume should not present a self-created grade conversion as an official result.",
  },
  {
    title: "International degree equivalence",
    weak: "U.S. Bachelor's Equivalent",
    stronger: "[Official Credential] | [Institution], [Country] | [Year]",
    reason:
      "Add an equivalency statement only when a recognized evaluation or relevant authority supports it.",
  },
  {
    title: "Overloaded experienced-candidate entry",
    weak: "Degree, GPA, ten courses, five activities, school projects, high school, and every academic award",
    stronger: "Bachelor of [Field] | [Institution]",
    reason:
      "Experienced candidates can keep education focused unless specific academic details remain relevant or required.",
  },
] as const;

const commonMistakes = [
  {
    title: "Implying an unfinished degree was completed",
    description:
      "A school name and dates without status can be misleading. Use In Progress, Expected, Coursework toward, Studies in, or accurate attendance dates.",
  },
  {
    title: "Calling every course a certification",
    description:
      "A course, certificate of completion, academic certificate, professional certification, and license may have different requirements and authority.",
  },
  {
    title: "Listing irrelevant academic detail",
    description:
      "A long course and activity list can hide stronger qualifications. Select evidence that supports the target role and career stage.",
  },
  {
    title: "Using inconsistent names and dates",
    description:
      "Check official spelling, credential titles, institutions, issuers, abbreviations, completion status, and date formats.",
  },
  {
    title: "Adding unverified equivalence",
    description:
      "Do not translate an international credential, grading scale, or training program into a local degree or grade without a valid basis.",
  },
  {
    title: "Keyword stuffing the education section",
    description:
      "Relevant coursework and credentials can support job keywords, but repeating missing skills does not create education or experience you do not have.",
  },
] as const;

const finalChecklist = [
  "Every degree, diploma, certificate, license, course, and program uses its official or accurately translated name.",
  "Every institution, provider, and issuing organization is correct.",
  "Completed, In Progress, Expected, Coursework toward, and dates attended are used accurately.",
  "No unfinished or discontinued program appears as an awarded degree.",
  "Dates use a consistent format and are verified.",
  "GPA, grades, honors, awards, credits, and classifications match official records.",
  "No self-created grade conversion or credential equivalence appears as official.",
  "Relevant coursework and projects are labeled as academic evidence, not professional employment.",
  "Certifications and licenses show accurate status, issuer, and expiration information where applicable.",
  "The amount of education detail matches my career stage and target job.",
  "Important job-description terms appear only when confirmed by my education or credentials.",
  "The section uses a conventional heading, readable structure, and selectable text.",
  "Sensitive credential identifiers are omitted unless appropriate to share.",
  "I can explain and, when necessary, document every education claim.",
] as const;

const faqItems = [
  {
    question: "What should I include in the education section of a resume?",
    answer:
      "Include the official qualification or program, institution, and completion status or date. Location, major, minor, coursework, projects, grades, honors, and activities are optional when relevant and accurate.",
  },
  {
    question: "Should education be first on a resume?",
    answer:
      "Education can come first when you are a student, recent graduate, career changer with relevant recent study, or applicant for a credential-required role. Experienced professionals usually place relevant work experience first and keep education below it.",
  },
  {
    question: "How do I list current education or a degree still in progress?",
    answer:
      "Use the official program name, institution, In Progress status, and an accurate expected completion date when you are actively enrolled. Update the entry whenever the expected date or enrollment status changes.",
  },
  {
    question: "What does field of study mean on a resume?",
    answer:
      "Field of study means the main subject, major, discipline, or specialization you studied, such as Computer Science, Accounting, or Marketing. It is different from the degree level and institution name.",
  },
  {
    question: "What is a course title on a resume?",
    answer:
      "A course title is the official name of a class, training course, or program. Use the name supplied by the institution or provider, and do not present a course as a degree or professional certification unless that is its official status.",
  },
  {
    question:
      "Should education and certifications be in the same resume section?",
    answer:
      "They can share a section when you have only one or two supporting credentials and the result remains clear. Use separate Education and Certifications or Licenses sections when professional credentials are numerous, role-critical, regulated, renewable, or need issue and expiration dates.",
  },
  {
    question: "How do I list an unfinished degree?",
    answer:
      "Use wording such as Coursework toward, Studies in, credits completed, or accurate dates attended. Do not use an expected graduation date if you are no longer pursuing the program, and do not imply the degree was awarded.",
  },
  {
    question: "Should I include high school on my resume?",
    answer:
      "Include it when it is your highest or most relevant completed education, when you are still a student, or when the employer requests it. It is often unnecessary after completing a higher qualification unless specifically relevant.",
  },
  {
    question: "Should I include my GPA or grades?",
    answer:
      "Include them when requested, recent, relevant, and meaningfully strong in the official grading system. Always use the verified value and scale; do not invent or self-convert a grade without an accepted basis.",
  },
  {
    question: "Can I list online courses on my resume?",
    answer:
      "Yes, when they are relevant. Use the official course name, actual issuer or provider, completion date, and useful project or topic details. Do not call a course a degree, license, or professional certification unless that is its official status.",
  },
  {
    question: "How should I list international education?",
    answer:
      "Keep the official credential and institution names, with an accurate English description when helpful. Add a local equivalency only when an appropriate evaluation or authority supports it, and follow employer or licensing instructions.",
  },
  {
    question: "How do I make the education section ATS-friendly?",
    answer:
      "Use a conventional heading, readable selectable text, consistent entries, and accurate degree, field, institution, and credential terminology. Follow employer instructions. Applicant tracking systems vary, so no format or keyword tactic guarantees selection.",
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

export default function HowToListEducationOnResumePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to List Education on a Resume: 14 Examples",
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-08",
    dateModified: "2026-08-11",
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
        name: "How to List Education on a Resume",
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
            className="text-lg font-bold tracking-tight text-white"
          >
            ResumeClimb AI
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/ats-resume-checker"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              ATS Resume Checker
            </Link>
            <Link
              href="/resume-bullet-generator"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              AI Bullet Generator
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
              <span className="text-slate-300">Resume Education</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Truth-First Education Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to List Education on a Resume
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Format completed, in-progress, unfinished, vocational,
              high-school, online, and international education accurately for
              your career stage and target job.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Check Resume Against a Job
              </Link>
              <Link
                href="/guides/ats-friendly-resume-format"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Review ATS-Friendly Formatting
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                14 education examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Every career stage
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No false degree status
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-08">August 8, 2026</time>
              {" · "}
              Updated <time dateTime="2026-08-11">August 11, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="definition-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Show verified learning and credentials
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What belongs in a resume education section?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                The education section identifies relevant formal education,
                training, and credentials. Its purpose is to make your actual
                qualifications clear—not to imply a degree, grade,
                certification, license, or completion status you do not have.
              </p>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                The amount of detail should reflect your career stage and the
                job. A recent graduate may use coursework and academic projects
                as evidence, while an experienced candidate may need only a
                concise degree line.
              </p>
            </section>

            <section aria-labelledby="template-heading">
              <h2
                id="template-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Education entry template
              </h2>
              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="font-semibold text-blue-200">
                  [Official Qualification or Program] | [Institution] |
                  [Location] | [Completed, Expected, or Accurate Attendance
                  Date]
                </p>
                <p className="mt-4 leading-7 text-slate-300">
                  Optional: [Major or concentration] | [Verified grade or honor]
                  | [Relevant coursework, project, or thesis]
                </p>
              </div>

              <ol className="mt-7 space-y-5">
                {entryFields.map((field, index) => (
                  <li
                    key={field.label}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {field.label}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {field.guidance}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="terms-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Education terms explained
              </p>
              <h2
                id="terms-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Degree, field of study, course title, and certification
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                These labels describe different parts of your education. Use the
                official wording from your institution, provider, or credential
                issuer instead of choosing a label that sounds more advanced.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {educationTerms.map((item) => (
                  <article
                    key={item.term}
                    className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6"
                  >
                    <h3 className="text-xl font-bold text-violet-200">
                      {item.term}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {item.meaning}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Example:</strong>{" "}
                      {item.example}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="placement-heading">
              <h2
                id="placement-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Should education come first on a resume?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                Put education first when it is your strongest relevant
                qualification, especially as a student, recent graduate, or
                candidate for a credential-required role. Put relevant work
                experience first when it provides stronger and more recent
                evidence for the target job.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {placementOptions.map((option) => (
                  <article
                    key={option.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {option.title}
                    </h3>
                    <p className="mt-3 font-semibold text-blue-300">
                      {option.position}
                    </p>
                    <p className="mt-3 leading-7 text-slate-400">
                      {option.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="current-education-heading">
              <h2
                id="current-education-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to list current education on a resume
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                Name the official program and institution, state that the
                program is In Progress, and add an expected completion date only
                while you are actively enrolled and the date is accurate. Do not
                format current study as an awarded degree.
              </p>
              <div className="mt-6 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 sm:p-8">
                <p className="font-semibold text-blue-200">
                  Bachelor of Science in Computer Science, In Progress
                </p>
                <p className="mt-2 text-slate-300">
                  [University Name], [City, Country]
                </p>
                <p className="mt-2 text-slate-300">Expected [Month Year]</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                If you stop pursuing the program, remove the expected date and
                use Coursework toward, Studies in, or accurate attendance dates
                instead.
              </p>
            </section>

            <section aria-labelledby="certifications-heading">
              <h2
                id="certifications-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Education and certifications on a resume: together or separate?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                A combined Education and Certifications section can work when
                you have only one or two supporting credentials and every item
                remains easy to identify. Use separate sections when
                certifications or licenses are numerous, required for the role,
                regulated, renewable, or need issue and expiration dates.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <h3 className="text-xl font-bold text-white">
                    Combine when clarity remains high
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    Use a heading such as Education and Certifications when a
                    short combined section keeps closely related qualifications
                    clear and compact.
                  </p>
                </article>
                <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <h3 className="text-xl font-bold text-white">
                    Separate role-critical credentials
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    Use Certifications or Licenses as a separate section when
                    recruiters must quickly confirm the issuer, credential name,
                    status, issue date, or expiration date.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="truth-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb truth-first rules
              </p>
              <h2
                id="truth-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Make the education status unmistakable
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {truthRules.map((rule) => (
                  <article
                    key={rule.title}
                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6"
                  >
                    <h3 className="text-lg font-bold text-emerald-200">
                      {rule.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {rule.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <h2
                id="steps-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to write your education section step by step
              </h2>
              <ol className="mt-8 space-y-5">
                {writingSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Adaptable education formats
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                14 resume education examples
              </h2>
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  Replace every bracketed field with verified information.
                  Select the template that matches your real status rather than
                  the one that appears most impressive.
                </p>
              </div>

              <div className="mt-8 space-y-7">
                {educationExamples.map((example, index) => (
                  <article
                    key={example.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-300">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                          {example.context}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white">
                          {example.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                      {example.lines.map((line) => (
                        <p key={line} className="leading-7 text-slate-200">
                          {line}
                        </p>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Truth check:</strong>{" "}
                      {example.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="details-heading">
              <h2
                id="details-heading"
                className="text-3xl font-bold tracking-tight"
              >
                GPA, coursework, projects, and academic details
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {detailDecisions.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      <strong className="text-emerald-300">
                        Consider when:
                      </strong>{" "}
                      {item.includeWhen}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      <strong className="text-amber-200">Caution:</strong>{" "}
                      {item.caution}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="no-degree-heading"
              className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 sm:p-8"
            >
              <h2
                id="no-degree-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                What to list when you do not have a degree
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                A degree is one type of evidence. Present the education,
                training, licenses, projects, and experience you actually have
                without converting them into an equivalent qualification.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {noDegreeGuidance.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-violet-500/20 bg-slate-950/60 p-5"
                  >
                    <h3 className="font-bold text-violet-200">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="rewrites-heading">
              <h2
                id="rewrites-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Misleading and truthful education examples
              </h2>
              <div className="mt-8 space-y-7">
                {rewriteExamples.map((example) => (
                  <article
                    key={example.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {example.title}
                    </h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-rose-300">
                          Misleading or unclear
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.weak}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                          Clearer and truthful
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.stronger}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Why:</strong>{" "}
                      {example.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="ats-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="ats-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                ATS-friendly education formatting
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Use a conventional heading such as Education, Education and Training, or Certifications and Licenses.",
                  "Keep qualification names, institutions, dates, and status text selectable and readable.",
                  "Use the official full credential name and add a recognized abbreviation when useful.",
                  "Use consistent entry order, spacing, and date formatting.",
                  "Avoid placing essential qualifications only inside icons, images, charts, or decorative timelines.",
                  "Use job-description terminology only when it accurately matches your education or credential.",
                  "Follow instructions that request transcripts, credential evaluation, license numbers, complete education history, or a specific file format.",
                  "Remember that ATS products and employer configurations vary; no format or keyword tactic guarantees selection.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-200"
                    >
                      ✓
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Review the ATS-friendly format guide →
                </Link>
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Learn how to use ATS keywords →
                </Link>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Education-section mistakes to avoid
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {commonMistakes.map((mistake) => (
                  <article
                    key={mistake.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {mistake.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {mistake.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="checklist-heading"
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Final credential audit
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Resume education checklist
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

            <section aria-labelledby="references-heading">
              <h2
                id="references-heading"
                className="text-3xl font-bold tracking-tight"
              >
                References and further reading
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                These resources provide additional perspectives on education,
                unfinished study, and professional credentials. Follow the
                requirements of your employer, institution, issuer, country, and
                regulated profession where applicable.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <a
                  href="https://www.indeed.com/career-advice/resumes-cover-letters/how-to-list-education-on-a-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Indeed: How to List Education
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Reviews core education details, placement, and adaptable
                    education-section examples.
                  </p>
                </a>
                <a
                  href="https://www.coursera.org/articles/how-to-list-education-on-a-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Coursera: Education on a Resume
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Discusses reverse-chronological education, relevant detail,
                    and placement across career stages.
                  </p>
                </a>
                <a
                  href="https://www.coursera.org/articles/how-to-list-unfinished-degree-on-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Coursera: Listing an Unfinished Degree
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Provides considerations for active, incomplete, and relevant
                    unfinished education.
                  </p>
                </a>
                <a
                  href="https://careerservices.fas.harvard.edu/blog/2023/01/17/exactly-when-where-and-how-to-list-certifications-on-your-resume-because-youve-earned-them/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Harvard: Listing Certifications
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Covers certification names, issuers, dates, expiration, and
                    placement choices.
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
                Check your education and skills against the target job
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                Compare your full resume with one job description, review
                confirmed and unconfirmed requirements, and keep every education
                and credential claim accurate.
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
                <a
                  href="#definition-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Section purpose
                </a>
                <a
                  href="#template-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Entry template
                </a>
                <a
                  href="#terms-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Education terms
                </a>
                <a
                  href="#placement-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Education first?
                </a>
                <a
                  href="#current-education-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Current education
                </a>
                <a
                  href="#certifications-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Education and certifications
                </a>
                <a
                  href="#truth-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Truth-first rules
                </a>
                <a
                  href="#steps-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Writing steps
                </a>
                <a
                  href="#examples-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  14 examples
                </a>
                <a
                  href="#details-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  GPA and coursework
                </a>
                <a
                  href="#no-degree-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  No-degree guidance
                </a>
                <a
                  href="#rewrites-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Truthful rewrites
                </a>
                <a
                  href="#ats-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS formatting
                </a>
                <a
                  href="#checklist-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Final checklist
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
                Status must be clear
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Completed, In Progress, Expected, Coursework toward, and dates
                attended communicate different education facts.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">
                Course is not a degree
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Preserve the official level of every course, certificate,
                certification, license, diploma, and degree.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/guides/how-to-write-work-experience-on-resume"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Work Experience
                </Link>
                <Link
                  href="/guides/skills-to-put-on-a-resume"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Skills to Put on a Resume
                </Link>
                <Link
                  href="/guides/how-to-write-a-resume-summary"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Summary Guide
                </Link>
                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS-Friendly Resume Format
                </Link>
                <Link
                  href="/ats-resume-checker"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Checker
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="resume-education-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Education examples are templates and must be
        adapted to accurately reflect your own qualifications and status.
      </footer>
    </main>
  );
}
