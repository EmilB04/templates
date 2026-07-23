import { useEffect, useState } from 'react'
import { useTheme } from './useTheme'
import { AccentContext, ACCENT_PRESETS, DEFAULT_ACCENT, type AccentColor } from './accent-context'

const STORAGE_KEY = 'accentColor'

export function AccentProvider({ children }: { children: React.ReactNode }) {
    const { currentTheme } = useTheme()
    const [accent, setAccent] = useState<AccentColor>(
        () => (localStorage.getItem(STORAGE_KEY) as AccentColor) ?? DEFAULT_ACCENT
    )

    useEffect(() => {
        const preset = ACCENT_PRESETS[accent] ?? ACCENT_PRESETS[DEFAULT_ACCENT]
        document.documentElement.style.setProperty(
            '--accent',
            currentTheme === 'dark' ? preset.dark : preset.light
        )
        localStorage.setItem(STORAGE_KEY, accent)
    }, [accent, currentTheme])

    return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
}
