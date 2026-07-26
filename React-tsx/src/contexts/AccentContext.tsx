import { useEffect, useState } from 'react'
import { useTheme } from './useTheme'
import { useCookieConsent } from './useCookieConsent'
import { readPreference, writePreference } from '../lib/cookieConsent'
import { AccentContext, ACCENT_PRESETS, DEFAULT_ACCENT, type AccentColor } from './accent-context'

const STORAGE_KEY = 'accentColor'

export function AccentProvider({ children }: { children: React.ReactNode }) {
    const { currentTheme } = useTheme()
    const { consent } = useCookieConsent()
    const [accent, setAccent] = useState<AccentColor>(
        () => (readPreference(STORAGE_KEY) as AccentColor) ?? DEFAULT_ACCENT
    )

    useEffect(() => {
        const preset = ACCENT_PRESETS[accent] ?? ACCENT_PRESETS[DEFAULT_ACCENT]
        document.documentElement.style.setProperty(
            '--accent',
            currentTheme === 'dark' ? preset.dark : preset.light
        )
        if (consent === 'accepted') {
            writePreference(STORAGE_KEY, accent)
        }
    }, [accent, currentTheme, consent])

    return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
}
