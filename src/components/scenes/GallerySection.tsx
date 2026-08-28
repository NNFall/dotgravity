import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import type { ReactNode } from "react";

import styles from "./GallerySection.module.css";

type GalleryCropId =
  | "gallery-reference-main-arch"
  | "gallery-reference-inset-porcelain"
  | "gallery-reference-inset-art"
  | "gallery-reference-inset-space"
  | "gallery-reference-inset-card-porcelain"
  | "gallery-reference-inset-card-art"
  | "gallery-reference-inset-card-space"
  | "gallery-reference-cathedral-linework";

function getGalleryCrop(id: GalleryCropId): MediaAsset {
  const crop = mediaManifest.find((asset) => asset.id === id);

  if (
    !crop ||
    crop.provenance.classification !== "reference-derived" ||
    crop.provenance.documentary ||
    !crop.productionAllowance.allowed ||
    !crop.intendedScenes.includes("gallery")
  ) {
    throw new Error(
      `The gallery scene requires the registered bounded reference crop: ${id}.`,
    );
  }

  return crop;
}

const galleryCrops = {
  main: getGalleryCrop("gallery-reference-main-arch"),
  porcelain: getGalleryCrop("gallery-reference-inset-porcelain"),
  art: getGalleryCrop("gallery-reference-inset-art"),
  space: getGalleryCrop("gallery-reference-inset-space"),
  porcelainCard: getGalleryCrop("gallery-reference-inset-card-porcelain"),
  artCard: getGalleryCrop("gallery-reference-inset-card-art"),
  spaceCard: getGalleryCrop("gallery-reference-inset-card-space"),
} as const;

const galleryCathedralArtwork = getGalleryCrop(
  "gallery-reference-cathedral-linework",
);

const referenceGalleryAlt =
  "Референсный фрагмент визуальной концепции галереи, не документальная фотография кафе.";

const storyCrops = [
  {
    asset: galleryCrops.porcelain,
    desktopAsset: galleryCrops.porcelainCard,
    label: "Винтажный мотив",
    className: styles.porcelainInset,
  },
  {
    asset: galleryCrops.art,
    desktopAsset: galleryCrops.artCard,
    label: "Художественный мотив",
    className: styles.artInset,
  },
  {
    asset: galleryCrops.space,
    desktopAsset: galleryCrops.spaceCard,
    label: "Уютное пространство",
    className: styles.spaceInset,
  },
] as const;

function Rosette({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="14.5" stroke="currentColor" />
      <path
        d="M18 6.3c3.56 2.14 4.59 6.38 2.34 9.08L18 18l-2.34-2.62C13.41 12.68 14.44 8.44 18 6.3ZM29.7 18c-2.14 3.56-6.38 4.59-9.08 2.34L18 18l2.62-2.34c2.7-2.25 6.94-1.22 9.08 2.34ZM18 29.7c-3.56-2.14-4.59-6.38-2.34-9.08L18 18l2.34 2.62c2.25 2.7 1.22 6.94-2.34 9.08ZM6.3 18c2.14-3.56 6.38-4.59 9.08-2.34L18 18l-2.62 2.34C12.68 22.59 8.44 21.56 6.3 18Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" fill="currentColor" r="2.35" />
    </svg>
  );
}

function Spark() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.8c.7 8.68 3.52 11.5 12.2 12.2C17.52 14.7 14.7 17.52 14 26.2 13.3 17.52 10.48 14.7 1.8 14 10.48 13.3 13.3 10.48 14 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CathedralLinework() {
  return (
    <svg
      aria-hidden="true"
      className={styles.cathedralVector}
      fill="none"
      focusable="false"
      viewBox="0 0 180 535"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M8 530h164M22 530V291h136v239M43 291V208h94v83M59 208v-81L90 35l31 92v81M48 145 20 62l9 146m83-63 28-83-9 146M22 291h21m94 0h21M30 324h120M45 530V391h24v139m42 0V391h24v139M77 530V322h26v208"
          strokeWidth="1.15"
        />
        <path
          d="M51 291 43 267l17 24 15-24 15 24 15-24 17 24 15-24 17 24M71 127h38M90 35V12m0 23 8 9m-8-9-8 9M36 202l-12-22m120 22 12-22M45 355h35m55 0h-35M57 424H45m25 0H58m52 0H98m25 0h-12"
          strokeWidth="0.95"
        />
        <path
          d="M2 530c32-28 60-42 88-42 32 0 60 13 88 42M17 530c27-16 52-24 73-24 25 0 50 8 73 24"
          strokeWidth="0.85"
        />
      </g>
    </svg>
  );
}

function ReferenceCathedralLinework() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt=""
      aria-hidden="true"
      className={styles.cathedralReference}
      data-gallery-decoration="cathedral"
      data-provenance={galleryCathedralArtwork.provenance.classification}
      decoding="async"
      height={galleryCathedralArtwork.dimensions.height}
      src={galleryCathedralArtwork.path}
      width={galleryCathedralArtwork.dimensions.width}
    />
  );
}

function CupIcon() {
  return (
    <svg
      aria-hidden="true"
      data-feature-icon="cup"
      fill="none"
      focusable="false"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 20h27v7.2c0 6.2-5 11.3-11.3 11.3h-4.4C14 38.5 9 33.4 9 27.2V20Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.35" />
      <path d="M36 23h4.2c3.8 0 5.8 2.8 5.8 5.7s-2 5.7-5.8 5.7H36M5 41h36M17 14c0-2.8 2.8-3.2 2.8-6M25 14c0-2.8 2.8-3.2 2.8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  );
}

function EaselIcon() {
  return (
    <svg
      aria-hidden="true"
      data-feature-icon="easel"
      fill="none"
      focusable="false"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="21" rx="1" stroke="currentColor" strokeWidth="1.35" width="25" x="11.5" y="8" />
      <path d="m13 29-6 13m28-13 6 13M24 29v13M17 23l5-5 4 3 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
      <path d="M24 4v4M21 4h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" />
    </svg>
  );
}

function ChairIcon() {
  return (
    <svg
      aria-hidden="true"
      data-feature-icon="chair"
      fill="none"
      focusable="false"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 18.5c0-3.6 2.3-5.5 5.4-5.5h8.2c3.1 0 5.4 1.9 5.4 5.5v8.7H15v-8.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.35" />
      <path d="M11 27.2h26v5.1c0 2.3-1.8 4.2-4.2 4.2H15.2c-2.3 0-4.2-1.8-4.2-4.2v-5.1ZM15 36.5v5.2m18-5.2v5.2M11 22.5H7.5v9.8m29-9.8h4v9.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  );
}

function FeatureMark({ children, icon }: { children: string; icon: ReactNode }) {
  return (
    <li className={styles.featureMark}>
      <span aria-hidden="true" className={styles.featureGlyph}>
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

function GalleryImage({
  asset,
  className,
  desktopAsset,
  label,
}: {
  asset: MediaAsset;
  className?: string;
  desktopAsset?: MediaAsset;
  label: string;
}) {
  return (
    <figure className={className}>
      {/* Each image is a bounded crop from the supplied concept screen; copy, labels and frames remain HTML/CSS. */}
      {desktopAsset ? (
        <picture className={styles.referencePicture}>
          <source
            media="(min-width: 901px)"
            srcSet={desktopAsset.path}
          />
          <img
            alt={referenceGalleryAlt}
            data-provenance={asset.provenance.classification}
            height={asset.dimensions.height}
            src={asset.path}
            width={asset.dimensions.width}
          />
        </picture>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt={referenceGalleryAlt}
          data-provenance={asset.provenance.classification}
          height={asset.dimensions.height}
          src={asset.path}
          width={asset.dimensions.width}
        />
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function GallerySection() {
  return (
    <section
      aria-labelledby="gallery-title"
      className={styles.galleryScene}
      data-scene="gallery"
      id="gallery"
    >
      <div className={styles.composition}>
        <div aria-hidden="true" className={styles.dotField} />
        <div aria-hidden="true" className={styles.cathedralBackdrop}>
          <ReferenceCathedralLinework />
          <CathedralLinework />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <Rosette />
            <span>Галерея</span>
            <i />
            <Rosette />
          </p>
          <h2 id="gallery-title">
            Искусство,
            <br /> посуда и
            <br /> атмосфера
          </h2>
          <p className={styles.introduction}>
            Винтажные детали, художественные мотивы и уютное пространство
            создают особую атмосферу — тёплую, вдохновляющую и располагающую к
            неспешным встречам.
          </p>

          <details
            aria-label="Подробнее о визуальной композиции"
            className={styles.storyDetails}
          >
            <summary>Посмотреть галерею</summary>
            <p>
              Это референсный фрагмент концепции, использованный только для
              визуального направления; он не подтверждает фактический
              интерьер кафе.
            </p>
          </details>

          <ul aria-label="Темы галереи" className={styles.featureList}>
            <FeatureMark icon={<CupIcon />}>Винтажный мотив</FeatureMark>
            <FeatureMark icon={<EaselIcon />}>Художественный мотив</FeatureMark>
            <FeatureMark icon={<ChairIcon />}>Уютное пространство</FeatureMark>
          </ul>

          <p className={styles.motto}>
            <span />
            <Spark />
            <b>Вдохновляемся красотой, делимся теплом.</b>
            <span />
          </p>
        </div>

        <GalleryImage
          asset={galleryCrops.main}
          className={styles.mainPhoto}
          label="Интерьер как визуальная композиция"
        />

        <div aria-label="Фрагменты визуальной композиции" className={styles.insetRail}>
          {storyCrops.map((crop) => (
            <GalleryImage
              asset={crop.asset}
              className={`${styles.inset} ${crop.className}`}
              desktopAsset={crop.desktopAsset}
              key={crop.label}
              label={crop.label}
            />
          ))}
        </div>

        <aside className={styles.provenanceNote}>
          <Rosette />
          <span>Фрагменты референсной концепции</span>
          <small>не документальная фотография места</small>
        </aside>
      </div>
    </section>
  );
}
