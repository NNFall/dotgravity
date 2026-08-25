"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

export interface MobileNavigationItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  items: readonly MobileNavigationItem[];
}

const mobileNavigationId = "mobile-site-navigation";

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (shouldRestoreFocus = false) => {
    restoreFocusRef.current = shouldRestoreFocus;
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      if (restoreFocusRef.current) {
        triggerRef.current?.focus();
        restoreFocusRef.current = false;
      }

      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const documentWidth = document.documentElement.clientWidth;
    const scrollbarWidth =
      documentWidth > 0 ? Math.max(0, window.innerWidth - documentWidth) : 0;
    const currentPaddingRight = Number.parseFloat(
      window.getComputedStyle(document.body).paddingRight,
    );
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");

    firstLink?.focus();
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${(Number.isNaN(currentPaddingRight) ? 0 : currentPaddingRight) + scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      const firstFocusable = focusableElements.at(0);
      const lastFocusable = focusableElements.at(-1);

      if (!firstFocusable || !lastFocusable) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls={mobileNavigationId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Закрыть разделы сайта" : "Открыть разделы сайта"}
        className="mobile-nav-trigger"
        onClick={() => {
          if (isOpen) {
            closeMenu(true);
            return;
          }

          setIsOpen(true);
        }}
        ref={triggerRef}
        type="button"
      >
        <List aria-hidden="true" size={28} weight="light" />
        <span>Разделы</span>
      </button>

      {isOpen ? (
        <div aria-label="Навигация сайта" aria-modal="true" className="mobile-nav-layer" role="dialog">
          <button
            aria-label="Закрыть меню нажатием вне панели"
            className="mobile-nav__backdrop"
            onClick={() => closeMenu(true)}
            tabIndex={-1}
            type="button"
          />
          <div className="mobile-nav__panel" ref={panelRef}>
            <div className="mobile-nav__heading">
              <span>Разделы</span>
              <button
                aria-label="Закрыть меню"
                className="mobile-nav__close"
                onClick={() => closeMenu(true)}
                type="button"
              >
                <X aria-hidden="true" size={24} weight="light" />
              </button>
            </div>
            <nav
              aria-label="Мобильные разделы сайта"
              className="mobile-nav__links"
              id={mobileNavigationId}
            >
              {items.map(({ href, label }) => (
                <a href={href} key={href} onClick={() => closeMenu(false)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
