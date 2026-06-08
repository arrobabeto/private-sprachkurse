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
}

// Carousel slides use STRETCH image fills — node PNG export can return blank frames.
const imageFillNodes = {
  "angebote-gallery-1": "2209:3844",
  "angebote-gallery-2": "2209:3845",
}

const EXPORT_SCALE = 2

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

function stretchFillCrop(srcW, srcH, transform) {
  const left = Math.round(transform[0][2] * srcW)
  const top = Math.round(transform[1][2] * srcH)
  const width = Math.round(transform[0][0] * srcW)
  const height = Math.round(transform[1][1] * srcH)
  return { left, top, width, height }
}

async function downloadBatch(nodes, format, ext) {
  const url = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(Object.values(nodes).join(","))}&format=${format}${format === "png" ? "&scale=2" : ""}`
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

async function downloadImageFillNodes() {
  const sharp = (await import("sharp")).default
  const ids = Object.values(imageFillNodes).join(",")
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

  for (const [name, nodeId] of Object.entries(imageFillNodes)) {
    const doc = nodesJson.nodes?.[nodeId]?.document
    const fill = (doc?.fills ?? []).find((f) => f.type === "IMAGE")
    const box = doc?.absoluteBoundingBox
    if (!fill?.imageRef || !box || !fill.imageTransform) {
      console.warn(`No image fill for ${name} (${nodeId})`)
      continue
    }
    const imageUrl = imageMap[fill.imageRef]
    if (!imageUrl) {
      console.warn(`No source URL for ${name} (${fill.imageRef})`)
      continue
    }
    const fileRes = await fetch(imageUrl)
    if (!fileRes.ok) continue
    const source = Buffer.from(await fileRes.arrayBuffer())
    const metaImg = await sharp(source).metadata()
    const crop = stretchFillCrop(
      metaImg.width,
      metaImg.height,
      fill.imageTransform,
    )
    const filePath = path.join(outDir, `${name}.png`)
    await sharp(source)
      .extract(crop)
      .resize(
        Math.round(box.width * EXPORT_SCALE),
        Math.round(box.height * EXPORT_SCALE),
      )
      .png()
      .toFile(filePath)
    console.log("Saved", filePath)
  }
}

await downloadBatch(pngNodes, "png", "png")
await downloadImageFillNodes()
await downloadBatch(svgNodes, "svg", "svg")
console.log("Angebote asset export complete.")
