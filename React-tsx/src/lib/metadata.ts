import { siteConfig } from '../config/site.ts'

type PageMetadataOptions = {
  title: string
  description: string
  path?: string
  language?: string
  noIndex?: boolean
}

export function createPageMetadata({ title, description, path = '/', language = siteConfig.language, noIndex = false }: PageMetadataOptions) {
  const origin = new URL(siteConfig.url).origin
  const url = new URL(path, `${origin}/`)
  url.search = ''
  url.hash = ''
  const locales: Record<string, string> = { en: 'en_US', no: 'nb_NO', es: 'es_ES', de: 'de_DE' }

  return {
    title,
    language,
    canonical: noIndex ? undefined : url.href,
    meta: [
      { attribute: 'name', key: 'description', content: description },
      { attribute: 'name', key: 'robots', content: noIndex ? 'noindex, follow' : 'index, follow' },
      { attribute: 'property', key: 'og:type', content: 'website' },
      { attribute: 'property', key: 'og:site_name', content: siteConfig.name },
      { attribute: 'property', key: 'og:title', content: title },
      { attribute: 'property', key: 'og:description', content: description },
      { attribute: 'property', key: 'og:url', content: noIndex ? undefined : url.href },
      { attribute: 'property', key: 'og:locale', content: locales[language] ?? locales.en },
      { attribute: 'property', key: 'og:image', content: new URL(siteConfig.socialImage, origin).href },
      { attribute: 'property', key: 'og:image:width', content: '1024' },
      { attribute: 'property', key: 'og:image:height', content: '1024' },
      { attribute: 'property', key: 'og:image:alt', content: siteConfig.socialImageAlt },
      { attribute: 'name', key: 'twitter:card', content: 'summary' },
      { attribute: 'name', key: 'twitter:title', content: title },
      { attribute: 'name', key: 'twitter:description', content: description },
      { attribute: 'name', key: 'twitter:image', content: new URL(siteConfig.socialImage, origin).href },
      { attribute: 'name', key: 'twitter:image:alt', content: siteConfig.socialImageAlt },
    ],
  }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

/** Shared by Vite's static HTML and the browser metadata component. */
export function renderMetadata(metadata: ReturnType<typeof createPageMetadata>) {
  const tags = metadata.meta
    .filter((tag) => tag.content !== undefined)
    .map((tag) => `<meta ${tag.attribute}="${tag.key}" content="${escapeHtml(tag.content!)}" />`)
  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    ...tags,
    ...(metadata.canonical ? [`<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`] : []),
  ].join('\n  ')
}
