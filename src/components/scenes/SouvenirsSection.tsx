import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";

import styles from "./SouvenirsSection.module.css";

type SouvenirReferenceCropId =
  | "souvenirs-reference-main-photo"
  | "souvenirs-reference-bracelet"
  | "souvenirs-reference-ring"
  | "souvenirs-reference-teacup"
  | "souvenirs-reference-tea-set";

function getReferenceSouvenirCrop(id: SouvenirReferenceCropId): MediaAsset {
  const crop = mediaManifest.find((asset) => asset.id === id);

  if (
    !crop ||
    crop.provenance.classification !== "reference-derived" ||
    crop.provenance.documentary ||
    !crop.productionAllowance.allowed ||
    crop.productionAllowance.referenceShape !== "bounded-reference-region" ||
    !crop.intendedScenes.includes("souvenirs")
  ) {
    throw new Error(
      `The souvenirs scene requires the registered bounded reference crop: ${id}.`,
    );
  }

  return crop;
}

const souvenirCrops = {
  main: getReferenceSouvenirCrop("souvenirs-reference-main-photo"),
  bracelet: getReferenceSouvenirCrop("souvenirs-reference-bracelet"),
  ring: getReferenceSouvenirCrop("souvenirs-reference-ring"),
  teacup: getReferenceSouvenirCrop("souvenirs-reference-teacup"),
  teaSet: getReferenceSouvenirCrop("souvenirs-reference-tea-set"),
} as const;

const referenceSouvenirAlt =
  "Референсный фрагмент визуальной концепции сувениров, не документальная фотография кафе.";

const stories = [
  {
    artwork: souvenirCrops.bracelet,
    description: "Нежный браслет с мягким каменным оттенком и металлической деталью.",
    label: "Браслет",
    title: "«РОЗОВЫЙ КВАРЦ»",
  },
  {
    artwork: souvenirCrops.ring,
    description: "Изящное кольцо в винтажном стиле. Иллюстративный мотив.",
    label: "Кольцо",
    title: "«УЗОР ВРЕМЕНИ»",
  },
  {
    artwork: souvenirCrops.teacup,
    description: "Чайная пара с цветочным узором. Иллюстративный мотив.",
    label: "Чайная пара",
    title: "HEREND",
  },
  {
    artwork: souvenirCrops.teaSet,
    description: "Фарфоровый комплект с классическим узором. Иллюстративный мотив.",
    label: "Винтажное трио",
    title: "ЧАЙНЫЙ НАБОР",
  },
] as const;

function FloralSeal({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22" cy="22" r="20.2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M22 13.1c2.7 3.25 3.68 5.85 0 8.96-3.67-3.11-2.7-5.7 0-8.96Zm0 17.8c-2.7-3.25-3.67-5.85 0-8.96 3.68 3.11 2.7 5.71 0 8.96Zm-8.9-8.9c3.25-2.7 5.85-3.68 8.96 0-3.11 3.67-5.7 2.7-8.96 0Zm17.8 0c-3.25 2.7-5.85 3.67-8.96 0 3.11-3.68 5.71-2.7 8.96 0Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="m15.67 15.67 12.66 12.66m0-12.66L15.67 28.33"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle cx="22" cy="22" fill="currentColor" r="2.7" />
    </svg>
  );
}

function CopperBloom({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 14.18c-3.4-6.42-2.65-10.9.54-12.88 2.6 1.88 4.22 6.18-.54 12.88Zm.12.05c-6.48-3.42-10.99-2.66-12.97.53 1.89 2.6 6.18 4.22 12.97-.53Zm-.05.12c-3.4 6.42-2.65 10.9.54 12.88 2.6-1.88 4.22-6.18-.54-12.88Zm-.12-.05c6.48 3.42 10.99 2.66 12.97-.53-1.89-2.6-6.18-4.22-12.97.53Z" />
      <circle cx="16" cy="14.3" r="2.8" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="m7 17 7.1-8h19.8l7.1 8L24 40 7 17Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
      <path d="m7 17 17 23 17-23m-26.9 0L24 40l9.9-23M14.1 9 24 17l9.9-8" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect height="25" rx="1.5" stroke="currentColor" strokeWidth="1.55" width="31" x="8.5" y="15" />
      <path d="M24 15v25M7 21h34" stroke="currentColor" strokeWidth="1.55" />
      <path d="M24 15c-9.5 0-10.25-8.75-5.2-10.15 3.76-1.04 5.2 4.25 5.2 10.15Zm0 0c9.5 0 10.25-8.75 5.2-10.15C25.44 3.81 24 9.1 24 15Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="m8 16 8.3 8.7L24 10l7.7 14.7L40 16l-4.1 20H12.1L8 16Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
      <path d="M12.1 40h23.8M24 5v3m-14.2 3.6 2.1 2.1m26.3-2.1-2.1 2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 33.1c3.1-1.8 5.9-4.2 8.1-7.1l3.2-4.1c1.4-1.8 4.2-.3 3.6 1.9l-1.2 4.6 6-9.2c1.5-2.3 4.8-.2 3.4 2.1l-3.1 5.1 5.1-6.2c1.8-2.1 4.8.4 3.1 2.6l-4 5.3 4.4-3.7c2.2-1.8 4.6 1.1 2.6 2.8l-8.2 7.1c-2.4 2.1-5.5 3.2-8.7 3.2H7v-4.4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M30.4 10.5c3.4-2.2 6.8-.3 6.8 2.5 0 3.3-4.3 4.8-6.8 7.4-2.5-2.6-6.8-4.1-6.8-7.4 0-2.8 3.4-4.7 6.8-2.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function CathedralLinework() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 164 540"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 525h132M29 525V269h106v256M43 269V183h78v86M58 183V94l24-70 24 70v89M53 319h58m-47 47h36m-36 44h36m-36 44h36m-36 44h36M28 525V371h22v154m64 0V371h22v154M69 525V303h26v222M82 24V6m0 18 7 9m-7-9-7 9" strokeWidth="1.25" />
        <path d="M43 269 57 245l13 24 12-24 12 24 13-24 14 24M60 94 42 46l6 137m56-89 18-48-6 137M16 525c38-33 70-49 66-49 44 0 76 15 66 49M30 525c32-19 50-28 52-28 29 0 51 9 52 28" strokeWidth="0.95" />
      </g>
    </svg>
  );
}

function ArrowMark() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M.7 7h25m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function StoryIcon({ index }: { index: number }) {
  const icon = [<GemIcon key="gem" />, <GiftIcon key="gift" />, <CrownIcon key="crown" />, <HandIcon key="hand" />][index];

  return <span className={styles.storyIcon}>{icon}</span>;
}

export function SouvenirsSection() {
  return (
    <section
      aria-labelledby="souvenirs-title"
      className={styles.section}
      data-scene="souvenirs"
      id="souvenirs"
    >
      <div className={styles.composition}>
        <div aria-hidden="true" className={styles.topographicLines} />
        <div aria-hidden="true" className={styles.dotField} />
        <div aria-hidden="true" className={styles.cathedral}>
          <CathedralLinework />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <FloralSeal />
            <span>Сувениры</span>
            <CopperBloom />
            <i />
          </p>
          <h2 id="souvenirs-title">
            ПОДАРКИ, УКРАШЕНИЯ <span><b>И</b> РЕДКИЕ НАХОДКИ</span>
          </h2>
          <p className={styles.introduction}>
            В «Точке Притяжения» вы найдете больше, чем просто сувениры. Это
            вещи с историей и душой: изящные украшения, фарфор ручной работы,
            винтажные предметы и редкие находки, которые хочется хранить и
            дарить. Это визуальная витрина, а не каталог фактического
            ассортимента.
          </p>

          <div aria-label="Причины выбрать памятный подарок" className={styles.motifs}>
            <div>
              <GemIcon />
              <span>Уникальные позиции</span>
            </div>
            <div>
              <GiftIcon />
              <span>Подарки со смыслом</span>
            </div>
            <div>
              <CrownIcon />
              <span>Коллекционные находки</span>
            </div>
            <div>
              <HandIcon />
              <span>Внимание к деталям</span>
            </div>
          </div>

          <a className={styles.cta} href="#contacts">
            <span>Уточнить наличие в кафе</span>
            <ArrowMark />
          </a>
        </div>

        <figure className={styles.mainArtwork}>
          {/* This registered crop is deliberately bounded to the photo region. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={referenceSouvenirAlt}
            data-provenance={souvenirCrops.main.provenance.classification}
            height={souvenirCrops.main.dimensions.height}
            src={souvenirCrops.main.path}
            width={souvenirCrops.main.dimensions.width}
          />
          <figcaption>Фрагмент референсной концепции</figcaption>
        </figure>

        <aside className={styles.provenanceNote}>
          <FloralSeal />
          <span>Фрагменты референсной концепции</span>
          <small>не документальная фотография места</small>
        </aside>

        <ul aria-label="Иллюстративные сувенирные мотивы" className={styles.storyRail}>
          {stories.map((story, index) => (
            <li className={styles.storyCard} key={story.title}>
              <article>
                <div className={styles.storyVisual}>
                  {/* Copy, borders and decorative overlays stay in HTML/CSS around this bounded crop. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={referenceSouvenirAlt}
                    data-provenance={story.artwork.provenance.classification}
                    height={story.artwork.dimensions.height}
                    src={story.artwork.path}
                    width={story.artwork.dimensions.width}
                  />
                </div>
                <div className={styles.storyContent}>
                  <StoryIcon index={index} />
                  <p>{story.label}</p>
                  <h3>{story.title}</h3>
                  <span className={styles.storyRule} />
                  <small>{story.description}</small>
                  <b>Иллюстративный мотив</b>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className={styles.ribbon}>
          <span />
          <CopperBloom />
          <b>Витрина меняется, уточняйте детали у команды кафе</b>
          <CopperBloom />
          <span />
        </p>
      </div>
    </section>
  );
}
