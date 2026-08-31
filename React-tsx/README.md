# React TSX Boilerplate

Vite 6 · React 19 · TypeScript 5.8 · Tailwind CSS 3 · i18next · Framer Motion

🔗 **Live demo:** [emilb-react-template.pages.dev](https://emilb-react-template.pages.dev/)

## Stack

| Layer | Library |
|---|---|
| Build | Vite 6 |
| UI | React 19 |
| Types | TypeScript 5.8 |
| Styles | Tailwind CSS 3 (dark mode via `class`) |
| i18n | i18next + react-i18next |
| Animation | Framer Motion |

## Features

**Theme** — `ThemeContext` provides `useTheme()`. Toggles `dark` class on `<html>`. Persists to `localStorage`. Falls back to `prefers-color-scheme` on first visit.

**i18n** — Two locales: `en` and `no`. Language persisted in `localStorage`. `LanguageSwitcher` toggles EN ↔ NO.

**Animations** — Page load: header slides down, main fades up. Theme toggle: icon rotates/scales via `AnimatePresence`. Color transitions handled by Tailwind `transition-colors`.

## Structure

```
src/
├── components/
│   ├── LanguageSwitcher.tsx
│   └── ThemeSwitcher.tsx
├── context/
│   └── ThemeContext.tsx
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       └── no.json
├── App.tsx
├── main.tsx
└── index.css
```

## Getting started

```bash
npm install
npm run dev
```
