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

### 2026-08-26 — scene polish refresh

- Integrated independent bounded passes for hero, about, menu, gallery,
  souvenirs and contacts. The site remains one continuous React/CSS/SVG
  scroll flow; no supplied screen is imported as a whole-page image.
- Tuned local scene paper colors/gradients against the supplied reference
  pixels, tightened hero kicker/type/icon rhythm, and kept mobile overrides
  separate. Gallery labels now express the supplied visual concepts as neutral
  motifs, while menu/souvenir copy remains neutral where current prices, stock
  or catalogue facts were not verified.
- Repaired the hero reference-derived crop's accidental edge alpha strips and
  restored a continuous dark-wood underlay beneath the live CSS plaque. The
  asset SHA, registry and provenance statement are synchronized at
  `789791B7809699ABDA65EBF2D2AB03A9E2EE2448FB43D12CA24AE0F12FBAC624`.
- Contacts now presents a real `tel:+78462630404` booking action plus a
  separate owner-supplied Yandex route link; the lower route diagram remains
  explicitly schematic and the hours row stays "Уточняйте перед визитом".
- Fresh verification is green for lint, TypeScript, asset audit (26 assets),
  serialized Vitest (29 files / 109 tests), production build, Chromium browser
  (12/12), accessibility (5/5), visual capture (1/1), and `npm audit` (0 high
  severity production vulnerabilities). The local production probe is
  overflow-free at 1920×1080, 390×844 and 320×844; the in-app Browser was
  reloaded against `http://127.0.0.1:4180/` with one H1, six scenes and both
  contacts actions present.
- Fresh raw comparison remains intentionally red at
  `6,885,892 / 9,440,112` changed pixels (hero `1,007,264`; about `949,988`;
  menu `1,496,436`; gallery `930,362`; souvenirs `974,225`; contacts
  `1,527,617`). No tolerance, mask or approval exception was introduced;
  responsive raw baselines are still absent.
- AntiGravity was not called again after the user's explicit unavailability
  instruction. Runtime commit
  `c288e4a7e1e0ba95da2f4476dbabb6243ab94993` is locally verified and pushed
  to GitHub and the Sites source repository. Sites version 7 was saved and
  deployed successfully to the existing owner-only production URL; the
  neutral visual-motif gallery copy and captions are included in that
  deployment.

### 2026-08-27 — raw-driven crop polish and publication

- Independent About, Gallery, Menu and Contacts agents completed bounded
  visual passes. Menu photo crops now use intrinsic 250×265 media with measured
  per-card offsets, removing the former 1.04 scale; About's decorative ring,
  Gallery's lower arch seam and Contacts' lower window diagonal were tuned to
  the supplied desktop references.
- A follow-up reviewer found and fixed a mobile specificity issue: the
  desktop-only menu offsets are now explicitly reset for every `nth-child`
  selector at ≤1200px. A browser assertion covers the computed zero offsets at
  390px and 320px.
- Fresh verification passed: 29 Vitest files / 113 tests, lint, TypeScript,
  asset audit (26 assets), production build, Chromium browser 12/12,
  accessibility 5/5, visual capture 1/1, and `npm audit` with zero high
  severity production vulnerabilities. `git diff --check` is clean.
- The strict raw comparator remains intentionally red but improved to
  `6,691,967 / 9,440,112` changed pixels: hero `1,007,264`, about `947,514`,
  menu `1,305,070`, gallery `930,362`, souvenirs `974,225`, contacts
  `1,527,532`. No tolerance, mask or approval exception was introduced.
- Runtime commit `ddcf8dbaea0f538f84fd1b3d84e8a536952c4334` was amended with the
  current local timestamp, pushed to GitHub and the Sites source repository.
  Sites version 8 was saved from the matching build archive and deployed to
  the existing owner-only production URL. Access remains custom with one
  owner, zero external visitors and no workspace/tenant groups. AntiGravity
  was not called per the user's unavailability instruction.

### 2026-08-27 — bounded plaque/map refresh and publication

- Integrated the final independent code-review-approved candidate. The hero
  now uses a desktop-only bounded plaque strip over the live `aria-hidden`
  plaque markup; the contacts scene uses intrinsic desktop photo geometry,
  a bounded plaque strip between the two crops, and a bounded map artwork
  layer over the live semantic route sidebar/SVG structure. Souvenirs now use
  the reference-calibrated flat paper surface. Mobile breakpoints keep the
  responsive fallback composition and hide the desktop-only reference layers.
- Registered three new non-documentary `reference-derived` assets with exact
  parent hashes and ROIs: hero plaque `137×379` at `x=1411,y=131`, contacts
  plaque `73×477` at `x=1085,y=106`, and contacts map `634×312` at
  `x=624,y=596`. The registry, focused TDD contracts and provenance record
  are synchronized; no whole-screen reference PNG is imported.
- Fresh evidence passed: 31 Vitest files / 120 tests, lint, TypeScript,
  asset audit (29 assets), production build, Chromium browser 12/12,
  accessibility 5/5, visual capture 1/1, and `npm audit` with zero high
  severity production vulnerabilities. The independent final code review
  found no P0/P1 and confirmed no overflow at the required desktop/mobile
  widths.
- The strict raw comparator remains intentionally red but improved to
  `5,769,854 / 9,440,112` changed pixels: hero `789,934`, about `947,514`,
  menu `1,305,073`, gallery `930,362`, souvenirs `932,954`, contacts
  `864,017`. This is a `922,113`-pixel (`13.78%`) improvement over the prior
  report; no tolerance, mask or approval exception was introduced.
- Runtime commit `4cf508abcd5b50efea47e82703edcdc5e84e5775` was amended with
  the current local timestamp, pushed to GitHub and the Sites source
  repository. Sites version 9 was saved from the matching build archive and
  deployed successfully to the existing owner-only production URL. The
  returned URL was checked in the in-app Browser; anonymous access correctly
  shows the ChatGPT sign-in interstitial. The hero reference sentence remains
  documented as concept-derived copy, not an independently confirmed venue
  fact. AntiGravity was not called per the user's unavailability instruction.

### 2026-08-27 — combined bounded rhythm pass and publication

- Integrated the six independent raw-driven scene passes into runtime commit
  `a8f6e1cd40414143a28e1925fdd99886809aac41`: hero dot-grid registration,
  about CTA label, contacts sidebar/type rhythm, gallery inset corners, menu
  card/heading offsets, and souvenir topographic/story alignment.
- Re-ran the complete validation set: 31 Vitest files / 125 tests, lint,
  TypeScript, 29-asset audit, production build, browser 12/12,
  accessibility 5/5, visual 1/1, and npm audit with 0 high-severity issues.
- The strict raw comparator remains red without tolerance or masks at
  `5,629,472 / 9,440,112` changed pixels (hero `789,931`; about `947,514`;
  menu `1,167,038`; gallery `928,556`; souvenirs `932,845`; contacts
  `863,588`).
- Pushed the exact SHA to GitHub `main` and `feat/pixel-accurate-landing`,
  synchronized the Sites source repository `main`, saved Sites version 10
  from the matching build archive
  (`sha256:5186f5bcf3c7bec2924fd1a7edce15622444f0782db75a68120b2901dbea5187`),
  and deployed successfully to the existing owner-only URL.
- In-app Browser reload confirmed the local handoff, and anonymous production
  access still shows the expected ChatGPT sign-in interstitial. AntiGravity was
  not called, per the user's unavailability instruction.

### 2026-08-27 — bounded reference-detail pass and publication

- Integrated the independent cathedral-linework, contacts, About and Gallery
  ROI passes into runtime commit
  `cbddfb75f847d7e142daa67294eb445f41925a56`. The new menu decoration is a
  transparent `176×450` bounded `reference-derived` asset with a registered
  parent hash and non-documentary statement; no whole-screen reference PNG was
  imported. About/Gallery desktop paper tuning is isolated from the restored
  mobile surfaces, and the contacts header/title adjustment is desktop-only.
- Re-ran the complete validation set: 31 Vitest files / 130 tests, lint,
  TypeScript, 30-asset audit, production build, browser 12/12,
  accessibility 5/5, visual capture 1/1, and npm audit with 0 high-severity
  issues. The browser suite covers 1920×1080, 1672×941, 390×844 and 320×844
  overflow/interaction contracts; the in-app Browser also confirmed the local
  handoff and responsive mobile composition.
- The strict raw comparator remains red without tolerance or masks at
  `5,583,911 / 9,440,112` changed pixels (hero `789,931`; about `942,133`;
  menu `1,166,847`; gallery `901,261`; souvenirs `932,845`; contacts
  `850,894`). This is a `45,561`-pixel (`0.81%`) improvement over the prior
  published candidate and a `1,108,056`-pixel (`16.56%`) cumulative improvement
  over the pre-polish report.
- Pushed the exact SHA to GitHub `main` and `feat/pixel-accurate-landing`,
  synchronized the Sites source repository `main`, saved Sites version 11
  from the matching archive (`sha256:6e9e34d305841406d8f9f5c04c4edebcb758dde9d7b7b19f0c17249efad36005`),
  and deployed successfully to the existing owner-only production URL.
  Anonymous production access still shows the expected ChatGPT sign-in
  interstitial. AntiGravity was not called, per the user's unavailability
  instruction.

### 2026-08-27 — bounded ornament/copy pass and publication

- Integrated seven bounded `reference-derived` ornament assets for hero,
  about, menu, gallery, souvenirs and contacts. Each crop is registered with
  its parent reference hash, dimensions, ROI and `documentary: false` policy;
  no whole-screen PNG is imported. Souvenir motif labels were aligned to the
  supplied concept while prices, stock and other unverified product facts
  remain neutral.
- AntiGravity Worker analysis job
  `deea0e25-5a71-4f6c-a04e-da6ac32f319b` identified a Gallery order hypothesis.
  Its edit continuation `b8946fe6-022b-485e-aec6-96a41800509b` ran focused
  tests and build/a11y checks but exceeded the 900-second worker limit during
  browser checks. Independent A/B measurement showed the proposed DOM reorder
  was worse, so it was reverted; the accepted changes are the measured
  ornaments and safe copy pass.
- Fresh verification passed: 31 Vitest files / 140 tests, lint, TypeScript,
  asset audit (37 assets), production build, Chromium browser 12/12,
  accessibility 5/5, visual capture 1/1, and `npm audit` with zero high
  severity production vulnerabilities. In-app Browser checks at 1920×1080,
  390×844 and 320×844 remain overflow-free.
- The strict raw comparator remains intentionally red at
  `5,499,236 / 9,440,112` changed pixels: hero `736,299`, about `941,854`,
  menu `1,166,766`, gallery `870,707`, souvenirs `932,716`, contacts
  `850,894`. This is an `84,675`-pixel (`1.52%`) improvement over the
  previous published candidate; no tolerance, mask or approval exception was
  introduced.
- Runtime commit `ddc687f6689ffc9850ebc712a578dd463a8ad51c` was timestamp-
  refreshed before push and published to GitHub `main` and
  `feat/pixel-accurate-landing`, then synchronized to the Sites source
  repository. Sites version 12 was saved from the matching archive
  (`sha256:d9ae193fb68588fd86d1f21cbb74dabacca1f6b8cff8cc0bd9c116ec2536e7f9`)
  and deployed successfully to the existing owner-only production URL.
  Anonymous production navigation still shows the expected ChatGPT sign-in
  interstitial.

### 2026-08-27 — bounded header-mark pass and publication

- Added one 47×49 `reference-derived` header rosette crop from the supplied
  hero concept (`x=52,y=32,w=47,h=49`, parent reference hash recorded in the
  media registry). The crop is non-documentary, excludes text and other
  header content, is used only on the desktop lockup, and leaves the live SVG
  mark as the mobile fallback. The Contacts unit assertion now excludes this
  header decoration when counting its two photo crops.
- Fresh verification passed: 32 Vitest files / 142 tests, lint, TypeScript,
  asset audit (38 assets), production build, Chromium browser 12/12,
  accessibility 5/5, visual capture 1/1, and `npm audit` with zero high
  severity production vulnerabilities. The local handoff server on port 4180
  returned HTTP 200 and the required four viewport checks remained
  overflow-free.
- Strict raw comparison remains intentionally red at
  `5,499,213 / 9,440,112` changed pixels: hero `736,298`, about `941,854`,
  menu `1,166,766`, gallery `870,707`, souvenirs `932,716`, contacts
  `850,872`. This is a `23`-pixel improvement over the previous published
  candidate; no tolerance, mask or approval exception was introduced.
- Runtime commit `31b8f3b3044e4dbde88fae354e253001a92ec8e0` was timestamp-
  refreshed before push and published to GitHub `main` and
  `feat/pixel-accurate-landing`, then synchronized to the Sites source
  repository. Sites version 13 was saved from the matching archive
  (`sha256:d3baefb19edaf7a64f57c7168b0e68b623de0ad72f616de25ee06640a58276bb`,
  129 files, 27,596,800 bytes) and deployed successfully to the existing
  owner-only production URL. The deployment status reached `succeeded`; the
  access policy still has exactly one allowed account user, zero groups and
  zero external visitors.

### 2026-08-27 — release-hygiene follow-up and Sites v14

- Runtime commit `6457765628b5156bb9e42322cef653d52495a66d` was timestamp-
  refreshed before push and published to GitHub `main` and
  `feat/pixel-accurate-landing`, then synchronized to the Sites source
  repository. The change resolves the bounded header crop through the
  validated `mediaManifest` and documents the intentional raw `<img>` usage
  for warning-free lint; no rendered geometry or responsive rule changed.
- Full verification stayed green: 32 Vitest files / 142 tests, lint,
  TypeScript, asset audit (38 assets), production build, browser 12/12,
  accessibility 5/5, visual capture 1/1 and production dependency audit.
  The strict raw comparator remains intentionally red at
  `5,499,213 / 9,440,112` changed pixels, with no tolerance or mask.
- Sites version 14 was saved from the matching archive
  (`sha256:6a15fc7cbc29ace4a2b105d1a8f13da432562ab471573db6ea915a7eeb1ad441`,
  129 files, 27,596,800 bytes) and deployed successfully to the existing
  owner-only production URL. Deployment
  `appgdep_6a904abaeba4819181b27efc9ad7e6ec` reached `succeeded`; anonymous
  access continues to show the expected ChatGPT sign-in interstitial.

### 2026-08-27 — bounded CSS calibration and Sites v15

- Integrated two independent, bounded desktop-only measurements: the About
  location-card sidebar track changed from `124px` to `94px`, and the wide
  Menu heading uses `scaleY(.9)` with a top-center origin. The Menu contract
  test covers the breakpoint and transform; mobile 390px/320px resets remain
  unchanged. No copy, media provenance, mask or tolerance changed.
- Fresh verification passed: 32 Vitest files / 143 tests, lint, TypeScript,
  asset audit (38), production build, Chromium browser 12/12, accessibility
  5/5, visual capture 1/1 and production dependency audit. The strict raw
  comparator remains intentionally red at `5,499,188 / 9,440,112` changed
  pixels (hero `736,298`; about `941,848`; menu `1,166,747`; gallery `870,707`;
  souvenirs `932,716`; contacts `850,872`), improving the previous report by
  25 pixels without introducing a mask or tolerance.
- Runtime commit `33a84397d01cd1714d5ef7f3a3d89139bb39ba0e` was timestamp-
  refreshed before push and published to GitHub `main` and
  `feat/pixel-accurate-landing`, then synchronized to the Sites source
  repository. Sites version 15 was saved from the matching archive
  (`sha256:3ade958de437b632f076033eaa8ecf51fe4cb9e9e9dbb2f3e8c7fc528999ad09`,
  129 files, 27,596,800 bytes) and deployed successfully to the existing
  owner-only production URL. Deployment
  `appgdep_6a905599ca688191890650dc616dcb2d` reached `succeeded`; anonymous
  access continues to show the expected ChatGPT sign-in interstitial.

### 2026-08-27 — bounded desktop polish and Sites v16

- Integrated four raw-driven, desktop-scoped CSS contracts in runtime commit
  `81a66760607f907cebc2811b9941791e827858bc`: restore the translucent header
  surface on mobile while keeping the opaque desktop surface, move the hero
  feature rail down `1px`, hide wide Contacts route-panel pseudo-markers, and
  remove the wide Souvenirs story-image radius. No new media, copy,
  provenance, mask or tolerance rule was introduced. Focused tests cover the
  breakpoint behavior.
- Fresh verification passed: 33 Vitest files / 147 tests, lint, TypeScript,
  38-asset audit, production build, Chromium browser 12/12, accessibility
  5/5, visual capture 1/1, and the production dependency audit with zero
  vulnerabilities. The fresh handoff server at `127.0.0.1:4180` returned
  HTTP 200; its current client chunk and registered header crop returned HTTP
  200; four viewport probes were overflow-free and the live mobile menu opened
  and closed.
- The strict raw comparator remains intentionally red without tolerance or
  masks at `5,473,941 / 9,440,112` changed pixels: hero `711,367` (mean
  `4.12517653`), about `941,848` (`6.22187359`), menu `1,166,747`
  (`5.93727866`), gallery `870,707` (`8.09495475`), souvenirs `932,428`
  (`7.08657233`), contacts `850,844` (`4.26206612`). This improves Sites v15
  by `25,247` changed pixels; no raw-zero claim is made.
- Runtime `81a66760607f907cebc2811b9941791e827858bc` was timestamp-refreshed
  before push and published to GitHub `main` and `feat/pixel-accurate-landing`,
  then synchronized to the Sites source repository. Sites version 16 was saved
  from the matching archive (`sha256:3d0c2d407da82856573cd1f2712dfe5825956b059158facc755a8aeb09071b4c`,
  129 files, 27,596,800 bytes) and deployed successfully; deployment
  `appgdep_6a9075a778388191948f72c7d4ab5bbe` reached `succeeded` at the
  existing owner-only production URL. Anonymous access continues to show the
  expected ChatGPT sign-in interstitial.

### 2026-08-27 — bounded desktop alignment and Sites v17

- Integrated four independent raw-driven, desktop-scoped calibrations in
  runtime commit `32a2249a20592fd1bc99163932d49104058d6fa5`: About title and
  cathedral illustration offsets, a `2px` Gallery heading offset, a `4px/1px`
  Menu CTA offset and a `16px` desktop Souvenirs story-copy gap. A Contacts
  sidebar body-scale hypothesis was tested, increased strict changed-pixel
  count and was reverted. No new media, copy, provenance, mask or tolerance
  rule was introduced.
- Fresh verification passed: 33 Vitest files / 152 tests, lint, TypeScript,
  asset audit (38 assets / 30 production text files), production build,
  Chromium browser 12/12, accessibility 5/5, visual capture 1/1 and the
  production dependency audit with zero vulnerabilities. The rebuilt 4180
  handoff server returned HTTP 200; all four viewport probes were overflow-free
  and the live mobile menu opened and closed.
- Strict raw comparison remains intentionally red at
  `5,473,801 / 9,440,112` changed pixels: hero `711,367` (mean `4.12517653`),
  about `941,743` (`5.86134826`), menu `1,166,729` (`5.88439507`), gallery
  `870,690` (`7.99102823`), souvenirs `932,428` (`7.07670598`), contacts
  `850,844` (`4.26206612`). This is `140` fewer changed pixels than v16;
  no raw-zero claim is made.
- Runtime `32a2249a20592fd1bc99163932d49104058d6fa5` was timestamp-refreshed
  before push and published to GitHub `main` and `feat/pixel-accurate-landing`,
  then synchronized to the Sites source repository. Sites version 17 was saved
  from the matching archive (`sha256:c65fce7d6a9f105d675e068094a781484c68f3941b57478cfbb7230386977b18`,
  129 files, 27,596,800 bytes) and deployed successfully; deployment
  `appgdep_6a90849d5c2881919fea94dd9c74dc22` reached `succeeded` at the
  existing owner-only production URL. Anonymous access remains the expected
  ChatGPT sign-in interstitial.

### 2026-08-27 — bounded desktop-detail pass and Sites v18

- Integrated a fresh independent ROI cycle after v17. About received a
  desktop-only detailed inline cathedral SVG plus calibrated plaque frame and
  copy rhythm; the original vector remains the mobile/tablet fallback. Gallery
  story details moved down to the measured CTA position at `min-width: 1440px`.
  Souvenirs removed the desktop-only artwork shadow that created a dark band on
  the paper surface. No whole-screen PNGs, documentary claims or raw masks were
  introduced.
- TDD contracts were kept alongside each bounded rule. Full verification passed:
  33 Vitest files / 158 tests, lint, TypeScript, production build, 38-asset
  audit, Chromium browser 12/12, accessibility 5/5, visual capture 1/1 and
  `npm audit --omit=dev --audit-level=high` with zero vulnerabilities.
- Fresh strict raw capture at `1672×941` remains intentionally red without
  tolerance or mask: `5,461,466 / 9,440,112` changed pixels (hero `711,367`,
  about `941,731`, menu `1,166,729`, gallery `867,542`, souvenirs `923,253`,
  contacts `850,844`). This improves v17 by `12,335` changed pixels.
- The rebuilt local `4180` server was rechecked from `1180px` through `320px`:
  no document overflow or failed requests, live mobile menu focus/body-lock,
  menu carousel, and desktop-only plaque swap all behave as intended.
- Runtime `f977e3612ed3ffc75c28757a31273e550557828e` was timestamp-refreshed,
  pushed to GitHub `main` and `feat/pixel-accurate-landing`, and synchronized
  to the Sites source repository. Sites version 18 was saved from archive
  `sha256:e15cc03b7c6f39c2875679dd1a52ea12eefbbb6073bd0f923d82df9364458872`
  (`129` files, `27,596,800` bytes) and deployed successfully as
  `appgdep_6a9091d8835481919516e2335ec809c9` to the existing owner-only URL.
- The strict raw-zero gate and missing responsive reference baselines remain
  open; this is the best current published candidate, not a literal byte-
  identity claim.
