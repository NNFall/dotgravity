import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const serverHeroModules = ["HeroSection.tsx", "SiteHeader.tsx"] as const;
const heroSourceDirectory = resolve(process.cwd(), "src/components/hero");
const iconBoundarySource = readFileSync(
  resolve(heroSourceDirectory, "PhosphorIcon.tsx"),
  "utf8",
);

describe("hero icon runtime boundary", () => {
  test("keeps Phosphor out of server-rendered hero modules", () => {
    for (const moduleName of serverHeroModules) {
      const source = readFileSync(resolve(heroSourceDirectory, moduleName), "utf8");

      expect(source).not.toContain("@phosphor-icons/react");
    }
  });

  test("defines a client boundary that owns the server-facing Phosphor import", () => {
    expect(iconBoundarySource).toMatch(/^"use client";\r?\n/);
    expect(iconBoundarySource).toContain("@phosphor-icons/react");
  });
});
