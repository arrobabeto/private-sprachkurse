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
        slug: "sprachkurs-liestal-finden",
        title: "Sprachkurs in Liestal finden: Privat, Kleingruppe oder online?",
        excerpt:
          "Privatunterricht, Kleingruppe oder online? So rechnen Sie aus, welcher Sprachkurs in Liestal zu Ihnen passt. Mit Preisen, Vergleich und Checkliste.",
        readingTime: "8 Min. Lesezeit",
        image: "/images/wissen/sprachkurs-liestal-finden.jpg",
        tone: "cream",
      },
      {
        slug: "sprachniveau-a1-c2-einschaetzen",
        title: "A1 bis C2 erklärt: Welches Sprachniveau haben Sie?",
        excerpt:
          "Was die Stufen A1 bis C2 bedeuten, warum eine einzelne Angabe in die Irre führt und wie Sie Ihr Niveau getrennt nach Fertigkeiten selbst einschätzen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/sprachniveau-a1-c2-einschaetzen.jpg",
        tone: "cream",
      },
      {
        slug: "wie-lange-dauert-sprache-lernen",
        title: "Wie lange dauert es wirklich, eine Sprache zu lernen?",
        excerpt:
          "Die meistzitierten Stundenzahlen stammen aus einem Vollzeitprogramm und sind veraltet. So rechnen Sie die Dauer für Ihre tatsächliche Wochenzeit aus.",
        readingTime: "6 Min. Lesezeit",
        image: "/images/wissen/wie-lange-dauert-sprache-lernen.jpg",
        tone: "cream",
      },
    ],
  },
  {
    title: "Deutsch in Baselland",
    columns: 2,
    cards: [
      {
        slug: "deutschkurs-baselland-niveau",
        title: "Deutschkurs in Baselland: Welches Niveau verlangt Ihr Ziel?",
        excerpt:
          "Einbürgerung, C-Bewilligung oder Beruf? Welches Deutschniveau Ihr Vorhaben in Baselland verlangt, welche Nachweise gelten und wie Sie dorthin kommen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/deutschkurs-baselland-niveau.jpg",
        tone: "green",
      },
      {
        slug: "schweizerdeutsch-verstehen-baselland",
        title:
          "Schweizerdeutsch verstehen: was Deutschlernende in Baselland wissen sollten",
        excerpt:
          "Der Sprachnachweis prüft Hochdeutsch, der Alltag läuft auf Dialekt. Warum Baseldeutsch dem Hochdeutschen näher steht und wie Sie Hörverstehen aufbauen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/schweizerdeutsch-verstehen-baselland.jpg",
        tone: "blue",
      },
    ],
  },
  {
    title: "Sprachen im Beruf",
    columns: 3,
    cards: [
      {
        slug: "business-english-schweiz-arbeitssituationen",
        title:
          "Business English in der Schweiz: die Situationen, in denen es klemmt",
        excerpt:
          "23 Prozent sprechen bei der Arbeit Englisch, nur 3,1 Prozent ausschliesslich. Warum der Wechsel schwieriger ist als die Sprache und was sich trainieren lässt.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/business-english-schweiz-arbeitssituationen.jpg",
        tone: "cream",
      },
      {
        slug: "englischkurs-baselland-ziel",
        title:
          "Englischkurs in Baselland: Welches Englisch brauchen Sie wirklich?",
        excerpt:
          "Für Englisch schreibt niemand ein Niveau vor. So leiten Sie Ihr Zielniveau aus der Situation ab, und so entscheiden Sie, ob Sie ein Zertifikat brauchen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/englischkurs-baselland-ziel.jpg",
        tone: "cream",
      },
      {
        slug: "firmensprachkurse-schweiz-kosten",
        title:
          "Firmensprachkurse in der Schweiz: Wer zahlt, und was das steuerlich bedeutet",
        excerpt:
          "Zahlt der Betrieb den Sprachkurs, ist er kein steuerbarer Lohn. Zahlt die Person selbst, greift ein begrenzter Abzug. Was KMU vor der Buchung klären sollten.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/firmensprachkurse-schweiz-kosten.jpg",
        tone: "cream",
      },
      {
        slug: "franzoesisch-nordwestschweiz-auffrischen",
        title:
          "Französisch in der Nordwestschweiz: lohnt sich die Auffrischung noch?",
        excerpt:
          "Deutsch mit Englisch liegt bei 8,3 Prozent, Deutsch mit Französisch bei 2,5. Warum Französisch dadurch wertvoller wird und wie Reaktivierung funktioniert.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/franzoesisch-nordwestschweiz-auffrischen.jpg",
        tone: "cream",
      },
      {
        slug: "italienisch-lernen-deutschschweiz",
        title: "Italienisch lernen als Erwachsener: was Sie schon mitbringen",
        excerpt:
          "Wortschatz aus dem Alltag, aber kein Satz möglich? Warum das Ausgangsprofil bei Italienisch anders ist als bei Schulfranzösisch und wo Sie ansetzen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/italienisch-lernen-deutschschweiz.jpg",
        tone: "cream",
      },
    ],
  },
  {
    title: "Sprechen und Übersetzen",
    columns: 2,
    cards: [
      {
        slug: "sprechhemmungen-fremdsprache",
        title: "Sprechhemmungen in einer Fremdsprache überwinden",
        excerpt:
          "Sie verstehen alles und sagen nichts? Was die Forschung seit 1986 über fremdsprachliche Sprechhemmung weiss und welche Stellschrauben sich ändern lassen.",
        readingTime: "7 Min. Lesezeit",
        image: "/images/wissen/sprechhemmungen-fremdsprache.jpg",
        tone: "green",
      },
      {
        slug: "maschinenuebersetzung-oder-uebersetzer",
        title: "Maschinenübersetzung oder Übersetzerin: wann was reicht",
        excerpt:
          "Drei normierte Stufen von der Rohübersetzung bis zur Humanübersetzung. Welche Ihr Text braucht, entscheiden Verwendungszweck, Reichweite und Haftung.",
        readingTime: "8 Min. Lesezeit",
        image: "/images/wissen/maschinenuebersetzung-oder-uebersetzer.jpg",
        tone: "blue",
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
