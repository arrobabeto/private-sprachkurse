export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; id: string; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "strong"; text: string }
  | { kind: "link"; href: string; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] }

export type WissenArticle = {
  slug: string
  hero: string
  author: string
  date: string
  readingLabel: string
  ctaTitle: string
  ctaBody: string
  ctaLabel: string
  ctaUrl: string
  ctaImage: string
  blocks: ArticleBlock[]
}

const comparison: ArticleBlock = {
  kind: "table",
  headers: ["Kriterium", "Privatunterricht", "Privatunterricht", "Online"],
  rows: [
    [
      "Redezeit pro Lektion",
      "volle Lektionsdauer",
      "geteilt durch Gruppengrösse",
      "wie im gewählten Format",
    ],
    [
      "Inhalt bestimmt",
      "die lernende Person",
      "die Gruppe gemeinsam",
      "wie im gewählten Format",
    ],
    [
      "Termin bestimmt",
      "die lernende Person",
      "alle Teilnehmenden",
      "die lernende Person",
    ],
    ["Preis pro Person", "am höchsten", "tiefer", "10 Franken unter Präsenz"],
    ["Weg zum Unterricht", "bis Liestal", "bis Liestal", "keiner"],
    ["Übung mit fremden Akzenten", "nein", "ja", "je nach Format"],
  ],
}

export const sprachkursArticle: WissenArticle = {
  slug: "sprachkurs-in-liestal-finden",
  hero: "/images/wissen/article-hero.png",
  author: "Vivian",
  date: "12 Dic 2026",
  readingLabel: "Lesezeit: ca. 6–7 Minuten",
  ctaTitle: "Deutschkurs anfragen",
  ctaBody:
    "Schildern Sie Ihr Ziel, Ihre Vorkenntnisse und Ihre möglichen Zeitfenster. Sie erhalten eine Einschätzung Ihres Ausgangsniveaus und einen Vorschlag, bevor Sie etwas buchen.",
  ctaLabel: "Ziel schildern",
  ctaUrl: "/kontakt",
  ctaImage: "/images/wissen/article-cta.png",
  blocks: [
    {
      kind: "p",
      text: "In Liestal und Umgebung gibt es Sprachkurse als Privatunterricht, als Kleingruppe und online. Zwei Grössen entscheiden, welches Format zu Ihnen passt, und beide können Sie selbst ausrechnen. Erstens die Redezeit, also Lektionsdauer geteilt durch Anzahl Teilnehmende. Zweitens die Termintauglichkeit, also ob der Kurs vier Wochen lang neben Ihrem Alltag Bestand hat. Privatunterricht kostet bei mir CHF 98 vor Ort und CHF 88 online pro Lektion à 55 Minuten, in der Kleingruppe ab zwei Personen CHF 88 beziehungsweise CHF 77 pro Person.",
    },
    {
      kind: "h2",
      id: "formate",
      text: "Was unterscheidet die Kursformate tatsächlich?",
    },
    {
      kind: "p",
      text: "Die Beschreibungen der Anbieter klingen ähnlich. Alle sprechen von individueller Betreuung, von erfahrenen Lehrpersonen und von Kursen für jedes Niveau. Nach zwei Stunden Recherche haben Sie fünf Websites gelesen und wissen immer noch nicht, welches Angebot zu Ihrer Situation passt.",
    },
    {
      kind: "p",
      text: "Das liegt daran, dass die interessanten Unterschiede selten auf den Kursseiten stehen. Sie ergeben sich aus der Gruppengrösse, aus dem Ort und aus der Frage, wer den Lernweg bestimmt.",
    },
    comparison,
    {
      kind: "p",
      text: "Die Tabelle beantwortet die Frage noch nicht. Sie zeigt aber, worauf Sie beim Vergleich achten müssen.",
    },
    {
      kind: "h2",
      id: "sprechzeit",
      text: "Wie viel sprechen Sie in welchem Format?",
    },
    {
      kind: "p",
      text: "Sprachen lernt man durch Sprechen. Also ist die entscheidende Grösse nicht die Kursdauer, sondern der Anteil davon, in dem Sie selbst an der Reihe sind.",
    },
    {
      kind: "p",
      text: "Ein Rechenbeispiel an einem öffentlich ausgeschriebenen Angebot. Das Goethe-Institut führt seinen Online-Gruppenkurs mit 160 Unterrichtseinheiten à 45 Minuten über sieben Wochen, bei maximal 18 Teilnehmenden pro Kurs (Angebot Stand Juni 2026). Das ergibt 7'200 Unterrichtsminuten. Geteilt durch 18 Personen bleiben rechnerisch 400 Minuten pro Person, also 6 Stunden und 40 Minuten eigene Sprechzeit über sieben Wochen.",
    },
    {
      kind: "p",
      text: "Dieselbe Rechnung im Einzelunterricht. Eine Lektion à 55 Minuten, eine lernende Person, ergibt 55 Minuten. Fünf Lektionen ergeben 275 Minuten, also 4 Stunden und 35 Minuten, bei einem Bruchteil des Zeitaufwands.",
    },
    {
      kind: "p",
      text: "Diese Rechnung misst Sprechzeit, nicht Lernwert. Ein Gruppenkurs liefert Struktur, Hörverstehen und den Vergleich mit anderen Lernenden, und für viele Menschen ist die Gruppe der angenehmere Ort zum Anfangen. Wer aber zu mir kommt und sagt, er verstehe alles und bringe keinen Satz heraus, hat fast immer ein Sprechzeit-Problem und kein Grammatik-Problem.",
    },
    {
      kind: "h2",
      id: "privatunterricht",
      text: "Für wen eignet sich Privatunterricht?",
    },
    {
      kind: "p",
      text: "Eine Lehrperson, eine lernende Person, und das Programm richtet sich nach Ihrem Ziel. Wer Französisch für Kundengespräche braucht, übt Kundengespräche. Wer eine Einbürgerungsprüfung vor sich hat, übt das Prüfungsformat. Es gibt keinen Lehrplan, der zuerst abgearbeitet werden muss, und keine Gruppe, auf die gewartet wird.",
    },
    {
      kind: "p",
      text: "Der zweite Vorteil zeigt sich bei ungleichen Niveaus innerhalb einer Person. Viele können eine Sprache gut lesen und schlecht sprechen, oder umgekehrt. In der Gruppe wird über alle vier Fertigkeiten gleichmässig gearbeitet. Im Einzelunterricht lässt sich die Zeit dorthin lenken, wo die Lücke tatsächlich ist.",
    },
    {
      kind: "p",
      text: "Passend ist das Format bei einer Prüfung mit fixem Datum, bei ausgeprägten Unterschieden zwischen Verstehen und Sprechen, bei Fachvokabular für einen bestimmten Beruf und beim Wiedereinstieg nach vielen Jahren, wenn Sie nicht vor anderen bei null anfangen möchten.",
    },
    {
      kind: "h2",
      id: "kleingruppe",
      text: "Für wen eignet sich die Kleingruppe?",
    },
    {
      kind: "p",
      text: "Ab zwei Teilnehmenden auf ähnlichem Niveau. Sie hören andere Akzente, andere Fehler und andere Formulierungen für dasselbe Anliegen. Das kommt der Situation ausserhalb des Kursraums näher, weil dort ebenfalls niemand langsam und fehlerfrei mit Ihnen spricht.",
    },
    {
      kind: "p",
      text: "Die Redezeit teilt sich auf, der Preis ebenfalls. In meinem Kurslokal kostet die Kleingruppe CHF 88 statt CHF 98 pro Person, online CHF 77 statt CHF 88. Bei zwei Personen zahlen Sie also 10 beziehungsweise 11 Franken weniger und sprechen rechnerisch halb so lange. Ob sich das lohnt, hängt davon ab, ob die zweite Person Ihnen etwas bringt. Bei einem Paar, das gemeinsam nach Italien zieht, bringt sie viel. Bei zwei Fremden mit unterschiedlichen Zielen weniger.",
    },
    {
      kind: "p",
      text: "Passend ist das Format, wenn Sie zu zweit oder zu dritt mit einem gemeinsamen Anlass lernen, wenn Konversation das Hauptziel ist, und wenn der Einzelunterricht Ihnen zu viel Aufmerksamkeit auf einmal bedeutet.",
    },
    {
      kind: "h2",
      id: "online",
      text: "Wann ist online die bessere Wahl?",
    },
    {
      kind: "p",
      text: "Inhaltlich ist es derselbe Unterricht, über Zoom oder Google Meet statt am Tisch im Kurslokal. Der Unterschied ist organisatorisch. Es gibt keinen Arbeitsweg, und der Unterricht funktioniert aus dem Homeoffice, aus dem Büro über Mittag oder aus dem Ausland.",
    },
    {
      kind: "p",
      text: "Schwerer fallen am Bildschirm spontane Zwischenbemerkungen und Körpersprache. Dafür fällt der häufigste Grund weg, aus dem Kurse abgebrochen werden, nämlich die Anfahrt an einem Abend, an dem der Tag schon lang war.",
    },
    {
      kind: "p",
      text: "«Die meisten, die aufhören, hören nicht auf, weil die Sprache zu schwer ist. Sie hören auf, weil der Termin nicht mehr in die Woche passt.» Viviane Baier, Sprachtrainerin, Liestal",
    },
    {
      kind: "p",
      text: "Passend ist online bei unregelmässigen Arbeitszeiten, bei einer Anfahrt von mehr als zwanzig Minuten, bei Betreuungspflichten am Abend und bei allen, die beruflich viel unterwegs sind.",
    },
    {
      kind: "h2",
      id: "kosten",
      text: "Was kostet ein Sprachkurs in Liestal?",
    },
    {
      kind: "p",
      text: "Bei mir gelten folgende Ansätze pro Lektion à 55 Minuten. Stand September 2026.",
    },
    { kind: "strong", text: "Online" },
    {
      kind: "ul",
      items: [
        "Privatkurs CHF 88",
        "5er-Abo CHF 435, entspricht CHF 87 pro Lektion",
        "20er-Abo CHF 1'695, entspricht CHF 85 pro Lektion",
        "Kleingruppe ab zwei Personen CHF 77 pro Person",
      ],
    },
    { kind: "strong", text: "Präsenz im Kurslokal Liestal" },
    {
      kind: "ul",
      items: [
        "Privatkurs CHF 98",
        "5er-Abo CHF 485, entspricht CHF 97 pro Lektion",
        "20er-Abo CHF 1'895, entspricht CHF 95 pro Lektion",
        "Kleingruppe ab zwei Personen CHF 88 pro Person",
      ],
    },
    {
      kind: "p",
      text: "Ich unterrichte Deutsch, Englisch, Französisch, Italienisch und Spanisch, vom Anfänger- bis zum Fortgeschrittenenniveau, im Kurslokal in Liestal, online oder in Ihrem Betrieb.",
    },
    {
      kind: "p",
      text: "Beim Vergleich mit Kursblöcken lohnt sich eine Zwischenrechnung. Ein Blockpreis wirkt tiefer als ein Lektionspreis, enthält aber eine feste Anzahl Termine. Teilen Sie den Blockpreis durch die Anzahl Lektionen und danach durch die Gruppengrösse. Erst diese Zahl ist mit einem Lektionspreis vergleichbar.",
    },
    {
      kind: "h2",
      id: "vergleich",
      text: "Warum sich Lektionspreise nicht direkt vergleichen lassen",
    },
    {
      kind: "p",
      text: "Ein Preis pro Lektion ist erst dann eine Vergleichsgrösse, wenn klar ist, was eine Lektion umfasst. Drei Dinge verschieben den tatsächlichen Wert erheblich.",
    },
    {
      kind: "p",
      text: "Die Länge der Lektion. Es gibt keine einheitliche Definition. Das Goethe-Institut rechnet in Unterrichtseinheiten von 45 Minuten. Andere Anbieter arbeiten mit 50, 55 oder 60 Minuten. Zwischen 45 und 60 Minuten liegt ein Drittel mehr Zeit beim gleichen Wort. Rechnen Sie deshalb auf den Minutenpreis um, bevor Sie zwei Angebote nebeneinanderlegen.",
    },
    {
      kind: "p",
      text: "Das Material. Manche Angebote enthalten Lehrmittel, andere stellen sie zusätzlich in Rechnung. Bei einem mehrmonatigen Kurs macht das einen spürbaren Unterschied im Gesamtbetrag.",
    },
    {
      kind: "p",
      text: "Die Regelung bei Absagen. Das ist der Posten, der im Vergleich am häufigsten fehlt und im Verlauf am meisten kostet. Fragen Sie konkret, bis wann sich ein Termin verschieben lässt und was mit einer Lektion geschieht, die Sie kurzfristig absagen müssen. Bei einem festen Kursblock ist eine verpasste Lektion in der Regel nicht nachholbar, bei einzeln gebuchten Lektionen hängt es von der Frist ab.",
    },
    {
      kind: "p",
      text: "Diese drei Punkte lassen sich in einer einzigen E-Mail klären. Der Aufwand lohnt sich, weil sie zusammen den Unterschied zwischen zwei scheinbar gleich teuren Angeboten ausmachen können.",
    },
    {
      kind: "h2",
      id: "pruefen",
      text: "Wie prüfen Sie, ob ein Format zu Ihnen passt?",
    },
    {
      kind: "p",
      text: "Drei Schritte, die Sie in zehn Minuten erledigen, bevor Sie irgendwo buchen.",
    },
    {
      kind: "ol",
      items: [
        "Redezeit ausrechnen. Lektionsdauer geteilt durch Anzahl Teilnehmende. Notieren Sie die Zahl für jedes Angebot, das Sie in die engere Auswahl nehmen. Bei Anbietern ohne Angabe zur Gruppengrösse fragen Sie nach, bevor Sie buchen.",
        "Termin gegen den Kalender halten. Tragen Sie den Kurstermin für die nächsten vier Wochen ein. Kollidiert er dreimal, ist das Format falsch und nicht Ihre Disziplin. Dann ist online oder ein flexibel buchbares Angebot die realistischere Wahl.",
        "Klären, wie Ihr Niveau bestimmt wird. Fragen Sie, was vor der ersten Lektion passiert. Ohne Einschätzung beginnt der Unterricht an einem geratenen Punkt, und die erste Lektion geht für Korrekturen drauf.",
      ],
    },
    { kind: "h2", id: "faq", text: "Häufig gestellte Fragen" },
    {
      kind: "p",
      text: "Welches Niveau brauche ich für den Einstieg? Keines. Ich unterrichte vom Anfänger- bis zum Fortgeschrittenenniveau. Vor der ersten Lektion klären wir Ihr Niveau und Ihr Ziel.",
    },
    {
      kind: "p",
      text: "Wie lange dauert eine Lektion? 55 Minuten, online wie im Kurslokal.",
    },
    {
      kind: "p",
      text: "Wie lang ist eine Unterrichtsstunde? Das ist nicht einheitlich geregelt. Hier dauert eine Lektion 55 Minuten. Andere Anbieter rechnen mit Unterrichtseinheiten von 45 Minuten. Für einen Preisvergleich lohnt sich die Umrechnung auf den Minutenpreis.",
    },
    {
      kind: "p",
      text: "Wie viele Personen sind in einer Kleingruppe? Ab zwei Personen. Die Gruppen bleiben klein, damit die Redezeit pro Person nicht unter das fällt, was einen Unterschied macht.",
    },
    {
      kind: "p",
      text: "Kann ich zwischen Präsenz und Online wechseln? Ja. Beide Formate sind einzeln buchbar, Sie legen sich nicht auf eines fest.",
    },
    {
      kind: "p",
      text: "Gibt es Kurse für Firmen? Ja, als Unterricht in Ihrem Betrieb oder Ihrer Organisation. Details finden Sie unter «In Unternehmen».",
    },
    {
      kind: "p",
      text: "Wo findet der Präsenzunterricht statt? In meinem Kurslokal in Liestal.",
    },
    {
      kind: "p",
      text: "Welche Sprachen unterrichten Sie? Deutsch, Englisch, Französisch, Italienisch und Spanisch.",
    },
    { kind: "h2", id: "schluss", text: "Zum Schluss" },
    {
      kind: "p",
      text: "Die Redezeit-Rechnung hat einen unangenehmen Nebeneffekt. Sie zeigt, dass die günstigste Variante pro Lektion nicht die günstigste pro gesprochener Minute sein muss, und dass ein Kurs, der im Januar gut aussieht, im Februar bereits nicht mehr stattfindet, wenn der Termin nicht passt. Beide Zahlen können Sie vor der Buchung ermitteln. Das ist mehr, als die meisten Kursbeschreibungen zulassen.",
    },
    {
      kind: "p",
      text: "Wenn die Rechnung kein eindeutiges Ergebnis liefert, schildern Sie mir Ihr Ziel, Ihre Vorkenntnisse und Ihre möglichen Zeitfenster. Ich melde mich mit einer Einschätzung, welches Format in Ihrem Fall aufgeht, und mit einem Terminvorschlag für die erste Lektion.",
    },
    {
      kind: "link",
      href: "/kontakt",
      text: "Ziel schildern und Einschätzung erhalten",
    },
  ],
}

export const wissenArticles = [sprachkursArticle]

export function findWissenArticle(slug: string) {
  return wissenArticles.find((article) => article.slug === slug) ?? null
}
