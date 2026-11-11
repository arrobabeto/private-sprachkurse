import type { IPage } from "~/types/dto/IPage"

export const DEUTSCHKURS_PAGE_ID = "private-sprachkurse-deutschkurs"

const IMG = {
  circle: "/images/deutschkurs/circle.svg",
  iconPermit: "/images/deutschkurs/icon-permit.svg",
  iconWork: "/images/deutschkurs/icon-work.svg",
  iconEveryday: "/images/deutschkurs/icon-everyday.svg",
  stepsArrow: "/images/deutschkurs/steps-arrow.svg",
  iconOnline: "/images/deutschkurs/icon-online.svg",
  featureLine: "/images/deutschkurs/feature-line.svg",
  faqMinus: "/images/deutschkurs/faq-minus.svg",
  statsArrow: "/images/deutschkurs/stats-arrow.svg",
  cta: "/images/deutschkurs/cta-bg.jpg",
}

const CALENDLY =
  "https://calendly.com/privatesprachkurse-info/privatstunde-vor-ort"

export function buildDeutschkursSeed(): IPage {
  return {
    id: DEUTSCHKURS_PAGE_ID,
    title: {
      de: "Deutschkurs in Liestal und Baselland | Private Sprachkurse",
      en: "German course in Liestal and Baselland | Private Sprachkurse",
    },
    slug: "deutschkurs",
    lead: {
      de: "Privater Deutschunterricht vom Anfänger- bis zum Fortgeschrittenenniveau. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
      en: "Private German lessons from beginner to advanced level. At the course location in Liestal, online or at your company. One-to-one or in small groups from two people.",
    },
    img: IMG.cta,
    keywords: [
      "deutschkurs",
      "liestal",
      "baselland",
      "einbürgerung",
      "privatunterricht",
    ],
    sections: [
      {
        _orbi: { component: "SectionDeutschkursHero" },
        line1: { de: "Deutschkurs in Liestal", en: "German course in Liestal" },
        line2: { de: "und Baselland", en: "and Baselland" },
        subtitle: {
          de: "Privater Deutschunterricht vom Anfänger- bis zum Fortgeschrittenenniveau. Im Kurslokal in Liestal, online oder in Ihrem Betrieb. Einzeln oder in Kleingruppen ab zwei Personen.",
          en: "Private German lessons from beginner to advanced level. At the course location in Liestal, online or at your company. One-to-one or in small groups from two people.",
        },
        ctaLabel: {
          de: "Ziel schildern und Einschätzung erhalten",
          en: "Describe your goal and get an assessment",
        },
        ctaUrl: "/#kontakt",
        circleImage: IMG.circle,
      },
      {
        _orbi: { component: "SectionDeutschkursAudience" },
        tagline: { de: "Deutsch für Ihre Ziele", en: "German for your goals" },
        title: {
          de: "Für welches Ziel lernen\nSie Deutsch?",
          en: "What goal are you learning\nGerman for?",
        },
        body: {
          de: "Ob für die Einbürgerung, den Beruf oder den Alltag – der Unterricht richtet sich nach Ihren persönlichen Zielen und Bedürfnissen.",
          en: "Whether for naturalisation, work or everyday life – lessons follow your personal goals and needs.",
        },
        cards: [
          {
            title: {
              de: "Für Bewilligung oder Einbürgerung.",
              en: "For a permit or naturalisation.",
            },
            body: {
              de: "Für die ordentliche Einbürgerung verlangt der Bund mündlich B1 und schriftlich A2, für die Niederlassungsbewilligung C gelten je nach Verfahren tiefere Anforderungen. Der Unterricht richtet sich nach dem Zielniveau, das für Ihr Vorhaben tatsächlich verlangt wird. Welche Stufe das ist, steht im Beitrag zu den Zielniveaus in Baselland.",
              en: "For ordinary naturalisation the Confederation requires B1 in speaking and A2 in writing. For settlement permit C the requirements are lower depending on the procedure. Lessons follow the target level that is actually required for your application. Which level that is, is set out in the article on target levels in Baselland.",
            },
            icon: IMG.iconPermit,
            iconWidth: 36,
            iconHeight: 44,
            variant: "blue",
          },
          {
            title: { de: "Für den Beruf.", en: "For work." },
            body: {
              de: "Telefonate, Korrespondenz, Sitzungen, Sicherheitsunterweisungen. Geübt wird an den Situationen, die bei Ihnen vorkommen, und nicht an einem Lehrbuchkapitel.",
              en: "Phone calls, correspondence, meetings, safety briefings. You practise the situations that actually come up for you, not a textbook chapter.",
            },
            icon: IMG.iconWork,
            iconWidth: 38,
            iconHeight: 34,
            variant: "orange",
          },
          {
            title: { de: "Für den Alltag.", en: "For everyday life." },
            body: {
              de: "Elterngespräche, Behördenbriefe, Nachbarschaft, Arzttermine. Häufig geht es dabei weniger um neue Grammatik als um den sicheren Zugriff auf das, was schon da ist.",
              en: "Parent meetings, letters from the authorities, neighbours, doctor's appointments. Often this is less about new grammar than about confidently using what you already know.",
            },
            icon: IMG.iconEveryday,
            iconWidth: 44,
            iconHeight: 40,
            variant: "green",
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursSteps" },
        title: { de: "So läuft es ab", en: "How it works" },
        arrowImage: IMG.stepsArrow,
        steps: [
          {
            title: {
              de: "Sie schildern Ihre Situation.",
              en: "You describe your situation.",
            },
            body: {
              de: "Ziel, Vorkenntnisse, mögliche Zeitfenster. Per Formular oder telefonisch.",
              en: "Your goal, prior knowledge, possible time slots. By form or by phone.",
            },
          },
          {
            title: {
              de: "Ihr Niveau wird eingeschätzt, getrennt nach Sprechen und Schreiben.",
              en: "Your level is assessed, separately for speaking and writing.",
            },
            body: {
              de: "Diese Trennung ist wichtig, weil die beiden Werte weit auseinanderliegen können.\nFür die Kursplanung zählt der tiefere.",
              en: "This separation matters, because the two scores can lie far apart.\nFor planning the course, the lower one counts.",
            },
            inlineBody: true,
          },
          {
            title: {
              de: "Sie erhalten einen Vorschlag.",
              en: "You receive a proposal.",
            },
            body: {
              de: "Format, Rhythmus und eine Einschätzung, wie weit der Weg zum Ziel ist.",
              en: "Format, rhythm and an estimate of how far the path to your goal is.",
            },
          },
          {
            title: { de: "Erste Lektion.", en: "First lesson." },
            body: {
              de: "Danach entscheiden Sie, ob Sie einzeln weiterbuchen oder ein Abo nehmen.",
              en: "Afterwards you decide whether to keep booking single lessons or take a package.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursPricing" },
        title: { de: "Online-Pakete", en: "Online packages" },
        icon: IMG.iconOnline,
        plans: [
          {
            name: { de: "Privatkurs", en: "Private course" },
            price: "88",
            lines: [
              { de: "pro Lektion", en: "per lesson" },
              { de: "55 Min.", en: "55 min." },
            ],
            cta: { de: "Termin buchen", en: "Book an appointment" },
            ctaUrl: CALENDLY,
            variant: "gray",
            tilt: "left-strong",
          },
          {
            name: { de: "5er-Abo", en: "5-lesson package" },
            price: "435",
            lines: [
              { de: "CHF 87", en: "CHF 87" },
              { de: "pro lektion", en: "per lesson" },
            ],
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
            variant: "gray",
            tilt: "flat",
          },
          {
            name: { de: "20er-Abo", en: "20-lesson package" },
            price: "1\u2019695",
            lines: [
              { de: "CHF 85", en: "CHF 85" },
              { de: "pro lektion", en: "per lesson" },
            ],
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaUrl: "/#kontakt",
            variant: "blue",
            tilt: "left",
          },
          {
            name: { de: "Kleingruppe", en: "Small group" },
            note: { de: "ab 2 Personen", en: "from 2 people" },
            price: "77",
            lines: [
              { de: "pro Person", en: "per person" },
              { de: "55 Min.", en: "55 min." },
            ],
            cta: { de: "Jetzt buchen", en: "Book now" },
            ctaAction: "calculator",
            variant: "gray",
            tilt: "right",
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursFeatures" },
        title: {
          de: "Was diesen Unterricht unterscheidet?",
          en: "What sets these lessons apart?",
        },
        lineImage: IMG.featureLine,
        items: [
          {
            text: {
              de: "Eine Lehrperson, keine wechselnden Kursleitungen. Sie arbeiten durchgehend mit derselben Person, die Sie im Erstgespräch kennenlernen.",
              en: "One teacher, no changing course leaders. You work throughout with the same person you meet in the first conversation.",
            },
          },
          {
            text: {
              de: "Kein Lehrplan, der zuerst abgearbeitet wird. Das Programm ergibt sich aus Ihrem Ziel. Wer eine Prüfung vor sich hat, übt das Prüfungsformat. Wer im Betrieb ansteht, übt die Situation aus dem Betrieb.",
              en: "No syllabus that has to be worked through first. The programme follows your goal. If you have an exam ahead, you practise the exam format. If something is coming up at work, you practise that situation.",
            },
          },
          {
            text: {
              de: "Volle Redezeit im Einzelunterricht. In einer Lektion zu zweit sprechen Sie die ganze Zeit selbst. In einer Zehnergruppe wäre es rechnerisch ein Zehntel davon.",
              en: "Full speaking time in one-to-one lessons. In a lesson for two, you speak the whole time yourself. In a group of ten it would, on paper, be a tenth of that.",
            },
          },
          {
            text: {
              de: "Klarheit über den Nachweis. Ein Kurs bereitet auf eine Prüfung vor. Ausgestellt wird das Zertifikat von akkreditierten Stellen, etwa über den fide-Sprachenpass oder Goethe-Institut, telc und ÖSD. Eine Kursbestätigung gilt nicht als Sprachnachweis.",
              en: "Clarity about the certificate. A course prepares you for an exam. The certificate is issued by accredited bodies, for example via the fide language passport or Goethe-Institut, telc and ÖSD. A course confirmation does not count as proof of language level.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursFaq" },
        title: {
          de: "Häufige Fragen zur Buchung",
          en: "Common questions about booking",
        },
        minusIcon: IMG.faqMinus,
        items: [
          {
            question: {
              de: "Wie schnell kann ich anfangen?",
              en: "How soon can I start?",
            },
            answer: {
              de: "Nach dem Erstgespräch wird ein Termin vereinbart. Feste Kursstarts gibt es nicht, der Einstieg ist jederzeit möglich.",
              en: "After the first conversation an appointment is arranged. There are no fixed course start dates, you can begin at any time.",
            },
          },
          {
            question: {
              de: "Muss ich mich für mehrere Lektionen verpflichten?",
              en: "Do I have to commit to several lessons?",
            },
            answer: {
              de: "Nein. Sie können einzeln buchen. Die Abos sind günstiger pro Lektion und lohnen sich, wenn Sie regelmässig weitermachen.",
              en: "No. You can book single lessons. The packages are cheaper per lesson and are worth it if you continue regularly.",
            },
          },
          {
            question: {
              de: "Kann ich zwischen Kurslokal und online wechseln?",
              en: "Can I switch between the course location and online?",
            },
            answer: {
              de: "Ja, beide Formate sind einzeln buchbar.",
              en: "Yes, both formats can be booked individually.",
            },
          },
          {
            question: {
              de: "Können wir zu zweit kommen?",
              en: "Can we come as a pair?",
            },
            answer: {
              de: "Ja. Ab zwei Personen auf ähnlichem Niveau gilt der Kleingruppenpreis pro Person.",
              en: "Yes. From two people at a similar level, the small-group price applies per person.",
            },
          },
          {
            question: {
              de: "Bezahlt mein Arbeitgeber den Kurs?",
              en: "Will my employer pay for the course?",
            },
            answer: {
              de: "Das kommt vor und ist steuerlich vorteilhaft, weil arbeitgeberfinanzierte Weiterbildung nicht zum steuerbaren Lohn zählt. Details stehen im Beitrag zu Firmensprachkursen.",
              en: "That does happen, and it is tax-efficient, because employer-funded training does not count as taxable salary. Details are in the article on company language courses.",
            },
          },
          {
            question: {
              de: "In welcher Sprache findet der Unterricht statt?",
              en: "Which language are the lessons in?",
            },
            answer: {
              de: "Auf Deutsch, von Beginn an, mit Erklärungen in der Sprache, die Ihnen weiterhilft.",
              en: "In German, from the start, with explanations in the language that helps you most.",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursStats" },
        tagline: { de: "Viviane Baier-Angi", en: "Viviane Baier-Angi" },
        title: {
          de: "Wissenswertes zum Deutschlernen in Baselland",
          en: "Useful things to know about learning German in Baselland",
        },
        arrowImage: IMG.statsArrow,
        items: [
          {
            text: {
              de: "Welches Niveau Ihr Ziel verlangt, mit den gesetzlichen Anforderungen",
              en: "Which level your goal requires, including the legal requirements",
            },
          },
          {
            text: {
              de: "Warum Sie Hochdeutsch lernen und im Alltag Dialekt hören",
              en: "Why you learn Standard German and hear dialect in everyday life",
            },
          },
          {
            text: {
              de: "Wie Sie Ihr Niveau getrennt nach Fertigkeiten einschätzen",
              en: "How to assess your level separately by skill",
            },
          },
        ],
      },
      {
        _orbi: { component: "SectionDeutschkursCta" },
        title: { de: "Deutschkurs anfragen", en: "Request a German course" },
        body: {
          de: "Schildern Sie Ihr Ziel, Ihre Vorkenntnisse und Ihre möglichen Zeitfenster. Sie erhalten eine Einschätzung Ihres Ausgangsniveaus und einen Vorschlag, bevor Sie etwas buchen.",
          en: "Describe your goal, your prior knowledge and your possible time slots. You receive an assessment of your starting level and a proposal before you book anything.",
        },
        ctaLabel: { de: "Ziel schildern", en: "Describe your goal" },
        ctaUrl: "/#kontakt",
        backgroundImage: IMG.cta,
      },
    ],
    head: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
