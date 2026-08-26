export type MediaSceneId =
  | "hero"
  | "about"
  | "menu"
  | "gallery"
  | "souvenirs"
  | "contacts";

export type MediaClassification =
  | "documentary"
  | "documentary-derived"
  | "reference-derived"
  | "generated/reference-compatible"
  | "decorative";

export type ProductionReferenceShape =
  | "not-reference"
  | "bounded-reference-region"
  | "full-reference"
  | "reference-composite";

export interface MediaDimensions {
  width: number;
  height: number;
}

export interface CropRules {
  strategy: string;
  focalPoint: string;
  responsive: string;
}

export interface ProductionAllowance {
  allowed: boolean;
  intendedUse: string;
  referenceShape: ProductionReferenceShape;
}

interface BaseProvenance {
  classification: MediaClassification;
  documentary: boolean;
  statement: string;
}

export interface DocumentaryProvenance extends BaseProvenance {
  classification: "documentary";
  documentary: true;
  sourceUrl: string;
  accessedAt: string;
  rightsStatus: "confirmed" | "unconfirmed";
}

export interface DocumentaryDerivedProvenance extends BaseProvenance {
  classification: "documentary-derived";
  documentary: true;
  parentAssetId: string;
  parentSha256: string;
  derivationMethod: string;
}

export interface ReferenceDerivedProvenance extends BaseProvenance {
  classification: "reference-derived";
  documentary: false;
  parentReferenceSha256: string;
  transformation: string;
}

export interface GeneratedMediaDerivation {
  parentAssetId: string;
  parentSha256: string;
  method: "Remove Background Local";
  aggressiveness: "0.30";
  checkerPreviewReviewed: true;
}

export interface GeneratedReferenceCompatibleProvenance
  extends BaseProvenance {
  classification: "generated/reference-compatible";
  documentary: false;
  createdAt: string;
  createdWith: "Image Generation";
  promptSummary: string;
  derivation?: GeneratedMediaDerivation;
}

export interface DecorativeProvenance extends BaseProvenance {
  classification: "decorative";
  documentary: false;
  creationMethod: string;
}

export type MediaProvenance =
  | DocumentaryProvenance
  | DocumentaryDerivedProvenance
  | ReferenceDerivedProvenance
  | GeneratedReferenceCompatibleProvenance
  | DecorativeProvenance;

export interface MediaAsset {
  id: string;
  path: string;
  sha256: string;
  dimensions: MediaDimensions;
  provenance: MediaProvenance;
  intendedScenes: readonly MediaSceneId[];
  productionAllowance: ProductionAllowance;
  cropRules: CropRules;
}

export type MediaManifest = readonly MediaAsset[];
