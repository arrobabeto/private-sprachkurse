import { createError, defineEventHandler, readBody } from "h3"
import { ofetch } from "ofetch"
import {
  sendContactEmail,
  type ContactPayload,
} from "~/server/utils/sendContactEmail"

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function validatePayload(body: Record<string, unknown>): ContactPayload {
  const payload: ContactPayload = {
    first_name: asString(body.first_name),
    last_name: asString(body.last_name),
    email: asString(body.email),
    phone: asString(body.phone),
    interest: asString(body.interest),
    learner_type: asString(body.learner_type),
    message: asString(body.message),
  }

  if (!payload.first_name || !payload.last_name || !payload.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: first_name, last_name, email",
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email address",
    })
  }

  return payload
}

async function storeContact(payload: ContactPayload) {
  const sqlUrl = import.meta.env.ORBITYPE_API_SQL_URL
  const sqlKey = import.meta.env.ORBITYPE_API_SQL_KEY
  if (!sqlUrl || !sqlKey) return null

  try {
    const sql =
      "INSERT INTO contacts (first_name, last_name, email, phone, interest, learner_type, message)" +
      " VALUES (:first_name, :last_name, :email, :phone, :interest, :learner_type, :message) RETURNING *"

    const rows = await ofetch<ContactPayload[]>(sqlUrl, {
      method: "POST",
      headers: { "X-API-KEY": sqlKey },
      body: { sql, bindings: payload },
    })
    return Array.isArray(rows) ? (rows[0] ?? null) : null
  } catch (error) {
    console.warn("[contacts] Orbitype store skipped:", error)
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Record<string, unknown>
  const payload = validatePayload(body)

  try {
    const emailResult = await sendContactEmail(payload)
    const stored = await storeContact(payload)

    return {
      ok: true,
      emailed: true,
      to: emailResult.toEmail,
      stored: Boolean(stored),
      contact: stored,
    }
  } catch (error: any) {
    console.error("[contacts] SendGrid failed:", error)
    throw createError({
      statusCode: 502,
      statusMessage:
        error?.data?.errors?.[0]?.message ||
        error?.message ||
        "Failed to send contact email",
    })
  }
})
