import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { LanguageSwitcher } from './components/LanguageSwitcher'

function App() {
  const { t } = useTranslation()

  return (
    <div className="px-4 min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800"
      >
        <span className="font-semibold tracking-tight">Boilerplate</span>
        <div className="flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="flex flex-col items-center justify-center gap-4 py-24"
      >
        <h1 className="text-4xl font-bold">{t('greeting')}</h1>
        <p className="flex flex-wrap justify-center gap-2 text-gray-500 dark:text-gray-400">
          Vite 6 · React 19 · TypeScript 5.8 · Tailwind 3 · i18next · Framer Motion 10
        </p>
      </motion.main>
    </div>
  )
}

export default App
