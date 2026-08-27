import { render, screen, within } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { AboutSection } from "../../src/components/scenes/AboutSection";
import { mediaManifest } from "../../src/media/manifest";

describe("about anchor scene", () => {
  test("renders the about anchor with its registered generated arch artwork", () => {
    const aboutMedia = mediaManifest.find(
      (asset) => asset.id === "about-arch-interior",
    );

    if (!aboutMedia) {
      throw new Error("The registered about artwork is required for this test.");
    }

    render(<AboutSection />);

    const about = document.querySelector<HTMLElement>(
      'section[data-scene="about"]',
    );
    expect(about).toHaveAttribute("id", "about");

    if (!about) {
      throw new Error("The about anchor scene must be present.");
    }

    expect(
      within(about).getByRole("heading", { level: 2, name: "О нас" }),
    ).toBeInTheDocument();
    expect(
      within(about).getByRole("link", { name: "Узнать больше" }),
    ).toHaveAttribute("href", "#contacts");

    const artwork = within(about).getByRole("img", {
      name: /сгенерированный визуальный образ/i,
    });
    expect(artwork).toHaveAttribute("src", aboutMedia.path);
    expect(artwork).toHaveAttribute(
      "data-provenance",
      "generated/reference-compatible",
    );
    expect(artwork).toHaveAttribute("width", "1024");
    expect(artwork).toHaveAttribute("height", "1536");
    expect(
      within(about).getByText("Сгенерированная визуальная композиция"),
    ).toBeInTheDocument();
    expect(
      within(about).getByText("не документальная фотография места"),
    ).toBeInTheDocument();
    expect(within(about).getByText("ВИД НА КОСТЁЛ")).toBeInTheDocument();
    expect(
      within(about).getByText("ПРЕСВЯТОГО СЕРДЦА ИИСУСА"),
    ).toBeInTheDocument();
    expect(within(about).getByText("исторический центр Самары")).toBeInTheDocument();
    expect(within(about).getByRole("link", { name: "Узнать больше" })).toBeInTheDocument();
    expect(about.innerHTML).not.toContain("tests/visual/baselines");
  });

  test("derives honest non-documentary image labelling from registered provenance", () => {
    const aboutMedia = mediaManifest.find(
      (asset) => asset.id === "about-arch-interior",
    );

    if (!aboutMedia) {
      throw new Error("The registered about artwork is required for this test.");
    }

    const originalProvenance = aboutMedia.provenance;

    try {
      aboutMedia.provenance = {
        classification: "decorative",
        creationMethod: "test-only registry mutation",
        documentary: false,
        statement: "A non-documentary decorative test asset.",
      };

      render(<AboutSection />);

      const artwork = screen.getByRole("img");
      expect(artwork).toHaveAttribute("data-provenance", "decorative");
      expect(artwork).toHaveAccessibleName(
        "Декоративный визуальный образ интерьера с керамикой",
      );
    } finally {
      aboutMedia.provenance = originalProvenance;
    }
  });

  test("uses the reference-safe antique tableware feature label", () => {
    render(<AboutSection />);

    const about = document.querySelector<HTMLElement>(
      'section[data-scene="about"]',
    );

    expect(about).not.toBeNull();
    expect(
      within(about as HTMLElement).getByText("АНТИКВАРНАЯ ПОСУДА"),
    ).toBeInTheDocument();
  });

  test("renders the measured cathedral artwork as a bounded reference decoration", () => {
    const cathedralArtwork = mediaManifest.find(
      (asset) => asset.id === "about-reference-cathedral-linework",
    );

    expect(cathedralArtwork).toBeDefined();
    render(<AboutSection />);

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-about-decoration="cathedral"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", cathedralArtwork?.path);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
  });

  test("does not couple the scene implementation to a reference baseline or hash", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(
      /tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i,
    );
    expect(source).not.toMatch(/\b[A-F0-9]{64}\b/i);
    expect(source).not.toMatch(
      /\bimport\s+[\s\S]*?\s+from\s*["'][^"']+\.png["']/i,
    );
    expect(source).not.toMatch(/\brequire\s*\(\s*["'][^"']+\.png["']\s*\)/i);
    expect(source).not.toMatch(/\bsrc\s*=\s*["'][^"']+\.png["']/i);
  });
});
