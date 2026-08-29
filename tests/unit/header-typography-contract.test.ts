import { readFile } from "node:fs/promises";

import { describe, expect, test } from "vitest";

describe("wide desktop header typography contract", () => {
  test("preserves the reference address break and desktop-only measured type offsets", async () => {
    const [headerSource, globalCss] = await Promise.all([
      readFile("src/components/hero/SiteHeader.tsx", "utf8"),
      readFile("app/globals.css", "utf8"),
    ]);

    expect(headerSource).toMatch(
      /className="site-header__address-copy"[\s\S]*?<span>Самара,\s*<\/span>[\s\S]*?<span>ул\. Фрунзе, 130<\/span>/,
    );
    expect(globalCss).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.brand-lockup__name\s*\{[\s\S]*?font-size:\s*1rem;/,
    );
    expect(globalCss).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.brand-lockup__descriptor\s*\{[\s\S]*?font-size:\s*0\.56rem;/,
    );
    expect(globalCss).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.site-header__nav\s*\{[\s\S]*?transform:\s*translateY\(6px\);/,
    );
    expect(globalCss).toMatch(
      /\.site-header__address-copy\s*\{[\s\S]*?line-height:\s*1\.55;/,
    );
  });
});
