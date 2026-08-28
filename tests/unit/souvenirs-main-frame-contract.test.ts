import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

type SouvenirsSectionModule = {
  SouvenirsSection: ComponentType;
};

const loadSouvenirsSection = async (): Promise<SouvenirsSectionModule | null> => {
  try {
    const componentSpecifier =
      "../../src/components/scenes/" + "SouvenirsSection";

    return (await import(
      /* @vite-ignore */ componentSpecifier
    )) as SouvenirsSectionModule;
  } catch {
    return null;
  }
};

describe("souvenirs bounded main frame", () => {
  test("registers and renders the transparent wide-desktop frame crop", async () => {
    const sectionModule = await loadSouvenirsSection();
    expect(sectionModule).not.toBeNull();
    if (!sectionModule) return;

    const asset = mediaManifest.find(
      (candidate) => candidate.id === "souvenirs-reference-main-frame-ring",
    );
    expect(asset).toBeDefined();
    expect(asset?.provenance.classification).toBe("reference-derived");
    expect(asset?.provenance.documentary).toBe(false);
    expect(asset?.dimensions).toEqual({ width: 786, height: 536 });

    render(createElement(sectionModule.SouvenirsSection));
    const frame = document.querySelector<HTMLImageElement>(
      '[data-souvenirs-decoration="main-frame-ring"]',
    );
    expect(frame).not.toBeNull();
    expect(frame).toHaveAttribute("src", asset?.path);
    expect(frame).toHaveAttribute("data-provenance", "reference-derived");
    expect(frame).toHaveAttribute("alt", "");
    expect(frame).toHaveAttribute("aria-hidden", "true");
  });

  test("gates the frame crop to desktop while preserving responsive fallbacks", () => {
    const styles = readFileSync(
      resolve(
        process.cwd(),
        "src/components/scenes/SouvenirsSection.module.css",
      ),
      "utf8",
    );
    expect(styles).toMatch(
      /\.mainFrameReference\s*\{[\s\S]*?display:\s*none;[\s\S]*?pointer-events:\s*none;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.mainFrameReference\s*\{[\s\S]*?display:\s*block;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(max-width:\s*1439px\)[\s\S]*?\.mainFrameReference\s*\{[\s\S]*?display:\s*none;/i,
    );
    expect(styles).toMatch(
      /\.mainArtwork\s*\{[\s\S]*?overflow:\s*visible;[\s\S]*?border:\s*1px\s+solid\s+transparent;/i,
    );
    expect(styles).toMatch(
      /\.mainArtwork\s+\.mainFrameReference\s*\{[\s\S]*?top:\s*-1px;[\s\S]*?left:\s*-1px;[\s\S]*?width:\s*calc\(100%\s*\+\s*2px\);[\s\S]*?height:\s*calc\(100%\s*\+\s*2px\);/i,
    );
  });
});
