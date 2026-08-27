# Verification record

Last full local verification: 2026-08-27 (Europe/Samara), production build served at `http://127.0.0.1:4180/` for geometry probes and at the deterministic Playwright port `4174` for browser gates.

Port `4173` was already occupied by the unrelated `comod` checkout, so it was
left untouched; Dotgravity uses the stable handoff port `4180` and Playwright
continues to own its isolated `4174` server.

## Automated gates

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | pass | ESLint exited 0 |
| `npm.cmd test` | pass | 33 files, 158 tests; file parallelism disabled to avoid a reproducible Windows Vite-temp rename race |
| `npx.cmd tsc --noEmit` | pass | TypeScript exited 0 |
| `npm.cmd run qa:assets` | pass | 38 registered assets, 30 production text files, no unexpected media |
| `npm.cmd run build` | pass | Vinext production build completed |
| `npm.cmd run qa:browser` | pass | 12 Chromium tests |
| `npm.cmd run qa:a11y` | pass | 5 Chromium tests |
| `npm.cmd run qa:visual` | pass | live six-scene capture, 1 test |
| `npm.cmd run qa:raw` | expected red | 5,461,466 / 9,440,112 pixels differ; zero-difference contract is not claimed |

The raw comparison report and six heatmaps are stored under
`artifacts/visual/raw-comparison/1672x941/`. Live captures are stored under
`artifacts/visual/captures/1672x941/` with a capture manifest. The comparator
validates baseline hashes and dimensions and does not allow replacing a
baseline with a live capture.

## Browser evidence

The in-app Browser and terminal Chromium probes were checked against the
production server at all required viewports. The page has one document H1, 28
loaded images, a single `main`, six `section[data-scene]` anchors, a separate
`aside#events` bridge, and the continuous order
`hero → about → menu → gallery → souvenirs → events → contacts`.

| Viewport | client width / scroll width | document height | Notes |
| --- | ---: | ---: | --- |
| 1672×941 | 1672 / 1672 | 6129 px | all six desktop scenes inspected at their anchor positions |
| 1920×1080 | 1920 / 1920 | 6703 px | desktop scaling and navigation inspected |
| 390×844 | 390 / 390 | 9463 px | no horizontal overflow; menu rail, contacts wrap and footer inspected |
| 320×844 | 320 / 320 | 8946 px | no horizontal overflow; `Как нас найти` and footer wrap cleanly |

The mobile menu traps focus, closes on `Escape`, restores focus to its trigger,
and keeps touch targets at or above 44 px. Reduced-motion behavior is covered
by the accessibility suite.

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
  mask was introduced. The latest raw report is `5473801 / 9440112` changed
  pixels across the six supplied 1672×941 frames: hero is `711367` changed
  pixels, about is `941731`, menu is `1166729`, gallery is `867542`, souvenirs
  is `923253`, and contacts is `850844`. This is evidence, not a claimed pixel-perfect
  pass. No 1920×1080 or mobile baseline was supplied, so those viewports have
  behavioral/overflow coverage, not raw-zero proof.

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
