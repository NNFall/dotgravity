import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const menuStyles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

describe("menu mobile rail contract", () => {
  test("gives each mobile card a nonshrinking viewport-width snap track", () => {
    const mobileRail = menuStyles.match(
      /@media \(max-width: 720px\) \{[\s\S]*?\.cards \{([\s\S]*?)\n  \}/,
    );

    expect(mobileRail?.[1]).toContain("grid-auto-flow: column;");
    expect(mobileRail?.[1]).toContain("grid-template-columns: none;");
    expect(mobileRail?.[1]).toContain(
      "grid-auto-columns: calc(100vw - 52px);",
    );
    expect(mobileRail?.[1]).not.toContain(
      "minmax(0, calc(100% - 52px))",
    );
  });

  test("keeps the compact mobile rail track nonshrinking", () => {
    const compactRail = menuStyles.match(
      /@media \(max-width: 360px\) \{[\s\S]*?\.cards \{([\s\S]*?)\n  \}/,
    );

    expect(compactRail?.[1]).toContain(
      "grid-auto-columns: calc(100vw - 39px);",
    );
  });
});
