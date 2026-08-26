import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import { SiteHeader } from "../hero/SiteHeader";

import styles from "./ContactsSection.module.css";

type ContactVisualId =
  | "contacts-reference-window-crop"
  | "contacts-reference-street-crop";

function requireReferenceContactCrop(id: ContactVisualId): MediaAsset {
  const asset = mediaManifest.find((item) => item.id === id);

  if (
    !asset ||
    !asset.productionAllowance.allowed ||
    !asset.intendedScenes.includes("contacts") ||
    asset.provenance.classification !== "reference-derived" ||
    asset.provenance.documentary ||
    asset.productionAllowance.referenceShape !== "bounded-reference-region"
  ) {
    throw new Error(
      `The contacts scene requires the registered bounded reference crop: ${id}.`,
    );
  }

  return asset;
}

const windowVisual = requireReferenceContactCrop(
  "contacts-reference-window-crop",
);
const streetVisual = requireReferenceContactCrop(
  "contacts-reference-street-crop",
);

function DirectionArrow() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 36 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 8h31M25 1l7 7-7 7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function PlacePin() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 32 42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 40S3.5 27.22 3.5 16.45C3.5 9.3 9.1 3.5 16 3.5s12.5 5.8 12.5 12.95C28.5 27.22 16 40 16 40Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="16" cy="16" r="4.2" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.46 4.93 6.6 8.38c-1.73 1.55-1.49 4.75.2 8.04 2.1 4.09 5.48 7.73 9.55 10.15 3.13 1.86 6.25 2.26 7.94.7l3.78-3.5-5.65-5.04-2.74 2.29c-2.38-.99-4.66-3.16-5.72-5.52l2.26-2.82-5.76-5.07Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 35 35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17.5" cy="17.5" r="12.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M17.5 10.5v7.4l4.7 2.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function Rosette() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4.1c2.9 4.17 4.03 7.02 0 11.9-4.03-4.88-2.9-7.73 0-11.9ZM27.9 16c-4.17 2.9-7.02 4.03-11.9 0 4.88-4.03 7.73-2.9 11.9 0ZM16 27.9c-2.9-4.17-4.03-7.02 0-11.9 4.03 4.88 2.9 7.73 0 11.9ZM4.1 16c4.17-2.9 7.02-4.03 11.9 0-4.88 4.03-7.73 2.9-11.9 0Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.05"
      />
      <circle cx="16" cy="16" fill="currentColor" r="2.4" />
    </svg>
  );
}

function SchematicRoute() {
  return (
    <svg
      aria-hidden="true"
      className={styles.routeDrawing}
      fill="none"
      focusable="false"
      viewBox="0 0 900 294"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-22 58c132 22 188 21 294-2 80-18 145-25 261-11 123 15 205 7 390-21" strokeWidth="1.05" />
        <path d="M-11 204c90-25 156-29 248-13 123 22 193 11 283-16 121-37 201-33 402-3" strokeWidth="1.05" />
        <path d="M75 12c14 72 32 109 84 164 42 44 53 74 63 129" strokeWidth="1.05" />
        <path d="M351-6c-2 76-20 120-60 177-29 41-27 78-10 132" strokeWidth="1.05" />
        <path d="M601-9c-10 86-28 129-58 168-33 44-49 81-27 144" strokeWidth="1.05" />
        <path d="M764 1c-3 77 9 120 49 176 26 36 29 73 19 128" strokeWidth="1.05" />
      </g>
      <g fill="currentColor" opacity=".58">
        <circle cx="106" cy="83" r="3" />
        <circle cx="271" cy="140" r="2.4" />
        <circle cx="425" cy="67" r="3" />
        <circle cx="608" cy="209" r="2.4" />
        <circle cx="748" cy="84" r="3" />
      </g>
      <path
        d="M647 166c0-17.09 13.85-30.94 30.94-30.94s30.94 13.85 30.94 30.94c0 24.38-30.94 56.94-30.94 56.94S647 190.38 647 166Z"
        fill="var(--copper)"
        stroke="var(--paper)"
        strokeWidth="3"
      />
      <circle cx="677.94" cy="166" fill="var(--paper)" r="7" />
      <path d="M670 166h15.5" stroke="var(--copper)" strokeWidth="1.2" />
    </svg>
  );
}

function ReferenceCropVisual({
  asset,
  className,
  label,
}: {
  asset: MediaAsset;
  className: string;
  label: string;
}) {
  return (
    <figure className={className}>
      {/* Registered bounded reference crop; the plaque, labels, route map and frame remain live CSS/SVG/HTML. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={`Референсный фрагмент: ${label}; не документальная фотография кофейни.`}
        data-provenance={asset.provenance.classification}
        height={asset.dimensions.height}
        src={asset.path}
        width={asset.dimensions.width}
      />
      <figcaption>
        <span>Фрагмент референсной концепции</span>
        <small>не документальная фотография кофейни</small>
      </figcaption>
    </figure>
  );
}

export function ContactsSection() {
  return (
    <section
      aria-labelledby="contacts-title"
      className={styles.contactsScene}
      data-scene="contacts"
      id="contacts"
    >
      <div className={styles.referenceHeader}>
        <SiteHeader presentation />
      </div>
      <div className={styles.composition}>
        <div aria-hidden="true" className={styles.paperLines} />
        <div aria-hidden="true" className={styles.dotField} />

        <header className={styles.copy}>
          <p className={styles.eyebrow}>
            <span>Контакты</span>
            <Rosette />
          </p>
          <h2 id="contacts-title">Как нас найти</h2>
          <p className={styles.introduction}>
            Точка притяжения находится в Самаре, на улице Фрунзе, 130.
            Построить маршрут можно по ссылке ниже.
          </p>

          <address className={styles.contactList}>
            <a
              aria-label="Построить маршрут до Точки притяжения"
              className={styles.contactItem}
              href="https://yandex.ru/maps/-/CTDBI0~o"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PlacePin />
              <span>
                <small>Адрес</small>
                <b>Самара, ул. Фрунзе, 130</b>
              </span>
              <DirectionArrow />
            </a>
            <a
              aria-label="Позвонить в Точку притяжения"
              className={styles.contactItem}
              href="tel:+78462630404"
            >
              <PhoneGlyph />
              <span>
                <small>Телефон</small>
                <b>+7 (846) 263-04-04</b>
              </span>
              <DirectionArrow />
            </a>
            <div
              className={`${styles.contactItem} ${styles.contactItemStatic}`}
              data-contact-fact="hours"
            >
              <ClockGlyph />
              <span>
                <small>Режим работы</small>
                <b>Уточняйте перед визитом</b>
              </span>
              <span aria-hidden="true" className={styles.contactItemArrowSpace} />
            </div>
          </address>

          <a
            className={styles.routeButton}
            href="https://yandex.ru/maps/-/CTDBI0~o"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Построить маршрут</span>
            <DirectionArrow />
          </a>
        </header>

        <div
          aria-label="Визуальная композиция района"
          className={styles.photoPair}
          role="group"
        >
          <ReferenceCropVisual
            asset={windowVisual}
            className={styles.windowVisual}
            label="вид из окна с архитектурным мотивом"
          />
          <ReferenceCropVisual
            asset={streetVisual}
            className={styles.streetVisual}
            label="вечерняя улица с тёплыми окнами"
          />
        </div>

        <figure aria-labelledby="route-title" className={styles.routePanel}>
          <div className={styles.routePanelCopy}>
            <p className={styles.routeEyebrow}>
              <Rosette />
              <span>Ориентир</span>
            </p>
            <h3 id="route-title">Схема района</h3>
            <p>Схематичный ориентир, не интерактивная карта.</p>
          </div>
          <SchematicRoute />
          <figcaption>
            <PlacePin />
            <span>ул. Фрунзе, 130</span>
          </figcaption>
          <aside aria-label="Как добраться" className={styles.routeSidebar}>
            <h4>Как добраться</h4>
            <p>Откройте построение маршрута в Яндекс Картах.</p>
            <a
              href="https://yandex.ru/maps/-/CTDBI0~o"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Открыть маршрут</span>
              <DirectionArrow />
            </a>
            <a href="tel:+78462630404">
              <span>+7 (846) 263-04-04</span>
              <PhoneGlyph />
            </a>
          </aside>
        </figure>
      </div>
    </section>
  );
}
