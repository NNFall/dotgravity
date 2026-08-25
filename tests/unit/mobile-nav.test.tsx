import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { MobileNav } from "../../src/components/hero/MobileNav";

const items = [
  { href: "#about", label: "О нас" },
  { href: "#contacts", label: "Контакты" },
];

describe("mobile navigation", () => {
  test("opens, closes on Escape and returns focus to its trigger", async () => {
    const user = userEvent.setup();

    render(<MobileNav items={items} />);

    const trigger = screen.getByRole("button", {
      name: "Открыть разделы сайта",
    });
    expect(
      screen.queryByRole("navigation", { name: "Мобильные разделы сайта" }),
    ).not.toBeInTheDocument();

    await user.click(trigger);

    expect(
      screen.getByRole("navigation", { name: "Мобильные разделы сайта" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "О нас" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Мобильные разделы сайта" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  test("traps focus across the close control and preserves scrollbar space", async () => {
    const user = userEvent.setup();
    const originalInnerWidth = Object.getOwnPropertyDescriptor(
      window,
      "innerWidth",
    );
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      document.documentElement,
      "clientWidth",
    );

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1008,
    });

    try {
      render(<MobileNav items={items} />);

      await user.click(
        screen.getByRole("button", { name: "Открыть разделы сайта" }),
      );

      const closeButton = screen.getByRole("button", { name: "Закрыть меню" });
      const firstLink = screen.getByRole("link", { name: "О нас" });
      const lastLink = screen.getByRole("link", { name: "Контакты" });

      expect(document.body.style.paddingRight).toBe("16px");
      expect(firstLink).toHaveFocus();

      await user.keyboard("{Shift>}{Tab}{/Shift}");
      expect(closeButton).toHaveFocus();

      await user.keyboard("{Tab}");
      expect(firstLink).toHaveFocus();

      lastLink.focus();
      await user.keyboard("{Tab}");
      expect(closeButton).toHaveFocus();
    } finally {
      if (originalInnerWidth) {
        Object.defineProperty(window, "innerWidth", originalInnerWidth);
      }
      if (originalClientWidth) {
        Object.defineProperty(
          document.documentElement,
          "clientWidth",
          originalClientWidth,
        );
      }
    }
  });

  test("closes from the backdrop and section links without retaining scroll lock", async () => {
    const user = userEvent.setup();

    render(<MobileNav items={items} />);

    const trigger = screen.getByRole("button", {
      name: "Открыть разделы сайта",
    });

    await user.click(trigger);
    await user.click(
      screen.getByRole("button", {
        name: "Закрыть меню нажатием вне панели",
      }),
    );

    expect(
      screen.queryByRole("navigation", { name: "Мобильные разделы сайта" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole("link", { name: "Контакты" }));

    expect(
      screen.queryByRole("navigation", { name: "Мобильные разделы сайта" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
