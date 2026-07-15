import type { IPage } from "~/types/dto/IPage"

export const ANGEBOTE_ID = "private-sprachkurse-angebote"

const IMG = {
  einzel: "/images/angebote/angebote-einzel-v2.png",
  kleingruppe: "/images/angebote/angebote-kleingruppe.png",
  sprechtraining: "/images/angebote/angebote-sprechtraining-v2.png",
  spezial: "/images/angebote/angebote-spezial.png",
  tileUnterricht: "/images/angebote/angebote-tile-unterricht.png",
  tileSprech: "/images/angebote/angebote-tile-sprech.png",
  gallery1: "/images/angebote/angebote-gallery-1.png",
  gallery2: "/images/angebote/angebote-gallery-2.png",
  iconPerson: "/images/angebote/icon-person.svg",
  iconTrip: "/images/angebote/icon-trip.svg",
  iconSpeed: "/images/angebote/icon-speed.svg",
  iconCategorySearch: "/images/angebote/icon-category-search.svg",
  iconPersonAlert: "/images/angebote/icon-person-alert.svg",
  iconPayments: "/images/angebote/icon-payments.svg",
  iconPartnerExchange: "/images/angebote/icon-partner-exchange.svg",
  iconGroups: "/images/angebote/icon-groups.svg",
  iconMood: "/images/angebote/icon-mood.svg",
  iconThumbUp: "/images/angebote/icon-thumb-up.svg",
  iconHomeWork: "/images/angebote/icon-home-work.svg",
  iconCommunication: "/images/angebote/icon-communication.svg",
  iconLibraryBooks: "/images/angebote/icon-library-books.svg",
  iconWorkUpdate: "/images/angebote/icon-work-update.svg",
  iconLocationOnline: "/images/angebote/icon-location-online-white.svg",
  iconLocationLiestal: "/images/angebote/icon-location-liestal-white.svg",
  iconLocationFirma: "/images/angebote/icon-location-firma-white.svg",
}

export function buildAngeboteSeed(): IPage {
  return {
    id: ANGEBOTE_ID,
    title: { de: "Angebote", en: "Offers" },
    slug: "angebote",
    lead: {
      de: "Sprachkurse, Sprechtraining und Coachings – individuell, flexibel und mit Freude am Lernen.",
      en: "Language courses, conversation training, and coaching — individual, flexible, and enjoyable.",
    },
    img: IMG.einzel,
    keywords: [
      "angebote",
      "sprachkurse",
      "einzelunterricht",
      "kleingruppe",
      "liestal",
    ],
    sections: [
      {
        _orbi: { component: "SectionAngeboteHero" },
        title: {
          de: "Sprachkurse die begeistern",
          en: "Language courses that inspire",
        },
        subtitle: {
          de: "Wählen Sie den für sich passenden Kurs. Ob im Kurslokal, Online oder in Ihrer Firma, ich möchte, dass Sprachen lernen Ihnen Spass macht!",
          en: "Choose the course that suits you. Whether at the course location, online, or at your company — I want learning languages to be fun for you!",
        },
        primaryCtaLabel: { de: "Zu den Kursen", en: "View courses" },
        primaryCtaUrl: "#kurse",
        secondaryCtaLabel: { de: "Für Unternehmen", en: "For companies" },
        secondaryCtaUrl: "/in-unternehmen",
      },
      {
        _orbi: { component: "SectionAngeboteCategories" },
        languages: {
          de: "Deutsch | Englisch | Italienisch | Spanisch | Französisch",
          en: "German | English | Italian | Spanish | French",
        },
        categories: [
          {
            title: { de: "Privatunterricht", en: "Private lessons" },
            description: {
              de: "Unterricht nur für Sie, ganz nach Ihren Wünschen und Tempo",
              en: "Lessons just for you, tailored to your wishes and pace",
            },
            tileType: "green",
            icon: IMG.iconPerson,
          },
          {
            title: {
              de: "Unterricht in Kleingruppe",
              en: "Small group lessons",
            },
            description: {
              de: "Spass am gemeinsamen Sprachen lernen mit professioneller Anleitung",
              en: "Enjoy learning languages together with professional guidance",
            },
            tileType: "image",
            image: IMG.tileUnterricht,
          },
          {
            title: { de: "Sprechtraining", en: "Conversation training" },
            description: {
              de: "Üben Sie fliessend sprechen oder frischen Sie ihre Sprachkenntnisse auf",
              en: "Practise speaking fluently or refresh your language skills",
            },
            tileType: "image",
            image: IMG.tileSprech,
          },
          {
            title: { de: "Spezialcoachings", en: "Special coaching" },
            description: {
              de: "Business, Präsentationen und Prüfungsvorbereitung.",
              en: "Business, presentations, and exam preparation.",
            },
            tileType: "blue",
            icon: IMG.iconTrip,
          },
        ],
      },
      {
        _orbi: { component: "SectionAngeboteOffers" },
        offers: [
          {
            tagline: {
              de: "Unterricht nur für Sie allein",
              en: "Lessons just for you alone",
            },
            title: { de: "Einzelunterricht", en: "Private lessons" },
            body: {
              de: "Keine vollen Klassen, keine Ablenkung. Sie erhalten komplette Aufmerksamkeit und Ihre Fragen werden ernst genommen. Der Unterricht richtet sich ganz nach Ihren Zielen.",
              en: "No crowded classes, no distractions. You receive full attention and your questions are taken seriously. Lessons are tailored entirely to your goals.",
            },
            features: [
              {
                text: {
                  de: "Ihre Geschwindigkeit bestimmen",
                  en: "You set the pace",
                },
                icon: IMG.iconSpeed,
              },
              {
                text: {
                  de: "Themen nach Ihren Wünschen",
                  en: "Topics tailored to your needs",
                },
                icon: IMG.iconCategorySearch,
              },
              {
                text: {
                  de: "Volle Aufmerksamkeit auf Sie",
                  en: "Full attention on you",
                },
                icon: IMG.iconPersonAlert,
              },
              {
                text: {
                  de: "Einzelstunde: CHF 98 | 20 Lektionen: CHF 1895",
                  en: "Single lesson: CHF 98 | 20 lessons: CHF 1895",
                },
                icon: IMG.iconPayments,
              },
            ],
            image: IMG.einzel,
            ctaLabel: { de: "Zur Buchung", en: "Book now" },
            ctaUrl: "/#kontakt",
            ctaVariant: "orange",
            layout: "image-left",
            showBookingAction: true,
            imageTilt: "left",
            decorativeArrow: "offer-arrow-1",
          },
          {
            tagline: {
              de: "Lernen in kleiner Runde",
              en: "Learning in a small group",
            },
            title: {
              de: "Kleingruppenunterricht",
              en: "Small group lessons",
            },
            body: {
              de: "In einer Kleingruppe finden Sie nicht nur Unterricht, sondern auch Lernpartner. Die Gruppe bleibt klein genug, um persönlich zu bleiben und gross genug, um voneinander zu profitieren.",
              en: "In a small group you find not only lessons but also learning partners. The group stays small enough to remain personal and large enough to benefit from each other.",
            },
            features: [
              {
                text: {
                  de: "Austausch mit anderen Lernenden",
                  en: "Exchange with other learners",
                },
                icon: IMG.iconPartnerExchange,
              },
              {
                text: {
                  de: "Gemeinsam sprechen, voneinander lernen",
                  en: "Speak together, learn from each other",
                },
                icon: IMG.iconGroups,
              },
              {
                text: {
                  de: "Motivation durch die Gruppe",
                  en: "Motivation through the group",
                },
                icon: IMG.iconMood,
              },
              {
                text: {
                  de: "Einzelstunde: CHF 88 p.P. | 20 Lektionen: CHF 1540 p.P.",
                  en: "Single lesson: CHF 88 p.p. | 20 lessons: CHF 1540 p.p.",
                },
                icon: IMG.iconPayments,
              },
            ],
            image: IMG.kleingruppe,
            ctaLabel: { de: "Zur Buchung", en: "Book now" },
            ctaUrl: "/#kontakt",
            ctaVariant: "blue",
            layout: "image-right",
            showBookingAction: false,
            imageTilt: "right",
            decorativeArrow: "offer-arrow-3",
          },
          {
            tagline: { de: "Sprechen üben", en: "Practise speaking" },
            title: { de: "Sprechtraining", en: "Conversation training" },
            body: {
              de: "Sie möchten sprechen üben oder Ihre Sprachkenntnisse auffrischen? Eine Sprache lebt nicht von Grammatik und Regeln allein — sie lebt im Gespräch.",
              en: "Want to practise speaking or refresh your language skills? A language doesn't live on grammar and rules alone — it lives in conversation.",
            },
            features: [
              {
                text: {
                  de: "Fliessend sprechen ohne Hemmungen und Angst",
                  en: "Speak fluently without inhibitions or fear",
                },
                icon: IMG.iconThumbUp,
              },
              {
                text: {
                  de: "Alltag, Urlaub und Beruf meistern",
                  en: "Master everyday life, travel, and work",
                },
                icon: IMG.iconHomeWork,
              },
              {
                text: {
                  de: "Vertrauen in echten Gesprächen",
                  en: "Confidence in real conversations",
                },
                icon: IMG.iconCommunication,
              },
              {
                text: {
                  de: "Einzelstunde: CHF 88 | ab 2 Personen: CHF 78",
                  en: "Single lesson: CHF 88 | from 2 people: CHF 78",
                },
                icon: IMG.iconPayments,
              },
            ],
            image: IMG.sprechtraining,
            ctaLabel: { de: "Buchen", en: "Book" },
            ctaUrl: "/#kontakt",
            ctaVariant: "orange",
            layout: "image-left",
            showBookingAction: true,
            imageTilt: "left",
            decorativeArrow: "offer-arrow-2",
          },
          {
            tagline: { de: "Material", en: "Materials" },
            title: { de: "Spezial-Coachings", en: "Special coaching" },
            body: {
              de: "Ob Prüfungsvorbereitung, Präsentationstraining oder Schülernachhilfe — ich begleite Sie gezielt auf Ihrem Weg zu Ihrem Ziel.",
              en: "Whether exam preparation, presentation training, or tutoring — I guide you purposefully towards your goal.",
            },
            features: [
              {
                text: {
                  de: "Prüfungsvorbereitung für Goethe, Telc und DELF",
                  en: "Exam preparation for Goethe, Telc, and DELF",
                },
                icon: IMG.iconLibraryBooks,
              },
              {
                text: {
                  de: "Präsentations- und Vortragstraining",
                  en: "Presentation and public speaking training",
                },
                icon: IMG.iconCommunication,
              },
              {
                text: {
                  de: "Berufliche oder private Schwerpunkte",
                  en: "Professional or personal focus areas",
                },
                icon: IMG.iconWorkUpdate,
              },
              {
                text: {
                  de: "Schülernachhilfe inklusive Matura und Berufschule",
                  en: "Tutoring including Matura and vocational school",
                },
                icon: IMG.iconLibraryBooks,
              },
              {
                text: {
                  de: "Einzelstunden: Prüfungsvorbereitung – CHF 110",
                  en: "Single lessons: exam preparation – CHF 110",
                },
                icon: IMG.iconPayments,
              },
            ],
            image: IMG.spezial,
            ctaLabel: { de: "Buchen", en: "Book" },
            ctaUrl: "/#kontakt",
            ctaVariant: "blue",
            layout: "image-right",
            showBookingAction: false,
            imageTilt: "right",
          },
        ],
      },
      {
        _orbi: { component: "SectionLocations" },
        theme: "blue",
        showKurslokal: false,
        title: {
          de: "Sie bestimmen wann und wo Sie lernen",
          en: "You decide when and where you learn",
        },
        titleHighlight: {
          de: "Sie lernen",
          en: "you learn",
        },
        locations: [
          {
            title: { de: "Online", en: "Online" },
            description: {
              de: "Flexibel per Zoom oder Google Meet",
              en: "Flexible via Zoom or Google Meet",
            },
            icon: IMG.iconLocationOnline,
          },
          {
            title: { de: "In Liestal", en: "In Liestal" },
            description: {
              de: "In meinem Kurslokal in Liestal",
              en: "At my course location in Liestal",
            },
            icon: IMG.iconLocationLiestal,
          },
          {
            title: { de: "In der Firma", en: "At your company" },
            description: {
              de: "In Ihrer Firma oder Organisation",
              en: "At your company or organisation",
            },
            icon: IMG.iconLocationFirma,
            id: "firma",
          },
        ],
      },
      {
        _orbi: { component: "SectionAngeboteClassrooms" },
        title: { de: "Unterrichtsräume", en: "Classrooms" },
        subtitle: {
          de: "Erleben Sie die entspannte Atmosphäre im Kurslokal in Liestal: Ideal für Lernen das Spass macht.",
          en: "Experience the relaxed atmosphere at the course location in Liestal — ideal for learning that is fun.",
        },
      },
      {
        _orbi: { component: "SectionAngeboteGallery" },
        images: [IMG.gallery1, IMG.gallery2],
      },
      {
        _orbi: { component: "SectionAngeboteContactCta" },
        title: {
          de: "Kann es losgehen oder haben Sie noch Fragen?",
          en: "Ready to start or do you still have questions?",
        },
        body: {
          de: "Keinen Stress, keine Angst, erleben Sie echte Gespräche von der ersten Minute an.\n\nBei Fragen oder Unsicherheiten, schicken Sie mir gerne eine Nachricht oder rufen mich an. Ich freue mich darauf, Sie zu unterstützen.",
          en: "No stress, no fear — experience real conversations from the first minute.\n\nIf you have questions or uncertainties, feel free to send me a message or call me. I look forward to supporting you.",
        },
        ctaLabel: { de: "Kontakt", en: "Contact" },
        ctaUrl: "/#kontakt",
      },
    ],
    head: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
