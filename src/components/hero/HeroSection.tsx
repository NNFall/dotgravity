import { mediaManifest } from "../../media/manifest";
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

function HeroFeatureList() {
  return (
    <ul aria-label="Что можно найти в Точке притяжения" className="hero-features">
      <li>
        <PhosphorIcon aria-hidden="true" name="coffee" size={49} weight="light" />
        <span>Ароматный кофе и какао</span>
      </li>
      <li>
        <PhosphorIcon aria-hidden="true" name="image" size={49} weight="light" />
        <span>Искусство и атмосфера</span>
      </li>
      <li>
        <PhosphorIcon aria-hidden="true" name="gift" size={49} weight="light" />
        <span>Сувенирные идеи</span>
      </li>
      <li>
        <PhosphorIcon aria-hidden="true" name="church" size={49} weight="light" />
        <span>Исторический мотив</span>
      </li>
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
          Сувенирные идеи и визуальные детали собраны
          <br className="hero-introduction__desktop-break" />{" "}
          в одной тёплой композиции о Самаре.
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
