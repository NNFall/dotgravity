import { mediaManifest } from "../../media/manifest";
import type { MediaAsset } from "../../media/types";
import { SiteHeader } from "../hero/SiteHeader";

import styles from "./ContactsSection.module.css";

type ContactVisualId =
  | "contacts-reference-window-crop"
  | "contacts-reference-street-crop"
  | "contacts-reference-cathedral-linework"
  | "contacts-reference-dot-field"
  | "contacts-reference-route-panel";

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
const cathedralVisual = requireReferenceContactCrop(
  "contacts-reference-cathedral-linework",
);
const dotFieldVisual = requireReferenceContactCrop(
  "contacts-reference-dot-field",
);
const routePanelVisual = requireReferenceContactCrop(
  "contacts-reference-route-panel",
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

function RouteLinkGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="40"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.2"
        width="40"
        x="2"
        y="2"
      />
      <path
        d="m10 31 8-14 8 5 8-12m-8 0h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
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

function CarGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 48 34"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m9 20 3.8-9.6a4 4 0 0 1 3.7-2.5h15a4 4 0 0 1 3.7 2.5L39 20m-31 0h33v6H8v-6Zm6 6v3m20-3v3M13 20h22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
      <circle cx="14" cy="25" fill="var(--paper)" r="2.15" stroke="currentColor" strokeWidth="1.15" />
      <circle cx="34" cy="25" fill="var(--paper)" r="2.15" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}

function TransitGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 36 46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="4" width="22" height="35" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 27h22M11 35h14M12 10h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
      <circle cx="12" cy="32" fill="var(--paper)" r="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="24" cy="32" fill="var(--paper)" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M13 16h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

function WalkGlyph() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 36 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="m18 12-3 13 5 5m-5-12-7 7m10-2 8 6m-8-6-4 15m4-15 8-9m-8 9 8 11m-13 4-4 8m13-8 7 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
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
      <g
        aria-hidden="true"
        className={styles.mapBlocks}
        fill="var(--paper-deep)"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M22 33h104v45H22zM152 20h95v67h-95zM281 22h82v57h-82zM401 14h112v53H401zM550 18h94v66h-94zM685 26h166v45H685z" />
        <path d="M20 116h90v47H20zM132 108h137v61H132zM304 105h89v55h-89zM423 102h145v60H423zM602 109h82v55h-82zM716 106h141v66H716z" />
        <path d="M31 197h116v51H31zM181 190h88v61h-88zM302 188h149v55H302zM480 197h99v49h-99zM612 188h139v60H612zM779 191h83v54h-83z" />
      </g>
      <g aria-hidden="true" className={styles.mapStreets} fill="none" stroke="var(--paper)" strokeLinecap="round">
        <path d="M-20 101c153 4 247 9 379 0 169-12 337-3 561 9" strokeWidth="18" />
        <path d="M5 181c158-9 277-5 409 7 150 14 301 9 508-7" strokeWidth="15" />
        <path d="M386-10c-9 71-24 129-45 185-15 41-22 79-22 128" strokeWidth="13" />
        <path d="M657-10c-8 72-9 131 8 185 11 36 13 75 3 129" strokeWidth="13" />
      </g>
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
      <g aria-hidden="true" className={styles.mapVenueMark} transform="translate(452 45)">
        <circle cx="0" cy="0" r="38" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="29" stroke="currentColor" strokeWidth="1" />
        <path
          d="M0-25c4 7 6 12 0 20-6-8-4-13 0-20ZM25 0c-7 4-12 6-20 0 8-6 13-4 20 0ZM0 25c-4-7-6-12 0-20 6 8 4 13 0 20ZM-25 0c7-4 12-6 20 0-8 6-13 4-20 0Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <circle cx="0" cy="0" fill="currentColor" r="3.3" />
      </g>
      <g aria-hidden="true" className={styles.mapVenuePin} transform="translate(452 118)">
        <path
          d="M-23 0a23 23 0 1 1 46 0c0 15-23 28-23 28S-23 15-23 0Z"
          fill="var(--copper)"
          stroke="var(--paper)"
          strokeWidth="3"
        />
        <circle cx="0" cy="0" fill="var(--paper)" r="5" />
      </g>
      <g aria-hidden="true" className={styles.mapLabels} fill="currentColor">
        <text transform="rotate(18 125 26)" x="125" y="26">ул. Фрунзе</text>
        <text transform="rotate(20 536 161)" x="536" y="161">ул. Фрунзе</text>
        <text transform="rotate(-70 232 120)" x="232" y="120">ул. Льва Толстого</text>
        <text transform="rotate(-70 854 66)" x="854" y="66">Венцека</text>
        <text x="302" y="235">
          <tspan x="302" dy="0">АРХИТЕКТУРНЫЙ ОРИЕНТИР</tspan>
          <tspan x="302" dy="17">В РАЙОНЕ УЛ. ФРУНЗЕ</tspan>
        </text>
      </g>
      <g aria-hidden="true" className={styles.mapChurchMark} transform="translate(271 239)">
        <path d="M0-27v54M-12 27h24M-10-9h20M-8-9 0-23 8-9M-5 27V5c0-8 3-13 5-16 3 3 5 8 5 16v22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
        <path d="M0-37v10m-5-5 5-8 5 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15" />
      </g>
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
        {/* Keep the measured reference-derived cathedral bounded to the desktop edge layer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.cathedralReference}
          data-contacts-decoration="cathedral"
          data-provenance={cathedralVisual.provenance.classification}
          decoding="async"
          height={cathedralVisual.dimensions.height}
          src={cathedralVisual.path}
          width={cathedralVisual.dimensions.width}
        />
        <div aria-hidden="true" className={styles.paperLines} />
        <div aria-hidden="true" className={styles.dotField} />
        {/* Wide-desktop dot field is a bounded reference-derived decoration;
            the live CSS field remains the responsive fallback. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.dotFieldReference}
          data-contacts-decoration="dot-field"
          data-provenance={dotFieldVisual.provenance.classification}
          decoding="async"
          height={dotFieldVisual.dimensions.height}
          src={dotFieldVisual.path}
          width={dotFieldVisual.dimensions.width}
        />
        {/* Keep the measured route-panel crop bounded to the wide-desktop map footprint; the live route figure remains semantic underneath. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className={styles.routePanelReference}
          data-contacts-decoration="route-panel"
          data-provenance={routePanelVisual.provenance.classification}
          decoding="async"
          height={routePanelVisual.dimensions.height}
          src={routePanelVisual.path}
          width={routePanelVisual.dimensions.width}
        />

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
              <span aria-hidden="true" className={styles.contactIcon} data-contact-icon="true">
                <PlacePin />
              </span>
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
              <span aria-hidden="true" className={styles.contactIcon} data-contact-icon="true">
                <PhoneGlyph />
              </span>
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
              <span aria-hidden="true" className={styles.contactIcon} data-contact-icon="true">
                <ClockGlyph />
              </span>
              <span>
                <small>Режим работы</small>
                <b>Уточняйте перед визитом</b>
              </span>
              <span aria-hidden="true" className={styles.contactItemArrowSpace} />
            </div>
          </address>

          <a
            aria-label="Позвонить в кафе и забронировать столик"
            className={styles.routeButton}
            data-action="booking"
            href="tel:+78462630404"
          >
            <span>Забронировать столик</span>
            <DirectionArrow />
          </a>
          <a
            className={styles.routeLink}
            data-action="route"
            href="https://yandex.ru/maps/-/CTDBI0~o"
            rel="noopener noreferrer"
            target="_blank"
          >
            <RouteLinkGlyph />
            <span>Построить маршрут</span>
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
            <div className={styles.travelRows}>
              <div className={styles.travelRow}>
                <CarGlyph />
                <span>
                  <b>На автомобиле</b>
                  <small>Уточните удобный заезд перед визитом.</small>
                </span>
              </div>
              <div className={styles.travelRow}>
                <TransitGlyph />
                <span>
                  <b>Общественным транспортом</b>
                  <small>Актуальные остановки уточняйте у команды.</small>
                </span>
              </div>
              <div className={styles.travelRow}>
                <WalkGlyph />
                <span>
                  <b>Пешком</b>
                  <small>Откройте маршрут в Яндекс Картах.</small>
                </span>
              </div>
            </div>
          </aside>
        </figure>
      </div>
    </section>
  );
}
