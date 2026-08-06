import Link from "next/link";

const guides = [
  {
    href: "/guides/resume-bullets-without-metrics",
    label: "Resume Writing Guide",
    title: "How to Write Strong Resume Bullets Without Metrics",
    description:
      "Learn how to show scope, ownership, skill, and impact when you do not have reliable numbers or percentages.",
  },
  {
    href: "/guides/customer-service-resume-bullets",
    label: "Customer Service",
    title: "Customer Service Resume Bullet Examples",
    description:
      "Write clearer customer service resume bullets using strong action verbs, relevant skills, and credible results.",
  },
  {
    href: "/guides/software-engineer-resume-bullets",
    label: "Software Engineering",
    title: "Software Engineer Resume Bullet Examples",
    description:
      "Turn technical responsibilities into focused resume bullets that communicate engineering work and business value.",
  },
] as const;

export default function ResumeGuideLinks() {
  return (
    <section
      aria-labelledby="resume-guides-heading"
      className="bg-slate-950 px-4 pb-16 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Free Resume Writing Guides
            </p>

            <h2
              id="resume-guides-heading"
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            >
              Learn how to write stronger resume bullet points
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Use these practical guides to improve your resume with truthful,
              role-relevant examples before checking it for ATS alignment.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-blue-700 hover:bg-slate-900"
              >
                <article>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                    {guide.label}
                  </p>

                  <h3 className="mt-3 text-lg font-semibold leading-7 text-white transition group-hover:text-blue-300">
                    {guide.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {guide.description}
                  </p>

                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
                    Read guide
                    <span aria-hidden="true" className="ml-1">
                      →
                    </span>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}