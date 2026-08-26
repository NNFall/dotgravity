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
        "Warm cafe-window composition with a church view for the bounded hero or contacts photo region; no readable signage, logos, or real-venue claim.",
      statement:
        "Generated reference-compatible artwork for bounded hero or contacts photo regions only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["hero", "contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "hero or contacts photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded hero or contacts photo region",
      focalPoint: "window frame and church view",
      responsive:
        "Keep the focal area inside bounded hero or contacts crops; never extend it into a full-page reference screen.",
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
    id: "gallery-reference-main-arch",
    path: "/media/reference-derived/gallery-reference-main-arch.png",
    sha256: "94BA58C4D92F03CDB13DB53F70D2BC3749C88CD92EE34C750A0B663055E80172",
    dimensions: {
      width: 582,
      height: 830,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
      transformation:
        "Photo-only rectangle crop x=676,y=52,w=582,h=830 from the supplied 1672x941 gallery concept; captions, inset labels and decorative frames excluded; existing CSS arch mask retained.",
      statement:
        "Bounded crop from the supplied generated gallery concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery main arch photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the bounded gallery arch frame while preserving the existing CSS arch mask",
      focalPoint: "bright cafe interior, stained-glass windows and disco-ball ceiling",
      responsive:
        "Use only inside the bounded gallery main-photo frame; mobile may crop responsively but never expand into a full reference screen.",
    },
  },
  {
    id: "gallery-reference-inset-porcelain",
    path: "/media/reference-derived/gallery-reference-inset-porcelain.png",
    sha256: "B36785C20DC1AC4A0B3A280BD4172CCD95340CA8EB4FAD0D3779E73AE903B7F8",
    dimensions: {
      width: 198,
      height: 208,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
      transformation:
        "Photo-only rectangle crop x=1284,y=136,w=198,h=208 from the supplied gallery concept; adjacent caption badge and frame strokes excluded.",
      statement:
        "Bounded crop from the supplied generated gallery concept for visual reference only; it is not documentary venue evidence.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery porcelain inset photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "contain within the existing rounded inset frame",
      focalPoint: "blue-and-white vintage porcelain cup and saucer",
      responsive:
        "Keep the cup inside the inset card; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "gallery-reference-inset-art",
    path: "/media/reference-derived/gallery-reference-inset-art.png",
    sha256: "70922E76598E3E2C37F7392C738DB5661BD5B7342F94A249FD42427E6DCE1C1F",
    dimensions: {
      width: 198,
      height: 195,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
      transformation:
        "Photo-only rectangle crop x=1284,y=395,w=198,h=195 from the supplied gallery concept; adjacent caption badge and frame strokes excluded.",
      statement:
        "Bounded crop from the supplied generated gallery concept for visual reference only; it is not documentary venue evidence.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery artwork inset photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "contain within the existing rounded inset frame",
      focalPoint: "floral artwork and small ceramic figure",
      responsive:
        "Keep the artwork inside the inset card; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "gallery-reference-inset-space",
    path: "/media/reference-derived/gallery-reference-inset-space.png",
    sha256: "66B3FC1702FF7857B98656E1BB5079B37A5AC78421B6BBBB0FC2CF5C311D9BC6",
    dimensions: {
      width: 198,
      height: 198,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
      transformation:
        "Photo-only rectangle crop x=1284,y=647,w=198,h=198 from the supplied gallery concept; adjacent caption badge and frame strokes excluded.",
      statement:
        "Bounded crop from the supplied generated gallery concept for visual reference only; it is not documentary venue evidence.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery space inset photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "contain within the existing rounded inset frame",
      focalPoint: "windowed seating area and warm gallery interior",
      responsive:
        "Keep the seating area inside the inset card; never render the crop as a standalone reference screen.",
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
  {
    id: "souvenir-rose-quartz-bracelet-source",
    path: "/media/generated/souvenir-rose-quartz-bracelet-source.png",
    sha256: "4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653",
    dimensions: {
      width: 1254,
      height: 1254,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Isolated pink rose-quartz-style bracelet with gold-tone accents on a pale background, with no real-product or real-venue claim.",
      statement:
        "Generated source artwork retained only as the parent input for a bounded bracelet cutout; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: false,
      intendedUse: "source-only input for the bracelet cutout",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "source-only; do not render in production",
      focalPoint: "pink bracelet with gold-tone clasp",
      responsive:
        "Never render this source file in a production scene; use its registered transparent derivative instead.",
    },
  },
  {
    id: "souvenir-rose-quartz-bracelet-cutout",
    path: "/media/generated/souvenir-rose-quartz-bracelet-cutout.png",
    sha256: "65AA3C2AA0AB04DFBFC393856A357328134490467437D5F49702F61ECA69229D",
    dimensions: {
      width: 1254,
      height: 1254,
    },
    provenance: {
      classification: "generated/reference-compatible",
      documentary: false,
      createdAt: "2026-08-26",
      createdWith: "Image Generation",
      promptSummary:
        "Transparent cutout of the registered generated pink rose-quartz-style bracelet, with no real-product or real-venue claim.",
      statement:
        "Generated reference-compatible bracelet artwork with a locally removed background for the bounded souvenirs product cutout only; it is not a documentary venue photograph and must not be presented as one.",
      derivation: {
        parentAssetId: "souvenir-rose-quartz-bracelet-source",
        parentSha256:
          "4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653",
        method: "Remove Background Local",
        aggressiveness: "0.30",
        checkerPreviewReviewed: true,
      },
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs product cutout only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "contain bounded product cutout",
      focalPoint: "pink bracelet with gold-tone clasp",
      responsive:
        "Keep the full bracelet silhouette within its bounded product card; never extend it into a full-page reference screen.",
    },
  },
  {
    id: "contacts-brick-street",
    path: "/media/generated/contacts-brick-street.png",
    sha256: "A53AB8414DC021C3EAB7E488569D81F033701BA7888C92C2230B36C66BABCB82",
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
        "Dusk brick street with a church-like tower, warm cafe-like windows, flower planters, and no real-venue claim or readable signage.",
      statement:
        "Generated reference-compatible artwork for the bounded contacts photo region only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts photo region only",
      referenceShape: "not-reference",
    },
    cropRules: {
      strategy: "cover bounded contacts photo region",
      focalPoint: "brick street, tower, and warm window facade",
      responsive:
        "Keep the street and warm facade inside the bounded contacts crop; never extend it into a full-page reference screen.",
    },
  },
];
