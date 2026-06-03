import type { Section } from "~/types/util/Section"

function isSection(value: unknown): value is Section {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as Section)._orbi?.component === "string"
  )
}

export function normalizeSections(sections: unknown): Section[] {
  if (!Array.isArray(sections)) return []

  const result: Section[] = []

  function walk(items: unknown[]) {
    for (const item of items) {
      if (Array.isArray(item)) walk(item)
      else if (isSection(item)) result.push(item)
    }
  }

  walk(sections)
  return result
}
