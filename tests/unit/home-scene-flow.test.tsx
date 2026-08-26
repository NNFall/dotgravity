import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Home from "../../app/page";

const expectedSceneOrder = [
  "hero",
  "about",
  "menu",
  "gallery",
  "souvenirs",
  "events",
  "contacts",
] as const;

const expectedAnchorLabels = {
  about: "О нас",
  menu: "Меню",
  gallery: "Галерея",
  souvenirs: "Сувениры",
  events: "Мероприятия",
  contacts: "Контакты",
} as const;

describe("home scene flow", () => {
  test("composes every anchor scene into one continuous semantic main landmark", () => {
    render(<Home />);

    const main = document.querySelector<HTMLElement>("main#content");
    expect(main).not.toBeNull();

    if (!main) {
      throw new Error("The landing must render a main#content landmark.");
    }

    const mainChildren = Array.from(main.children);
    expect(mainChildren).toHaveLength(expectedSceneOrder.length);
    expect(mainChildren.every((child) => child instanceof HTMLElement)).toBe(true);
    expect(
      mainChildren.map((scene) => ({
        id: (scene as HTMLElement).id,
        scene: (scene as HTMLElement).dataset.scene,
      })),
    ).toEqual([
      ...expectedSceneOrder.slice(0, 5).map((sceneId) => ({ id: sceneId, scene: sceneId })),
      { id: "events", scene: undefined },
      { id: "contacts", scene: "contacts" },
    ]);

    for (const [index, sceneId] of expectedSceneOrder.entries()) {
      expect(document.querySelectorAll(`[id="${sceneId}"]`)).toHaveLength(1);
      expect(document.getElementById(sceneId)).toBe(mainChildren[index]);
    }

    const navigation = screen.getByRole("navigation", { name: "Разделы сайта" });
    for (const [sceneId, label] of Object.entries(expectedAnchorLabels)) {
      expect(
        within(navigation).getByRole("link", {
          name: label,
        }),
      ).toHaveAttribute("href", `#${sceneId}`);
    }

    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });
});
