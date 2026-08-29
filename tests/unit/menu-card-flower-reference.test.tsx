import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render } from "@testing-library/react";
import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

type MenuSectionModule = {
  MenuSection: ComponentType;
};

const loadMenuSection = async (): Promise<MenuSectionModule | null> => {
  try {
    const componentSpecifier =
      "../../src/components/scenes/" + "MenuSection";

    return (await import(
      /* @vite-ignore */ componentSpecifier
    )) as MenuSectionModule;
  } catch {
    return null;
  }
};

const parentReferenceSha256 =
  "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924";

const flowerBadges = [
  ["menu-reference-flower-badge-cappuccino", 320],
  ["menu-reference-flower-badge-berry-dessert", 616],
  ["menu-reference-flower-badge-pistachio-cake", 911],
  ["menu-reference-flower-badge-red-velvet", 1206],
  ["menu-reference-flower-badge-cheesecake", 1508],
] as const;

describe("menu desktop reference flower badges", () => {
  test("registers five transparent 35x39 bounded badge assets", () => {
    for (const [id, left] of flowerBadges) {
      const artwork = mediaManifest.find((asset) => asset.id === id);

      expect(artwork).toMatchObject({
        id,
        path: `/media/reference-derived/${id}.png`,
        dimensions: { width: 35, height: 39 },
        intendedScenes: ["menu"],
        productionAllowance: {
          allowed: true,
          intendedUse: "wide-desktop menu flower badge only",
          referenceShape: "bounded-reference-region",
        },
        provenance: {
          classification: "reference-derived",
          documentary: false,
          parentReferenceSha256,
        },
      });

      if (!artwork) {
        throw new Error(`The bounded flower badge must be registered: ${id}.`);
      }

      expect(artwork.provenance.classification).toBe("reference-derived");
      if (artwork.provenance.classification === "reference-derived") {
        expect(artwork.provenance.transformation).toContain(
          `x=${left},y=359,w=35,h=39`,
        );
      }
      expect(artwork.provenance.statement).toMatch(
        /not documentary venue evidence/i,
      );

      const png = PNG.sync.read(
        readFileSync(resolve(process.cwd(), "public", artwork.path.slice(1))),
      );
      const alphaValues = Array.from({ length: png.width * png.height }, (_, index) =>
        png.data[index * 4 + 3],
      );

      expect(alphaValues.some((alpha) => alpha === 0)).toBe(true);
      expect(alphaValues.some((alpha) => alpha > 0)).toBe(true);
    }
  });

  test("renders one reference badge per menu card with decorative semantics", async () => {
    const menuSectionModule = await loadMenuSection();

    expect(menuSectionModule).not.toBeNull();
    if (!menuSectionModule) {
      return;
    }

    render(createElement(menuSectionModule.MenuSection));

    const badges = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        '[data-menu-decoration="flower-badge"]',
      ),
    );

    expect(badges).toHaveLength(flowerBadges.length);
    badges.forEach((badge, index) => {
      const artwork = mediaManifest.find(
        (asset) => asset.id === flowerBadges[index][0],
      );

      expect(artwork).toBeDefined();
      expect(badge).toHaveAttribute("src", artwork?.path);
      expect(badge).toHaveAttribute("data-provenance", "reference-derived");
      expect(badge).toHaveAttribute("alt", "");
      expect(badge).toHaveAttribute("aria-hidden", "true");
      expect(badge).toHaveAttribute("width", "35");
      expect(badge).toHaveAttribute("height", "39");
    });
  });

  test("keeps the reference badges desktop-only while retaining the mobile SVG fallback", () => {
    const styles = readFileSync(
      resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
      "utf8",
    );

    expect(styles).toMatch(
      /\.cardFlowerReference\s*\{[\s\S]*?top:\s*10px;[\s\S]*?right:\s*10px;[\s\S]*?display:\s*none;[\s\S]*?width:\s*35px;[\s\S]*?height:\s*39px;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.cardFlowerReference\s*\{[\s\S]*?display:\s*block;[\s\S]*?\}[\s\S]*?\.cardFlower\s*\{[\s\S]*?display:\s*none;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1439px\)[\s\S]*?\.cardFlower\s*\{[\s\S]*?background:\s*var\(--copper\);/i,
    );
  });
});
