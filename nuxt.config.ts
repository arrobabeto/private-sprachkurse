import type { NuxtConfig } from "nuxt/config"
import { defineNuxtConfig } from "nuxt/config"

const gtmId = process.env.NUXT_PUBLIC_GTM_ID ?? ""
const gaId = process.env.NUXT_PUBLIC_GA_ID ?? ""

function buildAnalyticsScripts() {
  const scripts: NonNullable<NonNullable<NuxtConfig["app"]>["head"]>["script"] =
    []

  if (!gaId && !gtmId) return scripts

  // Consent Mode defaults (denied until CookieBanner grants).
  scripts.push({
    innerHTML: `
              (function () {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){dataLayer.push(arguments);}
                window.gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
              })()
            `,
  })

  if (gaId) {
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
      async: true,
    })
    scripts.push({
      innerHTML: `
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);};
                window.gtag('js', new Date());
                window.gtag('config', '${gaId}');
            `,
    })
  }

  if (gtmId) {
    scripts.push({
      innerHTML: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
            `,
    })
  }

  return scripts
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-08-28",
  ssr: true,
  devtools: { enabled: true },
  imports: {
    autoImport: false,
    global: false,
    dirs: [],
  },
  components: {
    global: false,
    dirs: [],
  },
  telemetry: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/i18n"],
  css: ["~/assets/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    domains: ["localhost", "s3.eu-central-2.amazonaws.com"],
  },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
  },
  runtimeConfig: {
    sendgridApiKey: process.env.SENDGRID_API_KEY || "",
    sendgridFromEmail:
      process.env.SENDGRID_FROM_EMAIL || "info@privatesprachkurse.ch",
    sendgridFromName: process.env.SENDGRID_FROM_NAME || "Private Sprachkurse",
    sendgridToEmail:
      process.env.SENDGRID_TO_EMAIL || "info@privatesprachkurse.ch",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      siteName: process.env.NUXT_PUBLIC_SITE_NAME ?? "Private Sprachkurse",
      siteDescription:
        process.env.NUXT_PUBLIC_SITE_DESCRIPTION ??
        "Persönlicher Sprachunterricht für Alltag und Beruf – individuell, flexibel und mit Freude am Lernen.",
      organizationName:
        process.env.NUXT_PUBLIC_ORGANIZATION_NAME ?? "Private Sprachkurse",
      organizationLogo:
        process.env.NUXT_PUBLIC_ORGANIZATION_LOGO ?? "/favicon.png",
      defaultLocale:
        process.env.NUXT_PUBLIC_DEFAULT_LOCALE ??
        process.env.NUXT_PUBLIC_SITE_LOCALE ??
        "de_DE",
      twitterSite: process.env.NUXT_PUBLIC_TWITTER_SITE ?? "@orbitype",
      twitterCreator: process.env.NUXT_PUBLIC_TWITTER_CREATOR ?? "@orbitype",
      ogImageEnabled: process.env.NUXT_PUBLIC_OG_IMAGE_ENABLED !== "false",
      commentsEnabled: process.env.NUXT_PUBLIC_COMMENTS_ENABLED === "true",
      gtmId,
      gaId,
      ogLogoPath: process.env.NUXT_PUBLIC_OG_LOGO_PATH ?? "/favicon.png",
    },
  },
  nitro: {
    compressPublicAssets: true,
    headers: [
      {
        key: "X-Robots-Tag",
        value: "index,follow",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
    },
  },
  experimental: {
    // CMS-driven paths (e.g. /angebote) are not in the generated route map.
    typedPages: false,
  },
  build: {
    transpile: [],
  },
  hooks: {
    "pages:extend"(pages) {
      // exclude _widget components
      pages = pages.filter((x) => !x.path.includes("_"))
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
        },
      ],
      script: buildAnalyticsScripts(),
    },
  },
} as NuxtConfig)
