import { expect, test } from "@playwright/test"

const languagesSection = {
  _orbi: { component: "SectionLanguages" },
  backgroundImage: "/images/home/hero-v2.png",
  overlayTitle: {
    de: "Sprachen verbinden die Welt",
    en: "Languages connect the world",
  },
  languages: [
    {
      name: { de: "Deutsch", en: "German" },
      description: { de: "Deutsch Beschreibung", en: "German description" },
      cta: { de: "Deutsch CTA", en: "German CTA" },
      icon: "/images/home/flagDe.png",
    },
    {
      name: { de: "Englisch", en: "English" },
      description: { de: "Englisch Beschreibung", en: "English description" },
      cta: { de: "Englisch CTA", en: "English CTA" },
      icon: "/images/home/flagEn.png",
    },
  ],
}

test.describe("Homepage languages carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/pages**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "smoke-home",
          title: { en: "Private Sprachkurse", de: "Private Sprachkurse" },
          slug: "home",
          img: "",
          keywords: [],
          lead: { en: "Lead", de: "Lead" },
          sections: [languagesSection],
          head: {},
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        }),
      })
    })
    await page.goto("/#sprachkurse")
  })

  test("navigates slides with next control and dots", async ({ page }) => {
    const carousel = page.getByRole("region", { name: /sprachen verbinden/i })
    await expect(carousel).toBeVisible()
    await expect(
      carousel.getByRole("heading", { name: "Deutsch" }),
    ).toBeVisible()

    await carousel.getByRole("button", { name: "Next language" }).click()
    await expect(
      carousel.getByRole("heading", { name: "Englisch" }),
    ).toBeVisible()

    await page.getByRole("tab", { name: "Go to slide 1" }).click()
    await expect(
      carousel.getByRole("heading", { name: "Deutsch" }),
    ).toBeVisible()
  })
})
