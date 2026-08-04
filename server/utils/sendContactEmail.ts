import { ofetch } from "ofetch"

export type ContactPayload = {
  first_name: string
  last_name: string
  email: string
  phone?: string
  interest?: string
  learner_type?: string
  message?: string
}

function env(name: string, fallback = "") {
  const value = import.meta.env[name] ?? process.env[name]
  if (value == null) return fallback
  return String(value).trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function row(label: string, value: string | undefined) {
  const safe = escapeHtml((value ?? "").trim() || "—")
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:160px;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${safe}</td>
  </tr>`
}

export function getSendGridConfig() {
  const apiKey = env("SENDGRID_API_KEY")
  const fromEmail = env("SENDGRID_FROM_EMAIL", "it@bexolutions.ch")
  const fromName = env("SENDGRID_FROM_NAME", "Private Sprachkurse")
  const toEmail = env("SENDGRID_TO_EMAIL", "info@privatesprachkurse.ch")

  return { apiKey, fromEmail, fromName, toEmail }
}

export async function sendContactEmail(payload: ContactPayload) {
  const { apiKey, fromEmail, fromName, toEmail } = getSendGridConfig()

  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not configured")
  }
  if (!fromEmail || !toEmail) {
    throw new Error(
      "SENDGRID_FROM_EMAIL or SENDGRID_TO_EMAIL is not configured",
    )
  }

  const fullName = `${payload.first_name} ${payload.last_name}`.trim()
  const subject = `Neue Kontaktanfrage von ${fullName}`

  const text = [
    "Neue Kontaktanfrage über die Website",
    "",
    `Name: ${fullName}`,
    `E-Mail: ${payload.email}`,
    `Telefon: ${payload.phone || "—"}`,
    `Interesse: ${payload.interest || "—"}`,
    `Lernertyp: ${payload.learner_type || "—"}`,
    "",
    "Mitteilung:",
    payload.message || "—",
  ].join("\n")

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111;">
      <h2 style="margin:0 0 16px;">Neue Kontaktanfrage</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">
        ${row("Name", fullName)}
        ${row("E-Mail", payload.email)}
        ${row("Telefon", payload.phone)}
        ${row("Interesse", payload.interest)}
        ${row("Lernertyp", payload.learner_type)}
        ${row("Mitteilung", payload.message)}
      </table>
    </div>
  `

  await ofetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: {
      personalizations: [
        {
          to: [{ email: toEmail }],
          subject,
        },
      ],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: payload.email, name: fullName },
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
    },
  })

  return { toEmail, fromEmail }
}
