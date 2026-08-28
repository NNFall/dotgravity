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

describe("about desktop scene geometry contract", () => {
  test("keeps the desktop paper surface on the reference-calibrated copper wash", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);
    const section = getRule(desktopCss, ".section");

    expect(section).toMatch(
      /\bbackground:\s*linear-gradient\(106deg,\s*rgb\(234 219 207 \/ 38%\),\s*transparent 39%\),\s*#f4e9de;/,
    );
    expect(section).not.toMatch(/radial-gradient\(/);
    expect(mobileCss).toMatch(
      /\.section\s*\{[\s\S]*?radial-gradient\(circle at 75% 4%,\s*rgb\(255 255 255 \/ 5%\),\s*transparent 22rem\)/,
    );
  });

  test("uses a definite reference-proportional track instead of the image intrinsic height", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    const section = getRule(desktopCss, ".section");
    const photoFrame = getRule(desktopCss, ".photoFrame");
    const mobileSection = getRule(mobileCss, ".section");

    expect(section).toMatch(/\bheight:\s*max\(850px,\s*56\.28vw\);/);
    expect(photoFrame).toMatch(/\bheight:\s*100%;/);
    expect(photoFrame).toMatch(/\bmin-height:\s*0;/);
    expect(photoFrame).toMatch(
      /\bwidth:\s*min\(100%,\s*calc\(max\(850px,\s*56\.28vw\)\s*\*\s*0\.84697\)\);/,
    );
    expect(photoFrame).toMatch(
      /\bmargin:\s*0\s+0\s+0\s+max\(17px,\s*1\.016746vw\);/,
    );
    expect(photoFrame).toMatch(/\bborder:\s*0;/);
    expect(photoFrame).not.toMatch(/\bmin-height:\s*inherit;/);
    expect(mobileSection).toMatch(/\bheight:\s*auto;/);
  });

  test("fits the desktop overlay and footer to the reference rhythm without fixing the mobile card height", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    const locationCard = getRule(desktopCss, ".locationCard");
    const cathedral = getRule(desktopCss, ".locationCardCathedral");
    const footer = getRule(desktopCss, ".footerCallout");
    const cta = getRule(desktopCss, ".cta");
    const featureHeading = getRule(desktopCss, ".feature h4");
    const featureDescription = getRule(desktopCss, ".feature p");
    const featureIcon = getRule(desktopCss, ".featureIcon svg");
    const mobileLocationCard = getRule(mobileCss, ".locationCard");

    expect(locationCard).toMatch(/\bheight:\s*204px;/);
    expect(locationCard).toMatch(/\bmin-height:\s*0;/);
    expect(locationCard).toMatch(
      /\bpadding:\s*53px\s+24px\s+26px\s+clamp\(28px,\s*4\.9vw,\s*82px\);/,
    );
    expect(cathedral).toMatch(/\bwidth:\s*90px;/);
    expect(featureHeading).toMatch(/\bmargin:\s*24px 0 0;/);
    expect(featureDescription).toMatch(/\bfont-size:\s*clamp\(0\.62rem,\s*0\.72vw,\s*0\.76rem\);/);
    expect(featureDescription).toMatch(/\bline-height:\s*1\.55;/);
    expect(featureIcon).toMatch(/\bwidth:\s*58px;/);
    expect(featureIcon).toMatch(/\bheight:\s*54px;/);
    expect(footer).toMatch(/\bmargin:\s*42px auto 0;/);
    expect(footer).toMatch(/\btransform:\s*translateX\(2px\);/);
    expect(cta).toMatch(/\bmargin-top:\s*33px;/);
    expect(mobileLocationCard).toMatch(/\bheight:\s*auto;/);
  });

  test("nudges only the wide desktop about title onto the reference baseline", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.content h3\s*\{[\s\S]*?\btransform:\s*translate\(7px,\s*-4px\);/,
    );
    expect(mobileCss).not.toMatch(
      /\.content h3\s*\{[\s\S]*?\btransform:\s*translate\(7px,\s*-4px\);/,
    );
  });

  test("nudges only the wide desktop location illustration toward the reference crop", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCardCathedral\s*\{[\s\S]*?\btransform:\s*translate\(5px,\s*-14px\);/,
    );
    expect(mobileCss).not.toMatch(
      /\.locationCardCathedral\s*\{[\s\S]*?\btransform:\s*translate\(5px,\s*-14px\);/,
    );
  });

  test("keeps the wide desktop plaque copy on the measured compact vertical rhythm", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCard\s*\{[\s\S]*?\balign-content:\s*start;[\s\S]*?\bpadding-top:\s*60px;/,
    );
    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCard p\s*\{[^}]*?\bmargin-top:\s*13px;/,
    );
    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCard small\s*\{[^}]*?\bmargin-top:\s*20px;/,
    );
    expect(mobileCss).not.toMatch(/\balign-content:\s*start;/);
    expect(mobileCss).not.toMatch(/\.locationCard p\s*\{[^}]*?\bmargin-top:\s*13px;/);
    expect(mobileCss).not.toMatch(/\.locationCard small\s*\{[^}]*?\bmargin-top:\s*20px;/);
  });

  test("keeps the reference copy line length and feature gutters on wide desktop", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const desktopStart = source.indexOf("@media (min-width: 1081px)");
    const mobileStart = source.indexOf("@media (max-width: 1080px)");
    const desktopCss = source.slice(
      desktopStart,
      mobileStart === -1 ? undefined : mobileStart,
    );

    expect(desktopCss).toMatch(
      /\.introduction\s*\{[\s\S]*?\bmax-width:\s*650px;/,
    );
    expect(desktopCss).toMatch(
      /\.feature\s*\{[\s\S]*?\bpadding-inline:\s*14px;/,
    );
  });

  test("keeps a full inset frame around the wide desktop plaque without changing the mobile card", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCard::before\s*\{[^}]*?\btop:\s*14px;[^}]*?\bleft:\s*14px;[^}]*?\bwidth:\s*calc\(100%\s*-\s*28px\);[^}]*?\bheight:\s*calc\(100%\s*-\s*28px\);[^}]*?\bborder:\s*1px solid/,
    );
    expect(mobileCss).not.toMatch(/\.locationCard::before\s*\{[\s\S]*?\btop:\s*14px;/);
  });

  test("uses the measured top-only photo accent on desktop and keeps the mobile frame fallback", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const desktopStart = source.indexOf("@media (min-width: 761px)");
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = source.slice(desktopStart, mobileStart === -1 ? undefined : mobileStart);
    const mobileCss = mobileStart === -1 ? "" : source.slice(mobileStart);

    expect(desktopCss).toMatch(
      /\.photoFrame::after\s*\{[\s\S]*?\bbox-shadow:\s*inset 0 2px 0 0 rgb\(180 71 37 \/ 50%\);/,
    );
    expect(mobileCss).not.toMatch(
      /\.photoFrame::after\s*\{[\s\S]*?\bbox-shadow:\s*inset 0 2px 0 0 rgb\(180 71 37 \/ 50%\);/,
    );
  });

  test("swaps only the wide desktop plaque artwork while retaining the original mobile vector", async () => {
    const source = await readFile(
      resolve(process.cwd(), "src/components/scenes/AboutSection.module.css"),
      "utf8",
    );
    const mobileStart = source.indexOf("@media (max-width: 760px)");
    const desktopCss = mobileStart === -1 ? source : source.slice(0, mobileStart);

    expect(desktopCss).toMatch(
      /\.plaqueCathedral\s*\{\s*display:\s*none\s*!important;/,
    );
    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCardCathedral\s*>\s*svg:first-child\s*\{\s*display:\s*none;/,
    );
    expect(desktopCss).toMatch(
      /@media\s*\(min-width:\s*1081px\)\s*\{[\s\S]*?\.locationCardCathedral\s+\.plaqueCathedral\s*\{\s*display:\s*block\s*!important;/,
    );
  });
});
