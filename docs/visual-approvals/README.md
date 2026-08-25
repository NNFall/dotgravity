# Visual baseline approvals

`qa:visual:update` is currently a preflight-only candidate-update plan. It
validates a committed approval record and prints an auditable report, but it
does not launch Playwright, write snapshots, or mutate authoritative baselines.
The mutation phase stays closed until the dedicated Task 10 candidate pipeline
exists. This directory contains the schema and, only when real approval exists,
the reviewed JSON records. The README is not an approval record.

## Approval record schema

Create a new `.json` file in this directory only after the user has reviewed
the proposed visual change and approved the exact affected records. Do not copy
the template as-is; every placeholder must be replaced with evidence from that
approval.

```json
{
  "id": "<stable non-empty approval ID>",
  "userApprovalReference": "<permalink or exact task/message reference>",
  "reason": "<written reason for changing these baselines>",
  "requestedAt": "<ISO 8601 timestamp with timezone>",
  "affectedBaselines": [
    {
      "scene": "<scene ID from the baseline manifest>",
      "viewport": "<viewport directory, for example 1672x941>",
      "previousSha256": "<64-character SHA-256 currently in the manifest>",
      "proposedSha256": "<different 64-character SHA-256 approved by the user>"
    }
  ]
}
```

Each `scene` and `viewport` pair must be unique. `previousSha256` must match
both the committed baseline manifest and the current baseline file.
`proposedSha256` must identify the exact candidate the user reviewed; a broad
approval to “refresh snapshots” is not sufficient.

## Review and run procedure

1. Capture the proposed output without replacing an authoritative baseline.
2. Compute its SHA-256 and show the before/after evidence to the user.
3. Record the explicit approval reference, reason, timestamp, current hash and
   proposed hash in a new JSON file under this directory.
4. Review and commit that record. The validator compares the current bytes of
   the approval, baseline manifest, and referenced baseline files with their
   exact `HEAD` blobs. It rejects missing committed blobs, local byte changes
   (including changes hidden with Git index flags), and approval paths outside
   this directory.
5. Point the guarded preflight command to that committed record and run it:

   ```powershell
   $env:DOTGRAVITY_VISUAL_APPROVAL_FILE = 'docs/visual-approvals/<approved-record>.json'
   npm.cmd run qa:visual:update
   Remove-Item Env:\DOTGRAVITY_VISUAL_APPROVAL_FILE
   ```

`qa:visual:update` delegates only to `qa:visual:plan`. A successful run logs the
approval ID, user approval reference, reason, timestamp, every affected
`scene@viewport` hash transition, and an explicit statement that no files were
changed. Success means the plan passed preflight; it does not mean a baseline
was regenerated or approved for automatic replacement.

The canonical preflight-only command is also available directly:

```powershell
npm.cmd run qa:visual:plan -- docs/visual-approvals/<approved-record>.json
```

## Task 10 mutation requirements

No baseline mutation command may be connected to this preflight until Task 10
adds all of the following controls:

1. Generate candidates into a separate staging directory, never directly over
   authoritative baselines.
2. Restrict the candidate set and every eventual write to the exact approved
   `scene@viewport` records; reject missing or additional files.
3. Hash every staged candidate after generation and require its actual SHA-256
   to equal the corresponding approved `proposedSha256` before any promotion.
4. Promote the exact approved set and update its manifests as one controlled
   operation, then re-hash the authoritative files and require the same hashes.
5. On any path or hash deviation, fail without partial acceptance and restore
   or quarantine the candidate state so the prior authoritative baselines stay
   recoverable.

Until those controls are implemented and reviewed, use the preflight report as
planning evidence only. Never append a Playwright `--update-snapshots` command
or replace a baseline manually after this check.
