import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const galleryStylesheet = readFileSync(
  resolve(process.cwd(), "src/components/scenes/GallerySection.module.css"),
  "utf8",
);
const mobileBreakpoint = "@media (max-width: 900px)";
const mobileBreakpointIndex = galleryStylesheet.indexOf(mobileBreakpoint);

if (mobileBreakpointIndex < 0) {
  throw new Error("The Gallery mobile breakpoint is required for this contract.");
}

const desktopStyles = galleryStylesheet.slice(0, mobileBreakpointIndex);
const mobileStyles = galleryStylesheet.slice(mobileBreakpointIndex);

describe("gallery desktop canvas contract", () => {
  test("keeps the desktop paper surface flat at the reference-calibrated tone", () => {
    expect(desktopStyles).toMatch(
      /\.galleryScene\s*\{[^}]*\bbackground:\s*#f6e9de\s*;/,
    );
    expect(desktopStyles).not.toMatch(
      /\.galleryScene\s*\{[^}]*radial-gradient\(/,
    );
    expect(desktopStyles).not.toMatch(
      /\.galleryScene\s*\{[^}]*linear-gradient\(/,
    );
    expect(mobileStyles).toMatch(
      /\.galleryScene\s*\{[\s\S]*?radial-gradient\(circle at 57% 18%,\s*rgb\(255 255 255 \/ 10%\),\s*transparent 25rem\)/,
    );
  });

  test("keeps the desktop copy aligned to the reference story rhythm", () => {
    expect(desktopStyles).toMatch(
      /\.composition\s*\{[^}]*\bheight:\s*max\(\s*941px\s*,\s*56\.28vw\s*\)\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.copy\s*\{[^}]*\bposition:\s*absolute\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.copy\s*\{[^}]*\bdisplay:\s*flex\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.copy\s*\{[^}]*\bheight:\s*100%\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.copy\s*\{[^}]*\bjustify-content:\s*flex-start\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.copy\s+h2\s*\{[^}]*\bmargin:\s*22px\s+0\s+0\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.introduction\s*\{[^}]*\bmargin:\s*14px\s+0\s+0\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.introduction\s*\{[^}]*\bfont-size:\s*0\.9rem\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.storyDetails\s*\{[^}]*\bmargin:\s*25px\s+0\s+0\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.featureList\s*\{[^}]*\bmargin:\s*44px\s+0\s+0\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.motto\s*\{[^}]*\bmargin:\s*auto\s+0\s+0\s+-11px\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.mainPhoto\s*\{[^}]*\bleft:\s*40\.43%\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.mainPhoto\s*\{[^}]*\btop:\s*52px\s*;[^}]*\bwidth:\s*582px\s*;[^}]*\bheight:\s*830px\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.mainPhoto\s+img\s*\{[^}]*\bwidth:\s*582px\s*;[^}]*\bheight:\s*830px\s*;[^}]*\btransform:\s*none\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.composition::after\s*\{[^}]*transform:\s*translate\(-13px,\s*0\)\s*;/,
    );
    expect(desktopStyles).toMatch(
      /\.inset\s*\{[^}]*overflow:\s*visible\s*;/,
    );
    expect(desktopStyles).toMatch(
      /@media\s*\(min-width:\s*901px\)[\s\S]*?\.inset\s+img\s*\{[^}]*border-radius:\s*0\s*;/,
    );
    expect(desktopStyles).toMatch(/\.artInset\s*\{[^}]*top:\s*261px\s*;/);
    expect(desktopStyles).toMatch(/\.spaceInset\s*\{[^}]*top:\s*513px\s*;/);
    expect(mobileStyles).toMatch(
      /\.composition\s*\{[^}]*\bheight:\s*auto\s*;/,
    );
    expect(mobileStyles).toMatch(
      /\.copy\s*\{[^}]*\bposition:\s*relative\s*;/,
    );
    expect(mobileStyles).toMatch(
      /\.copy\s*\{[^}]*\bdisplay:\s*block\s*;/,
    );
    expect(mobileStyles).toMatch(
      /\.copy\s*\{[^}]*\bheight:\s*auto\s*;/,
    );
  });

  test("nudges the reference-calibrated desktop gallery heading down by two pixels", () => {
    expect(desktopStyles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.copy\s+h2\s*\{[^}]*\btransform:\s*translateY\(2px\)\s*;/,
    );
    expect(mobileStyles).not.toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.copy\s+h2\s*\{[^}]*\btransform:\s*translateY\(2px\)\s*;/,
    );
  });

  test("moves the wide desktop gallery CTA into the reference story rhythm", () => {
    expect(desktopStyles).toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.storyDetails\s*\{[^}]*\bmargin-top:\s*77px\s*;/,
    );
    expect(mobileStyles).not.toMatch(
      /@media\s*\(min-width:\s*1440px\)[\s\S]*?\.storyDetails\s*\{[^}]*\bmargin-top:\s*77px\s*;/,
    );
  });
});
