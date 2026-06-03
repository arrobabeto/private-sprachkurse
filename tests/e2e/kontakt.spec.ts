import { expect, test } from "@playwright/test"

test.describe("Kontakt page", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
  })

  test("loads with hero heading", async ({ page }) => {
    await page.goto("/kontakt")

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Haben Sie Fragen\?/i,
      }),
    ).toBeVisible()
  })

  test("renders English locale at /en/kontakt", async ({ page }) => {
    await page.goto("/en/kontakt")

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Do you have questions\?/i,
      }),
    ).toBeVisible()
  })

  test("location tabs update content on click", async ({ page }) => {
    await page.goto("/kontakt")

    await expect(
      page.getByRole("tab", { name: /Kurslokal Liestal/i }),
    ).toBeVisible()
    await expect(page.getByText(/Amtshausgasse 12/i)).toBeVisible()

    await page.getByRole("tab", { name: /Online/i }).click()
    await expect(page.getByText(/virtuellen Unterrichtsstunden/i)).toBeVisible()

    await page.getByRole("tab", { name: /Kurslokal Liestal/i }).click()
    await expect(page.getByText(/4410 Liestal/i)).toBeVisible()
  })

  test("has no client-side module errors", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))

    await page.goto("/kontakt")
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
