import { useState } from 'react'
import type { ReactNode } from 'react'
import { CookieConsentContext } from './cookie-consent-context'
import {
    clearPreferences,
    getConsent,
    setConsent as persistConsent,
    type ConsentStatus,
} from '../lib/cookieConsent'

export function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<ConsentStatus>(getConsent)
    const [bannerVisible, setBannerVisible] = useState<boolean>(() => getConsent() === null)

    function accept() {
        persistConsent('accepted')
        setConsent('accepted')
        setBannerVisible(false)
    }

    function decline() {
        // clear before the status is set, so clearPreferences runs without the consent gate
        clearPreferences()
        persistConsent('declined')
        setConsent('declined')
        setBannerVisible(false)
    }

    function showBanner() {
        setBannerVisible(true)
    }

    function clearStoredData() {
        clearPreferences()
    }

    return (
        <CookieConsentContext.Provider
            value={{ consent, bannerVisible, accept, decline, showBanner, clearStoredData }}
        >
            {children}
        </CookieConsentContext.Provider>
    )
}
