import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

import { validateVisualUpdateApproval } from "../../scripts/verify-visual-update-approval.mjs";

interface ApprovalRecord {
  id: string;
  userApprovalReference: string;
  reason: string;
  requestedAt: string;
  affectedBaselines: Array<{
    scene: string;
    viewport: string;
    previousSha256: string;
    proposedSha256: string;
  }>;
}

interface FixtureOptions {
  approvalRelativePath?: string;
  approvalOverrides?: Partial<ApprovalRecord>;
  hideApprovalMutationFromGit?: boolean;
  hideManifestMutationFromGit?: boolean;
  modifyApprovalAfterCommit?: boolean;
  trackApproval?: boolean;
  tamperBaseline?: boolean;
}

const temporaryRoots: string[] = [];
const malformedApprovalCases: Array<
  [string, Partial<ApprovalRecord>, RegExp]
> = [
  ["id", { id: "" }, /\bid\b/i],
  [
    "user approval reference",
    { userApprovalReference: "" },
    /userApprovalReference/i,
  ],
  ["reason", { reason: "" }, /reason/i],
  ["requested timestamp", { requestedAt: "yesterday" }, /requestedAt/i],
  ["affected baselines", { affectedBaselines: [] }, /affectedBaselines/i],
  [
    "previous hash",
    {
      affectedBaselines: [
        {
          scene: "hero",
          viewport: "1672x941",
          previousSha256: "",
          proposedSha256: "F".repeat(64),
        },
      ],
    },
    /previousSha256/i,
  ],
  [
    "proposed hash",
    {
      affectedBaselines: [
        {
          scene: "hero",
          viewport: "1672x941",
          previousSha256: "F".repeat(64),
          proposedSha256: "",
        },
      ],
    },
    /proposedSha256/i,
  ],
];

const sha256 = (bytes: Buffer | string) =>
  createHash("sha256").update(bytes).digest("hex").toUpperCase();

const writeJson = (path: string, value: unknown) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const createFixture = (options: FixtureOptions = {}) => {
  const repoRoot = mkdtempSync(join(tmpdir(), "dotgravity-approval-"));
  temporaryRoots.push(repoRoot);

  const viewport = "1672x941";
  const scene = "hero";
  const baselineRelativePath = `tests/visual/baselines/${viewport}/hero.png`;
  const manifestRelativePath = `tests/visual/baselines/${viewport}/manifest.json`;
  const approvalRelativePath =
    options.approvalRelativePath ??
    "docs/visual-approvals/approval-001.json";
  const baselineBytes = Buffer.from("current hero baseline", "utf8");
  const previousSha256 = sha256(baselineBytes);
  const proposedSha256 = sha256("proposed hero baseline");

  mkdirSync(join(repoRoot, dirname(baselineRelativePath)), {
    recursive: true,
  });
  writeFileSync(join(repoRoot, baselineRelativePath), baselineBytes);
  writeJson(join(repoRoot, manifestRelativePath), {
    scenes: [
      {
        sceneId: scene,
        file: "hero.png",
        width: 1672,
        height: 941,
        rawComparedPixels: 1573352,
        sha256: previousSha256,
      },
    ],
  });
  mkdirSync(join(repoRoot, "docs/visual-approvals"), { recursive: true });
  writeFileSync(
    join(repoRoot, "docs/visual-approvals/README.md"),
    "fixture\n",
    "utf8",
  );

  const approval: ApprovalRecord = {
    id: "approval-001",
    userApprovalReference: "user-message-2026-08-25",
    reason: "Replace the hero baseline after explicit visual review.",
    requestedAt: "2026-08-25T19:00:00.000Z",
    affectedBaselines: [
      {
        scene,
        viewport,
        previousSha256,
        proposedSha256,
      },
    ],
    ...options.approvalOverrides,
  };
  writeJson(join(repoRoot, approvalRelativePath), approval);

  execFileSync("git", ["init", "--quiet"], { cwd: repoRoot });
  const trackedPaths = [
    baselineRelativePath,
    manifestRelativePath,
    "docs/visual-approvals/README.md",
  ];
  if (options.trackApproval !== false) {
    trackedPaths.push(approvalRelativePath);
  }
  execFileSync(
    "git",
    ["-c", "core.autocrlf=false", "add", "--", ...trackedPaths],
    { cwd: repoRoot },
  );
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Visual Approval Test",
      "-c",
      "user.email=visual-approval-test@example.invalid",
      "commit",
      "--quiet",
      "-m",
      "fixture",
    ],
    { cwd: repoRoot },
  );

  if (options.modifyApprovalAfterCommit) {
    writeJson(join(repoRoot, approvalRelativePath), {
      ...approval,
      reason: "Changed after review without a commit.",
    });
  }

  if (options.hideApprovalMutationFromGit) {
    execFileSync(
      "git",
      ["update-index", "--assume-unchanged", "--", approvalRelativePath],
      { cwd: repoRoot },
    );
    writeJson(join(repoRoot, approvalRelativePath), {
      ...approval,
      reason: "Changed after review and hidden from ordinary Git diff checks.",
    });
  }

  if (options.hideManifestMutationFromGit) {
    execFileSync(
      "git",
      ["update-index", "--assume-unchanged", "--", manifestRelativePath],
      { cwd: repoRoot },
    );
    const manifestPath = join(repoRoot, manifestRelativePath);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      scenes: unknown[];
    };
    writeJson(manifestPath, {
      ...manifest,
      hiddenTampering: "ordinary Git diff checks do not report this change",
    });
  }

  if (options.tamperBaseline) {
    writeFileSync(
      join(repoRoot, baselineRelativePath),
      "tampered after manifest",
      "utf8",
    );
  }

  return {
    approvalPath: join(repoRoot, approvalRelativePath),
    baselinePath: join(repoRoot, baselineRelativePath),
    repoRoot,
  };
};

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe("visual baseline update approval", () => {
  test("rejects an update when no approval file is supplied", () => {
    const { repoRoot } = createFixture();

    expect(() =>
      validateVisualUpdateApproval({ repoRoot }),
    ).toThrow(/approval JSON file path/i);
  });

  test("rejects approval files outside the tracked approvals directory", () => {
    const { approvalPath, repoRoot } = createFixture({
      approvalRelativePath: "docs/outside-approval.json",
    });

    expect(() =>
      validateVisualUpdateApproval({ approvalPath, repoRoot }),
    ).toThrow(/docs[/\\]visual-approvals/i);
  });

  test("rejects an untracked approval record", () => {
    const untracked = createFixture({ trackApproval: false });
    expect(() =>
      validateVisualUpdateApproval({
        approvalPath: untracked.approvalPath,
        repoRoot: untracked.repoRoot,
      }),
    ).toThrow(/committed HEAD blob/i);
  });

  test.each(malformedApprovalCases)(
    "rejects a malformed %s field",
    (_label, approvalOverrides, expectedError) => {
      const malformed = createFixture({ approvalOverrides });
      expect(() =>
        validateVisualUpdateApproval({
          approvalPath: malformed.approvalPath,
          repoRoot: malformed.repoRoot,
        }),
      ).toThrow(expectedError);
    },
  );

  test("rejects a manifest whose hash no longer matches its baseline", () => {
    const { approvalPath, repoRoot } = createFixture({
      tamperBaseline: true,
    });

    expect(() =>
      validateVisualUpdateApproval({ approvalPath, repoRoot }),
    ).toThrow(/manifest hash.*current file/i);
  });

  test("rejects a tracked approval record changed after review", () => {
    const { approvalPath, repoRoot } = createFixture({
      modifyApprovalAfterCommit: true,
    });

    expect(() =>
      validateVisualUpdateApproval({ approvalPath, repoRoot }),
    ).toThrow(/committed|unmodified|working tree/i);
  });

  test("rejects approval tampering hidden by assume-unchanged", () => {
    const { approvalPath, repoRoot } = createFixture({
      hideApprovalMutationFromGit: true,
    });

    expect(() =>
      validateVisualUpdateApproval({
        approvalPath,
        repoRoot,
        log: () => undefined,
      }),
    ).toThrow(/committed HEAD blob|current bytes/i);
  });

  test("rejects manifest tampering hidden by assume-unchanged", () => {
    const { approvalPath, repoRoot } = createFixture({
      hideManifestMutationFromGit: true,
    });

    expect(() =>
      validateVisualUpdateApproval({
        approvalPath,
        repoRoot,
        log: () => undefined,
      }),
    ).toThrow(/baseline manifest.*committed HEAD blob|current bytes/i);
  });

  test("accepts and reports an exact tracked approval without mutating baselines", () => {
    const { approvalPath, baselinePath, repoRoot } = createFixture();
    const output: string[] = [];
    const baselineBefore = readFileSync(baselinePath);

    const approval = validateVisualUpdateApproval({
      approvalPath,
      repoRoot,
      log: (line: string) => output.push(line),
    });

    expect(approval.id).toBe("approval-001");
    expect(approval.mutatesFiles).toBe(false);
    expect(readFileSync(baselinePath)).toEqual(baselineBefore);
    expect(output.join("\n")).toContain("approval-001");
    expect(output.join("\n")).toContain(
      "Replace the hero baseline after explicit visual review.",
    );
    expect(output.join("\n")).toContain("hero@1672x941");
    expect(output.join("\n")).toMatch(/preflight/i);
    expect(output.join("\n")).toMatch(/no files (?:were )?changed/i);
    expect(output.join("\n")).toMatch(/Task 10/i);
  });
});
