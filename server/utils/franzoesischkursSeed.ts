import type { IPage } from "~/types/dto/IPage"

export const FRANZOESISCHKURS_PAGE_ID = "private-sprachkurse-franzoesischkurs"

const IMG = {
  refresh: "/images/franzoesischkurs/icon-refresh.svg",
  career: "/images/franzoesischkurs/icon-career.svg",
  region: "/images/franzoesischkurs/icon-region.svg",
  cta: "/images/franzoesischkurs/cta-bg.jpg",
}

const CALENDLY =
  "https://calendly.com/privatesprachkurse-info/privatstunde-vor-ort"

export function buildFranzoesischkursSeed(): IPage {
  return {
    id: FRANZOESISCHKURS_PAGE_ID,
    title: {
      de: "Französischkurs in Liestal und Baselland | Private Sprachkurse",
      en: "French course in Liestal and Baselland | Private Sprachkurse",
    },
    slug: "franzoesischkurs",
    lead: {
      de: "Französisch auffrischen oder neu aufbauen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
      en: "Brush up your French or build it from scratch. At the course location in Liestal, online or at your company. Individually or in small groups from two people.",
    },
    img: IMG.cta,
    keywords: [
      "französischkurs",
      "französisch",
      "liestal",
      "baselland",
      "auffrischen",
      "kleingruppe",
    ],
    sections: [
      {
        _orbi: { component: "SectionFranzoesischkursHero" },
        titleHighlight: { de: "Französischkurs", en: "French course" },
        titleLine1Rest: { de: " in Liestal", en: " in Liestal" },
        titleLine2: { de: "und Baselland", en: "and Baselland" },
        subtitle: {
          de: "Französisch auffrischen oder neu aufbauen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
          en: "Brush up your French or build it from scratch. At the course location in Liestal, online or at your company. Individually or in small groups from two people.",
        },
        ctaLabel: {
          de: "Vorkenntnisse einschätzen lassen",
          en: "Have your prior knowledge assessed",
        },
        ctaUrl: "/#kontakt",
      },
      {
        _orbi: { component: "SectionFranzoesischkursGoals" },
        title: {
          de: "Für welches Ziel lernen Sie Französisch?",
          en: "For which goal are you learning French?",
        },
        goals: [
          {
            title: { de: "Zum Auffrischen.", en: "To refresh." },
            body: {
              de: "Die häufigste Ausgangslage in dieser Region. Sie hatten Französisch in der Schule, verstehen noch vieles und bringen im Gespräch nichts heraus. Verloren gegangen ist der Abruf, nicht das Wissen. Ein Anfängerkurs setzt dafür am falschen Punkt an.",
              en: "The most common starting point in this region. You had French at school, still understand a lot, and cannot get anything out in conversation. What was lost is retrieval, not the knowledge. A beginner course starts in the wrong place for that.",
            },
            icon: IMG.refresh,
            variant: "blue",
            tilt: 3.4,
          },
          {
            title: { de: "Für den Beruf.", en: "For work." },
            body: {
              de: "Sitzungen mit Westschweizer Beteiligung, Telefonate mit Kundschaft aus der Romandie, Korrespondenz mit Partnern in Frankreich. In vielen Betrieben weicht man auf Englisch aus, wodurch beide Seiten unter ihrem Niveau arbeiten und der informelle Teil wegfällt.",
              en: "Meetings with participants from western Switzerland, phone calls with customers from Romandy, correspondence with partners in France. In many companies people fall back on English, so both sides work below their level and the informal part falls away.",
            },
            icon: IMG.career,
            variant: "orange",
            tilt: -4.62,
          },
          {
            title: {
              de: "Für den Alltag in einer Grenzregion.",
              en: "For everyday life in a border region.",
            },
            body: {
              de: "Die Landesgrenze verläuft unmittelbar an der Agglomeration Basel, die Romandie beginnt hinter dem Jura. Französisch ist hier keine ferne Sprache.",
              en: "The national border runs right along the Basel agglomeration, and Romandy begins beyond the Jura. French is not a distant language here.",
            },
            icon: IMG.region,
            variant: "orange",
            tilt: 3.4,
          },
          {
            title: { de: "Neu beginnen.", en: "Starting from scratch." },
            body: {
              de: "Ohne Vorkenntnisse, wenn Sie in der Schule eine andere Sprache hatten.",
              en: "Without prior knowledge, if you studied a different language at school.",
            },
            icon: IMG.region,
            variant: "green",
            tilt: -6,
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursProcess" },
        title: { de: "So läuft es ab", en: "How it works" },
        steps: [
          {
            title: {
              de: "Sie schildern Ihre Ausgangslage.",
              en: "You describe your starting point.",
            },
            body: {
              de: "Wie lange der Unterricht zurückliegt, was Sie noch verstehen, wofür Sie Französisch brauchen.",
              en: "How long ago the lessons were, what you still understand, and what you need French for.",
            },
          },
          {
            title: {
              de: "Verstehen und Sprechen werden getrennt eingeschätzt.",
              en: "Comprehension and speaking are assessed separately.",
            },
            body: {
              de: "Bei stillgelegtem Schulfranzösisch liegen diese Werte typischerweise weit auseinander, weshalb eine einzelne Stufenangabe wenig aussagt.",
              en: "With dormant school French these two usually lie far apart, which is why a single level label says little.",
            },
          },
          {
            title: {
              de: "Sie erhalten einen Vorschlag.",
              en: "You receive a proposal.",
            },
            body: {
              de: "Ob Reaktivierung oder Aufbau, mit Format und Rhythmus.",
              en: "Whether reactivation or building up, with a format and a rhythm.",
            },
          },
          {
            title: { de: "Erste Lektion.", en: "First lesson." },
            body: {
              de: "Bei Reaktivierung wird von Beginn an gesprochen, weil der Abruf nur durch Produktion zurückkommt.",
              en: "With reactivation, speaking starts from the beginning, because retrieval only comes back through production.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursPricing" },
        title: { de: "Online-Pakete", en: "Online packages" },
        plans: [
          {
            name: { de: "Privatkurs", en: "Private course" },
            price: "88",
            detailPrimary: { de: "pro Lektion", en: "per lesson" },
            detailSecondary: { de: "55 Min.", en: "55 min." },
            tilt: -10.26,
            cta: { de: "Termin buchen", en: "Book an appointment" },
            ctaUrl: CALENDLY,
          },
          {
            name: { de: "5er-Abo", en: "5-lesson package" },
            price: "435",
            detailPrimary: { de: "CHF 87", en: "CHF 87" },
            detailSecondary: { de: "pro lektion", en: "per lesson" },
            tilt: -0.43,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "20er-Abo", en: "20-lesson package" },
            price: "1’695",
            detailPrimary: { de: "CHF 85", en: "CHF 85" },
            detailSecondary: { de: "pro lektion", en: "per lesson" },
            variant: "blue",
            tilt: -6.2,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "Kleingruppe", en: "Small group" },
            note: { de: "ab 2 Personen", en: "from 2 people" },
            price: "77",
            detailPrimary: { de: "pro Person", en: "per person" },
            detailSecondary: { de: "55 Min.", en: "55 min." },
            tilt: 5.91,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaAction: "calculator",
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursDifference" },
        title: {
          de: "Was diesen Unterricht unterscheidet?",
          en: "What sets this teaching apart?",
        },
        items: [
          {
            title: {
              de: "Reaktivierung wird anders aufgebaut als ein Anfängerkurs.",
              en: "Reactivation is built differently from a beginner course.",
            },
            body: {
              de: "Grammatik, die einmal gelernt wurde, braucht keine neue Erklärung. Sie muss wieder zugänglich werden, und das geschieht durch Sprechen.",
              en: "Grammar that was learned once does not need to be explained again. It has to become accessible again, and that happens through speaking.",
            },
          },
          {
            title: {
              de: "Die Aussprache bekommt früh Zeit.",
              en: "Pronunciation gets time early on.",
            },
            body: {
              de: "Bei Französisch entscheidet sie mit darüber, ob jemand überhaupt spricht. Wer sie spät behandelt, verliert Monate, weil die Hemmung bleibt.",
              en: "With French, it helps decide whether someone speaks at all. Treating it late costs months, because the inhibition stays.",
            },
          },
          {
            title: {
              de: "Der Wortschatz wird umgebaut, nicht neu gelernt.",
              en: "Vocabulary is rebuilt, not learned anew.",
            },
            body: {
              de: "Schulfranzösisch bringt Vokabular aus dem Schulalltag mit. Was fehlt, sind die Wörter Ihrer Arbeit und Ihrer Interessen. Dieser Umbau geht schnell, weil das Gerüst vorhanden ist.",
              en: "School French brings vocabulary from school life with it. What is missing are the words of your work and your interests. This rebuild goes quickly, because the framework is already there.",
            },
          },
          {
            title: {
              de: "Volle Redezeit im Einzelunterricht.",
              en: "Full speaking time in one-to-one lessons.",
            },
            body: {
              de: "Sie sprechen die ganze Lektion selbst, was bei Reaktivierung der entscheidende Faktor ist.",
              en: "You speak for the whole lesson yourself, which is the decisive factor in reactivation.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursFaq" },
        title: {
          de: "Häufige Fragen zur Buchung",
          en: "Common questions about booking",
        },
        items: [
          {
            question: {
              de: "Ich hatte Französisch in der Schule. Wo steige ich ein?",
              en: "I had French at school. Where do I start?",
            },
            answer: {
              de: "Das wird im Erstgespräch geklärt, getrennt nach Verstehen und Sprechen. Ein Einstieg bei Lektion eins ist dabei selten sinnvoll.",
              en: "That is clarified in the first conversation, separately for comprehension and speaking. Starting at lesson one is rarely useful.",
            },
          },
          {
            question: {
              de: "Kann ich einzelne Lektionen buchen?",
              en: "Can I book single lessons?",
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
              de: "Ja, ab zwei Personen auf ähnlichem Niveau gilt der Kleingruppenpreis pro Person. Bei Paaren mit gemeinsamem Anlass ist das oft die passendste Form.",
              en: "Yes. From two people at a similar level, the small-group price applies per person. For couples with a shared occasion, this is often the best fit.",
            },
          },
          {
            question: {
              de: "Ist Unterricht im Betrieb möglich?",
              en: "Is teaching at the company possible?",
            },
            answer: {
              de: "Ja, in Baselland und Basel, einzeln oder in Gruppen.",
              en: "Yes, in Baselland and Basel, one-to-one or in groups.",
            },
          },
          {
            question: {
              de: "Wie kurzfristig ist ein Einstieg möglich?",
              en: "How soon can someone start?",
            },
            answer: {
              de: "Es gibt keine festen Kursstarts.",
              en: "There are no fixed course start dates.",
            },
          },
          {
            question: {
              de: "Findet der Unterricht auf Französisch statt?",
              en: "Does the teaching take place in French?",
            },
            answer: {
              de: "Bei Vorkenntnissen weitgehend, mit Erklärungen auf Deutsch, wo sie weiterhelfen. Bei Neubeginn wird der französische Anteil schrittweise gesteigert.",
              en: "With prior knowledge, largely, with explanations in German where they help. For a new start, the share of French is increased step by step.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursInsights" },
        eyebrow: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: {
          de: "Wissenswertes zum Französischlernen",
          en: "Worth knowing about learning French",
        },
        items: [
          {
            de: "Ob sich die Auffrischung neben Englisch noch lohnt, mit den Zahlen zum Arbeitsplatz",
            en: "Whether brushing up French alongside English is still worth it, with the figures for the workplace",
          },
          {
            de: "Wie Sie Ihr Niveau getrennt nach Fertigkeiten einschätzen",
            en: "How to assess your level separately by skill",
          },
          {
            de: "Was gegen Sprechhemmungen hilft",
            en: "What helps against the fear of speaking",
          },
        ],
      },
      {
        _orbi: { component: "SectionFranzoesischkursCta" },
        backgroundImage: IMG.cta,
        title: {
          de: "Französischkurs anfragen",
          en: "Request a French course",
        },
        body: {
          de: "Schildern Sie, wie lange Ihr Französisch zurückliegt und wofür Sie es brauchen. Sie erhalten eine Einschätzung, was davon noch da ist.",
          en: "Describe how long ago your French was and what you need it for. You receive an assessment of what is still there.",
        },
        ctaLabel: {
          de: "Vorkenntnisse einschätzen lassen",
          en: "Have your prior knowledge assessed",
        },
        ctaUrl: "/#kontakt",
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
