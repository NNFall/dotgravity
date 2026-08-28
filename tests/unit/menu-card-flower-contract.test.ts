import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const source = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.tsx"),
  "utf8",
);
const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

describe("menu card reference flower", () => {
  test("renders a dedicated five-petal card marker instead of the filled circle", () => {
    expect(source).toMatch(/card\s*flower/i);
    expect(source).toMatch(/card \?\s*"card-flower"/i);
    expect(source).toMatch(/rotate\(\$\{index \* 72\}/i);
  });

  test("uses the reference marker only on wide desktop and keeps the mobile badge usable", () => {
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.cardFlower\s*\{[\s\S]*?background:\s*transparent\s*;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1439px\)[\s\S]*?\.cardFlower\s*\{[\s\S]*?background:\s*var\(--copper\)\s*;/i,
    );
  });
});
