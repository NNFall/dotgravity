import { readFileSync } from "node:fs";

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("ContactsSection", () => {
  test("renders the verified address and safe external route", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    render(<ContactsSection />);

    const scene = document.querySelector("section#contacts[data-scene='contacts']");
    expect(scene?.querySelector("h2#contacts-title")).toHaveTextContent(
      "Как нас найти",
    );
    expect(
      scene?.querySelector("h2#contacts-title")?.previousElementSibling,
    ).toHaveTextContent("Контакты");
    const mainContactList = document.querySelector("section#contacts address");
    expect(mainContactList).toHaveTextContent("Самара, ул. Фрунзе, 130");

    const phone = scene?.querySelector("a[href='tel:+78462630404']");
    expect(phone).toHaveAttribute("href", "tel:+78462630404");
    expect(phone).toHaveTextContent("+7 (846) 263-04-04");

    const route = scene?.querySelector(
      "a[href='https://yandex.ru/maps/-/CTDBI0~o']",
    );
    expect(route).toHaveAttribute("href", "https://yandex.ru/maps/-/CTDBI0~o");
    expect(route).toHaveAttribute("target", "_blank");
    expect(route).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  }, 15_000);

  test("labels bounded reference crops as non-documentary and avoids baseline imagery", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    const { container } = render(<ContactsSection />);

    const scene = container.querySelector("section#contacts[data-scene='contacts']");
    expect(scene).toHaveAttribute("aria-labelledby", "contacts-title");

    expect(
      screen.getAllByText(/фрагмент референсной концепции/i),
    ).toHaveLength(2);
    expect(
      screen.getAllByText(/не документальная фотография/i),
    ).toHaveLength(2);
    const visuals = Array.from(
      container.querySelectorAll<HTMLImageElement>("img[data-provenance]"),
    );
    expect(visuals).toHaveLength(2);
    expect(visuals.map((visual) => visual.getAttribute("src"))).toEqual([
      "/media/reference-derived/contacts-reference-window-crop.png",
      "/media/reference-derived/contacts-reference-street-crop.png",
    ]);
    expect(visuals.map((visual) => visual.dataset.provenance)).toEqual([
      "reference-derived",
      "reference-derived",
    ]);
    expect(container.innerHTML).not.toMatch(/visual[\\/]baselines/i);
    expect(container.innerHTML).not.toMatch(/\bпн\b|\bвс\b|завтрак|меню дня/i);

    const source = readFileSync(
      "src/components/scenes/ContactsSection.tsx",
      "utf8",
    );
    expect(source).toMatch(
      /requireReferenceContactCrop\(\s*"contacts-reference-window-crop"\s*,?\s*\)/,
    );
    expect(source).toMatch(
      /requireReferenceContactCrop\(\s*"contacts-reference-street-crop"\s*,?\s*\)/,
    );
    expect(source).toContain('asset.intendedScenes.includes("contacts")');
    expect(source).not.toMatch(/@phosphor-icons[\\/]react/i);
    expect(source).not.toMatch(/tests[\\/]visual[\\/]baselines/i);
  }, 15_000);

  test("keeps the lower route panel explicitly schematic", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    render(<ContactsSection />);

    expect(screen.getByText("Схема района")).toBeInTheDocument();
    expect(
      screen.getByText(/схематичный ориентир, не интерактивная карта/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Как добраться" }),
    ).toBeInTheDocument();
  });

  test("co-locates the reference header inside the contacts scene without adding a second interactive header", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    const { container } = render(<ContactsSection />);
    const scene = container.querySelector("section#contacts[data-scene='contacts']");
    const referenceHeader = scene?.querySelector(
      "header[data-reference-header='contacts']",
    );

    expect(referenceHeader).toBeInTheDocument();
    expect(referenceHeader).toHaveAttribute("aria-hidden", "true");
    expect(referenceHeader).toHaveAttribute("inert");
    expect(referenceHeader?.querySelectorAll(".mobile-nav-trigger")).toHaveLength(0);
  });

  test("keeps the third contact row visually complete without asserting unverified hours", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    render(<ContactsSection />);

    expect(screen.getByText("Режим работы")).toBeInTheDocument();
    expect(screen.getByText("Уточняйте перед визитом")).toBeInTheDocument();
    expect(screen.queryByText(/09:00|22:00|круглосуточно/i)).not.toBeInTheDocument();
  });

  test("keeps the three desktop contact pictograms inside reference-sized copper medallions", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    const { container } = render(<ContactsSection />);
    const contactList = container.querySelector(
      "section#contacts address:has([data-contact-fact='hours'])",
    );
    const icons = contactList?.querySelectorAll("[data-contact-icon]");

    expect(icons).toHaveLength(3);
    expect(Array.from(icons ?? [], (icon) => icon.querySelector("svg"))).toHaveLength(3);
    expect(Array.from(icons ?? [], (icon) => icon.getAttribute("aria-hidden"))).toEqual([
      "true",
      "true",
      "true",
    ]);
  });

  test("uses a real phone action for booking and keeps the route as a separate map link", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    const { container } = render(<ContactsSection />);
    const scene = container.querySelector("section#contacts[data-scene='contacts']");
    const booking = scene?.querySelector("a[data-action='booking']");
    const route = scene?.querySelector(
      "a[data-action='route'][href='https://yandex.ru/maps/-/CTDBI0~o']",
    );

    expect(booking).toHaveAttribute("href", "tel:+78462630404");
    expect(booking).toHaveTextContent("Забронировать столик");
    expect(booking).toHaveAttribute(
      "aria-label",
      "Позвонить в кафе и забронировать столик",
    );
    expect(route).toHaveTextContent("Построить маршрут");
    expect(route).toHaveAttribute("target", "_blank");
    expect(route).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  test("lets the mobile editorial heading wrap inside the contact canvas", () => {
    const css = readFileSync(
      "src/components/scenes/ContactsSection.module.css",
      "utf8",
    );

    expect(css).toMatch(
      /@media\s*\(max-width:\s*860px\)[\s\S]*?\.copy h2\s*\{[\s\S]*?white-space:\s*normal;/i,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*520px\)[\s\S]*?\.contactItem\s*\{[\s\S]*?grid-template-columns:\s*32px\s+minmax\(0,\s*1fr\)\s+27px;/i,
    );
  });

  test("keeps reference disclosure accessible without adding copy over the photos", () => {
    const css = readFileSync(
      "src/components/scenes/ContactsSection.module.css",
      "utf8",
    );

    expect(css).toMatch(
      /\.windowVisual figcaption,\s*\.streetVisual figcaption\s*\{[\s\S]*?clip:\s*rect\(0 0 0 0\)/i,
    );
  });
});
