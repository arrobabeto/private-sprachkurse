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
  "hero-bg": "2412:649",
  "cert-sveb1": "2209:3155",
  "cert-eurolta": "2209:3164",
  "cert-fce": "2209:3173",
}

// Carousel backgrounds: export source image fills (not rendered frames with text).
const philosophyNodes = {
  "philosophy-1": "2412:657",
  "philosophy-2": "2381:571",
  "philosophy-3": "2381:575",
  "philosophy-4": "2381:582",
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

async function downloadPhilosophyBackgrounds() {
  const ids = Object.values(philosophyNodes).join(",")
  const nodesRes = await fetch(
    `https://api.figma.com/v1/files/${figmaFileKey}/nodes?ids=${encodeURIComponent(ids)}`,
    { headers: { "X-Figma-Token": figmaApiKey } },
  )
  if (!nodesRes.ok) {
    console.error("Figma nodes lookup failed:", nodesRes.status)
    return
  }
  const nodesJson = await nodesRes.json()

  const fillsRes = await fetch(
    `https://api.figma.com/v1/files/${figmaFileKey}/images`,
    { headers: { "X-Figma-Token": figmaApiKey } },
  )
  if (!fillsRes.ok) {
    console.error("Figma image fills lookup failed:", fillsRes.status)
    return
  }
  const { meta } = await fillsRes.json()
  const imageMap = meta?.images ?? {}

  for (const [name, nodeId] of Object.entries(philosophyNodes)) {
    const doc = nodesJson.nodes?.[nodeId]?.document
    const imageRef = (doc?.fills ?? []).find(
      (f) => f.type === "IMAGE",
    )?.imageRef
    if (!imageRef) {
      console.warn(`No image fill for ${name} (${nodeId})`)
      continue
    }
    const imageUrl = imageMap[imageRef]
    if (!imageUrl) {
      console.warn(`No source URL for ${name} (${imageRef})`)
      continue
    }
    const fileRes = await fetch(imageUrl)
    if (!fileRes.ok) continue
    const filePath = path.join(outDir, `${name}.png`)
    await pipeline(
      Readable.fromWeb(fileRes.body),
      fs.createWriteStream(filePath),
    )
    console.log("Saved", filePath)
  }
}

await downloadBatch(pngNodes, "png", "png")
await downloadPhilosophyBackgrounds()
await downloadBatch(svgNodes, "svg", "svg")
console.log("Sprachtrainerin asset export complete.")
