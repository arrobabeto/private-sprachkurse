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

// Split-block photos (image-only rectangles).
const pngNodes = {
  business: "2209:1970",
  private: "2209:2025",
  advisory: "2209:2029",
}

// Hero + CTA: crop source image fills to frame aspect (Figma scaleMode FILL).
const backgroundFillNodes = {
  "hero-bg": { nodeId: "2226:808", width: 1288, height: 564 },
  "cta-bg": { nodeId: "2226:715", width: 1272, height: 318 },
}

const EXPORT_SCALE = 2

function cropFillRect(srcW, srcH, frameW, frameH) {
  const frameAspect = frameW / frameH
  const srcAspect = srcW / srcH
  if (srcAspect > frameAspect) {
    const cropH = srcH
    const cropW = Math.round(srcH * frameAspect)
    return {
      left: Math.round((srcW - cropW) / 2),
      top: 0,
      width: cropW,
      height: cropH,
    }
  }
  const cropW = srcW
  const cropH = Math.round(srcW / frameAspect)
  return {
    left: 0,
    top: Math.round((srcH - cropH) / 2),
    width: cropW,
    height: cropH,
  }
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

async function downloadBackgroundFills() {
  const sharp = (await import("sharp")).default
  const ids = Object.values(backgroundFillNodes)
    .map((spec) => spec.nodeId)
    .join(",")
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

  for (const [name, spec] of Object.entries(backgroundFillNodes)) {
    const doc = nodesJson.nodes?.[spec.nodeId]?.document
    const imageRef = (doc?.fills ?? []).find(
      (f) => f.type === "IMAGE",
    )?.imageRef
    if (!imageRef) {
      console.warn(`No image fill for ${name} (${spec.nodeId})`)
      continue
    }
    const imageUrl = imageMap[imageRef]
    if (!imageUrl) {
      console.warn(`No source URL for ${name} (${imageRef})`)
      continue
    }
    const fileRes = await fetch(imageUrl)
    if (!fileRes.ok) continue
    const source = Buffer.from(await fileRes.arrayBuffer())
    const metaImg = await sharp(source).metadata()
    const crop = cropFillRect(
      metaImg.width,
      metaImg.height,
      spec.width,
      spec.height,
    )
    const filePath = path.join(outDir, `${name}.png`)
    await sharp(source)
      .extract(crop)
      .resize(spec.width * EXPORT_SCALE, spec.height * EXPORT_SCALE)
      .png()
      .toFile(filePath)
    console.log("Saved", filePath)
  }
}

await downloadBatch(pngNodes, "png", "png")
await downloadBackgroundFills()
await downloadBatch(svgNodes, "svg", "svg")
console.log("Übersetzungen asset export complete.")
