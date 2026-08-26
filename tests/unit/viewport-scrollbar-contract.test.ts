import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const stylesheet = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
const rootScrollRules = [...stylesheet.matchAll(
  /(?:^|\n)[ \t]*(?:html|body) \{([\s\S]*?)\n[ \t]*\}/g,
)].map(([, declarations]) => declarations);

describe("desktop viewport scrollbar contract", () => {
  test("hides only the desktop scrollbar presentation without locking document scrolling", () => {
    expect(stylesheet).toMatch(
      /@media \(min-width: 721px\) \{[\s\S]*?html \{\s*scrollbar-width: none;\s*\}[\s\S]*?html::-webkit-scrollbar \{\s*display: none;\s*\}/,
    );
    expect(rootScrollRules.join("\n")).not.toMatch(
      /\boverflow(?:-y)?\s*:\s*(?:hidden|clip)\b/,
    );
  });
});
