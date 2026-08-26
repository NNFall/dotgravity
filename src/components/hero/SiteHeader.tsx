import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { PhosphorIcon } from "./PhosphorIcon";

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
        <span className="brand-lockup__copy">
          <span className="brand-lockup__name">Точка притяжения</span>
          <span className="brand-lockup__descriptor">Кофейня · бар · галерея · сувениры</span>
        </span>
      </a>

      <SiteNavigation className="site-header__nav" label="Разделы сайта" />

      <address className="site-header__contacts">
        <a className="site-header__address" href="#contacts">
          <PhosphorIcon aria-hidden="true" name="mapPin" size={39} weight="light" />
          <span>Самара, ул. Фрунзе, 130</span>
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
