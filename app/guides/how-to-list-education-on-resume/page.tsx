import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.resumeclimbai.com";

export const metadata: Metadata = {
  title: "How to List Education in Progress on Your Resume (2026 Guide) | ResumeClimb AI",
  description: "Learn exactly how to list ongoing education, degrees in progress, and current training on your resume with practical examples.",
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-list-education-on-resume`,
  },
};

export default function EducationInProgressGuide() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-300">
      
      {/* Top Header Section (Similar to your image) */}
      <header className="border-b border-slate-800/60 bg-[#0B1120] px-4 py-12 sm:px-6 lg:px-8 xl:py-20">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm font-medium text-slate-400">
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
              href="/guides"
              className="rounded-lg border border-slate-700 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Review ATS-Friendly Formatting
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400 border border-emerald-500/20">Clear Examples</span>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 border border-blue-500/20">ATS Optimized</span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-400 border border-amber-500/20">No false degree status</span>
          </div>
          
          <p className="mt-8 text-xs text-slate-500">
            Published September 15, 2026
          </p>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-8 xl:py-16">
        
        {/* Left Column (Main Article) */}
        <article className="flex-1 lg:max-w-3xl">
          
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-6">
            Show Verified Learning and Credentials
          </h2>

          <div className="mb-10 rounded-2xl border border-blue-900/30 bg-blue-950/20 p-6 sm:p-8">
            <p className="font-mono text-sm text-blue-200 mb-4">
              [Degree/Program Name] | [Institution Name] | [Expected Graduation Date]
            </p>
            <p className="font-mono text-sm text-slate-400">
              Optional: [Relevant Coursework] | [Current GPA if high]
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Step 1 Card */}
            <div className="flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                1
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">Always Include the Expected Graduation Date</h3>
                <p className="text-slate-400 leading-relaxed">
                  Recruiters need to know when you will be available for full-time work or when you will officially hold the qualification. Instead of writing "Present," explicitly use the term <strong>"Expected [Month, Year]"</strong> to maintain ATS compliance.
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                2
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">State the Degree You Are Pursuing</h3>
                <p className="text-slate-400 leading-relaxed">
                  Be clear about the specific degree or certification you are working towards. Avoid vague terms and use the official title of the program (e.g., "Bachelor of Science in Computer Science").
                </p>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="flex gap-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-sm font-bold text-blue-400">
                3
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold text-white">Include Relevant Coursework</h3>
                <p className="text-slate-400 leading-relaxed">
                  If you lack work experience, listing 3 to 4 subjects relevant to the job can highlight your current knowledge and show recruiters what you are currently learning.
                </p>
              </div>
            </div>

          </div>

          {/* Examples Section */}
          <h3 className="mt-16 mb-8 text-2xl font-bold text-white">Examples of Ongoing Education</h3>
          
          <div className="mb-6 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: University Degree</h4>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">Bachelor of Science in Computer Science</p>
              <p className="text-slate-400">University of Colombo, Sri Lanka</p>
              <p className="text-slate-400">Expected Graduation: May 2027</p>
              <p className="mt-2 text-sm italic text-slate-500">Relevant Coursework: Data Structures, Web Development, Database Management</p>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-slate-800 bg-[#0F172A] p-8">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Example: Certification</h4>
            <div className="pl-4 border-l-2 border-slate-700">
              <p className="font-bold text-white">AWS Certified Solutions Architect – Associate</p>
              <p className="text-slate-400">Amazon Web Services</p>
              <p className="text-slate-400">Expected Completion: December 2026</p>
            </div>
          </div>

          {/* Warning Section */}
          <div className="rounded-2xl border border-amber-900/30 bg-amber-950/10 p-8">
            <h3 className="mb-4 text-lg font-bold text-amber-500">Truth-First Rules (What to Avoid)</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-3">
                <span className="text-amber-500">×</span>
                Do not lie about having completed the degree. Background checks will reveal the truth.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500">×</span>
                Do not list unrelated high school education if you are already halfway through a university degree.
              </li>
            </ul>
          </div>

        </article>

        {/* Right Column (Sidebar / Table of Contents) */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="sticky top-8 rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
            <h3 className="mb-4 text-sm font-bold text-white">On this page</h3>
            <nav className="flex flex-col space-y-3 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition">Entry template</a>
              <a href="#" className="hover:text-white transition">Expected Graduation Date</a>
              <a href="#" className="hover:text-white transition">State the Degree</a>
              <a href="#" className="hover:text-white transition">Relevant Coursework</a>
              <a href="#" className="hover:text-white transition">Practical Examples</a>
              <a href="#" className="hover:text-white transition">Truth-first rules</a>
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