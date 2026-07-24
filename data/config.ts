import type { IConfigData } from "~/data/types"

export const configData: IConfigData = {
  langs: [
    {
      code: "fr",
      flag: "🇫🇷",
      name: "Français",
      desc: "Französisch",
    },
    {
      code: "en",
      flag: "🇬🇧",
      name: "English",
      desc: "Englisch",
    },
    {
      code: "de",
      flag: "🇩🇪",
      name: "Deutsch",
      desc: "Deutsch",
    },
    {
      code: "it",
      flag: "🇮🇹",
      name: "Italiano",
      desc: "Italienisch",
    },
    {
      code: "es",
      flag: "🇪🇸",
      name: "Español",
      desc: "Spanisch",
    },
  ],
  niveaus: [
    {
      code: "A1",
      label: "Ich fange ganz neu an",
      sub: "Noch keine Kenntnisse",
      hint: "A1 — Anfänger",
    },
    {
      code: "A1+",
      label: "Ich kenne ein paar Brocken",
      sub: "Einzelne Wörter und Redewendungen",
      hint: "A1+ — leicht fortgeschritten",
    },
    {
      code: "A2",
      label: "Ich verstehe einfache Sätze",
      sub: "Grundkenntnisse vorhanden",
      hint: "A2 — Grundkenntnisse",
    },
    {
      code: "B1",
      label: "Ich kann mich verständigen",
      sub: "Alltagsgespräche klappen",
      hint: "B1 — Mittelstufe",
    },
    {
      code: "B2+",
      label: "Ich spreche sicher und flüssig",
      sub: "Fortgeschrittene Kommunikation",
      hint: "B2+ — Fortgeschritten",
    },
  ],
  tagsMap: {
    mo: "Montag",
    di: "Dienstag",
    mi: "Mittwoch",
    do: "Donnerstag",
    fr: "Freitag",
  },
  confirm: {
    lang: {
      fr: "Gute Wahl — Français ist die meistgebuchte Sprache diesen Sommer.",
      en: "Perfekt — Englisch bietet dir die grösste Kursauswahl bei uns.",
      de: "Sehr gut — Deutsch als Fremdsprache ist bei uns sehr beliebt.",
      it: "Ottima scelta! Italiano liegt uns besonders am Herzen.",
      es: "¡Excelente! Spanisch ist eine der zugänglichsten Sprachen für Einsteiger.",
    },
    niveau:
      "Du bist auf dem richtigen Weg — wir haben den passenden Kurs für dich.",
  },
}
