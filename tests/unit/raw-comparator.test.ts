import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { PNG } from "pngjs";

import { comparePngFiles } from "../../scripts/compare-reference.mjs";

const temporaryRoots: string[] = [];

const makeFixtureRoot = () => {
  const root = mkdtempSync(join(tmpdir(), "dotgravity-raw-comparator-"));
  temporaryRoots.push(root);
  return root;
};

const writePng = (
  path: string,
  width: number,
  height: number,
  rgba: readonly number[],
) => {
  const png = new PNG({ height, width });
  png.data.set(rgba);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, PNG.sync.write(png));
};

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe("raw PNG comparator", () => {
  test("reports zero raw deltas for two exact RGBA images", () => {
    const root = makeFixtureRoot();
    const baselinePath = join(root, "baseline.png");
    const candidatePath = join(root, "candidate.png");
    const heatmapPath = join(root, "evidence", "heatmap.png");
    const pixels = [
      4, 8, 15, 16,
      23, 42, 108, 255,
      0, 0, 0, 0,
      255, 254, 253, 252,
    ];

    writePng(baselinePath, 2, 2, pixels);
    writePng(candidatePath, 2, 2, pixels);

    const result = comparePngFiles({
      baselinePath,
      candidatePath,
      heatmapPath,
    });

    expect(result).toMatchObject({
      rawComparedPixels: 4,
      changedPixels: 0,
      changedRatio: 0,
      maxChannelDelta: 0,
      meanChannelDelta: 0,
      boundingBox: null,
      pixelmatchMismatchPixels: 0,
    });
    expect(existsSync(heatmapPath)).toBe(true);
    expect(PNG.sync.read(readFileSync(heatmapPath))).toMatchObject({
      width: 2,
      height: 2,
    });
  });

  test("counts every changed RGBA pixel with its exact bounds and deltas", () => {
    const root = makeFixtureRoot();
    const baselinePath = join(root, "baseline.png");
    const candidatePath = join(root, "candidate.png");
    const heatmapPath = join(root, "evidence", "heatmap.png");
    const baselinePixels = [
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
    ];
    const candidatePixels = [
      0, 0, 0, 255,
      5, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 0,
      0, 0, 0, 255,
      0, 17, 0, 255,
    ];

    writePng(baselinePath, 3, 2, baselinePixels);
    writePng(candidatePath, 3, 2, candidatePixels);

    const result = comparePngFiles({
      baselinePath,
      candidatePath,
      heatmapPath,
    });

    expect(result).toMatchObject({
      rawComparedPixels: 6,
      changedPixels: 3,
      changedRatio: 0.5,
      maxChannelDelta: 255,
      boundingBox: {
        left: 0,
        top: 0,
        right: 2,
        bottom: 1,
        width: 3,
        height: 2,
      },
    });
    expect(result.meanChannelDelta).toBeCloseTo(277 / 24, 12);
    expect(existsSync(heatmapPath)).toBe(true);
  });

  test("refuses to compare PNGs with different dimensions", () => {
    const root = makeFixtureRoot();
    const baselinePath = join(root, "baseline.png");
    const candidatePath = join(root, "candidate.png");

    writePng(baselinePath, 2, 2, new Array(16).fill(0));
    writePng(candidatePath, 1, 2, new Array(8).fill(0));

    expect(() =>
      comparePngFiles({ baselinePath, candidatePath }),
    ).toThrow(/dimensions/i);
  });
});
