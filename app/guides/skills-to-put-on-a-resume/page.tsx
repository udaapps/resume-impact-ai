import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/skills-to-put-on-a-resume";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Skills to Put on a Resume";
const PAGE_DESCRIPTION =
  "Choose skills for your resume with 120 categorized examples, an evidence-first selection method, ATS placement tips, and truthful wording guidance.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE}: 120 Examples | ResumeClimb AI`,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "skills to put on a resume",
    "resume skills examples",
    "best skills for resume",
    "hard skills for resume",
    "soft skills for resume",
    "resume skills section",
    "ATS resume skills",
    "how to list skills on a resume",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ResumeClimb AI",
    title: "Skills to Put on a Resume: 120 Examples and ATS Tips",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Skills to put on a resume with evidence-first ATS guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills to Put on a Resume: 120 Examples and ATS Tips",
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

const skillTypes = [
  {
    title: "Hard skills",
    description:
      "Specific tools, systems, methods, languages, procedures, or technical capabilities learned through work, education, training, or projects.",
    examples:
      "Examples include SQL, Excel, bookkeeping, route planning, Salesforce, JavaScript, inventory control, and data visualization.",
  },
  {
    title: "Soft skills",
    description:
      "Ways you communicate, organize, solve problems, collaborate, adapt, or lead. These often need context to become credible.",
    examples:
      "Examples include active listening, prioritization, teamwork, conflict resolution, adaptability, and attention to detail.",
  },
  {
    title: "Transferable skills",
    description:
      "Capabilities developed in one setting that may be relevant in another, provided you explain the real context and do not overstate equivalence.",
    examples:
      "Examples include customer communication, record keeping, training, analysis, scheduling, research, and project coordination.",
  },
] as const;

const truthMatchLevels = [
  {
    label: "Confirmed",
    symbol: "✓",
    color: "emerald",
    description:
      "You used the exact skill in paid work, an internship, education, volunteering, training, or a project—and can explain where and how.",
    action:
      "List it using accurate terminology and reinforce it with context elsewhere in the resume when relevant.",
  },
  {
    label: "Related",
    symbol: "≈",
    color: "amber",
    description:
      "You have adjacent experience, but it does not yet prove the exact tool, method, credential, or level requested by the employer.",
    action:
      "Keep the skill you actually used. Investigate the relationship, but do not convert related evidence into an exact claim.",
  },
  {
    label: "Not Confirmed",
    symbol: "?",
    color: "rose",
    description:
      "The job description requests the skill, but you cannot identify evidence that you learned or used it.",
    action:
      "Leave it out. A missing requirement is more honest than an unsupported claim that may fail during screening or an interview.",
  },
] as const;

const selectionSteps = [
  {
    title: "Extract skills from the job description",
    description:
      "Mark named tools, software, methods, languages, procedures, credentials, responsibilities, and repeated capabilities. Keep the employer's exact wording for comparison.",
  },
  {
    title: "Build your own evidence inventory",
    description:
      "Review work, internships, coursework, projects, volunteering, certifications, and training. Record where you used each skill and what you produced or supported.",
  },
  {
    title: "Classify every possible match",
    description:
      "Separate direct confirmation from related experience and unconfirmed requirements. Similar concepts are not automatically interchangeable.",
  },
  {
    title: "Prioritize relevance and specificity",
    description:
      "Choose the supported skills most important to this role. Prefer exact tools and methods over broad labels when the specific wording is accurate.",
  },
  {
    title: "Place each skill where it has value",
    description:
      "Use a concise skills section for scanning, then reinforce important capabilities in experience, projects, education, or certifications with truthful context.",
  },
  {
    title: "Remove unsupported or decorative claims",
    description:
      "Delete skills copied only from the job ad, vague traits without evidence, outdated tools that are not relevant, and proficiency ratings you cannot defend.",
  },
] as const;

const skillGroups = [
  {
    title: "Administrative and business operations",
    type: "Tools, systems, and procedures",
    guidance:
      "Name the software or process only when you used it. Replace a broad phrase such as office skills with the specific supported capabilities.",
    skills: [
      "Microsoft Excel",
      "Microsoft Word",
      "Google Workspace",
      "Calendar management",
      "Data entry",
      "Records management",
      "Document control",
      "Invoice processing",
      "Travel coordination",
      "Vendor coordination",
    ],
  },
  {
    title: "Customer service and sales",
    type: "Customer, account, and revenue workflows",
    guidance:
      "Separate the platform from the capability. For example, Salesforce is a tool; account management and pipeline management describe work performed.",
    skills: [
      "CRM software",
      "Salesforce",
      "Zendesk",
      "POS systems",
      "Customer support",
      "Complaint resolution",
      "Lead qualification",
      "Pipeline management",
      "Consultative selling",
      "Account management",
    ],
  },
  {
    title: "Project and product work",
    type: "Planning, delivery, and stakeholder methods",
    guidance:
      "Do not claim a formal method or ownership level merely because you participated in a project. Describe your actual role and scope.",
    skills: [
      "Project planning",
      "Risk management",
      "Stakeholder communication",
      "Requirements gathering",
      "Agile",
      "Scrum",
      "Jira",
      "Resource coordination",
      "Budget tracking",
      "Process mapping",
    ],
  },
  {
    title: "Data and analytics",
    type: "Analysis tools and reporting capabilities",
    guidance:
      "List tools separately when useful, then use project or experience bullets to show the data, analysis, output, or decision supported.",
    skills: [
      "SQL",
      "Python",
      "R",
      "Tableau",
      "Power BI",
      "Data cleaning",
      "Data visualization",
      "Statistical analysis",
      "Dashboard development",
      "Reporting automation",
    ],
  },
  {
    title: "Software and web development",
    type: "Languages, frameworks, databases, and practices",
    guidance:
      "Use exact technology names and reinforce the strongest ones with a real application, feature, API, test, database, or deployment example.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "REST APIs",
      "Git",
      "Automated testing",
      "PostgreSQL",
      "HTML and CSS",
      "CI/CD",
    ],
  },
  {
    title: "IT, cloud, and cybersecurity",
    type: "Infrastructure, support, and security capabilities",
    guidance:
      "Related deployment or support work does not prove a specific cloud platform, container tool, security function, or administrative level.",
    skills: [
      "Technical support",
      "Windows administration",
      "Linux",
      "Computer networking",
      "AWS",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "Identity and access management",
      "Incident response",
    ],
  },
  {
    title: "Finance and accounting",
    type: "Financial processes, systems, and standards",
    guidance:
      "Distinguish supporting a process from owning it. List standards, regulated work, and professional credentials only when they accurately apply.",
    skills: [
      "Financial reporting",
      "Bookkeeping",
      "Accounts payable",
      "Accounts receivable",
      "Budgeting",
      "Forecasting",
      "Variance analysis",
      "Account reconciliation",
      "QuickBooks",
      "GAAP",
    ],
  },
  {
    title: "Marketing and content",
    type: "Campaign, audience, and communication skills",
    guidance:
      "Name the channel, platform, content type, or analysis performed. Do not imply strategy ownership when your role was limited to execution or support.",
    skills: [
      "Search engine optimization",
      "Google Analytics",
      "Content strategy",
      "Email marketing",
      "Social media management",
      "Market research",
      "Campaign reporting",
      "Copywriting",
      "A/B testing",
      "CRM segmentation",
    ],
  },
  {
    title: "Logistics, warehouse, and operations",
    type: "Movement, inventory, safety, and quality processes",
    guidance:
      "Keep licenses, equipment operation, safety records, and authority levels exact. Routine exposure does not equal certification or independent operation.",
    skills: [
      "Inventory management",
      "Order fulfillment",
      "Shipping and receiving",
      "Route planning",
      "Warehouse management systems",
      "Forklift operation",
      "Quality inspection",
      "Safety procedures",
      "Procurement",
      "Supply chain coordination",
    ],
  },
  {
    title: "Healthcare and community support",
    type: "Care, records, coordination, and outreach",
    guidance:
      "Clinical procedures, regulated access, compliance knowledge, and credentials must match your real training, authorization, and work setting.",
    skills: [
      "Patient scheduling",
      "Electronic health records",
      "Medical terminology",
      "Vital signs",
      "Care coordination",
      "Case documentation",
      "HIPAA compliance",
      "Community outreach",
      "Crisis support",
      "Health education",
    ],
  },
  {
    title: "Leadership and people operations",
    type: "Team, training, and change responsibilities",
    guidance:
      "Show whether you led, supervised, trained, facilitated, or supported. These words represent different levels of responsibility.",
    skills: [
      "Team supervision",
      "Employee onboarding",
      "Training delivery",
      "Performance coaching",
      "Conflict resolution",
      "Staff scheduling",
      "Workload prioritization",
      "Cross-functional collaboration",
      "Change management",
      "Meeting facilitation",
    ],
  },
  {
    title: "Transferable interpersonal skills",
    type: "Communication, thinking, and work habits",
    guidance:
      "Soft skills become more credible when an experience or project bullet shows the situation, action, and useful outcome.",
    skills: [
      "Written communication",
      "Verbal communication",
      "Active listening",
      "Problem-solving",
      "Attention to detail",
      "Time management",
      "Adaptability",
      "Teamwork",
      "Critical thinking",
      "Relationship building",
    ],
  },
] as const;

const placementOptions = [
  {
    title: "Dedicated skills section",
    purpose:
      "Provide a concise, scannable inventory of the most relevant supported technical, procedural, language, or domain skills.",
    example:
      "Data: SQL, Excel, Power BI | Reporting: Dashboard development, data cleaning, variance analysis",
  },
  {
    title: "Experience bullets",
    purpose:
      "Show how an important skill was used within a responsibility, project, decision, deliverable, or supported outcome.",
    example:
      "Built Power BI dashboards from cleaned operational data to give department leads a consistent weekly reporting view.",
  },
  {
    title: "Projects section",
    purpose:
      "Provide context for skills learned or applied through academic, personal, freelance, volunteer, or professional projects.",
    example:
      "Inventory dashboard project — Cleaned sample data in Python and created an interactive Tableau dashboard for category and stock analysis.",
  },
  {
    title: "Summary or profile",
    purpose:
      "Highlight only a small number of the strongest role-relevant capabilities that are confirmed elsewhere in the resume.",
    example:
      "Data analyst experienced in SQL, Excel, dashboard reporting, and translating operational questions into clear findings.",
  },
  {
    title: "Education and certifications",
    purpose:
      "Identify relevant coursework, training, licenses, or credentials accurately without presenting study as professional experience.",
    example:
      "Coursework: Database Systems, Statistics, Data Visualization | Certification: [exact official credential name]",
  },
] as const;

const evidenceExamples = [
  {
    skill: "Microsoft Excel",
    weak: "Excellent Excel skills",
    stronger:
      "Maintained monthly expense trackers in Excel using formulas, filters, and pivot tables.",
    why: "The stronger version identifies the work, features used, and output without assigning an unsupported rating.",
  },
  {
    skill: "Customer service",
    weak: "Strong customer service skills",
    stronger:
      "Resolved billing and account inquiries across phone and email and documented follow-up actions in the CRM.",
    why: "The evidence names the issue types, channels, and documentation process.",
  },
  {
    skill: "Project management",
    weak: "Project management expert",
    stronger:
      "Coordinated schedules, action items, risk updates, and stakeholder communication for a cross-functional system rollout.",
    why: "The wording shows supported project activities without inventing expertise, certification, budget ownership, or team authority.",
  },
  {
    skill: "Communication",
    weak: "Excellent communication",
    stronger:
      "Prepared weekly status summaries and explained open issues and next steps to technical and operations stakeholders.",
    why: "The stronger bullet demonstrates the audience, communication type, and purpose.",
  },
  {
    skill: "Leadership",
    weak: "Natural leader and team player",
    stronger:
      "Trained new team members on service procedures and assisted colleagues with complex customer cases.",
    why: "Training and peer support are observable. Use supervised or managed only if those responsibilities were real.",
  },
] as const;

const careerStageAdvice = [
  {
    title: "Entry-level or no paid experience",
    description:
      "Use skills confirmed by coursework, projects, volunteering, student organizations, caregiving, community work, or training. Label the source honestly and show what you created, analyzed, organized, or supported.",
  },
  {
    title: "Career change",
    description:
      "Identify transferable capabilities from your previous field, then separate them from new skills developed through verified training or projects. Do not rename past work to imitate the target role.",
  },
  {
    title: "Experienced candidate",
    description:
      "Prioritize current and role-relevant capabilities. Remove basic or outdated items that take attention away from stronger evidence, unless the job specifically requires them.",
  },
  {
    title: "Candidate with many tools",
    description:
      "Group related tools under clear labels such as Data, Development, Design, or Operations. Keep the list focused and prove the most important skills through selected accomplishments.",
  },
] as const;

const commonMistakes = [
  {
    title: "Copying every keyword from the job description",
    description:
      "The employer's requirements are not evidence about you. Add only the skills you can support and explain.",
  },
  {
    title: "Treating related tools as identical",
    description:
      "Using one CRM, cloud platform, programming framework, or analytics tool may help you learn another, but it does not prove exact experience with it.",
  },
  {
    title: "Listing only broad soft skills",
    description:
      "A long list of communication, teamwork, leadership, and problem-solving claims offers little context. Demonstrate the strongest ones in bullets.",
  },
  {
    title: "Using stars, bars, or percentages",
    description:
      "A self-rating such as 90% Excel or four stars for leadership has no shared standard. Name the functions, tasks, or level of responsibility instead.",
  },
  {
    title: "Hiding important skills in graphics",
    description:
      "Keep essential text selectable and readable in a conventional section. Decorative charts, icons, and text boxes may create parsing or accessibility problems.",
  },
  {
    title: "Claiming credentials or regulated abilities",
    description:
      "Never list a license, certification, clinical procedure, security clearance, equipment authorization, or compliance responsibility unless it is accurate and current where required.",
  },
] as const;

const finalChecklist = [
  "I compared the resume with one specific job description.",
  "Every listed skill is supported by work, education, training, volunteering, or project evidence.",
  "Related experience was not converted into an unsupported exact skill.",
  "Unconfirmed employer requirements were left out.",
  "The most relevant hard skills appear in a clear, conventional section.",
  "Important skills are reinforced with context in experience or project bullets.",
  "Soft skills are demonstrated rather than presented only as adjectives.",
  "Tool names, methods, credentials, and licenses are spelled accurately.",
  "I removed rating bars, stars, and arbitrary proficiency percentages.",
  "I avoided repeating a keyword only to increase frequency.",
  "The skills section is focused and does not replace evidence elsewhere.",
  "I can explain when, where, and how I used every skill during an interview.",
] as const;

const faqItems = [
  {
    question: "What skills should I put on my resume?",
    answer:
      "Choose skills that are relevant to the target job and supported by your real work, education, training, volunteering, or projects. Prioritize specific tools, methods, procedures, languages, and domain capabilities, then demonstrate important interpersonal skills through context.",
  },
  {
    question: "How many skills should I list on a resume?",
    answer:
      "There is no universal number that fits every candidate. Use a focused list that covers the strongest relevant capabilities without becoming a keyword dump. The available space, role, experience level, and number of genuinely supported skills should guide the final length.",
  },
  {
    question: "What is the difference between hard and soft skills?",
    answer:
      "Hard skills are specific technical, procedural, language, tool, or domain capabilities. Soft skills describe how you communicate, collaborate, organize, adapt, think, or lead. Both can matter, but soft skills usually become more credible when demonstrated in an experience or project example.",
  },
  {
    question: "Should I copy skills from the job description?",
    answer:
      "Use the employer's exact terminology only when it accurately matches your evidence. Do not add a requested skill, platform, credential, responsibility, or level merely because it appears in the job description.",
  },
  {
    question: "Where should skills go on a resume?",
    answer:
      "A dedicated skills section can provide a quick inventory. Reinforce important skills in experience and project bullets, and include a small number in the summary when they are central to the target role. Relevant coursework and credentials can appear in education or certification sections.",
  },
  {
    question: "Should I rate my skill level with stars or percentages?",
    answer:
      "Usually no. Stars, bars, and percentages are subjective and difficult to interpret. Describe the tool functions, type of work, context, responsibility, or output instead. Use an official proficiency framework only when it is relevant and accurately assessed.",
  },
  {
    question: "Can I list skills learned through a course or personal project?",
    answer:
      "Yes. Identify the source honestly and show what you practiced or built. Do not present coursework, tutorials, or personal projects as paid professional experience, and do not imply mastery beyond what the evidence supports.",
  },
  {
    question: "Do ATS tools require an exact keyword match?",
    answer:
      "Applicant tracking systems and employer workflows vary. Clear terminology can help a reader or system identify relevant information, but an exact phrase is not permission to make an unsupported claim. Use accurate job-relevant language naturally and follow the employer's application instructions.",
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

export default function SkillsToPutOnResumePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Skills to Put on a Resume: 120 Examples and ATS Tips",
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
        name: "Skills to Put on a Resume",
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
              <span className="text-slate-300">Resume Skills</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Evidence-First Resume Skills Guide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Skills to Put on a Resume: 120 Examples and ATS Tips
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Choose role-relevant hard and soft skills, confirm every claim
              against real evidence, and place your strongest capabilities where
              employers and resume systems can understand them.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Compare Resume Skills With a Job
              </Link>
              <Link
                href="/guides/resume-keywords-for-ats"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Read the ATS Keyword Guide
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                120 categorized examples
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                Hard and soft skills
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                No unsupported claims
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
                Start with relevance and evidence
              </p>
              <h2
                id="definition-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What skills belong on a resume?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                The best skills for your resume are not the longest or most
                impressive list. They are the capabilities that matter to the
                target role and that you can support with real work, education,
                training, volunteering, or project evidence.
              </p>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                A dedicated skills section helps readers locate important
                information quickly. It should not replace evidence. Important
                skills become more credible when your experience or projects
                show how you used them.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {skillTypes.map((type) => (
                  <article
                    key={type.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {type.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {type.description}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {type.examples}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="truth-match-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb Truth Match method
              </p>
              <h2
                id="truth-match-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Confirm a skill before you claim it
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Compare each job-description skill with your evidence. A related
                concept can reveal a learning path, but it does not prove the
                exact tool, method, credential, or responsibility.
              </p>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {truthMatchLevels.map((level) => {
                  const styles =
                    level.color === "emerald"
                      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
                      : level.color === "amber"
                        ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
                        : "border-rose-500/25 bg-rose-500/10 text-rose-200";

                  return (
                    <article
                      key={level.label}
                      className={`rounded-2xl border p-6 ${styles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 font-bold">
                          {level.symbol}
                        </span>
                        <h3 className="text-xl font-bold">{level.label}</h3>
                      </div>
                      <p className="mt-4 leading-7 text-slate-300">
                        {level.description}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-slate-400">
                        <strong className="text-slate-200">Action:</strong>{" "}
                        {level.action}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="selection-heading">
              <h2
                id="selection-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to choose resume skills step by step
              </h2>
              <ol className="mt-8 space-y-5">
                {selectionSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
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
                Categorized idea library
              </p>
              <h2
                id="examples-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                120 skills to put on a resume
              </h2>
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
                <p className="leading-7 text-slate-300">
                  These are examples to evaluate—not a list to copy. Use only
                  skills that match the target job and your real evidence.
                  Licenses, credentials, regulated procedures, equipment, and
                  authority levels require particular care.
                </p>
              </div>

              <div className="mt-8 space-y-7">
                {skillGroups.map((group) => (
                  <section
                    key={group.title}
                    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                      {group.type}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {group.guidance}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200"
                        >
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full bg-blue-400"
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="placement-heading">
              <h2
                id="placement-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Where to put skills on your resume
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                A skill can appear in more than one section when each use adds
                useful context. Avoid repeating the same keyword mechanically.
              </p>
              <div className="mt-8 space-y-5">
                {placementOptions.map((option, index) => (
                  <article
                    key={option.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-300">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {option.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-400">
                          {option.purpose}
                        </p>
                        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                            Example structure
                          </p>
                          <p className="mt-2 leading-7 text-slate-300">
                            {option.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="evidence-heading">
              <h2
                id="evidence-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Turn a skill claim into evidence
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                A skills section names capabilities. Experience and project
                bullets show how those capabilities were applied. Use the
                stronger wording only when every detail is true for you.
              </p>

              <div className="mt-8 space-y-7">
                {evidenceExamples.map((example) => (
                  <article
                    key={example.skill}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {example.skill}
                    </h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-rose-300">
                          Vague claim
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.weak}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                          Stronger when supported
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {example.stronger}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      <strong className="text-slate-200">Why:</strong>{" "}
                      {example.why}
                    </p>
                  </article>
                ))}
              </div>

              <Link
                href="/resume-bullet-generator"
                className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Turn Supported Experience Into Resume Bullets
              </Link>
            </section>

            <section aria-labelledby="career-stage-heading">
              <h2
                id="career-stage-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Skills advice by career stage
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {careerStageAdvice.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
<div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 p-6">
  <h3 className="text-xl font-bold text-violet-200">
    Building your first resume?
  </h3>

  <p className="mt-3 leading-7 text-slate-300">
    If you have little or no paid work experience, use the dedicated guide to
    identify skills from coursework, projects, volunteering, clubs, and personal
    work without overstating your background.
  </p>

  <Link
    href="/guides/skills-to-put-on-a-resume-with-no-experience"
    className="mt-4 inline-flex font-semibold text-violet-200 hover:text-white"
  >
    See skills for a resume with no experience →
  </Link>
</div>
            <section
              aria-labelledby="ats-heading"
              className="rounded-3xl border border-blue-500/25 bg-blue-500/10 p-6 sm:p-8"
            >
              <h2
                id="ats-heading"
                className="text-3xl font-bold tracking-tight text-white"
              >
                How to make a skills section ATS-friendly
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Use a conventional heading such as Skills or Technical Skills.",
                  "Keep essential skill text selectable instead of placing it only inside images or decorative graphics.",
                  "Use the employer's terminology when it accurately matches your evidence.",
                  "Spell out an unfamiliar abbreviation when clarity would help, then include the abbreviation in parentheses.",
                  "Group related capabilities under clear labels when the list is long.",
                  "Avoid tables, rating bars, icons, and text boxes when they create parsing or reading problems.",
                  "Follow the employer's file-type and application instructions.",
                  "Remember that ATS products and employer configurations vary; no formatting or keyword tactic guarantees selection.",
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
                  href="/guides/resume-keywords-for-ats"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Learn how to use resume keywords →
                </Link>
                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Review the ATS-friendly format guide →
                </Link>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <h2
                id="mistakes-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Resume skills mistakes to avoid
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
                Final truth and relevance review
              </p>
              <h2
                id="checklist-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-white"
              >
                Resume skills checklist
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
                These resources offer additional perspectives on selecting and
                demonstrating skills. Adapt all advice to your evidence,
                location, field, and the employer's instructions.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-3">
                <a
                  href="https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Indeed: Skills to Put on a Resume
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Reviews skill selection, hard and soft skills, placement,
                    and adaptable examples.
                  </p>
                </a>
                <a
                  href="https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    MIT CAPD: Writing About Skills
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Explains how experience statements can demonstrate skills
                    through context, action, and results.
                  </p>
                </a>
                <a
                  href="https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Harvard: Creating a Strong Resume
                  </p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Emphasizes relevant strengths and tailoring the resume to
                    the type of position being pursued.
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
                Compare your supported skills with one target job
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
                ResumeClimb Truth Match separates confirmed wording, related
                evidence, and requirements that were not found. Keep only the
                skills that accurately represent your background.
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
                  Skill types
                </a>
                <a
                  href="#truth-match-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Truth Match method
                </a>
                <a
                  href="#selection-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Selection steps
                </a>
                <a
                  href="#examples-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  120 skill examples
                </a>
                <a
                  href="#placement-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Skill placement
                </a>
                <a
                  href="#evidence-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Evidence examples
                </a>
                <a
                  href="#ats-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  ATS guidance
                </a>
                <a
                  href="#mistakes-heading"
                  className="block text-slate-400 hover:text-white"
                >
                  Mistakes to avoid
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
                Evidence beats volume
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A focused set of relevant, supported skills is more useful than
                a long list copied from the job description.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <h2 className="font-bold text-amber-200">Related is not exact</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Similar software, methods, or responsibilities may be
                transferable, but they do not prove the employer's exact
                requirement.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-bold text-white">Related resources</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  ATS Resume Keyword Guide
                </Link>
                <Link
                  href="/guides/how-to-tailor-resume-to-job-description"
                  className="block rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500"
                >
                  Resume Tailoring Guide
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

      <HumanAtsReviewCta source="resume-skills-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Skill examples are educational and must be
        adapted to accurately reflect your own background.
      </footer>
    </main>
  );
}
