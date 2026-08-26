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
});
