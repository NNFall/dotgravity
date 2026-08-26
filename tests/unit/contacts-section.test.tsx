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

  test("labels generated visuals as non-documentary and avoids baseline imagery", async () => {
    const { ContactsSection } = await import(
      "../../src/components/scenes/ContactsSection"
    );

    const { container } = render(<ContactsSection />);

    const scene = container.querySelector("section#contacts[data-scene='contacts']");
    expect(scene).toHaveAttribute("aria-labelledby", "contacts-title");

    expect(
      screen.getAllByText(/сгенерированная визуальная композиция/i),
    ).toHaveLength(2);
    expect(
      screen.getAllByText(/не документальная фотография/i),
    ).toHaveLength(2);
    const visuals = Array.from(
      container.querySelectorAll<HTMLImageElement>("img[data-provenance]"),
    );
    expect(visuals).toHaveLength(2);
    expect(visuals.map((visual) => visual.getAttribute("src"))).toEqual([
      "/media/generated/hero-window-church.png",
      "/media/generated/contacts-brick-street.png",
    ]);
    expect(visuals.map((visual) => visual.dataset.provenance)).toEqual([
      "generated/reference-compatible",
      "generated/reference-compatible",
    ]);
    expect(container.innerHTML).not.toMatch(/visual[\\/]baselines/i);
    expect(container.innerHTML).not.toMatch(/\bпн\b|\bвс\b|завтрак|меню дня/i);

    const source = readFileSync(
      "src/components/scenes/ContactsSection.tsx",
      "utf8",
    );
    expect(source).toContain('requireGeneratedContactVisual("hero-window-church")');
    expect(source).toContain('requireGeneratedContactVisual("contacts-brick-street")');
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
});
