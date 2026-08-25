import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

interface PackageJson {
  scripts?: Record<string, string>;
}

describe("visual baseline update command", () => {
  test("is a preflight-only plan and cannot invoke snapshot mutation", () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
    ) as PackageJson;
    const planCommand = packageJson.scripts?.["qa:visual:plan"];
    const updateCommand = packageJson.scripts?.["qa:visual:update"];

    expect(planCommand).toBe(
      "node scripts/verify-visual-update-approval.mjs",
    );
    expect(updateCommand).toBe("npm run qa:visual:plan");
    expect(`${planCommand}\n${updateCommand}`).not.toMatch(
      /playwright|update-snapshots/i,
    );
  });
});
