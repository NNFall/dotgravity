import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "@fontsource/prata/cyrillic-400.css";
import "@fontsource-variable/montserrat/wght.css";
import "./globals.css";

import { normalizeBasePath } from "../src/config/base-path";

export const metadata: Metadata = {
  title: "Точка притяжения | Кофе, искусство и атмосфера",
  description:
    "Кофе, искусство, атмосфера и подарочные идеи на улице Фрунзе, 130.",
  keywords: [
    "Точка притяжения",
    "кофейня Самара",
    "кофе",
    "галерея",
    "сувениры",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Точка притяжения | Кофе, искусство и атмосфера",
    description:
      "Кофе, искусство, атмосфера и подарочные идеи на улице Фрунзе, 130.",
    locale: "ru_RU",
    siteName: "Точка притяжения",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Точка притяжения | Самара",
    description:
      "Кофе, искусство, атмосфера и подарочные идеи на улице Фрунзе, 130.",
  },
};

const referenceMediaBasePath = normalizeBasePath(
  process.env.DOTGRAVITY_BASE_PATH ?? "",
);

const referenceAssetStyle = {
  "--hero-cathedral-reference": `url("${referenceMediaBasePath}/media/reference-derived/hero-reference-cathedral-strip.png")`,
  "--hero-plaque-reference": `url("${referenceMediaBasePath}/media/reference-derived/hero-reference-plaque-strip.png")`,
  "--hero-dots-reference": `url("${referenceMediaBasePath}/media/reference-derived/hero-reference-dots.png")`,
  "--hero-curves-reference": `url("${referenceMediaBasePath}/media/reference-derived/hero-reference-curves-upper.png"), url("${referenceMediaBasePath}/media/reference-derived/hero-reference-curves-lower-right.png")`,
  "--contacts-plaque-reference": `url("${referenceMediaBasePath}/media/reference-derived/contacts-reference-plaque-strip.png")`,
  "--contacts-map-reference": `url("${referenceMediaBasePath}/media/reference-derived/contacts-reference-map-crop.png")`,
  "--souvenirs-paper-grain": `url("${referenceMediaBasePath}/media/generated/souvenirs-paper-grain-tile.png")`,
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body style={referenceAssetStyle}>{children}</body>
    </html>
  );
}
