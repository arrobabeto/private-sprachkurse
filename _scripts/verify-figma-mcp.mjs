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

const figmaApiKey = readEnvValue("FIGMA_API_KEY")
const figmaFileKey = readEnvValue("FIGMA_FILE_KEY")

if (!figmaApiKey) {
  console.error("Missing FIGMA_API_KEY in .env")
  console.error(
    "Create a token at https://www.figma.com/settings → Security → Personal access tokens",
  )
  process.exit(1)
}

const meResponse = await fetch("https://api.figma.com/v1/me", {
  headers: { "X-Figma-Token": figmaApiKey },
})

if (!meResponse.ok) {
  console.error(`Figma token check failed: HTTP ${meResponse.status}`)
  const body = await meResponse.text()
  if (body) console.error(body)
  process.exit(1)
}

const me = await meResponse.json()
console.log("Figma user:", me)

if (figmaFileKey) {
  const fileResponse = await fetch(
    `https://api.figma.com/v1/files/${figmaFileKey}?depth=1`,
    { headers: { "X-Figma-Token": figmaApiKey } },
  )

  if (!fileResponse.ok) {
    console.error(`Figma file check failed: HTTP ${fileResponse.status}`)
    const body = await fileResponse.text()
    if (body) console.error(body)
    process.exit(1)
  }

  const file = await fileResponse.json()
  console.log("Figma file:", file.name, `(key: ${figmaFileKey})`)
} else {
  console.log("FIGMA_FILE_KEY not set in .env — skipping file access check.")
}

console.log("\nFigma token is valid.")
console.log(
  "Next: run `npm run mcp:env`, add exports to ~/.zshrc, restart Cursor.",
)
