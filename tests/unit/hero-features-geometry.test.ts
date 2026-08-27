import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

describe("hero feature rail geometry", () => {
  test("nudges the desktop rail down by one pixel without leaking into mobile", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );
    const desktopBlocks = css.match(/@media \(min-width: 721px\) \{[\s\S]*?(?=\n@media|$)/g) ?? [];
    const mobileBlocks = css.match(/@media \(max-width: 720px\) \{[\s\S]*?(?=\n@media|$)/g) ?? [];

    expect(desktopBlocks.join("\n")).toContain("transform: translateY(1px);");
    expect(mobileBlocks.join("\n")).not.toContain("transform: translateY(1px);");
  });
});
