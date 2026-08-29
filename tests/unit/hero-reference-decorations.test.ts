import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { PNG } from "pngjs";
import { describe, expect, test } from "vitest";

import { mediaManifest } from "../../src/media/manifest";

const heroReferenceSha256 =
  "21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559";

const heroDecorations = [
  {
    id: "hero-reference-dots",
    file: "hero-reference-dots.png",
    sha256:
      "F129B6E8D1D580EBEC6D390E9A09E6EA46A41C4E16AD1FC85A9DFD8A6B762DB2",
    dimensions: { width: 66, height: 190 },
    crop: "x=0,y=124,w=66,h=190",
    intendedUse: "wide-desktop hero dotted decoration only",
  },
  {
    id: "hero-reference-curves-upper",
    file: "hero-reference-curves-upper.png",
    sha256:
      "6ACE71246CD7A7A37FEF75E68B0A1EB19765B0ADE9E41D964213D6AA84A14A57",
    dimensions: { width: 337, height: 130 },
    crop: "x=563,y=105,w=337,h=130",
    intendedUse: "wide-desktop hero upper curve decoration only",
  },
  {
    id: "hero-reference-curves-lower-right",
    file: "hero-reference-curves-lower-right.png",
    sha256:
      "251F5E94EA31D45801083EF0B51F90AAB57CDA694111C70EBB04A7E9A7375915",
    dimensions: { width: 260, height: 32 },
    crop: "x=640,y=235,w=260,h=32",
    intendedUse: "wide-desktop hero lower-right curve decoration only",
  },
] as const;

function readMediaBlocks(source: string) {
  const blocks: string[] = [];
  const mediaStart = /@media\s*\(([^)]+)\)\s*\{/gi;
  let match: RegExpExecArray | null;

  while ((match = mediaStart.exec(source))) {
    let depth = 1;
    let cursor = mediaStart.lastIndex;

    while (cursor < source.length && depth > 0) {
      if (source[cursor] === "{") depth += 1;
      if (source[cursor] === "}") depth -= 1;
      cursor += 1;
    }

    blocks.push(`@media (${match[1]}) {${source.slice(mediaStart.lastIndex, cursor)}`);
    mediaStart.lastIndex = cursor;
  }

  return blocks;
}

describe("bounded wide-desktop hero reference decorations", () => {
  test("registers each measured decorative crop with immutable provenance", () => {
    for (const decoration of heroDecorations) {
      const asset = mediaManifest.find((candidate) => candidate.id === decoration.id);

      expect(asset).toMatchObject({
        id: decoration.id,
        path: `/media/reference-derived/${decoration.file}`,
        sha256: decoration.sha256,
        dimensions: decoration.dimensions,
        intendedScenes: ["hero"],
        productionAllowance: {
          allowed: true,
          intendedUse: decoration.intendedUse,
          referenceShape: "bounded-reference-region",
        },
        provenance: {
          classification: "reference-derived",
          documentary: false,
          parentReferenceSha256: heroReferenceSha256,
        },
      });
      expect(asset?.provenance).toMatchObject({
        transformation: expect.stringContaining(decoration.crop),
      });
    }
  });

  test("keeps every crop intrinsically smaller than the supplied reference screen", () => {
    for (const decoration of heroDecorations) {
      const imagePath = resolve(
        process.cwd(),
        "public/media/reference-derived",
        decoration.file,
      );
      const image = PNG.sync.read(readFileSync(imagePath));

      expect({ width: image.width, height: image.height }).toEqual(
        decoration.dimensions,
      );
      expect(image.width).toBeLessThan(1672);
      expect(image.height).toBeLessThan(941);

      const asset = mediaManifest.find((candidate) => candidate.id === decoration.id);
      expect(asset?.productionAllowance.referenceShape).toBe(
        "bounded-reference-region",
      );
      expect(asset?.productionAllowance.referenceShape).not.toBe("full-reference");
    }
  });

  test("places the crops inside one 1181px wide-desktop media gate", async () => {
    const [css, layout] = await Promise.all([
      readFile(
        resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
        "utf8",
      ),
      readFile(resolve(process.cwd(), "app/layout.tsx"), "utf8"),
    ]);
    const wideDesktopBlocks = readMediaBlocks(css).filter((block) =>
      /@media\s*\(min-width:\s*1181px\)/i.test(block),
    );

    expect(wideDesktopBlocks).toHaveLength(1);
    const wideDesktop = wideDesktopBlocks[0] ?? "";

    expect(wideDesktop).toMatch(
      /:global\(\.hero-dots\)\s*\{[\s\S]*?z-index:\s*1;[\s\S]*?width:\s*66px;[\s\S]*?height:\s*190px;[\s\S]*?background-image:\s*var\(--hero-dots-reference\);[\s\S]*?background-position:\s*0\s+0;[\s\S]*?background-repeat:\s*no-repeat;[\s\S]*?background-size:\s*66px\s+190px;[\s\S]*?opacity:\s*1;/i,
    );
    expect(wideDesktop).toMatch(
      /:global\(\.hero-curves\)\s*\{[\s\S]*?top:\s*0;[\s\S]*?left:\s*0;[\s\S]*?width:\s*900px;[\s\S]*?height:\s*162px;[\s\S]*?z-index:\s*1;[\s\S]*?color:\s*transparent;[\s\S]*?background-image:\s*var\(--hero-curves-reference\);[\s\S]*?background-position:\s*563px\s+0,\s*640px\s+130px;[\s\S]*?background-repeat:\s*no-repeat,\s*no-repeat;[\s\S]*?background-size:\s*337px\s+130px,\s*260px\s+32px;/i,
    );
    expect(wideDesktop).toMatch(
      /:global\(\.hero-curves\)\s*>\s*span\s*\{[\s\S]*?display:\s*none;/i,
    );
    expect(wideDesktop).not.toMatch(/\b(?:100vw|100vh)\b/i);
    expect(layout).toMatch(
      /"--hero-dots-reference":\s*`url\(\"\$\{referenceMediaBasePath\}\/media\/reference-derived\/hero-reference-dots\.png\"\)`/,
    );
    expect(layout).toMatch(
      /"--hero-curves-reference":\s*`url\(\"\$\{referenceMediaBasePath\}\/media\/reference-derived\/hero-reference-curves-upper\.png\"\), url\(\"\$\{referenceMediaBasePath\}\/media\/reference-derived\/hero-reference-curves-lower-right\.png\"\)`/,
    );
  });

  test("does not leak the reference crop URLs into narrower media blocks", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/hero/HeroSection.module.css"),
      "utf8",
    );
    const narrowBlocks = readMediaBlocks(css).filter((block) =>
      /(?:max-width:\s*1180px|min-width:\s*(?:721|761)px)/i.test(block),
    );

    for (const decoration of heroDecorations) {
      const url = `/media/reference-derived/${decoration.file}`;
      expect(narrowBlocks.join("\n")).not.toContain(url);
    }
  });
});
