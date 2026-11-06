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
- **Application components.** Theme-aware buttons, cards, text fields, alerts, dialogs, empty states, spinners and skeletons, with interactive examples in all four languages.
- **Page essentials.** A translated 404, configurable metadata, Open Graph and Twitter cards, canonical URLs, a sitemap, robots.txt and a keyboard skip link.

## Start a project

Requires Node.js 20.19+, 22.13+, or 24+. Node.js 24 LTS is recommended.

```bash
npm install
npm run dev       # development server
npm run build     # type-check and production build
npm run lint      # ESLint
npm run test:seo  # build and verify generated SEO/404 files
npm run preview   # preview the production build
```

## Reusable components

Import components from `src/components/ui`. Each homepage example lives in its own
component in `src/components/showcases/`, with its own state and handlers.
`src/components/ComponentShowcase.tsx` arranges them; remove `<ComponentShowcase />` from `src/pages/HomePage.tsx`
when starting your own application. Demo data stays in memory and is never sent
to a server or saved on the device.

| Component | Use |
| --- | --- |
| `Button` | `primary`, `secondary` and `danger` variants; `loading` disables repeated clicks and shows a spinner. Defaults to `type="button"`; use `type="submit"` in forms. |
| `Card` | A section with a title, optional description, optional action and custom content. |
| `TextField` | A labelled native input with associated hint/error text, invalid state, native input props and ref support. |
| `Alert` | `info`, `success` and `error` feedback; status messages use a live region, errors use an alert. |
| `Dialog` | A controlled native modal with a title, optional description, focus containment, Escape/backdrop dismissal and scroll locking. |
| `EmptyState` | A title, description, optional icon and optional action for empty views. |
| `Spinner` | Decorative loading indicator; pass a translated `label` when used alone. |
| `Skeleton` | Decorative placeholder; size it with `className` and label its containing loading region. |

```tsx
import { Button, Card, TextField } from './components/ui'

<Card title={t('profile.title')}>
  <form onSubmit={handleSubmit}>
    <TextField
      label={t('profile.name')}
      name="name"
      autoComplete="name"
      value={name}
      onChange={(event) => setName(event.target.value)}
      error={nameError}
      required
    />
    <Button type="submit" loading={isSaving}>{t('profile.save')}</Button>
  </form>
</Card>
```

Keep validation, async operations and translated messages in the consuming feature.
`TextField` displays errors; it does not perform validation. `Button` shows loading;
it does not start requests. For `Dialog`, pass `open`, `onClose`, `title`, a translated
`closeLabel`, and `children`; set `open` to `false` in `onClose`. Native dialogs return
focus to the trigger when it remains mounted. Loading animations respect reduced
motion preferences.

The examples use all runtime dependencies: React for state, React DOM for the
dialog portal, i18next and react-i18next for translations, Framer Motion for card
entrances and replayable animation, and Lucide React / React Icons for interface
and brand icons. `MotionShowcase` and `IconsShowcase` are separate examples.
`ShowcaseCard` shares the entrance animation, and `MotionConfig` respects reduced motion.
Enabled buttons use a pointer cursor; disabled buttons use a not-allowed cursor.

## Pages, metadata and SEO

Edit `src/config/site.ts` when reusing the template: set the application name,
production URL, default English title and description, and sharing image details.
Replace `public/social-preview.png` with your own image and update its dimensions
in `src/lib/metadata.ts` if its size changes. The favicon uses the existing EB logo
with the correct PNG MIME type.

The Vite plugin in `scripts/site-assets.ts` generates metadata in the initial HTML,
plus `404.html`, `robots.txt` and `sitemap.xml` on every build. Social crawlers can
read the default English sharing tags without executing JavaScript. In the app,
`PageMetadata` updates the document language, title, description and sharing tags
when the user changes language. English defaults come from the site config;
localized titles and descriptions live under `seo` in the other locale files.

```tsx
<PageMetadata
  title="Account settings"
  description="Manage your account preferences."
  path="/account"
  noIndex
/>
```

`App.tsx` currently selects the homepage or 404 from the URL; navigation uses normal
links with full page loads. There is no routing dependency. On Cloudflare Pages,
the generated top-level `404.html` supplies the missing-page response rather than
the automatic SPA fallback. Keep it when deploying this one-page starter. Other
hosts must be configured to serve it with HTTP 404 for unknown paths. Vite's dev
and preview servers use an SPA fallback and do not verify production HTTP status.

When adding public routes, add route handling **and** generate their HTML (or use
a router with server rendering/prerendering) so direct visits do not receive 404.
Add those public URLs to the sitemap generator. Metadata alone does not prerender
the application content. For content-heavy public pages, add prerendering or SSR.
No `hreflang` links are emitted because the language switcher does not create
separate language URLs. Do not list private or missing pages in the sitemap.

See the [Cloudflare Pages serving rules](https://developers.cloudflare.com/pages/configuration/serving-pages/)
and [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Built with

| Layer | Library |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Types | TypeScript 6 |
| Styles | Tailwind CSS 4 with PostCSS |
| i18n | i18next 26 + react-i18next 17 |
| Animation | Framer Motion 14 |
| Icons | Lucide React 1 + React Icons 5 |

TypeScript stays on 6.0 until typescript-eslint supports TypeScript 7.
The minimatch override uses the patched 11.x release while ESLint and
typescript-eslint still depend on vulnerable 10.x versions (GHSA-g3hv-75wg-m249).

```text
src/
  components/   Cookie banner, header, footer, component examples
    ui/         Reusable application components
    showcases/  Separate form, projects, feedback, loading, motion and icon examples
  config/       Site identity and SEO defaults
  contexts/     Accent, cookie consent and theme providers
  i18n/         Setup and locales (de, en, es, no)
  lib/          Cookie consent, i18n helpers, icons
  pages/        Homepage and translated 404
  App.tsx
  main.tsx
  index.css
```

---

Created by [Emil Berglund](https://github.com/EmilB04)
