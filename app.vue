<script setup lang="ts">
  import { useHead, useRuntimeConfig } from "#imports"
  import { useI18n } from "#i18n"

  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const gaId = String(config.public.gaId || "")
  const gtmId = String(config.public.gtmId || "")

  const analyticsScripts: {
    key: string
    src?: string
    async?: boolean
    textContent?: string
  }[] = []

  if (gaId || gtmId) {
    analyticsScripts.push({
      key: "gtag-consent-default",
      textContent: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){dataLayer.push(arguments);}
        window.gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied'
        });
      `,
    })
  }

  if (gaId) {
    analyticsScripts.push({
      key: "gtag-js",
      src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
      async: true,
    })
    analyticsScripts.push({
      key: "gtag-config",
      textContent: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);};
        window.gtag('js', new Date());
        window.gtag('config', '${gaId}');
      `,
    })
  }

  if (gtmId) {
    analyticsScripts.push({
      key: "gtm-loader",
      textContent: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `,
    })
  }

  useHead({
    titleTemplate: (x) => {
      const siteName = String(config.public.siteName || "").trim()
      const pageTitle = String(x || "").trim()
      if (!pageTitle) return siteName
      // Never append when the page title already carries the brand or a pipe.
      if (siteName && pageTitle.includes(siteName)) return pageTitle
      if (pageTitle.includes("|")) return pageTitle
      return `${pageTitle} | ${siteName}`
    },
    htmlAttrs: {
      lang: locale.value === "de" ? "de-CH" : locale.value,
      class: "h-full",
    },
    bodyAttrs: {
      class: "h-full",
    },
    meta: [
      {
        name: "robots",
        content: "index,follow",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      {
        name: "description",
        content: config.public.siteDescription,
      },
      {
        name: "author",
        content: config.public.organizationName,
      },
      {
        name: "theme-color",
        content: "#000000",
      },
    ],
    link: [
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${config.public.siteUrl}/#organization`,
              name: config.public.organizationName,
              url: config.public.siteUrl,
              logo: {
                "@type": "ImageObject",
                url: config.public.organizationLogo,
              },
              telephone: config.public.organizationTelephone,
              email: config.public.organizationEmail,
              address: {
                "@type": "PostalAddress",
                streetAddress: config.public.organizationStreetAddress,
                postalCode: config.public.organizationPostalCode,
                addressLocality: config.public.organizationLocality,
                addressCountry: config.public.organizationCountry,
              },
              areaServed: config.public.organizationAreaServed,
              ...(Array.isArray(config.public.organizationSameAs) &&
              config.public.organizationSameAs.length > 0
                ? { sameAs: config.public.organizationSameAs }
                : {}),
            },
            {
              "@type": "WebSite",
              "@id": `${config.public.siteUrl}/#website`,
              name: config.public.siteName,
              url: config.public.siteUrl,
              description: config.public.siteDescription,
              inLanguage: locale.value === "de" ? "de-CH" : "en",
              publisher: {
                "@id": `${config.public.siteUrl}/#organization`,
              },
            },
          ],
        }),
      },
      ...analyticsScripts,
    ],
  })
</script>

<template>
  <!--eslint-disable vue/no-multiple-template-root-->
  <Head>
    <Link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin="anonymous"
    />
    <Link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    />
  </Head>

  <!-- Google Tag Manager (noscript) -->
  <noscript v-if="gtmId">
    <iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${gtmId}`"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe>
  </noscript>
  <!-- End Google Tag Manager (noscript) -->

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
