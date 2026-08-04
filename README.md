# ResumeClimb AI — Generate Route Fix v2

This version fixes the empty OpenAI output shown as:

```text
The AI did not generate usable resume bullets. Please try again.
```

## Change

The generator now uses a dedicated default model:

```text
gpt-4.1-mini
```

It no longer reuses `OPENAI_ANALYTICS_MODEL`, which may be a reasoning model configured for a different task.

## Install

Extract this ZIP into the project root and replace:

```text
app/api/generate/route.ts
```

## Build and deploy

```bash
npm run build
git add .
git commit -m "Fix empty resume bullet AI response"
git push origin main
```

No new Vercel environment variable is required. Optionally, a future dedicated model can be set with:

```text
OPENAI_RESUME_MODEL
```
