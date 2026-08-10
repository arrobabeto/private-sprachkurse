import { expect, test, type Page } from "@playwright/test"

async function openCalculator(page: Page) {
  await page.goto("/")
  await page.waitForLoadState("networkidle")

  const smallGroupCard = page
    .locator("#preise article")
    .filter({ hasText: "Kleingruppe" })
    .first()
  await smallGroupCard.getByRole("button", { name: "Jetzt buchen" }).click()

  return page.getByRole("dialog", { name: "Kurs-Konfigurator" })
}

test.describe("Course calculator modal", () => {
  test("opens from the small-group pricing button and closes again", async ({
    page,
  }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    await expect(
      page.getByRole("dialog", { name: "Kurs-Konfigurator" }),
    ).toBeHidden()

    const dialog = await openCalculator(page)
    await expect(dialog).toBeVisible()
    await expect(
      dialog.getByText("Welche Sprache möchtest du lernen?"),
    ).toBeVisible()

    await dialog.getByRole("button", { name: "Schliessen" }).click()
    await expect(dialog).toBeHidden()
  })

  test("runs the flow to a bookable course", async ({ page }) => {
    const dialog = await openCalculator(page)

    await dialog.getByRole("button", { name: /Español/ }).click()
    await dialog.getByRole("button", { name: /Ich fange ganz neu an/ }).click()

    await expect(dialog.getByText("Dein Kurs")).toBeVisible()
    await expect(
      dialog.getByRole("button", { name: /Jetzt buchen & bezahlen/ }),
    ).toBeVisible()
  })

  test("closes with Escape", async ({ page }) => {
    const dialog = await openCalculator(page)
    await expect(dialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })

  test("opens from language carousel with that language preselected", async ({
    page,
  }) => {
    await page.goto("/#sprachkurse")
    await page.waitForLoadState("networkidle")

    const cta = page.getByRole("button", {
      name: "Ich möchte Deutsch lernen",
    })
    await cta.scrollIntoViewIfNeeded()
    await cta.click()

    const dialog = page.getByRole("dialog", { name: "Kurs-Konfigurator" })
    await expect(dialog).toBeVisible()
    await expect(
      dialog.getByText("Welche Sprache möchtest du lernen?"),
    ).toBeHidden()
    await expect(dialog.getByText("Was kannst du schon?")).toBeVisible()
    await expect(dialog.getByText(/Sehr gut — Deutsch/)).toBeVisible()
  })
})
