import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
  "utf8",
);

describe("about wide desktop location card surface", () => {
  test("uses the calibrated pale surface only on the wide desktop card", () => {
    const desktopStart = styles.indexOf("@media (min-width: 1081px)");
    const mobileStart = styles.indexOf("@media (max-width: 1080px)");
    const desktopStyles = styles.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );

    expect(desktopStyles).toMatch(
      /\.locationCard\s*\{[\s\S]*?background:\s*#f3e8dd\s*;/i,
    );
    expect(styles.slice(mobileStart)).not.toMatch(
      /\.locationCard\s*\{[\s\S]*?background:\s*#f3e8dd\s*;/i,
    );
  });
});
