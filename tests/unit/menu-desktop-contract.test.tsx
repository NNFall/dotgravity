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
    expect(cardRail?.[1]).toContain("margin: 22px auto 0;");
    expect(cardInner?.[1]).toContain("padding: 12px 14px 10px;");
  });
});
