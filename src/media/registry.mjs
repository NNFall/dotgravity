// @ts-check

/** @typedef {import("./types").MediaManifest} MediaManifest */

/** @type {MediaManifest} */
export const mediaManifest = [
  {
    id: "hero-window-church",
    path: "/media/generated/hero-window-church.png",
    sha256: "7598C48D9E51326F743A8D8E20C2190A4FAEC6454EAABE181EA1262DC2FB0861",
    dimensions: {
      width: 1672,
      height: 941,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-25",
      createdWith: "Image Generation",
      promptSummary:
        "Warm cafe-window composition with a church view for the bounded hero photo region; no readable signage, logos, or real-venue claim.",
      statement:
        "Generated reference-compatible artwork for the hero photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["hero"],
    productionAllowance: {
      allowed: true,
      intendedUse: "hero photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded hero photo region",
      focalPoint: "window frame and church view",
      responsive:
        "Keep the focal area inside the bounded hero crop; never extend it into a full-page reference screen.",
    },
  },
];
