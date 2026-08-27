"use client";

import {
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import styles from "./MenuSection.module.css";

function getReferenceMenuArtwork(id: string): MediaAsset {
  const artwork = mediaManifest.find(
    (asset) => asset.id === id,
  );

  if (
    !artwork ||
    artwork.provenance.classification !== "reference-derived" ||
    artwork.provenance.documentary ||
    !artwork.productionAllowance.allowed ||
    artwork.productionAllowance.referenceShape !== "bounded-reference-region"
  ) {
    throw new Error(
      `The menu scene requires the registered non-documentary reference crop: ${id}.`,
    );
  }

  return artwork;
}

const menuItems = [
  {
    title: "Капучино",
    category: "Кофе",
    artworkId: "menu-reference-cappuccino",
  },
  {
    title: "Ягодный десерт",
    category: "Десерт",
    artworkId: "menu-reference-berry-dessert",
  },
  {
    title: "Фисташковый торт",
    category: "Десерт",
    artworkId: "menu-reference-pistachio-cake",
  },
  {
    title: "Красный бархат",
    category: "Десерт",
    artworkId: "menu-reference-red-velvet",
  },
  {
    title: "Чизкейк",
    category: "Десерт",
    artworkId: "menu-reference-cheesecake",
  },
] as const;

type MenuArtworkId = (typeof menuItems)[number]["artworkId"];

const menuArtworkById: Record<MenuArtworkId, MediaAsset> = {
  "menu-reference-cappuccino": getReferenceMenuArtwork(
    "menu-reference-cappuccino",
  ),
  "menu-reference-berry-dessert": getReferenceMenuArtwork(
    "menu-reference-berry-dessert",
  ),
  "menu-reference-pistachio-cake": getReferenceMenuArtwork(
    "menu-reference-pistachio-cake",
  ),
  "menu-reference-red-velvet": getReferenceMenuArtwork(
    "menu-reference-red-velvet",
  ),
  "menu-reference-cheesecake": getReferenceMenuArtwork(
    "menu-reference-cheesecake",
  ),
};

const menuCathedralArtwork = getReferenceMenuArtwork(
  "menu-reference-cathedral-linework",
);

function FlowerMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="3.2" />
      <path d="M16 2.8c4.1 2.5 5.2 7.2 2.3 10.1L16 16l-2.3-3.1C10.8 10 11.9 5.3 16 2.8Z" />
      <path d="m29.2 16-3.1 2.3c-2.9 2.9-7.6 1.8-10.1-2.3 2.5-4.1 7.2-5.2 10.1-2.3l3.1 2.3Z" />
      <path d="M16 29.2c-4.1-2.5-5.2-7.2-2.3-10.1L16 16l2.3 3.1c2.9 2.9 1.8 7.6-2.3 10.1Z" />
      <path d="m2.8 16 3.1-2.3c2.9-2.9 7.6-1.8 10.1 2.3-2.5 4.1-7.2 5.2-10.1 2.3L2.8 16Z" />
    </svg>
  );
}

function CathedralMark() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt=""
      aria-hidden="true"
      className={styles.cathedralLinework}
      data-menu-decoration="cathedral"
      data-provenance={menuCathedralArtwork.provenance.classification}
      decoding="async"
      height={menuCathedralArtwork.dimensions.height}
      src={menuCathedralArtwork.path}
      width={menuCathedralArtwork.dimensions.width}
    />
  );
}

function BotanicalMark() {
  return (
    <svg
      aria-hidden="true"
      className={styles.botanicalLinework}
      fill="none"
      focusable="false"
      viewBox="0 0 240 270"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M151 270c2-42 13-83 30-119 14-29 28-51 49-76" strokeWidth="1.25" />
        <path d="M177 185c-28-5-53-18-73-37m95 0c-10-25-14-52-11-79m-28 133c-21-2-42 3-60 15m75-42c17-3 32-12 44-24" strokeWidth="1" />
        <path d="M96 147c13-15 29-17 47-12-12 14-28 19-47 12Zm-7 46c16-12 32-11 48-2-14 11-30 12-48 2Zm73-29c-4-19 3-33 18-44 5 17-1 32-18 44Zm24-62c-2-18 6-31 20-40 3 17-3 29-20 40Zm-4 53c15-9 29-8 43-1-12 12-26 13-43 1Zm-43 30c-4-15 2-27 14-36 5 14 0 25-14 36Z" strokeWidth="0.95" />
        <path d="M151 239c-20-3-37 2-52 14m55-2c15-2 28-8 39-19" strokeWidth="0.9" />
        <path d="M86 257c7-14 19-20 35-20-6 14-18 21-35 20Zm104-15c9-13 21-18 36-17-8 13-20 19-36 17Z" strokeWidth="0.9" />
        <circle cx="207" cy="111" r="6" strokeWidth="0.9" />
        <circle cx="215" cy="120" r="4" strokeWidth="0.9" />
        <circle cx="202" cy="120" r="3" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

function ArrowMark() {
  return (
    <svg
      aria-hidden="true"
      className={styles.ctaArrow}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M3 12h17M14.5 5.5 21 12l-6.5 6.5" />
    </svg>
  );
}

function GiftMark() {
  return (
    <svg
      aria-hidden="true"
      className={styles.giftMark}
      fill="none"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 14h22v14H5zM4 10h24v5H4zM16 10v18" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 10c-1.8-5.8-8.7-7-9.1-2.9C6.6 10.7 12.6 11 16 10Zm0 0c1.8-5.8 8.7-7 9.1-2.9.3 3.6-5.7 3.9-9.1 2.9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}

export function MenuSection() {
  const cardRailRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);

  const selectCard = (nextIndex: number) => {
    const normalizedIndex =
      (nextIndex + menuItems.length) % menuItems.length;

    setActiveIndex(normalizedIndex);
    setHasActiveSelection(true);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRailRef.current
      ?.querySelector<HTMLElement>(
        `[data-menu-card-index="${normalizedIndex}"]`,
      )
      ?.scrollIntoView?.({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
  };

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectCard(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectCard(activeIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectCard(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectCard(menuItems.length - 1);
    }
  };

  const handleRailScroll = () => {
    const rail = cardRailRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-menu-card-index]"),
    );
    if (cards.length === 0) {
      return;
    }

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    const nearestIndex = cards.reduce((closestIndex, card, index) => {
      const closestCard = cards[closestIndex];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCardCenter =
        closestCard.offsetLeft + closestCard.offsetWidth / 2;

      return Math.abs(cardCenter - railCenter) <
        Math.abs(closestCardCenter - railCenter)
        ? index
        : closestIndex;
    }, 0);

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex ? currentIndex : nearestIndex,
    );
    setHasActiveSelection(true);
  };

  return (
    <section
      aria-labelledby="menu-title"
      className={styles.menuScene}
      data-scene="menu"
      id="menu"
    >
      <CathedralMark />
      <div aria-hidden="true" className={styles.dotField} />
      <div aria-hidden="true" className={styles.topographicLines} />
      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span />
            <FlowerMark />
            <span>Меню</span>
            <FlowerMark />
            <span />
          </p>
          <h2 id="menu-title">ТО, РАДИ ЧЕГО ХОЧЕТСЯ ЗАГЛЯНУТЬ</h2>
          <p className={styles.headingOrnament} aria-hidden="true">
            <span />
            <FlowerMark />
            <span />
          </p>
          <p className={styles.introduction}>
            Несколько возможных поводов заглянуть. Состав и стоимость
            уточняйте в кафе перед визитом.
          </p>
        </header>

        <div
          aria-label="Иллюстративная витрина меню"
          className={styles.cardRail}
          onKeyDown={handleRailKeyDown}
          role="region"
          tabIndex={0}
        >
          <button
            aria-controls="menu-card-rail"
            aria-label="Предыдущая иллюстративная позиция меню"
            className={styles.railArrowLeft}
            onClick={() => selectCard(activeIndex - 1)}
            type="button"
          />
          <ul
            aria-label="Иллюстративные позиции меню"
            className={styles.cards}
            id="menu-card-rail"
            onScroll={handleRailScroll}
            ref={cardRailRef}
          >
            {menuItems.map((item, index) => {
              const artwork = menuArtworkById[item.artworkId];

              return (
                <li
                  className={styles.menuCard}
                  data-active={
                    hasActiveSelection && activeIndex === index
                      ? "true"
                      : undefined
                  }
                  data-menu-card-index={index}
                  id={`menu-card-${index + 1}`}
                  key={item.title}
                >
                  <article
                    aria-label={`Иллюстративная позиция меню: ${item.title}. Актуальный состав и стоимость уточняйте в кафе.`}
                    className={styles.cardInner}
                  >
                    <div className={styles.imageFrame}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`Референсный кроп «${item.title}», не документальная фотография кафе.`}
                        data-provenance={artwork.provenance.classification}
                        height={artwork.dimensions.height}
                        src={artwork.path}
                        width={artwork.dimensions.width}
                      />
                      <FlowerMark className={styles.cardFlower} />
                      {artwork.provenance.classification ===
                      "generated/reference-compatible" ? (
                        <span className={styles.generatedBadge}>
                          Сгенерировано для иллюстрации
                        </span>
                      ) : null}
                    </div>
                    <p className={styles.category}>{item.category}</p>
                    <h3>{item.title}</h3>
                    <span aria-hidden="true" className={styles.priceLine} />
                    <p className={styles.priceNote}>Стоимость уточняйте</p>
                  </article>
                </li>
              );
            })}
          </ul>
          <button
            aria-controls="menu-card-rail"
            aria-label="Следующая иллюстративная позиция меню"
            className={styles.railArrowRight}
            onClick={() => selectCard(activeIndex + 1)}
            type="button"
          />
          <p aria-atomic="true" className={styles.carouselStatus} role="status">
            {`Позиция ${activeIndex + 1} из ${menuItems.length}: ${menuItems[activeIndex].title}`}
          </p>
        </div>

        <p className={styles.menuNote}>
          <GiftMark />
          <span>Это лишь малая часть витрины меню. Другие позиции и стоимость уточняйте в кафе перед визитом.</span>
        </p>
        <a
          aria-label="Уточнить актуальное меню и стоимость в кафе"
          className={styles.menuCta}
          href="#contacts"
        >
          <span>Уточнить меню</span>
          <ArrowMark />
        </a>
      </div>
      <BotanicalMark />
    </section>
  );
}
