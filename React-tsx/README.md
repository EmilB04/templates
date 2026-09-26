# React TSX Template

Vite 8, React 19, TypeScript 6, Tailwind CSS 4, i18next, and Framer Motion.

🔗 **Live demo:** [emilb-react-template.pages.dev](https://emilb-react-template.pages.dev/)

## Stack

| Layer | Library |
|---|---|
| Build | Vite 8 |
| UI | React 19 |
| Types | TypeScript 6 |
| Styles | Tailwind CSS 4 with PostCSS |
| i18n | i18next 26 + react-i18next 17 |
| Animation | Framer Motion 13 |
| Icons | Lucide React 1 + React Icons 5 |

## Features

**Appearance** — Light, dark, and system themes through `ThemeContext` and `useTheme()`. The selected theme toggles the `dark` class on `<html>` and follows `prefers-color-scheme` when system mode is active.

**Accent colors** — Multiple accent presets can be selected from the settings menu. The active accent adapts to the current theme.

**i18n** — Four locales are included: English (`en`), Norwegian (`no`), Spanish (`es`), and German (`de`). Language selection is available from its own header menu.

**Privacy controls** — A cookie consent banner explains what is stored. Theme, accent, and language preferences are saved to `localStorage` only after consent and can be cleared from settings.

**Animations** — Header, main content, footer, and cookie banner use Framer Motion for entrance and exit transitions.

## Structure

```
src/
├── components/
│   ├── CookieConsentBanner.tsx
│   ├── footer/
│   │   └── FooterSection.tsx
│   └── header/
│       ├── HeaderSection.tsx
│       ├── HeaderText.tsx
│       ├── LanguageMenu.tsx
│       └── SettingsMenu.tsx
├── contexts/
│   ├── AccentContext.tsx
│   ├── CookieConsentProvider.tsx
│   └── ThemeContext.tsx
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── de.json
│       ├── en.json
│       ├── es.json
│       └── no.json
├── lib/
│   ├── cookieConsent.ts
│   ├── i18n.ts
│   └── icons.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Getting started

```bash
npm install
npm run dev
```

The project requires Node.js 20 or newer. Available scripts:

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```
