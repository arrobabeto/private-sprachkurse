import { expect, test } from "@playwright/test"

test.describe("Übersetzungen page", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
  })

  test("loads with hero heading", async ({ page }) => {
    await page.goto("/ubersetzungen")

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Übersetzungen in.*5.*Sprachen/i,
      }),
    ).toBeVisible()
  })

  test("renders English locale at /en/ubersetzungen", async ({ page }) => {
    await page.goto("/en/ubersetzungen")

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Translations in.*5.*languages/i,
      }),
    ).toBeVisible()
  })

  test("quality section shows three pillar columns", async ({ page }) => {
    await page.goto("/ubersetzungen")

    await expect(
      page.getByRole("heading", {
        name: /Was eine gute Übersetzung ausmacht/i,
      }),
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /Sprachgefühl/i }),
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /Schnelle Abwicklung/i }),
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /Für Alltag und Beruf/i }),
    ).toBeVisible()
  })

  test("has no client-side module errors", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))

    await page.goto("/ubersetzungen")
    await page.waitForLoadState("networkidle")

    expect(errors.filter((e) => e.includes("getActiveHead"))).toHaveLength(0)
    expect(errors).toHaveLength(0)

    const mounted = await page.evaluate(() => {
      const root = document.querySelector("#__nuxt")
      return Boolean(
        root && (root as HTMLElement & { __vue_app__?: unknown }).__vue_app__,
      )
    })
    expect(mounted).toBe(true)
  })
})
