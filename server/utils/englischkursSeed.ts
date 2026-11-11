import type { IPage } from "~/types/dto/IPage"

export const ENGLISCHKURS_PAGE_ID = "private-sprachkurse-englischkurs"

const CALENDLY =
  "https://calendly.com/privatesprachkurse-info/privatstunde-vor-ort"

const IMG = {
  circle: "/images/englischkurs/circle.svg",
  iconDocument: "/images/englischkurs/icon-document.svg",
  iconBriefcase: "/images/englischkurs/icon-briefcase.svg",
  iconSpeech: "/images/englischkurs/icon-speech.svg",
  processArrow: "/images/englischkurs/process-arrow.svg",
  iconMedal: "/images/englischkurs/icon-medal.svg",
  underline: "/images/englischkurs/underline.svg",
  faqMinus: "/images/englischkurs/faq-minus.svg",
  insightsArrow: "/images/englischkurs/insights-arrow.svg",
  cta: "/images/englischkurs/cta-bg.png",
}

export function buildEnglischkursSeed(): IPage {
  return {
    id: ENGLISCHKURS_PAGE_ID,
    title: {
      de: "Englischkurs in Liestal und Baselland | Private Sprachkurse",
      en: "English course in Liestal and Baselland | Private Sprachkurse",
    },
    slug: "englischkurs",
    lead: {
      de: "Englisch für Beruf, Alltag und Prüfungen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
      en: "English for work, everyday life and exams. At the course location in Liestal, online or at your company. One-to-one or in small groups from two people.",
    },
    img: IMG.cta,
    keywords: [
      "englischkurs",
      "englisch",
      "liestal",
      "baselland",
      "cambridge",
      "ielts",
    ],
    sections: [
      {
        _orbi: { component: "SectionEnglischkursHero" },
        title: {
          de: "Englischkurs in Liestal\nund Baselland",
          en: "English course in Liestal\nand Baselland",
        },
        titleHighlight: { de: "Englischkurs", en: "English course" },
        subtitle: {
          de: "Englisch für Beruf, Alltag und Prüfungen. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
          en: "English for work, everyday life and exams. At the course location in Liestal, online or at your company. One-to-one or in small groups from two people.",
        },
        ctaLabel: {
          de: "Ziel schildern und Einschätzung erhalten",
          en: "Describe your goal and get an assessment",
        },
        ctaUrl: "/#kontakt",
        circleImage: IMG.circle,
      },
      {
        _orbi: { component: "SectionEnglischkursGoals" },
        title: {
          de: "Für welches Ziel lernen Sie Englisch?",
          en: "What is your goal for learning English?",
        },
        cards: [
          {
            title: { de: "Für den Arbeitsalltag.", en: "For everyday work." },
            body: {
              de: "Sitzungen mit Beteiligung aus dem Ausland, Telefonate, Korrespondenz. Bei den meisten fehlt dabei nicht das Fachvokabular, sondern die Mittel für das Unterbrechen, das Widersprechen ohne Schärfe und das Nachfragen. Genau daran wird gearbeitet.",
              en: "Meetings with people joining from abroad, phone calls, correspondence. For most people the gap is not specialist vocabulary, but the means to interrupt, to disagree without an edge, and to ask a question. That is what the lessons work on.",
            },
            icon: IMG.iconDocument,
            iconWidth: 36.2097,
            iconHeight: 43.5628,
            tone: "blue",
            tiltDeg: 3.4,
          },
          {
            title: { de: "Zum Auffrischen.", en: "To brush up." },
            body: {
              de: "Schulenglisch, das lange zurückliegt. Verstehen bleibt durch Filme, Musik und Arbeitsdokumente im Training, Sprechen nicht. Der Unterricht setzt dort an, wo die Lücke tatsächlich ist.",
              en: "School English from a long time ago. Understanding stays in practice through films, music and work documents. Speaking does not. Lessons start where the gap actually is.",
            },
            icon: IMG.iconBriefcase,
            iconWidth: 37.7919,
            iconHeight: 33.6475,
            tone: "orange",
            tiltDeg: -4.62,
          },
          {
            title: { de: "Für eine Prüfung.", en: "For an exam." },
            body: {
              de: "Cambridge B2 First, C1 Advanced, IELTS oder TOEFL. Vor der Vorbereitung lohnt sich die Frage, ob überhaupt ein Zertifikat verlangt wird. In vielen Fällen ist es nicht nötig.",
              en: "Cambridge B2 First, C1 Advanced, IELTS or TOEFL. Before preparing, it is worth asking whether a certificate is required at all. In many cases it is not.",
            },
            icon: IMG.iconSpeech,
            iconWidth: 43.722,
            iconHeight: 40.1605,
            tone: "orange",
            tiltDeg: 3.4,
          },
          {
            title: {
              de: "Für Reisen und Alltag.",
              en: "For travel and everyday life.",
            },
            body: {
              de: "Sich verständigen, ohne den Satz vorher im Kopf zu bauen.",
              en: "Making yourself understood without building the sentence in your head first.",
            },
            icon: IMG.iconSpeech,
            iconWidth: 43.722,
            iconHeight: 40.1605,
            tone: "green",
            tiltDeg: -6,
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursProcess" },
        title: { de: "So läuft es ab", en: "How it works" },
        arrowImage: IMG.processArrow,
        steps: [
          {
            title: {
              de: "Sie schildern Ihre Situation.",
              en: "You describe your situation.",
            },
            body: {
              de: "Nicht Ihr Niveau, sondern die Situation, in der Sie Englisch brauchen. Wer sitzt im Raum, wie schnell wird gesprochen, wie viel müssen Sie selbst beitragen.",
              en: "Not your level, but the situation in which you need English. Who is in the room, how fast people speak, how much you have to contribute yourself.",
            },
          },
          {
            title: {
              de: "Verstehen und Sprechen werden getrennt eingeschätzt.",
              en: "Understanding and speaking are assessed separately.",
            },
            body: {
              de: "Bei Englisch liegen diese beiden Werte besonders häufig auseinander.",
              en: "With English, these two sit apart particularly often.",
            },
          },
          {
            title: {
              de: "Sie erhalten einen Vorschlag.",
              en: "You receive a proposal.",
            },
            body: {
              de: "Format, Rhythmus und Schwerpunkt.",
              en: "Format, rhythm and focus.",
            },
          },
          {
            title: { de: "Erste Lektion.", en: "First lesson." },
            body: {
              de: "Danach entscheiden Sie über das weitere Vorgehen.",
              en: "After that you decide how to continue.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursPackages" },
        title: { de: "Online-Pakete", en: "Online packages" },
        icon: IMG.iconMedal,
        plans: [
          {
            name: { de: "Privatkurs", en: "Private course" },
            price: "88",
            detailPrimary: { de: "pro Lektion", en: "per lesson" },
            detailSecondary: { de: "55 Min.", en: "55 min." },
            variant: "gray",
            tiltDeg: -10.26,
            cta: { de: "Termin buchen", en: "Book an appointment" },
            ctaUrl: CALENDLY,
          },
          {
            name: { de: "5er-Abo", en: "5-lesson package" },
            price: "435",
            detailPrimary: { de: "CHF 87", en: "CHF 87" },
            detailSecondary: { de: "pro lektion", en: "per lesson" },
            variant: "gray",
            tiltDeg: -0.43,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "20er-Abo", en: "20-lesson package" },
            price: "1’695",
            detailPrimary: { de: "CHF 85", en: "CHF 85" },
            detailSecondary: { de: "pro lektion", en: "per lesson" },
            variant: "blue",
            tiltDeg: -6.2,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
          },
          {
            name: { de: "Kleingruppe", en: "Small group" },
            note: { de: "ab 2 Personen", en: "from 2 people" },
            price: "77",
            detailPrimary: { de: "pro Person", en: "per person" },
            detailSecondary: { de: "55 Min.", en: "55 min." },
            variant: "gray",
            tiltDeg: 5.91,
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaAction: "calculator",
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursDifference" },
        title: {
          de: "Was diesen Unterricht unterscheidet?",
          en: "What sets this teaching apart?",
        },
        underlineImage: IMG.underline,
        items: [
          {
            title: {
              de: "Ihre Situationen sind das Material.",
              en: "Your situations are the material.",
            },
            body: {
              de: "Ihre Traktanden, Ihre Folien, Ihre Mails. Das ist besseres Übungsmaterial als jedes Lehrbuch, weil es die Wörter und die Leute enthält, die tatsächlich vorkommen.",
              en: "Your agendas, your slides, your emails. That is better practice material than any textbook, because it contains the words and the people that actually come up.",
            },
          },
          {
            title: {
              de: "Der Wechsel wird geübt, nicht nur die Sprache.",
              en: "The switch is practised, not only the language.",
            },
            body: {
              de: "Im Schweizer Arbeitsalltag ist Englisch meist ein Einschub in einen deutschsprachigen Tag. Ein Kurs, der nur zusammenhängendes Sprechen übt, bereitet auf eine Situation vor, die so selten eintritt.",
              en: "In everyday Swiss work, English is usually an insert in a German-speaking day. A course that only practises continuous speaking prepares you for a situation that rarely happens.",
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
          {
            title: {
              de: "Ehrlichkeit bei Zertifikaten.",
              en: "Honesty about certificates.",
            },
            body: {
              de: "Ein Zertifikat ist beim Hochschulzugang, bei Visumsverfahren und bei ausdrücklicher Forderung im Inserat nötig. Sonst kostet die Vorbereitung Zeit, die beim Sprechen fehlt. Das sagen wir Ihnen vor der Buchung.",
              en: "A certificate is needed for university admission, visa procedures and when a job advert explicitly requires one. Otherwise the preparation costs time that is missing from speaking. We tell you that before you book.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursFaq" },
        title: {
          de: "Häufige Fragen zur Buchung",
          en: "Common questions about booking",
        },
        minusIcon: IMG.faqMinus,
        items: [
          {
            question: {
              de: "Kann ich einzelne Lektionen buchen?",
              en: "Can I book individual lessons?",
            },
            answer: {
              de: "Ja. Die Abos sind günstiger pro Lektion und lohnen sich bei regelmässiger Fortsetzung.",
              en: "Yes. The packages are cheaper per lesson and are worth it if you continue regularly.",
            },
          },
          {
            question: {
              de: "Können wir das im Betrieb durchführen?",
              en: "Can we run this at the company?",
            },
            answer: {
              de: "Ja, in Baselland und Basel, einzeln oder in Gruppen. Bei mehreren Mitarbeitenden wird vorab jede Person eingestuft.",
              en: "Yes, in Baselland and Basel, one-to-one or in groups. When several employees take part, each person is assessed beforehand.",
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
          {
            question: {
              de: "Können wir zu zweit kommen?",
              en: "Can we come as a pair?",
            },
            answer: {
              de: "Ja, ab zwei Personen auf ähnlichem Niveau gilt der Kleingruppenpreis pro Person.",
              en: "Yes. From two people at a similar level, the small-group price applies per person.",
            },
          },
          {
            question: {
              de: "Bereiten Sie auf Cambridge oder IELTS vor?",
              en: "Do you prepare for Cambridge or IELTS?",
            },
            answer: {
              de: "Ja. Vorher wird geklärt, ob für Ihr Vorhaben überhaupt ein Zertifikat verlangt wird und welches akzeptiert wird.",
              en: "Yes. Beforehand we clarify whether your plan requires a certificate at all, and which one is accepted.",
            },
          },
          {
            question: {
              de: "Findet der Unterricht auf Englisch statt?",
              en: "Are the lessons held in English?",
            },
            answer: {
              de: "Überwiegend ja, mit Erklärungen auf Deutsch, wo sie schneller weiterhelfen.",
              en: "Mostly yes, with explanations in German where they help you move on faster.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursInsights" },
        tagline: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: {
          de: "Wissenswertes zum\nEnglischlernen",
          en: "Worth knowing about\nlearning English",
        },
        arrowImage: IMG.insightsArrow,
        points: [
          {
            de: "Welches Englisch Sie wirklich brauchen, mit Zielniveaus und Zertifikatsvergleich",
            en: "Which English you actually need, with target levels and a comparison of certificates",
          },
          {
            de: "Die Arbeitssituationen, in denen es im Schweizer Alltag klemmt",
            en: "The work situations where it gets stuck in everyday life in Switzerland",
          },
          {
            de: "Wie Sie Ihr Niveau getrennt nach Fertigkeiten einschätzen",
            en: "How to assess your level separately by skill",
          },
        ],
      },
      {
        _orbi: { component: "SectionEnglischkursCta" },
        backgroundImage: IMG.cta,
        title: { de: "Englischkurs anfragen", en: "Request an English course" },
        body: {
          de: "Beschreiben Sie zwei oder drei Situationen, in denen Ihr Englisch zuletzt nicht gereicht hat. Daraus lässt sich ableiten, woran gearbeitet werden sollte.",
          en: "Describe two or three situations in which your English recently was not enough. From that it becomes clear what the lessons should work on.",
        },
        ctaLabel: { de: "Ziel schildern", en: "Describe your goal" },
        ctaUrl: "/#kontakt",
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
