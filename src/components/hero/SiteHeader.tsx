import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { PhosphorIcon } from "./PhosphorIcon";
import { mediaManifest } from "../../media/manifest";

const headerReferenceMark = (() => {
  const registeredMark = mediaManifest.find(
    (asset) => asset.id === "header-reference-mark",
  );

  if (!registeredMark) {
    throw new Error(
      "The bounded reference-derived header mark is required to render the desktop header.",
    );
  }

  return registeredMark;
})();

const navigationItems = [
  { href: "#about", label: "О нас" },
  { href: "#menu", label: "Меню" },
  { href: "#gallery", label: "Галерея" },
  { href: "#souvenirs", label: "Сувениры" },
  { href: "#events", label: "Мероприятия" },
  { href: "#contacts", label: "Контакты" },
];

interface SiteNavigationProps {
  className: string;
  label: string;
}

function SiteNavigation({ className, label }: SiteNavigationProps) {
  return (
    <nav aria-label={label} className={className}>
      {navigationItems.map(({ href, label: itemLabel }) => (
        <a href={href} key={href}>
          {itemLabel}
        </a>
      ))}
    </nav>
  );
}

export function SiteHeader({ presentation = false }: { presentation?: boolean } = {}) {
  return (
    <header
      aria-hidden={presentation ? "true" : undefined}
      className="site-header"
      data-reference-header={presentation ? "contacts" : undefined}
      inert={presentation ? true : undefined}
    >
      <a aria-label="Точка притяжения, в начало страницы" className="brand-lockup" href="#hero">
        <BrandMark className="brand-lockup__mark" />
        {/* eslint-disable-next-line @next/next/no-img-element -- bounded reference crop preserves exact pixels */}
        <img
          alt=""
          aria-hidden="true"
          className="brand-lockup__reference-mark"
          data-provenance="reference-derived"
          data-reference-crop="desktop"
          height={49}
          src={headerReferenceMark.path}
          width={47}
        />
        <span className="brand-lockup__copy">
          <span className="brand-lockup__name">Точка притяжения</span>
          <span className="brand-lockup__descriptor">Кофейня · бар · галерея · сувениры</span>
        </span>
      </a>

      <SiteNavigation className="site-header__nav" label="Разделы сайта" />

      <address className="site-header__contacts">
        <a
          aria-label="Самара, ул. Фрунзе, 130"
          className="site-header__address"
          href="#contacts"
        >
          <PhosphorIcon aria-hidden="true" name="mapPin" size={39} weight="light" />
          <span className="site-header__address-copy">
            <span>Самара, </span>
            <span>ул. Фрунзе, 130</span>
          </span>
        </a>
        <a className="site-header__phone" href="tel:+78462630404">
          <PhosphorIcon aria-hidden="true" name="phone" size={34} weight="light" />
          <span>+7 (846) 263-04-04</span>
        </a>
      </address>

      {presentation ? null : <MobileNav items={navigationItems} />}
    </header>
  );
}
