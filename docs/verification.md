# Verification record

Last full local verification: 2026-08-27 (Europe/Samara), production build served at `http://127.0.0.1:4180/` for geometry probes and at the deterministic Playwright port `4174` for browser gates.

Port `4173` was already occupied by the unrelated `comod` checkout, so it was
left untouched; Dotgravity uses the stable handoff port `4180` and Playwright
continues to own its isolated `4174` server.

## Automated gates

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | pass | ESLint exited 0 |
| `npm.cmd test` | pass | 31 files, 140 tests; file parallelism disabled to avoid a reproducible Windows Vite-temp rename race |
| `npx.cmd tsc --noEmit` | pass | TypeScript exited 0 |
| `npm.cmd run qa:assets` | pass | 37 registered assets, 30 production text files, no unexpected media |
| `npm.cmd run build` | pass | Vinext production build completed |
| `npm.cmd run qa:browser` | pass | 12 Chromium tests |
| `npm.cmd run qa:a11y` | pass | 5 Chromium tests |
| `npm.cmd run qa:visual` | pass | live six-scene capture, 1 test |
| `npm.cmd run qa:raw` | expected red | 5,499,236 / 9,440,112 pixels differ; zero-difference contract is not claimed |

The raw comparison report and six heatmaps are stored under
`artifacts/visual/raw-comparison/1672x941/`. Live captures are stored under
`artifacts/visual/captures/1672x941/` with a capture manifest. The comparator
validates baseline hashes and dimensions and does not allow replacing a
baseline with a live capture.

## Browser evidence

The in-app Browser and terminal Chromium probes were checked against the
production server at all required viewports. The page has one document H1, 27
loaded images, a single `main`, six `section[data-scene]` anchors, a separate
`aside#events` bridge, and the continuous order
`hero → about → menu → gallery → souvenirs → events → contacts`.

| Viewport | client width / scroll width | document height | Notes |
| --- | ---: | ---: | --- |
| 1672×941 | 1672 / 1672 | 6129 px | all six desktop scenes inspected at their anchor positions |
| 1920×1080 | 1920 / 1920 | 6703 px | desktop scaling and navigation inspected |
| 390×844 | 375 / 375 | 9537 px | no horizontal overflow; menu rail, contacts wrap and footer inspected |
| 320×844 | 305 / 320 | 8976 px | no horizontal overflow; `Как нас найти` and footer wrap cleanly |

The mobile menu traps focus, closes on `Escape`, restores focus to its trigger,
and keeps touch targets at or above 44 px. Reduced-motion behavior is covered
by the accessibility suite.

## Provenance and deviations

- The six supplied target PNGs are design references, not documentary venue
  evidence. The implementation uses bounded regional assets and CSS/SVG scenes;
  it does not import a whole reference PNG. Menu, gallery, souvenirs, contacts,
  hero and about now use photo-only `reference-derived` crops bounded to their
  live image frames on desktop; mobile keeps the generated responsive fallback
  where the reference crop would compromise the composition.
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
  mask was introduced. The latest raw report is `5499236 / 9440112` changed
  pixels across the six supplied 1672×941 frames: hero is `736299` changed
  pixels, about is `941854`, menu is `1166766`, gallery is `870707`, souvenirs
  is `932716`, and contacts is `850894`. This is evidence, not a claimed pixel-perfect
  pass. No 1920×1080 or mobile baseline was supplied, so those viewports have
  behavioral/overflow coverage, not raw-zero proof.

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

The current verification candidate is runtime commit
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

The current verification candidate is runtime commit
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

### Latest bounded ornament and copy candidate — 2026-08-27

The current verification candidate is runtime commit
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
