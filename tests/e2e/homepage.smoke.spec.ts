import { expect, test } from "@playwright/test"

test.describe("Homepage smoke", () => {
  test("renders home, supports /en, and shows hero content", async ({
    page,
  }) => {
    await page.route("**/api/pages**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "smoke-home",
          title: {
            en: "Private Sprachkurse",
            de: "Private Sprachkurse",
          },
          slug: "home",
          img: "",
          keywords: ["sprachkurse", "smoke"],
          lead: {
            en: "Personal language lessons",
            de: "Persönlicher Sprachunterricht",
          },
          sections: [
            {
              _orbi: { component: "SectionHero" },
              tagline: {
                en: "Personal language lessons",
                de: "Persönlicher Sprachunterricht",
              },
              image: "/images/home/hero.png",
              cards: [
                {
                  text: {
                    en: "We define your goals together",
                    de: "Wir bestimmen gemeinsam Ihre Ziele",
                  },
                },
              ],
            },
          ],
          head: {},
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        }),
      })
    })

    await page.goto("/")

    await expect(page.getByText("Persönlicher Sprachunterricht")).toBeVisible()

    await page.goto("/en")
    await expect(page.getByText("Personal language lessons")).toBeVisible()
  })

  test("serves robots, sitemaps, and llms routes", async ({
    page,
    request,
  }) => {
    await page.goto("/")

    const robotsResponse = await request.get("/robots.txt")
    expect(robotsResponse.ok()).toBeTruthy()
    const robotsBody = await robotsResponse.text()
    expect(robotsBody).toContain("Sitemap:")
    expect(robotsBody).toContain("LLMs-Txt:")

    const sitemapResponse = await request.get("/sitemaps.xml")
    expect(sitemapResponse.ok()).toBeTruthy()
    const sitemapBody = await sitemapResponse.text()
    expect(sitemapBody).toContain("<sitemapindex")

    const llmsResponse = await request.get("/llms.txt")
    expect(llmsResponse.ok()).toBeTruthy()
    const llmsBody = await llmsResponse.text()
    expect(llmsBody).toContain("# Private Sprachkurse")

    const llmsFullResponse = await request.get("/llms-full.txt")
    expect(llmsFullResponse.ok()).toBeTruthy()
    const llmsFullBody = await llmsFullResponse.text()
    expect(llmsFullBody).toContain("(Full)")
  })
})
