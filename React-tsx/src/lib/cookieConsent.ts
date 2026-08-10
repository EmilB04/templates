export type ConsentStatus = 'accepted' | 'declined' | null

export const CONSENT_KEY = 'cookie-consent'

/** Everything the app stores on-device. Source of truth for both the
 *  privacy-panel breakdown and what gets wiped when consent is declined. */
export const PREFERENCE_KEYS = ['theme', 'accentColor', 'lang'] as const

function storage(): Storage | null {
    try {
        return typeof window === 'undefined' ? null : window.localStorage
    } catch {
        return null
    }
}

export function getConsent(): ConsentStatus {
    const stored = storage()?.getItem(CONSENT_KEY)
    return stored === 'accepted' || stored === 'declined' ? stored : null
}

export function hasConsent(): boolean {
    return getConsent() === 'accepted'
}

export function setConsent(status: Exclude<ConsentStatus, null>): void {
    storage()?.setItem(CONSENT_KEY, status)
}

export function readPreference(key: string): string | null {
    if (!hasConsent()) return null
    try {
        return storage()?.getItem(key) ?? null
    } catch {
        return null
    }
}

export function writePreference(key: string, value: string): void {
    if (!hasConsent()) return
    try {
        storage()?.setItem(key, value)
    } catch {
        /* storage full or blocked — the choice still applies for this session */
    }
}

/** Removes everything the app has stored, but keeps the consent choice itself. */
export function clearPreferences(): void {
    const store = storage()
    if (!store) return
    for (const key of PREFERENCE_KEYS) {
        try {
            store.removeItem(key)
        } catch {
            /* ignore */
        }
    }
}
