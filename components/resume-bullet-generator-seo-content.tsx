import Link from "next/link";

export const resumeBulletGeneratorFaqs = [
  {
    question: "What is an AI resume bullet generator?",
    answer:
      "An AI resume bullet generator turns a job responsibility into clearer, more professional resume bullet options. ResumeClimb AI uses your job title, experience level, responsibility, achievement, and metric to create wording you can review and adapt.",
  },
  {
    question: "Is the resume bullet generator free?",
    answer:
      "Yes. The free plan currently provides up to five generations per day, with three resume bullet options in each generation.",
  },
  {
    question: "Are the generated resume bullets ATS-friendly?",
    answer:
      "The generator is designed to produce clear, action-oriented wording that is easier for recruiters and applicant tracking systems to interpret. You should still compare every bullet with the target job description and keep only truthful claims.",
  },
  {
    question: "Should every resume bullet include a number?",
    answer:
      "No. A verified metric can strengthen a bullet, but you should never invent a number. When no metric is available, describe the scope, method, audience, quality improvement, or business outcome accurately.",
  },
  {
    question: "Can I use the generated text without editing it?",
    answer:
      "Review and personalize every generated bullet before using it. Keep only statements that accurately reflect your real duties, skills, achievements, and results.",
  },
  {
    question: "How is this different from an ATS resume checker?",
    answer:
      "The bullet generator improves individual experience statements. The ATS resume checker compares a complete resume with a target job description and identifies keyword, structure, formatting, and readability gaps.",
  },
] as const;

const roleExamples = [
  {
    role: "Customer Service",
    weak: "Responsible for helping customers.",
    strong:
      "Resolved customer inquiries across phone and email, providing timely support and maintaining a positive customer experience.",
  },
  {
    role: "Software Engineering",
    weak: "Worked on API development.",
    strong:
      "Developed and maintained REST APIs that supported scalable application features and improved data exchange across services.",
  },
  {
    role: "Marketing",
    weak: "Managed social media accounts.",
    strong:
      "Planned and published social media content across key channels, supporting consistent brand communication and audience engagement.",
  },
  {
    role: "Administration",
    weak: "Handled office tasks.",
    strong:
      "Coordinated schedules, maintained records, and supported daily administrative workflows to keep office operations organized.",
  },
  {
    role: "Sales",
    weak: "Talked to customers and sold products.",
    strong:
      "Engaged prospective customers, identified their needs, and recommended suitable solutions to support sales conversations.",
  },
  {
    role: "Project Management",
    weak: "Helped manage projects.",
    strong:
      "Tracked project tasks, coordinated stakeholder updates, and supported delivery against agreed timelines and priorities.",
  },
] as const;

export default function ResumeBulletGeneratorSeoContent() {
  return (
    <section className="border-t border-slate-900 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Resume Bullet Writing Guide
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Create clear, achievement-focused resume bullet points
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
            A strong resume bullet explains what you did, how you did it,
            and the result or value of the work. Use the generator above to
            create options, then edit each statement so it accurately matches
            your experience and the job you are targeting.
          </p>
        </header>

        <section aria-labelledby="how-it-works-heading">
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-400">How it works</p>
            <h2
              id="how-it-works-heading"
              className="mt-3 text-3xl font-bold text-white sm:text-4xl"
            >
              Generate stronger bullets in three steps
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Describe the responsibility",
                description:
                  "Enter the real task, duty, or project you completed in straightforward language.",
              },
              {
                step: "2",
                title: "Add a verified result",
                description:
                  "Include an achievement, metric, scope, or improvement only when it is accurate.",
              },
              {
                step: "3",
                title: "Review and personalize",
                description:
                  "Choose the best generated option and adjust it to match your voice and target role.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-300">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-semibold text-emerald-400">
              Weak versus strong example
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Replace generic duties with useful context
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Generic bullets make it difficult to understand your contribution.
              Stronger bullets begin with a clear action and explain the work,
              audience, method, or result without adding unverified claims.
            </p>
          </div>

          <div className="space-y-4">
            <article className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-300">
                Before
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Responsible for helping customers.
              </p>
            </article>

            <article className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                After
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-100">
                Resolved customer inquiries across phone and email, providing
                timely support and maintaining a positive customer experience.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-7 sm:p-10">
          <p className="font-semibold text-blue-300">Simple writing formula</p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Action + task + context + verified result
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-slate-300">
            Start with a strong action verb, explain the task or responsibility,
            add relevant context such as the tool, team, audience, or process,
            and finish with a verified result when one is available.
          </p>
          <div className="mt-7 rounded-2xl border border-blue-400/20 bg-slate-950/50 p-5 font-medium leading-8 text-blue-100">
            Example: Coordinated weekly project updates across three teams,
            improving visibility of deadlines and unresolved risks.
          </div>
        </section>

        <section aria-labelledby="role-examples-heading">
          <div className="max-w-3xl">
            <p className="font-semibold text-violet-400">
              Resume bullet examples by role
            </p>
            <h2
              id="role-examples-heading"
              className="mt-3 text-3xl font-bold text-white sm:text-4xl"
            >
              Use these examples as writing patterns
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Do not copy an example unless it accurately describes your work.
              Replace the task, tools, scope, and results with your own verified
              information.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {roleExamples.map((example) => (
              <article
                key={example.role}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {example.role}
                </h3>
                <div className="mt-5 space-y-4 text-sm leading-7">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <span className="font-semibold text-red-300">Weak: </span>
                    <span className="text-slate-400">{example.weak}</span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <span className="font-semibold text-emerald-300">
                      Stronger: {" "}
                    </span>
                    <span className="text-slate-300">{example.strong}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-semibold text-amber-400">
              ATS-friendly writing tips
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Improve clarity without keyword stuffing
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Use job-relevant terms only when they truthfully match your experience.",
              "Begin bullets with specific action verbs instead of passive phrases.",
              "Keep each bullet focused on one responsibility or achievement.",
              "Use verified numbers for revenue, time, volume, quality, or team size.",
              "Avoid first-person pronouns such as I, me, and my in bullet points.",
              "Compare the final resume with the complete target job description.",
            ].map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 leading-7 text-slate-300"
              >
                <span className="mr-2 text-emerald-400">✓</span>
                {tip}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-blue-400">Questions and answers</p>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-bold text-white sm:text-4xl"
            >
              AI resume bullet generator FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {resumeBulletGeneratorFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-8 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="font-semibold text-blue-400">Related resume tools</p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Check the complete resume before applying
              </h2>
              <p className="mt-4 leading-8 text-slate-400">
                Generate stronger experience bullets, then compare your full
                resume with the target job description to find missing keywords,
                weak sections, formatting issues, and readability problems.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="#generator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
              >
                Generate Resume Bullets
              </Link>
              <Link
                href="/ats-resume-checker"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Open ATS Resume Checker
              </Link>
            </div>
          </div>
        </section>

        <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-slate-500">
          AI-generated resume content is a writing aid. Review every statement
          and keep only claims that accurately reflect your real experience,
          responsibilities, skills, and results. Generated wording and ATS
          analysis do not guarantee interviews or job offers.
        </p>
      </div>
    </section>
  );
}
