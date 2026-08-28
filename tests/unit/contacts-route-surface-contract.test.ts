import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/ContactsSection.module.css"),
  "utf8",
);

describe("contacts wide desktop route panel surface", () => {
  test("uses the measured light route surface only on the wide desktop panel", () => {
    const desktopStart = styles.lastIndexOf("@media (min-width: 1181px)");
    const mobileStart = styles.indexOf(
      "@media (max-width: 1180px)",
      desktopStart,
    );
    const desktopStyles = styles.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );

    expect(desktopStyles).toMatch(
      /\.routePanel\s*\{[\s\S]*?background:\s*#f6e8dc\s*;/i,
    );
    expect(styles.slice(mobileStart)).not.toMatch(
      /\.routePanel\s*\{[\s\S]*?background:\s*#f6e8dc\s*;/i,
    );
  });
});
