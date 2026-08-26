import { expect, test } from "@playwright/test";

test("exposes one page H1 and named primary landmarks", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "ТОЧКА ПРИТЯЖЕНИЯ" }),
  ).toHaveCount(1);
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(
    page.getByRole("navigation", { name: "Разделы сайта" }),
  ).toHaveCount(1);
});

test("labels generated menu art as illustrative and non-documentary", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const generatedArtwork = page
    .locator('#menu img[data-provenance="generated/reference-compatible"]')
    .first();

  await expect(generatedArtwork).toHaveAccessibleName(
    /сгенерированн.*не документальн/i,
  );
  await expect(
    page.getByText("Сгенерировано для иллюстрации", { exact: true }).first(),
  ).toBeVisible();
  expect(
    await page.locator('[data-provenance="generated/reference-compatible"]').count(),
  ).toBeGreaterThan(0);
});

function durationInMilliseconds(value: string) {
  const firstDuration = value.split(",")[0]?.trim() ?? "0ms";
  const duration = Number.parseFloat(firstDuration);

  return firstDuration.endsWith("ms") ? duration : duration * 1_000;
}

test("honors reduced motion while retaining an operable mobile menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const motion = await page.evaluate(() => {
    const trigger = document.querySelector<HTMLElement>(".mobile-nav-trigger");

    return {
      animationDuration: trigger ? getComputedStyle(trigger).animationDuration : null,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      transitionDuration: trigger ? getComputedStyle(trigger).transitionDuration : null,
    };
  });

  expect(motion.reducedMotion).toBe(true);
  expect(motion.scrollBehavior).toBe("auto");
  expect(durationInMilliseconds(motion.animationDuration ?? "0ms")).toBeLessThanOrEqual(0.1);
  expect(durationInMilliseconds(motion.transitionDuration ?? "0ms")).toBeLessThanOrEqual(0.1);

  const trigger = page.getByRole("button", {
    name: "Открыть разделы сайта",
  });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Навигация сайта" }),
  ).toBeVisible();
});
