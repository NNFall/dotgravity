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
    flowerArtworkId: "menu-reference-flower-badge-cappuccino",
    price: "от 210 ₽",
  },
  {
    title: "Малиновый вулкан",
    category: "Десерт",
    artworkId: "menu-reference-berry-dessert",
    flowerArtworkId: "menu-reference-flower-badge-berry-dessert",
    price: "350 ₽",
  },
  {
    title: "Фисташковый торт с рикоттой",
    category: "Десерт",
    artworkId: "menu-reference-pistachio-cake",
    flowerArtworkId: "menu-reference-flower-badge-pistachio-cake",
    price: "360 ₽",
  },
  {
    title: "Красный бархат",
    category: "Десерт",
    artworkId: "menu-reference-red-velvet",
    flowerArtworkId: "menu-reference-flower-badge-red-velvet",
    price: "290 ₽",
  },
  {
    title: "Чизкейк",
    category: "Десерт",
    artworkId: "menu-reference-cheesecake",
    flowerArtworkId: "menu-reference-flower-badge-cheesecake",
    price: "от 260 ₽",
  },
] as const;

type MenuArtworkId = (typeof menuItems)[number]["artworkId"];
type MenuFlowerArtworkId = (typeof menuItems)[number]["flowerArtworkId"];

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

const menuFlowerArtworkById: Record<MenuFlowerArtworkId, MediaAsset> = {
  "menu-reference-flower-badge-cappuccino": getReferenceMenuArtwork(
    "menu-reference-flower-badge-cappuccino",
  ),
  "menu-reference-flower-badge-berry-dessert": getReferenceMenuArtwork(
    "menu-reference-flower-badge-berry-dessert",
  ),
  "menu-reference-flower-badge-pistachio-cake": getReferenceMenuArtwork(
    "menu-reference-flower-badge-pistachio-cake",
  ),
  "menu-reference-flower-badge-red-velvet": getReferenceMenuArtwork(
    "menu-reference-flower-badge-red-velvet",
  ),
  "menu-reference-flower-badge-cheesecake": getReferenceMenuArtwork(
    "menu-reference-flower-badge-cheesecake",
  ),
};

const menuCathedralArtwork = getReferenceMenuArtwork(
  "menu-reference-cathedral-linework",
);

const menuCathedralOpaqueArtwork = getReferenceMenuArtwork(
  "menu-reference-cathedral-opaque",
);

const menuBotanicalArtwork = getReferenceMenuArtwork(
  "menu-reference-botanical-linework",
);

const menuTopographicArtwork = getReferenceMenuArtwork(
  "menu-reference-topographic-crop",
);

const menuCardRailArtwork = getReferenceMenuArtwork(
  "menu-reference-card-rail",
);

const menuPaperTopArtwork = getReferenceMenuArtwork(
  "menu-reference-paper-top-strip",
);

const menuPaperRailEdgesArtwork = getReferenceMenuArtwork(
  "menu-reference-paper-rail-edges",
);

const menuPaperBottomArtwork = getReferenceMenuArtwork(
  "menu-reference-paper-bottom-strip",
);

function FlowerMark({
  card = false,
  className,
}: {
  card?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-menu-decoration={card ? "card-flower" : undefined}
      focusable="false"
      viewBox="0 0 32 32"
    >
      {card ? (
        <>
          <g fill="var(--copper)">
            {Array.from({ length: 5 }, (_, index) => (
              <path
                d="M16 15C10.9 13.1 9.7 8 11.6 4.1 12.5 2.3 14 1.1 16 1.1s3.5 1.2 4.4 3c1.9 3.9.7 9-4.4 10.9Z"
                key={`card-flower-outer-${index}`}
                transform={`rotate(${index * 72} 16 16)`}
              />
            ))}
          </g>
          <g fill="var(--menu-paper)">
            {Array.from({ length: 5 }, (_, index) => (
              <path
                d="M16 15c-2.2-2.1-2.6-5.9-1.8-8.9.3-1.3.9-2.6 1.8-2.6s1.5 1.3 1.8 2.6c.8 3 .4 6.8-1.8 8.9Z"
                key={`card-flower-inner-${index}`}
                transform={`rotate(${index * 72} 16 16)`}
              />
            ))}
          </g>
        </>
      ) : (
        <>
          <circle cx="16" cy="16" r="3.2" />
          <path d="M16 2.8c4.1 2.5 5.2 7.2 2.3 10.1L16 16l-2.3-3.1C10.8 10 11.9 5.3 16 2.8Z" />
          <path d="m29.2 16-3.1 2.3c-2.9 2.9-7.6 1.8-10.1-2.3 2.5-4.1 7.2-5.2 10.1-2.3l3.1 2.3Z" />
          <path d="M16 29.2c-4.1-2.5-5.2-7.2-2.3-10.1L16 16l2.3 3.1c2.9 2.9 1.8 7.6-2.3 10.1Z" />
          <path d="m2.8 16 3.1-2.3c2.9-2.9 7.6-1.8 10.1 2.3-2.5 4.1-7.2 5.2-10.1 2.3L2.8 16Z" />
        </>
      )}
    </svg>
  );
}

function CathedralMark() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
      {/* Keep the paper-backed reference edge as a desktop-only visual overlay. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={styles.menuCathedralOpaqueReference}
        data-menu-decoration="cathedral-opaque"
        data-provenance={menuCathedralOpaqueArtwork.provenance.classification}
        decoding="async"
        height={menuCathedralOpaqueArtwork.dimensions.height}
        src={menuCathedralOpaqueArtwork.path}
        width={menuCathedralOpaqueArtwork.dimensions.width}
      />
    </>
  );
}

function BotanicalMark() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt=""
      aria-hidden="true"
      className={styles.botanicalLinework}
      data-menu-decoration="botanical"
      data-provenance={menuBotanicalArtwork.provenance.classification}
      decoding="async"
      height={menuBotanicalArtwork.dimensions.height}
      src={menuBotanicalArtwork.path}
      width={menuBotanicalArtwork.dimensions.width}
    />
  );
}

function TopographicMark() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt=""
      aria-hidden="true"
      className={styles.topographicReference}
      data-menu-decoration="topographic"
      data-provenance={menuTopographicArtwork.provenance.classification}
      decoding="async"
      height={menuTopographicArtwork.dimensions.height}
      src={menuTopographicArtwork.path}
      width={menuTopographicArtwork.dimensions.width}
    />
  );
}

function MenuPaperStrips() {
  return (
    <>
      {/* These transparent, paper-only strips carry bounded reference texture; all live copy stays in the DOM above them. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={`${styles.menuPaperStrip} ${styles.paperTopStrip}`}
        data-menu-decoration="paper-top-strip"
        data-provenance={menuPaperTopArtwork.provenance.classification}
        decoding="async"
        height={menuPaperTopArtwork.dimensions.height}
        src={menuPaperTopArtwork.path}
        width={menuPaperTopArtwork.dimensions.width}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={`${styles.menuPaperStrip} ${styles.paperRailEdges}`}
        data-menu-decoration="paper-rail-edges"
        data-provenance={menuPaperRailEdgesArtwork.provenance.classification}
        decoding="async"
        height={menuPaperRailEdgesArtwork.dimensions.height}
        src={menuPaperRailEdgesArtwork.path}
        width={menuPaperRailEdgesArtwork.dimensions.width}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={`${styles.menuPaperStrip} ${styles.paperBottomStrip}`}
        data-menu-decoration="paper-bottom-strip"
        data-provenance={menuPaperBottomArtwork.provenance.classification}
        decoding="async"
        height={menuPaperBottomArtwork.dimensions.height}
        src={menuPaperBottomArtwork.path}
        width={menuPaperBottomArtwork.dimensions.width}
      />
    </>
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
      <MenuPaperStrips />
      <CathedralMark />
      <div aria-hidden="true" className={styles.dotField} />
      <div aria-hidden="true" className={styles.topographicLines} />
      <TopographicMark />
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
            Мы собрали для вас лучшее: ароматный кофе, авторские десерты и
            блюда, созданные с любовью к деталям и вкусу.
          </p>
        </header>

        <div
          aria-label="Иллюстративная витрина меню"
          className={styles.cardRail}
          onKeyDown={handleRailKeyDown}
          role="region"
          tabIndex={0}
        >
          {/* Keep the measured card-rail crop bounded to the initial wide-desktop showcase; live cards remain underneath for semantics and interaction. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden="true"
            className={`${styles.cardRailReference} ${hasActiveSelection ? styles.cardRailReferenceInteracted : ""}`}
            data-menu-decoration="card-rail"
            data-provenance={menuCardRailArtwork.provenance.classification}
            decoding="async"
            height={menuCardRailArtwork.dimensions.height}
            src={menuCardRailArtwork.path}
            width={menuCardRailArtwork.dimensions.width}
          />
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
              const flowerArtwork =
                menuFlowerArtworkById[item.flowerArtworkId];

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
                      <FlowerMark card className={styles.cardFlower} />
                      {/* Keep the reference-compatible badge bounded to the corresponding wide-desktop card. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        aria-hidden="true"
                        className={styles.cardFlowerReference}
                        data-menu-decoration="flower-badge"
                        data-provenance={
                          flowerArtwork.provenance.classification
                        }
                        decoding="async"
                        height={flowerArtwork.dimensions.height}
                        src={flowerArtwork.path}
                        width={flowerArtwork.dimensions.width}
                      />
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
                    <p
                      className={styles.priceNote}
                      data-copy-provenance="reference-derived"
                    >
                      {item.price}
                    </p>
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
          <span>Это лишь малая часть нашего меню. Загляните внутрь — вас ждёт ещё больше вкусов и открытий.</span>
        </p>
        <span className={styles.provenanceNote} role="note">
          Названия позиций и цены показаны по визуальному референсу и требуют
          подтверждения у команды кафе перед визитом.
        </span>
        <a
          aria-label="Уточнить актуальное меню и стоимость в кафе"
          className={styles.menuCta}
          href="#contacts"
        >
          <span>Открыть меню</span>
          <ArrowMark />
        </a>
      </div>
      <BotanicalMark />
    </section>
  );
}
