import type { Metadata } from "next";
import Link from "next/link";

import HumanAtsReviewCta from "@/components/marketing/human-ats-review-cta";

const SITE_URL = "https://www.resumeclimbai.com";
const PAGE_PATH = "/guides/skills-to-put-on-a-resume-with-no-experience";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE =
  "Skills to Put on a Resume With No Experience: 60+ First-Job Examples";

const PAGE_DESCRIPTION =
  "Discover 60+ skills for a resume with no experience, including first-job and student examples, hard and soft skills, evidence ideas, and ATS-friendly tips.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  authors: [{ name: "UDA Apps", url: SITE_URL }],
  creator: "UDA Apps",
  publisher: "ResumeClimb AI",
  category: "career",
  keywords: [
    "skills to put on a resume with no experience",
    "skills for resume with no experience",
    "best skills for first job resume",
    "resume skills for students",
    "entry level resume skills",
    "hard skills for resume with no experience",
    "soft skills for resume with no experience",
    "student resume skills",
    "first job resume skills",
    "transferable skills for resume",
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
        alt: "Skills to put on a resume with no experience",
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

const topSkills = [
  {
    skill: "Communication",
    evidence:
      "Presentations, group projects, volunteering, clubs, customer-facing activities, or written assignments.",
  },
  {
    skill: "Teamwork",
    evidence:
      "Group assignments, sports teams, clubs, event planning, or collaborative projects.",
  },
  {
    skill: "Problem-solving",
    evidence:
      "Academic projects, troubleshooting, competitions, research, or improving a process.",
  },
  {
    skill: "Time management",
    evidence:
      "Managing coursework, deadlines, extracurricular activities, volunteering, or multiple projects.",
  },
  {
    skill: "Microsoft Excel",
    evidence:
      "Coursework, personal budgeting, data exercises, projects, or administrative tasks.",
  },
  {
    skill: "Microsoft Word",
    evidence:
      "Reports, assignments, letters, project documentation, or formatted documents.",
  },
  {
    skill: "Google Workspace",
    evidence:
      "Docs, Sheets, Slides, Drive, classroom collaboration, clubs, or shared projects.",
  },
  {
    skill: "Research",
    evidence:
      "Academic assignments, literature reviews, surveys, experiments, or independent projects.",
  },
  {
    skill: "Organization",
    evidence:
      "Managing files, events, study schedules, team activities, projects, or volunteer responsibilities.",
  },
  {
    skill: "Adaptability",
    evidence:
      "Learning new tools, changing project requirements, taking on new responsibilities, or working with different groups.",
  },
] as const;

const hardSkills = [
  "Microsoft Excel",
  "Microsoft Word",
  "Microsoft PowerPoint",
  "Google Docs",
  "Google Sheets",
  "Google Slides",
  "Google Drive",
  "Data entry",
  "Typing",
  "Email communication",
  "Internet research",
  "Online collaboration tools",
  "Canva",
  "Basic graphic design",
  "Social media management",
  "Content writing",
  "Proofreading",
  "Presentation creation",
  "Basic data analysis",
  "Spreadsheet formatting",
  "Basic formulas and functions",
  "File management",
  "Document formatting",
  "Calendar management",
  "Basic bookkeeping",
  "Customer service tools",
  "Survey tools",
  "Video conferencing",
  "Basic HTML/CSS",
  "Foreign-language proficiency",
] as const;

const softSkills = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Time management",
  "Adaptability",
  "Organization",
  "Attention to detail",
  "Reliability",
  "Active listening",
  "Critical thinking",
  "Creativity",
  "Leadership",
  "Initiative",
  "Patience",
  "Empathy",
  "Professionalism",
  "Decision-making",
  "Conflict resolution",
  "Collaboration",
  "Responsibility",
  "Self-management",
  "Learning agility",
  "Planning",
  "Prioritization",
  "Public speaking",
  "Written communication",
  "Interpersonal skills",
  "Resourcefulness",
  "Accountability",
  "Work ethic",
] as const;

const evidenceSources = [
  {
    title: "School and university projects",
    description:
      "Projects can demonstrate research, analysis, writing, presentation, teamwork, software use, planning, and problem-solving. Label academic work accurately instead of presenting it as paid employment.",
  },
  {
    title: "Coursework and practical assignments",
    description:
      "Relevant coursework can show exposure to tools, methods, concepts, or technical tasks that match an entry-level job requirement.",
  },
  {
    title: "Volunteering",
    description:
      "Volunteer work can provide real evidence of communication, organization, customer support, teamwork, event coordination, leadership, and responsibility.",
  },
  {
    title: "Clubs, societies, and sports",
    description:
      "Activities can demonstrate teamwork, leadership, scheduling, discipline, communication, event support, and collaboration when you describe your real contribution.",
  },
  {
    title: "Personal projects",
    description:
      "A website, spreadsheet, portfolio, coding project, design project, research project, social page, or other self-directed work can demonstrate practical skills.",
  },
  {
    title: "Informal or part-time responsibilities",
    description:
      "Tutoring, helping a family business, community work, assisting events, or other real responsibilities may provide useful evidence when described truthfully.",
  },
] as const;

const skillEvidenceExamples = [
  {
    skill: "Teamwork",
    source: "University group project",
    wording:
      "Collaborated with a 4-person team to research, prepare, and deliver a semester presentation by the required deadline.",
  },
  {
    skill: "Communication",
    source: "Student presentation",
    wording:
      "Presented project findings to classmates and answered follow-up questions using clear supporting slides.",
  },
  {
    skill: "Microsoft Excel",
    source: "Course assignment",
    wording:
      "Used Excel to organize project data, apply basic formulas, and create charts for a class report.",
  },
  {
    skill: "Organization",
    source: "Volunteer event",
    wording:
      "Helped organize participant records, schedules, and event materials for a community activity.",
  },
  {
    skill: "Research",
    source: "Academic assignment",
    wording:
      "Reviewed multiple sources, summarized findings, and organized references for a research assignment.",
  },
  {
    skill: "Leadership",
    source: "Club activity",
    wording:
      "Coordinated task assignments and deadlines for a student club activity involving multiple participants.",
  },
  {
    skill: "Problem-solving",
    source: "Personal project",
    wording:
      "Identified and resolved setup issues while building and testing a personal web project.",
  },
  {
    skill: "Time management",
    source: "Coursework and activities",
    wording:
      "Managed overlapping assignment deadlines and extracurricular responsibilities using a weekly schedule.",
  },
] as const;

const matchingSteps = [
  {
    title: "Read the job description carefully",
    description:
      "Highlight the tools, technical skills, communication abilities, responsibilities, and qualifications the employer explicitly mentions.",
  },
  {
    title: "Separate required skills from preferred skills",
    description:
      "Prioritize requirements you genuinely meet. Preferred skills can be useful, but they should not replace essential qualifications.",
  },
  {
    title: "Match each keyword to real evidence",
    description:
      "For every skill you want to include, identify where you used or learned it through education, projects, volunteering, activities, or real responsibilities.",
  },
  {
    title: "Use the employer's wording when accurate",
    description:
      "If the employer says Microsoft Excel and you genuinely used Excel, using that exact term can make the match clearer. Do not copy skills you do not have.",
  },
  {
    title: "Place important skills where they have evidence",
    description:
      "A Skills section can name relevant abilities, but projects, education, volunteering, or experience should provide context where possible.",
  },
] as const;

const skillsSectionExamples = [
  {
    title: "Student resume",
    skills: [
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Google Workspace",
      "Research",
      "Written communication",
      "Teamwork",
    ],
  },
  {
    title: "First office job",
    skills: [
      "Microsoft Excel",
      "Microsoft Word",
      "Data entry",
      "Email communication",
      "File management",
      "Organization",
    ],
  },
  {
    title: "Entry-level customer service",
    skills: [
      "Customer communication",
      "Active listening",
      "Problem-solving",
      "Teamwork",
      "Time management",
      "Professionalism",
    ],
  },
  {
    title: "Entry-level marketing",
    skills: [
      "Canva",
      "Content writing",
      "Social media",
      "Google Sheets",
      "Research",
      "Creativity",
    ],
  },
  {
    title: "Entry-level technology role",
    skills: [
      "Basic HTML/CSS",
      "Git or version-control basics",
      "Spreadsheet analysis",
      "Troubleshooting",
      "Research",
      "Problem-solving",
    ],
  },
] as const;

const commonMistakes = [
  {
    title: "Listing every skill you can think of",
    description:
      "A long generic list can dilute relevance. Prioritize skills that match the target job and that you can explain with real evidence.",
  },
  {
    title: "Claiming advanced ability after basic exposure",
    description:
      "Completing one assignment or tutorial does not automatically make you advanced or expert. Describe your actual level accurately.",
  },
  {
    title: "Using vague skills without evidence",
    description:
      "Words such as hardworking, motivated, and team player are stronger when your projects, activities, or responsibilities demonstrate them.",
  },
  {
    title: "Copying every keyword from the job description",
    description:
      "Keyword matching should reflect your real abilities. Adding missing skills does not create experience or knowledge you do not have.",
  },
  {
    title: "Ignoring technical skills",
    description:
      "Entry-level applicants often focus only on soft skills. Relevant software, tools, research methods, languages, and practical abilities can be more specific.",
  },
  {
    title: "Hiding the strongest evidence",
    description:
      "If a project demonstrates a skill clearly, include that evidence in Projects, Education, Volunteer Experience, or another appropriate section.",
  },
] as const;

const finalChecklist = [
  "The skills I list are relevant to the target job.",
  "I can explain where I learned or used every important skill.",
  "I have not copied job-description keywords that do not match my abilities.",
  "My technical skills use accurate tool or software names.",
  "My skill level is not exaggerated.",
  "Projects, coursework, volunteering, or activities support important skills where possible.",
  "My Skills section is concise and easy to scan.",
  "I prioritize job-relevant skills over generic personality words.",
  "I use conventional resume section headings and readable text.",
  "I have checked spelling and terminology for software, tools, languages, and credentials.",
  "My resume shows evidence instead of relying only on a list of skills.",
  "I can discuss every skill honestly in an interview.",
] as const;

const faqItems = [
  {
    question: "What skills should I put on a resume if I have no experience?",
    answer:
      "Choose relevant skills you can support with real evidence from school, coursework, projects, volunteering, clubs, sports, personal projects, or other responsibilities. Common examples include communication, teamwork, research, Microsoft Office, Google Workspace, organization, time management, and problem-solving.",
  },
  {
    question: "What are the best skills for a first job resume?",
    answer:
      "The best skills depend on the job. For many entry-level roles, useful skills include communication, teamwork, reliability, organization, time management, Microsoft Word or Excel, Google Workspace, research, customer communication, and problem-solving.",
  },
  {
    question: "Can I list skills learned at school on my resume?",
    answer:
      "Yes. Skills learned through coursework, academic projects, labs, presentations, group assignments, and extracurricular activities can be relevant. Describe the context accurately and do not present academic work as professional employment.",
  },
  {
    question: "Should I include both hard skills and soft skills?",
    answer:
      "Usually yes, when both are relevant. Hard skills identify specific tools, software, methods, languages, or technical abilities. Soft skills such as communication and teamwork are stronger when supported by examples from projects, volunteering, activities, or responsibilities.",
  },
  {
    question: "How many skills should I put on my resume?",
    answer:
      "There is no universal number. A focused list of roughly 6 to 12 highly relevant skills is often easier to scan than a very long generic list. The right number depends on the job, your resume format, and how much evidence appears elsewhere.",
  },
  {
    question: "Can I put Microsoft Office on a resume with no experience?",
    answer:
      "Yes, if you have actually used the relevant applications. It is usually clearer to name the tools you know, such as Microsoft Excel, Word, or PowerPoint, instead of using a broad label when your proficiency differs by application.",
  },
  {
    question: "What skills should a student put on a resume?",
    answer:
      "Students can include relevant technical and transferable skills gained through classes, projects, presentations, volunteering, clubs, sports, and personal work. Examples include research, writing, presentations, spreadsheets, teamwork, organization, and time management.",
  },
  {
    question: "How do I prove soft skills without work experience?",
    answer:
      "Connect each soft skill to a real situation. For example, teamwork can be supported by a group project, leadership by coordinating a club activity, and organization by managing schedules, files, or event responsibilities.",
  },
  {
    question: "Should I copy skills from the job description?",
    answer:
      "Use job-description terminology only when it accurately describes your real skills. The job description is useful for prioritizing relevant abilities, but copying unsupported keywords can make the resume misleading.",
  },
  {
    question: "How do I make a skills section ATS-friendly?",
    answer:
      "Use a conventional heading such as Skills or Technical Skills, readable selectable text, accurate terminology, and relevant keywords that match your real abilities. ATS products and employer settings vary, so no keyword list or format guarantees selection.",
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

export default function SkillsToPutOnAResumeWithNoExperiencePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
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
        name: "Skills to Put on a Resume With No Experience",
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
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
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
              First Job and Entry-Level Resume Guide
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Best Skills to Put on a Resume With No Experience
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              You do not need years of employment to have useful skills. Learn
              how to identify relevant abilities from school, projects,
              volunteering, activities, and personal work—and show evidence
              without inventing experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Check Resume Against a Job
              </Link>

              <Link
                href="/resume-bullet-generator"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-900"
              >
                Improve Resume Bullets
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">
                60+ skill examples
              </span>

              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-300">
                First-job focused
              </span>

              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300">
                Evidence before claims
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Published <time dateTime="2026-08-19">August 19, 2026</time>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="quick-answer-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Quick answer
              </p>

              <h2
                id="quick-answer-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                What skills can you put on a resume with no experience?
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                Start with abilities that are relevant to the target job and
                that you can support with real evidence. That evidence can come
                from school, university, projects, volunteering, clubs, sports,
                personal projects, family-business responsibilities, or other
                genuine activities.
              </p>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Your goal is not to make yourself look experienced when you are
                not. Your goal is to show what you already know, what you have
                practiced, and what you can explain confidently in an interview.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {topSkills.map((item) => (
                  <article
                    key={item.skill}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {item.skill}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      <strong className="text-blue-300">
                        Possible evidence:
                      </strong>{" "}
                      {item.evidence}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="hard-soft-heading">
              <h2
                id="hard-soft-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Hard skills vs. soft skills: what should you include?
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                Hard skills are specific tools, software, methods, languages,
                or practical abilities. Soft skills describe how you work with
                people, tasks, deadlines, and problems.
              </p>

              <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                Entry-level resumes often need both. Technical skills can make
                your capabilities more specific, while soft skills become more
                convincing when projects and activities provide evidence.
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <article className="rounded-3xl border border-blue-500/25 bg-blue-500/5 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-blue-200">
                    30 hard skills
                  </h3>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {hardSkills.map((skill) => (
                      <li
                        key={skill}
                        className="flex gap-3 rounded-xl border border-blue-500/15 bg-slate-950/50 p-3"
                      >
                        <span className="text-blue-300">✓</span>
                        <span className="text-slate-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-emerald-200">
                    30 soft skills
                  </h3>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {softSkills.map((skill) => (
                      <li
                        key={skill}
                        className="flex gap-3 rounded-xl border border-emerald-500/15 bg-slate-950/50 p-3"
                      >
                        <span className="text-emerald-300">✓</span>
                        <span className="text-slate-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section aria-labelledby="sources-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
                Experience exists outside paid jobs
              </p>

              <h2
                id="sources-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Where do resume skills come from if you have no work experience?
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {evidenceSources.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6"
                  >
                    <h3 className="text-xl font-bold text-violet-200">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="proof-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                ResumeClimb evidence method
              </p>

              <h2
                id="proof-heading"
                className="mt-3 text-3xl font-bold tracking-tight"
              >
                Skill → evidence → resume wording
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                A skill becomes more useful when you can connect it to something
                you actually did. Instead of relying only on a Skills list,
                identify the source of the skill and describe the evidence in a
                project, education, volunteer, or experience section.
              </p>

              <div className="mt-8 space-y-6">
                {skillEvidenceExamples.map((example) => (
                  <article
                    key={`${example.skill}-${example.source}`}
                    className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
                  >
                    <div className="grid gap-5 md:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                          Skill
                        </p>

                        <p className="mt-2 font-bold text-white">
                          {example.skill}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                          Evidence source
                        </p>

                        <p className="mt-2 text-slate-300">
                          {example.source}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                          Resume wording
                        </p>

                        <p className="mt-2 leading-7 text-slate-300">
                          {example.wording}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="job-description-heading">
              <h2
                id="job-description-heading"
                className="text-3xl font-bold tracking-tight"
              >
                How to choose skills from a job description
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                The job description can help you decide which skills deserve
                space on your resume. The goal is accurate alignment—not copying
                every keyword.
              </p>

              <ol className="mt-8 space-y-5">
                {matchingSteps.map((step, index) => (
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

              <div className="mt-7 rounded-2xl border border-blue-500/25 bg-blue-500/10 p-6">
                <p className="leading-7 text-slate-300">
                  Want to compare your resume with a specific job? Use the{" "}
                  <Link
                    href="/ats-resume-checker"
                    className="font-semibold text-blue-200 hover:text-white"
                  >
                    ATS Resume Checker
                  </Link>{" "}
                  to review matched and missing terminology, then add only skills
                  you genuinely have.
                </p>
              </div>
            </section>

            <section aria-labelledby="skills-section-heading">
              <h2
                id="skills-section-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Skills section examples for a resume with no experience
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-300">
                Keep the section focused on the role. These examples show
                possible combinations, not skills you should automatically copy.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {skillsSectionExamples.map((example) => (
                  <article
                    key={example.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {example.title}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {example.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-2 text-sm text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
                ATS-friendly skills formatting
              </h2>

              <ul className="mt-6 space-y-4">
                {[
                  "Use a conventional heading such as Skills or Technical Skills.",
                  "Keep important skill names in readable, selectable text.",
                  "Use specific software and tool names when accurate.",
                  "Prioritize terminology that appears in the target job description only when it matches your abilities.",
                  "Avoid filling the section with unsupported keywords.",
                  "Support important skills elsewhere with projects, coursework, volunteering, or experience when possible.",
                  "Do not rely on icons, charts, rating bars, or graphics as the only way to communicate skill level.",
                  "Remember that ATS products and employer configurations vary; no keyword tactic guarantees selection.",
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
                  Learn how to use ATS keywords →
                </Link>

                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="font-semibold text-blue-200 hover:text-white"
                >
                  Review ATS-friendly formatting →
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
                Final skills audit
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

                    <span className="leading-6 text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Continue improving your first resume
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Link
                  href="/guides/skills-to-put-on-a-resume"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    120 Skills to Put on a Resume
                  </p>

                  <p className="mt-3 leading-7 text-slate-400">
                    Browse the broader skills guide for role-specific hard
                    skills, soft skills, technical tools, and ATS-focused
                    placement advice.
                  </p>
                </Link>

                <Link
                  href="/guides/how-to-list-education-on-resume"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    How to List Education on a Resume
                  </p>

                  <p className="mt-3 leading-7 text-slate-400">
                    Format current study, completed education, coursework,
                    training, and credentials accurately.
                  </p>
                </Link>

                <Link
                  href="/guides/resume-bullets-without-metrics"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Resume Bullets Without Metrics
                  </p>

                  <p className="mt-3 leading-7 text-slate-400">
                    Write stronger bullet points when you do not have impressive
                    numbers or formal work results.
                  </p>
                </Link>

                <Link
                  href="/guides/resume-keywords-for-ats"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    Resume Keywords for ATS
                  </p>

                  <p className="mt-3 leading-7 text-slate-400">
                    Learn how to identify relevant job-description terminology
                    without keyword stuffing.
                  </p>
                </Link>

                <Link
                  href="/guides/ats-friendly-resume-format"
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <p className="text-lg font-bold text-white">
                    ATS-Friendly Resume Format
                  </p>

                  <p className="mt-3 leading-7 text-slate-400">
                    Keep your resume readable for recruiters and easier for
                    applicant tracking systems to process.
                  </p>
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq-heading">
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

            <section className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 sm:p-8">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Turn your real skills into stronger resume bullets
              </h2>

              <p className="mt-4 leading-8 text-slate-300">
                Once you identify a real project, responsibility, or
                achievement, use the bullet generator to improve the wording
                without inventing experience or results.
              </p>

              <Link
                href="/resume-bullet-generator"
                className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
              >
                Use the Resume Bullet Generator
              </Link>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                In this guide
              </p>

              <nav className="mt-5 space-y-3 text-sm">
                <a
                  href="#quick-answer-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Best skills
                </a>

                <a
                  href="#hard-soft-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Hard vs. soft skills
                </a>

                <a
                  href="#sources-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Where skills come from
                </a>

                <a
                  href="#proof-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Skill → evidence → wording
                </a>

                <a
                  href="#job-description-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Match the job description
                </a>

                <a
                  href="#skills-section-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  Skills-section examples
                </a>

                <a
                  href="#ats-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  ATS guidance
                </a>

                <a
                  href="#faq-heading"
                  className="block text-slate-300 hover:text-white"
                >
                  FAQ
                </a>
              </nav>
            </div>

            <div className="rounded-2xl border border-blue-500/25 bg-blue-500/10 p-6">
              <h2 className="text-xl font-bold text-white">
                Check your resume
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Compare your resume with a target job and review matched and
                missing terminology.
              </p>

              <Link
                href="/ats-resume-checker"
                className="mt-5 inline-flex font-semibold text-blue-200 hover:text-white"
              >
                Use the ATS Resume Checker →
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <HumanAtsReviewCta source="resume-skills-guide" />

      <footer className="border-t border-slate-900 px-4 py-8 text-center text-sm text-slate-400">
        © 2026 ResumeClimb AI. Skill examples should be adapted only when they
        accurately reflect your own abilities and evidence.
      </footer>
    </main>
  );
}