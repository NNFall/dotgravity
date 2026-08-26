import { AboutSection } from "../src/components/scenes/AboutSection";
import { ContactsSection } from "../src/components/scenes/ContactsSection";
import { EventsBridge } from "../src/components/scenes/EventsBridge";
import { GallerySection } from "../src/components/scenes/GallerySection";
import { MenuSection } from "../src/components/scenes/MenuSection";
import { SouvenirsSection } from "../src/components/scenes/SouvenirsSection";
import { HeroSection } from "../src/components/hero/HeroSection";
import { SiteHeader } from "../src/components/hero/SiteHeader";
import { SiteFooter } from "../src/components/hero/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <SouvenirsSection />
        <EventsBridge />
        <ContactsSection />
      </main>
      <SiteFooter />
    </>
  );
}
