import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render, within } from "@testing-library/react";
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

const loadSouvenirsStyles = () => {
  try {
    return readFileSync(
      resolve(
        process.cwd(),
        "src/components/scenes/SouvenirsSection.module.css",
      ),
      "utf8",
    );
  } catch {
    return "";
  }
};

describe("souvenirs anchor scene", () => {
  test("renders the bounded main photo and four reference-derived story crops", async () => {
    const souvenirsSectionModule = await loadSouvenirsSection();

    expect(souvenirsSectionModule).not.toBeNull();
    if (!souvenirsSectionModule) {
      return;
    }

    const referenceCropIds = [
      "souvenirs-reference-main-photo",
      "souvenirs-reference-bracelet",
      "souvenirs-reference-ring",
      "souvenirs-reference-teacup",
      "souvenirs-reference-tea-set",
    ] as const;
    const referenceCrops = referenceCropIds.map((id) => {
      const crop = mediaManifest.find((asset) => asset.id === id);
      if (!crop) {
        throw new Error(`The registered souvenirs crop is required: ${id}`);
      }
      return crop;
    });
    const stillLife = mediaManifest.find(
      (asset) => asset.id === "souvenirs-window-still-life",
    );
    const braceletCutout = mediaManifest.find(
      (asset) => asset.id === "souvenir-rose-quartz-bracelet-cutout",
    );
    const braceletSource = mediaManifest.find(
      (asset) => asset.id === "souvenir-rose-quartz-bracelet-source",
    );

    if (!stillLife || !braceletCutout || !braceletSource) {
      throw new Error("The legacy generated souvenirs media is required for this test.");
    }

    render(createElement(souvenirsSectionModule.SouvenirsSection));

    const souvenirs = document.querySelector<HTMLElement>(
      'section[data-scene="souvenirs"]#souvenirs',
    );
    expect(souvenirs).not.toBeNull();
    if (!souvenirs) {
      throw new Error("The souvenirs scene must expose its stable anchor.");
    }

    expect(
      within(souvenirs).getByRole("heading", {
        level: 2,
        name: "ПОДАРКИ, УКРАШЕНИЯ И РЕДКИЕ НАХОДКИ",
      }),
    ).toBeInTheDocument();
    expect(
      within(souvenirs).getByText(/больше, чем просто сувениры/i),
    ).toBeInTheDocument();
    for (const motif of [
      "УНИКАЛЬНЫЕ ПОЗИЦИИ",
      "ПОДАРКИ СО СМЫСЛОМ",
      "КОЛЛЕКЦИОННЫЕ НАХОДКИ",
      "ВНИМАНИЕ К ДЕТАЛЯМ",
    ]) {
      expect(within(souvenirs).getByText(motif)).toBeInTheDocument();
    }
    for (const title of [
      "«РОЗОВЫЙ ОТТЕНОК»",
      "«УЗОР ВРЕМЕНИ»",
      "ЦВЕТОЧНЫЙ ФАРФОР",
      "ЧАЙНЫЙ НАБОР",
    ]) {
      expect(within(souvenirs).getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
    expect(within(souvenirs).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(souvenirs).getByRole("link", {
        name: "Уточнить наличие в кафе",
      }),
    ).toHaveAttribute("href", "#contacts");

    const referenceImages = within(souvenirs).getAllByRole("img", {
      name: /референсный фрагмент.*не документальн/i,
    });
    expect(referenceImages).toHaveLength(referenceCrops.length);
    for (const [index, image] of referenceImages.entries()) {
      expect(image).toHaveAttribute("src", referenceCrops[index].path);
      expect(image).toHaveAttribute("data-provenance", "reference-derived");
      expect(image).toHaveAccessibleName(/не документальн/i);
    }
    expect(souvenirs.innerHTML).not.toContain(stillLife.path);
    expect(souvenirs.innerHTML).not.toContain(braceletCutout.path);
    expect(souvenirs.innerHTML).not.toContain(braceletSource.path);
    expect(souvenirs.innerHTML).not.toMatch(/корзин|купить|в наличии|₽/i);
    expect(souvenirs.innerHTML).not.toMatch(
      /натуральн|серебрян|лимитирован|венгерск|европ|xx века|отличное состояние/i,
    );
    expect(
      within(souvenirs).getByText("Фрагменты референсной концепции"),
    ).toBeInTheDocument();
    expect(
      within(souvenirs).getByText("не документальная фотография места"),
    ).toBeInTheDocument();
  });

  test("renders the desktop cathedral and floral seal as bounded reference decorations", async () => {
    const souvenirsSectionModule = await loadSouvenirsSection();

    expect(souvenirsSectionModule).not.toBeNull();
    if (!souvenirsSectionModule) {
      return;
    }

    const decorationIds = [
      ["cathedral", "souvenirs-reference-cathedral-linework"],
      ["seal", "souvenirs-reference-seal-linework"],
    ] as const;

    render(createElement(souvenirsSectionModule.SouvenirsSection));

    const souvenirs = document.querySelector<HTMLElement>(
      'section[data-scene="souvenirs"]#souvenirs',
    );
    expect(souvenirs).not.toBeNull();

    for (const [kind, id] of decorationIds) {
      const artwork = mediaManifest.find((asset) => asset.id === id);
      expect(artwork).toBeDefined();

      const decoration = souvenirs?.querySelector<HTMLImageElement>(
        `[data-souvenirs-decoration="${kind}"]`,
      );

      expect(decoration).not.toBeNull();
      expect(decoration).toHaveAttribute("src", artwork?.path);
      expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
      expect(decoration).toHaveAttribute("aria-hidden", "true");
      expect(decoration).toHaveAttribute("alt", "");
    }
  });

  test("keeps the semantic scene free of source-image, reference-screen, and icon-library coupling", async () => {
    const souvenirsSectionModule = await loadSouvenirsSection();

    expect(souvenirsSectionModule).not.toBeNull();

    const source = readFileSync(
      resolve(process.cwd(), "src/components/scenes/SouvenirsSection.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(
      /tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i,
    );
    expect(source).not.toMatch(/\b[A-F0-9]{64}\b/i);
    expect(source).not.toMatch(/@phosphor-icons\/react/i);
    expect(source).not.toMatch(/souvenir-rose-quartz-bracelet-source/i);
    expect(source).not.toMatch(/\bsrc\s*=\s*["'][^"']+\.png["']/i);
  });

  test("uses an overflow-safe mobile snap rail with a touch-sized availability CTA", () => {
    const styles = loadSouvenirsStyles();

    expect(styles).toMatch(/overflow-x:\s*hidden/i);
    expect(styles).toMatch(/scroll-snap-type:\s*x\s+mandatory/i);
    expect(styles).toMatch(/scroll-snap-align:\s*start/i);
    expect(styles).toMatch(/min-height:\s*(?:44px|2\.75rem)/i);
    expect(styles).toMatch(/@media \(max-width: 720px\)/i);
  });

  test("holds the desktop reference rhythm for the title and inset story cards", () => {
    const styles = loadSouvenirsStyles();
    const mobileStart = styles.indexOf("@media (max-width: 900px)");
    const desktopStyles = mobileStart === -1 ? styles : styles.slice(0, mobileStart);

    expect(desktopStyles).toMatch(
      /\.copy h2\s*\{[\s\S]*?font-size:\s*clamp\(2\.8rem,\s*3\.2vw,\s*3\.4rem\);/i,
    );
    expect(desktopStyles).toMatch(
      /\.introduction\s*\{[\s\S]*?max-width:\s*520px;[\s\S]*?margin:\s*16px 0 0;/i,
    );
    expect(desktopStyles).toMatch(
      /\.cta\s*\{[\s\S]*?margin-top:\s*37px;/i,
    );
    const storyArticle = desktopStyles.match(
      /\.storyCard article\s*\{([\s\S]*?)\n  \}/i,
    )?.[1];
    expect(storyArticle).toMatch(/padding:\s*12px 7px 11px;/i);
    expect(storyArticle).toMatch(/gap:\s*14px;/i);
    const storyContent = desktopStyles.match(
      /\.storyContent\s*\{([\s\S]*?)\n  \}/i,
    )?.[1];
    expect(storyContent).toMatch(/padding:\s*17px 7px 13px;/i);
    expect(desktopStyles).toMatch(
      /\.storyVisual\s*\{[\s\S]*?border-radius:\s*0;/i,
    );
  });

  test("uses the calibrated paper surface only on desktop story cards", () => {
    const styles = loadSouvenirsStyles();
    const desktopStart = styles.indexOf("@media (min-width: 901px)");
    const mobileStart = styles.indexOf("@media (max-width: 900px)");
    const desktopStyles = styles.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );
    const mobileStyles = mobileStart === -1 ? "" : styles.slice(mobileStart);

    expect(desktopStyles).toMatch(
      /\.storyCard\s*\{[\s\S]*?\bbackground:\s*#f7eade;/i,
    );
    expect(mobileStyles).not.toMatch(
      /\.storyCard\s*\{[\s\S]*?\bbackground:\s*#f7eade;/i,
    );
  });

  test("keeps bounded desktop decoration and card disclosure out of the photo crops", () => {
    const styles = loadSouvenirsStyles();

    expect(styles).toMatch(
      /\.topographicLines\s*\{[\s\S]*?top:\s*-228px;[\s\S]*?left:\s*38\.6%;[\s\S]*?width:\s*428px;[\s\S]*?height:\s*422px;/i,
    );
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.storyContent\s*\{[\s\S]*?padding:\s*2px 7px 13px 0;[\s\S]*?\.storyRule,\s*\.storyContent\s+b\s*\{[\s\S]*?display:\s*none;/i,
    );
  });

  test("keeps provenance disclosure accessible without overlaying the reference crop", () => {
    const styles = loadSouvenirsStyles();

    expect(styles).toMatch(
      /\.mainArtwork figcaption,\s*\.provenanceNote\s*\{[\s\S]*?clip:\s*rect\(0 0 0 0\)/i,
    );
  });

  test("does not clip the already-bounded story crops a second time", () => {
    const styles = loadSouvenirsStyles();
    const storyVisual = styles.match(
      /\.storyVisual\s*\{([\s\S]*?)\n  \}/i,
    )?.[1];

    expect(storyVisual).toMatch(/border-radius:\s*7px;/i);
    expect(styles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.storyVisual\s*\{[\s\S]*?border-radius:\s*0;/i,
    );
  });

  test("gives desktop story copy the measured inset from each bounded crop", () => {
    const styles = loadSouvenirsStyles();

    expect(styles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.storyCard article\s*\{[\s\S]*?gap:\s*16px;/i,
    );
  });

  test("keeps the wide desktop artwork frame flush with the paper band", () => {
    const styles = loadSouvenirsStyles();

    expect(styles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.mainArtwork\s*\{[\s\S]*?box-shadow:\s*none;/i,
    );
  });
});
