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
const sceneCaptureContexts = {
  hero: {
    liveHeader: "co-located",
    referenceHeader: "included",
    viewportOrigin: "document-top",
  },
  about: {
    liveHeader: "not-applicable",
    referenceHeader: "not-in-reference-viewport",
    viewportOrigin: "scene-top",
  },
  menu: {
    liveHeader: "not-applicable",
    referenceHeader: "not-in-reference-viewport",
    viewportOrigin: "scene-top",
  },
  gallery: {
    liveHeader: "not-applicable",
    referenceHeader: "not-in-reference-viewport",
    viewportOrigin: "scene-top",
  },
  souvenirs: {
    liveHeader: "not-applicable",
    referenceHeader: "not-in-reference-viewport",
    viewportOrigin: "scene-top",
  },
  contacts: {
    liveHeader: "not-co-located",
    referenceHeader: "included",
    viewportOrigin: "scene-top",
  },
} as const;

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
      headerTopInViewport: number | null;
      requestedScrollY: number;
      scrollY: number;
      sceneTopInViewport: number;
      captureContext: string;
      liveHeader: string;
      referenceHeader: string;
      sha256: string;
    }> = [];

    for (const reference of referenceAtlas) {
      expect(reference.viewportId).toBe(viewportId);
      expect(reference.width).toBe(width);
      expect(reference.height).toBe(height);
      const context = sceneCaptureContexts[reference.sceneId];

      const scene = page.locator(reference.selector);
      await expect(scene, `${reference.sceneId} live component is present`).toBeVisible();
      const requestedScrollY = await scene.evaluate(
        (element, viewportOrigin) => {
          const requested =
            viewportOrigin === "document-top"
              ? 0
              : element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, requested);
          return requested;
        },
        context.viewportOrigin,
      );
      await waitForStablePaint(page);
      const frame = await scene.evaluate((element) => {
        const header = document.querySelector<HTMLElement>(".site-header");
        return {
          headerHeight: header?.getBoundingClientRect().height ?? 0,
          headerTopInViewport: header?.getBoundingClientRect().top ?? null,
          renderedPixel: 1 / window.devicePixelRatio,
          sceneTopInViewport: element.getBoundingClientRect().top,
          scrollY: window.scrollY,
        };
      });
      if (context.liveHeader === "co-located") {
        expect(frame.scrollY).toBe(0);
        expect(frame.headerTopInViewport).toBe(0);
        expect(frame.sceneTopInViewport).toBe(frame.headerHeight);
      } else if (context.liveHeader === "not-co-located") {
        expect(frame.scrollY).toBeLessThan(requestedScrollY);
        expect(frame.headerTopInViewport).toBeLessThan(0);
        expect(frame.sceneTopInViewport).toBeGreaterThan(frame.renderedPixel);
      } else {
        expect(Math.abs(frame.sceneTopInViewport)).toBeLessThanOrEqual(
          frame.renderedPixel,
        );
      }
      if (context.referenceHeader === "included") {
        expect(frame.headerHeight).toBeGreaterThan(0);
      }

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
        headerTopInViewport: frame.headerTopInViewport,
        requestedScrollY,
        scrollY: frame.scrollY,
        sceneTopInViewport: frame.sceneTopInViewport,
        captureContext: context.viewportOrigin,
        liveHeader: context.liveHeader,
        referenceHeader: context.referenceHeader,
        sha256: sha256(captureBytes),
      });
    }

    writeFileSync(
      captureManifestPath,
      `${JSON.stringify(
        {
          schemaVersion: 1,
          captureMode: "natural-live-viewport-screenshot-with-explicit-origin",
          baselineRendered: false,
          headerReferenceContract:
            "Hero includes its co-located live header. Contacts requests its live scene origin, records the browser's natural end-of-page clamp, and does not inject a header or spacer.",
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
