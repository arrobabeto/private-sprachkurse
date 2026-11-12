export type WissenTone = "cream" | "green" | "blue"

export type WissenCrop = {
  height: string
  top: string
  left?: string
}

export type WissenCard = {
  slug: string
  title: string
  excerpt: string
  readingTime: string
  image: string
  tone: WissenTone
  crop?: WissenCrop
}

export type WissenGroup = {
  title: string
  columns: 2 | 3
  cards: WissenCard[]
}

export const wissenHero = {
  title: "Wissen",
  subtitle:
    "Beiträge zu Sprachkursen, Niveaus und Sprachen in der Region Basel und Baselland. Geschrieben für Menschen, die vor einer Entscheidung stehen, nicht für Suchmaschinen.",
  image: "/images/wissen/hero.png",
}

export const wissenCta = {
  title: "Eine Frage, die hier nicht beantwortet wird?",
  body: "Schildern Sie Ihre Situation. Sie erhalten eine Einschätzung, auch wenn diese lautet, dass Sie keinen Kurs brauchen.",
  label: "Frage stellen",
  url: "/kontakt",
  image: "/images/wissen/cta.png",
}

export const wissenGroups: WissenGroup[] = [
  {
    title: "Bevor Sie einen Kurs buchen",
    columns: 3,
    cards: [
      {
        slug: "sprachkurs-in-liestal-finden",
        title: "Sprachkurs in Liestal finden: Privat, Kleingruppe oder online?",
        excerpt:
          "Die zwei Grössen, an denen sich die Formatwahl entscheidet, mit Preisen und einer Checkliste für den Anbietervergleich.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-sprachkurs.png",
        tone: "cream",
      },
      {
        slug: "a1-bis-c2-erklaert",
        title: "A1 bis C2 erklärt: Welches Sprachniveau haben Sie?",
        excerpt:
          "Was die Stufen bedeuten, warum eine einzelne Angabe in die Irre führt und wie das Selbstbeurteilungsraster funktioniert.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/card-niveau.png",
        tone: "cream",
        crop: { height: "273%", top: "-37%" },
      },
      {
        slug: "wie-lange-dauert-eine-sprache",
        title: "Wie lange dauert es wirklich, eine Sprache zu lernen?",
        excerpt:
          "Warum die meistzitierten Stundenzahlen veraltet und nicht übertragbar sind, und wie sich die Dauer für die eigene Wochenzeit ausrechnen lässt.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-dauer.png",
        tone: "cream",
        crop: { height: "273%", top: "-73%" },
      },
    ],
  },
  {
    title: "Deutsch in Baselland",
    columns: 2,
    cards: [
      {
        slug: "deutschkurs-in-baselland",
        title: "Deutschkurs in Baselland: Welches Niveau verlangt Ihr Ziel?",
        excerpt:
          "Die Anforderungen für Niederlassungsbewilligung und Einbürgerung, welche Nachweise gelten und wann gar kein Test nötig ist.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-deutsch-niveau.png",
        tone: "green",
      },
      {
        slug: "schweizerdeutsch-verstehen",
        title:
          "Schweizerdeutsch verstehen: was Deutschlernende in Baselland wissen sollten",
        excerpt:
          "Warum der Nachweis Hochdeutsch prüft und der Alltag auf Dialekt läuft, und warum Baseldeutsch dabei die günstigere Ausgangslage ist.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-schweizerdeutsch.png",
        tone: "blue",
      },
    ],
  },
  {
    title: "Sprachen im Beruf",
    columns: 3,
    cards: [
      {
        slug: "business-english-in-der-schweiz",
        title:
          "Business English in der Schweiz: die Situationen, in denen es klemmt",
        excerpt:
          "Englisch ist hier meist ein Einschub in einen deutschsprachigen Tag. Was das für das Training bedeutet.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-business.png",
        tone: "cream",
        crop: { height: "273%", top: "-143%" },
      },
      {
        slug: "englischkurs-in-baselland",
        title:
          "Englischkurs in Baselland: Welches Englisch brauchen Sie wirklich?",
        excerpt:
          "Für Englisch gibt es keine gesetzliche Vorgabe. Wie Sie das Zielniveau aus der Situation ableiten und wann ein Zertifikat nötig ist.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/card-englisch.png",
        tone: "cream",
      },
      {
        slug: "firmensprachkurse-in-der-schweiz",
        title:
          "Firmensprachkurse in der Schweiz: Wer zahlt, und was das steuerlich bedeutet",
        excerpt:
          "Die drei Finanzierungsvarianten, ihre steuerlichen Folgen und was in eine Vereinbarung zwischen Betrieb und Mitarbeitenden gehört.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-firma.png",
        tone: "cream",
      },
      {
        slug: "franzoesisch-in-der-nordwestschweiz",
        title:
          "Französisch in der Nordwestschweiz: lohnt sich die Auffrischung noch?",
        excerpt:
          "Französisch verliert am Arbeitsplatz Anteile an Englisch und wird gerade dadurch zum Unterscheidungsmerkmal.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-franzoesisch.png",
        tone: "cream",
      },
      {
        slug: "italienisch-lernen-als-erwachsener",
        title: "Italienisch lernen als Erwachsener: was Sie schon mitbringen",
        excerpt:
          "Warum das Ausgangsprofil bei Italienisch dem von Schulfranzösisch entgegengesetzt ist.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/card-italienisch.png",
        tone: "cream",
        crop: { height: "121%", top: "-1.5%" },
      },
    ],
  },
  {
    title: "Sprechen und Übersetzen",
    columns: 2,
    cards: [
      {
        slug: "sprechhemmungen-ueberwinden",
        title: "Sprechhemmungen in einer Fremdsprache überwinden",
        excerpt:
          "Was seit 1986 darüber bekannt ist, wo die Forschung offen bleibt und welche Faktoren der Sprechsituation sich verändern lassen.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-sprechhemmungen.png",
        tone: "green",
        crop: { height: "185%", top: "-21.5%" },
      },
      {
        slug: "maschinenuebersetzung-oder-uebersetzerin",
        title: "Maschinenübersetzung oder Übersetzerin: wann was reicht",
        excerpt:
          "Die drei normierten Bearbeitungsstufen und die drei Fragen, die über den nötigen Aufwand entscheiden.",
        readingTime: "5 Min. Lesezeit",
        image: "/images/wissen/card-uebersetzung.png",
        tone: "blue",
        crop: { height: "415%", top: "-171%" },
      },
    ],
  },
]

export function findWissenCard(slug: string) {
  for (const group of wissenGroups) {
    const card = group.cards.find((item) => item.slug === slug)
    if (card) return card
  }
  return null
}
