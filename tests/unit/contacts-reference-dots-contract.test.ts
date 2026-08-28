import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const source = readFileSync(
  resolve(process.cwd(), "src/components/scenes/ContactsSection.tsx"),
  "utf8",
);
const styles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/ContactsSection.module.css"),
  "utf8",
);

describe("contacts wide desktop reference dot crop", () => {
  test("registers the bounded dot-field crop with non-documentary provenance", () => {
    const asset = mediaManifest.find(
      (candidate) => candidate.id === "contacts-reference-dot-field",
    );

    expect(asset).toMatchObject({
      id: "contacts-reference-dot-field",
      dimensions: { width: 77, height: 285 },
      provenance: {
        classification: "reference-derived",
        documentary: false,
      },
      intendedScenes: ["contacts"],
      productionAllowance: { allowed: true },
    });
    expect(asset?.path).toBe(
      "/media/reference-derived/contacts-reference-dot-field.png",
    );
    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/bounded.*x=0,y=105,w=77,h=285/i),
    });
  });

  test("renders the dot crop only on wide desktop and keeps the CSS fallback below it", () => {
    expect(source).toMatch(/data-contacts-decoration="dot-field"/i);
    expect(source).toMatch(/contacts-reference-dot-field/i);
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.dotFieldReference\s*\{/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.paperLines\s*,\s*\.dotField\s*\{[\s\S]*?display:\s*none\s*;/,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1180px\)[\s\S]*?\.dotFieldReference\s*\{[\s\S]*?display:\s*none\s*;/,
    );
  });
});
