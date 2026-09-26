import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'
import { ACCENT_PRESETS, type AccentColor } from '../../contexts/accent-context'
import { useAccent } from '../../contexts/useAccent'
import { type Theme } from '../../contexts/theme-context'
import { useTheme } from '../../contexts/useTheme'
import { useCookieConsent } from '../../contexts/useCookieConsent'

function MoonIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

function SystemIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    )
}

function SunIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                <line
                    key={a}
                    x1={12 + 6.5 * Math.cos(a * Math.PI / 180)}
                    y1={12 + 6.5 * Math.sin(a * Math.PI / 180)}
                    x2={12 + 9.5 * Math.cos(a * Math.PI / 180)}
                    y2={12 + 9.5 * Math.sin(a * Math.PI / 180)}
                />
            ))}
        </svg>
    )
}

const THEME_OPTIONS: { value: Theme; labelKey: string; Icon: () => React.JSX.Element; activeColor: string }[] = [
    { value: 'dark', labelKey: 'theme.dark', Icon: MoonIcon, activeColor: '#a5b4fc' },
    { value: 'system', labelKey: 'theme.system', Icon: SystemIcon, activeColor: 'var(--text)' },
    { value: 'light', labelKey: 'theme.light', Icon: SunIcon, activeColor: '#fbbf24' },
]

const INDICATOR_BG: Record<string, string> = {
    dark: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.5))',
    system: 'linear-gradient(135deg, rgba(156,163,175,0.3), rgba(107,114,128,0.4))',
    light: 'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(249,115,22,0.45))',
}

const INDICATOR_TRANSLATE: Record<string, string> = {
    dark: 'translateX(4px)',
    system: 'translateX(calc(100% + 4px))',
    light: 'translateX(calc(200% + 4px))',
}

export default function SettingsMenu() {
    const { t } = useTranslation()
    const { theme, currentTheme, setTheme } = useTheme()
    const { accent, setAccent } = useAccent()
    const { consent, accept, decline, showBanner, clearStoredData } = useCookieConsent()
    const [open, setOpen] = useState(false)
    const [confirmClear, setConfirmClear] = useState(false)
    const rootRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false)
                setConfirmClear(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
                setConfirmClear(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    function handleClearData() {
        clearStoredData()
        window.location.reload()
    }

    return (
        <div ref={rootRef} className="relative inline-flex">
            <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label={t('settingsMenu.settings')}
                onClick={() => setOpen((value) => !value)}
                className={`
                    group relative inline-flex h-10 w-10 items-center justify-center rounded-full border
                    transition-all duration-200 ease-out motion-reduce:transition-none cursor-pointer
                    ${open
                        ? 'border-[var(--accent)] bg-[var(--surface-card)] text-[var(--text)] shadow-[0_12px_30px_rgba(0,0,0,0.18)] ring-4 ring-[color:color-mix(in_srgb,var(--accent)_16%,transparent)]'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-[0_8px_24px_rgba(0,0,0,0.14)] hover:-translate-y-[1px] hover:border-[var(--border-hover)] hover:bg-[var(--surface-card)] active:translate-y-0 active:scale-[0.985] active:shadow-[0_4px_14px_rgba(0,0,0,0.14)]'
                    }
                `}
            >
                <FiSettings
                    aria-hidden="true"
                    className={`
                        h-4.5 w-4.5 shrink-0 transition-transform duration-300 ease-out
                        ${open ? 'rotate-45 text-[var(--accent)]' : 'text-[var(--text-subtle)] group-hover:text-[var(--text)]'}
                    `}
                />
            </button>

            <div
                role="dialog"
                aria-label={t('settingsMenu.settings')}
                className={`
                    absolute right-0 top-[calc(100%+0.6rem)] z-[400] w-72 max-w-[calc(100vw-2rem)]
                    max-h-[70vh] overflow-y-auto rounded-2xl border border-[var(--border)]
                    bg-[color:color-mix(in_srgb,var(--surface-card)_92%,transparent)]
                    shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-2xl
                    transition-all duration-200 ease-out origin-top-right motion-reduce:transition-none
                    ${open
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
                    }
                `}
            >
                <div className="flex flex-col gap-4 p-4">
                    <section className="border-t border-[var(--border)] pt-4">
                        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                            {t('settingsMenu.appearance')}
                        </h3>
                        <div className="relative grid grid-cols-3 gap-1 rounded-xl bg-[var(--surface)] p-1">
                            <span
                                className="absolute inset-y-1 rounded-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                                style={{
                                    width: 'calc(33.333% - 3px)',
                                    transform: INDICATOR_TRANSLATE[theme],
                                    background: INDICATOR_BG[theme],
                                }}
                            />
                            {THEME_OPTIONS.map(({ value, labelKey, Icon, activeColor }) => {
                                const selected = theme === value
                                const label = t(labelKey)
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-label={label}
                                        aria-pressed={selected}
                                        onClick={() => setTheme(value)}
                                        style={{ color: selected ? activeColor : 'var(--text-subtle)' }}
                                        className="relative z-10 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-colors duration-200 hover:text-[var(--text)]"
                                    >
                                        <Icon />
                                        {label}
                                    </button>
                                )
                            })}
                        </div>
                    </section>

                    <section className="border-t border-[var(--border)] pt-4">
                        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                            {t('settingsMenu.accentColor')}
                        </h3>
                        <div role="listbox" aria-label={t('settingsMenu.chooseAccent')} className="flex flex-wrap gap-2 px-1">
                            {(Object.keys(ACCENT_PRESETS) as AccentColor[]).map((color) => {
                                const preset = ACCENT_PRESETS[color]
                                const selected = color === accent
                                return (
                                    <button
                                        key={color}
                                        type="button"
                                        role="option"
                                        aria-selected={selected}
                                        aria-label={preset.label}
                                        onClick={() => setAccent(color)}
                                        className={`
                                            flex h-9 w-9 items-center justify-center rounded-full border-2
                                            transition-all duration-200 ease-out cursor-pointer
                                            ${selected
                                                ? 'border-[var(--accent)] scale-110'
                                                : 'border-transparent hover:scale-105'
                                            }
                                        `}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="h-6 w-6 rounded-full ring-1 ring-black/10"
                                            style={{ background: preset[currentTheme] }}
                                        />
                                    </button>
                                )
                            })}
                        </div>
                    </section>

                    <section className="border-t border-[var(--border)] pt-4">
                        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                            {t('cookieConsent.section')}
                        </h3>
                        <p className="mb-2 px-1 text-xs text-[var(--text-subtle)]">
                            {consent === 'accepted'
                                ? t('cookieConsent.statusAccepted')
                                : consent === 'declined'
                                    ? t('cookieConsent.statusDeclined')
                                    : t('cookieConsent.statusUndecided')}
                        </p>
                        {consent === null && (
                            <div className="flex gap-2 px-1">
                                <button
                                    type="button"
                                    onClick={accept}
                                    className="flex-1 rounded-xl bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                >
                                    {t('cookieConsent.accept')}
                                </button>
                                <button
                                    type="button"
                                    onClick={decline}
                                    className="flex-1 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-subtle)] transition-colors duration-200 hover:text-[var(--text)] cursor-pointer"
                                >
                                    {t('cookieConsent.decline')}
                                </button>
                            </div>
                        )}
                        {consent !== null && (
                            <button
                                type="button"
                                onClick={() => {
                                    showBanner()
                                    setOpen(false)
                                }}
                                className="mt-2 w-full px-1 text-left text-xs underline text-[var(--text-subtle)] hover:text-[var(--text)] cursor-pointer"
                            >
                                {t('cookieConsent.manage')}
                            </button>
                        )}
    
                        {confirmClear ? (
                            <div className="mt-3 px-1">
                                <p className="mb-2 text-xs text-[var(--text-subtle)]">
                                    {t('cookieConsent.clearConfirm')}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleClearData}
                                        className="flex-1 cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t('cookieConsent.clearYes')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setConfirmClear(false)}
                                        className="flex-1 cursor-pointer rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-bold text-[var(--text-subtle)] hover:text-[var(--text)]"
                                    >
                                        {t('cookieConsent.cancel')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setConfirmClear(true)}
                                className="mt-3 w-full px-1 text-left text-xs font-semibold underline underline-offset-2 text-red-500 hover:text-red-600 cursor-pointer"
                            >
                                {t('cookieConsent.clear')}
                            </button>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
