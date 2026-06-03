import fs from "node:fs"
import path from "node:path"
import { pipeline } from "node:stream/promises"
import { Readable } from "node:stream"

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
const figmaFileKey = readEnvValue("FIGMA_FILE_KEY") || "2rqbuJLu15PDpWwopZoC3E"
const outDir = path.resolve(process.cwd(), "public/images/sprachtrainerin")
fs.mkdirSync(outDir, { recursive: true })

const pngNodes = {
  "hero-bg": "2209:3039",
  "philosophy-1": "2221:1362",
  "philosophy-2": "2223:237",
  "philosophy-3": "2223:243",
  "philosophy-4": "2223:247",
  "cert-sveb1": "2209:3155",
  "cert-eurolta": "2209:3164",
  "cert-fce": "2209:3173",
}

const svgNodes = {
  "arrow-1": "2221:1356",
  "arrow-2": "2223:273",
}

if (!figmaApiKey) {
  console.warn("FIGMA_API_KEY not set — skipping export")
  process.exit(0)
}

async function downloadBatch(nodes, format, ext) {
  const ids = Object.values(nodes).join(",")
  const url = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=${format}${format === "png" ? "&scale=2" : ""}`
  const res = await fetch(url, { headers: { "X-Figma-Token": figmaApiKey } })
  if (!res.ok) {
    console.error(`Figma ${format} export failed:`, res.status)
    return
  }
  const { images } = await res.json()
  for (const [name, nodeId] of Object.entries(nodes)) {
    const imageUrl = images[nodeId]
    if (!imageUrl) {
      console.warn(`No URL for ${name} (${nodeId})`)
      continue
    }
    const fileRes = await fetch(imageUrl)
    if (!fileRes.ok) continue
    const filePath = path.join(outDir, `${name}.${ext}`)
    await pipeline(
      Readable.fromWeb(fileRes.body),
      fs.createWriteStream(filePath),
    )
    console.log("Saved", filePath)
  }
}

await downloadBatch(pngNodes, "png", "png")
await downloadBatch(svgNodes, "svg", "svg")
console.log("Sprachtrainerin asset export complete.")
