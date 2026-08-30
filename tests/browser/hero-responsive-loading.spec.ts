import { expect, test, type Page } from "@playwright/test";

const heroPaperTexturePath =
  "/media/reference-derived/hero-reference-paper-texture.png";

async function openHeroWithTextureRequests(
  page: Page,
  viewport: { width: number; height: number },
) {
  const textureRequests: string[] = [];

  page.on("request", (request) => {
    if (new URL(request.url()).pathname === heroPaperTexturePath) {
      textureRequests.push(request.url());
    }
  });

  await page.setViewportSize(viewport);
  await page.goto("/", { waitUntil: "networkidle" });

  const texture = page.locator(
    '#hero img[data-hero-decoration="paper-texture"]',
  );
  await expect(texture).toBeAttached();

  return { texture, textureRequests };
}

for (const width of [390, 320]) {
  test(`does not request the large Hero paper texture at ${width}px`, async ({
    page,
  }) => {
    const { texture, textureRequests } = await openHeroWithTextureRequests(
      page,
      { width, height: 844 },
    );

    expect(textureRequests).toEqual([]);
    await expect(texture).toHaveAttribute("src", /^data:image\/gif;base64,/i);
    expect(
      await texture.evaluate(
        (image) => (image as HTMLImageElement).currentSrc,
      ),
    ).toMatch(
      /^data:image\/gif;base64,/i,
    );
  });
}

test("loads the large Hero paper texture at 1672px without changing its geometry", async ({
  page,
}) => {
  const { texture, textureRequests } = await openHeroWithTextureRequests(
    page,
    { width: 1672, height: 941 },
  );

  expect(textureRequests).toHaveLength(1);
  expect(new URL(textureRequests[0]).pathname).toBe(heroPaperTexturePath);
  expect(
    await texture.evaluate(
      (image) => (image as HTMLImageElement).currentSrc,
    ),
  ).toContain(heroPaperTexturePath);
  const geometry = await texture.evaluate((image) => {
    const rect = image.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
  expect(geometry.width).toBeCloseTo(956, 1);
  expect(geometry.height).toBe(836);
});
