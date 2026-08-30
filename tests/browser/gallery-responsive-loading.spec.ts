import { expect, test, type Page } from "@playwright/test";

const galleryPaperTexturePath =
  "/media/reference-derived/gallery-reference-paper-texture.png";

async function openGalleryWithTextureRequests(
  page: Page,
  viewport: { width: number; height: number },
) {
  const textureRequests: string[] = [];

  page.on("request", (request) => {
    if (new URL(request.url()).pathname === galleryPaperTexturePath) {
      textureRequests.push(request.url());
    }
  });

  await page.setViewportSize(viewport);
  await page.goto("/", { waitUntil: "networkidle" });

  const texture = page.locator(
    '#gallery img[data-gallery-decoration="paper-texture"]',
  );
  await expect(texture).toBeAttached();

  return { texture, textureRequests };
}

for (const width of [390, 320]) {
  test(`does not request the large gallery paper texture at ${width}px`, async ({
    page,
  }) => {
    const { texture, textureRequests } = await openGalleryWithTextureRequests(
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

test("loads the large gallery paper texture at 1672px without changing its geometry", async ({
  page,
}) => {
  const { texture, textureRequests } = await openGalleryWithTextureRequests(
    page,
    { width: 1672, height: 941 },
  );

  expect(textureRequests).toHaveLength(1);
  expect(new URL(textureRequests[0]).pathname).toBe(galleryPaperTexturePath);
  expect(
    await texture.evaluate(
      (image) => (image as HTMLImageElement).currentSrc,
    ),
  ).toContain(galleryPaperTexturePath);
  await expect(texture).toHaveCSS("width", "625px");
  await expect(texture).toHaveCSS("height", "941px");

  const textureBox = await texture.boundingBox();
  const compositionBox = await page.locator("#gallery > div").boundingBox();
  expect(textureBox).not.toBeNull();
  expect(compositionBox).not.toBeNull();
  if (!textureBox || !compositionBox) {
    return;
  }

  expect(textureBox.x - compositionBox.x).toBeCloseTo(0, 2);
  expect(textureBox.y - compositionBox.y).toBeCloseTo(0, 2);
  expect(textureBox.width).toBe(625);
  expect(textureBox.height).toBe(941);
});
