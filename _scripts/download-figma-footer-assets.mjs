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
const outDir = path.resolve(process.cwd(), "public/images/footer")
fs.mkdirSync(outDir, { recursive: true })

// Footer component social icons (Figma Footer instance 2331:416).
const svgNodes = {
  "icon-facebook": "24:778",
  "icon-instagram": "24:779",
  "icon-linkedin": "24:787",
}

// YouTube is split across the circle (24:785) and play icon (24:786).
const youtubeNodes = {
  circle: "24:785",
  play: "24:786",
}

if (!figmaApiKey) {
  console.warn("FIGMA_API_KEY not set — skipping export")
  process.exit(0)
}

const ids = Object.values(svgNodes).join(",")
const res = await fetch(
  `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=svg`,
  { headers: { "X-Figma-Token": figmaApiKey } },
)
if (!res.ok) {
  console.error("Figma SVG export failed:", res.status)
  process.exit(1)
}

const { images } = await res.json()
for (const [name, nodeId] of Object.entries(svgNodes)) {
  const imageUrl = images[nodeId]
  if (!imageUrl) {
    console.warn(`No URL for ${name} (${nodeId})`)
    continue
  }
  const fileRes = await fetch(imageUrl)
  if (!fileRes.ok) continue
  const filePath = path.join(outDir, `${name}.svg`)
  await pipeline(Readable.fromWeb(fileRes.body), fs.createWriteStream(filePath))
  console.log("Saved", filePath)
}

async function downloadYoutubeIcon() {
  const ids = Object.values(youtubeNodes).join(",")
  const res = await fetch(
    `https://api.figma.com/v1/files/${figmaFileKey}/nodes?ids=${encodeURIComponent(ids)}`,
    { headers: { "X-Figma-Token": figmaApiKey } },
  )
  if (!res.ok) {
    console.error("Figma YouTube nodes lookup failed:", res.status)
    return
  }
  const nodesJson = await res.json()
  const circleBox =
    nodesJson.nodes?.[youtubeNodes.circle]?.document?.absoluteBoundingBox
  const playBox =
    nodesJson.nodes?.[youtubeNodes.play]?.document?.absoluteBoundingBox
  if (!circleBox || !playBox) {
    console.warn("Missing YouTube node bounds")
    return
  }

  const imageRes = await fetch(
    `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=svg`,
    { headers: { "X-Figma-Token": figmaApiKey } },
  )
  if (!imageRes.ok) return
  const { images } = await imageRes.json()

  const [circleSvg, playSvg] = await Promise.all(
    Object.values(youtubeNodes).map(async (nodeId) => {
      const url = images[nodeId]
      if (!url) return ""
      return fetch(url).then((r) => r.text())
    }),
  )

  const circlePath = circleSvg.match(/<path[^>]*d="([^"]+)"[^>]*>/)?.[1]
  const playPath = playSvg.match(/<path[^>]*d="([^"]+)"[^>]*>/)?.[1]
  if (!circlePath || !playPath) {
    console.warn("Could not parse YouTube SVG paths")
    return
  }

  const playX = playBox.x - circleBox.x
  const playY = playBox.y - circleBox.y
  const width = Math.round(circleBox.width)
  const height = Math.round(circleBox.height)
  const composite = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="${circlePath}" fill="white"/>
<path d="${playPath}" fill="white" transform="translate(${playX} ${playY})"/>
</svg>
`
  const filePath = path.join(outDir, "icon-youtube.svg")
  fs.writeFileSync(filePath, composite)
  console.log("Saved", filePath)
}

await downloadYoutubeIcon()
console.log("Footer asset export complete.")
