import { createElement, type ComponentType } from "react";
import { render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

type SiteFooterModule = {
  SiteFooter: ComponentType;
};

const loadSiteFooter = async (): Promise<SiteFooterModule | null> => {
  try {
    return (await import("../../src/components/hero/SiteFooter")) as SiteFooterModule;
  } catch {
    return null;
  }
};

describe("site footer", () => {
  test("keeps source links and provenance status in a restrained semantic footer", async () => {
    const footerModule = await loadSiteFooter();

    expect(footerModule).not.toBeNull();
    if (!footerModule) {
      return;
    }

    render(createElement(footerModule.SiteFooter));

    const footer = within(document.querySelector("footer") as HTMLElement);
    expect(footer.getByRole("heading", { level: 2, name: "Точка притяжения" })).toBeInTheDocument();
    expect(footer.getByRole("link", { name: /сообщество vk/i })).toHaveAttribute(
      "href",
      "https://vk.ru/samaratochkaprityazheniya",
    );
    expect(footer.getByRole("link", { name: /маршрут.*яндекс/i })).toHaveAttribute(
      "href",
      "https://yandex.ru/maps/-/CTDBI0~o",
    );
    expect(footer.getByText(/референсные композиции/i)).toBeInTheDocument();
  });
});
