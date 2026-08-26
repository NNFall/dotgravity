import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

test("registers the gallery arch artwork as bounded non-documentary generated media", () => {
  const galleryArtwork = mediaManifest.find(
    (asset) => asset.id === "gallery-arched-interior",
  );

  expect(galleryArtwork).toMatchObject({
    id: "gallery-arched-interior",
    path: "/media/generated/gallery-arched-interior.png",
    sha256:
      "95CC57209EBA6A9DB4A11E77397D81803FBEB65C829BE6DC6D7EF2F88CEA9F27",
    dimensions: { width: 1536, height: 1024 },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery photo region only",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
    },
  });

  if (
    !galleryArtwork ||
    galleryArtwork.provenance.classification !== "generated/reference-compatible"
  ) {
    throw new Error("The gallery artwork must retain generated provenance.");
  }

  expect(galleryArtwork.provenance.promptSummary).toMatch(/arch|interior/i);
  expect(galleryArtwork.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});

test("registers the souvenir still life as bounded non-documentary generated media", () => {
  const souvenirArtwork = mediaManifest.find(
    (asset) => asset.id === "souvenirs-window-still-life",
  );

  expect(souvenirArtwork).toMatchObject({
    id: "souvenirs-window-still-life",
    path: "/media/generated/souvenirs-window-still-life.png",
    sha256:
      "B3282A1935F124EC54934396AF1A9F75257D2739DB84561850CD25683F1AC7B0",
    dimensions: { width: 1672, height: 941 },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs photo region only",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
    },
  });

  if (
    !souvenirArtwork ||
    souvenirArtwork.provenance.classification !== "generated/reference-compatible"
  ) {
    throw new Error("The souvenir artwork must retain generated provenance.");
  }

  expect(souvenirArtwork.provenance.promptSummary).toMatch(
    /jewelry|porcelain|still life/i,
  );
  expect(souvenirArtwork.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});
