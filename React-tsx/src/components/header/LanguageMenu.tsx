import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../../lib/i18n.ts'

export default function LanguageMenu() {
    const { i18n, t } = useTranslation()
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement | null>(null)

    const currentLanguage =
        SUPPORTED_LANGUAGES.find((language) => language.code === i18n.language)?.code ??
        i18n.resolvedLanguage ??
        'en'

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    async function handleLanguageSelect(code: string) {
        await i18n.changeLanguage(code)
        setOpen(false)
    }

    return (
        <div ref={rootRef} className="relative inline-flex">
            <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label={t('languageSwitcher.choose')}
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
                <Globe
                    aria-hidden="true"
                    className={`h-4.5 w-4.5 shrink-0 transition-colors duration-300 ${open ? 'text-[var(--accent)]' : 'text-[var(--text-subtle)] group-hover:text-[var(--text)]'}`}
                />
            </button>

            <div
                role="dialog"
                aria-label={t('languageSwitcher.section')}
                className={`
                    absolute right-0 top-[calc(100%+0.6rem)] z-[400] w-56 max-w-[calc(100vw-2rem)]
                    rounded-2xl border border-[var(--border)]
                    bg-[color:color-mix(in_srgb,var(--surface-card)_92%,transparent)]
                    p-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-2xl
                    transition-all duration-200 ease-out origin-top-right motion-reduce:transition-none
                    ${open
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
                    }
                `}
            >
                <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                    {t('languageSwitcher.section')}
                </h3>
                <div role="listbox" aria-label={t('languageSwitcher.choose')} className="flex flex-col gap-1">
                    {SUPPORTED_LANGUAGES.map((language) => {
                        const selected = language.code === currentLanguage
                        return (
                            <button
                                key={language.code}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                onClick={() => void handleLanguageSelect(language.code)}
                                className={`
                                    flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left
                                    transition-all duration-200 ease-out motion-reduce:transition-none cursor-pointer
                                    ${selected
                                        ? 'bg-[color:color-mix(in_srgb,var(--accent)_16%,var(--surface-card))] text-[var(--text)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_30%,transparent)]'
                                        : 'text-[var(--text-subtle)] hover:bg-[var(--surface)] hover:text-[var(--text)] active:scale-[0.99]'
                                    }
                                `}
                            >
                                <option className="font-medium cursor-pointer">{language.label}</option>
                                {selected && (
                                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}