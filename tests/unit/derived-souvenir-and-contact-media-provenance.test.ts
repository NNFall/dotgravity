import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

const cloneManifest = () =>
  JSON.parse(JSON.stringify(mediaManifest)) as typeof mediaManifest;

test("registers the bracelet source, its reviewed cutout, and contact crops honestly", () => {
  const braceletSource = mediaManifest.find(
    (asset) => asset.id === "souvenir-rose-quartz-bracelet-source",
  );
  const braceletCutout = mediaManifest.find(
    (asset) => asset.id === "souvenir-rose-quartz-bracelet-cutout",
  );
  const contactsWindowCrop = mediaManifest.find(
    (asset) => asset.id === "contacts-reference-window-crop",
  );
  const contactsStreetCrop = mediaManifest.find(
    (asset) => asset.id === "contacts-reference-street-crop",
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

  expect(contactsWindowCrop).toMatchObject({
    id: "contacts-reference-window-crop",
    path: "/media/reference-derived/contacts-reference-window-crop.png",
    sha256:
      "316287C8908773E9A8BE8F177A9B913CDA2C4FD3C8564F3BA1B7B5E0AD9B0F65",
    dimensions: { width: 429, height: 477 },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation: expect.stringContaining(
        "x=656,y=106,w=429,h=477",
      ),
    },
  });

  expect(contactsStreetCrop).toMatchObject({
    id: "contacts-reference-street-crop",
    path: "/media/reference-derived/contacts-reference-street-crop.png",
    sha256:
      "9DF641E07DA51B7361391F4785189201B0EA8445ABDA37C2A663E8FAE8C22F53",
    dimensions: { width: 514, height: 477 },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation: expect.stringContaining(
        "x=1158,y=106,w=514,h=477",
      ),
    },
  });

  expect(braceletCutout?.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(contactsWindowCrop?.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(contactsStreetCrop?.provenance.statement).toMatch(
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

test("registers the bounded souvenirs eyebrow flower as reference-derived decoration", () => {
  const eyebrowFlower = mediaManifest.find(
    (asset) => asset.id === "souvenirs-reference-eyebrow-flower",
  );

  expect(eyebrowFlower).toMatchObject({
    id: "souvenirs-reference-eyebrow-flower",
    path: "/media/reference-derived/souvenirs-reference-eyebrow-flower.png",
    sha256:
      "972655C0BAF4CD703AC9C4A36EE0ED3188D2A6B1071B084B7DB76D1A1C37A498",
    dimensions: { width: 48, height: 48 },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs eyebrow flower decoration only",
      referenceShape: "bounded-reference-region",
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation: expect.stringContaining(
        "x=108,y=79,w=48,h=48",
      ),
    },
    cropRules: {
      strategy: expect.stringContaining("eyebrow"),
      focalPoint: expect.stringContaining("flower"),
      responsive: expect.stringContaining("desktop"),
    },
  });

  expect(eyebrowFlower?.provenance.statement).toMatch(
    /not a documentary venue photograph/i,
  );
  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});
