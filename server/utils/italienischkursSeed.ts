import type { IPage } from "~/types/dto/IPage"

export const ITALIENISCHKURS_PAGE_ID = "private-sprachkurse-italienischkurs"

const IMG = {
  circle: "/images/italienischkurs/hero-circle.svg",
  sentences: "/images/italienischkurs/icon-sentences.svg",
  career: "/images/italienischkurs/icon-career.svg",
  travel: "/images/italienischkurs/icon-travel.svg",
  processArrow: "/images/italienischkurs/process-arrow.svg",
  packages: "/images/italienischkurs/icon-packages.svg",
  line: "/images/italienischkurs/difference-line.svg",
  minus: "/images/italienischkurs/faq-minus.svg",
  knowledgeArrow: "/images/italienischkurs/knowledge-arrow.svg",
  cta: "/images/italienischkurs/cta-bg.png",
}

const CALENDLY =
  "https://calendly.com/privatesprachkurse-info/privatstunde-vor-ort"
const KONTAKT = "/#kontakt"

const subtitle = {
  de: "Italienisch für Alltag, Beruf und Reisen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
  en: "Italian for everyday life, work and travel. At the course location in Liestal, online or at your company. One-to-one or in small groups from two people.",
}

export function buildItalienischkursSeed(): IPage {
  return {
    id: ITALIENISCHKURS_PAGE_ID,
    title: {
      de: "Italienischkurs in Liestal und Baselland | Private Sprachkurse",
      en: "Italian course in Liestal and Baselland | Private Sprachkurse",
    },
    slug: "italienischkurs",
    lead: subtitle,
    img: IMG.cta,
    keywords: [
      "italienischkurs",
      "italienisch",
      "liestal",
      "baselland",
      "kleingruppe",
    ],
    sections: [
      {
        _orbi: { component: "SectionItalienischkursHero" },
        titleHighlight: { de: "Italienischkurs", en: "Italian course" },
        titleLine1Rest: { de: " in Liestal", en: " in Liestal" },
        titleLine2: { de: "und Baselland", en: "and Baselland" },
        subtitle,
        ctaLabel: {
          de: "Vorkenntnisse einschätzen lassen",
          en: "Have your prior knowledge assessed",
        },
        ctaUrl: KONTAKT,
        circleImage: IMG.circle,
      },
      {
        _orbi: { component: "SectionItalienischkursGoals" },
        title: {
          de: "Für welches Ziel lernen Sie Italienisch?",
          en: "What is your goal for learning Italian?",
        },
        goals: [
          {
            title: {
              de: "Um aus Wörtern Sätze zu machen.",
              en: "To turn words into sentences.",
            },
            body: {
              de: "Das häufigste Ausgangsprofil in der Deutschschweiz. Sie kennen Italienisch aus Gastronomie, Nachbarschaft, Musik und Ferien, verstehen mehr als erwartet und kommen über Einzelwendungen nicht hinaus. Was fehlt, ist das grammatische Gerüst, und das umfasst weniger Stoff, als die meisten annehmen.",
              en: "The most common starting profile in German-speaking Switzerland. You know Italian from restaurants, the neighbourhood, music and holidays, understand more than you expect, and cannot get past set phrases. What is missing is the grammatical framework, and it covers less material than most people assume.",
            },
            icon: IMG.sentences,
            iconWidth: 36,
            iconHeight: 44,
            tone: "blue",
            tilt: "3.4",
          },
          {
            title: { de: "Für den Beruf.", en: "For work." },
            body: {
              de: "Lieferanten in Norditalien, Partner im Tessin, Werkbesichtigungen und Reklamationen. Der Zugang zu den Leuten, die an der Maschine stehen, lässt sich nicht delegieren.",
              en: "Suppliers in northern Italy, partners in Ticino, factory visits and complaints. Access to the people at the machine cannot be delegated.",
            },
            icon: IMG.career,
            iconWidth: 38,
            iconHeight: 34,
            tone: "orange",
            tilt: "-4.62",
          },
          {
            title: {
              de: "Für Reisen und Privates.",
              en: "For travel and private life.",
            },
            body: {
              de: "Sich im Gespräch bewegen, statt zu bestellen und zu danken.",
              en: "Move through a conversation instead of ordering and saying thank you.",
            },
            icon: IMG.travel,
            iconWidth: 44,
            iconHeight: 40,
            tone: "orange",
            tilt: "3.4",
            narrowTitle: true,
          },
          {
            title: { de: "Neu beginnen.", en: "Start from scratch." },
            body: {
              de: "Ohne jede Berührung mit der Sprache. Für deutschsprachige Personen ist die Aussprache dabei ein Vorteil, weil die Laute weitgehend so gesprochen werden, wie sie geschrieben stehen.",
              en: "With no prior contact with the language. For German speakers, pronunciation is an advantage, because the sounds are largely spoken as they are written.",
            },
            icon: IMG.travel,
            iconWidth: 44,
            iconHeight: 40,
            tone: "green",
            tilt: "-6",
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursProcess" },
        title: { de: "So läuft es ab", en: "How it works" },
        arrowImage: IMG.processArrow,
        steps: [
          {
            title: {
              de: "Sie schildern, was Sie kennen.",
              en: "You describe what you already know.",
            },
            body: {
              de: "Wörter aus dem Alltag, Situationen, in denen Sie Italienisch hören, und wofür Sie es brauchen.",
              en: "Words from everyday life, situations in which you hear Italian, and what you need it for.",
            },
          },
          {
            title: {
              de: "Hörverstehen und Struktur werden getrennt eingeschätzt.",
              en: "Listening comprehension and structure are assessed separately.",
            },
            body: {
              de: "Bei Alltagsvorkenntnissen liegen diese beiden Werte weit auseinander, weshalb eine einzelne Stufenangabe wenig aussagt.",
              en: "With everyday prior knowledge these two values are far apart, which is why a single level label says little.",
            },
            titleWeight: "semibold",
          },
          {
            title: {
              de: "Sie erhalten einen Vorschlag.",
              en: "You receive a proposal.",
            },
            body: {
              de: "Ob zuerst das Gerüst aufgebaut oder der Wortschatz erweitert wird.",
              en: "Whether the framework is built first or vocabulary is expanded.",
            },
          },
          {
            title: { de: "Erste Lektion.", en: "First lesson." },
            body: {
              de: "Gesprochen wird von Beginn an, weil die Hemmschwelle bei Italienisch üblicherweise tiefer liegt als bei anderen Sprachen.",
              en: "Speaking starts from the beginning, because the inhibition threshold for Italian is usually lower than for other languages.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursPricing" },
        title: { de: "Online-Pakete", en: "Online packages" },
        icon: IMG.packages,
        plans: [
          {
            name: { de: "Privatkurs", en: "Private course" },
            price: "88",
            detailTop: { de: "pro Lektion", en: "per lesson" },
            detailBottom: { de: "55 Min.", en: "55 min." },
            tone: "gray",
            tilt: "-10.26",
            cta: { de: "Termin buchen", en: "Book an appointment" },
            ctaAction: "external",
            ctaUrl: CALENDLY,
          },
          {
            name: { de: "5er-Abo", en: "5-lesson package" },
            price: "435",
            detailTop: { de: "CHF 87", en: "CHF 87" },
            detailBottom: { de: "pro lektion", en: "per lesson" },
            tone: "gray",
            tilt: "-0.43",
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: KONTAKT,
          },
          {
            name: { de: "20er-Abo", en: "20-lesson package" },
            price: "1’695",
            detailTop: { de: "CHF 85", en: "CHF 85" },
            detailBottom: { de: "pro lektion", en: "per lesson" },
            tone: "blue",
            tilt: "-6.2",
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: KONTAKT,
          },
          {
            name: { de: "Kleingruppe", en: "Small group" },
            note: { de: "ab 2 Personen", en: "from 2 people" },
            price: "77",
            detailTop: { de: "pro Person", en: "per person" },
            detailBottom: { de: "55 Min.", en: "55 min." },
            tone: "gray",
            tilt: "5.91",
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaAction: "calculator",
            calculatorLang: "it",
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursDifference" },
        title: {
          de: "Was diesen Unterricht unterscheidet?",
          en: "What sets this teaching apart?",
        },
        lineImage: IMG.line,
        items: [
          {
            title: {
              de: "Vorhandenes wird zuerst sichtbar gemacht.",
              en: "What you already have is made visible first.",
            },
            body: {
              de: "Die meisten starten nicht bei null, sondern mit einem Wortschatz aus Jahren beiläufigen Kontakts. Dieser Bestand wird gesammelt, bevor Neues dazukommt.",
              en: "Most people do not start from zero, but with vocabulary from years of incidental contact. That stock is collected before anything new is added.",
            },
          },
          {
            title: {
              de: "Das Gerüst wird gezielt aufgebaut.",
              en: "The framework is built in a targeted way.",
            },
            body: {
              de: "Präsens, Vergangenheit und die häufigsten unregelmässigen Verben genügen, um aus vorhandenen Wörtern eigene Sätze zu bauen. Das ist wenig Stoff mit grosser Wirkung.",
              en: "Present tense, past tense and the most common irregular verbs are enough to build your own sentences from words you already have. That is little material with a large effect.",
            },
          },
          {
            title: {
              de: "Vorkenntnisse in Französisch werden genutzt.",
              en: "Prior knowledge of French is used.",
            },
            body: {
              de: "Italienisch und Französisch gehen beide auf das Lateinische zurück. Wer die Systematik einer der beiden Sprachen kennt, erkennt sie in der anderen wieder, was Erklärungen verkürzt.",
              en: "Italian and French both go back to Latin. Anyone who knows the system of one of the two languages recognises it in the other, which shortens explanations.",
            },
          },
          {
            title: {
              de: "Volle Redezeit im Einzelunterricht.",
              en: "Full speaking time in one-to-one lessons.",
            },
            body: {
              de: "Sie sprechen die ganze Lektion selbst.",
              en: "You speak for the whole lesson yourself.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursFaq" },
        title: {
          de: "Häufige Fragen zur Buchung",
          en: "Common questions about booking",
        },
        minusIcon: IMG.minus,
        items: [
          {
            question: {
              de: "Ich kenne viele Wörter, kann aber keinen Satz bilden. Passt der Kurs?",
              en: "I know many words but cannot form a sentence. Does the course fit?",
            },
            answer: {
              de: "Ja, das ist die häufigste Ausgangslage. Der Einstieg erfolgt beim Gerüst und nicht beim Wortschatz.",
              en: "Yes, that is the most common starting point. You begin with the framework, not with vocabulary.",
            },
          },
          {
            question: {
              de: "Kann ich einzelne Lektionen buchen?",
              en: "Can I book individual lessons?",
            },
            answer: {
              de: "Ja. Die Abos sind günstiger pro Lektion.",
              en: "Yes. The packages are cheaper per lesson.",
            },
          },
          {
            question: {
              de: "Können wir zu zweit kommen?",
              en: "Can we come as a pair?",
            },
            answer: {
              de: "Ja, ab zwei Personen auf ähnlichem Niveau gilt der Kleingruppenpreis pro Person.",
              en: "Yes, from two people at a similar level the small-group price applies per person.",
            },
          },
          {
            question: {
              de: "Ist Unterricht im Betrieb möglich?",
              en: "Are lessons at the company possible?",
            },
            answer: {
              de: "Ja, in Baselland und Basel, einzeln oder in Gruppen. Für Betriebe mit Lieferantenbeziehungen nach Norditalien oder ins Tessin ist das die übliche Form.",
              en: "Yes, in Baselland and Basel, one-to-one or in groups. For companies with supplier relationships in northern Italy or Ticino, that is the usual form.",
            },
          },
          {
            question: {
              de: "Wie kurzfristig ist ein Einstieg möglich?",
              en: "How soon can I start?",
            },
            answer: {
              de: "Es gibt keine festen Kursstarts.",
              en: "There are no fixed course start dates.",
            },
          },
          {
            question: {
              de: "Lerne ich Italienisch oder Tessiner Dialekt?",
              en: "Do I learn Italian or Ticino dialect?",
            },
            answer: {
              de: "Standarditalienisch. Es trägt im Beruf, in Behördenkontakten und in der Korrespondenz überall, im Tessin wie in Italien.",
              en: "Standard Italian. It holds up at work, in contact with authorities and in correspondence everywhere, in Ticino as well as in Italy.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursKnowledge" },
        tagline: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: {
          de: "Wissenswertes zum Italienischlernen",
          en: "Worth knowing about learning Italian",
        },
        arrowImage: IMG.knowledgeArrow,
        points: [
          {
            de: "Was Sie beim Italienischlernen schon mitbringen, mit dem Profilvergleich zu Schulfranzösisch",
            en: "What you already bring to learning Italian, with the profile comparison to school French",
          },
          {
            de: "Wie Sie Ihr Niveau getrennt nach Fertigkeiten einschätzen",
            en: "How to assess your level separately by skill",
          },
          {
            de: "Wie lange es realistisch dauert, eine Sprache zu lernen",
            en: "How long it realistically takes to learn a language",
          },
        ],
      },
      {
        _orbi: { component: "SectionItalienischkursCta" },
        title: {
          de: "Italienischkurs anfragen",
          en: "Request an Italian course",
        },
        body: {
          de: "Schildern Sie, in welchen Situationen Sie Italienisch hören oder brauchen und was Sie heute damit tun können. Sie erhalten eine Einschätzung, bevor Sie etwas buchen.",
          en: "Describe the situations in which you hear or need Italian and what you can do with it today. You receive an assessment before you book anything.",
        },
        ctaLabel: {
          de: "Vorkenntnisse einschätzen lassen",
          en: "Have your prior knowledge assessed",
        },
        ctaUrl: KONTAKT,
        image: IMG.cta,
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
