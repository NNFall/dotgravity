import type { Metadata } from "next";
import "@fontsource/prata/cyrillic-400.css";
import "@fontsource-variable/montserrat/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Точка притяжения | Кофе, искусство и редкие вещи",
  description:
    "Кофейня, бар, галерея и сувениры в историческом центре Самары.",
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
    title: "Точка притяжения | Кофе, искусство и редкие вещи",
    description:
      "Кофейня, бар, галерея и сувениры рядом с католическим храмом в центре Самары.",
    locale: "ru_RU",
    siteName: "Точка притяжения",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Точка притяжения | Самара",
    description:
      "Кофе, искусство, атмосфера и редкие находки на улице Фрунзе, 130.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
