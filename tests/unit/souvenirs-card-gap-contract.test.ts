import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/SouvenirsSection.module.css"),
  "utf8",
);

describe("souvenirs desktop card gap calibration", () => {
  test("keeps the measured per-card article gaps scoped to wide desktop", () => {
    const desktopStart = styles.indexOf("@media (min-width: 901px)");
    const mobileStart = styles.indexOf("@media (max-width: 900px)");
    const desktopStyles = styles.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );

    expect(desktopStyles).toMatch(
      /\.storyCard:nth-child\(2\) article\s*\{[\s\S]*?gap:\s*17px\s*;/i,
    );
    expect(desktopStyles).toMatch(
      /\.storyCard:nth-child\(3\) article\s*\{[\s\S]*?gap:\s*18\.5px\s*;/i,
    );
    expect(desktopStyles).toMatch(
      /\.storyCard:nth-child\(4\) article\s*\{[\s\S]*?gap:\s*12\.3px\s*;/i,
    );
    expect(styles.slice(mobileStart)).not.toMatch(
      /\.storyCard:nth-child\([2-4]\) article\s*\{[\s\S]*?gap:\s*(?:17|18\.5|12\.3)px\s*;/i,
    );
  });
});
