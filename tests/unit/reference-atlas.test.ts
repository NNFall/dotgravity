import { describe, expect, test } from "vitest";

import {
  referenceAtlas,
  referenceAtlasByScene,
  referenceViewports,
  strictRawZeroMismatchContract,
} from "../visual/referenceAtlas";

describe("visual reference atlas", () => {
  test("covers every required viewport with an exact pixel count", () => {
    expect(referenceViewports).toEqual([
      {
        id: "1672x941",
        width: 1672,
        height: 941,
        rawComparedPixels: 1573352,
        baselineStatus: "supplied",
      },
      {
        id: "1920x1080",
        width: 1920,
        height: 1080,
        rawComparedPixels: 2073600,
        baselineStatus: "required",
      },
      {
        id: "390x844",
        width: 390,
        height: 844,
        rawComparedPixels: 329160,
        baselineStatus: "required",
      },
      {
        id: "320x844",
        width: 320,
        height: 844,
        rawComparedPixels: 270080,
        baselineStatus: "required",
      },
    ]);

    expect(new Set(referenceViewports.map(({ id }) => id)).size).toBe(
      referenceViewports.length,
    );
    expect(
      referenceViewports.filter(
        ({ baselineStatus }) => baselineStatus === "supplied",
      ),
    ).toHaveLength(1);
    for (const viewport of referenceViewports) {
      expect(viewport.rawComparedPixels).toBe(
        viewport.width * viewport.height,
      );
    }
  });

  test("binds every supplied scene to the strict raw zero-mismatch contract", () => {
    expect(strictRawZeroMismatchContract).toEqual({
      maxMismatchPixels: 0,
      maxMismatchRatio: 0,
      channelThreshold: 0,
    });
    expect(referenceAtlas.map(({ sceneId }) => sceneId)).toEqual([
      "hero",
      "about",
      "menu",
      "gallery",
      "souvenirs",
      "contacts",
    ]);
    expect(Object.keys(referenceAtlasByScene)).toEqual([
      "hero",
      "about",
      "menu",
      "gallery",
      "souvenirs",
      "contacts",
    ]);
    for (const [sceneId, reference] of Object.entries(
      referenceAtlasByScene,
    )) {
      expect(reference.sceneId).toBe(sceneId);
    }

    for (const reference of referenceAtlas) {
      expect(reference.viewportId).toBe("1672x941");
      expect(reference.rawComparedPixels).toBe(1573352);
      expect(reference).toMatchObject(strictRawZeroMismatchContract);
    }
  });
});
