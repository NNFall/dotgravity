"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import styles from "./MenuSection.module.css";

function getMenuArtwork(): MediaAsset {
  const artwork = mediaManifest.find(
    (asset) => asset.id === "menu-iced-coffee-croissant",
  );

  if (
    !artwork ||
    artwork.provenance.classification !==
      "generated/reference-compatible"
  ) {
    throw new Error(
      "The menu scene requires the registered non-documentary generated artwork.",
    );
  }

  return artwork;
}

const menuArtwork = getMenuArtwork();

const menuItems = [
  { title: "Капучино", category: "Кофе", objectPosition: "50% 47%" },
  { title: "Ягодный десерт", category: "Десерт", objectPosition: "50% 83%" },
  { title: "Фисташковый торт", category: "Десерт", objectPosition: "76% 80%" },
  { title: "Красный бархат", category: "Десерт", objectPosition: "21% 79%" },
  { title: "Чизкейк", category: "Десерт", objectPosition: "63% 68%" },
] as const;

const generatedMenuImageAlt =
  "Сгенерированный иллюстративный натюрморт с кофе и выпечкой, не документальная фотография кафе.";

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

export function MenuSection() {
  const cardRailRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);

  const selectCard = (nextIndex: number) => {
    const normalizedIndex =
      (nextIndex + menuItems.length) % menuItems.length;

    setActiveIndex(normalizedIndex);
    setHasActiveSelection(true);
    cardRailRef.current
      ?.querySelector<HTMLElement>(
        `[data-menu-card-index="${normalizedIndex}"]`,
      )
      ?.scrollIntoView?.({
        behavior: "smooth",
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
      <div aria-hidden="true" className={styles.cathedralLinework} />
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
            {menuItems.map((item, index) => (
              <li
                className={styles.menuCard}
                data-active={
                  hasActiveSelection && activeIndex === index ? "true" : undefined
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
                    {/* The registered local asset needs five measured cover crops. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={generatedMenuImageAlt}
                      data-provenance={menuArtwork.provenance.classification}
                      src={menuArtwork.path}
                      style={
                        {
                          objectPosition: item.objectPosition,
                        } as CSSProperties
                      }
                    />
                    <FlowerMark className={styles.cardFlower} />
                    <span className={styles.generatedBadge}>
                      Сгенерировано для иллюстрации
                    </span>
                  </div>
                  <p className={styles.category}>{item.category}</p>
                  <h3>{item.title}</h3>
                  <span aria-hidden="true" className={styles.priceLine} />
                  <p className={styles.priceNote}>Стоимость уточняйте</p>
                </article>
              </li>
            ))}
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
          <FlowerMark />
          <span>Это лишь малая часть витрины. Актуальные позиции уточняйте в кафе.</span>
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
      <div aria-hidden="true" className={styles.botanicalLinework} />
    </section>
  );
}
