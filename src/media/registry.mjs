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
  {
    id: "about-arch-interior",
    path: "/media/generated/about-arch-interior.png",
    sha256: "5A4BADA813E31DD2877A8306F8A7DF74AFE78316FE722F0889260AAD85114BB0",
    dimensions: {
      width: 1024,
      height: 1536,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Warm cafe-like interior with a tall cream arch, ceramic display, stained-glass church-inspired view, and no real-venue claim or readable signage.",
      statement:
        "Generated reference-compatible artwork for the bounded about photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["about"],
    productionAllowance: {
      allowed: true,
      intendedUse: "about photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded about photo region",
      focalPoint: "tall cream arch and ceramic display",
      responsive:
        "Keep the arch and ceramic display inside the bounded about crop; never extend it into a full-page reference screen.",
    },
  },
  {
    id: "menu-iced-coffee-croissant",
    path: "/media/generated/menu-iced-coffee-croissant.png",
    sha256: "9C17818567C35E022AB248F8B278C63E380754F3182C94ACDF9E0672CDF188FE",
    dimensions: {
      width: 1122,
      height: 1402,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Warm editorial still life with iced coffee, espresso, a croissant, dried citrus, and no real-venue claim or readable signage.",
      statement:
        "Generated reference-compatible artwork for the bounded menu photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded menu photo region",
      focalPoint: "iced coffee glass and croissant",
      responsive:
        "Keep the coffee and croissant inside the bounded menu crop; never extend it into a full-page reference screen.",
    },
  },
  {
    id: "gallery-arched-interior",
    path: "/media/generated/gallery-arched-interior.png",
    sha256: "95CC57209EBA6A9DB4A11E77397D81803FBEB65C829BE6DC6D7EF2F88CEA9F27",
    dimensions: {
      width: 1536,
      height: 1024,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Warm arched cafe-like interior with a stained-glass window, flower artwork, mirrored disco balls, porcelain display, and no real-venue claim or readable signage.",
      statement:
        "Generated reference-compatible artwork for the bounded gallery photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded gallery photo region",
      focalPoint: "stained-glass arch, flower artwork, and porcelain display",
      responsive:
        "Keep the arched window and display inside the bounded gallery crop; never extend it into a full-page reference screen.",
    },
  },
  {
    id: "souvenirs-window-still-life",
    path: "/media/generated/souvenirs-window-still-life.png",
    sha256: "B3282A1935F124EC54934396AF1A9F75257D2739DB84561850CD25683F1AC7B0",
    dimensions: {
      width: 1672,
      height: 941,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Warm window still life with an open jewelry case, porcelain cups, flowers, a candle, framed architecture, and no real-venue claim or readable signage.",
      statement:
        "Generated reference-compatible artwork for the bounded souvenirs photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded souvenirs photo region",
      focalPoint: "open jewelry case and porcelain cups",
      responsive:
        "Keep the jewelry case and porcelain cups inside the bounded souvenirs crop; never extend it into a full-page reference screen.",
    },
  },
];
