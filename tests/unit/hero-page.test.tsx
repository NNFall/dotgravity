import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Home from "../../app/page";
import { mediaManifest } from "../../src/media/manifest";

describe("hero scene", () => {
  test("renders the verified identity, navigation, contact route and honest generated visual", () => {
    render(<Home />);

    const hero = document.querySelector<HTMLElement>('section[data-scene="hero"]');
    expect(hero).not.toBeNull();

    if (!hero) {
      throw new Error("The hero scene must be present.");
    }

    expect(
      within(hero).getByRole("heading", {
        level: 1,
        name: "ТОЧКА ПРИТЯЖЕНИЯ",
      }),
    ).toBeInTheDocument();
    expect(within(hero).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const reservationCallToAction = within(hero).getByRole("link", {
      name: "Позвонить в кафе, чтобы забронировать столик",
    });
    expect(reservationCallToAction).toHaveAttribute("href", "tel:+78462630404");
    expect(reservationCallToAction).toHaveTextContent("Забронировать столик");

    expect(within(hero).getByText("Сувениры и подарки")).toBeInTheDocument();
    expect(
      within(hero).getByText("Исторический центр Самары"),
    ).toBeInTheDocument();

    const siteHeader = screen
      .getByRole("link", { name: "Точка притяжения, в начало страницы" })
      .closest("header");

    if (!siteHeader) {
      throw new Error("The site brand link must remain inside the site header.");
    }

    expect(
      within(siteHeader).getByRole("link", { name: "Самара, ул. Фрунзе, 130" }),
    ).toHaveAttribute("href", "#contacts");
    expect(
      within(siteHeader).getByRole("link", { name: "+7 (846) 263-04-04" }),
    ).toHaveAttribute("href", "tel:+78462630404");

    const navigation = screen.getByRole("navigation", { name: "Разделы сайта" });
    expect(within(navigation).getByRole("link", { name: "О нас" })).toHaveAttribute(
      "href",
      "#about",
    );
    expect(within(navigation).getByRole("link", { name: "Меню" })).toHaveAttribute(
      "href",
      "#menu",
    );
    expect(within(navigation).getByRole("link", { name: "Галерея" })).toHaveAttribute(
      "href",
      "#gallery",
    );
    expect(
      within(navigation).getByRole("link", { name: "Сувениры" }),
    ).toHaveAttribute("href", "#souvenirs");
    expect(
      within(navigation).getByRole("link", { name: "Мероприятия" }),
    ).toHaveAttribute("href", "#events");
    expect(
      within(navigation).getByRole("link", { name: "Контакты" }),
    ).toHaveAttribute("href", "#contacts");

    expect(
      screen.getByRole("button", { name: "Открыть разделы сайта" }),
    ).toHaveAttribute("aria-expanded", "false");

    const heroImage = within(hero).getByRole("img", {
      name: /сгенерированный визуальный образ/i,
    });
    expect(heroImage).toHaveAttribute(
      "src",
      "/media/generated/hero-window-church.png",
    );
    expect(heroImage).toHaveAttribute(
      "data-provenance",
      "generated/reference-compatible",
    );
    expect(hero.querySelector(".hero-mobile-address")).toHaveTextContent(
      "Самара, ул. Фрунзе, 130",
    );
    expect(document.body.innerHTML).not.toContain("tests/visual/baselines");
  });

  test("uses the registered provenance classification for the rendered hero media", () => {
    const heroMedia = mediaManifest.find(
      (asset) => asset.id === "hero-window-church",
    );

    if (!heroMedia) {
      throw new Error("The hero media must be registered for this test.");
    }

    const originalProvenance = heroMedia.provenance;

    try {
      heroMedia.provenance = {
        classification: "decorative",
        creationMethod: "test-only registry mutation",
        documentary: false,
        statement: "A non-documentary decorative test asset.",
      };

      render(<Home />);

      expect(document.querySelector(".hero-photo img")).toHaveAttribute(
        "data-provenance",
        "decorative",
      );
    } finally {
      heroMedia.provenance = originalProvenance;
    }
  });
});
