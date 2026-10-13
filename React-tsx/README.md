<h1 align="center">React TSX Template</h1>

<p align="center"><strong>A ready-to-go starter with themes, accents, four languages and smooth motion.</strong></p>

<p align="center">
  <a href="https://emilb-react-template.pages.dev/">Live demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

## Batteries included

- **Appearance.** Light, dark and system themes through `ThemeContext` and `useTheme()`. The theme toggles the `dark` class on `<html>` and follows `prefers-color-scheme` in system mode.
- **Accent colours.** Pick a preset from the settings menu. The accent adapts to the current theme.
- **i18n.** English (`en`), Norwegian (`no`), Spanish (`es`) and German (`de`), with their own header menu.
- **Privacy controls.** A cookie consent banner explains what is stored. Theme, accent and language are saved to `localStorage` only after consent and can be cleared from settings.
- **Motion.** Header, main content, footer and the cookie banner animate in and out with Framer Motion.

## Start a project

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # development server
npm run build     # type-check and production build
npm run lint      # ESLint
npm run preview   # preview the production build
```

## Built with

| Layer | Library |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Types | TypeScript 6 |
| Styles | Tailwind CSS 4 with PostCSS |
| i18n | i18next 26 + react-i18next 17 |
| Animation | Framer Motion 13 |
| Icons | Lucide React 1 + React Icons 5 |

```text
src/
  components/   Cookie banner, header (settings and language menus), footer
  contexts/     Accent, cookie consent and theme providers
  i18n/         Setup and locales (de, en, es, no)
  lib/          Cookie consent, i18n helpers, icons
  App.tsx
  main.tsx
  index.css
```

---

Created by [Emil Berglund](https://github.com/EmilB04)
