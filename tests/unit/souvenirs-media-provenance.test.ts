import { expect, test } from "vitest";

import {
  mediaManifest,
  validateMediaManifest,
} from "../../src/media/manifest";

test("registers five bounded non-documentary souvenirs reference crops", () => {
  const parentReferenceSha256 =
    "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0";
  const expectedCrops = [
    [
      "souvenirs-reference-main-photo",
      "A86165D939862917E61AEBEF2D690C99076804E275C491D3F7E2C24ED6B7A174",
      764,
      512,
      "x=818,y=101,w=764,h=512",
    ],
    [
      "souvenirs-reference-bracelet",
      "7640E3AAECAE82591E8609DB4B3C025C8CB32D38A57849A2EB8C753DFF4F3748",
      212,
      184,
      "x=50,y=674,w=212,h=184",
    ],
    [
      "souvenirs-reference-ring",
      "C5A1EEA39027D9669E2261E59E524B23F5183CC216A2B55978338135CD4F1A97",
      204,
      184,
      "x=462,y=674,w=204,h=184",
    ],
    [
      "souvenirs-reference-teacup",
      "52F7246A42E33A37149367378DA44A7BD7F7001015C46100052072E5CD506D73",
      203,
      184,
      "x=849,y=674,w=203,h=184",
    ],
    [
      "souvenirs-reference-tea-set",
      "D3FB908D377A9373390D80832C4E6A75C7C550EA25992E12EB32168C5C71C800",
      216,
      184,
      "x=1237,y=674,w=216,h=184",
    ],
  ] as const;

  for (const [id, sha256, width, height, crop] of expectedCrops) {
    const artwork = mediaManifest.find((asset) => asset.id === id);

    expect(artwork).toBeDefined();
    if (!artwork) {
      throw new Error(`The bounded souvenirs crop must be registered: ${id}.`);
    }

    expect(artwork).toMatchObject({
      id,
      path: `/media/reference-derived/${id}.png`,
      sha256,
      dimensions: { width, height },
      intendedScenes: ["souvenirs"],
      productionAllowance: {
        allowed: true,
        intendedUse: "souvenirs reference crop photo region only",
        referenceShape: "bounded-reference-region",
      },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256,
        transformation: expect.stringContaining(crop),
      },
    });
    expect(artwork.provenance.statement).toMatch(
      /not documentary venue evidence/i,
    );
  }

  expect(() => validateMediaManifest(mediaManifest)).not.toThrow();
});
