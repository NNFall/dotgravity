import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { HeroSection } from "../../src/components/hero/HeroSection";
import { mediaManifest } from "../../src/media/manifest";

describe("Hero responsive paper texture loading", () => {
  test("offers the large reference texture only to wide desktops", () => {
    const texture = mediaManifest.find(
      (asset) => asset.id === "hero-reference-paper-texture",
    );

    if (!texture) {
      throw new Error("The bounded Hero paper-only texture is required.");
    }

    const { container } = render(<HeroSection />);
    const fallback = container.querySelector<HTMLImageElement>(
      '[data-hero-decoration="paper-texture"]',
    );
    const picture = fallback?.closest("picture");
    const desktopSource = picture?.querySelector("source");

    expect(picture).not.toBeNull();
    expect(desktopSource).toHaveAttribute("media", "(min-width: 1181px)");
    expect(desktopSource).toHaveAttribute("srcset", texture.path);
    expect(fallback?.getAttribute("src")).toMatch(/^data:image\//);
    expect(fallback).not.toHaveAttribute("src", texture.path);
  });

  test("keeps the responsive picture boxless so desktop image geometry is unchanged", () => {
    const styles = readFileSync(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(styles).toMatch(
      /\.paperTexturePicture\s*\{[\s\S]*?display:\s*contents;/,
    );
    expect(styles).toMatch(
      /\.paperTextureReference\s*\{[\s\S]*?top:\s*0;[\s\S]*?left:\s*0;[\s\S]*?width:\s*57\.1770334928%;[\s\S]*?height:\s*100%;[\s\S]*?object-fit:\s*fill;/,
    );
  });
});
