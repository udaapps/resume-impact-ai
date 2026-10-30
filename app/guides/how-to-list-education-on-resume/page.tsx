import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.resumeclimbai.com";

export const metadata: Metadata = {
  title: "How to List Education in Progress on Your Resume (2026 Guide)",
  description: "List education in progress on your resume with examples for expected graduation, an unknown completion date, unfinished degrees, and certification preparation.",
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-list-education-on-resume`,
  },
};

export default function EducationInProgressGuide() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-300">
      
      {/* Top Header Section */}
      <header className="border-b border-slate-800/60 bg-[#0B1120] px-4 py-12 sm:px-6 lg:px-8 xl:py-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-blue-400">Resume Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Resume Education</span>
          </nav>
          
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
            Truth-First Education Guide
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How to List Education in Progress on a Resume
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Format ongoing, unfinished, and expected degrees accurately for Applicant Tracking Systems (ATS) without misleading recruiters.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ats-resume-checker"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Check Resume Against a Job
            </Link>
            <Link
              href="/guides/ats-friendly-resume-format"
              className="rounded-lg border border-slate-700 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Review ATS-Friendly Formatting
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400 border border-emerald-500/20">Clear Examples</span>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 border border-blue-500/20">Clear education status</span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-400 border border-amber-500/20">No false degree status</span>
          </div>
          
          <p className="mt-8 text-xs text-slate-500">
            Published September 15, 2026 · Updated October 30, 2026
          </p>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-8 xl:py-16">
        
        {/* Left Column (Main Article) */}
        <article className="min-w-0 flex-1 lg:max-w-3xl">
          
          <h2 id="entry-template" className="scroll-mt-8 text-xs font-bold uppercase tracking-widest text-blue-500 mb-6">
            Show Verified Learning and Credentials
          </h2>
          <p className="mb-6 leading-relaxed text-slate-400">
            List your official degree or program name, institution, and current status under an Education heading. Add an expected graduation date when you have a realistic estimate. If you stopped studying, describe the coursework you completed rather than presenting the degree as earned or still in progress.
          </p>

          <div className="mb-10 rounded-2xl border border-blue-900/30 bg-blue-950/20 p-6 sm:p-8">
            <p className="font-mono text-sm text-blue-200 mb-4">
              [Degree/Program Name] — In progress | [Institution Name] | [Expected Graduation Date, if known]
            </p>
            <p className="font-mono text-sm text-slate-400">
              Optional: [Relevant Coursework] | [Current GPA if high]
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Step 1 Card */}
            <div id="expected-graduation" className="scroll-mt-8 flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                1
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">Include an Expected Graduation Date When Known</h3>
                <p className="text-slate-400 leading-relaxed">
                  A realistic <strong>&quot;Expected [Month, Year]&quot;</strong> helps recruiters understand when you expect to complete your studies. If only the year is known, use &quot;Expected [Year].&quot; If the timing is uncertain, say &quot;In progress&quot; or &quot;Currently enrolled&quot; and leave out an estimated completion date. Do not invent a date to fill the template.
                </p>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  This wording clarifies your status; it does not guarantee how an ATS will read or assess your resume. Follow any education and date instructions in the application form.
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div id="degree-status" className="scroll-mt-8 flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                2
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">State the Degree You Are Pursuing</h3>
                <p className="text-slate-400 leading-relaxed">
                  Use the official title of the program, such as &quot;Bachelor of Science in Computer Science,&quot; and make clear that it is in progress. The same approach works for a diploma or certificate program. Only describe a qualification as awarded or completed after you have earned it.
                </p>
              </div>
            </div>

            {/* Step 3 Card */}
            <div id="relevant-coursework" className="scroll-mt-8 flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                3
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">Include Relevant Coursework</h3>
                <p className="text-slate-400 leading-relaxed">
                  If you have limited work experience, a few subjects or projects relevant to the job can help show what you have learned. Distinguish completed coursework from subjects you are currently taking, and leave out courses you have not started.
                </p>
              </div>
            </div>

          </div>

          {/* Examples Section */}
          <h2 id="education-examples" className="scroll-mt-8 mt-16 mb-4 text-2xl font-bold text-white">Education in Progress and Unfinished Degree Examples</h2>
          <p className="mb-8 leading-relaxed text-slate-400">
            These are illustrative templates, not records of a real applicant. Replace the institution, program, dates, and coursework with your own accurate details.
          </p>
          
          <div className="mb-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: Degree with an Expected Graduation Date</h3>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">Bachelor of Science in Computer Science</p>
              <p className="text-slate-400">[University Name]</p>
              <p className="text-slate-400">Expected Graduation: May 2027</p>
              <p className="mt-2 text-sm italic text-slate-400">Completed Coursework: Data Structures, Web Development, Database Management</p>
            </div>
          </div>

          <div id="unknown-graduation-date" className="scroll-mt-8 mb-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: Graduation Date Not Yet Known</h3>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">Bachelor of Business Administration — In progress</p>
              <p className="text-slate-400">[University Name]</p>
              <p className="text-slate-400">Currently enrolled</p>
              <p className="mt-2 text-sm italic text-slate-400">Completed Coursework: Business Communication, Introduction to Accounting</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Use this format only if you are currently studying. Add an expected completion date later when you can reasonably estimate it. If you are no longer enrolled, use an unfinished-study format instead.
            </p>
          </div>

          <div id="unfinished-degree" className="scroll-mt-8 mb-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: Unfinished Degree When You Are No Longer Enrolled</h3>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">Coursework toward a Bachelor of Science in Computer Science</p>
              <p className="text-slate-400">[University Name] | Attended 2022–2024</p>
              <p className="text-slate-400">Degree not completed</p>
              <p className="mt-2 text-sm italic text-slate-400">Completed Coursework: Programming Fundamentals, Database Management</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Include unfinished study when it helps explain relevant knowledge or experience. List the dates you actually attended. If you include credits, use the number shown on your transcript; do not add an expected graduation date unless you have resumed study and have a realistic completion plan.
            </p>
          </div>

          <div className="mb-12 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: Preparing for a Certification Exam</h3>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">Preparing for the AWS Certified Solutions Architect – Associate exam</p>
              <p className="text-slate-400">Exam preparation in progress; certification not yet earned</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Put relevant exam preparation under Training or Professional Development. A preparation course is different from an awarded certification. Add an exam date only if it is scheduled, and do not describe yourself as certified before you earn the credential.
            </p>
          </div>

          {/* Warning Section */}
          <div id="truth-first-rules" className="scroll-mt-8 rounded-2xl border border-amber-900/30 bg-amber-950/10 p-8">
            <h2 className="mb-4 text-lg font-bold text-amber-500">Truth-First Rules</h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-amber-500">✓</span>
                Keep your education status consistent with your institution&apos;s records. Employers may verify qualifications, attendance, or completion dates.
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-amber-500">✓</span>
                Prioritize education relevant to the role and your career stage. Include high school details when they are useful or requested, rather than treating them as always required or always inappropriate.
              </li>
            </ul>
          </div>

          <section className="mt-10 border-t border-slate-800 pt-8">
            <h2 className="mb-4 text-lg font-bold text-white">Further Reading</h2>
            <p className="mb-4 text-sm leading-6 text-slate-400">
              Harvard&apos;s career guidance explains how an expected graduation date can help recruiters understand timing. AWS describes exam preparation separately from earning its certification.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://careerservices.fas.harvard.edu/blog/2026/09/15/resumes-for-industry-grad-student-edition-2026/" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">Harvard MCS: Resumes for Industry</a>
              </li>
              <li>
                <a href="https://aws.amazon.com/certification/certified-solutions-architect-associate/" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">AWS: Solutions Architect – Associate certification and exam preparation</a>
              </li>
            </ul>
          </section>

        </article>

        {/* Right Column (Sidebar / Table of Contents) */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="sticky top-8 rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
            <h3 className="mb-4 text-sm font-bold text-white">On this page</h3>
            <nav aria-label="On this page" className="flex flex-col space-y-3 text-sm text-slate-400">
              <a href="#entry-template" className="hover:text-white transition">Entry template</a>
              <a href="#expected-graduation" className="hover:text-white transition">Expected graduation date</a>
              <a href="#degree-status" className="hover:text-white transition">Degree and status</a>
              <a href="#relevant-coursework" className="hover:text-white transition">Relevant coursework</a>
              <a href="#education-examples" className="hover:text-white transition">Practical examples</a>
              <a href="#unknown-graduation-date" className="hover:text-white transition">Unknown graduation date</a>
              <a href="#unfinished-degree" className="hover:text-white transition">Unfinished degree</a>
              <a href="#truth-first-rules" className="hover:text-white transition">Truth-first rules</a>
            </nav>
            
            <div className="mt-8 border-t border-slate-800 pt-6">
              <Link
                href="/ats-resume-checker"
                className="block w-full rounded-lg bg-blue-600/10 border border-blue-600/30 px-4 py-3 text-center text-sm font-bold text-blue-400 transition hover:bg-blue-600/20"
              >
                Scan Resume with AI
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
