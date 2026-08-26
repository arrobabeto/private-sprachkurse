import type { IPage } from "~/types/dto/IPage"

export const IMPRESSUM_PAGE_ID = "private-sprachkurse-impressum"

const contactBlockDe = `<p>Private Sprachkurse<br />Viviane Baier<br />Amtshausgasse 12<br />4410 Liestal<br />Schweiz</p>
<p>Kontakt<br />E-Mail: <a href="mailto:info@privatesprachkurse.ch">info@privatesprachkurse.ch</a><br />Telefon: <a href="tel:+41789433963">+41 78 943 39 63</a></p>`

const contactBlockEn = `<p>Private Sprachkurse<br />Viviane Baier<br />Amtshausgasse 12<br />4410 Liestal<br />Switzerland</p>
<p>Contact<br />Email: <a href="mailto:info@privatesprachkurse.ch">info@privatesprachkurse.ch</a><br />Phone: <a href="tel:+41789433963">+41 78 943 39 63</a></p>`

const impressumBlockDe = `<p>Private Sprachkurse ist ein Angebot für Sprachunterricht in Deutsch, Französisch, Italienisch, Englisch und Spanisch. Wir bieten maßgeschneiderte Kurse für Einzelne und kleine Gruppen an, die ihre Sprachfähigkeiten verbessern möchten.</p>
<p>Für Fragen, Anfragen oder weitere Informationen zu unseren Sprachkursen kontaktieren Sie uns bitte direkt. Wir stehen Ihnen gerne zur Verfügung und beantworten alle Ihre Fragen zum Unterricht, zu den Kursinhalten und zu den verfügbaren Terminen.</p>
<p>Diese Webseite wird betrieben und verantwortet von Private Sprachkurse. Alle Inhalte, Texte und Materialien auf dieser Seite sind Eigentum von Private Sprachkurse und unterliegen dem Urheberrecht. Eine Vervielfältigung oder Verwendung ohne ausdrückliche Genehmigung ist nicht gestattet.</p>
<p>Die Informationen auf dieser Webseite werden regelmäßig aktualisiert. Wir bemühen uns, alle Angaben korrekt und aktuell zu halten. Dennoch können wir keine Gewähr für die Vollständigkeit oder Richtigkeit aller Informationen übernehmen.</p>
<p>Für technische Fragen oder Probleme mit der Webseite können Sie sich ebenfalls an uns wenden. Wir kümmern uns um eine schnelle Lösung und sorgen dafür, dass Ihre Erfahrung auf unserer Seite reibungslos verläuft.</p>`

const impressumBlockEn = `<p>Private Sprachkurse offers language tuition in German, French, Italian, English and Spanish. We provide tailored courses for individuals and small groups who want to improve their language skills.</p>
<p>For questions, enquiries or further information about our language courses, please contact us directly. We are happy to assist you and will answer all your questions about the lessons, the course content and the available dates.</p>
<p>This website is operated and maintained by Private Sprachkurse. All content, texts and materials on this site are the property of Private Sprachkurse and are protected by copyright. Reproduction or use without express permission is not permitted.</p>
<p>The information on this website is updated regularly. We make every effort to keep all details correct and up to date. Nevertheless, we cannot guarantee the completeness or accuracy of all information.</p>
<p>For technical questions or problems with the website you are also welcome to contact us. We will take care of a quick solution and ensure that your experience on our site runs smoothly.</p>`

const bodyDe = contactBlockDe + impressumBlockDe
const bodyEn = contactBlockEn + impressumBlockEn

export function buildImpressumSeed(): IPage {
  return {
    id: IMPRESSUM_PAGE_ID,
    title: { de: "Impressum", en: "Imprint" },
    slug: "impressum",
    lead: {
      de: "Alle notwendigen Informationen und Angaben zum Betreiber dieser Webseite.",
      en: "All required information and details about the operator of this website.",
    },
    img: "/images/kontakt/hero-v2.png",
    keywords: [
      "impressum",
      "rechtliches",
      "betreiber",
      "kontakt",
      "datenschutz",
    ],
    sections: [
      {
        _orbi: { component: "SectionImpressumHero" },
        tagline: { de: "Rechtliches", en: "Legal" },
        title: { de: "Impressum", en: "Imprint" },
        subtitle: {
          de: "Alle notwendigen Informationen und Angaben zum Betreiber dieser Webseite",
          en: "All required information and details about the operator of this website",
        },
        primaryCtaLabel: { de: "Startseite", en: "Home" },
        primaryCtaUrl: "/",
        secondaryCtaLabel: { de: "Datenschutz", en: "Privacy" },
        secondaryCtaUrl: "/datenschutz",
      },
      {
        _orbi: { component: "SectionImpressumContent" },
        title: { de: "Betreiber und Kontakt", en: "Operator and contact" },
        body: { de: bodyDe, en: bodyEn },
      },
    ],
    head: {},
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }
}
