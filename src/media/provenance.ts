import {
  isLocalPublicMediaPath as runtimeIsLocalPublicMediaPath,
  validateMediaManifestRuntime,
} from "./runtime-validation.mjs";
import type { MediaManifest } from "./types";

export const isLocalPublicMediaPath = (
  path: unknown,
): path is `/media/${string}` => runtimeIsLocalPublicMediaPath(path);

export const validateMediaManifest = (
  manifest: MediaManifest,
): MediaManifest => validateMediaManifestRuntime(manifest);
