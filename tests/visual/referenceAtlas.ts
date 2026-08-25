export type SceneId =
  | "hero"
  | "about"
  | "menu"
  | "gallery"
  | "souvenirs"
  | "contacts";

export type ReferenceViewport =
  | {
      id: "1672x941";
      width: 1672;
      height: 941;
      rawComparedPixels: 1573352;
      baselineStatus: "supplied";
    }
  | {
      id: "1920x1080";
      width: 1920;
      height: 1080;
      rawComparedPixels: 2073600;
      baselineStatus: "required";
    }
  | {
      id: "390x844";
      width: 390;
      height: 844;
      rawComparedPixels: 329160;
      baselineStatus: "required";
    }
  | {
      id: "320x844";
      width: 320;
      height: 844;
      rawComparedPixels: 270080;
      baselineStatus: "required";
    };

export interface RawZeroMismatchContract {
  maxMismatchPixels: 0;
  maxMismatchRatio: 0;
  channelThreshold: 0;
}

export interface ReferenceCase extends RawZeroMismatchContract {
  sceneId: SceneId;
  selector: `[data-scene="${SceneId}"]`;
  referencePath: `tests/visual/baselines/1672x941/${SceneId}.png`;
  viewportId: "1672x941";
  width: 1672;
  height: 941;
  rawComparedPixels: 1573352;
}

export const referenceViewports = [
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
] as const satisfies readonly ReferenceViewport[];

export const strictRawZeroMismatchContract = {
  maxMismatchPixels: 0,
  maxMismatchRatio: 0,
  channelThreshold: 0,
} as const satisfies RawZeroMismatchContract;

const referenceCase = (sceneId: SceneId): ReferenceCase => ({
  sceneId,
  selector: `[data-scene="${sceneId}"]`,
  referencePath: `tests/visual/baselines/1672x941/${sceneId}.png`,
  viewportId: "1672x941",
  width: 1672,
  height: 941,
  rawComparedPixels: 1573352,
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
