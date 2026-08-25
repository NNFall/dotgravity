# Visual baseline approvals

`qa:visual:update` is intentionally closed unless a committed approval record
documents explicit user approval for every affected baseline. This directory
contains the schema and, only when real approval exists, the reviewed JSON
records. The README is not an approval record.

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
4. Review and commit that record. The validator rejects untracked, staged-only,
   or locally modified records, as well as approval paths outside this
   directory.
5. Point the guarded command to that committed record and run it:

   ```powershell
   $env:DOTGRAVITY_VISUAL_APPROVAL_FILE = 'docs/visual-approvals/<approved-record>.json'
   npm.cmd run qa:visual:update
   Remove-Item Env:\DOTGRAVITY_VISUAL_APPROVAL_FILE
   ```

The validator logs the approval ID, user approval reference, reason, timestamp,
and every affected `scene@viewport` hash transition before Playwright starts.
If the produced hash differs from `proposedSha256`, stop and obtain a new exact
approval; do not edit the record or accept the replacement silently.

To validate a record without running Playwright:

```powershell
node scripts/verify-visual-update-approval.mjs docs/visual-approvals/<approved-record>.json
```
