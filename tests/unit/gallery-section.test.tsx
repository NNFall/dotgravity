import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

type GallerySectionModule = {
  GallerySection: ComponentType;
};

const loadGallerySection = async (): Promise<GallerySectionModule | null> => {
  try {
    const componentSpecifier =
      "../../src/components/scenes/" + "GallerySection";

    return (await import(
      /* @vite-ignore */ componentSpecifier
    )) as GallerySectionModule;
  } catch {
    return null;
  }
};

describe("gallery anchor scene", () => {
  test("renders the gallery anchor with the registered non-documentary interior artwork", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    const galleryMedia = mediaManifest.find(
      (asset) => asset.id === "gallery-arched-interior",
    );
    if (!galleryMedia) {
      throw new Error("The registered gallery artwork is required for this test.");
    }

    render(createElement(gallerySectionModule.GallerySection));

    const gallery = document.querySelector<HTMLElement>(
      'section[data-scene="gallery"]#gallery',
    );
    expect(gallery).not.toBeNull();
    if (!gallery) {
      throw new Error("The gallery anchor scene must be present.");
    }

    expect(
      within(gallery).getByRole("heading", {
        level: 2,
        name: /искусство,?\s*посуда и\s*атмосфера/i,
      }),
    ).toBeInTheDocument();

    const images = within(gallery).getAllByRole("img", {
      name: /сгенерированн(?:ый|ая|ое)/i,
    });
    expect(images).toHaveLength(4);
    for (const image of images) {
      expect(image).toHaveAttribute("src", galleryMedia.path);
      expect(image).toHaveAttribute(
        "data-provenance",
        "generated/reference-compatible",
      );
      expect(image).toHaveAccessibleName(/не документальн/i);
    }

    expect(
      within(gallery).getByText("Сгенерированная визуальная композиция"),
    ).toBeInTheDocument();
    expect(
      within(gallery).getByText("не документальная фотография места"),
    ).toBeInTheDocument();
  });

  test("uses a native progressive-disclosure control for the visual story", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    const user = userEvent.setup();
    render(createElement(gallerySectionModule.GallerySection));

    const details = screen.getByRole("group", {
      name: "Подробнее о визуальной композиции",
    });
    const summary = within(details).getByText("Посмотреть детали");

    expect(details).not.toHaveAttribute("open");
    await user.click(summary);
    expect(details).toHaveAttribute("open");
    expect(
      within(details).getByText(/иллюстративное изображение/i),
    ).toBeInTheDocument();
  });

  test("keeps the collage implementation free of reference-screen coupling and exposes mobile scroll snap", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/components/scenes/GallerySection.tsx"),
      "utf8",
    );
    const css = readFileSync(
      resolve(
        process.cwd(),
        "src/components/scenes/GallerySection.module.css",
      ),
      "utf8",
    );

    expect(source).not.toMatch(
      /tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i,
    );
    expect(source).not.toMatch(/\b[A-F0-9]{64}\b/i);
    expect(source).not.toMatch(/@phosphor-icons\/react/i);
    expect(css).toMatch(/scroll-snap-type:\s*x\s+mandatory/i);
    expect(css).toMatch(/scroll-snap-align:\s*start/i);
    expect(css).toMatch(/min-height:\s*(?:44px|2\.75rem)/i);
    expect(css).toMatch(/overflow-x:\s*hidden/i);
  });
});
