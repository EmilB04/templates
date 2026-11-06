import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { siteConfig } from '../src/config/site.ts'
import { createPageMetadata, escapeHtml, renderMetadata } from '../src/lib/metadata.ts'
import en from '../src/i18n/locales/en.json' with { type: 'json' }

/** Keep metadata in the initial HTML so crawlers do not need to run JavaScript. */
export function siteAssets(): Plugin {
  let outputDirectory: string
  const home = createPageMetadata({ title: siteConfig.title, description: siteConfig.description })
  const notFound = createPageMetadata({
    title: `${en.notFound.title} · ${siteConfig.name}`,
    description: en.notFound.description,
    noIndex: true,
  })

  return {
    name: 'template-site-assets',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    transformIndexHtml(html) {
      return html.replace('<!-- page-metadata -->', `<!-- page-metadata:start -->\n  ${renderMetadata(home)}\n  <!-- page-metadata:end -->`)
    },
    async writeBundle() {
      const html = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
      const notFoundHtml = html
        .replace(/<!-- page-metadata:start -->[\s\S]*?<!-- page-metadata:end -->/, renderMetadata(notFound))
        .replace('<!-- no-script-content -->', `<h1>404 — ${escapeHtml(en.notFound.title)}</h1><p>${escapeHtml(en.notFound.description)}</p><a href="/">${escapeHtml(en.notFound.home)}</a>`)
      await Promise.all([
        writeFile(resolve(outputDirectory, '404.html'), notFoundHtml),
        writeFile(resolve(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteConfig.url).href}\n`),
        writeFile(resolve(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeHtml(new URL('/', siteConfig.url).href)}</loc></url>\n</urlset>\n`),
      ])
    },
  }
}
