# ResumeClimb AI

**Free, truth-first AI tools for writing stronger resume bullets and comparing a resume with a target job description.**

[Visit ResumeClimb AI](https://www.resumeclimbai.com)

ResumeClimb AI helps job seekers present genuine responsibilities, skills, projects, and achievements more clearly. The platform combines practical resume-writing guidance with AI-assisted tools while reminding users to verify every final claim.

## Core tools

### AI Resume Bullet Generator

Turn a real responsibility, achievement, and optional verified metric into clearer, achievement-focused resume bullet options.

[Open the free AI Resume Bullet Generator](https://www.resumeclimbai.com/resume-bullet-generator)

### ATS Resume Checker

Compare a resume with a target job description and review confirmed matches, related evidence, and requirements that were not confirmed.

[Open the free ATS Resume Checker](https://www.resumeclimbai.com/ats-resume-checker)

### Resume Writing Guides

Explore practical guides covering resume bullets, ATS keywords, summaries, skills, work experience, formatting, and role-specific examples.

[Browse the ResumeClimb AI guides](https://www.resumeclimbai.com/guides)

## Key features

- AI-assisted resume bullet generation
- Resume-to-job-description comparison
- Truth-first keyword guidance
- Role-specific resume bullet examples
- Practical ATS-friendly formatting guidance
- Saved resume bullet library
- Responsive dark user interface
- Structured SEO content and guide navigation

## Truth-first approach

ResumeClimb AI is designed to improve wording without manufacturing experience.

- Use only responsibilities you genuinely performed.
- Add skills and tools only when supported by real evidence.
- Use metrics only when they are accurate and appropriately disclosed.
- Keep credential names and status correct.
- Review every AI-generated result before adding it to a resume.

The ATS comparison is an educational review of the text supplied by the user. It is not a score issued by an employer, a hiring decision, or a guarantee of an interview.

## Technology

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Supabase
- Vercel

## Main application routes

| Route                      | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `/`                        | Resume bullet generator and product overview |
| `/resume-bullet-generator` | Dedicated AI resume bullet generator         |
| `/ats-resume-checker`      | Resume and job-description comparison        |
| `/guides`                  | Resume writing guide library                 |
| `/dashboard`               | Authenticated user dashboard                 |

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

Configure the environment variables required by the project integrations before testing API, authentication, or database features. Do not commit secrets or local environment files.

## Production build

Run the complete production build check:

```bash
npm run build
```

The public application is deployed at [www.resumeclimbai.com](https://www.resumeclimbai.com).

## Maintainer

Built and maintained by **UDA Apps**.

Resume examples and tool outputs are educational and must be adapted to accurately reflect the user's real experience.
