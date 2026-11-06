import { readFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { test } from 'node:test'

const readOutput = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8')
const home = await readOutput('index.html')
const missing = await readOutput('404.html')
const origin = new URL(home.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin

function meta(html, attribute, key) {
  const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`, 'g'))]
  assert.equal(matches.length, 1, `${key} must appear exactly once`)
  return matches[0][1]
}

test('homepage has crawlable metadata and absolute social URLs before JavaScript', async () => {
  assert.equal([...home.matchAll(/<title>/g)].length, 1)
  assert.match(home, /<title>[^<]+<\/title>/)
  assert.ok(meta(home, 'name', 'description').length > 40)
  assert.equal(meta(home, 'name', 'robots'), 'index, follow')
  assert.equal(meta(home, 'property', 'og:url'), `${origin}/`)
  assert.equal(meta(home, 'name', 'twitter:card'), 'summary')
  assert.equal(meta(home, 'property', 'og:title'), meta(home, 'name', 'twitter:title'))
  const image = new URL(meta(home, 'property', 'og:image'))
  assert.equal(image.origin, origin)
  assert.equal(meta(home, 'name', 'twitter:image'), image.href)
  await access(new URL(`../dist${image.pathname}`, import.meta.url))
  assert.doesNotMatch(home, /<title>react-tsx<\/title>/)
})

test('404 HTML has noindex and no misleading homepage canonical or sharing URL', () => {
  assert.equal(meta(missing, 'name', 'robots'), 'noindex, follow')
  assert.match(missing, /<title>Page not found/)
  assert.doesNotMatch(missing, /rel="canonical"/)
  assert.doesNotMatch(missing, /property="og:url"/)
  assert.equal([...missing.matchAll(/<title>/g)].length, 1)
  assert.match(missing, /<noscript>[\s\S]*404 — Page not found[\s\S]*href="\/"/)
})

test('404 scripts, styles and favicon use root-relative URLs that work on nested paths', async () => {
  const assets = [...missing.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)]
  assert.ok(assets.length >= 3)
  for (const [, asset] of assets) {
    await access(new URL(`../dist${asset}`, import.meta.url))
  }
  assert.doesNotMatch(missing, /(?:src|href)="\.\//)
})

test('robots and sitemap agree with the canonical origin and exclude missing pages', async () => {
  const robots = await readOutput('robots.txt')
  const sitemap = await readOutput('sitemap.xml')
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
  assert.match(robots, /User-agent: \*\nAllow: \//)
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`))
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 1)
  assert.doesNotMatch(sitemap, /404/)
})
