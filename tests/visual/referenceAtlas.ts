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

export interface ReferenceCase<Scene extends SceneId = SceneId>
  extends RawZeroMismatchContract {
  sceneId: Scene;
  selector: `[data-scene="${Scene}"]`;
  referencePath: `tests/visual/baselines/${SuppliedReferenceViewport["id"]}/${Scene}.png`;
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

const referenceCase = <const Scene extends SceneId>(
  sceneId: Scene,
): ReferenceCase<Scene> => ({
  sceneId,
  selector: `[data-scene="${sceneId}"]`,
  referencePath: `tests/visual/baselines/${suppliedReferenceViewport.id}/${sceneId}.png`,
  viewportId: suppliedReferenceViewport.id,
  width: suppliedReferenceViewport.width,
  height: suppliedReferenceViewport.height,
  rawComparedPixels: suppliedReferenceViewport.rawComparedPixels,
  ...strictRawZeroMismatchContract,
});

type ReferenceAtlasByScene = {
  readonly [Scene in SceneId]: ReferenceCase<Scene>;
};

export const referenceAtlasByScene = {
  hero: referenceCase("hero"),
  about: referenceCase("about"),
  menu: referenceCase("menu"),
  gallery: referenceCase("gallery"),
  souvenirs: referenceCase("souvenirs"),
  contacts: referenceCase("contacts"),
} as const satisfies ReferenceAtlasByScene;

export const referenceAtlas: readonly ReferenceCase[] = Object.values(
  referenceAtlasByScene,
);
