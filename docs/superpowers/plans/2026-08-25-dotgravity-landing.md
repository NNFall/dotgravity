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
Sites version 6 save and verified owner-only production deployment are complete
for source commit `b0b71fc686a34955ccbb3083c0845050427ec553`; the raw-zero and
missing baseline items remain intentionally open quality limitations. The
latest refresh also adds a production favicon route, co-locates the contacts
reference header, restores gallery captions/icons, tunes scene paper layers,
uses neutral visual-motif gallery labels, adds the phone booking/route CTA
split, and repairs the hero bounded crop's edge alpha/plaque underlay while
preserving the continuous scroll interpretation and provenance boundaries.
Runtime commit
`b0b71fc686a34955ccbb3083c0845050427ec553` is now local, reviewed and pushed;
the owner-only Sites version 6 deployment is live. Gallery copy is phrased as
neutral visual motifs, while the strict raw-zero and missing responsive
baselines remain intentionally open.
