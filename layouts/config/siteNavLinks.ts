import type { I18nString } from "~/types/util/I18nString"

export type SiteNavLink = {
  name: I18nString
  url: string
}

/**
 * Nav/footer links for CMS pages on this site.
 * Edit here only — Navigation.vue and Footer.vue both use this list.
 * (Home is reached via the logo; not listed here.)
 */
export const siteNavLinks = [
  {
    name: { de: "Angebote", en: "Offers" },
    url: "/angebote",
  },
  {
    name: { de: "Sprachtrainerin", en: "Language trainer" },
    url: "/sprachtrainerin",
  },
  {
    name: { de: "In Unternehmen", en: "For companies" },
    url: "/in-unternehmen",
  },
  {
    name: { de: "Übersetzungen", en: "Translations" },
    url: "/ubersetzungen",
  },
  {
    name: { de: "Kontakt", en: "Contact" },
    url: "/kontakt",
  },
] satisfies SiteNavLink[]
