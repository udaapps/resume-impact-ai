import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | ResumeClimb AI",
  description:
    "Terms of Use for ResumeClimb AI, including acceptable use, AI-generated content, resume accuracy, and service limitations.",
  alternates: {
    canonical: "https://www.resumeclimbai.com/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Terms of Use
        </h1>

        <p className="mt-4 text-slate-400">
          Last updated: August 24, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. About ResumeClimb AI
            </h2>
            <p className="mt-3">
              ResumeClimb AI provides resume-writing tools, job-description
              comparison features, ATS-related educational estimates, and
              practical career guidance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. Your responsibility
            </h2>
            <p className="mt-3">
              You are responsible for reviewing and verifying all information
              before using it in a resume, job application, or other
              professional document. Do not add skills, qualifications,
              achievements, metrics, or experience that are not true.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. AI-generated content
            </h2>
            <p className="mt-3">
              AI-generated suggestions may be incomplete, inaccurate, or
              unsuitable for a particular job. ResumeClimb AI is designed to
              help improve wording and relevance, not to replace your own
              judgment or verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. ATS scores and job outcomes
            </h2>
            <p className="mt-3">
              ATS scores, keyword matches, and resume assessments are
              educational estimates only. They do not represent an employer's
              actual applicant tracking system and do not guarantee interviews,
              employment, rankings, or other outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. Acceptable use
            </h2>
            <p className="mt-3">
              You may not misuse the service, attempt unauthorized access,
              interfere with its operation, use it for unlawful purposes, or
              submit content that violates applicable laws or third-party
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Availability and changes
            </h2>
            <p className="mt-3">
              Features may be updated, changed, suspended, or discontinued at
              any time. We do not guarantee uninterrupted or error-free
              availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Limitation of liability
            </h2>
            <p className="mt-3">
              To the extent permitted by law, ResumeClimb AI is provided
              without guarantees regarding employment outcomes or the accuracy
              of AI-generated suggestions. Users remain responsible for their
              final documents and decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              8. Contact
            </h2>
            <p className="mt-3">
              If you have questions about these Terms of Use, contact us through
              the contact method provided on ResumeClimb AI.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}