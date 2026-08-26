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
  test("renders four availability-led souvenir stories with only registered generated media", async () => {
    const souvenirsSectionModule = await loadSouvenirsSection();

    expect(souvenirsSectionModule).not.toBeNull();
    if (!souvenirsSectionModule) {
      return;
    }

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
      throw new Error("The registered souvenirs media is required for this test.");
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
    expect(within(souvenirs).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(souvenirs).getByRole("link", {
        name: "Уточнить наличие в кафе",
      }),
    ).toHaveAttribute("href", "#contacts");

    const mainArtwork = within(souvenirs).getByRole("img", {
      name: /сгенерированн(?:ая|ый) иллюстрация.*натюрморт.*не документальн/i,
    });
    expect(mainArtwork).toHaveAttribute("src", stillLife.path);
    expect(mainArtwork).toHaveAttribute(
      "data-provenance",
      "generated/reference-compatible",
    );

    const braceletArtwork = within(souvenirs).getByRole("img", {
      name: /сгенерированн(?:ая|ый) иллюстрация.*браслет.*не документальн/i,
    });
    expect(braceletArtwork).toHaveAttribute("src", braceletCutout.path);
    expect(braceletArtwork).toHaveAttribute(
      "data-provenance",
      "generated/reference-compatible",
    );
    expect(souvenirs.innerHTML).not.toContain(braceletSource.path);
    expect(souvenirs.innerHTML).not.toMatch(/корзин|купить|в наличии|₽/i);
    expect(
      within(souvenirs).getByText("Сгенерированная визуальная композиция"),
    ).toBeInTheDocument();
    expect(
      within(souvenirs).getByText("не документальная фотография места"),
    ).toBeInTheDocument();
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
    expect(storyArticle).toMatch(/padding:\s*11px 7px;/i);
    expect(storyArticle).toMatch(/gap:\s*14px;/i);
    const storyContent = desktopStyles.match(
      /\.storyContent\s*\{([\s\S]*?)\n  \}/i,
    )?.[1];
    expect(storyContent).toMatch(/padding:\s*17px 7px 13px;/i);
    expect(desktopStyles).toMatch(
      /\.storyVisual\s*\{[\s\S]*?border-radius:\s*7px;/i,
    );
  });
});
