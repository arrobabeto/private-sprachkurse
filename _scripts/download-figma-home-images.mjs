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

const outDir = path.resolve(process.cwd(), "public/images/home")
fs.mkdirSync(outDir, { recursive: true })

const nodes = {
  hero: "24:16",
  portrait: "24:19",
  kurslokal: "24:664",
  flagDe: "13:88",
  flagEn: "13:89",
  flagFr: "13:91",
  flagIt: "13:93",
  flagEs: "13:95",
  testimonialJanine: "2013:139",
  testimonialSarah: "2013:146",
  iconPricingCategory: "2309:422",
  iconPricingArrow: "2293:285",
}

// Testimonial photos added from the "Erfahrungen" carousel (node 2490:555).
// These are imageRef fills, not renderable frames, so export them via the
// Figma image-fill download (MCP `download_figma_images`) rather than this
// node-render script:
//   testimonialAnita.png  -> node 2490:559, imageRef 09fb47ca693ed492809d1d301df3d5ca1180e384
//   testimonialMonika.png -> node 2490:580, imageRef c00b92fbbd4f503c147adbb1f8431d142587d882
//   testimonialNadja.png  -> node 2490:587, imageRef a6d13fbe8c9325d634659be361efff349b75320a
// Ramzi M. has no photo in the design.

const pngFileNames = {
  hero: "hero-v2.png",
  portrait: "portrait-v2.png",
  kurslokal: "kurslokal-v2.png",
  flagDe: "flagDe.png",
  flagEn: "flagEn.png",
  flagFr: "flagFr.png",
  flagIt: "flagIt.png",
  flagEs: "flagEs.png",
  testimonialJanine: "testimonialJanine.png",
  testimonialSarah: "testimonialSarah.png",
  iconPricingCategory: "icon-pricing-category.png",
  iconPricingArrow: "icon-pricing-arrow.png",
}

const svgNodes = {
  iconLocationOnline: "2227:276",
  iconLocationLiestal: "2227:281",
  iconLocationFirma: "2227:286",
  locationArrow1: "2227:295",
  locationArrow2: "2227:296",
}

if (!figmaApiKey) {
  console.warn("FIGMA_API_KEY not set — skipping image export")
  process.exit(0)
}

const ids = Object.values(nodes).join(",")
const imagesUrl = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=png&scale=2`

const imagesRes = await fetch(imagesUrl, {
  headers: { "X-Figma-Token": figmaApiKey },
})

if (!imagesRes.ok) {
  console.error(
    "Figma images API failed:",
    imagesRes.status,
    await imagesRes.text(),
  )
  process.exit(1)
}

const { images } = await imagesRes.json()

for (const [name, nodeId] of Object.entries(nodes)) {
  const url = images[nodeId]
  if (!url) {
    console.warn(`No image URL for ${name} (${nodeId})`)
    continue
  }

  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`Download failed for ${name}`)
    continue
  }

  const filePath = path.join(outDir, pngFileNames[name] ?? `${name}.png`)
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(filePath))
  console.log("Saved", filePath)
}

console.log("Figma PNG export complete.")

const svgIds = Object.values(svgNodes).join(",")
const svgUrl = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(svgIds)}&format=svg`

const svgRes = await fetch(svgUrl, {
  headers: { "X-Figma-Token": figmaApiKey },
})

if (!svgRes.ok) {
  console.warn("Figma SVG export failed:", svgRes.status)
} else {
  const { images: svgImages } = await svgRes.json()
  for (const [name, nodeId] of Object.entries(svgNodes)) {
    const url = svgImages[nodeId]
    if (!url) {
      console.warn(`No SVG URL for ${name} (${nodeId})`)
      continue
    }
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`SVG download failed for ${name}`)
      continue
    }
    const svgNames = {
      iconLocationOnline: "icon-location-online",
      iconLocationLiestal: "icon-location-liestal",
      iconLocationFirma: "icon-location-firma",
      locationArrow1: "location-arrow-1",
      locationArrow2: "location-arrow-2",
    }
    const svgPath = path.join(outDir, `${svgNames[name]}.svg`)
    await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(svgPath))
    console.log("Saved", svgPath)
  }
}

console.log("Figma export complete.")
