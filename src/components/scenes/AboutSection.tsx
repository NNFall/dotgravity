import { mediaManifest } from "../../media/manifest";

import styles from "./AboutSection.module.css";

const aboutMedia = (() => {
  const registeredAboutArtwork = mediaManifest.find(
    (asset) => asset.id === "about-arch-interior",
  );

  if (!registeredAboutArtwork) {
    throw new Error(
      "The registered about artwork is required to render the about scene.",
    );
  }

  return registeredAboutArtwork;
})();

function getAboutImageAlt() {
  if (aboutMedia.provenance.classification === "generated/reference-compatible") {
    return "Сгенерированный визуальный образ: арочный интерьер с керамикой";
  }

  if (aboutMedia.provenance.classification === "decorative") {
    return "Декоративный визуальный образ интерьера с керамикой";
  }

  return "Визуальный образ интерьера с керамикой";
}

function CopperBloom({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 20.94c-4.16-7.86-3.24-13.35.66-15.77 3.18 2.31 5.15 7.58-.66 15.77Zm.15.06C13.2 16.83 7.66 17.76 5.23 21.66c2.31 3.18 7.59 5.16 15.92-.66Zm-.06.15c-4.16 7.86-3.24 13.35.66 15.77 3.18-2.31 5.15-7.58-.66-15.77Zm-.15-.06c7.95 4.17 13.49 3.24 15.92-.66-2.31-3.18-7.59-5.16-15.92.66Z"
        fill="currentColor"
      />
      <circle cx="21" cy="21" fill="currentColor" r="3.3" />
    </svg>
  );
}

function LineArrow() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 30 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.5 7h27m-6-6 6 6-6 6" stroke="currentColor" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 58 54" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 24h31v12.5c0 7.46-6.04 13.5-13.5 13.5h-4C17.04 50 11 43.96 11 36.5V24Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M42 28h4.5c4.42 0 8 3.58 8 8s-3.58 8-8 8H42" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 54h39M16 20c-2.96-3.52-.8-6.18.55-7.38 1.64-1.46 1.1-3.8-.55-5.62M27 20c-2.96-3.52-.8-6.18.55-7.38 1.64-1.46 1.1-3.8-.55-5.62" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function PorcelainIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 58 54" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="24" r="17.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="29" cy="24" r="10" stroke="currentColor" strokeWidth="1.3" />
      <path d="M17.5 37.5 12 46m28.5-8.5L46 46M21 43h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M29 13v3m0 16v3m-11-11h3m16 0h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
    </svg>
  );
}

function ArtIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 58 54" xmlns="http://www.w3.org/2000/svg">
      <rect height="37" rx="1.5" stroke="currentColor" strokeWidth="1.6" width="43" x="7.5" y="6.5" />
      <path d="m12 36 11.7-12 8.07 7.17 5.41-5.05L46 36M18 17.5h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M17 50h24" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function CathedralDrawing() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 248 490"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 470h152M62 470V250h124v220M81 250V170h86v80M98 170V97l26-66 26 66v73M86 116 62 47l7 123m93-54 24-69-7 123M48 250h14m124 0h14M73 283h102M82 470V341h20v129m44 0V341h20v129M111 470V281h26v189" strokeWidth="1.4" />
        <path d="M62 251 81 225l17 26 13-26 13 26 13-26 17 26 13-26 19 26M100 97h48M124 31v-17m0 17 7 8m-7-8-7 8M56 164l-11-19m140 19 11-19M93 222h62M112 105h24M115 121h18M118 137h12M71 302h39m67 0h-39M93 361h-11m23 0h-11m63 0h-11m23 0h-11" strokeWidth="1.1" />
        <path d="M11 470c39-34 73-51 113-51 47 0 81 15 113 51M29 470c35-21 65-31 95-31 34 0 65 10 95 31" strokeWidth="1" />
      </g>
    </svg>
  );
}

function AboutFeature({
  children,
  description,
  icon,
}: {
  children: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <li className={styles.feature}>
      <span className={styles.featureIcon}>{icon}</span>
      <h4>{children}</h4>
      <p>{description}</p>
    </li>
  );
}

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className={styles.section}
      data-scene="about"
      id="about"
    >
      <div aria-hidden="true" className={styles.paperGlow} />
      <div aria-hidden="true" className={styles.cathedralBackdrop}>
        <CathedralDrawing />
      </div>

      <figure className={styles.photoFrame}>
        {/* The bounded registered media supports the measured arched crop. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={getAboutImageAlt()}
          data-provenance={aboutMedia.provenance.classification}
          height={aboutMedia.dimensions.height}
          src={aboutMedia.path}
          width={aboutMedia.dimensions.width}
        />
      </figure>

      <aside className={styles.locationCard}>
        <span className={styles.locationCardEyebrow}>
          Сгенерированная визуальная композиция
        </span>
        <h2 id="about-title">О нас</h2>
        <p>Архитектурный мотив с силуэтом костёла</p>
        <span className={styles.locationCardRule} />
        <small>не документальная фотография места</small>
        <div aria-hidden="true" className={styles.locationCardCathedral}>
          <CathedralDrawing />
        </div>
      </aside>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span />
          <CopperBloom />
          <span />
          <p>О кофейне</p>
        </div>

        <h3>
          Место, где <em>кофе</em>
          <br /> встречается с искусством
        </h3>
        <p className={styles.introduction}>
          Точка притяжения — это уютное пространство в сердце Самары, где
          каждый гость находит вдохновение. Мы объединили ароматный кофе или
          какао, красоту старинной посуды, творчество современных художников и
          уникальные сувениры в одном особенном месте.
        </p>

        <ul className={styles.features}>
          <AboutFeature
            description="Наслаждайтесь любимыми напитками в атмосфере тепла и уюта."
            icon={<CupIcon />}
          >
            Кофе и какао
          </AboutFeature>
          <AboutFeature
            description="Коллекция старинной посуды XIX века — изысканная красота в каждой детали."
            icon={<PorcelainIcon />}
          >
            Антикварная посуда
          </AboutFeature>
          <AboutFeature
            description="Картины современных художников, сувениры и украшения, хранящие историю."
            icon={<ArtIcon />}
          >
            Искусство и подарки
          </AboutFeature>
        </ul>

        <div className={styles.footerCallout}>
          <div aria-hidden="true" className={styles.footerOrnament}>
            <span />
            <CopperBloom />
            <span />
          </div>
          <p>Вдохновляемся красотой. Делимся теплом.</p>
          <a className={styles.cta} href="#contacts">
            <span>Как добраться</span>
            <LineArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
