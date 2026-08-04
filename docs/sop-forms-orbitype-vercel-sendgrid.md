# SOP: Connect Contact Forms (Orbitype + Vercel + SendGrid)

## Objective

Enable website contact forms on a Nuxt (Orbitype headless) site to:

1. Send notification emails via **SendGrid**
2. Optionally store submissions in **Orbitype** (SQL)
3. Work in **local development** and **Vercel production** with the same env-based configuration

## Scope

### In scope

- Contact forms that POST to `POST /api/contacts`
- SendGrid Mail Send API integration
- Optional Orbitype SQL insert into a `contacts` table
- Environment variable setup for local `.env` and Vercel
- Verification and troubleshooting checklist

### Out of scope

- Building or redesigning form UI
- Marketing automation beyond the first notification email
- Full CRM sync (unless added later via Orbitype workflows)
- Domain DNS / brand email onboarding beyond Sender Identity verification

### Applies to

Any new site built from this stack:

| Layer          | Stack                          |
| -------------- | ------------------------------ |
| Frontend / API | Nuxt 3 (SSR) on Vercel         |
| CMS / DB       | Orbitype SQL API               |
| Email          | SendGrid                       |
| Forms          | Vue sections → `/api/contacts` |

---

## Architecture

```
User submits form
  → Nuxt POST /api/contacts
  → SendGrid /v3/mail/send  → inbox (SENDGRID_TO_EMAIL)
  → (optional) Orbitype SQL INSERT → contacts
```

| Service           | Responsibility                                  |
| ----------------- | ----------------------------------------------- |
| **Nuxt / Vercel** | Hosts the site and server route `/api/contacts` |
| **SendGrid**      | Sends the lead notification email               |
| **Orbitype**      | Optional storage of submissions                 |

---

## Prerequisites

- Access to the GitHub repository
- Access to the Vercel project for the site
- Access to a SendGrid account (API key + verified sender)
- Access to the Orbitype project (SQL API key), if storage is required
- Repo already implements:
  - Form UI posting to `/api/contacts`
  - `server/api/contacts/index.post.ts`
  - `server/utils/sendContactEmail.ts` (or equivalent)

---

## Step 1 — SendGrid

### 1.1 Create an API key

1. Open SendGrid → **Settings → API Keys**.
2. Create a key with at least **Mail Send** permission.
3. Copy the key (`SG....`) and store it securely (password manager / Vercel secrets).

### 1.2 Verify Sender Identity (mandatory)

SendGrid rejects mail if `from` is not verified.

1. Open **Settings → Sender Authentication**.
2. Prefer **Domain Authentication** for the client domain, **or** use **Single Sender Verification**.
3. Verify the address you will use as `SENDGRID_FROM_EMAIL`.

**Rule:** Until the client/from address is verified, temporarily use any **already verified** sender in the same SendGrid account.

### 1.3 Decide From / To

| Variable              | Purpose                   | Example pattern                                        |
| --------------------- | ------------------------- | ------------------------------------------------------ |
| `SENDGRID_API_KEY`    | Auth for Mail Send        | `SG....`                                               |
| `SENDGRID_FROM_EMAIL` | Verified sender           | `noreply@client-domain.ch` or interim verified address |
| `SENDGRID_FROM_NAME`  | Display name              | Client / site brand name                               |
| `SENDGRID_TO_EMAIL`   | Inbox that receives leads | `info@client-domain.ch`                                |

**Reply-To:** set to the form submitter email in code so staff can reply directly.

---

## Step 2 — Orbitype (optional storage)

Forms can succeed with SendGrid alone. Orbitype storage is optional.

### 2.1 SQL API key

1. Open Orbitype → **Settings → API keys**.
2. Create a key scoped to the project **SQL** connector.
3. Use:
   - `ORBITYPE_API_SQL_URL=https://core.orbitype.com/api/sql/v1`
   - `ORBITYPE_API_SQL_KEY=<sql-key>`

### 2.2 Create `contacts` table (if missing)

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id varchar(255) DEFAULT uid() PRIMARY KEY,
  first_name text DEFAULT ''::text,
  last_name text DEFAULT ''::text,
  email text DEFAULT ''::text,
  phone text DEFAULT ''::text,
  interest text DEFAULT ''::text,
  learner_type text DEFAULT ''::text,
  message text DEFAULT ''::text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);
```

Adjust columns only if the form payload changes; keep API bindings and table schema aligned.

### 2.3 Expected behavior if storage fails

If the table or SQL key is missing, the endpoint should still return success when SendGrid succeeds (`stored: false`).

---

## Step 3 — Local environment

Add to the project `.env` (never commit secrets):

```bash
# SendGrid
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="verified-sender@example.com"
SENDGRID_FROM_NAME="Site Brand Name"
SENDGRID_TO_EMAIL="leads@example.com"

# Orbitype (optional for storage)
ORBITYPE_MOCK=false
ORBITYPE_API_SQL_URL="https://core.orbitype.com/api/sql/v1"
ORBITYPE_API_SQL_KEY="your-sql-api-key"
```

Keep `.env.example` updated with placeholder keys (no real secrets).

Restart the Nuxt dev server after env changes:

```bash
npm run dev
```

---

## Step 4 — Vercel (production)

1. Open the Vercel project → **Settings → Environment Variables**.
2. Add the same variables for **Production** (and **Preview** if needed):

| Name                   | Required                      |
| ---------------------- | ----------------------------- |
| `SENDGRID_API_KEY`     | Yes                           |
| `SENDGRID_FROM_EMAIL`  | Yes                           |
| `SENDGRID_FROM_NAME`   | Yes                           |
| `SENDGRID_TO_EMAIL`    | Yes                           |
| `ORBITYPE_API_SQL_URL` | If storage needed             |
| `ORBITYPE_API_SQL_KEY` | If storage needed             |
| `ORBITYPE_MOCK`        | Usually `false` in production |

3. **Redeploy** after saving env vars (existing deployments do not pick up new secrets automatically).

---

## Step 5 — Implementation checklist (repo)

Confirm these pieces exist before go-live:

| Item            | Check                                                             |
| --------------- | ----------------------------------------------------------------- |
| Form UI         | Posts JSON to `/api/contacts`                                     |
| API route       | Validates required fields (`first_name`, `last_name`, `email`, …) |
| SendGrid helper | Builds subject/body, sets `reply_to` to submitter                 |
| Orbitype insert | Optional, non-blocking on failure                                 |
| Env docs        | `.env.example` lists all `SENDGRID_*` keys                        |

---

## Step 6 — Test procedure

### 6.1 Local API test

```bash
curl -s -X POST http://127.0.0.1:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "you@example.com",
    "phone": "+41 00 000 00 00",
    "interest": "example",
    "learner_type": "example",
    "message": "Connectivity test"
  }'
```

**Expected success shape:**

```json
{
  "ok": true,
  "emailed": true,
  "to": "leads@example.com",
  "stored": true
}
```

| Field           | Meaning                       |
| --------------- | ----------------------------- |
| `emailed: true` | SendGrid accepted the message |
| `stored: true`  | Row inserted in Orbitype      |
| `stored: false` | Email OK; DB skipped/failed   |

### 6.2 Local UI test

1. Open the contact page / section.
2. Submit a real test lead.
3. Confirm success UI, inbox delivery, and Reply-To = submitter.

### 6.3 Production test

1. Redeploy on Vercel with env vars set.
2. Repeat UI test on the production URL.
3. Confirm email delivery and optional DB row.

---

## Troubleshooting

| Symptom                          | Likely cause                     | Fix                                  |
| -------------------------------- | -------------------------------- | ------------------------------------ |
| `403` / unverified from address  | FROM not verified in SendGrid    | Verify sender or use a verified FROM |
| `400` missing fields             | Invalid/empty payload            | Check form field names vs API        |
| `emailed: true`, `stored: false` | Missing table or SQL key         | Create `contacts` + set Orbitype env |
| Works locally, fails on Vercel   | Env vars missing / old deploy    | Add vars + redeploy                  |
| No email received                | Spam / wrong TO / SendGrid delay | Check spam + SendGrid Activity       |

---

## Go-live checklist

- [ ] SendGrid API key created
- [ ] FROM address verified in SendGrid
- [ ] `SENDGRID_*` set in local `.env`
- [ ] `SENDGRID_*` set in Vercel (Production)
- [ ] Orbitype SQL URL/key set (if storage required)
- [ ] `contacts` table exists (if storage required)
- [ ] Local API test returns `emailed: true`
- [ ] Vercel redeployed after env changes
- [ ] Production form test email received

---

## Security

- Never commit `.env` or live API keys to Git.
- Prefer least-privilege SendGrid keys (**Mail Send** only).
- Keep Orbitype keys connector-scoped per project.
- Rotate keys immediately if exposed.

---

## One-line summary

**Verify SendGrid FROM → set `SENDGRID_*` (and optional Orbitype SQL) locally + on Vercel → redeploy → submit form and confirm email.**
