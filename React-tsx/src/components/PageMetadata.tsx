import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createPageMetadata } from '../lib/metadata'

export default function PageMetadata({ title, description, path = '/', noIndex = false }: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}) {
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en').split('-')[0]

  useEffect(() => {
    const metadata = createPageMetadata({ title, description, path, noIndex, language })
    document.title = metadata.title
    document.documentElement.lang = metadata.language
    for (const { attribute, key, content } of metadata.meta) {
      const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (content === undefined) {
        existing?.remove()
        continue
      }
      const element = existing ?? document.createElement('meta')
      element.setAttribute(attribute, key)
      element.content = content
      if (!existing) document.head.append(element)
    }
    const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (metadata.canonical) {
      const canonical = existing ?? document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = metadata.canonical
      if (!existing) document.head.append(canonical)
    } else {
      existing?.remove()
    }
  }, [title, description, path, noIndex, language])

  return null
}
