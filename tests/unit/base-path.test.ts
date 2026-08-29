import { describe, expect, it } from 'vitest';

import { normalizeBasePath } from '../../src/config/base-path';

describe('normalizeBasePath', () => {
  it('keeps the default root deployment empty', () => {
    expect(normalizeBasePath()).toBe('');
    expect(normalizeBasePath('/')).toBe('');
    expect(normalizeBasePath('   ')).toBe('');
  });

  it('normalizes a nested deployment prefix', () => {
    expect(normalizeBasePath('site/dotgravity')).toBe('/site/dotgravity');
    expect(normalizeBasePath('/site/dotgravity/')).toBe('/site/dotgravity');
    expect(normalizeBasePath('///site/dotgravity///')).toBe('/site/dotgravity');
  });
});
