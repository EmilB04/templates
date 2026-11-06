import { useTranslation } from 'react-i18next'
import { motion, MotionConfig } from 'framer-motion'
import HeaderSection from './components/header/HeaderSection'
import FooterSection from './components/footer/FooterSection'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { t } = useTranslation()
  // Navigation uses normal links. Unknown URLs render the same page as 404.html.
  const isHome = ['/', '/index.html'].includes(window.location.pathname)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <a href="#main-content" className="sr-only z-[500] rounded-xl bg-white px-4 py-3 font-semibold text-gray-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-2 focus:outline-[var(--accent)]">
          {t('navigation.skipToContent')}
        </a>
        <HeaderSection />
        <motion.main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isHome ? <HomePage /> : <NotFoundPage />}
        </motion.main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FooterSection />
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export default App
