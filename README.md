# Fiverr CTA Tracking Update

This update tracks every Fiverr CTA click in Google Analytics.

## Event name

`fiverr_cta_click`

## Event parameters

- `source`
- `offer`
- `price_usd`
- `destination`

The existing page-specific `source` values remain useful:

- `homepage`
- `ats-resume-checker`
- `resume-bullet-generator`
- `customer-service-guide`
- `software-engineer-guide`

## Install

Replace:

`components/marketing/human-ats-review-cta.tsx`

Then run:

```bash
npm run build
git add .
git commit -m "Track Fiverr CTA clicks in Google Analytics"
git push origin main
```

## Test after deployment

1. Open one public page.
2. Click **Get My ATS Resume Quick Fix**.
3. In Google Analytics, open **Reports → Realtime**.
4. Look for the event `fiverr_cta_click`.

Realtime reporting can take a short time to show the event.
