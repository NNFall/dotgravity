import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

function getRule(css: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(
    new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`, "m"),
  );

  if (!match) {
    throw new Error(`Expected a ${selector} CSS rule.`);
  }

  return match[1];
}

describe("hero and about desktop visual contracts", () => {
  test("reserves the reference hero type rhythm and diagonal hairline", async () => {
    const css = await readFile(resolve(process.cwd(), "app/globals.css"), "utf8");
    const heroCopy = getRule(css, ".hero-copy");
    const heroHeading = getRule(css, ".hero-copy h1");
    const kicker = getRule(css, ".hero-kicker");
    const introduction = getRule(css, ".hero-introduction");
    const primaryCta = getRule(css, ".primary-cta");
    const photoHairline = getRule(css, ".hero-photo::before");

    expect(heroCopy).toMatch(/\bpadding:\s*clamp\(78px,\s*11vh,\s*104px\) 0 64px/);
    expect(heroHeading).toMatch(/\bfont-size:\s*clamp\(4rem,\s*4\.95vw,\s*6rem\);/);
    expect(heroHeading).toMatch(/\bline-height:\s*1\.18;/);
    expect(kicker).toMatch(/\bmargin:\s*clamp\(10px,\s*1\.5vh,\s*16px\) 0 0;/);
    expect(introduction).toMatch(/\bmargin:\s*clamp\(19px,\s*2\.8vh,\s*28px\) 0 0;/);
    expect(introduction).toMatch(/\bline-height:\s*1\.8;/);
    expect(primaryCta).toMatch(/\bmargin-top:\s*clamp\(22px,\s*2\.8vh,\s*28px\);/);
    expect(photoHairline).toMatch(/\bclip-path:\s*polygon\(/);
    expect(photoHairline).toMatch(/\bbackground:\s*rgb\(180 71 37 \/ 50%\);/);
  });

  test("opens the desktop content rail and lifts the about cathedral without leaking into mobile", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const desktopCss = css.slice(0, css.indexOf("@media (max-width: 760px)"));
    const mobileCss = css.slice(css.indexOf("@media (max-width: 760px)"));
    const features = getRule(desktopCss, ".features");
    const featureDivider = getRule(desktopCss, ".feature + .feature");
    const cathedral = getRule(desktopCss, ".cathedralBackdrop");
    const divider = getRule(desktopCss, ".feature + .feature::before");

    expect(features).toMatch(/\bwidth:\s*calc\(100% \+ 140px\);/);
    expect(features).toMatch(/\bmargin-left:\s*-82px;/);
    expect(featureDivider).toMatch(/\bposition:\s*relative;/);
    expect(divider).toMatch(/\btop:\s*40px;/);
    expect(divider).toMatch(/\bbottom:\s*16px;/);
    expect(cathedral).toMatch(/\btop:\s*calc\(9% - 45px\);/);
    expect(mobileCss).toMatch(/\.features\s*\{[\s\S]*?\bwidth:\s*100%;[\s\S]*?\bmargin-left:\s*0;/);
    expect(mobileCss).toMatch(/\.feature \+ \.feature::before\s*\{\s*display:\s*none;/);
  });
});
