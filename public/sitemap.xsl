<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sm"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="de">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Private Sprachkurse</title>
        <style>
          :root {
            --ps-green: #1B4C2E;
            --ps-green-dark: #143A23;
            --ps-orange: #FF9F1C;
            --ps-cream: #FFF7E4;
            --ps-cream-alt: #F2F1EC;
            --ps-muted: #746E66;
            --ps-line: #E3E0D8;
            --ps-dark: #000000;
            --ps-success-bg: #E8F1EA;
            --radius: 12px;
            --font: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-height: 100vh;
            font-family: var(--font);
            font-size: 16px;
            line-height: 1.5;
            color: var(--ps-dark);
            background: var(--ps-cream);
          }

          .wrap {
            max-width: 960px;
            margin: 0 auto;
            padding: 2rem 1.25rem 3rem;
          }

          .header {
            background: var(--ps-green);
            color: #fff;
            border-radius: var(--radius);
            padding: 1.5rem 1.75rem;
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
            position: relative;
            overflow: hidden;
          }

          .header::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 4px;
            background: var(--ps-orange);
          }

          .header h1 {
            margin: 0 0 0.35rem;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          .header p {
            margin: 0;
            color: rgba(255, 255, 255, 0.88);
            font-size: 0.95rem;
            max-width: 42rem;
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem 1.25rem;
            margin: 1.25rem 0 1rem;
            align-items: center;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: var(--ps-success-bg);
            color: var(--ps-green);
            font-size: 0.875rem;
            font-weight: 600;
            padding: 0.4rem 0.85rem;
            border-radius: 50px;
          }

          .hint {
            color: var(--ps-muted);
            font-size: 0.875rem;
          }

          .panel {
            background: #fff;
            border: 1px solid var(--ps-line);
            border-radius: var(--radius);
            overflow: hidden;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            text-align: left;
            padding: 0.85rem 1.1rem;
            vertical-align: top;
          }

          thead th {
            background: var(--ps-cream-alt);
            color: var(--ps-green-dark);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            border-bottom: 1px solid var(--ps-line);
          }

          tbody tr {
            border-bottom: 1px solid var(--ps-line);
            transition: background 0.15s ease;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background: var(--ps-success-bg);
          }

          td.loc a {
            color: var(--ps-green);
            font-weight: 600;
            text-decoration: none;
            word-break: break-all;
          }

          td.loc a:hover,
          td.loc a:focus-visible {
            color: var(--ps-orange);
            text-decoration: underline;
          }

          td.lastmod {
            color: var(--ps-muted);
            font-size: 0.9rem;
            white-space: nowrap;
            width: 1%;
          }

          .footer {
            margin-top: 1.25rem;
            color: var(--ps-muted);
            font-size: 0.8rem;
          }

          @media (max-width: 640px) {
            .wrap {
              padding: 1.25rem 1rem 2rem;
            }

            th,
            td {
              padding: 0.75rem 0.85rem;
            }

            td.lastmod {
              white-space: normal;
            }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header class="header">
            <h1>Private Sprachkurse — Sitemap</h1>
            <p>
              Machine-readable sitemap for search engines. Google Search Console
              and other crawlers read the underlying XML; this page is a human-friendly view.
            </p>
          </header>

          <xsl:choose>
            <xsl:when test="sm:sitemapindex">
              <xsl:call-template name="render-index"/>
            </xsl:when>
            <xsl:when test="sm:urlset">
              <xsl:call-template name="render-urlset"/>
            </xsl:when>
            <xsl:otherwise>
              <p class="hint">No sitemap entries found.</p>
            </xsl:otherwise>
          </xsl:choose>

          <p class="footer">XML Sitemap · Private Sprachkurse</p>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="render-index">
    <div class="meta">
      <span class="badge">
        <xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/>
        <xsl:text> sitemaps</xsl:text>
      </span>
      <span class="hint">Sitemap index</span>
    </div>
    <div class="panel">
      <table>
        <thead>
          <tr>
            <th>Sitemap URL</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sm:sitemapindex/sm:sitemap">
            <tr>
              <td class="loc">
                <a href="{sm:loc}">
                  <xsl:value-of select="sm:loc"/>
                </a>
              </td>
              <td class="lastmod">
                <xsl:value-of select="sm:lastmod"/>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template name="render-urlset">
    <div class="meta">
      <span class="badge">
        <xsl:value-of select="count(sm:urlset/sm:url)"/>
        <xsl:text> URLs</xsl:text>
      </span>
      <span class="hint">URL set</span>
    </div>
    <div class="panel">
      <table>
        <thead>
          <tr>
            <th>Page URL</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sm:urlset/sm:url">
            <tr>
              <td class="loc">
                <a href="{sm:loc}">
                  <xsl:value-of select="sm:loc"/>
                </a>
              </td>
              <td class="lastmod">
                <xsl:value-of select="sm:lastmod"/>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>
</xsl:stylesheet>
