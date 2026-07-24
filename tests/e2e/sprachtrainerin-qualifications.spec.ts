import { expect, test } from "@playwright/test"

test.describe("Sprachtrainerin qualifications carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
  })

  test("expands each card on click (desktop)", async ({ page }) => {
    await page.goto("/sprachtrainerin")

    await expect(
      page.getByRole("heading", {
        name: /Schweizerischen Fachausweis vom SVEB1/i,
      }),
    ).toBeVisible()

    await page.getByRole("tab", { name: /Eurolta Zertifikat/i }).click()
    await expect(
      page.getByRole("heading", {
        name: /Internationale Sprachlehre \(Eurolta Zertifikat\)/i,
      }),
    ).toBeVisible()

    await page.getByRole("tab", { name: /Sprache im Beruf/i }).click()
    await expect(
      page.getByRole("heading", { name: /Sprache im Beruf/i }),
    ).toBeVisible()

    await page.getByRole("tab", { name: /SVEB1 Zertifikat/i }).click()
    await expect(
      page.getByRole("heading", {
        name: /Schweizerischen Fachausweis vom SVEB1/i,
      }),
    ).toBeVisible()
  })

  test("has no client-side module errors", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))

    await page.goto("/sprachtrainerin")
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
