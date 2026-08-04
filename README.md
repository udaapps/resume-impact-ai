# ResumeClimb AI — Password Reset Update

Adds:

- `app/forgot-password/page.tsx`
- `app/update-password/page.tsx`

The existing login page already links to `/forgot-password`.

## Flow

1. User submits email at `/forgot-password`.
2. Supabase sends the reset link to:
   `/auth/callback?next=/update-password`
3. The existing callback route creates the recovery session.
4. User sets the new password at `/update-password`.

## Supabase URL Configuration

Site URL:

```text
https://www.resumeclimbai.com
```

Keep these redirect URLs:

```text
https://www.resumeclimbai.com/auth/callback
http://localhost:3000/auth/callback
https://resume-impact-ai.vercel.app/auth/callback
```

No separate `/update-password` allow-list entry is required because the email
first returns through `/auth/callback`.

## Install

Extract into the project root, then run:

```bash
npm run build
```

The build output should include:

```text
○ /forgot-password
○ /update-password
```

Deploy:

```bash
git add .
git commit -m "Add secure password reset flow"
git push origin main
```

## Production test

Use an existing account:

1. Open `/login`.
2. Click **Forgot password?**
3. Request the reset email.
4. Open only the newest reset email.
5. Set a password with 8+ characters, uppercase, lowercase and a number.
6. Continue to the dashboard.
7. Sign out and sign in using the new password.
