import type { IPage } from "~/types/dto/IPage"

export const SPANISCHKURS_PAGE_ID = "private-sprachkurse-spanischkurs"

const IMG = {
  circle: "/images/spanischkurs/hero-circle.svg",
  iconStart: "/images/spanischkurs/icon-start.svg",
  iconTravel: "/images/spanischkurs/icon-travel.svg",
  iconWork: "/images/spanischkurs/icon-work.svg",
  processArrow: "/images/spanischkurs/process-arrow.svg",
  iconOnline: "/images/spanischkurs/icon-online.svg",
  differenceLine: "/images/spanischkurs/difference-line.svg",
  iconMinus: "/images/spanischkurs/icon-minus.svg",
  insightsArrow: "/images/spanischkurs/insights-arrow.svg",
  cta: "/images/spanischkurs/cta-bg.png",
}

const CALENDLY =
  "https://calendly.com/privatesprachkurse-info/privatstunde-vor-ort"

export function buildSpanischkursSeed(): IPage {
  return {
    id: SPANISCHKURS_PAGE_ID,
    title: {
      de: "Spanischkurs in Liestal und Baselland | Private Sprachkurse",
      en: "Spanish course in Liestal and Baselland | Private Sprachkurse",
    },
    slug: "spanischkurs",
    lead: {
      de: "Spanisch von Anfang an oder zum Auffrischen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
      en: "Spanish from the very beginning or as a refresher. At the course location in Liestal, online, or at your company. One-to-one or in small groups from two people.",
    },
    img: IMG.cta,
    keywords: [
      "spanischkurs",
      "spanisch",
      "liestal",
      "baselland",
      "privatunterricht",
    ],
    sections: [
      {
        _orbi: { component: "SectionSpanischkursHero" },
        titleLine1: {
          de: "Spanischkurs in Liestal",
          en: "Spanish course in Liestal",
        },
        titleLine2: { de: "und Baselland", en: "and Baselland" },
        subtitle: {
          de: "Spanisch von Anfang an oder zum Auffrischen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
          en: "Spanish from the very beginning or as a refresher. At the course location in Liestal, online, or at your company. One-to-one or in small groups from two people.",
        },
        ctaLabel: {
          de: "Ziel schildern und Einschätzung erhalten",
          en: "Describe your goal and get an assessment",
        },
        ctaUrl: "/#kontakt",
        circleImage: IMG.circle,
      },
      {
        _orbi: { component: "SectionSpanischkursGoals" },
        title: {
          de: "Für welches Ziel lernen Sie Spanisch?",
          en: "What is your goal in learning Spanish?",
        },
        goals: [
          {
            title: { de: "Von Anfang an.", en: "From the very beginning." },
            body: {
              de: "Spanisch ist in der Deutschschweiz selten Schulsprache, weshalb hier die meisten tatsächlich bei null beginnen. Für deutschsprachige Personen ist der Einstieg vergleichsweise zugänglich, weil die Aussprache der Schreibung folgt und die Satzmuster regelmässig sind.",
              en: "Spanish is rarely a school language in German-speaking Switzerland, so most people here really do start from zero. For German speakers the start is comparatively approachable, because pronunciation follows spelling and the sentence patterns are regular.",
            },
            icon: IMG.iconStart,
            tone: "blue",
            rotate: 3.4,
          },
          {
            title: { de: "Für Reisen.", en: "For travel." },
            body: {
              de: "Spanien, Lateinamerika, längere Aufenthalte. Das Ziel ist hier üblicherweise, ein Gespräch zu führen, und nicht, fehlerfrei zu schreiben.",
              en: "Spain, Latin America, longer stays. The goal here is usually to hold a conversation, not to write without mistakes.",
            },
            icon: IMG.iconTravel,
            tone: "orange",
            rotate: -4.62,
          },
          {
            title: { de: "Für den Beruf.", en: "For work." },
            body: {
              de: "Kundschaft, Lieferanten oder Kolleginnen im spanischsprachigen Raum. Geübt wird an den Situationen, die bei Ihnen vorkommen.",
              en: "Customers, suppliers, or colleagues in the Spanish-speaking world. You practise the situations that actually come up for you.",
            },
            icon: IMG.iconWork,
            tone: "orange",
            rotate: 3.4,
          },
          {
            title: { de: "Zum Auffrischen.", en: "To refresh." },
            body: {
              de: "Wenn Sie Spanisch einmal gelernt und lange nicht gebraucht haben. Verloren geht dabei zuerst der Abruf, nicht das Wissen.",
              en: "If you once learned Spanish and have not used it for a long time. What fades first is retrieval, not the knowledge itself.",
            },
            icon: IMG.iconWork,
            tone: "green",
            rotate: -6,
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursProcess" },
        title: { de: "So läuft es ab", en: "How it works" },
        arrowImage: IMG.processArrow,
        steps: [
          {
            title: {
              de: "Sie schildern Ihr Ziel.",
              en: "You describe your goal.",
            },
            body: {
              de: "Reisen, Beruf oder Alltag, dazu allfällige Vorkenntnisse.",
              en: "Travel, work, or everyday life, plus any prior knowledge.",
            },
          },
          {
            title: {
              de: "Die Variante wird geklärt.",
              en: "The variety is settled.",
            },
            body: {
              de: "Europäisches oder lateinamerikanisches Spanisch. Die Unterschiede betreffen Aussprache, einzelne Formen und Wortschatz. Für den Einstieg ist die Wahl weniger einschneidend, als oft angenommen, für ein konkretes Reiseziel oder einen beruflichen Kontext lohnt sich die Abstimmung trotzdem.",
              en: "European or Latin American Spanish. The differences concern pronunciation, a few forms, and vocabulary. For getting started, the choice matters less than people often assume; for a specific travel destination or a professional context, aligning it is still worthwhile.",
            },
          },
          {
            title: {
              de: "Sie erhalten einen Vorschlag.",
              en: "You receive a proposal.",
            },
            body: {
              de: "Format, Rhythmus und Schwerpunkt.",
              en: "Format, rhythm, and focus.",
            },
          },
          {
            title: { de: "Erste Lektion.", en: "First lesson." },
            body: {
              de: "Gesprochen wird von Beginn an.",
              en: "You speak from the very start.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursPackages" },
        title: { de: "Online-Pakete", en: "Online packages" },
        icon: IMG.iconOnline,
        plans: [
          {
            name: { de: "Privatkurs", en: "Private course" },
            price: "88",
            line1: { de: "pro Lektion", en: "per lesson" },
            line2: { de: "55 Min.", en: "55 min." },
            variant: "gray",
            rotate: -10.26,
            cta: { de: "Termin buchen", en: "Book an appointment" },
            ctaUrl: CALENDLY,
          },
          {
            name: { de: "5er-Abo", en: "5-lesson pass" },
            price: "435",
            line1: { de: "CHF 87", en: "CHF 87" },
            line2: { de: "pro lektion", en: "per lesson" },
            variant: "gray",
            rotate: -0.43,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "20er-Abo", en: "20-lesson pass" },
            price: "1’695",
            line1: { de: "CHF 85", en: "CHF 85" },
            line2: { de: "pro lektion", en: "per lesson" },
            variant: "blue",
            rotate: -6.2,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "Kleingruppe", en: "Small group" },
            note: { de: "ab 2 Personen", en: "from 2 people" },
            price: "77",
            line1: { de: "pro Person", en: "per person" },
            line2: { de: "55 Min.", en: "55 min." },
            variant: "gray",
            rotate: 5.91,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaAction: "calculator",
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursDifference" },
        title: {
          de: "Was diesen Unterricht unterscheidet?",
          en: "What sets these lessons apart?",
        },
        lineImage: IMG.differenceLine,
        items: [
          {
            title: {
              de: "Sprechen ab der ersten Lektion.",
              en: "Speaking from the first lesson.",
            },
            body: {
              de: "Bei einer Sprache, die neu ist, entsteht die Hemmung schnell, wenn zuerst wochenlang Stoff gesammelt wird. Produziert wird deshalb von Beginn an, auch mit wenigen Mitteln.",
              en: "With a new language, hesitation sets in quickly if weeks are spent collecting material first. You therefore produce language from the start, even with very little to work with.",
            },
          },
          {
            title: {
              de: "Kein Lehrplan, der zuerst abgearbeitet wird.",
              en: "No syllabus that has to be worked through first.",
            },
            body: {
              de: "Wer für eine Reise lernt, übt Reisesituationen. Wer beruflich damit zu tun hat, übt die eigenen Fälle.",
              en: "If you are learning for a trip, you practise travel situations. If you need it for work, you practise your own cases.",
            },
          },
          {
            title: {
              de: "Vorkenntnisse in anderen romanischen Sprachen werden genutzt.",
              en: "Prior knowledge of other Romance languages is used.",
            },
            body: {
              de: "Spanisch, Französisch und Italienisch teilen Satzmuster und Zeitformen. Wer eine davon kennt, erkennt Systematik wieder, was Erklärungen verkürzt.",
              en: "Spanish, French, and Italian share sentence patterns and tenses. If you know one of them, you recognise the system again, which shortens the explanations.",
            },
          },
          {
            title: {
              de: "Volle Redezeit im Einzelunterricht.",
              en: "The full speaking time in one-to-one lessons.",
            },
            body: {
              de: "Sie sprechen die ganze Lektion selbst.",
              en: "You speak for the whole lesson yourself.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursFaq" },
        title: {
          de: "Häufige Fragen zur Buchung",
          en: "Common questions about booking",
        },
        minusIcon: IMG.iconMinus,
        items: [
          {
            question: {
              de: "Ich habe keinerlei Vorkenntnisse. Ist das ein Problem?",
              en: "I have no prior knowledge at all. Is that a problem?",
            },
            answer: {
              de: "Nein. Bei Spanisch beginnen in dieser Region die meisten tatsächlich bei null.",
              en: "No. With Spanish, most people in this region really do start from zero.",
            },
          },
          {
            question: {
              de: "Europäisches oder lateinamerikanisches Spanisch?",
              en: "European or Latin American Spanish?",
            },
            answer: {
              de: "Das wird zu Beginn besprochen und richtet sich nach Ihrem Ziel. Für den Einstieg spielt die Wahl eine kleinere Rolle, als viele annehmen.",
              en: "That is discussed at the start and follows your goal. For getting started, the choice matters less than many people assume.",
            },
          },
          {
            question: {
              de: "Kann ich einzelne Lektionen buchen?",
              en: "Can I book individual lessons?",
            },
            answer: {
              de: "Ja. Die Abos sind günstiger pro Lektion.",
              en: "Yes. The passes are less expensive per lesson.",
            },
          },
          {
            question: {
              de: "Können wir zu zweit kommen?",
              en: "Can we come as a pair?",
            },
            answer: {
              de: "Ja, ab zwei Personen auf ähnlichem Niveau gilt der Kleingruppenpreis pro Person. Für Paare vor einer gemeinsamen Reise ist das die naheliegende Form.",
              en: "Yes. From two people at a similar level, the small-group price applies per person. For couples before a trip together, that is the natural format.",
            },
          },
          {
            question: {
              de: "Ist Unterricht im Betrieb möglich?",
              en: "Are lessons at the company possible?",
            },
            answer: {
              de: "Ja, in Baselland und Basel, einzeln oder in Gruppen.",
              en: "Yes, in Baselland and Basel, one-to-one or in groups.",
            },
          },
          {
            question: {
              de: "Wie kurzfristig ist ein Einstieg möglich?",
              en: "How soon can I start?",
            },
            answer: {
              de: "Es gibt keine festen Kursstarts. Nach dem Erstgespräch wird ein Termin vereinbart.",
              en: "There are no fixed course start dates. After the first conversation, an appointment is arranged.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursInsights" },
        tagline: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: {
          de: "Wissenswertes zum Sprachenlernen",
          en: "Worth knowing about learning a language",
        },
        arrowImage: IMG.insightsArrow,
        items: [
          {
            text: {
              de: "Welches Kursformat zu Ihnen passt, mit Preisen und Vergleich",
              en: "Which course format suits you, with prices and a comparison",
            },
          },
          {
            text: {
              de: "Wie lange es realistisch dauert, eine Sprache zu lernen",
              en: "How long it realistically takes to learn a language",
            },
          },
          {
            text: {
              de: "Wie Sie Ihr Niveau getrennt nach Fertigkeiten einschätzen",
              en: "How to judge your level separately by skill",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionSpanischkursCta" },
        title: {
          de: "Spanischkurs anfragen",
          en: "Enquire about a Spanish course",
        },
        body: {
          de: "Schildern Sie Ihr Ziel, allfällige Vorkenntnisse und Ihre möglichen Zeitfenster. Sie erhalten einen Vorschlag, bevor Sie etwas buchen.",
          en: "Describe your goal, any prior knowledge, and the times that suit you. You receive a proposal before you book anything.",
        },
        ctaLabel: { de: "Ziel schildern", en: "Describe your goal" },
        ctaUrl: "/#kontakt",
        image: IMG.cta,
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
