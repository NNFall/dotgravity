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
    expect(menuStyles).toContain("--menu-card-x: -4px;");
    expect(menuStyles).toContain("--menu-card-x: -3px;");
  });

  test("resets desktop-only crop offsets at tablet and mobile widths", () => {
    expect(menuStyles).toMatch(
      /@media \(max-width: 1200px\) \{[\s\S]*?\.menuCard,\s*\.menuCard:nth-child\(1\),\s*\.menuCard:nth-child\(2\),\s*\.menuCard:nth-child\(3\),\s*\.menuCard:nth-child\(4\),\s*\.menuCard:nth-child\(5\)\s*\{[\s\S]*?--menu-card-x:\s*0px;/,
    );
  });
});
