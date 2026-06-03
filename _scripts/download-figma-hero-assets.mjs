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

const heroOutDir = path.resolve(process.cwd(), "public/images/home/hero")
const homeOutDir = path.resolve(process.cwd(), "public/images/home")
fs.mkdirSync(heroOutDir, { recursive: true })
fs.mkdirSync(homeOutDir, { recursive: true })

const svgNodes = {
  iconCard1: "11:60",
  iconCard2: "11:52",
  iconCard3: "11:79",
  iconCard4: "11:69",
  arrow1: "11:47",
  arrow2: "11:89",
  arrow3: "11:90",
}

const homeSvgNodesExtra = {
  loopOrange: "9:15",
}

const homeSvgNodes = {
  iconTrainer: "24:32",
}

if (!figmaApiKey) {
  console.warn("FIGMA_API_KEY not set — skipping hero asset export")
  process.exit(0)
}

async function downloadNodes(nodes, format, ext, outDir, nameMap = {}) {
  const ids = Object.values(nodes).join(",")
  const url = `https://api.figma.com/v1/images/${figmaFileKey}?ids=${encodeURIComponent(ids)}&format=${format}&svg_include_id=false`

  const res = await fetch(url, {
    headers: { "X-Figma-Token": figmaApiKey },
  })

  if (!res.ok) {
    console.error(
      `Figma ${format} export failed:`,
      res.status,
      await res.text(),
    )
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

    const fileName = nameMap[name] ?? name
    const filePath = path.join(outDir, `${fileName}.${ext}`)
    await pipeline(
      Readable.fromWeb(fileRes.body),
      fs.createWriteStream(filePath),
    )
    console.log("Saved", filePath)
  }
}

await downloadNodes(svgNodes, "svg", "svg", heroOutDir)
await downloadNodes(homeSvgNodes, "svg", "svg", homeOutDir, {
  iconTrainer: "icon-trainer",
})
await downloadNodes(homeSvgNodesExtra, "svg", "svg", homeOutDir)
console.log("Hero asset export complete.")
