import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useCookieConsent } from '../contexts/useCookieConsent'

/** What's actually stored, grouped the way a visitor thinks about it. */
const STORED_GROUPS = ['appearance', 'language'] as const

export default function CookieConsentBanner() {
    const { t } = useTranslation()
    const { bannerVisible, accept, decline } = useCookieConsent()
    const [showDetails, setShowDetails] = useState(false)

    return (
        <AnimatePresence>
            {bannerVisible && (
                <motion.div
                    role="dialog"
                    aria-label={t('cookieConsent.section')}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed inset-x-0 bottom-0 z-[500] flex justify-center px-4 pb-4 sm:px-6"
                >
                    <div
                        className="flex w-full max-w-screen-md flex-col gap-3 rounded-2xl border p-4 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
                        style={{
                            background: 'color-mix(in srgb, var(--surface-card) 94%, transparent)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <p className="text-sm text-[var(--text-subtle)]">
                                    {t('cookieConsent.message')}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowDetails((value) => !value)}
                                    aria-expanded={showDetails}
                                    className="mt-1 cursor-pointer text-xs font-semibold underline underline-offset-2 text-[var(--text-subtle)] hover:text-[var(--text)]"
                                >
                                    {showDetails ? t('cookieConsent.hideDetails') : t('cookieConsent.showDetails')}
                                </button>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button
                                    type="button"
                                    onClick={decline}
                                    className="flex-1 cursor-pointer rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-subtle)] transition-colors duration-200 hover:text-[var(--text)] sm:flex-none"
                                >
                                    {t('cookieConsent.decline')}
                                </button>
                                <button
                                    type="button"
                                    onClick={accept}
                                    className="flex-1 cursor-pointer rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:flex-none"
                                >
                                    {t('cookieConsent.accept')}
                                </button>
                            </div>
                        </section>

                        <AnimatePresence initial={false}>
                            {showDetails && (
                                <motion.dl
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className="grid gap-3 border-t pt-3 sm:grid-cols-2"
                                        style={{ borderColor: 'var(--border)' }}
                                    >
                                        {STORED_GROUPS.map((group) => (
                                            <div key={group}>
                                                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text)]">
                                                    {t(`cookieConsent.stored.${group}.title`)}
                                                </dt>
                                                <dd className="mt-1 text-xs text-[var(--text-subtle)]">
                                                    {t(`cookieConsent.stored.${group}.desc`)}
                                                </dd>
                                            </div>
                                        ))}
                                    </div>
                                </motion.dl>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
