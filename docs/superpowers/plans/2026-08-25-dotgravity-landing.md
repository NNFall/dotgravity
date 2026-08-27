# Dotgravity Pixel-Accurate Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development task-by-task. Every production behavior follows superpowers:test-driven-development. The primary agent remains the Site owner; workers receive narrow scopes and must not initialize another Site, deploy, change remotes, or edit outside assigned paths.

**Goal:** Build and publish a cohesive React/TypeScript landing for «Точка притяжения» that reproduces six supplied 1672×941 scenes from real components and separate assets, passes strict desktop/mobile visual gates, and never renders a whole reference screen as the site.

**Architecture:** Vinext/Next App Router renders one semantic server page with stable scene sections plus a compact events bridge. Content and media provenance are typed data; mobile navigation, menu carousel and reveal orchestration are isolated client leaves. Unit/component tests prove behavior first; Playwright captures deterministic scenes; an independent raw RGBA comparator measures every pixel and refuses unapproved exceptions.

**Tech Stack:** React 19, TypeScript 5.9, Vinext 1, Tailwind 4 plus project CSS, Phosphor icons, Vitest/Testing Library, Playwright Chromium, pixelmatch/pngjs/sharp, axe, OpenAI Sites hosting.

---

## File map

- app/layout.tsx: Russian metadata, deterministic Prata/Montserrat variables, social preview.
- app/page.tsx: semantic scene composition only.
- app/globals.css: tokens, paper texture, exact geometry, responsive and reduced-motion rules.
- app/components/: CTA, mark, ornament, framed image, sticky/mobile navigation and reveal primitives.
- app/sections/: hero, about, menu, gallery, souvenirs, events and contacts.
- src/data/site.ts: verified copy, links, order and stale-data policy.
- src/media/: typed manifest and provenance validation.
- public/media/documentary/: direct venue imagery.
- public/media/reference-derived/: bounded concept crops, never documentary.
- public/media/generated/: Image Generation outputs, never documentary.
- tests/unit/: data, provenance and component behavior.
- tests/browser/: anchors, overflow, reduced motion and accessibility.
- tests/visual/: atlas, comparator, baselines and scene capture.
- scripts/: extraction, audit and comparison entrypoints.
- artifacts/visual/: ignored run evidence; selected final evidence goes to docs/verification/.

### Task 1: Lock tooling, scripts and authoritative baselines

**Files:** package.json, package-lock.json, vitest.config.ts, playwright.config.ts, tests/setup.ts, tests/visual/referenceAtlas.ts, tests/visual/baselines/1672x941/manifest.json, .gitignore.

- [ ] Check package.json, then install declared libraries:

~~~powershell
npm.cmd install @phosphor-icons/react
npm.cmd install -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test @axe-core/playwright pixelmatch pngjs sharp @types/pngjs
~~~

- [ ] Add scripts named test, test:watch, qa:assets, qa:browser, qa:visual, qa:raw and qa:all. qa:all runs lint, unit tests, build, asset audit, browser checks, visual capture and raw comparison.
- [ ] Configure Vitest with jsdom and tests/setup.ts. Configure Playwright for http://127.0.0.1:4173, Chromium, ru-RU, Europe/Samara, deviceScaleFactor 1, light color scheme, blocked service workers, one worker and retained dev webServer.
- [ ] Copy only six target PNGs into test baselines as hero.png, about.png, menu.png, gallery.png, souvenirs.png and contacts.png. Exclude the orange Komod file.
- [ ] Manifest each baseline with width 1672, height 941, SHA-256, sourceType user-supplied-generated-reference, productionImportAllowed false and approvalStatus authoritative.
- [ ] Export SceneId = hero | about | menu | gallery | souvenirs | contacts and rawComparedPixels = 1573352 per reference case.
- [ ] Run npm.cmd test -- --passWithNoTests, npx.cmd playwright install chromium and git diff --check.
- [ ] Commit: test: establish deterministic visual QA tooling.

### Task 2: Prove provenance and prohibit reference-screen imports

**Files:** src/media/types.ts, src/media/provenance.ts, src/media/manifest.ts, tests/unit/provenance.test.ts, scripts/audit-assets.mjs, docs/asset-provenance.md.

- [ ] RED: test that documentary media requires source URL/access date/rights status; generated media requires prompt and documentary false; reference-derived media requires parent reference hash; duplicate IDs and missing files fail.
- [ ] RED: a production asset whose hash equals any authoritative baseline must throw exactly Reference screen cannot be a production asset.
- [ ] Run npm.cmd test -- tests/unit/provenance.test.ts and confirm failure is caused by missing implementation.
- [ ] GREEN: implement the discriminated union and validateMediaManifest without weakening any rule.
- [ ] Build audit-assets.mjs to hash renderable files and scan app/src/public/CSS URLs. Fail full reference hashes/paths, unmanifested media, missing intrinsic dimensions and synthetic-as-documentary claims.
- [ ] Run focused tests and npm.cmd run qa:assets.
- [ ] Commit: test: enforce media provenance and reference isolation.

### Task 3: Prepare documentary and reference-derived assets

**Files:** scripts/extract-reference-assets.mjs, public/media/documentary/*, public/media/reference-derived/*, public/ornaments/*, src/media/manifest.ts, docs/asset-provenance.md.

- [ ] Copy the five prior Yandex photo files with stable names, original bytes and organisation URL. Record access date 2026-08-24 and rightsStatus unconfirmed. Never mark VK inspected.
- [ ] Implement a Sharp recipe allowlist. Reject outputs with both dimensions at least 1500×900, strip metadata and write WebP plus a JSON transformation record.
- [ ] Extract image-only regions: hero composite, about arch, gallery main/details, five menu products, souvenir hero/products and two contact photos. No heading, CTA, navigation or whole UI may remain in a crop.
- [ ] Inspect every output at original resolution and reject duplicated live text or reference borders that should be DOM.
- [ ] Build dots, arcs, rules and flowers in CSS. Keep cathedral line art as a bounded raster only if CSS cannot match.
- [ ] Run Remove Background at default and soft settings on the bounded cathedral or blue-cup candidate, inspect checkerboard previews, and use a transparent result only if it improves edges.
- [ ] Update manifest/provenance, run tests and asset audit.
- [ ] Commit: feat: prepare provenance-safe visual assets.

### Task 4: Build typed content and the first meaningful hero preview through TDD

**Files:** src/data/site.ts, tests/unit/site-content.test.ts, app/components/BrandMark.tsx, PrimaryCta.tsx, SiteHeader.tsx, app/sections/HeroSection.tsx, app/page.tsx, app/layout.tsx, app/globals.css.

- [ ] RED: assert address Самара, ул. Фрунзе, 130; tel:+78462630404; supplied Yandex route; order hero/about/menu/gallery/souvenirs/contacts; no invented weekly hours; one H1; data-scene=hero; no baseline path in rendered HTML.
- [ ] Run npm.cmd test -- tests/unit/site-content.test.ts and observe the expected missing-module failure.
- [ ] GREEN data: verified facts only, stale price note, VK unconfirmed, honest route/contact CTA.
- [ ] GREEN metadata: html lang ru; title Точка притяжения | Кофе, искусство и атмосфера; concrete description; Prata display and Montserrat body with Cyrillic subsets; no Geist/starter/dark-mode defaults. The title intentionally avoids an unverified inventory claim.
- [ ] GREEN hero at 1672×941: 104 px header; logo starts near x=52; content x=109; H1 y≈205 at 92–98 px; CTA about 378×65; diagonal photo polygon from approximately (955,105) to (725,941). All copy, icons and rules are live DOM/CSS.
- [ ] Run focused test, lint and build.
- [ ] Start npm.cmd run dev -- --host 127.0.0.1 --port 4173 in a retained session, request the route, then show the exact URL as the first meaningful preview before further source edits.
- [ ] Commit: feat: build measured hero and site identity.

### Task 5: Implement about and gallery scenes

**Files:** tests/unit/about-gallery.test.tsx, app/components/SceneLabel.tsx, FeatureItem.tsx, FramedImage.tsx, app/sections/AboutSection.tsx, GallerySection.tsx, app/page.tsx, app/globals.css.

- [ ] RED: stable data-scene roots, one heading per scene, three about features, three gallery callouts, correct alt/provenance language and labels outside images.
- [ ] Run RED and verify missing section modules.
- [ ] GREEN about geometry at reference width: arch x≈17–814; overlay card x≈13–420/y≈688–892; right copy x≈867–1530; feature dividers x≈1048/1314. Mobile stacks arch, overlapping card, copy and features.
- [ ] GREEN gallery geometry: copy x≈132; main arch x≈657–1352/y≈36–903; inset images x≈1265–1518 at y≈124/383/635; live callout labels extend to x≈1645. Mobile uses main image plus labelled thumbnails.
- [ ] Run focused tests, build and asset audit.
- [ ] Commit: feat: add about and gallery reference scenes.

### Task 6: Implement accessible menu carousel through TDD

**Files:** app/components/MenuCarousel.tsx, app/sections/MenuSection.tsx, tests/unit/menu-carousel.test.tsx, src/data/site.ts, app/page.tsx, app/globals.css.

- [ ] RED: five items remain in DOM; next/previous and Arrow keys change active index; state is announced; controls have accessible names; prices show a stale-information note.
- [ ] Run RED and confirm the carousel is missing.
- [ ] GREEN: scroll-snap for touch, refs and scroll position for controls, no autoplay. At 1672 show five measured cards with cut corners and side arrows. At 390/320 show one main card plus a visible next edge.
- [ ] Run focused tests, lint and build.
- [ ] Commit: feat: add accessible reference menu carousel.

### Task 7: Implement souvenirs, events bridge and contacts through TDD

**Files:** tests/unit/souvenirs-contacts.test.tsx, app/sections/SouvenirsSection.tsx, EventsSection.tsx, ContactsSection.tsx, app/components/RouteMap.tsx, app/page.tsx, app/globals.css.

- [ ] RED: four souvenir cards; no current-stock claim for synthetic products; exact address/phone; honest unknown hours; exact route href; no fake booking success; event CTA routes to contact rather than inventing a calendar.
- [ ] Run RED.
- [ ] GREEN souvenirs: left editorial column, hero image x≈807–1593/y≈89–625 and four bottom cards. Concept prices are illustrative/stale until verified.
- [ ] GREEN contacts: 104 px header; left detail stack; two top images; pale HTML/CSS route schematic with venue/church markers; three travel rows; direct tel and Yandex route actions.
- [ ] GREEN events: compact same-language bridge that does not alter any of the six reference capture boxes.
- [ ] Run focused tests, build and asset audit.
- [ ] Commit: feat: complete souvenirs events and contact journey.

### Task 8: Generate only missing reference-compatible media

**Files:** public/media/generated/og-dotgravity.png, public/media/generated/events-still.webp, optional hero-mobile.webp, src/media/manifest.ts, docs/asset-provenance.md, app/layout.tsx.

- [ ] Compare live desktop/mobile crops first. Generate only an asset with a named unresolved role.
- [ ] Use built-in Image Generation one asset per call. OG copy must be exact: ТОЧКА ПРИТЯЖЕНИЯ and КОФЕ • ИСКУССТВО • РЕДКИЕ ВЕЩИ. Events still contains no text. Hero mobile extension is allowed only when existing crops cannot support 390×844.
- [ ] Inspect original-resolution outputs. Reject misspelled Cyrillic, invented signage, watermark, false documentary cues and palette drift; retry only one targeted defect.
- [ ] Save selected files inside the workspace. Record prompt, input roles, creation date, section and documentary false.
- [ ] Wire trusted-origin Open Graph/X metadata and run build/asset audit.
- [ ] Commit: feat: add provenance-safe generated media.

### Task 9: Add mobile navigation, reveal motion and responsive hardening

**Files:** app/components/MobileNav.tsx, Reveal.tsx, tests/unit/mobile-nav.test.tsx, tests/browser/responsive.spec.ts, app/components/SiteHeader.tsx, app/globals.css.

- [ ] RED unit: open/close, Escape, focus return, anchor close and scroll-lock cleanup.
- [ ] RED browser: all anchors, zero overflow at 1920/1672/390/320, touch targets at least 44 px, visible focus, footer clearance, no page/console errors and reduced-motion behavior.
- [ ] GREEN MobileNav: trap focus only while open, restore trigger, lock scroll without layout jump.
- [ ] GREEN Reveal: IntersectionObserver, transform/opacity only, visible fallback without JS, no scroll event listener, immediate state under prefers-reduced-motion.
- [ ] Tune breakpoint-specific order and object-position. At 1920 extend fluidly; never letterbox a fixed 1672 canvas.
- [ ] Run focused unit/browser tests, lint and build.
- [ ] Commit: feat: harden responsive navigation and motion.

### Task 10: Implement raw comparison and scene evidence

**Files:** tests/unit/raw-comparator.test.ts, tests/visual/compareReference.ts, tests/visual/visual.spec.ts, scripts/compare-reference.mjs, docs/visual-reference-contract.md, docs/visual-exceptions/README.md.

- [ ] RED comparator: exact match gives zero mismatch; one changed channel counts one pixel; dimension mismatch fails first; all RGBA pixels are counted; diff bounds exact; unapproved/expired/wide exceptions fail.
- [ ] Run RED.
- [ ] GREEN comparator: own RGBA loop returns compared pixels, mismatched pixels/ratio, max/mean channel delta and bounding box. Pixelmatch creates heatmaps only and cannot replace raw metrics.
- [ ] GREEN capture: navigate to /?visual=1#scene; await app visual-ready marker, document.fonts.ready and image decode; disable animations only for capture; record URL, scrollY, boxes, currentSrc, object-fit and object-position.
- [ ] Require exactly 1,573,352 compared pixels for each 1672×941 reference. Missing approved 1920/390/320 baselines fail. No global tolerance or whole-screen mask.
- [ ] Iterate layout/assets, never thresholds. Save unique-run evidence.
- [ ] Commit: test: enforce full-frame visual reference gates.

### Task 11: Independent review, verification, hosting and Git handoff

**Files:** docs/operations-log.md, docs/verification/final-report.md, docs/verification/screenshots/*, and only files required by approved review fixes.

- [ ] Fresh spec reviewer receives the complete spec and revision. Fix every gap/extra, then rerun until approved.
- [ ] After spec approval, fresh code-quality reviewer uses requesting-code-review. Fix important findings and obtain re-approval.
- [ ] Continue or rerun Antigravity on current captures vs references. Inspect result/tail and verify every material claim independently.
- [ ] Reload PRODUCT/DESIGN and apply Impeccable polish/audit for rhythm, typography, focus, motion and performance.
- [ ] Use verification-before-completion at one revision:

~~~powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run qa:assets
npm.cmd run qa:browser
npm.cmd run qa:visual
npm.cmd run qa:raw
git diff --check
git status --short --branch
~~~

- [x] Report unit, build, browser, raw pixel, accessibility, deployment and rights evidence separately.
- [x] Use sites-hosting, open the actual returned production URL, and hand it off in the in-app Browser. Desktop/mobile behavior and console gates were already covered against the same validated source; a build or commit was not treated as deployment proof.
- [x] Use finishing-a-development-branch. Confirm scope, remote and secret scan; push reviewed commits to NNFall/dotgravity and integrate only through the approved finish flow.
- [x] Record final SHA, branch, production URL, screenshot links, raw metrics, all exceptions and unresolved rights status in `docs/final-report.md`.

## Execution status addendum — 2026-08-26

The implementation has completed the scene, responsive, provenance and
interaction work described above. The six reference targets are rendered as
independent React/CSS/SVG scenes in one continuous scroll with a semantic
`aside#events` bridge and footer. Bounded reference-derived crops are registered
for every desktop photo region (hero, about, menu, gallery, souvenirs and
contacts), while generated fallbacks remain active on mobile where required.

Current local evidence is green for lint, TypeScript, production build, asset
audit (26 assets), serialized Vitest (29 files / 110 tests), Chromium behavior
(12 tests), accessibility (5 tests) and the six-scene visual capture (1 test).
The strict raw RGBA comparator is intentionally red at
`6,885,892 / 9,440,112` changed pixels because the live component render is not
byte-identical to the supplied concept baselines; no tolerance or mask is used.
No 1920×1080 or mobile raw baselines were supplied, so those viewports have
behavioral and overflow evidence only. Final independent review, GitHub push,
Sites version 7 save and verified owner-only production deployment are complete
for source commit `c288e4a7e1e0ba95da2f4476dbabb6243ab94993`; the raw-zero and
missing baseline items remain intentionally open quality limitations. The
latest refresh also adds a production favicon route, co-locates the contacts
reference header, restores gallery captions/icons, tunes scene paper layers,
uses neutral visual-motif gallery labels, adds the phone booking/route CTA
split, and repairs the hero bounded crop's edge alpha/plaque underlay while
preserving the continuous scroll interpretation and provenance boundaries.
Runtime commit
`c288e4a7e1e0ba95da2f4476dbabb6243ab94993` is now local, reviewed and pushed;
the owner-only Sites version 7 deployment is live. Gallery copy and captions
are phrased as neutral visual motifs, while the strict raw-zero and missing
responsive baselines remain intentionally open.

## Execution status addendum — 2026-08-27

Four independent raw-driven agents completed a bounded polish pass. Menu
desktop crops now render at intrinsic 250×265 dimensions with measured
per-card offsets; the responsive cascade explicitly resets those offsets at
≤1200px and a browser contract checks the computed values at 390px and 320px.
About, Gallery and Contacts received small reference-aligned decorative and
diagonal refinements. The refreshed serialized suite is `29 files / 113 tests`;
lint, TypeScript, asset audit, build, browser `12/12`, accessibility `5/5` and
visual capture `1/1` are green. The raw comparator remains intentionally red at
`6,691,967 / 9,440,112` changed pixels (hero `1,007,264`; about `947,514`;
menu `1,305,070`; gallery `930,362`; souvenirs `974,225`; contacts `1,527,532`),
with no tolerance or mask. Runtime commit
`ddcf8dbaea0f538f84fd1b3d84e8a536952c4334` is pushed to GitHub and the Sites
source repository; Sites version 8 is deployed owner-only. AntiGravity remains
unused per the user's unavailability instruction, and raw-zero/missing
responsive baselines remain open quality gates.

## Execution status addendum — 2026-08-27 bounded plaque/map refresh

The final independent code review approved runtime commit
`4cf508abcd5b50efea47e82703edcdc5e84e5775` for integration with no P0/P1
findings. This candidate keeps the six scenes as live React/CSS/SVG sections in
one continuous scroll and adds only measured, bounded reference-derived layers:
the `137×379` hero plaque, `73×477` contacts plaque, and `634×312` contacts map
artwork. The contacts photos now render at their intrinsic desktop geometry and
the souvenir scene uses the calibrated flat paper field; all three new layers
are hidden below their desktop breakpoints while live semantic/ARIA markup
remains in place.

Fresh verification is green for serialized Vitest (`31 files / 120 tests`),
lint, TypeScript, asset audit (`29` assets), production build, browser
(`12/12`), accessibility (`5/5`), visual capture (`1/1`) and production
dependency audit (`0` high-severity vulnerabilities). The strict raw comparator
is intentionally red at `5,769,854 / 9,440,112` changed pixels (hero `789,934`,
about `947,514`, menu `1,305,073`, gallery `930,362`, souvenirs `932,954`,
contacts `864,017`), an improvement of `922,113` pixels (`13.78%`) with no
tolerance, mask or approval exception. The hero sentence is retained as
reference-derived concept copy and is not independently confirmed venue fact.

The exact source was pushed to GitHub and the Sites source repository, packaged
from the matching commit, saved as Sites version 9 and deployed to the existing
owner-only URL. The returned URL was checked in the in-app Browser; anonymous
access correctly shows the ChatGPT sign-in interstitial. AntiGravity was not
called again per the user's unavailability instruction. Raw-zero and responsive
baseline gates remain intentionally open.

## Execution status addendum — 2026-08-27 combined bounded rhythm pass

Six independent raw-driven agents completed bounded desktop-only polish with no
whole-screen PNG coupling: hero dot-grid registration, about CTA copy, contacts
sidebar/type rhythm, gallery inset image corners, menu card/heading rhythm, and
souvenir topographic/story alignment. Mobile overrides remain isolated.

The resulting runtime commit is
`a8f6e1cd40414143a28e1925fdd99886809aac41`. Fresh verification is green for
31 Vitest files / 125 tests, lint, TypeScript, asset audit (29 assets), build,
browser 12/12, accessibility 5/5, visual 1/1 and npm audit (0 high-severity
vulnerabilities). The strict raw comparator remains red at
`5,629,472 / 9,440,112` changed pixels (hero `789,931`; about `947,514`;
menu `1,167,038`; gallery `928,556`; souvenirs `932,845`; contacts `863,588`),
with no tolerance or mask.

The exact SHA is pushed to GitHub `main` and `feat/pixel-accurate-landing` and
the Sites source repository `main`; Sites version 10 was saved from the
matching archive and deployed owner-only. The local and production browser
checks remain complete; raw-zero and missing responsive baselines remain open.

## Execution status addendum — 2026-08-27 bounded reference-detail pass

The follow-up independent review kept only measured positive changes: a
transparent `176×450` cathedral-linework ROI in the menu, a desktop contacts
header/title surface adjustment, and desktop About/Gallery paper calibration
with their prior mobile surfaces restored. The asset registry, provenance
statement, accessibility selector and focused TDD contracts were updated; the
new decoration is `aria-hidden` and remains bounded to the menu scene.

Runtime commit `cbddfb75f847d7e142daa67294eb445f41925a56` is pushed to GitHub
`main` and `feat/pixel-accurate-landing` and synchronized to the Sites source
repository. The matching build archive was saved as Sites version 11 and
deployed owner-only. Fresh verification is green for 31 Vitest files / 130
tests, lint, TypeScript, asset audit (30), production build, browser 12/12,
accessibility 5/5, visual capture 1/1 and npm audit (0 high-severity issues).

The strict raw comparator remains intentionally red at
`5,583,911 / 9,440,112` changed pixels (hero `789,931`; about `942,133`; menu
`1,166,847`; gallery `901,261`; souvenirs `932,845`; contacts `850,894`), with
no tolerance, mask or approval exception. This is a `45,561`-pixel improvement
over the previous published candidate. Raw-zero and missing responsive
baselines remain open quality gates; AntiGravity was not called after the user
reported it unavailable.

## Execution status addendum — 2026-08-27 bounded ornament/copy pass

The latest bounded pass adds seven reference-derived cathedral, botanical and
seal linework assets across the six scenes and aligns the safe souvenir motif
labels to the supplied concept. The assets are individually registered with
parent hashes, ROIs and non-documentary provenance; each is a live bounded
desktop layer with an intentional mobile fallback or hide rule. The Gallery
progressive-disclosure control remains before the motif list because this
matches the supplied reference. AntiGravity analysis job
`deea0e25-5a71-4f6c-a04e-da6ac32f319b` proposed that order as a hypothesis; its
edit continuation `b8946fe6-022b-485e-aec6-96a41800509b` timed out during
browser checks, and the alternative reorder was independently measured as a
regression and reverted.

Runtime commit `ddc687f6689ffc9850ebc712a578dd463a8ad51c` is pushed to GitHub
`main` and `feat/pixel-accurate-landing` and synchronized to the Sites source
repository. Sites version 12 is deployed owner-only from the matching archive.
Fresh verification is green for 31 Vitest files / 140 tests, lint, TypeScript,
37-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and the production dependency audit. The strict raw
comparator remains intentionally red at `5,499,236 / 9,440,112` changed pixels
(hero `736,299`; about `941,854`; menu `1,166,766`; gallery `870,707`;
souvenirs `932,716`; contacts `850,894`), with no tolerance, mask or approval
exception. Raw-zero and missing responsive baselines remain open quality gates.

## Execution status addendum — 2026-08-27 bounded header-mark pass

The latest bounded pass adds one 47×49 reference-derived rosette crop to the
desktop header lockup, with the live SVG mark retained below the desktop
breakpoint. The crop is registered with parent hash, ROI and
`documentary: false` provenance; it excludes brand text and other header
content. The Contacts photo contract was narrowed to exclude this separate
header decoration from its two-photo assertion. Generic desktop paper-grain
and other exploratory ROI candidates were measured and reverted when they
increased the raw mismatch.

Runtime commit `31b8f3b3044e4dbde88fae354e253001a92ec8e0` is pushed to GitHub
`main` and `feat/pixel-accurate-landing` and synchronized to the Sites source
repository. Sites version 13 is deployed owner-only from the matching archive.
Fresh verification is green for 32 Vitest files / 142 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and the production dependency audit. The strict raw
comparator remains intentionally red at `5,499,213 / 9,440,112` changed pixels
(hero `736,298`; about `941,854`; menu `1,166,766`; gallery `870,707`;
souvenirs `932,716`; contacts `850,872`), a 23-pixel improvement over the
previous candidate with no tolerance, mask or approval exception. Raw-zero and
missing responsive baselines remain open quality gates.

## Execution status addendum — 2026-08-27 release-hygiene follow-up

The release-review follow-up keeps the accepted 47×49 desktop header crop and
all responsive behavior unchanged. `SiteHeader` now resolves the crop from the
validated `mediaManifest`, and a local lint suppression records why the exact
bounded raster `<img>` is intentional. No new visual exception, tolerance or
mask was introduced.

Runtime commit `6457765628b5156bb9e42322cef653d52495a66d` is pushed to GitHub
`main` and `feat/pixel-accurate-landing` and synchronized to the Sites source
repository. Sites version 14 is deployed owner-only from the matching archive
(`sha256:6a15fc7cbc29ace4a2b105d1a8f13da432562ab471573db6ea915a7eeb1ad441`,
129 files, 27,596,800 bytes). Full verification remains green for 32 Vitest
files / 142 tests, lint, TypeScript, 38-asset audit, production build,
Chromium browser 12/12, accessibility 5/5, visual capture 1/1 and the
production dependency audit. The strict raw comparator remains intentionally
red at `5,499,213 / 9,440,112` changed pixels; raw-zero and missing responsive
baselines remain open quality gates.

## Execution status addendum — 2026-08-27 bounded CSS calibration and Sites v15

Two independent raw-driven bounded passes are integrated in runtime commit
`33a84397d01cd1714d5ef7f3a3d89139bb39ba0e`: the wide About location card uses
a `94px` sidebar track, and the wide Menu heading uses `scaleY(.9)` with a
top-center origin. The Menu contract test covers the transform and the mobile
390px/320px resets remain unchanged. No visual tolerance, mask, copy or
provenance rule changed.

The runtime SHA was pushed to GitHub `main` and `feat/pixel-accurate-landing`
and synchronized to the Sites source repository. Sites version 15 is deployed
owner-only from the matching archive (`sha256:3ade958de437b632f076033eaa8ecf51fe4cb9e9e9dbb2f3e8c7fc528999ad09`,
129 files, 27,596,800 bytes) at the existing production URL; deployment
`appgdep_6a905599ca688191890650dc616dcb2d` reached `succeeded`.

Fresh verification is green for 32 Vitest files / 143 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and production dependency audit. The strict raw comparator
remains intentionally red with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 736,298 | 4.32861814 |
| about | 941,848 | 6.22187359 |
| menu | 1,166,747 | 5.93727866 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,716 | 7.09114966 |
| contacts | 850,872 | 4.26629022 |
| **Total** | **5,499,188 / 9,440,112** | **—** |

This is a 25-pixel improvement over Sites v14. Raw-zero and missing responsive
reference baselines remain open quality gates; the current release is usable
and published but is not represented as literal pixel identity.

## Execution status addendum — 2026-08-27 bounded desktop polish and Sites v16

Runtime commit `81a66760607f907cebc2811b9941791e827858bc` integrates four
bounded, raw-driven desktop calibrations: the opaque header surface is scoped to
the desktop breakpoint while mobile keeps its translucent surface, the hero
feature rail moves down `1px`, wide Contacts route-panel pseudo-markers are
hidden, and the wide Souvenirs story image uses a `0` radius. Each change has a
focused TDD contract; mobile 390px/320px resets and the continuous scene flow
remain unchanged. No new media, copy, provenance, tolerance or mask rule was
introduced.

The runtime SHA was pushed to GitHub `main` and `feat/pixel-accurate-landing`,
synchronized to the Sites source repository, saved as Sites version 16 from
the matching archive (`sha256:3d0c2d407da82856573cd1f2712dfe5825956b059158facc755a8aeb09071b4c`,
129 files, 27,596,800 bytes), and deployed owner-only. Deployment
`appgdep_6a9075a778388191948f72c7d4ab5bbe` reached `succeeded` at the existing
production URL.

Fresh verification is green for 33 Vitest files / 147 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1, and the production dependency audit. The fresh local
server on port 4180 returned HTTP 200 with the current client chunk and header
crop both reachable; 1920×1080, 1672×941, 390×844 and 320×844 probes reported
no horizontal overflow and the mobile menu remained operable.

The strict raw comparator remains intentionally red without tolerance or mask
at `5,473,941 / 9,440,112` changed pixels (hero `711,367`; about `941,848`;
menu `1,166,747`; gallery `870,707`; souvenirs `932,428`; contacts `850,844`),
an improvement of `25,247` pixels over Sites v15. Raw-zero and missing
responsive baselines remain open quality gates, so the goal stays active.

## Execution status addendum — 2026-08-27 bounded desktop alignment and Sites v17

Runtime commit `32a2249a20592fd1bc99163932d49104058d6fa5` integrates four
raw-driven, desktop-scoped calibrations: About title and cathedral illustration
offsets, a `2px` wide Gallery heading offset, a `4px/1px` wide Menu CTA offset,
and a measured `16px` desktop Souvenirs story-copy gap. A Contacts body-scale
hypothesis was tested and reverted after strict A/B increased the changed-pixel
count. Each accepted rule has a focused TDD contract; mobile guards and the
continuous scene flow remain unchanged. No new media, copy, provenance,
tolerance or mask rule was introduced.

The runtime SHA was timestamp-refreshed before push and published to GitHub
`main` and `feat/pixel-accurate-landing`, synchronized to the Sites source
repository, saved as Sites version 17 from the matching archive
(`sha256:c65fce7d6a9f105d675e068094a781484c68f3941b57478cfbb7230386977b18`,
129 files, 27,596,800 bytes), and deployed owner-only. Deployment
`appgdep_6a90849d5c2881919fea94dd9c74dc22` reached `succeeded` at the existing
production URL.

Fresh verification is green for 33 Vitest files / 152 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and production dependency audit with zero vulnerabilities.
The rebuilt local 4180 server returns HTTP 200; all four viewport probes are
overflow-free and the live mobile menu opens and closes.

The strict raw comparator remains intentionally red with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,743 | 5.86134826 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 870,690 | 7.99102823 |
| souvenirs | 932,428 | 7.07670598 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,473,801 / 9,440,112** | **—** |

This is a `140`-pixel improvement over Sites v16. Raw-zero and missing
responsive reference baselines remain open quality gates, so the goal stays
active and the release is not represented as literal pixel identity.

## Execution status addendum — 2026-08-27 bounded desktop-detail pass and Sites v18

The next independent ROI cycle is integrated in runtime commit
`f977e3612ed3ffc75c28757a31273e550557828e`. About now renders a separate
desktop-only detailed inline cathedral SVG inside the live plaque and retains
the original vector below `1081px`; the plaque frame and copy rhythm are
desktop-calibrated without changing semantic content. Gallery story details
move down to the measured CTA position at `min-width: 1440px`, and Souvenirs
removes the wide-desktop artwork shadow that produced a dark paper-band
mismatch. No whole-screen PNG, documentary claim, tolerance or mask was added.

The runtime SHA was timestamp-refreshed before push and published to GitHub
`main` and `feat/pixel-accurate-landing`, synchronized to the Sites source
repository, saved as Sites version 18 from archive
`sha256:e15cc03b7c6f39c2875679dd1a52ea12eefbbb6073bd0f923d82df9364458872`
(`129` files, `27,596,800` bytes), and deployed owner-only. Deployment
`appgdep_6a9091d8835481919516e2335ec809c9` reached `succeeded` at the existing
production URL.

Fresh verification is green for 33 Vitest files / 158 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and production dependency audit. The rebuilt 4180 handoff
server and independent mobile guard probe (1180px through 320px) report no
failed requests or horizontal overflow; live mobile menu, focus/body-lock,
carousel and the desktop-only plaque swap remain operable.

The strict raw comparator remains intentionally red with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 867,542 | 5.96713371 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,461,466 / 9,440,112** | **—** |

This is a `12,335`-pixel improvement over Sites v17. Raw-zero and missing
responsive reference baselines remain open quality gates, so the goal stays
active and the release is not represented as literal pixel identity.

## Execution status addendum — 2026-08-28 bounded desktop calibration and Sites v19

The next independent ROI cycle is integrated in runtime commit
`b9373605e57beca244bd6f6f9289d374b2cc33ce`. The wide desktop Menu heading now
uses measured tracking and a `16px` raster-origin nudge; Gallery inset captions
use the measured `62%`/`56%` vertical callout rhythm; Contacts route pictograms
receive small transforms only at the wide desktop breakpoint. Mobile/tablet
rules remain unchanged. TDD contracts were added for every candidate, and a
read-only independent review gave GO. AntiGravity job
`93c2d608-4e03-4784-a70e-c76891f11eb8` supplied the ROI ranking; its horizontal
Gallery suggestion was tested and rejected after A/B regression.

The runtime SHA was timestamp-refreshed before push and published to GitHub
`main` and `feat/pixel-accurate-landing`, synchronized to the Sites source
repository, saved as Sites version 19 from archive
`sha256:ca4ece7000b492140a927bca1d7babf874f6d3509184856e1362f1684024d817`
(`129` files, `27,596,800` bytes), and deployed owner-only. Deployment
`appgdep_6a90a5a1704081919bf0f870546c4644` reached `succeeded` at the existing
production URL.

Fresh verification is green for 33 Vitest files / 161 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser behavior 7/7,
accessibility 5/5, visual capture 1/1 and production dependency audit with
zero vulnerabilities. The rebuilt 4180 handoff server returns HTTP 200; the
temporary Playwright config against 4180 reports exact width equality and no
failed requests from `1920px` through `320px`, with menu/focus/carousel and
anchor interactions working.

The strict raw comparator remains intentionally red with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,642 | 5.86854118 |
| gallery | 866,775 | 5.93994049 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,460,612 / 9,440,112** | **—** |

This is an `854`-pixel improvement over Sites v18. Raw-zero and missing
responsive reference baselines remain open quality gates, so the goal stays
active and the release is not represented as literal pixel identity.
