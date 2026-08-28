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

describe("bounded Contacts route-panel reference layer", () => {
  test("registers the map-and-directions crop as non-documentary bounded media", () => {
    const asset = mediaManifest.find(
      (candidate) => candidate.id === "contacts-reference-route-panel",
    );

    expect(asset).toMatchObject({
      id: "contacts-reference-route-panel",
      path: "/media/reference-derived/contacts-reference-route-panel.png",
      sha256:
        "9D563A8925DF33B5FC9B1F4F62997E5E394F95610EF4480AE2FDA5846B6B58D4",
      dimensions: { width: 1000, height: 317 },
      intendedScenes: ["contacts"],
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      },
      productionAllowance: {
        allowed: true,
        intendedUse: "wide-desktop Contacts route-panel surface only",
        referenceShape: "bounded-reference-region",
      },
    });

    expect(asset?.provenance).toMatchObject({
      transformation: expect.stringMatching(/x=623,y=594,w=1000,h=317/i),
    });
  });

  test("keeps the semantic live route figure while rendering a decorative crop", () => {
    expect(source).toMatch(/data-contacts-decoration="route-panel"/i);
    expect(source).toMatch(/contacts-reference-route-panel/i);
    expect(source).toMatch(/className=\{styles\.routePanel\}/i);
  });

  test("places the crop at the measured desktop composition origin", () => {
    expect(styles).toMatch(
      /\.routePanelReference\s*\{[\s\S]*?top:\s*489px;[\s\S]*?left:\s*37\.2607655502%;[\s\S]*?display:\s*none;[\s\S]*?width:\s*1000px;[\s\S]*?height:\s*317px;[\s\S]*?object-fit:\s*fill;/,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1181px\)[\s\S]*?\.routePanelReference\s*\{[\s\S]*?display:\s*block;/,
    );
  });
});
