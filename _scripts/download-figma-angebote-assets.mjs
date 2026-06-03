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
const outDir = path.resolve(process.cwd(), "public/images/angebote")
fs.mkdirSync(outDir, { recursive: true })

const pngNodes = {
  "angebote-einzel": "2221:546",
  "angebote-kleingruppe": "2221:554",
  "angebote-sprechtraining": "2221:558",
  "angebote-spezial": "2221:570",
  "angebote-tile-unterricht": "2218:568",
  "angebote-tile-sprech": "2218:570",
  "angebote-gallery-1": "2209:3844",
  "angebote-gallery-2": "2209:3845",
}

const svgNodes = {
  "icon-person": "2209:3683",
  "icon-trip": "2209:3698",
  "offer-arrow-1": "2221:540",
  "offer-arrow-2": "2221:565",
  "offer-arrow-3": "2221:539",
  "icon-arrow-up-right": "2221:549",
  "icon-speed": "2209:3717",
  "icon-category-search": "2209:3720",
  "icon-person-alert": "2209:3723",
  "icon-payments": "2209:3726",
  "icon-partner-exchange": "2209:3743",
  "icon-groups": "2209:3746",
  "icon-mood": "2209:3749",
  "icon-thumb-up": "2209:3771",
  "icon-home-work": "2209:3774",
  "icon-communication": "2209:3777",
  "icon-library-books": "2209:3798",
  "icon-work-update": "2209:3804",
  "icon-location-online-white": "2209:3823",
  "icon-location-liestal-white": "2209:3828",
  "icon-location-firma-white": "2209:3833",
  "icon-gallery-back": "2209:3846",
  "icon-gallery-forward": "2209:3847",
}

if (!figmaApiKey) {
  console.warn("FIGMA_API_KEY not set — skipping export")
  process.exit(0)
}

async function downloadBatch(ids, format, ext) {
  const url = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=${format}${format === "png" ? "&scale=2" : ""}`
  const res = await fetch(url, { headers: { "X-Figma-Token": figmaApiKey } })
  if (!res.ok) {
    console.error(`Figma ${format} export failed:`, res.status)
    return
  }
  const { images } = await res.json()
  for (const [name, nodeId] of Object.entries(
    format === "png" ? pngNodes : svgNodes,
  )) {
    const imageUrl = images[nodeId]
    if (!imageUrl) {
      console.warn(`No URL for ${name} (${nodeId})`)
      continue
    }
    const fileRes = await fetch(imageUrl)
    if (!fileRes.ok) {
      console.warn(`Download failed for ${name}`)
      continue
    }
    const filePath = path.join(outDir, `${name}.${ext}`)
    await pipeline(
      Readable.fromWeb(fileRes.body),
      fs.createWriteStream(filePath),
    )
    console.log("Saved", filePath)
  }
}

await downloadBatch(Object.values(pngNodes).join(","), "png", "png")
await downloadBatch(Object.values(svgNodes).join(","), "svg", "svg")
console.log("Angebote asset export complete.")
