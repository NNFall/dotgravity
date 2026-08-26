import type { Metadata } from "next";
import "@fontsource/prata/cyrillic-400.css";
import "@fontsource-variable/montserrat/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Точка притяжения | Кофе, искусство и редкие вещи",
  description:
    "Кофейня, бар, галерея и сувениры в историческом центре Самары.",
  icons: {
    icon: "/favicon.svg",
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
