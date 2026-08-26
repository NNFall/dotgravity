import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

const cloneManifest = () =>
  JSON.parse(JSON.stringify(mediaManifest)) as typeof mediaManifest;

test("registers the bracelet source, its reviewed cutout, and contacts artwork honestly", () => {
  const braceletSource = mediaManifest.find(
    (asset) => asset.id === "souvenir-rose-quartz-bracelet-source",
  );
  const braceletCutout = mediaManifest.find(
    (asset) => asset.id === "souvenir-rose-quartz-bracelet-cutout",
  );
  const contactsArtwork = mediaManifest.find(
    (asset) => asset.id === "contacts-brick-street",
  );

  expect(braceletSource).toMatchObject({
    id: "souvenir-rose-quartz-bracelet-source",
    path: "/media/generated/souvenir-rose-quartz-bracelet-source.png",
    sha256:
      "4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653",
    dimensions: { width: 1254, height: 1254 },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: false,
      intendedUse: "source-only input for the bracelet cutout",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
    },
  });

  expect(braceletCutout).toMatchObject({
    id: "souvenir-rose-quartz-bracelet-cutout",
    path: "/media/generated/souvenir-rose-quartz-bracelet-cutout.png",
    sha256:
      "65AA3C2AA0AB04DFBFC393856A357328134490467437D5F49702F61ECA69229D",
    dimensions: { width: 1254, height: 1254 },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs product cutout only",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      derivation: {
        parentAssetId: "souvenir-rose-quartz-bracelet-source",
        parentSha256:
          "4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653",
        method: "Remove Background Local",
        aggressiveness: "0.30",
        checkerPreviewReviewed: true,
      },
    },
  });

  expect(contactsArtwork).toMatchObject({
    id: "contacts-brick-street",
    path: "/media/generated/contacts-brick-street.png",
    sha256:
      "A53AB8414DC021C3EAB7E488569D81F033701BA7888C92C2230B36C66BABCB82",
    dimensions: { width: 1536, height: 1024 },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts photo region only",
      referenceShape: "not-reference",
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
    },
  });

  expect(braceletCutout?.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(contactsArtwork?.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});

test("rejects a generated cutout whose reviewed derivation chain is falsified", () => {
  const invalidManifest = cloneManifest() as unknown as Array<{
    id: string;
    provenance: { derivation?: { checkerPreviewReviewed?: boolean } };
  }>;
  const braceletCutout = invalidManifest.find(
    (asset) => asset.id === "souvenir-rose-quartz-bracelet-cutout",
  );

  if (!braceletCutout?.provenance.derivation) {
    throw new Error("The bracelet cutout must expose a derivation record.");
  }

  braceletCutout.provenance.derivation.checkerPreviewReviewed = false;

  expect(() =>
    validateMediaManifest(
      invalidManifest as unknown as typeof mediaManifest,
    ),
  ).toThrow(/checkerPreviewReviewed/i);
});
