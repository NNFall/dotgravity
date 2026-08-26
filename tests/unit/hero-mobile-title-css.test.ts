import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const stylesheet = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
const mobileHeroTitleRule = stylesheet.match(
  /@media \(max-width: 720px\) \{[\s\S]*?\.hero-copy h1 \{([\s\S]*?)\n  \}/,
);

describe("mobile hero title scale", () => {
  test("caps the narrow-screen display type without changing the desktop scale", () => {
    expect(mobileHeroTitleRule?.[1]).toContain(
      "font-size: clamp(2.25rem, 11vw, 2.75rem);",
    );
    expect(mobileHeroTitleRule?.[1]).not.toContain("15vw");
    expect(stylesheet).toContain(
      "font-size: clamp(4.25rem, 5.86vw, 6.13rem);",
    );
  });
});
