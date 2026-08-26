import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1672, height: 941 },
  { width: 390, height: 844 },
  { width: 320, height: 844 },
] as const;

const mainAnchors = [
  { label: "О нас", targetId: "about" },
  { label: "Меню", targetId: "menu" },
  { label: "Галерея", targetId: "gallery" },
  { label: "Сувениры", targetId: "souvenirs" },
  { label: "Мероприятия", targetId: "events" },
  { label: "Контакты", targetId: "contacts" },
] as const;

async function openHomePage(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#hero")).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

for (const viewport of viewports) {
  test(`does not create horizontal document overflow at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openHomePage(page);

    const widths = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      ),
    }));

    expect(widths.scrollWidth, JSON.stringify(widths)).toBeLessThanOrEqual(
      widths.clientWidth,
    );
  });
}

test("desktop navigation clicks reach every declared main-anchor target", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1672, height: 941 });
  await openHomePage(page);

  const navigation = page.getByRole("navigation", { name: "Разделы сайта" });
  await expect(navigation).toBeVisible();

  for (const { label, targetId } of mainAnchors) {
    await page.evaluate(() => {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    const target = page.locator(`#${targetId}`);
    await expect(target).toBeAttached();
    await navigation.getByRole("link", { name: label, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`#${targetId}$`));
    await expect(target).toBeInViewport();
  }
});

test("mobile menu traps focus, restores the trigger, and closes after a section click", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHomePage(page);

  const trigger = page.locator("button.mobile-nav-trigger");
  const dialog = page.getByRole("dialog", { name: "Навигация сайта" });

  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAccessibleName("Открыть разделы сайта");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toHaveAccessibleName("Закрыть разделы сайта");
  await expect(dialog).toBeVisible();

  const mobileNavigation = page.getByRole("navigation", {
    name: "Мобильные разделы сайта",
  });
  const firstLink = mobileNavigation.getByRole("link", {
    name: "О нас",
    exact: true,
  });
  const closeButton = dialog.getByRole("button", {
    name: "Закрыть меню",
    exact: true,
  });

  await expect(firstLink).toBeFocused();
  expect(
    await page.locator("body").evaluate((body) => body.style.overflow),
  ).toBe("hidden");

  await page.keyboard.press("Shift+Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toHaveAccessibleName("Открыть разделы сайта");
  await expect(trigger).toBeFocused();
  expect(
    await page.locator("body").evaluate((body) => body.style.overflow),
  ).toBe("");

  await trigger.click();
  await mobileNavigation.getByRole("link", {
    name: "Контакты",
    exact: true,
  }).click();

  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#contacts$/);
  await expect(page.locator("#contacts")).toBeInViewport();
  expect(
    await page.locator("body").evaluate((body) => body.style.overflow),
  ).toBe("");
});

test("menu rail buttons and keyboard commands update the active menu item", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1672, height: 941 });
  await openHomePage(page);

  const menu = page.locator("#menu");
  await menu.scrollIntoViewIfNeeded();

  const rail = page.getByRole("region", {
    name: "Иллюстративная витрина меню",
  });
  const status = rail.getByRole("status");
  const previous = rail.getByRole("button", {
    name: "Предыдущая иллюстративная позиция меню",
  });
  const next = rail.getByRole("button", {
    name: "Следующая иллюстративная позиция меню",
  });

  await expect(rail).toBeVisible();
  await expect(status).toHaveText("Позиция 1 из 5: Капучино");

  await next.click();
  await expect(status).toHaveText("Позиция 2 из 5: Ягодный десерт");
  await expect(page.locator("#menu-card-2")).toHaveAttribute(
    "data-active",
    "true",
  );

  await previous.click();
  await expect(status).toHaveText("Позиция 1 из 5: Капучино");

  await rail.focus();
  await page.keyboard.press("End");
  await expect(status).toHaveText("Позиция 5 из 5: Чизкейк");
  await page.keyboard.press("ArrowLeft");
  await expect(status).toHaveText("Позиция 4 из 5: Красный бархат");
  await page.keyboard.press("Home");
  await expect(status).toHaveText("Позиция 1 из 5: Капучино");
  await page.keyboard.press("ArrowRight");
  await expect(status).toHaveText("Позиция 2 из 5: Ягодный десерт");
});
