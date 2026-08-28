import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
  "utf8",
);

describe("about wide desktop location card border", () => {
  test("uses the pale reference edge only on the wide desktop card", () => {
    const desktopStart = styles.indexOf("@media (min-width: 1081px)");
    const mobileStart = styles.indexOf("@media (max-width: 1080px)");
    const desktopStyles = styles.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );

    expect(desktopStyles).toMatch(
      /\.locationCard\s*\{[\s\S]*?border-color:\s*#f4e9de\s*;/i,
    );
    expect(styles.slice(mobileStart)).not.toMatch(
      /\.locationCard\s*\{[\s\S]*?border-color:\s*#f4e9de\s*;/i,
    );
  });
});
