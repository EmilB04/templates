import { motion } from 'framer-motion'
import SettingsMenu from './SettingsMenu'
import HeaderText from './HeaderText'
import LanguageMenu from './LanguageMenu'

export default function HeaderSection() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="border-b border-gray-200 dark:border-gray-800"
        >
            <section className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-4">
                <HeaderText />
                <div className="flex gap-2">
                    <LanguageMenu />
                    <SettingsMenu />
                </div>
            </section>
        </motion.header>
    )
}
