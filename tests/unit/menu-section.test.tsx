import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const menuStyles = readFileSync(
  resolve(process.cwd(), "src/components/scenes/MenuSection.module.css"),
  "utf8",
);

describe("menu anchor scene", () => {
  test("renders five bounded reference crops with honest no-price disclosure", async () => {
    const menuSectionModule = await loadMenuSection();

    expect(menuSectionModule).not.toBeNull();
    if (!menuSectionModule) {
      return;
    }

    render(createElement(menuSectionModule.MenuSection));

    const menu = document.querySelector<HTMLElement>(
      'section[data-scene="menu"]#menu',
    );
    expect(menu).not.toBeNull();
    if (!menu) {
      throw new Error("The menu scene must expose its stable anchor.");
    }

    expect(
      within(menu).getByRole("heading", {
        level: 2,
        name: "ТО, РАДИ ЧЕГО ХОЧЕТСЯ ЗАГЛЯНУТЬ",
      }),
    ).toBeInTheDocument();
    expect(within(menu).getAllByRole("listitem")).toHaveLength(5);

    const expectedArtworkIds = [
      "menu-reference-cappuccino",
      "menu-reference-berry-dessert",
      "menu-reference-pistachio-cake",
      "menu-reference-red-velvet",
      "menu-reference-cheesecake",
    ] as const;
    const referenceImages = within(menu).getAllByRole("img", {
      name: /референсный кроп/i,
    });
    expect(referenceImages).toHaveLength(expectedArtworkIds.length);
    referenceImages.forEach((image, index) => {
      const menuArtwork = mediaManifest.find(
        (asset) => asset.id === expectedArtworkIds[index],
      );
      if (!menuArtwork) {
        throw new Error("The bounded menu crop must be registered.");
      }

      expect(image).toHaveAttribute("src", menuArtwork.path);
      expect(image).toHaveAttribute(
        "data-provenance",
        "reference-derived",
      );
      expect(image).toHaveAccessibleName(/не документальн/i);
    });

    expect(
      within(menu).getByRole("link", {
        name: "Уточнить актуальное меню и стоимость в кафе",
      }),
    ).toHaveAttribute("href", "#contacts");
    expect(within(menu).getAllByText("Стоимость уточняйте")).toHaveLength(5);
    expect(
      within(menu).queryAllByText("Сгенерировано для иллюстрации"),
    ).toHaveLength(0);
    expect(screen.queryByText(/210 ₽|260 ₽|290 ₽|350 ₽|360 ₽/)).toBeNull();
  });

  test("offers button and keyboard controls for the scroll-snap menu rail", async () => {
    const menuSectionModule = await loadMenuSection();

    expect(menuSectionModule).not.toBeNull();
    if (!menuSectionModule) {
      return;
    }

    const user = userEvent.setup();
    render(createElement(menuSectionModule.MenuSection));

    const carousel = screen.getByRole("region", {
      name: "Иллюстративная витрина меню",
    });
    const status = within(carousel).getByRole("status");
    const next = within(carousel).getByRole("button", {
      name: "Следующая иллюстративная позиция меню",
    });

    expect(status).toHaveTextContent("Позиция 1 из 5: Капучино");

    await user.click(next);
    expect(status).toHaveTextContent("Позиция 2 из 5: Ягодный десерт");
    expect(document.querySelector("#menu-card-2")).toHaveAttribute(
      "data-active",
      "true",
    );

    carousel.focus();
    await user.keyboard("{ArrowRight}");
    expect(status).toHaveTextContent("Позиция 3 из 5: Фисташковый торт");

    await user.keyboard("{ArrowLeft}");
    expect(status).toHaveTextContent("Позиция 2 из 5: Ягодный десерт");
  });

  test("keeps the menu controls operable when matchMedia is unavailable", async () => {
    const menuSectionModule = await loadMenuSection();

    expect(menuSectionModule).not.toBeNull();
    if (!menuSectionModule) {
      return;
    }

    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, "matchMedia");
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: undefined,
    });

    try {
      render(createElement(menuSectionModule.MenuSection));
      const next = screen.getByRole("button", {
        name: "Следующая иллюстративная позиция меню",
      });

      expect(() => next.click()).not.toThrow();
    } finally {
      if (originalMatchMedia) {
        Object.defineProperty(window, "matchMedia", originalMatchMedia);
      } else {
        Reflect.deleteProperty(window, "matchMedia");
      }
    }
  });

  test("keeps the five-card desktop rail aligned to the measured menu anchor", () => {
    expect(menuStyles).toContain("width: min(100% - 64px, 1470px);");
    expect(menuStyles).toContain("top: 25px;");
    expect(menuStyles).toContain("width: 176px;");
  });

  test("renders the bounded cathedral decoration as a decorative reference asset", async () => {
    const menuSectionModule = await loadMenuSection();

    expect(menuSectionModule).not.toBeNull();
    if (!menuSectionModule) {
      return;
    }

    render(createElement(menuSectionModule.MenuSection));

    const decoration = document.querySelector<HTMLImageElement>(
      '[data-menu-decoration="cathedral"]',
    );
    const cathedralArtwork = mediaManifest.find(
      (asset) => asset.id === "menu-reference-cathedral-linework",
    );

    expect(cathedralArtwork).toBeDefined();
    expect(decoration).not.toBeNull();
    expect(decoration).toHaveAttribute(
      "src",
      cathedralArtwork?.path,
    );
    expect(decoration).toHaveAttribute("data-provenance", "reference-derived");
    expect(decoration).toHaveAttribute("aria-hidden", "true");
    expect(decoration).toHaveAttribute("alt", "");
  });

  test("keeps touch-sized previous and next controls visible alongside mobile scroll snap", () => {
    const mobileControls = menuStyles.match(
      /@media \(max-width: 720px\) \{[\s\S]*?\.railArrowLeft,[\s\S]*?\.railArrowRight \{([\s\S]*?)\n  \}/,
    );

    expect(mobileControls?.[1]).toContain("display: grid;");
    expect(mobileControls?.[1]).toContain("width: 44px;");
    expect(mobileControls?.[1]).toContain("height: 44px;");
  });
});
