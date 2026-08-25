export type SceneId =
  | "hero"
  | "about"
  | "menu"
  | "gallery"
  | "souvenirs"
  | "contacts";

const defineReferenceViewports = <
  const T extends readonly {
    id: `${number}x${number}`;
    width: number;
    height: number;
    rawComparedPixels: number;
    baselineStatus: "supplied" | "required";
  }[],
>(viewports: T) => viewports;

export const referenceViewports = defineReferenceViewports([
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
] as const);

export type ReferenceViewport = (typeof referenceViewports)[number];
export type ReferenceViewportId = ReferenceViewport["id"];
export type SuppliedReferenceViewport = Extract<
  ReferenceViewport,
  { baselineStatus: "supplied" }
>;

export interface RawZeroMismatchContract {
  maxMismatchPixels: 0;
  maxMismatchRatio: 0;
  channelThreshold: 0;
}

export interface ReferenceCase extends RawZeroMismatchContract {
  sceneId: SceneId;
  selector: `[data-scene="${SceneId}"]`;
  referencePath: `tests/visual/baselines/${SuppliedReferenceViewport["id"]}/${SceneId}.png`;
  viewportId: SuppliedReferenceViewport["id"];
  width: SuppliedReferenceViewport["width"];
  height: SuppliedReferenceViewport["height"];
  rawComparedPixels: SuppliedReferenceViewport["rawComparedPixels"];
}

export const strictRawZeroMismatchContract = {
  maxMismatchPixels: 0,
  maxMismatchRatio: 0,
  channelThreshold: 0,
} as const satisfies RawZeroMismatchContract;

const suppliedReferenceViewport = referenceViewports.find(
  (viewport): viewport is SuppliedReferenceViewport =>
    viewport.baselineStatus === "supplied",
);

if (!suppliedReferenceViewport) {
  throw new Error("A supplied visual reference viewport is required.");
}

const referenceCase = (sceneId: SceneId): ReferenceCase => ({
  sceneId,
  selector: `[data-scene="${sceneId}"]`,
  referencePath: `tests/visual/baselines/${suppliedReferenceViewport.id}/${sceneId}.png`,
  viewportId: suppliedReferenceViewport.id,
  width: suppliedReferenceViewport.width,
  height: suppliedReferenceViewport.height,
  rawComparedPixels: suppliedReferenceViewport.rawComparedPixels,
  ...strictRawZeroMismatchContract,
});

export const referenceAtlas: readonly ReferenceCase[] = [
  referenceCase("hero"),
  referenceCase("about"),
  referenceCase("menu"),
  referenceCase("gallery"),
  referenceCase("souvenirs"),
  referenceCase("contacts"),
];
