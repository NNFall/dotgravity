import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import { BrandMark } from "./BrandMark";
import { CathedralOrnament } from "./CathedralOrnament";
import { PhosphorIcon } from "./PhosphorIcon";
import styles from "./HeroSection.module.css";

const heroMedia = (() => {
  const registeredHero = mediaManifest.find(
    (asset) => asset.id === "hero-window-church",
  );

  if (!registeredHero) {
    throw new Error("The registered hero media is required to render the hero scene.");
  }

  return registeredHero;
})();

const heroReferenceMedia = (() => {
  const registeredHeroReference = mediaManifest.find(
    (asset) => asset.id === "hero-reference-photo",
  );

  if (!registeredHeroReference) {
    throw new Error(
      "The bounded reference-derived hero media is required to render the hero scene.",
    );
  }

  return registeredHeroReference;
})();

function getHeroImageAlt() {
  return heroMedia.provenance.classification ===
    "generated/reference-compatible"
    ? "Сгенерированный визуальный образ: чашка кофе у окна с видом на костёл"
    : "Визуальный образ кофейной композиции у окна";
}

type HeroReferenceFeatureKey = "coffee" | "art" | "gift" | "cathedral";

function getHeroReferenceFeatureIcon(
  key: HeroReferenceFeatureKey,
): MediaAsset {
  const asset = mediaManifest.find(
    (candidate) => candidate.id === `hero-reference-feature-${key}`,
  );

  if (!asset) {
    throw new Error(
      `The bounded hero reference feature icon is required: ${key}.`,
    );
  }

  return asset;
}

const heroReferenceFeatureIcons = {
  coffee: getHeroReferenceFeatureIcon("coffee"),
  art: getHeroReferenceFeatureIcon("art"),
  gift: getHeroReferenceFeatureIcon("gift"),
  cathedral: getHeroReferenceFeatureIcon("cathedral"),
} as const;

function HeroFeature({
  children,
  iconName,
  referenceIcon,
}: {
  children: string;
  iconName: "coffee" | "image" | "gift" | "church";
  referenceIcon: MediaAsset;
}) {
  const referenceIconKey = referenceIcon.id.replace(
    "hero-reference-feature-",
    "",
  );

  return (
    <li>
      <PhosphorIcon
        aria-hidden="true"
        className="hero-feature-live-icon"
        name={iconName}
        size={49}
        weight="light"
      />
      {/* The desktop crop is an icon-only bounded reference asset; mobile keeps the live SVG. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={`hero-reference-icon hero-reference-icon--${referenceIconKey}`}
        data-provenance={referenceIcon.provenance.classification}
        data-reference-crop="hero-feature"
        decoding="async"
        height={referenceIcon.dimensions.height}
        src={referenceIcon.path}
        width={referenceIcon.dimensions.width}
      />
      <span>{children}</span>
    </li>
  );
}

function HeroFeatureList() {
  return (
    <ul aria-label="Что можно найти в Точке притяжения" className="hero-features">
      <HeroFeature
        iconName="coffee"
        referenceIcon={heroReferenceFeatureIcons.coffee}
      >
        Ароматный кофе и какао
      </HeroFeature>
      <HeroFeature
        iconName="image"
        referenceIcon={heroReferenceFeatureIcons.art}
      >
        Искусство и атмосфера
      </HeroFeature>
      <HeroFeature
        iconName="gift"
        referenceIcon={heroReferenceFeatureIcons.gift}
      >
        Сувенирные идеи
      </HeroFeature>
      <HeroFeature
        iconName="church"
        referenceIcon={heroReferenceFeatureIcons.cathedral}
      >
        Исторический мотив
      </HeroFeature>
    </ul>
  );
}

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero-scene" data-scene="hero" id="hero">
      <div aria-hidden="true" className="hero-dots" />
      <div aria-hidden="true" className="hero-curves">
        <span />
        <span />
        <span />
        <span />
      </div>
      <CathedralOrnament />

      <div className="hero-copy">
        <h1 aria-label="ТОЧКА ПРИТЯЖЕНИЯ" id="hero-title">
          <span>Точка</span>
          <span>притяжения</span>
        </h1>
        <div aria-hidden="true" className="hero-heading-ornament">
          <BrandMark />
          <i />
        </div>
        <p className="hero-kicker">Кофе. Искусство. Вдохновение.</p>
        <p className="hero-introduction">
          Место, где встречаются ароматный кофе,
          <br className="hero-introduction__desktop-break" />{" "}
          искусство и история.
          <br className="hero-introduction__desktop-break" />{" "}
          Сувениры и подарки рядом с великолепным
          <br className="hero-introduction__desktop-break" />{" "}
          католическим костёлом Самары.
        </p>
        <p className="hero-mobile-address">
          <PhosphorIcon aria-hidden="true" name="mapPin" size={22} weight="light" />
          Самара, ул. Фрунзе, 130
        </p>
        <a
          aria-label="Позвонить в кафе, чтобы забронировать столик"
          className="primary-cta"
          href="tel:+78462630404"
        >
          <span>Забронировать столик</span>
          <PhosphorIcon aria-hidden="true" name="arrowRight" size={31} weight="light" />
        </a>
        <HeroFeatureList />
      </div>

      <figure className="hero-photo">
        {/* The measured clip-path/mirror treatment requires a native image element. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={getHeroImageAlt()}
          className={styles.generatedPhoto}
          data-provenance={heroMedia.provenance.classification}
          height={heroMedia.dimensions.height}
          src={heroMedia.path}
          width={heroMedia.dimensions.width}
        />
        {/* Keep the measured reference artwork bounded to this desktop photo layer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.referenceCrop}
          data-provenance={heroReferenceMedia.provenance.classification}
          data-reference-crop="desktop"
          height={heroReferenceMedia.dimensions.height}
          src={heroReferenceMedia.path}
          width={heroReferenceMedia.dimensions.width}
        />
        <aside aria-hidden="true" className="hero-photo__brand-window">
          <BrandMark className="hero-photo__brand-mark" />
          <span>Кофе</span>
          <i />
          <span>Искусство</span>
          <i />
          <span>Вдохновение</span>
          <b />
        </aside>
      </figure>

      <p aria-hidden="true" className="hero-motto">
        <span className="hero-motto__mark" />
        Вдохновляемся красотой. Делимся теплом.
      </p>
    </section>
  );
}
