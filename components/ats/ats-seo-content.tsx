const SITE_URL =
  "https://www.resumeclimbai.com";

const PAGE_URL =
  `${SITE_URL}/ats-resume-checker`;

const FAQ_ITEMS = [
  {
    question:
      "What is an ATS resume checker?",
    answer:
      "An ATS resume checker estimates how well a resume matches a job description by reviewing keywords, skills, resume sections, achievements, formatting, and readability.",
  },
  {
    question:
      "How do I check my resume ATS score?",
    answer:
      "Paste your resume text and the complete target job description into ResumeClimb AI, then select Analyze Resume Match. The tool returns an estimated ATS score and improvement recommendations.",
  },
  {
    question:
      "Is the ResumeClimb AI ATS checker free?",
    answer:
      "Yes. You can use the ATS resume checker to compare your resume with a job description and review the generated analysis.",
  },
  {
    question:
      "What is a good ATS resume score?",
    answer:
      "There is no universal ATS score used by every employer. A higher estimated score usually indicates stronger alignment, but the resume must also remain accurate, readable, and relevant.",
  },
  {
    question:
      "Should I add every missing keyword?",
    answer:
      "No. Add a missing keyword only when it truthfully represents your skills or experience. Never add qualifications, tools, or achievements that you do not have.",
  },
  {
    question:
      "Can an ATS resume checker guarantee an interview?",
    answer:
      "No. ATS results are estimates and cannot guarantee an interview. Hiring decisions also depend on experience, qualifications, competition, recruiter review, and employer requirements.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,

    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const WEB_APPLICATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",

  name: "ResumeClimb AI ATS Resume Checker",
  alternateName: "Free ATS Resume Checker",

  url: PAGE_URL,

  description:
    "Compare your resume with a job description and receive an estimated ATS score, keyword analysis, resume section checks, achievement analysis, formatting checks, readability insights, and actionable recommendations.",

  applicationCategory:
    "BusinessApplication",

  operatingSystem: "Any",

  browserRequirements:
    "Requires JavaScript and a modern web browser",

  inLanguage: "en-US",

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },

  featureList: [
    "Estimated ATS resume match score",
    "Resume and job description comparison",
    "Matched keyword detection",
    "Missing keyword detection",
    "Resume section analysis",
    "Achievement analysis",
    "Formatting analysis",
    "Readability analysis",
    "Resume improvement recommendations",
  ],

  creator: {
    "@type": "Organization",
    name: "UDA Apps",
    url: SITE_URL,
  },
};

function JsonLd({
  data,
}: {
  data: Record<string, unknown>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}

export default function AtsSeoContent() {
  return (
    <>
      <JsonLd data={FAQ_SCHEMA} />

      <JsonLd
        data={WEB_APPLICATION_SCHEMA}
      />

      <section
        aria-labelledby="ats-seo-heading"
        className="bg-slate-950 px-4 pb-16 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Free ATS Resume Analysis
              </p>

              <h2
                id="ats-seo-heading"
                className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              >
                Improve your resume for ATS
                systems and recruiter review
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                ResumeClimb AI is a free ATS
                resume checker that compares your
                resume with a target job
                description. It provides an
                estimated resume match score and
                analyzes important job keywords,
                required skills, experience
                alignment, resume structure,
                achievement quality, formatting,
                and readability.
              </p>

              <p className="mt-4 leading-8 text-slate-300">
                Use the results to identify
                genuine missing skills, strengthen
                weak resume bullets, add
                measurable achievements, improve
                ATS-friendly section headings,
                and make your resume easier for
                recruiters to scan. Only include
                keywords, technologies, and
                qualifications that accurately
                represent your real experience.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title:
                    "ATS Keyword Analysis",
                  description:
                    "Compare your resume with the target job description and identify matched and missing skills.",
                },
                {
                  title:
                    "Resume Section Checker",
                  description:
                    "Detect important sections such as Summary, Skills, Experience, Education, and Projects.",
                },
                {
                  title:
                    "Achievement Analysis",
                  description:
                    "Review action verbs, percentages, numbers, and measurable results in your experience bullets.",
                },
                {
                  title:
                    "Formatting and Readability",
                  description:
                    "Find missing contact details, weak phrases, long sentences, repetition, and formatting issues.",
                },
              ].map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <h3 className="font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 border-t border-slate-800 pt-10">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Frequently Asked Questions
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  ATS resume checker questions
                </h2>

                <p className="mt-4 leading-7 text-slate-400">
                  Learn how ATS resume matching,
                  keyword analysis, and resume
                  optimization work.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {FAQ_ITEMS.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-white">
                      <span>
                        {item.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-xl text-blue-400 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-6 text-slate-400">
                ResumeClimb AI provides
                estimated results only and cannot
                guarantee employer ATS performance,
                interviews, or hiring outcomes.
              </p>

              <a
                href="/"
                className="shrink-0 font-semibold text-blue-400 transition hover:text-blue-300"
              >
                AI Resume Bullet Generator →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
