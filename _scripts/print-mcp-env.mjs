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
const s3Key = readEnvValue("ORBITYPE_API_S3_KEY")
const figmaApiKey = readEnvValue("FIGMA_API_KEY")
const figmaFileKey = readEnvValue("FIGMA_FILE_KEY")

console.log(
  "# Add these exports to ~/.zshrc (or Cursor's environment), then restart Cursor.",
)
console.log("# Do not commit API keys to git.\n")

if (sqlKey) {
  console.log(`export ORBITYPE_SQL_API_KEY_PRIVATE_SPRACHKURSE="${sqlKey}"`)
} else {
  console.log(
    '# export ORBITYPE_SQL_API_KEY_PRIVATE_SPRACHKURSE="<your-sql-api-key>"',
  )
  console.log("# Missing ORBITYPE_API_SQL_KEY in .env")
}

if (s3Key) {
  console.log(`export ORBITYPE_S3_API_KEY_PRIVATE_SPRACHKURSE="${s3Key}"`)
} else {
  console.log(
    '# export ORBITYPE_S3_API_KEY_PRIVATE_SPRACHKURSE="<your-s3-api-key>"',
  )
  console.log(
    "# Create an S3 API key at https://app.orbitype.com/settings/api-keys and add ORBITYPE_API_S3_KEY to .env",
  )
}

console.log("")

if (figmaApiKey) {
  console.log(`export FIGMA_API_KEY="${figmaApiKey}"`)
} else {
  console.log('# export FIGMA_API_KEY="figd_your_token_here"')
  console.log(
    "# Create a token at https://www.figma.com/settings → Security → Personal access tokens",
  )
}

if (figmaFileKey) {
  console.log(`# FIGMA_FILE_KEY is for prompts only (optional export):`)
  console.log(`export FIGMA_FILE_KEY="${figmaFileKey}"`)
} else {
  console.log('# export FIGMA_FILE_KEY="your-figma-file-key"')
  console.log("# Add FIGMA_FILE_KEY to .env from your Figma design URL")
}
