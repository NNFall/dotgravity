import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement, type ComponentType } from "react";
import { render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

type EventsBridgeModule = {
  EventsBridge: ComponentType;
};

const loadEventsBridge = async (): Promise<EventsBridgeModule | null> => {
  try {
    const componentSpecifier =
      "../../src/components/scenes/" + "EventsBridge";

    return (await import(
      /* @vite-ignore */ componentSpecifier
    )) as EventsBridgeModule;
  } catch {
    return null;
  }
};

describe("events bridge", () => {
  test("offers an honest external path to the community without inventing an event programme", async () => {
    const eventsBridgeModule = await loadEventsBridge();

    expect(eventsBridgeModule).not.toBeNull();
    if (!eventsBridgeModule) {
      return;
    }

    render(createElement(eventsBridgeModule.EventsBridge));

    const bridge = document.querySelector<HTMLElement>(
      'section[data-scene="events"]#events',
    );
    expect(bridge).not.toBeNull();
    if (!bridge) {
      throw new Error("The continuous events bridge must expose its anchor.");
    }

    expect(
      within(bridge).getByRole("heading", {
        level: 2,
        name: "Встречи и события",
      }),
    ).toBeInTheDocument();
    expect(
      within(bridge).getByText(
        "Афишу и ближайшие встречи уточняйте в сообществе",
      ),
    ).toBeInTheDocument();
    expect(within(bridge).queryByRole("article")).toBeNull();

    const communityLink = within(bridge).getByRole("link", {
      name: /сообщество.*vk/i,
    });
    expect(communityLink).toHaveAttribute(
      "href",
      "https://vk.ru/samaratochkaprityazheniya",
    );
    expect(communityLink).toHaveAttribute("target", "_blank");
    expect(communityLink).toHaveAttribute("rel", "noreferrer noopener");
    expect(bridge.textContent).not.toMatch(/\b(20\d{2}|сегодня|завтра)\b/i);
  });

  test("keeps its compact, non-overflowing composition and a touch-sized external link", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/EventsBridge.tsx"),
      "utf8",
    );
    const styles = await readFile(
      resolve(process.cwd(), "src/components/scenes/EventsBridge.module.css"),
      "utf8",
    );

    expect(source).not.toMatch(
      /tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i,
    );
    expect(styles).toContain("min-height: clamp(220px, 17vw, 300px);");
    expect(styles).toContain("overflow: clip;");
    expect(styles).toMatch(/\.communityLink\s*\{[\s\S]*?min-height:\s*44px;/);
    expect(styles).toContain("@media (max-width: 720px)");
    expect(styles).toMatch(/max-width:\s*100%;/);
  });
});
