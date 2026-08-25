import { mediaManifest as registeredMediaManifest } from "./registry.mjs";
import { validateMediaManifest } from "./provenance";
import type { MediaManifest } from "./types";

export const mediaManifest: MediaManifest = validateMediaManifest(
  registeredMediaManifest,
);

export { isLocalPublicMediaPath, validateMediaManifest } from "./provenance";
export type {
  CropRules,
  MediaAsset,
  MediaClassification,
  MediaManifest,
  MediaProvenance,
  MediaSceneId,
  ProductionAllowance,
  ProductionReferenceShape,
} from "./types";
