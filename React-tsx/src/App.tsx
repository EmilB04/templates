import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useTheme } from './contexts/ThemeContext'
import HeaderSection from './components/header/HeaderSection'
import FooterSection from './components/footer/FooterSection'
import ebBlack from './assets/icons/eb_black.png'
import ebWhite from './assets/icons/eb_whte.png'

function App() {
  const { t } = useTranslation()
  const { currentTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <HeaderSection />

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-4 px-6 py-24">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gray-200 bg-black text-white transition-colors duration-300 dark:border-gray-800 dark:bg-white dark:text-black">
            <img src={currentTheme === 'dark' ? ebBlack : ebWhite} alt="Logo" className="h-18 w-18" />
          </div>
          <h1 className="text-4xl font-bold">{t('greeting')}</h1>
          <p className="flex flex-wrap justify-center gap-2 text-gray-500 dark:text-gray-400">
            Vite 8 · React 19 · TypeScript 6 · Tailwind 3 · i18next 26 · Framer Motion 12
          </p>
        </div>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      >
        <FooterSection />
      </motion.footer>
    </div>
  )
}

export default App
