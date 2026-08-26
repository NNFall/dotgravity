import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve, sep } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

import { referenceAtlas } from "./referenceAtlas";

const captureDirectory = resolve(
  process.cwd(),
  "artifacts",
  "visual",
  "captures",
  "1672x941",
);
const captureManifestPath = resolve(captureDirectory, "capture-manifest.json");

const relativeToRepo = (path: string) =>
  relative(process.cwd(), path).replaceAll(sep, "/");

const sha256 = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex").toUpperCase();

const waitForStablePaint = async (page: Page) => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, (image) => image.decode().catch(() => undefined)),
    );
    await new Promise<void>((finish) => {
      requestAnimationFrame(() => requestAnimationFrame(() => finish()));
    });
  });
};

test.describe("strict live visual capture", () => {
  test("captures every supplied scene from the live component page", async ({ page }) => {
    const [{ height, viewportId, width }] = referenceAtlas;
    rmSync(captureDirectory, { force: true, recursive: true });
    mkdirSync(captureDirectory, { recursive: true });

    await page.setViewportSize({ width, height });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "load" });
    await waitForStablePaint(page);

    const captures: Array<{
      sceneId: string;
      selector: string;
      file: string;
      width: number;
      height: number;
      scrollY: number;
      sha256: string;
    }> = [];

    for (const reference of referenceAtlas) {
      expect(reference.viewportId).toBe(viewportId);
      expect(reference.width).toBe(width);
      expect(reference.height).toBe(height);

      const scene = page.locator(reference.selector);
      await expect(scene, `${reference.sceneId} live component is present`).toBeVisible();
      await scene.evaluate((element) => {
        window.scrollTo(0, Math.round(element.getBoundingClientRect().top + window.scrollY));
      });
      await waitForStablePaint(page);

      const capturePath = resolve(captureDirectory, `${reference.sceneId}.png`);
      await page.screenshot({
        animations: "disabled",
        caret: "hide",
        fullPage: false,
        path: capturePath,
      });

      const captureBytes = readFileSync(capturePath);
      const capture = PNG.sync.read(captureBytes);
      expect(capture.width).toBe(reference.width);
      expect(capture.height).toBe(reference.height);
      captures.push({
        sceneId: reference.sceneId,
        selector: reference.selector,
        file: `${reference.sceneId}.png`,
        width: capture.width,
        height: capture.height,
        scrollY: await page.evaluate(() => window.scrollY),
        sha256: sha256(captureBytes),
      });
    }

    writeFileSync(
      captureManifestPath,
      `${JSON.stringify(
        {
          schemaVersion: 1,
          captureMode: "live-viewport-screenshot",
          baselineRendered: false,
          viewport: { id: viewportId, width, height },
          captures,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    expect(relativeToRepo(captureManifestPath)).toBe(
      "artifacts/visual/captures/1672x941/capture-manifest.json",
    );
  });
});
