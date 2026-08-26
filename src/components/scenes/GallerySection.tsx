import type { CSSProperties } from "react";

import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";

import styles from "./GallerySection.module.css";

function getGalleryArtwork(): MediaAsset {
  const artwork = mediaManifest.find(
    (asset) => asset.id === "gallery-arched-interior",
  );

  if (
    !artwork ||
    artwork.provenance.classification !==
      "generated/reference-compatible" ||
    artwork.provenance.documentary
  ) {
    throw new Error(
      "The gallery scene requires the registered non-documentary generated interior artwork.",
    );
  }

  return artwork;
}

const galleryArtwork = getGalleryArtwork();

const generatedGalleryAlt =
  "Сгенерированный визуальный образ арочного интерьера с искусством и посудой, не документальная фотография кафе.";

const storyCrops = [
  {
    label: "Винтажная посуда",
    position: "94% 57%",
    className: styles.porcelainInset,
  },
  {
    label: "Картины современных художников",
    position: "47% 52%",
    className: styles.artInset,
  },
  {
    label: "Уютное пространство",
    position: "18% 69%",
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

function FeatureMark({ children }: { children: string }) {
  return (
    <li className={styles.featureMark}>
      <span aria-hidden="true" className={styles.featureGlyph}>
        <Rosette />
      </span>
      <span>{children}</span>
    </li>
  );
}

function GalleryImage({
  className,
  label,
  objectPosition,
}: {
  className?: string;
  label: string;
  objectPosition: string;
}) {
  return (
    <figure className={className}>
      {/* The same bounded generated asset receives intentional editorial crops. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={generatedGalleryAlt}
        data-provenance={galleryArtwork.provenance.classification}
        height={galleryArtwork.dimensions.height}
        src={galleryArtwork.path}
        style={{ objectPosition } as CSSProperties}
        width={galleryArtwork.dimensions.width}
      />
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
            Каждый уголок хранит историю: коллекция винтажной посуды, картины
            современных художников и продуманные детали интерьера создают
            особую атмосферу — тёплую, вдохновляющую и располагающую к
            неспешным встречам.
          </p>

          <details
            aria-label="Подробнее о визуальной композиции"
            className={styles.storyDetails}
          >
            <summary>Посмотреть детали</summary>
            <p>
              Это иллюстративное изображение, созданное для композиции сайта;
              оно не подтверждает фактический интерьер кафе.
            </p>
          </details>

          <ul aria-label="Темы галереи" className={styles.featureList}>
            <FeatureMark>Винтажная посуда</FeatureMark>
            <FeatureMark>Картины современных художников</FeatureMark>
            <FeatureMark>Уютное пространство</FeatureMark>
          </ul>

          <p className={styles.motto}>
            <span />
            <Spark />
            <b>Вдохновляемся красотой, делимся теплом.</b>
            <span />
          </p>
        </div>

        <GalleryImage
          className={styles.mainPhoto}
          label="Интерьер как визуальная композиция"
          objectPosition="50% 51%"
        />

        <div aria-label="Фрагменты визуальной композиции" className={styles.insetRail}>
          {storyCrops.map((crop) => (
            <GalleryImage
              className={`${styles.inset} ${crop.className}`}
              key={crop.label}
              label={crop.label}
              objectPosition={crop.position}
            />
          ))}
        </div>

        <aside className={styles.provenanceNote}>
          <Rosette />
          <span>Сгенерированная визуальная композиция</span>
          <small>не документальная фотография места</small>
        </aside>
      </div>
    </section>
  );
}
