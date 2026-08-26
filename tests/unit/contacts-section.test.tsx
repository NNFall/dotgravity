import { readFileSync } from "node:fs";

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("ContactsSection", () => {
  test("renders the verified address and safe external route", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    render(<ContactsSection />);

    expect(
      screen.getByRole("heading", { name: "Как нас найти" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();
    expect(screen.getByText("Самара, ул. Фрунзе, 130")).toBeInTheDocument();

    const phone = screen.getByRole("link", { name: /позвонить/i });
    expect(phone).toHaveAttribute("href", "tel:+78462630404");
    expect(phone).toHaveTextContent("+7 (846) 263-04-04");

    const route = screen.getByRole("link", { name: /^построить маршрут$/i });
    expect(route).toHaveAttribute("href", "https://yandex.ru/maps/-/CTDBI0~o");
    expect(route).toHaveAttribute("target", "_blank");
    expect(route).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

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
  });

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
});
