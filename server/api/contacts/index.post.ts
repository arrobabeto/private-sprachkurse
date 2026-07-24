import { defineEventHandler, readBody } from "h3"
import { ofetch } from "ofetch"

export default defineEventHandler(async (event) => {
  const bindings = await readBody(event)

  let sql =
    "INSERT INTO contacts (first_name, last_name, email, phone, interest, learner_type, message)"
  sql +=
    " VALUES (:first_name, :last_name, :email, :phone, :interest, :learner_type, :message) RETURNING *"

  const rows: any[] = await ofetch(import.meta.env.ORBITYPE_API_SQL_URL, {
    method: "POST",
    headers: { "X-API-KEY": import.meta.env.ORBITYPE_API_SQL_KEY },
    body: { sql, bindings },
  })
  return rows[0]
})
