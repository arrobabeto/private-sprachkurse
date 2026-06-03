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
const outDir = path.resolve(process.cwd(), "public/images/ubersetzungen")
fs.mkdirSync(outDir, { recursive: true })

const pngNodes = {
  "hero-bg": "2226:808",
  business: "2209:1970",
  private: "2209:2025",
  advisory: "2209:2029",
  "cta-bg": "2226:715",
}

const svgNodes = {
  "icon-news": "2209:1981",
  "icon-outgoing-mail": "2209:1984",
  "icon-business-center": "2209:1987",
  "icon-sell": "2209:1990",
  "icon-communication": "2209:1993",
  "icon-wysiwyg": "2209:2008",
  "icon-school": "2209:2011",
  "icon-personal-places": "2209:2014",
  "icon-task": "2209:2017",
  "icon-files": "2209:2020",
  "icon-mail": "2209:2038",
  "icon-text-compare": "2209:2044",
  "icon-edit": "2209:2047",
  "icon-inbox-text-person": "2209:2050",
  "icon-account-circle": "2227:261",
  "icon-clock-loader": "2227:263",
  "icon-business-center-tab": "2227:265",
  "icon-chevron-right": "2209:401",
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
console.log("Übersetzungen asset export complete.")
