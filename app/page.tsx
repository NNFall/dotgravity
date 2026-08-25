import { HeroSection } from "../src/components/hero/HeroSection";
import { SiteHeader } from "../src/components/hero/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <HeroSection />
      </main>
    </>
  );
}
