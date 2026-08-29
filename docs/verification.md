# Verification record

Last full local verification: 2026-08-29 (Europe/Samara), production build served at `http://127.0.0.1:4180/` for geometry probes and browser gates. The current source candidate is `a73a20a7793d337d429c14ab9a83121637027b80`; the strict bounded visual baseline remains the supplied six-scene reference set.

Port `4173` was already occupied by the unrelated `comod` checkout and port
`4174` by the unrelated `whitecup` checkout, so both were left untouched.
Dotgravity uses the stable handoff port `4180`; the browser specs were run with
a temporary Playwright config pointed at that fresh server.

## Automated gates

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | pass | ESLint exited 0 |
| `npm.cmd test` | pass | 56 files, 227 tests; file parallelism disabled to avoid a reproducible Windows Vite-temp rename race |
| `npx.cmd tsc --noEmit` | pass | TypeScript exited 0 |
| `npm.cmd run qa:assets` | pass | 70 registered assets, 31 production text files, no unexpected media |
| `npm.cmd run build` | pass | Vinext production build completed |
| `npm.cmd run qa:browser` | pass | 12 Chromium tests |
| `npm.cmd run qa:a11y` | pass | 5 Chromium tests |
| `npm.cmd run qa:visual` | pass | live six-scene capture, 1 test |
| `npm.cmd run qa:raw` | expected red | 4,362,241 / 9,440,112 pixels differ; zero-difference contract is not claimed |

The raw comparison report and six heatmaps are stored under
`artifacts/visual/raw-comparison/1672x941/`. Live captures are stored under
`artifacts/visual/captures/1672x941/` with a capture manifest. The comparator
validates baseline hashes and dimensions and does not allow replacing a
baseline with a live capture.

## Browser evidence

The in-app Browser and terminal Chromium probes were checked against the
fresh local production server at all required viewports. The page has one document H1, 52
loaded images, a single `main`, six `section[data-scene]` anchors, a separate
`aside#events` bridge, and the continuous order
`hero → about → menu → gallery → souvenirs → events → contacts`.

| Viewport | client width / scroll width | document height | Notes |
| --- | ---: | ---: | --- |
| 1672×941 | 1672 / 1672 | 6129 px | all six desktop scenes inspected at their anchor positions |
| 1920×1080 | 1920 / 1920 | 6703 px | desktop scaling and navigation inspected |
| 390×844 | 390 / 390 | 9560 px | no horizontal overflow; menu rail, contacts wrap and footer inspected |
| 320×844 | 320 / 320 | 9044 px | no horizontal overflow; `Как нас найти` and footer wrap cleanly |

The mobile menu traps focus, closes on `Escape`, restores focus to its trigger,
and keeps touch targets at or above 44 px. Reduced-motion behavior is covered
by the accessibility suite.

## Current VPS deployment — 2026-08-29

The current source candidate `a73a20a7793d337d429c14ab9a83121637027b80` was
built with `DOTGRAVITY_BASE_PATH=/site/dotgravity` and installed at
`/root/dotgravity`. The uploaded archive SHA-256 is
`8b1d4afbf4c04d8cc19c9cb55bccbb933bd33c499db5ca779b95a2a78e945e6d`;
`dotgravity.service` is active on `127.0.0.1:4181`. During the smoke pass the
prefixed chunk exposed a stale Nginx mapping; the snippet was backed up and
updated to alias `/site/dotgravity/_next/` to the nested
`dist/client/site/dotgravity/_next/` tree. `nginx -t` and reload passed, with
only pre-existing duplicate-server-name warnings.

The canonical route at
[https://kaigo.space/site/dotgravity/](https://kaigo.space/site/dotgravity/)
returns `200`; the no-slash route returns `308`. The current JS/CSS chunks and
new Hero/Souvenirs reference-derived assets return `200`. Public Chromium
smoke is green at `1920×1080`, `1672×941`, `390×844` and `320×844`: zero
failed requests, zero broken images, equal client/scroll widths, six scene
anchors, and an operable mobile menu. Evidence is under
`artifacts/vps-public-final-*.png` and
`artifacts/vps-public-metrics-final.json`.

The strict raw comparator remains NO-GO: `4,362,241 / 9,440,112` pixels differ
across the six supplied `1672×941` scenes. No tolerance, mask or baseline
replacement is used.

## Previous VPS deployment — 2026-08-29 (superseded by current candidate)

The base-path build from `e9b626f84dd52a0e24a1aeba16a5539bcb6f9e32` is live at
the requested public route [kaigo.space/site/dotgravity](https://kaigo.space/site/dotgravity/).
The files are installed at `/root/dotgravity`; systemd runs the Vinext adapter
on `127.0.0.1:4181`, and Nginx owns the `/site/dotgravity/`, prefixed CSS
static-media/font aliases and root `/media/` locations. The exact path without
a trailing slash returns `308` to the canonical slash URL.
`systemd-analyze verify` and `nginx -t` passed (Nginx only reported pre-existing
duplicate-server-name warnings), and the service is `active (running)`.

An independent public Chromium pass returned `200` with the expected title,
six scenes, no failed requests (including CSS font and decorative-media
requests) and no broken images at `1920×1080`, `1672×941`, `390×844` and
`320×844`. In every viewport `scrollWidth === clientWidth`; the mobile menu
opens, focuses its first link and closes cleanly. The existing
`https://kaigo.space/` root route also remained `200`.

## Provenance and deviations

- The six supplied target PNGs are design references, not documentary venue
  evidence. The implementation uses bounded regional assets and CSS/SVG scenes;
  it does not import a whole reference PNG. Menu, gallery, souvenirs, contacts,
  hero and about now use photo-only `reference-derived` crops bounded to their
  live image frames on desktop; the header also uses a separate bounded logo
  mark crop; mobile keeps the generated responsive fallback where the reference
  crop would compromise the composition.
- Current production photos in the scene registry are marked
  `generated/reference-compatible` and are not presented as real photographs
  of the café. The provenance register records the separate documentary
  Yandex package and its access status.
- The latest bounded Hero pass adds four `62×62` transparent,
  `reference-derived` feature-icon crops for the wide desktop scene. They are
  separate assets with registry hashes and source coordinates; mobile and
  narrow tablet layouts keep the live Phosphor fallback so the responsive
  composition remains legible.
- The current runtime adds a bounded transparent Hero heading flower crop,
  five bounded Menu flower-badge crops, and paper-backed opaque cathedral-edge
  crops for About, Menu, Gallery and Contacts. A transparent Souvenirs outer
  frame ring is layered over the live photo. All are desktop-only, registered
  with source ROIs and `documentary: false`; semantic markup and responsive
  fallbacks remain active.
- The current runtime additionally registers bounded reference-derived crops for
  hero dots/curves, About paper arcs and location plaque, Menu topographic field
  and initial card rail, three full-surface Gallery inset cards, and Contacts
  dot field plus route panel. Each crop is limited to its measured desktop
  region; semantic HTML, live controls and responsive fallbacks remain active.
- About location-card, Menu card-rail and Contacts route-panel labels are
  editorial reference placeholders. They are not documentary venue, pricing,
  schedule or route facts and require confirmation before an unrestricted
  public launch.
- Yandex facts used in the UI are limited to the confirmed name, Samara address,
  and phone. Hours, current menu prices, and booking availability are not
  asserted. The VK group could not be read through the managed browser and is
  explicitly not treated as confirmed.
- The souvenir CTA asks visitors to уточнить наличие в кафе because live stock
  was not verified; this is a deliberate factual deviation from the supplied
  concept copy.
- Souvenir story descriptions use neutral visual language and explicit
  "иллюстративный мотив" wording; material, origin, date, condition and
  scarcity claims from the concept are not asserted as current catalogue facts.
- About and gallery editorial copy uses visual-concept wording (motifs,
  illustrative details and ideas) rather than asserting an unverified venue
  collection, artist roster or historical inventory.
- Events is an anchor bridge (`aside#events`) rather than a seventh reference
  scene; it exists because the navigation promises an events destination but
  no event reference screen was supplied. A semantic footer carries the VK,
  Yandex and provenance/status links without altering the six scene targets.
- The raw pixel gate remains red because generated/reference-compatible media,
  font rasterization, live browser rendering and intentionally live HTML
  overlays are not byte-identical to the supplied concept PNGs. No tolerance or
 mask was introduced. The latest raw report is `4447420 / 9440112` changed
 pixels across the six supplied 1672×941 frames: hero is `645197` changed
 pixels, about is `722601`, menu is `771114`, gallery is `759661`, souvenirs
 is `879997`, and contacts is `668850`. This is evidence, not a claimed pixel-perfect
  pass. No 1920×1080 or mobile baseline was supplied, so those viewports have
  behavioral/overflow coverage, not raw-zero proof.

## Current runtime publication — 2026-08-29

The exact runtime commit `69dfd75915b0acdf43b28a9bbe2b667ccc4c4144` was pushed
to the configured Sites source branch, saved as version `24`
(`appgprj_6a8eaec4754c8191b23a3f8e7a841bb6~appgver_f65717c796488191ba992662a1d88766`),
and deployed successfully as
`appgdep_6a91fa50e71c81919887f03c77dc05e9` to the owner-only production URL.
The archive was built from the validated `dist/` output and recorded as
`sha256:0daa637ee661a2ed5079d31f28e44f9bec9b9b29d845c79161ebb7c1d21b1aa5`
(`156` files, `31,621,120` bytes). The deployment returned status
`succeeded`; anonymous HTTP requests correctly receive `401` because the site
is intentionally owner-only.

## Previous bounded wide-desktop Menu heading calibration and publication — 2026-08-28

An independent Menu ROI A/B isolated a small wide-desktop raster-origin
candidate. Runtime commit `6cc049e8d53fada321eedb915cd717e6fa163e1b` moves the
Menu heading to `left:24px` and applies
`translateY(0.5px) scaleY(0.9)` inside `@media (min-width:1440px)`. The
change is `position:relative`, preserves document flow and leaves tablet/mobile
rules untouched. The focused Menu contract is green at `10/10`, and the
bounded read-only review returned PASS.

Fresh verification is green for 34 Vitest files / 166 tests, lint, TypeScript,
42-asset audit, production build, Chromium behavior 12/12, accessibility 5/5,
visual capture 1/1 and the production dependency audit (0 vulnerabilities).
The local handoff at `http://127.0.0.1:4180/` remains running; the required
desktop/mobile browser guards report equal document/client widths and retain
operable menu, carousel, focus and reduced-motion behavior.

The strict raw report remains intentionally NO-GO, improving by 89 changed
pixels from v21 to `5,451,343 / 9,440,112`:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 705,612 | 3.89986475 |
| about | 941,731 | 5.87446229 |
| menu | 1,165,210 | 5.19177892 |
| gallery | 864,693 | 5.74929021 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,451,343 / 9,440,112** | **—** |

Sites version 22 was saved from the exact source commit and deployed
successfully as `appgdep_6a916f59998c81918e8a151232af0573` to the existing
owner-only URL. Sites recorded archive content hash
`sha256:a89d6d716829dcf096843ad56de0d349356fa8bb37cfe8a31be410e040f74dcc`
(`133` files, `27,648,000` bytes). No tolerance, mask or baseline replacement
was introduced; raw-zero remains open.

## Latest bounded Menu/Gallery surface calibration and publication — 2026-08-28

Runtime `e2709dbcefaaf7a60e122d1997f7b659487d060c` is pushed to GitHub
`main`, `feat/pixel-accurate-landing` and the configured Sites source. This
bounded desktop pass keeps the six-scene React/CSS composition intact while
calibrating two reference-derived surfaces: the wide Menu CTA uses `#a04221`
and the Gallery inset cards/callouts use `#f4e7dc`, with a `3px` horizontal and
`1px` vertical caption offset. Menu is scoped to `min-width:1440px`; Gallery
is scoped to `min-width:901px`, so mobile/tablet rules remain unchanged. Focused
TDD contracts cover both selectors and explicitly guard the mobile breakpoint.

Fresh verification is green for 34 Vitest files / 166 tests, lint, TypeScript,
42-asset audit, production build, Chromium behavior 12/12, accessibility 5/5,
visual capture 1/1 and the production dependency audit (0 vulnerabilities).
The rebuilt local handoff at `http://127.0.0.1:4180/` remains running; browser
guards report equal document/client widths at `1920×1080`, `1672×941`,
`390×844` and `320×844`, with menu focus/body-lock and carousel interactions
operable.

The strict raw report is still intentionally NO-GO, but improves from the v20
`5,454,857` to `5,451,432 / 9,440,112` changed pixels (−3,425):

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 705,612 | 3.89986475 |
| about | 941,731 | 5.87446229 |
| menu | 1,165,299 | 5.79437548 |
| gallery | 864,693 | 5.74929021 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,451,432 / 9,440,112** | **—** |

Sites version 21 was saved from the same source commit and deployed
successfully as `appgdep_6a91521c33e88191b340813079c44cdd` to the existing
owner-only URL. The saved archive hash is
`sha256:e9ef0351ca1b2efe6e8fc01a6ad2fce3219b880d510879d9b2475d3c27883704`
(`133` files, `27,648,000` bytes). No tolerance, mask or baseline replacement
was introduced; raw-zero and responsive reference baselines remain open.

## Latest bounded Hero icon calibration and publication — 2026-08-28

The validated runtime is `d134743e27ac08a6a9f3a97c832ec5dab8cad093`, pushed to
GitHub `main`, `feat/pixel-accurate-landing` and the configured Sites source
repository. This bounded pass adds four independently registered `62×62`
transparent `reference-derived` feature-icon crops to the desktop Hero rail:
coffee, art, gift and cathedral. Each crop is an individual asset with a
parent-reference SHA, source coordinates and a documented chroma-alpha
transformation; no whole reference PNG is imported. At `max-width:720px` the
live Phosphor icons remain the responsive fallback.

Fresh verification is green for 34 Vitest files / 164 tests, lint, TypeScript,
42-asset audit, production build, Chromium behavior 12/12, accessibility 5/5,
visual capture 1/1 and `npm audit --omit=dev --audit-level=high` with zero
vulnerabilities. The rebuilt local `4180` server is running and the mobile
full-page captures remain overflow-free: document widths are exactly
`1920/1920`, `390/390` and `320/320`; the browser guard also covers the
`1672×941` reference viewport. The accepted Hero ROI changed from `44,590` to
`38,835` pixels (mean channel delta `8.52877358` to `1.8402`) in the feature
rail while leaving all other scene metrics unchanged.

The strict raw report remains red with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 705,612 | 3.89986475 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,642 | 5.86854118 |
| gallery | 866,775 | 5.93994049 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,454,857 / 9,440,112** | **—** |

The successful read-only AntiGravity audit `a18418c1-9ad3-4b20-989c-5111947f974f`
was cross-checked against source and pixels; its stale map-size hypothesis was
rejected and no unrelated Contacts change was integrated. Sites version 20 was
saved from the exact commit and deployed successfully as
`appgdep_6a9144c25efc8191a825e46bdde39b47` to the existing owner-only
production URL. Sites recorded archive content hash
`sha256:5694d9611875861b84218aaea4bcbac2c4a8fb3bc2197a18832b1a099ee7440f`
(`133` files, `27,648,000` bytes). Anonymous access remains expected to show
the ChatGPT sign-in interstitial; no public-access change was made.

## Latest bounded desktop calibration and publication — 2026-08-28

The validated runtime is `b9373605e57beca244bd6f6f9289d374b2cc33ce`, pushed to
both GitHub branches and synchronized to the Sites source repository. A fresh
AntiGravity ROI audit identified three low-risk desktop hotspots: Menu heading
tracking/origin, Gallery inset caption rhythm, and Contacts route pictograms.
The accepted rules are scoped to wide desktop breakpoints; mobile and tablet
layouts retain their previous geometry. Focused TDD contracts cover all three
changes, and an independent v19 review gave GO after A/B comparison.

The fresh full suite is green: 33 Vitest files / 161 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser behavior 7/7 plus
accessibility 5/5, visual capture 1/1 and production dependency audit with
zero vulnerabilities. Browser probes against the rebuilt 4180 server report
no failed requests and exact document/client widths from `1920px` through
`320px`; menu focus/body-lock, carousel controls and anchor navigation remain
operable.

The strict raw report remains red, with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,642 | 5.86854118 |
| gallery | 866,775 | 5.93994049 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,460,612 / 9,440,112** | **—** |

Sites version 19 was saved from the matching archive
(`sha256:ca4ece7000b492140a927bca1d7babf874f6d3509184856e1362f1684024d817`,
129 files, 27,596,800 bytes) and deployed successfully as
`appgdep_6a90a5a1704081919bf0f870546c4644` to the existing owner-only URL.
Raw-zero and missing responsive reference baselines remain open gates.

## Latest bounded desktop-detail pass and publication — 2026-08-27

The validated runtime is `f977e3612ed3ffc75c28757a31273e550557828e`, pushed to
both GitHub branches and synchronized to the Sites source repository. About
adds a detailed inline decorative cathedral SVG only on wide desktop and keeps
the original vector on mobile/tablet; the plaque frame and copy rhythm are
calibrated in the same bounded scope. Gallery moves its wide-desktop CTA down
to the measured story position, and Souvenirs removes the wide-desktop artwork
shadow that created a dark paper-band mismatch. These are live CSS/SVG rules,
not whole-screen PNGs, and focused TDD contracts cover each breakpoint guard.

The fresh full suite is green: 33 Vitest files / 158 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and production dependency audit with zero vulnerabilities.
The rebuilt handoff server at `127.0.0.1:4180` returned HTTP 200; probes from
`1180px` through `320px` reported equal document/client widths, no failed
requests, and working live mobile menu/carousel behavior. The plaque swap was
confirmed at runtime (wide desktop only) and no horizontal overflow was found.

The strict raw report remains red, with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 867,542 | 5.96713371 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,461,466 / 9,440,112** | **—** |

Sites version 18 was saved from the matching archive
(`sha256:e15cc03b7c6f39c2875679dd1a52ea12eefbbb6073bd0f923d82df9364458872`,
129 files, 27,596,800 bytes) and deployed successfully as
`appgdep_6a9091d8835481919516e2335ec809c9` to the existing owner-only URL.
The latest read-only code review was GO for the bounded candidate; its only
documentation note was to classify the inline About SVG as generated
decorative vector, which this record now does. Raw-zero and absent responsive
reference baselines remain open gates.

## Latest bounded desktop alignment and publication — 2026-08-27

The validated runtime is `32a2249a20592fd1bc99163932d49104058d6fa5`, pushed to
both GitHub branches and synchronized to the Sites source repository. Four
desktop-scoped CSS calibrations are included: About title and cathedral
illustration offsets, a `2px` wide Gallery heading offset, a `4px/1px` wide
Menu CTA offset, and a measured `16px` desktop Souvenirs story-copy gap. A
Contacts body-scale hypothesis was rejected after strict A/B because it added
changed pixels; Contacts source is unchanged in this candidate. Each accepted
rule has a focused TDD contract, mobile guards remain intact, and no new media,
copy, provenance, tolerance or mask rule was introduced.

The fresh full suite is green: 33 Vitest files / 152 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and production dependency audit with zero vulnerabilities.
The handoff server at `127.0.0.1:4180` was rebuilt from this source; the root,
current client chunks and registered header crop returned HTTP 200. Probes at
`1920×1080`, `1672×941`, `390×844` and `320×844` reported equal client and
scroll widths, and the mobile menu opened and closed through the live bundle.

The strict raw report remains red, with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,743 | 5.86134826 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 870,690 | 7.99102823 |
| souvenirs | 932,428 | 7.07670598 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,473,801 / 9,440,112** | **—** |

This is `140` fewer changed pixels than the Sites v16 report. Sites version 17
was saved from the matching archive (`sha256:c65fce7d6a9f105d675e068094a781484c68f3941b57478cfbb7230386977b18`,
129 files, 27,596,800 bytes) and deployed successfully as
`appgdep_6a90849d5c2881919fea94dd9c74dc22` to the existing owner-only
production URL. Raw-zero and missing responsive baselines remain open gates.

## Previous evidence refresh — 2026-08-27 (superseded by the current candidate below)

The latest source refresh includes measured per-scene background tuning, a
continuous hero photo layer beneath the live plaque (with the accidental
edge-alpha strips removed), desktop hero type/icon rhythm tuning, a separate
phone booking CTA plus Yandex route link in contacts, updated gallery labels,
an exact bounded hero plaque strip, intrinsic desktop contacts crops, a
contacts plaque strip, and a bounded contacts map artwork layer. The bounded
hero crop remains `947×836`; its registry SHA is
`789791B7809699ABDA65EBF2D2AB03A9E2EE2448FB43D12CA24AE0F12FBAC624`.

The fresh capture at `1672×941` (capture files written 12:20:54–12:20:56
Europe/Samara) reports: hero `789,934`, about `947,514`,
menu `1,305,073`, gallery `930,362`, souvenirs `932,954`, contacts `864,017`
changed pixels; total `5,769,854 / 9,440,112`. This remains a strict
zero-tolerance failure and no mask/tolerance/exception was introduced.
The refreshed serialized suite is `31 files / 120 tests`; lint, TypeScript,
asset audit (`29` assets), production build, Chromium behavior (`12/12`),
accessibility (`5/5`), visual capture (`1/1`) and production dependency audit
(`0` high-severity vulnerabilities) pass. The local production probe reports
`1920×1080: 1920/1920, 6703px`, `390×844: 390/390, 9486px`, and
`320×844: 320/320, 8969px`, with all six scenes, no console errors and both
contacts actions present. The menu crop pass removed the desktop-only image
scale and aligned each bounded card to its measured reference origin. Its
responsive reset is covered by both a CSS contract and a browser assertion at
390px and 320px. About, gallery and contacts received bounded decorative/
diagonal refinements; the strict raw result improved by `922,113` pixels
(`13.78%`) versus the previous report. AntiGravity was not retried per the
user's unavailability instruction. The hero reference sentence is retained
for visual fidelity as concept-derived copy and is not independently confirmed
venue fact. The desktop-only plaque/map layers leave live semantic/ARIA markup
in the DOM; mobile keeps the responsive fallback composition.

### Current bounded rhythm candidate — 2026-08-27

The previous rhythm candidate was runtime commit
`a8f6e1cd40414143a28e1925fdd99886809aac41`, published as Sites version 10 from
the matching build archive. The latest visual capture and raw report are the
ones under `artifacts/visual/captures/1672x941/` and
`artifacts/visual/raw-comparison/1672x941/`; the fresh strict metrics are:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 789,931 | 4.56900363 |
| about | 947,514 | 6.37672403 |
| menu | 1,167,038 | 6.36761592 |
| gallery | 928,556 | 8.41061965 |
| souvenirs | 932,845 | 7.22634223 |
| contacts | 863,588 | 5.08241973 |
| **Total** | **5,629,472 / 9,440,112** | **—** |

The zero-difference gate is still intentionally red; no mask, channel
tolerance or approval exception was added. The combined pass is smaller than
the previous published candidate by 140,382 changed pixels. Regression status
is green for 31 Vitest files / 125 tests, lint, TypeScript, assets (29), build,
Chromium behavior (12/12), accessibility (5/5), visual capture (1/1), and the
production dependency audit. The in-app Browser reload confirms one H1, six
scene anchors, the events bridge, both contacts actions and no horizontal
overflow at the handoff viewport. Anonymous production access continues to
show the expected owner-only sign-in interstitial.

Fresh mobile full-page evidence is kept at
`artifacts/visual/captures/mobile/full-390x844.png` and
`artifacts/visual/captures/mobile/full-320x844.png`; these are review captures,
not reference baselines.

### Previous bounded reference-detail candidate — 2026-08-27 (superseded)

The previous verification candidate was runtime commit
`cbddfb75f847d7e142daa67294eb445f41925a56`, published as Sites version 11
from the matching build archive. It adds the bounded transparent cathedral
linework crop, calibrated menu border/rhythm, desktop contacts header/title
alignment, and desktop-only About/Gallery paper tuning while restoring the
prior mobile paper surfaces. The new decorative image remains `aria-hidden`
and is excluded from the five accessible menu-photo count.

The fresh visual capture and raw report are stored under
`artifacts/visual/captures/1672x941/` and
`artifacts/visual/raw-comparison/1672x941/`. Strict metrics are:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 789,931 | 4.56900363 |
| about | 942,133 | 6.36232579 |
| menu | 1,166,847 | 6.16891976 |
| gallery | 901,261 | 8.31992936 |
| souvenirs | 932,845 | 7.22634223 |
| contacts | 850,894 | 4.39409713 |
| **Total** | **5,583,911 / 9,440,112** | **—** |

The raw-zero gate remains intentionally red with no mask, tolerance or
approval exception. This candidate improves the previous published report by
45,561 changed pixels (`0.81%`) and the pre-polish report by 1,108,056 pixels
(`16.56%`). Regression status is green for 31 Vitest files / 130 tests, lint,
TypeScript, assets (30), build, Chromium behavior (12/12), accessibility
(5/5), visual capture (1/1), and the production dependency audit.

### Previous bounded ornament and copy candidate — 2026-08-27 (superseded)

The previous verification candidate was runtime commit
`ddc687f6689ffc9850ebc712a578dd463a8ad51c`, published as Sites version 12
from the matching build archive. It adds seven bounded reference-derived
cathedral, botanical and seal ornaments across the six scenes and aligns the
safe souvenir motif labels with the supplied concept. The desktop raster
layers are each scoped to their measured edge ROI; mobile either keeps the
vector fallback or hides the desktop-only artwork. Gallery details remain
before the motif list because that matches the supplied screen. The alternate
AntiGravity reorder was measured as a regression and reverted.

The fresh visual capture and raw report are stored under
`artifacts/visual/captures/1672x941/` and
`artifacts/visual/raw-comparison/1672x941/`. Strict metrics are:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 736,299 | 4.40895807 |
| about | 941,854 | 6.23070711 |
| menu | 1,166,766 | 6.03281259 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,716 | 7.09114966 |
| contacts | 850,894 | 4.32328239 |
| **Total** | **5,499,236 / 9,440,112** | **—** |

The raw-zero gate remains intentionally red with no mask, tolerance or
approval exception. This candidate improves the previous published report by
84,675 changed pixels (`1.52%`) and the pre-polish report by 1,192,731 pixels
(`17.82%`). Regression status is green for 31 Vitest files / 140 tests, lint,
TypeScript, assets (37), build, Chromium behavior (12/12), accessibility
(5/5), visual capture (1/1), and the production dependency audit.

In-app Browser checks at 1920×1080, 390×844 and 320×844 remain overflow-free;
the local handoff server is `http://127.0.0.1:4180/`. The production URL is
owner-only and anonymous navigation shows the expected ChatGPT sign-in screen.
AntiGravity analysis job `deea0e25-5a71-4f6c-a04e-da6ac32f319b` supplied the
Gallery hypothesis. Its edit continuation `b8946fe6-022b-485e-aec6-96a41800509b`
passed focused tests/build/a11y but exceeded the 900-second worker limit while
running browser checks; its negative A/B reorder was not retained.

### Previous bounded header-mark candidate — 2026-08-27 (superseded by release-hygiene follow-up)

The previous verification candidate was runtime commit
`31b8f3b3044e4dbde88fae354e253001a92ec8e0`, published as Sites version 13
from the matching build archive. It adds one 47×49 `reference-derived` header
rosette crop for the desktop lockup while retaining the live SVG mark below the
desktop breakpoint. The crop is non-documentary and excludes brand text and
other header content; the Contacts photo assertion explicitly excludes it.

The fresh visual capture and raw report are stored under
`artifacts/visual/captures/1672x941/` and
`artifacts/visual/raw-comparison/1672x941/`. Strict metrics are:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 736,298 | 4.32861814 |
| about | 941,854 | 6.23070711 |
| menu | 1,166,766 | 6.03281259 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,716 | 7.09114966 |
| contacts | 850,872 | 4.26629022 |
| **Total** | **5,499,213 / 9,440,112** | **—** |

The raw-zero gate remains intentionally red with no mask, tolerance or
approval exception. This candidate improves the previous published report by
23 changed pixels; it does not alter the mobile composition. Regression status
is green for 32 Vitest files / 142 tests, lint, TypeScript, assets (38), build,
Chromium behavior (12/12), accessibility (5/5), visual capture (1/1), and the
production dependency audit. Sites version 13 was deployed owner-only; anonymous
navigation continues to show the expected sign-in interstitial.

### Previous release-hygiene follow-up — 2026-08-27 (superseded by current bounded CSS calibration)

Runtime commit `6457765628b5156bb9e42322cef653d52495a66d` is the current
GitHub/Sites source state. It leaves the bounded header crop and responsive
rendering unchanged, resolves the crop through the validated `mediaManifest`,
and documents the intentional raw `<img>` for warning-free lint.

The same strict report remains current: `5,499,213 / 9,440,112` changed
pixels with no tolerance or mask. All other gates remain green (32 Vitest
files / 142 tests, lint, TypeScript, 38-asset audit, build, browser 12/12,
accessibility 5/5, visual 1/1 and production dependency audit). Sites version
14 is deployed from the matching archive (`sha256:6a15fc7cbc29ace4a2b105d1a8f13da432562ab471573db6ea915a7eeb1ad441`,
129 files, 27,596,800 bytes) owner-only at the production URL.

### Current bounded CSS calibration — 2026-08-27

Runtime commit `33a84397d01cd1714d5ef7f3a3d89139bb39ba0e` is pushed to GitHub
`main` and `feat/pixel-accurate-landing` and synchronized to the Sites source
repository. The bounded pass changes only desktop geometry: the About
location-card sidebar track is `94px` at the wide layout, and the Menu heading
uses `scaleY(.9)` at the wide breakpoint. The contract test covers the Menu
transform; mobile 390px and 320px retain their responsive reset.

Fresh verification is green for 32 Vitest files / 143 tests, lint, TypeScript,
38-asset audit, production build, Chromium browser 12/12, accessibility 5/5,
visual capture 1/1 and the production dependency audit. The strict raw report
is still intentionally red with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 736,298 | 4.32861814 |
| about | 941,848 | 6.22187359 |
| menu | 1,166,747 | 5.93727866 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,716 | 7.09114966 |
| contacts | 850,872 | 4.26629022 |
| **Total** | **5,499,188 / 9,440,112** | **—** |

This is a 25-pixel improvement over the previous Sites v14 report; raw-zero
and missing responsive baselines remain open quality gates. Sites version 15
was saved from the matching archive (`sha256:3ade958de437b632f076033eaa8ecf51fe4cb9e9e9dbb2f3e8c7fc528999ad09`,
129 files, 27,596,800 bytes) and deployed successfully owner-only at the
production URL. Deployment `appgdep_6a905599ca688191890650dc616dcb2d` reached
`succeeded`; anonymous access continues to show the expected sign-in
interstitial.

### Current bounded desktop polish — 2026-08-27

Runtime commit `81a66760607f907cebc2811b9941791e827858bc` is pushed to GitHub
`main` and `feat/pixel-accurate-landing`, synchronized to the Sites source
repository, and deployed as Sites version 16. The accepted bounded changes are
desktop-only: the opaque header surface is scoped back to the desktop
breakpoint, the hero feature rail moves down `1px`, wide Contacts route-panel
pseudo-markers are hidden, and the wide Souvenirs story image uses a `0` radius.
Mobile resets remain intact; focused contracts cover all four breakpoint rules.

Fresh verification is green for 33 Vitest files / 147 tests, lint, TypeScript,
38-asset audit, production build, browser behavior 12/12, accessibility 5/5,
visual capture 1/1, and `npm audit --omit=dev --audit-level=high` (0
vulnerabilities). The fresh 4180 production probe returned HTTP 200, fetched
the current client chunk three times with HTTP 200, and fetched the registered
header crop with HTTP 200. Chromium probes at 1920×1080, 1672×941, 390×844 and
320×844 reported `scrollWidth === clientWidth`; mobile menu open/close was
operable in the current bundle.

The strict raw report is still intentionally red with no mask or tolerance:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,848 | 6.22187359 |
| menu | 1,166,747 | 5.93727866 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,428 | 7.08657233 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,473,941 / 9,440,112** | **—** |

The candidate improves Sites v15 by `25,247` changed pixels. Sites version 16
archive provenance is `sha256:3d0c2d407da82856573cd1f2712dfe5825956b059158facc755a8aeb09071b4c`,
129 files and 27,596,800 bytes; deployment
`appgdep_6a9075a778388191948f72c7d4ab5bbe` reached `succeeded`. Owner-only
access remains unchanged and anonymous navigation is expected to show the
ChatGPT sign-in interstitial. Raw-zero and missing responsive baselines remain
open quality gates.
