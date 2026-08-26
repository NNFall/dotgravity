# Operations log

## 2026-08-25

- Confirmed the local workspace was empty and the remote Git repository was reachable but had no refs.
- Initialized Git on branch `feat/pixel-accurate-landing` and added `origin` for `NNFall/dotgravity`.
- Inspected all seven supplied images at original resolution. Classified six beige/copper «Точка притяжения» screens as targets and the orange «Комод» screen as a non-target quality reference.
- Loaded prior «Точка притяжения» research context and inspected five Yandex documentary photos plus two generated concept images. Fresh source verification remains pending.
- Started independent read-only subagent audits for reference geometry, asset provenance, pixel-QA architecture and current public-source status.
- Started Antigravity analysis job `66631933-3403-48d6-89bd-09c565734904` for independent visual-risk review.
- Source recheck agent directly opened the Yandex organisation card and confirmed current card facts; the supplied Yandex short link and VK group were blocked without bypass attempts. Updated the provenance register with exact access status.
- Wrote and self-reviewed the detailed design specification, PRODUCT/DESIGN context and Impeccable sidecar; committed them as `1765242`.
- The Sites initializer correctly refused to overwrite existing docs, so it was run in a temporary in-workspace folder. After checking there were no destination collisions, the official Vinext/React/TypeScript scaffold was copied into the project root; temporary files were removed through explicit file patches.
- Added the implementation plan with TDD, first-meaningful-preview, provenance, Image Generation, raw pixel comparison, multi-agent review, hosting and Git gates.
- Installed the official scaffold dependencies. Baseline lint and Vinext production build passed.
- Production dependency audit initially found published advisories in scaffolded Next 16.2.6. Updated within the same major to Next 16.3.3, reran lint/build successfully, and confirmed `npm audit --omit=dev` reports zero production vulnerabilities. Development-tool advisories remain to be re-audited after QA packages are installed; no forced audit rewrite was used.
- Antigravity analysis job `66631933-3403-48d6-89bd-09c565734904` failed before analysis with zero tokens and no edits. `antigravity_worker.py doctor` passed (`agy 1.1.20`, agent/settings/storage healthy). The failed job is not accepted as review evidence; retry is deferred until reference baselines exist inside the repository scope.
- Retried Antigravity after the six baselines were committed, using a different model and a narrower read-only scope. Job `3330eba0-1c6f-49ee-9d8b-0d1a17d20347` again terminated immediately with `agy_failed`, zero input/output tokens and no edits. This repeat external failure is recorded as unavailable capability, not as completed analysis; the implementation continues with Codex subagent audits and direct verification.
- User clarified the visual contract: the six pixel-matched references are anchor states inside one continuous scrolling site, not isolated screens. Between anchor states, shared paper, copper contours, frames, imagery and motion must form deliberate seam-free transitions. Per the user's instruction, no further Antigravity calls will be made; independent Codex subagents remain required.
- Completed the first visual-QA tooling gate through independent spec and code reviews. Commit `5cade433` makes baseline update commands planning-only until the later candidate-promotion pipeline exists, verifies approval/manifest/baseline bytes against `HEAD`, keeps the port deterministic and refuses stale server reuse. Final scoped review found no P0/P1; the remaining candidate-promotion controls are explicitly scheduled for the Task 10 implementation rather than silently implied.
- Final local verification on the production build passed lint, 92 unit tests, TypeScript, asset audit, build, 11 browser tests, 4 accessibility tests and the six-scene visual capture. In-app Browser checks covered 1672×941, 1920×1080, 390×844 and 320×844; evidence and the intentionally red raw-pixel result are recorded in `docs/verification.md`.

## 2026-08-26

- Continued the user-directed single-page interpretation: the six supplied screens remain stable scene anchors in one continuous scroll, with shared paper/copper transitions between them. The events destination is a semantic `aside#events` bridge rather than an extra reference scene, and a restrained semantic footer carries source/status/provenance links.
- Completed bounded reference-derived crop passes for menu (five cards), gallery (main arch plus three insets), souvenirs (main still life plus four story cards), and contacts (window/street pair). Each crop is hash-registered against its supplied parent reference, excludes live copy/frames where possible, and is explicitly non-documentary.
- Added metadata/favicons, the reduced-motion carousel guard and browser regression coverage. The guard now feature-detects `matchMedia` so jsdom and older embedded environments remain operable.
- Fresh verification: lint, TypeScript, production build, 28-file/98-test serialized Vitest run, 12 browser tests, 5 accessibility tests, 1 visual capture test and 24-asset audit pass. The raw comparator remains intentionally red because the supplied generated concepts and the live component render are not byte-identical; latest evidence is recorded in `docs/verification.md`.
- AntiGravity was not retried after the user explicitly said it is unavailable. Prior doctor/retry failures remain documented as external capability failures; independent Codex subagent audits continue to provide review evidence.

### 2026-08-26 — final evidence refresh

- Added target-compatible about location-card copy ("ВИД НА КОСТЁЛ" / "ПРЕСВЯТОГО СЕРДЦА ИИСУСА" / "исторический центр Самары") while retaining the generated/non-documentary disclosure in the accessibility tree; the disclosure is visually clipped so it does not paint over the supplied composition.
- TDD cycle for the card contract was completed RED→GREEN; focused about tests are 5/5. Full serialized Vitest is now 29 files / 104 tests.
- Rebuilt and recaptured the six 1672×941 scenes. `qa:visual` is green (1/1), while the strict raw comparator remains intentionally red at `8,889,835 / 9,440,112` changed pixels (hero `1,050,740`; about `1,546,643`). No tolerance or mask was added.
- Fresh Chromium behavior/accessibility evidence remains green: 12 browser tests and 5 accessibility tests. Mobile full-page review captures were refreshed for 390×844 and 320×844; both remain overflow-free.
- Asset audit now validates 26 registered media assets, including bounded hero/about crops. The production build and TypeScript/lint gates remain green.
- The requested 4173 handoff port was already occupied by the unrelated `comod` checkout; it was not terminated. Dotgravity's stable local production handoff is therefore `http://127.0.0.1:4180/`, with Playwright using its isolated 4174 server.
- Final factuality review removed unsupported souvenir-material, origin, date, condition and scarcity claims while retaining the reference-compatible display names and an explicit illustrative-motif label. The contacts capture contract now checks the natural end clamp is both positive and within one rendered pixel, preserving strict geometry evidence.
- After that factuality pass, the full serialized Vitest suite was rerun successfully: 29 test files / 104 tests. Production build, lint, TypeScript, asset, browser, accessibility and visual capture gates were rerun as well; all passed except the intentionally strict raw-zero comparator. The contacts end-clamp wording in this earlier entry is superseded by the later co-located-header instrumentation refresh below.
- Published the exact validated HEAD `f6c39355ec19a8da0ae93d2a661d3d9370d1ccc0` to the configured Sites source, saved version 2, and deployed it successfully in verified owner-only access. Production URL: `https://dotgravity.ferumnikita2009.chatgpt.site`. The GitHub feature branch and Sites source are both synchronized to the same commit; no public access change was made.

### 2026-08-26 — final evidence refresh 2

- Added a server-backed `app/favicon.svg/route.ts` so the metadata icon returns HTTP 200 from Vinext production; the browser favicon/accessibility gate is now green instead of relying on a public-root fallback that Vinext did not serve.
- Co-located a presentation-only reference header inside the contacts scene (aria-hidden/inert, no second mobile trigger) and added a neutral hours row (`Уточняйте перед визитом`) without asserting unverified opening times.
- Refined the gallery desktop seam: the outer arch now starts at the supplied top rhythm, inset captions are allowed to extend outside the image frame while image corners remain clipped, inset verticals track the reference, and the three gallery themes use cup/easel/chair SVG subject icons.
- Adjusted desktop about/menu CTA rhythm and shortened/neutralized souvenir copy and labels while retaining explicit illustrative/provenance disclosures. No unsupported material, origin, date, condition, scarcity, stock or price claims were reintroduced.
- Rephrased about/gallery editorial copy as visual motifs and illustrative details so the page does not assert an unverified café collection, artist roster or historical inventory while retaining the supplied typographic rhythm.
- Fresh checks: serialized Vitest `29 files / 107 tests`, lint, TypeScript, build, asset audit (`26` assets), Chromium browser `12/12`, accessibility `5/5`, and visual capture `1/1` pass. Raw RGBA remains intentionally red at `8,889,803 / 9,440,112` changed pixels; no tolerance or mask was added.
- A fresh independent raw-diff audit found no additional geometry blocker after the gallery/contact adjustments. AntiGravity remains intentionally unused after the user's unavailability instruction. GitHub/Sites publication is pending until this refresh is committed and pushed.

### 2026-08-26 — final publication refresh

- Pushed the exact validated source commit `2149152f8bd5b333ee8bbc9235e9219f3ca88ec1` to the GitHub feature branch and configured Sites source repository.
- Rebuilt and packaged the same source state, saved Sites version 4, and deployed it successfully to `https://dotgravity.ferumnikita2009.chatgpt.site`.
- Verified the returned production URL and current Sites access: one explicit owner, custom owner-only policy, zero external visitors, and no workspace/tenant groups. No public-access change was made.
- The final evidence/docs follow-up remains part of the next local commit; raw-zero and missing responsive baselines remain intentionally open.
