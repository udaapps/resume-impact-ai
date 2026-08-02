import Link from "next/link";

export const ATS_RESUME_CHECKER_FAQS = [
  {
    question: "What is an ATS resume checker?",
    answer:
      "An ATS resume checker compares resume content with a target job description. It highlights keyword alignment, section structure, bullet quality, formatting risks, and other practical improvement opportunities.",
  },
  {
    question: "Is this ATS resume checker free?",
    answer:
      "Yes. You can paste your resume and a target job description, run an analysis, review the estimated score, and inspect the recommendations without paying for the core check.",
  },
  {
    question: "Does a high ATS score guarantee an interview?",
    answer:
      "No. The score is an estimate for resume-to-job alignment. Employers use different systems and hiring criteria, so no checker can guarantee an interview, screening result, or job offer.",
  },
  {
    question: "Should I add every missing keyword?",
    answer:
      "No. Add a missing keyword only when it accurately reflects your skills, experience, qualifications, tools, or responsibilities. Never add claims that you cannot support.",
  },
  {
    question: "What resume format is usually easiest for ATS software to read?",
    answer:
      "A simple single-column layout with clear headings, standard fonts, readable dates, and ordinary bullet points is usually safer than a design that relies on text boxes, complex tables, icons, or graphics.",
  },
  {
    question: "Can I use the checker for different job applications?",
    answer:
      "Yes. Run a separate comparison for each target job description because required skills, responsibilities, and keywords can change from one role to another.",
  },
] as const;

const analysisItems = [
  {
    title: "Keyword alignment",
    description:
      "See which important skills and job-specific terms appear in both your resume and the vacancy.",
  },
  {
    title: "Resume structure",
    description:
      "Check whether common ATS-friendly sections such as summary, skills, experience, education, and projects are detected.",
  },
  {
    title: "Bullet and achievement quality",
    description:
      "Review action verbs, measurable outcomes, weak phrases, and opportunities to make experience bullets more specific.",
  },
  {
    title: "Formatting and readability",
    description:
      "Identify long paragraphs, long sentences, missing contact details, and formatting patterns that may reduce clarity.",
  },
] as const;

const scoreRanges = [
  {
    range: "80–100",
    label: "Strong match",
    description:
      "The resume is well aligned, but every recommendation should still be reviewed for accuracy and relevance.",
  },
  {
    range: "60–79",
    label: "Good foundation",
    description:
      "The resume covers many requirements but may still need stronger keywords, bullets, or section-level improvements.",
  },
  {
    range: "40–59",
    label: "Needs improvement",
    description:
      "Important requirements may be missing or underrepresented. Prioritize the highest-impact recommendations first.",
  },
  {
    range: "0–39",
    label: "Low match",
    description:
      "The resume and target role may have limited alignment, or the resume may need substantial restructuring and tailoring.",
  },
] as const;

const formattingChecklist = [
  "Use a clear single-column layout.",
  "Choose standard section headings.",
  "Use readable fonts and consistent spacing.",
  "Write dates in a consistent format.",
  "Avoid complex tables, graphics, and text boxes.",
  "Use ordinary bullet points for experience.",
  "Include a professional email and phone number.",
  "Save a clean PDF or DOCX when the employer allows it.",
] as const;

export default function AtsResumeCheckerSeoContent() {
  return (
    <div className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section
          id="what-the-checker-analyzes"
          aria-labelledby="what-the-checker-analyzes-title"
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/10 sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            ATS analysis guide
          </p>
          <h2
            id="what-the-checker-analyzes-title"
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            What this free ATS resume checker analyzes
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base">
            The checker compares the language and structure of your resume
            with one target job description. It is designed to help you find
            practical improvement opportunities before submitting an
            application.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {analysisItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-to-use"
          aria-labelledby="how-to-use-title"
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
        >
          <h2
            id="how-to-use-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            How to use the ATS resume checker
          </h2>

          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Paste your resume",
                description:
                  "Use the text from your current resume. Remove sensitive details that are not needed for the analysis.",
              },
              {
                step: "2",
                title: "Add the target job description",
                description:
                  "Paste the complete vacancy so the checker can compare required skills, responsibilities, and experience.",
              },
              {
                step: "3",
                title: "Review and improve",
                description:
                  "Use the score, missing keywords, formatting findings, and bullet recommendations as a practical editing checklist.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 font-bold text-blue-300">
                  {item.step}
                </span>
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="ats-score-guide"
          aria-labelledby="ats-score-guide-title"
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
        >
          <h2
            id="ats-score-guide-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            How to understand your estimated ATS score
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base">
            The score summarizes several signals from the current resume and
            job description. Treat it as a prioritization tool rather than an
            official employer result.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {scoreRanges.map((item) => (
              <article
                key={item.range}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <p className="text-2xl font-bold text-blue-300">{item.range}</p>
                <h3 className="mt-2 font-semibold text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-amber-500/25 bg-amber-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              What missing resume keywords mean
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Missing keywords are important words or phrases found in the job
              description but not clearly represented in your resume. They may
              include tools, qualifications, responsibilities, methods, or
              role-specific skills.
            </p>
            <p className="mt-4 text-sm leading-7 text-amber-200">
              Add a keyword only when it truthfully reflects your real
              experience. Keyword stuffing and unsupported claims can make a
              resume less credible.
            </p>
          </article>

          <article className="rounded-3xl border border-violet-500/25 bg-violet-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Before-and-after resume bullet example
            </h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-red-500/25 bg-slate-950/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
                  Before
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Responsible for helping customers.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  After
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Resolved customer inquiries across phone and email,
                  improving satisfaction through timely support.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section
          id="resume-formatting-checklist"
          aria-labelledby="resume-formatting-checklist-title"
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
        >
          <h2
            id="resume-formatting-checklist-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            ATS-friendly resume formatting checklist
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {formattingChecklist.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-300"
                >
                  ✓
                </span>
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="ats-faq-title"
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
        >
          <h2
            id="ats-faq-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            ATS resume checker FAQ
          </h2>
          <div className="mt-6 space-y-3">
            {ATS_RESUME_CHECKER_FAQS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-white">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-xl text-blue-300 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="related-resume-tools-title"
          className="rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-6 sm:p-8"
        >
          <h2
            id="related-resume-tools-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Related resume tools
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Continue improving your resume with the free bullet generator,
            AI bullet rewriter, saved analysis history, and resume analytics.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              AI Resume Bullet Generator
            </Link>
            <Link
              href="/ats-resume-checker#ats-bullet-rewriter-title"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
            >
              AI Resume Bullet Rewriter
            </Link>
            <Link
              href="/ats-resume-checker#ats-history-title"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
            >
              Saved ATS Analysis History
            </Link>
            <Link
              href="/dashboard/analytics"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-white"
            >
              Resume Analytics
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
