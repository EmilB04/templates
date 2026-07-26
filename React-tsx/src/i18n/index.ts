import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import no from './locales/no.json';
import es from './locales/es.json';
import de from './locales/de.json';
import { readPreference, writePreference } from '../lib/cookieConsent';
import { SUPPORTED_LANGUAGES } from '../lib/i18n';

const STORAGE_KEY = 'lang';

// No saved preference yet (first visit, or cookies declined) — fall back to whatever language
// the browser/OS is set to instead of always defaulting to English.
function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';
  const supported = new Set(SUPPORTED_LANGUAGES.map((l) => l.code as string));
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    if (!raw) continue;
    const base = raw.toLowerCase().split('-')[0];
    if (supported.has(base)) return base;
  }
  return 'en';
}

const savedLang = readPreference(STORAGE_KEY) ?? detectBrowserLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    no: { translation: no },
    es: { translation: es },
    de: { translation: de },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  writePreference(STORAGE_KEY, lng);
});

export default i18n;
