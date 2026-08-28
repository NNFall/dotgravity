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

const aboutReferenceMedia = (() => {
  const registeredAboutReference = mediaManifest.find(
    (asset) => asset.id === "about-reference-arch",
  );

  if (!registeredAboutReference) {
    throw new Error(
      "The bounded reference-derived about media is required to render the about scene.",
    );
  }

  return registeredAboutReference;
})();

const aboutCathedralArtwork = (() => {
  const registeredAboutCathedral = mediaManifest.find(
    (asset) => asset.id === "about-reference-cathedral-linework",
  );

  if (!registeredAboutCathedral) {
    throw new Error(
      "The bounded reference-derived about cathedral artwork is required to render the about scene.",
    );
  }

  return registeredAboutCathedral;
})();

const aboutCathedralOpaqueArtwork = (() => {
  const registeredAboutCathedralOpaque = mediaManifest.find(
    (asset) => asset.id === "about-reference-cathedral-opaque",
  );

  if (!registeredAboutCathedralOpaque) {
    throw new Error(
      "The bounded opaque about cathedral artwork is required to render the about scene.",
    );
  }

  return registeredAboutCathedralOpaque;
})();

const aboutPaperArcArtwork = (() => {
  const registeredAboutPaperArcs = mediaManifest.find(
    (asset) => asset.id === "about-reference-paper-arcs",
  );

  if (!registeredAboutPaperArcs) {
    throw new Error(
      "The bounded reference-derived about paper-arc artwork is required to render the about scene.",
    );
  }

  return registeredAboutPaperArcs;
})();

const aboutLocationCardArtwork = (() => {
  const registeredAboutLocationCard = mediaManifest.find(
    (asset) => asset.id === "about-reference-location-card",
  );

  if (!registeredAboutLocationCard) {
    throw new Error(
      "The bounded reference-derived about location-card artwork is required to render the about scene.",
    );
  }

  return registeredAboutLocationCard;
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

function PlaqueCathedralDrawing() {
  return (
    <svg
      aria-hidden="true"
      className={styles.plaqueCathedral}
      data-about-plaque-decoration="cathedral"
      fill="none"
      viewBox="0 0 128 198"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5 188h118M11 184c18-12 37-19 55-19 20 0 38 7 52 19M19 188c15-8 31-12 46-12 18 0 32 5 46 12M28 174h71V91H28v83Z"
          strokeWidth="1"
        />
        <path
          d="M36 91V66h55v25M44 66V37h12v29m16 0V43h12v23M52 37l12-28 12 28M64 9V2m0 7 3 4m-3-4-3 4"
          strokeWidth="1"
        />
        <path
          d="M27 101 36 84l8 17m39 0 8-17 9 17M30 92h58M44 85h40M37 116h52M38 128h51M30 146h69M24 159h77"
          strokeWidth="0.72"
        />
        <path
          d="M47 174v-35h12v35m10 0v-35h12v35M61 174v-51h12v51M64 123v-18m-6 9h12M61 103h12"
          strokeWidth="0.9"
        />
        <path
          d="M39 118c0-8 8-13 15-8 3 2 4 5 4 8v16H39v-16Zm31 0c0-8 8-13 15-8 3 2 4 5 4 8v16H70v-16ZM60 157v-17c0-8 8-14 16-14s16 6 16 14v17H60Z"
          strokeWidth="0.82"
        />
        <path
          d="M43 118h12m-6-6v12m27-6h12m-6-6v12M68 142h16m-8-8v16"
          strokeWidth="0.55"
        />
        <path
          d="M20 137V84l5-12 5 12v53m73 4V88l5-12 5 12v53M17 88l8-18m83 18-8-18m-78 7-6-12m89 12 6-12"
          strokeWidth="0.82"
        />
        <path
          d="M18 98h12m73 2h14M18 111h12m73 2h14M18 125h12m73 1h14M44 47h12m16 7h12M46 55h8m20 8h8"
          strokeWidth="0.55"
        />
        <path
          d="M30 104 38 93l7 11 7-11 7 11 7-11 7 11 7-11 7 11 7-11 7 11M40 151l9-9 8 9 7-9 8 9 8-9 8 9M34 169l8-8 8 8 8-8 8 8 8-8 8 8"
          strokeWidth="0.72"
        />
        <path
          d="M8 181 29 174m-16 13 29-13m69 1 23 7m-31-7 27 13M35 188l29-15 31 15M47 188l17-9 18 9"
          strokeWidth="0.62"
        />
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
      {/* Keep the measured paper-only reference fragment bounded to the wide desktop layer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={styles.paperArcReference}
        data-about-decoration="paper-arcs"
        data-provenance={aboutPaperArcArtwork.provenance.classification}
        decoding="async"
        height={aboutPaperArcArtwork.dimensions.height}
        src={aboutPaperArcArtwork.path}
        width={aboutPaperArcArtwork.dimensions.width}
      />
      <div aria-hidden="true" className={styles.cathedralBackdrop}>
        <CathedralDrawing />
        {/* Keep the measured reference-derived ornament bounded to this desktop edge layer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.cathedralReference}
          data-about-decoration="cathedral"
          data-provenance={aboutCathedralArtwork.provenance.classification}
          decoding="async"
          height={aboutCathedralArtwork.dimensions.height}
          src={aboutCathedralArtwork.path}
          width={aboutCathedralArtwork.dimensions.width}
        />
        {/* Keep the paper-backed reference edge as a desktop-only visual overlay. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.aboutCathedralOpaqueReference}
          data-about-decoration="cathedral-opaque"
          data-provenance={aboutCathedralOpaqueArtwork.provenance.classification}
          decoding="async"
          height={aboutCathedralOpaqueArtwork.dimensions.height}
          src={aboutCathedralOpaqueArtwork.path}
          width={aboutCathedralOpaqueArtwork.dimensions.width}
        />
      </div>

      <figure className={styles.photoFrame}>
        {/* The bounded registered media supports the measured arched crop. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={getAboutImageAlt()}
          className={styles.generatedPhoto}
          data-provenance={aboutMedia.provenance.classification}
          height={aboutMedia.dimensions.height}
          src={aboutMedia.path}
          width={aboutMedia.dimensions.width}
        />
        {/* Keep the measured reference artwork bounded to this desktop arch layer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.referenceCrop}
          data-provenance={aboutReferenceMedia.provenance.classification}
          data-reference-crop="desktop"
          height={aboutReferenceMedia.dimensions.height}
          src={aboutReferenceMedia.path}
          width={aboutReferenceMedia.dimensions.width}
        />
      </figure>

      <aside className={styles.locationCard}>
        <span className={styles.locationCardEyebrow}>
          ВИД НА КОСТЁЛ
        </span>
        <h2 className={styles.visuallyHidden} id="about-title">
          О нас
        </h2>
        <p>ПРЕСВЯТОГО СЕРДЦА ИИСУСА</p>
        <span className={styles.locationCardRule} />
        <small>исторический центр Самары</small>
        <span className={styles.provenanceNote}>
          Сгенерированная визуальная композиция
        </span>
        <span className={styles.provenanceNote}>
          не документальная фотография места
        </span>
        <div aria-hidden="true" className={styles.locationCardCathedral}>
          <CathedralDrawing />
          <PlaqueCathedralDrawing />
        </div>
      </aside>
      {/* Keep the measured plaque crop bounded to the wide-desktop card footprint; semantic card text remains in the live aside. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={styles.locationCardReference}
        data-about-decoration="location-card"
        data-provenance={aboutLocationCardArtwork.provenance.classification}
        decoding="async"
        height={aboutLocationCardArtwork.dimensions.height}
        src={aboutLocationCardArtwork.path}
        width={aboutLocationCardArtwork.dimensions.width}
      />

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
          Точка притяжения — это уютное пространство в сердце Самары,
          <br className={styles.desktopBreak} /> где каждый гость находит
          вдохновение. Мы объединили ароматный кофе
          <br className={styles.desktopBreak} /> или какао, красоту старинной
          посуды, творчество современных художников
          <br className={styles.desktopBreak} /> и уникальные сувениры в одном
          особенном месте.
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
            АНТИКВАРНАЯ ПОСУДА
          </AboutFeature>
          <AboutFeature
            description="Картины современных художников, сувениры, украшения и душевные мелочи с историей."
            icon={<ArtIcon />}
          >
            Искусство и подарки
          </AboutFeature>
        </ul>

        <span className={styles.provenanceNote} role="note">
          Редакционный текст и подписи взяты из визуального референса и не
          подтверждают каталог, коллекцию или состав услуг кафе.
        </span>

        <div className={styles.footerCallout}>
          <div aria-hidden="true" className={styles.footerOrnament}>
            <span />
            <CopperBloom />
            <span />
          </div>
          <p>Вдохновляемся красотой. Делимся теплом.</p>
          <a className={styles.cta} href="#contacts">
            <span>Узнать больше</span>
            <LineArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
