/**
 * Normalize an optional deployment prefix for Next/Vinext.
 *
 * A blank value keeps the app at the origin root; non-empty values always
 * become a single-leading-slash path without a trailing slash so that
 * Next's basePath contract remains stable in generated asset URLs.
 */
export function normalizeBasePath(value = ''): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';

  const withLeadingSlash = `/${trimmed.replace(/^\/+/, '')}`;
  return withLeadingSlash.replace(/\/+$/, '');
}
