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
    const mobileLocationCard = getRule(mobileCss, ".locationCard");

    expect(locationCard).toMatch(/\bheight:\s*204px;/);
    expect(locationCard).toMatch(/\bmin-height:\s*0;/);
    expect(cathedral).toMatch(/\bwidth:\s*90px;/);
    expect(footer).toMatch(/\bmargin:\s*clamp\(20px,\s*2\.2vh,\s*24px\) auto 0;/);
    expect(cta).toMatch(/\bmargin-top:\s*34px;/);
    expect(mobileLocationCard).toMatch(/\bheight:\s*auto;/);
  });
});
