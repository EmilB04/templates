import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/useTheme'
import { siteConfig } from '../config/site'
import PageMetadata from '../components/PageMetadata'
import ComponentShowcase from '../components/ComponentShowcase'
import ebBlack from '../assets/icons/eb_black.png'
import ebWhite from '../assets/icons/eb_whte.png'

export default function HomePage() {
  const { t } = useTranslation()
  const { currentTheme } = useTheme()

  return (
    <>
      <PageMetadata
        title={t('seo.homeTitle', { defaultValue: siteConfig.title })}
        description={t('seo.homeDescription', { defaultValue: siteConfig.description })}
      />
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-4 px-6 py-16 sm:py-24">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gray-200 bg-black text-white transition-colors duration-300 dark:border-gray-800 dark:bg-white dark:text-black">
          <img src={currentTheme === 'dark' ? ebBlack : ebWhite} alt="Logo" className="h-18 w-18" />
        </div>
        <h1 className="text-4xl text-center font-bold text-[var(--accent)]">{t('greeting')}</h1>
        <p className="flex flex-wrap justify-center gap-2 text-gray-500 dark:text-gray-400">
          Vite 8 · React 19 · TypeScript 6 · Tailwind 4 · i18next 26 · Framer Motion 14 · React Icons 5 · Lucide React 1
        </p>
      </div>
      <ComponentShowcase />
    </>
  )
}
