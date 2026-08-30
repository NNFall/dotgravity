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
  test("renders four bounded reference-derived gallery crops with honest provenance", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    const cropIds = [
      "gallery-reference-main-arch",
      "gallery-reference-inset-porcelain",
      "gallery-reference-inset-art",
      "gallery-reference-inset-space",
    ] as const;
    const galleryCrops = cropIds.map((id) => {
      const crop = mediaManifest.find((asset) => asset.id === id);
      if (!crop) {
        throw new Error(`The registered gallery crop is required: ${id}`);
      }
      return crop;
    });

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
      name: /референсн(?:ый|ая|ое).*не документальн/i,
    });
    expect(images).toHaveLength(4);
    expect(new Set(images.map((image) => image.getAttribute("src"))).size).toBe(
      4,
    );
    for (const [index, image] of images.entries()) {
      expect(image).toHaveAttribute("src", galleryCrops[index].path);
      expect(image).toHaveAttribute(
        "data-provenance",
        "reference-derived",
      );
      expect(image).toHaveAccessibleName(/не документальн/i);
    }

    expect(
      within(gallery).getByText("Фрагменты референсной концепции"),
    ).toBeInTheDocument();
    expect(
      within(gallery).getByText("не документальная фотография места"),
    ).toBeInTheDocument();
  });

  test("renders the measured cathedral illustration as a bounded reference decoration", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    const cathedralArtwork = mediaManifest.find(
      (asset) => asset.id === "gallery-reference-cathedral-linework",
    );

    expect(cathedralArtwork).toBeDefined();
    render(createElement(gallerySectionModule.GallerySection));

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-gallery-decoration="cathedral"]',
    );

    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute("src", cathedralArtwork?.path);
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
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
    const summary = within(details).getByText("Посмотреть галерею");

    expect(details).not.toHaveAttribute("open");
    await user.click(summary);
    expect(details).toHaveAttribute("open");
    expect(within(details).getByText(/референсн(?:ый|ая) фрагмент/i)).toBeInTheDocument();
  });

  test("describes reference-compatible motifs without unsupported collection or artist claims", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    render(createElement(gallerySectionModule.GallerySection));

    const gallery = document.querySelector<HTMLElement>(
      'section[data-scene="gallery"]#gallery',
    );
    expect(gallery).not.toBeNull();
    if (!gallery) {
      return;
    }

    const introduction = within(gallery).getByText(
      /Винтажные мотивы, образы современного искусства и продуманные детали визуальной концепции создают особую атмосферу — тёплую, вдохновляющую и располагающую к неспешным встречам/i,
    );
    expect(introduction).toBeInTheDocument();

    expect(
      within(gallery).getAllByText("Винтажные мотивы"),
    ).not.toHaveLength(0);
    expect(
      within(gallery).getAllByText("Образы современного искусства"),
    ).not.toHaveLength(0);
    expect(within(gallery).getAllByText("Уютное пространство")).not.toHaveLength(0);
    expect(gallery).not.toHaveTextContent(/коллекция винтажной посуды/i);
    expect(gallery).not.toHaveTextContent(/картины современных художников/i);
  });

  test("offers the large gallery paper texture only to viewports at least 1221px wide", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    const texture = mediaManifest.find(
      (asset) => asset.id === "gallery-reference-paper-texture",
    );
    expect(texture).toBeDefined();

    render(createElement(gallerySectionModule.GallerySection));

    const fallback = document.querySelector<HTMLImageElement>(
      'img[data-gallery-decoration="paper-texture"]',
    );
    expect(fallback).not.toBeNull();
    if (!fallback) {
      return;
    }

    const source = fallback.closest("picture")?.querySelector("source");
    expect(source).toBeDefined();
    if (!source) {
      return;
    }
    expect(source).toHaveAttribute("media", "(min-width: 1221px)");
    expect(source).toHaveAttribute("srcset", texture?.path);
    expect(fallback.getAttribute("src")).toMatch(
      /^data:image\/gif;base64,/i,
    );
    expect(fallback).toHaveAttribute("width", "625");
    expect(fallback).toHaveAttribute("height", "941");
  });

  test("uses distinct subject icons for the three gallery themes", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    render(createElement(gallerySectionModule.GallerySection));

    expect(
      Array.from(document.querySelectorAll("[data-feature-icon]"))
        .map((icon) => icon.getAttribute("data-feature-icon"))
        .sort(),
    ).toEqual(["chair", "cup", "easel"]);
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

  test("keeps reference disclosure in the accessibility tree without overlaying target artwork", () => {
    const css = readFileSync(
      resolve(
        process.cwd(),
        "src/components/scenes/GallerySection.module.css",
      ),
      "utf8",
    );

    expect(css).toMatch(
      /\.mainPhoto figcaption,\s*\.provenanceNote\s*\{[\s\S]*?clip:\s*rect\(0 0 0 0\)/i,
    );
  });

  test("renders the progressive-disclosure control before gallery theme motifs in desktop order", async () => {
    const gallerySectionModule = await loadGallerySection();

    expect(gallerySectionModule).not.toBeNull();
    if (!gallerySectionModule) {
      return;
    }

    render(createElement(gallerySectionModule.GallerySection));

    const gallery = document.querySelector<HTMLElement>(
      'section[data-scene="gallery"]#gallery',
    );
    expect(gallery).not.toBeNull();
    if (!gallery) {
      return;
    }

    const featureList = within(gallery).getByRole("list", {
      name: "Темы галереи",
    });
    const details = within(gallery).getByRole("group", {
      name: "Подробнее о визуальной композиции",
    });

    expect(
      Boolean(
        details.compareDocumentPosition(featureList) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ).toBe(true);
  });
});
