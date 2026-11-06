import { ArrowLeft, House, MapPinOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../config/site'
import PageMetadata from '../components/PageMetadata'
import { Button } from '../components/ui'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageMetadata title={`${t('notFound.title')} · ${siteConfig.name}`} description={t('notFound.description')} noIndex />
      <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-4 text-[var(--accent)]">
          <MapPinOff aria-hidden="true" className="size-8" />
        </div>
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[var(--text-subtle)]">404</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('notFound.title')}</h1>
        <p className="mt-4 text-[var(--text-subtle)]">{t('notFound.description')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-white">
            <House aria-hidden="true" className="size-4" />{t('notFound.home')}
          </a>
          <Button variant="secondary" disabled={window.history.length <= 1} onClick={() => window.history.back()}>
            <ArrowLeft aria-hidden="true" className="size-4" />{t('notFound.back')}
          </Button>
        </div>
      </section>
    </>
  )
}
