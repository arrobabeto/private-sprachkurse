import { expect, test } from "@playwright/test"

test.describe("In Unternehmen page", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
  })

  test("renders key heading and English locale", async ({ page }) => {
    await page.goto("/in-unternehmen")

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /international kommunizieren/i,
      }),
    ).toBeVisible()

    await page.goto("/en/in-unternehmen")
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /communicate internationally/i,
      }),
    ).toBeVisible()
  })

  test("booking and contact CTAs navigate", async ({ page }) => {
    await page.goto("/in-unternehmen")

    await page
      .getByRole("link", { name: /Zur Buchung/i })
      .first()
      .click()
    await expect(page).toHaveURL(/\/(#kontakt)?$/)

    await page.goto("/in-unternehmen")
    await page.getByRole("link", { name: /Kontakt aufnehmen/i }).click()
    await expect(page).toHaveURL(/\/(#kontakt)?$/)
  })

  test("has no client-side module errors", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))

    await page.goto("/in-unternehmen")
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
