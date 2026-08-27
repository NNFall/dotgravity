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
    id: "hero-reference-photo",
    path: "/media/reference-derived/hero-reference-photo.png",
    sha256:
      "789791B7809699ABDA65EBF2D2AB03A9E2EE2448FB43D12CA24AE0F12FBAC624",
    dimensions: {
      width: 947,
      height: 836,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
      transformation:
        "Photo-only bounded crop x=725,y=105,w=947,h=836 from the supplied hero concept; alpha mask fills the measured diagonal through the crop edges, and deterministic dark-wood inpainting restores the plaque region x=1411..1547,y=131..509 in reference coordinates beneath the live DOM plaque and hairline.",
      statement:
        "Bounded crop from the supplied generated hero concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["hero"],
    productionAllowance: {
      allowed: true,
      intendedUse: "hero reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "fill the bounded desktop hero photo polygon with the masked photo-only crop",
      focalPoint: "cathedral window, flowers, coffee and porcelain shelf",
      responsive:
        "Use only inside the desktop hero photo region; keep the generated fallback on mobile and never expand the crop into a full reference screen.",
    },
  },
  {
    id: "hero-reference-plaque-strip",
    path: "/media/reference-derived/hero-reference-plaque-strip.png",
    sha256:
      "76AC5E8232573A91849487531C5F71E24A776E6A251D4B323B50829D183A7E02",
    dimensions: {
      width: 137,
      height: 379,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
      transformation:
        "Bounded plaque-only ROI crop x=1411,y=131,w=137,h=379 from the supplied hero concept; surrounding hero copy, photo frame and live decorative plaque markup remain outside the strip.",
      statement:
        "Bounded strip from the supplied generated hero concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["hero"],
    productionAllowance: {
      allowed: true,
      intendedUse: "hero reference plaque strip only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "fill the measured desktop hero plaque region with the bounded strip",
      focalPoint: "vertical plaque, rosette, copper lettering and star ornament",
      responsive:
        "Use only as a desktop hero photo overlay; hide it below the desktop breakpoint and never expand it into a full reference screen.",
    },
  },
  {
    id: "hero-reference-cathedral-strip",
    path: "/media/reference-derived/hero-reference-cathedral-strip.png",
    sha256:
      "0383FBE84D2DE6BA71CBD332D260F34C90B3AA72D6318D9FD3D5718CC096760E",
    dimensions: {
      width: 108,
      height: 541,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
      transformation:
        "Bounded cathedral decoration ROI crop x=0,y=400,w=108,h=541 from the supplied hero concept; this narrow paper-backed strip contains only the left cathedral ornament and excludes the live copy, CTA, navigation and photo regions.",
      statement:
        "Bounded decorative strip from the supplied generated hero concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["hero"],
    productionAllowance: {
      allowed: true,
      intendedUse: "hero cathedral decorative crop only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the exact paper-backed cathedral decoration at the desktop hero lower-left edge",
      focalPoint: "fine cathedral linework behind the hero copy rail",
      responsive:
        "Use only inside the desktop hero decoration footprint; hide it below the desktop breakpoint and never expand it into a full reference screen.",
    },
  },
  {
    id: "about-reference-arch",
    path: "/media/reference-derived/about-reference-arch.png",
    sha256:
      "36ED679595E6BC5131328BD579E1873AD745EA8C73635983852F690772A085B5",
    dimensions: {
      width: 797,
      height: 941,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      transformation:
        "Photo-only bounded crop x=17,y=0,w=797,h=941 from the supplied about concept; alpha mask follows the inner arch and removes the location-card region x=1..433,y=676..906 in reference coordinates, while the live frame, card and disclosure remain React/CSS.",
      statement:
        "Bounded crop from the supplied generated about concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["about"],
    productionAllowance: {
      allowed: true,
      intendedUse: "about reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "fill the bounded desktop about arch frame with the masked photo-only crop",
      focalPoint: "arched interior, stained-glass windows and porcelain display",
      responsive:
        "Use only inside the bounded about photo frame; keep the generated fallback on mobile and never expand the crop into a full reference screen.",
    },
  },
  {
    id: "about-reference-cathedral-linework",
    path: "/media/reference-derived/about-reference-cathedral-linework.png",
    sha256:
      "825909493396B1A94D31A496CC28C54EB04C0866FE07831666B6A838A96AEA5E",
    dimensions: {
      width: 112,
      height: 690,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      transformation:
        "Bounded cathedral linework ROI x=1560,y=40,w=112,h=690 from the supplied about concept; dark copy pixels and paper background were removed with a deterministic warm-line alpha extraction, leaving only the desktop edge ornament.",
      statement:
        "Bounded decorative linework from the supplied generated about concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["about"],
    productionAllowance: {
      allowed: true,
      intendedUse: "about cathedral linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded cathedral linework at the measured right edge of the about scene on desktop",
      focalPoint: "fine cathedral illustration behind the about copy rail",
      responsive:
        "Keep the decoration inside the desktop about edge footprint and retain the vector fallback on mobile; never expand it into a full reference screen.",
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
    id: "menu-reference-cappuccino",
    path: "/media/reference-derived/menu-reference-cappuccino.png",
    sha256:
      "881BD0DAE160C87BB9E513D3F5F7E4B732F214BF2833EC9538E50CB0AA41D8D5",
    dimensions: {
      width: 250,
      height: 265,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Photo-only bounded crop x=115,y=349,w=250,h=265 from the supplied menu concept; repeated UI flower badge and clipped card-corner pixels removed, with no text, price or arrow retained.",
      statement:
        "Bounded crop from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "cover the bounded cappuccino card image frame with the photo-only crop",
      focalPoint: "blue-and-white cup and cappuccino foam art",
      responsive:
        "Keep the crop inside the menu card image frame; never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-berry-dessert",
    path: "/media/reference-derived/menu-reference-berry-dessert.png",
    sha256:
      "6F6DD5DF972A41568C20597B7EE26A571F169596F00B49DFFE00CC3E3F12EE68",
    dimensions: {
      width: 250,
      height: 265,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Photo-only bounded crop x=411,y=349,w=250,h=265 from the supplied menu concept; repeated UI flower badge and clipped card-corner pixels removed, with no text, price or arrow retained.",
      statement:
        "Bounded crop from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "cover the bounded berry dessert card image frame with the photo-only crop",
      focalPoint: "ruby berry dessert in a cut-glass tumbler",
      responsive:
        "Keep the crop inside the menu card image frame; never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-pistachio-cake",
    path: "/media/reference-derived/menu-reference-pistachio-cake.png",
    sha256:
      "2DD28E974E27337A21F4A2E1FBD8498D63D4F6052AA70C2E2AF045F3EA927F2F",
    dimensions: {
      width: 250,
      height: 265,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Photo-only bounded crop x=706,y=349,w=250,h=265 from the supplied menu concept; repeated UI flower badge and clipped card-corner pixels removed, with no text, price or arrow retained.",
      statement:
        "Bounded crop from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "cover the bounded pistachio cake card image frame with the photo-only crop",
      focalPoint: "layered pistachio cake with white ceramic and flower",
      responsive:
        "Keep the crop inside the menu card image frame; never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-red-velvet",
    path: "/media/reference-derived/menu-reference-red-velvet.png",
    sha256:
      "C55F076C6A9B96355CA045D9444281D7EE455AF49DC95CB10A76ACEC2C3B793A",
    dimensions: {
      width: 250,
      height: 265,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Photo-only bounded crop x=1001,y=349,w=250,h=265 from the supplied menu concept; repeated UI flower badge and clipped card-corner pixels removed, with no text, price or arrow retained.",
      statement:
        "Bounded crop from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "cover the bounded red velvet card image frame with the photo-only crop",
      focalPoint: "red velvet cake slice on patterned porcelain",
      responsive:
        "Keep the crop inside the menu card image frame; never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-cheesecake",
    path: "/media/reference-derived/menu-reference-cheesecake.png",
    sha256:
      "437F25968CFE07C25006BD3AFC536976C0BD19B538E6417ED39C5C03419BAED9",
    dimensions: {
      width: 250,
      height: 265,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Photo-only bounded crop x=1303,y=349,w=250,h=265 from the supplied menu concept; repeated UI flower badge and clipped card-corner pixels removed, with no text, price or arrow retained.",
      statement:
        "Bounded crop from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "cover the bounded cheesecake card image frame with the photo-only crop",
      focalPoint: "cheesecake slice with blueberries and ceramic pot",
      responsive:
        "Keep the crop inside the menu card image frame; never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-cathedral-linework",
    path: "/media/reference-derived/menu-reference-cathedral-linework.png",
    sha256:
      "A4FACABBAC7D9BBE6334C7F41727D3F83387E976A534F1A9B88759F09257EA15",
    dimensions: {
      width: 176,
      height: 450,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Bounded cathedral linework ROI x=0,y=25,w=176,h=450 from the supplied menu concept; paper background and card overlap were removed with a deterministic alpha extraction, leaving only the decorative linework for the live CSS layer.",
      statement:
        "Bounded decorative linework from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu cathedral linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded linework behind the menu cards on desktop",
      focalPoint: "three-spire cathedral illustration and its fine architectural lines",
      responsive:
        "Keep the decoration behind the menu scene content, scale it down on mobile, and never expand it into a full reference screen.",
    },
  },
  {
    id: "menu-reference-botanical-linework",
    path: "/media/reference-derived/menu-reference-botanical-linework.png",
    sha256:
      "6A96766CB4BFF22AE8123404E1050B71C5F6B8DD0F205020A636A4C8072582D3",
    dimensions: {
      width: 199,
      height: 227,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924",
      transformation:
        "Bounded botanical linework ROI x=1473,y=714,w=199,h=227 from the supplied menu concept; card-border overlap was masked, then a deterministic red-blue chroma alpha extraction (threshold 27, divisor 70, alpha cap 0.72) retained only the decorative linework in a fixed terracotta tone.",
      statement:
        "Bounded decorative botanical linework from the supplied generated menu concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["menu"],
    productionAllowance: {
      allowed: true,
      intendedUse: "menu botanical linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded botanical linework at the lower-right of the menu scene",
      focalPoint: "branch, leaves and berry clusters",
      responsive:
        "Keep the decoration behind the menu scene content, scale it within the lower-right edge on mobile, and never expand it into a full reference screen.",
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
    id: "gallery-reference-cathedral-linework",
    path: "/media/reference-derived/gallery-reference-cathedral-linework.png",
    sha256: "B9DC6C4A466013FAF30C777C1817DDF73AFF4179C2C75EC50A6FAFC813E32AFC",
    dimensions: {
      width: 120,
      height: 665,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5",
      transformation:
        "Bounded cathedral linework ROI x=0,y=250,w=120,h=665 from the supplied gallery concept; paper texture and the adjacent motto rule were removed with a deterministic warm-line alpha extraction, leaving only the live decorative illustration.",
      statement:
        "Bounded decorative linework from the supplied generated gallery concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["gallery"],
    productionAllowance: {
      allowed: true,
      intendedUse: "gallery cathedral linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded linework at the measured left edge of the gallery scene on desktop",
      focalPoint: "three-spire cathedral illustration and its fine architectural lines",
      responsive:
        "Keep the decoration behind the gallery copy on desktop and retain the vector fallback on mobile; never expand it into a full reference screen.",
    },
  },
  {
    id: "souvenirs-reference-main-photo",
    path: "/media/reference-derived/souvenirs-reference-main-photo.png",
    sha256:
      "A86165D939862917E61AEBEF2D690C99076804E275C491D3F7E2C24ED6B7A174",
    dimensions: {
      width: 764,
      height: 512,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Photo-only bounded crop x=818,y=101,w=764,h=512 from the supplied souvenirs concept; outer frame, inset stroke, caption and decorative overlays excluded. Facade signage is baked into the source image content.",
      statement:
        "Bounded crop from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the existing bounded souvenirs main photo frame",
      focalPoint:
        "open jewelry case, porcelain cups, flowers and facade sign inside the photo region",
      responsive:
        "Keep the photo inside the bounded main artwork frame; never render it as a full-page reference screen.",
    },
  },
  {
    id: "souvenirs-reference-bracelet",
    path: "/media/reference-derived/souvenirs-reference-bracelet.png",
    sha256:
      "7640E3AAECAE82591E8609DB4B3C025C8CB32D38A57849A2EB8C753DFF4F3748",
    dimensions: {
      width: 212,
      height: 184,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Photo-only bounded crop x=50,y=674,w=212,h=184 from the supplied souvenirs concept; card border, text panel and decorative overlays excluded.",
      statement:
        "Bounded crop from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the first bounded souvenir card photo region",
      focalPoint: "rose-quartz bracelet on the textile surface",
      responsive:
        "Keep the bracelet inside the first bounded card visual; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "souvenirs-reference-ring",
    path: "/media/reference-derived/souvenirs-reference-ring.png",
    sha256:
      "C5A1EEA39027D9669E2261E59E524B23F5183CC216A2B55978338135CD4F1A97",
    dimensions: {
      width: 204,
      height: 184,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Photo-only bounded crop x=462,y=674,w=204,h=184 from the supplied souvenirs concept; card border, text panel and decorative overlays excluded.",
      statement:
        "Bounded crop from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the second bounded souvenir card photo region",
      focalPoint: "single ring and paper-backed jewelry display",
      responsive:
        "Keep the ring inside the second bounded card visual; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "souvenirs-reference-teacup",
    path: "/media/reference-derived/souvenirs-reference-teacup.png",
    sha256:
      "52F7246A42E33A37149367378DA44A7BD7F7001015C46100052072E5CD506D73",
    dimensions: {
      width: 203,
      height: 184,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Photo-only bounded crop x=849,y=674,w=203,h=184 from the supplied souvenirs concept; card border, text panel and decorative overlays excluded.",
      statement:
        "Bounded crop from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the third bounded souvenir card photo region",
      focalPoint: "porcelain teacup and saucer beside the flowers",
      responsive:
        "Keep the teacup inside the third bounded card visual; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "souvenirs-reference-tea-set",
    path: "/media/reference-derived/souvenirs-reference-tea-set.png",
    sha256:
      "D3FB908D377A9373390D80832C4E6A75C7C550EA25992E12EB32168C5C71C800",
    dimensions: {
      width: 216,
      height: 184,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Photo-only bounded crop x=1237,y=674,w=216,h=184 from the supplied souvenirs concept; card border, text panel and decorative overlays excluded.",
      statement:
        "Bounded crop from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "cover the fourth bounded souvenir card photo region",
      focalPoint: "porcelain tea set and candle-lit table detail",
      responsive:
        "Keep the tea set inside the fourth bounded card visual; never render the crop as a standalone reference screen.",
    },
  },
  {
    id: "souvenirs-reference-cathedral-linework",
    path: "/media/reference-derived/souvenirs-reference-cathedral-linework.png",
    sha256:
      "D1BB9136A76718626B4AEC9D399F5CB4B4A35E7EEA14DF9E451A1E770A59A18C",
    dimensions: {
      width: 95,
      height: 520,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Bounded cathedral linework ROI x=0,y=140,w=95,h=520 from the supplied souvenirs concept; paper background was removed with a deterministic warm-line alpha extraction, leaving only the desktop left-edge ornament.",
      statement:
        "Bounded decorative linework from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs cathedral linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded cathedral linework at the measured left edge of the souvenirs scene on desktop",
      focalPoint: "fine cathedral illustration behind the souvenirs copy rail",
      responsive:
        "Keep the decoration inside the desktop souvenirs edge footprint and retain the vector fallback on mobile; never expand it into a full reference screen.",
    },
  },
  {
    id: "souvenirs-reference-seal-linework",
    path: "/media/reference-derived/souvenirs-reference-seal-linework.png",
    sha256:
      "71703D5F543B93658E258AEC33F7BD34CD4F155ED06ECACC52F4137DF0443E55",
    dimensions: {
      width: 82,
      height: 250,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0",
      transformation:
        "Bounded floral seal ROI x=1590,y=400,w=82,h=250 from the supplied souvenirs concept; adjacent photo pixels and paper background were removed with a deterministic warm-line alpha extraction, leaving only the desktop right-edge ornament.",
      statement:
        "Bounded decorative linework from the supplied generated souvenirs concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["souvenirs"],
    productionAllowance: {
      allowed: true,
      intendedUse: "souvenirs floral seal linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded floral seal at the measured right edge of the souvenirs scene on desktop",
      focalPoint: "partial floral seal and fine circular linework",
      responsive:
        "Keep the decoration inside the desktop souvenirs edge footprint and hide it below the desktop breakpoint; never expand it into a full reference screen.",
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
    id: "contacts-reference-plaque-strip",
    path: "/media/reference-derived/contacts-reference-plaque-strip.png",
    sha256:
      "8A183366677132F156B40C55EED43BED57CBCB275BA5C568B581D4BC94348AD3",
    dimensions: {
      width: 73,
      height: 477,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation:
        "Bounded plaque-only strip crop x=1085,y=106,w=73,h=477 from the supplied contacts concept; the surrounding heading, copy, route panel and street frame remain outside the strip and are rendered by live DOM/CSS.",
      statement:
        "Bounded strip from the supplied generated contacts concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference plaque strip only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "fill the measured desktop contact photo gap with the plaque strip",
      focalPoint: "vertical plaque, dark wood frame and copper ornament",
      responsive:
        "Use only as a desktop contact-photo gap layer; hide it below the desktop breakpoint and never expand it into a full reference screen.",
    },
  },
  {
    id: "contacts-reference-map-crop",
    path: "/media/reference-derived/contacts-reference-map-crop.png",
    sha256:
      "7A027FB903E6071F933CDDC5847FA3E1645D33E633CD11ECE5ADBC8D6BCD46AF",
    dimensions: {
      width: 634,
      height: 312,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation:
        "Bounded map-region crop x=624,y=596,w=634,h=312 from the supplied contacts concept; the outer route-panel frame, sidebar and copy remain live HTML/CSS while the existing decorative SVG route markup stays in the DOM as an accessible structural layer.",
      statement:
        "Bounded map artwork from the supplied generated contacts concept for visual reference only; it is not documentary venue evidence and must not be presented as a real map screenshot.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference map visual only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "fill the measured desktop map drawing region with the bounded crop",
      focalPoint: "street grid, venue rosette, location pin and church marker",
      responsive:
        "Use only inside the desktop route drawing region; hide the reference layer on mobile while the live route panel remains available.",
    },
  },
  {
    id: "contacts-reference-window-crop",
    path: "/media/reference-derived/contacts-reference-window-crop.png",
    sha256:
      "9C339940840CDB19C7690CAB529DD57B77414EDCD3DF23327C4C3124B09DD703",
    dimensions: {
      width: 429,
      height: 477,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation:
        "Photo-only bounded polygon crop x=656,y=106,w=429,h=477 from the supplied contacts concept; left edge follows (790,106) to (656,582), alpha mask removes the heading, outer frame and vertical plaque; no DOM copy retained.",
      statement:
        "Bounded crop from the supplied generated contacts concept for visual reference only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "contain the masked bounded contacts window crop in the desktop photo frame",
      focalPoint: "church view, window mullions, coffee and vase",
      responsive:
        "Keep the masked window photo inside the contacts photo frame; responsive layouts may crop it but never expand it into a full reference screen.",
    },
  },
  {
    id: "contacts-reference-street-crop",
    path: "/media/reference-derived/contacts-reference-street-crop.png",
    sha256:
      "9DF641E07DA51B7361391F4785189201B0EA8445ABDA37C2A663E8FAE8C22F53",
    dimensions: {
      width: 514,
      height: 477,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation:
        "Photo-only bounded rectangle crop x=1158,y=106,w=514,h=477 from the supplied contacts concept; header, cream divider, lower route panel and DOM labels excluded; photographed facade signage remains part of the source crop.",
      statement:
        "Bounded crop from the supplied generated contacts concept for visual reference only; it is not a documentary venue photograph and must not be presented as one.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts reference crop photo region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy: "contain the bounded contacts street crop in the desktop photo frame",
      focalPoint: "brick facade, venue sign and decorated windows",
      responsive:
        "Keep the street facade inside the contacts photo frame; responsive layouts may crop it but never expand it into a full reference screen.",
    },
  },
  {
    id: "contacts-reference-cathedral-linework",
    path: "/media/reference-derived/contacts-reference-cathedral-linework.png",
    sha256:
      "AC2E5872FF4E7ED578198D6F194BB6397E962C560B2BE7C156A16C4EC1BD123D",
    dimensions: {
      width: 95,
      height: 560,
    },
    provenance: {
      classification: "reference-derived",
      documentary: false,
      parentReferenceSha256:
        "DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457",
      transformation:
        "Bounded cathedral linework ROI x=0,y=350,w=95,h=560 from the supplied contacts concept; paper background was removed with a deterministic warm-line alpha extraction, leaving only the desktop left-edge ornament.",
      statement:
        "Bounded decorative linework from the supplied generated contacts concept for visual reference only; it is not documentary venue evidence and must not be presented as a photograph of the cafe.",
    },
    intendedScenes: ["contacts"],
    productionAllowance: {
      allowed: true,
      intendedUse: "contacts cathedral linework region only",
      referenceShape: "bounded-reference-region",
    },
    cropRules: {
      strategy:
        "place the transparent bounded cathedral linework at the measured left edge of the contacts scene on desktop",
      focalPoint: "fine cathedral illustration behind the contacts copy rail",
      responsive:
        "Keep the decoration inside the desktop contacts edge footprint and hide it below the desktop breakpoint; never expand it into a full reference screen.",
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
