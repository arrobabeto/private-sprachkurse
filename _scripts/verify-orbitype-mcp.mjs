import fs from "node:fs"
import path from "node:path"

const envPath = path.resolve(process.cwd(), ".env")

function readEnvValue(name) {
  if (!fs.existsSync(envPath)) return ""
  const match = fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith(`${name}=`))

  if (!match) return ""
  return match.slice(name.length + 1).replace(/^["']|["']$/g, "")
}

const sqlKey = readEnvValue("ORBITYPE_API_SQL_KEY")

if (!sqlKey) {
  console.error("Missing ORBITYPE_API_SQL_KEY in .env")
  process.exit(1)
}

const scopeResponse = await fetch("https://core.orbitype.com/api", {
  method: "OPTIONS",
  headers: { "X-API-KEY": sqlKey },
})

if (!scopeResponse.ok) {
  console.error(`API key check failed: HTTP ${scopeResponse.status}`)
  process.exit(1)
}

const scope = await scopeResponse.json()
console.log("API key scope:", scope)

const mcpResponse = await fetch("https://core.orbitype.com/api/mcp/v1", {
  method: "POST",
  headers: {
    "X-API-KEY": sqlKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: { name: "orbitype_get_context", arguments: {} },
  }),
})

if (!mcpResponse.ok) {
  console.error(`MCP check failed: HTTP ${mcpResponse.status}`)
  process.exit(1)
}

const mcp = await mcpResponse.json()
const contextText = mcp?.result?.content?.[0]?.text
console.log("orbitype_get_context:", contextText ?? mcp)

console.log("\nOrbitype MCP endpoint is reachable.")
console.log(
  "Next: run `npm run mcp:env`, add exports to ~/.zshrc, restart Cursor.",
)
