import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const menuStyles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

describe("menu desktop scene contract", () => {
  test("fits the single-line title before sizing the 16:9 scene box", () => {
    const wideDesktopScene = menuStyles.match(
      /@media \(min-width: 1440px\) \{\s*\.menuScene \{([\s\S]*?)\n  \}/,
    );
    const heading = menuStyles.match(/\.header h2 \{([\s\S]*?)\n\}/);
    const cardRail = menuStyles.match(/\.cardRail \{([\s\S]*?)\n\}/);
    const cardInner = menuStyles.match(/\.cardInner \{([\s\S]*?)\n\}/);

    expect(heading?.[1]).toContain(
      "font-size: clamp(2.65rem, 3.6vw, 3.75rem);",
    );
    expect(wideDesktopScene?.[1]).toContain("box-sizing: border-box;");
    expect(wideDesktopScene?.[1]).toContain(
      "height: max(941px, 56.28vw);",
    );
    expect(cardRail?.[1]).toContain("margin: 21px auto 0;");
    expect(cardInner?.[1]).toContain("padding: 12px 14px 10px;");
  });

  test("aligns each bounded photo crop to its measured reference origin", () => {
    expect(menuStyles).toContain("transform: translateY(2px);");
    expect(menuStyles).toContain("--menu-card-x: -1px;");
    expect(menuStyles).toContain("--menu-card-x: -2px;");
    expect(menuStyles).toContain("--menu-card-x: -3px;");
  });

  test("keeps the third and fourth desktop crops on their measured raster anchors", () => {
    expect(menuStyles).toMatch(
      /\.menuCard:nth-child\(3\)\s*\{\s*--menu-card-x:\s*-5px;/,
    );
    expect(menuStyles).toMatch(
      /\.menuCard:nth-child\(4\)\s*\{\s*--menu-card-x:\s*-8px;/,
    );
  });

  test("keeps the supplied wide desktop heading and divider rhythm", () => {
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.eyebrow > span:first-child,\s*\.eyebrow > span:last-child\s*\{[\s\S]*?width: 70px;[\s\S]*?\}/,
    );
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.header h2\s*\{[\s\S]*?margin: 44px 0 0;[\s\S]*?letter-spacing: -0\.012em;[\s\S]*?\}/,
    );
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.headingOrnament\s*\{[\s\S]*?margin-top: 13px;[\s\S]*?\}/,
    );
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.headingOrnament > span\s*\{[\s\S]*?width: 166px;[\s\S]*?\}/,
    );
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.introduction\s*\{[\s\S]*?margin: 17px 0 0;[\s\S]*?\}/,
    );
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.cardRail\s*\{[\s\S]*?margin: 22px auto 0;[\s\S]*?\}/,
    );
  });

  test("keeps the wide desktop menu paper surface flat", () => {
    expect(menuStyles).toMatch(
      /@media \(min-width: 1440px\) \{[\s\S]*?\.menuScene\s*\{[\s\S]*?background: var\(--menu-paper\);[\s\S]*?\}/,
    );
  });

  test("resets desktop-only crop offsets at tablet and mobile widths", () => {
    expect(menuStyles).toMatch(
      /@media \(max-width: 1200px\) \{[\s\S]*?\.menuCard,\s*\.menuCard:nth-child\(1\),\s*\.menuCard:nth-child\(2\),\s*\.menuCard:nth-child\(3\),\s*\.menuCard:nth-child\(4\),\s*\.menuCard:nth-child\(5\)\s*\{[\s\S]*?--menu-card-x:\s*0px;/,
    );
  });
});
