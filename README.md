# ResumeClimb AI — `/api/generate` Route Fix

## What was wrong

Both uploaded files are ATS analyzer routes. They expect:

```text
resumeText
jobDescription
```

The Resume Bullet Generator sends:

```text
jobTitle
experienceLevel
resumeStyle
responsibility
achievement
metric
```

That mismatch caused the generator to display:

```text
Resume content and job description are required.
```

## Install

Extract the ZIP into the project root and allow this file to replace:

```text
app/api/generate/route.ts
```

Do not place either ATS analyzer file inside `app/api/generate/`.

Keep the newer ATS analyzer code at:

```text
app/api/ats-analyze/route.ts
```

## Build and deploy

```bash
npm run build
git add .
git commit -m "Restore resume bullet generation API"
git push origin main
```

## Production test

Open:

```text
https://www.resumeclimbai.com
```

Example input:

```text
Job title: Software Engineer
Experience level: Senior Level
Resume style: Technical
Responsibility: Developed backend APIs and optimized database queries
Achievement: Improved API response performance
Metric: 35%
```

Expected result:

- Exactly 3 generated resume bullets
- No “Resume content and job description are required” error
- ATS score card appears
