import { useEffect, useState } from 'react'
import { ThemeContext, type Theme, type CurrentTheme } from './theme-context'
import { readPreference, writePreference } from '../lib/cookieConsent'
import { useCookieConsent } from './useCookieConsent'

function getSystemTheme(): CurrentTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { consent } = useCookieConsent()
  const [theme, setTheme] = useState<Theme>(
    () => (readPreference('theme') as Theme) ?? 'system'
  )
  const [systemTheme, setSystemTheme] = useState<CurrentTheme>(getSystemTheme)

  const currentTheme: CurrentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  useEffect(() => {
    const html = document.documentElement
    if (currentTheme === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }
    if (consent === 'accepted') {
      writePreference('theme', theme)
    }
  }, [currentTheme, theme, consent])

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
