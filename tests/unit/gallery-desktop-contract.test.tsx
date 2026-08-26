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
      /\.introduction\s*\{[^}]*\bfont-size:\s*0\.875rem\s*;/,
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
      /\.mainPhoto\s*\{[^}]*\bleft:\s*39\.3%\s*;/,
    );
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
});
