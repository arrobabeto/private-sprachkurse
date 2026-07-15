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
const outDir = path.resolve(process.cwd(), "public/images/kontakt")
fs.mkdirSync(outDir, { recursive: true })

/** Hero fill requires Figma crop transform — use download_figma_images MCP or these params. */
const heroCrop = {
  imageRef: "730be04781056ef5f5c709325a580a5604c359bd",
  cropTransform: [
    [0.524748682975769, 0, 0.31586191058158875],
    [0, 0.564307451248169, 0.2180921733379364],
  ],
  filenameSuffix: "664040",
}

const pngNodes = {
  "form-portrait-v2": "2209:1515",
  "location-liestal": "2209:1551",
}

const svgNodes = {
  "dotted-arc": "2221:1347",
  arrow: "2221:1349",
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

async function downloadHeroCropped() {
  const croppedPath = path.join(outDir, `hero-${heroCrop.filenameSuffix}.png`)
  const heroPath = path.join(outDir, "hero-v2.png")
  if (fs.existsSync(croppedPath)) {
    fs.copyFileSync(croppedPath, heroPath)
    console.log("Copied", croppedPath, "→", heroPath)
    return
  }
  console.warn(
    `Hero requires cropped export (node 2221:1345, imageRef ${heroCrop.imageRef}). ` +
      `Run download_figma_images MCP with needsCropping + cropTransform, then re-run this script.`,
  )
}

await downloadHeroCropped()
await downloadBatch(pngNodes, "png", "png")
await downloadBatch(svgNodes, "svg", "svg")
console.log("Kontakt asset export complete.")
