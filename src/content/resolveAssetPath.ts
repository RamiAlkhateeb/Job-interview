const base = import.meta.env.BASE_URL.replace(/\/$/, '')

/**
 * Content data stores root-absolute asset paths (`/figures/...`) written
 * against a site served at `/`. Under GitHub Pages the site is served from
 * a subpath (`/BA2/`), so those paths need the `base` prefix at render time.
 */
export function resolveAssetPath(path: string): string {
  if (!base || !path.startsWith('/')) return path
  return base + path
}

/** Same rewrite, applied to root-absolute `src=`/`href=` refs inside raw HTML content blocks. */
export function resolveHtmlAssetPaths(html: string): string {
  if (!base) return html
  return html.replace(/(src|href)="\//g, `$1="${base}/`)
}
