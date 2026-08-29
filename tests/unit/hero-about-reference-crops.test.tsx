import { render } from "@testing-library/react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { HeroSection } from "../../src/components/hero/HeroSection";
import { AboutSection } from "../../src/components/scenes/AboutSection";
import { mediaManifest } from "../../src/media/manifest";

const heroReferenceId = "hero-reference-photo";
const aboutReferenceId = "about-reference-arch";

describe("bounded hero and about reference crops", () => {
  test("registers exact, non-documentary crops with their source coordinates", () => {
    const heroCrop = mediaManifest.find((asset) => asset.id === heroReferenceId);
    const aboutCrop = mediaManifest.find((asset) => asset.id === aboutReferenceId);

    expect(heroCrop).toMatchObject({
      path: "/media/reference-derived/hero-reference-photo.png",
      sha256:
        "789791B7809699ABDA65EBF2D2AB03A9E2EE2448FB43D12CA24AE0F12FBAC624",
      dimensions: { width: 947, height: 836 },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559",
      },
      productionAllowance: {
        allowed: true,
        referenceShape: "bounded-reference-region",
      },
    });
    expect(heroCrop?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=725,y=105,w=947,h=836"),
    });
    if (heroCrop?.provenance.classification === "reference-derived") {
      expect(heroCrop.provenance.transformation).toMatch(/inpaint/i);
    }

    expect(aboutCrop).toMatchObject({
      path: "/media/reference-derived/about-reference-arch.png",
      dimensions: { width: 797, height: 941 },
      provenance: {
        classification: "reference-derived",
        documentary: false,
        parentReferenceSha256:
          "5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9",
      },
      productionAllowance: {
        allowed: true,
        referenceShape: "bounded-reference-region",
      },
    });
    expect(aboutCrop?.provenance).toMatchObject({
      transformation: expect.stringContaining("x=17,y=0,w=797,h=941"),
    });
  });

  test("keeps reference-derived layers bounded to desktop photo regions", () => {
    const { container: heroContainer } = render(<HeroSection />);
    const heroCrop = heroContainer.querySelector<HTMLImageElement>(
      '[data-reference-crop="desktop"][data-provenance="reference-derived"]',
    );
    expect(heroCrop).toHaveAttribute(
      "src",
      "/media/reference-derived/hero-reference-photo.png",
    );
    expect(heroCrop).toHaveAttribute("aria-hidden", "true");

    const { container: aboutContainer } = render(<AboutSection />);
    const aboutCrop = aboutContainer.querySelector<HTMLImageElement>(
      '[data-reference-crop="desktop"][data-provenance="reference-derived"]',
    );
    expect(aboutCrop).toHaveAttribute(
      "src",
      "/media/reference-derived/about-reference-arch.png",
    );
    expect(aboutCrop).toHaveAttribute("aria-hidden", "true");
  });

  test("documents desktop-only switching and keeps the baseline out of source", async () => {
    const [heroCss, aboutCss, heroSource, aboutSource, globalCss] = await Promise.all([
      readFile(resolve(process.cwd(), "src/components/hero/HeroSection.module.css"), "utf8"),
      readFile(
        resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
        "utf8",
      ),
      readFile(resolve(process.cwd(), "src/components/hero/HeroSection.tsx"), "utf8"),
      readFile(
        resolve(process.cwd(), "src/components/scenes/AboutSection.tsx"),
        "utf8",
      ),
      readFile(resolve(process.cwd(), "app/globals.css"), "utf8"),
    ]);

    expect(heroCss).toMatch(/@media\s*\(min-width:\s*721px\)/);
    expect(heroCss).toMatch(/referenceCrop[\s\S]*display:\s*block/);
    expect(globalCss).toMatch(/\.hero-kicker[\s\S]*letter-spacing:\s*-0\.02em/);
    expect(globalCss).toMatch(/\.hero-features svg[\s\S]*width:\s*62px/);
    expect(aboutCss).toMatch(/@media\s*\(min-width:\s*761px\)/);
    expect(aboutCss).toMatch(/referenceCrop[\s\S]*display:\s*block/);
    expect(heroSource).not.toMatch(/tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i);
    expect(aboutSource).not.toMatch(/tests\/visual\/baselines|referenceAtlas|rawComparedPixels/i);
  });

  test("locks the measured desktop hero paper, cathedral, and copy rhythm in the hero module", async () => {
    const heroCss = await readFile(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(heroCss).toContain("@media (min-width: 721px)");
    expect(heroCss).toContain(":global(.hero-scene) {");
    expect(heroCss).toContain(":global(.hero-photo)::after {");
    expect(heroCss).toContain("display: none;");
    expect(heroCss).toContain("background: #f6ebe0;");
    expect(heroCss).toContain("width: clamp(108px, 6.46vw, 128px);");
    expect(heroCss).toContain(
      "height: calc(clamp(108px, 6.46vw, 128px) * 5.009259);",
    );
    expect(heroCss).toContain(
      "background-image: var(--hero-cathedral-reference);",
    );
    expect(heroCss).toContain("transform: translate(-6px, 3px);");
    expect(heroCss).toContain("letter-spacing: -0.01em;");
    expect(heroCss).toContain("font-size: clamp(0.9rem, 1.09vw, 1.14rem);");
    expect(heroCss).toContain("line-height: 1.736;");
  });

  test("locks the desktop dot-grid registration without changing mobile behavior", async () => {
    const heroCss = await readFile(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );

    expect(heroCss).toMatch(
      /@media\s*\(min-width:\s*721px\)[\s\S]*?\.hero-dots[\s\S]*?background-position:\s*-4px\s+-2px;[\s\S]*?opacity:\s*0\.3;/,
    );
    const mobileRules =
      heroCss.match(/@media\s*\(max-width:\s*720px\)[\s\S]*?(?=\n@media|$)/)?.[0] ?? "";
    expect(mobileRules).not.toContain("background-position: -4px -2px;");
  });
});
