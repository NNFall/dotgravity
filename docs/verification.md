# Verification record

Last full local verification: 2026-08-26 (Europe/Samara), production build served at `http://127.0.0.1:4180/` for geometry probes and at the deterministic Playwright port `4174` for browser gates.

Port `4173` was already occupied by the unrelated `comod` checkout, so it was
left untouched; Dotgravity uses the stable handoff port `4180` and Playwright
continues to own its isolated `4174` server.

## Automated gates

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | pass | ESLint exited 0 |
| `npm.cmd test` | pass | 29 files, 104 tests; file parallelism disabled to avoid a reproducible Windows Vite-temp rename race |
| `npx.cmd tsc --noEmit` | pass | TypeScript exited 0 |
| `npm.cmd run qa:assets` | pass | 26 registered assets, no unexpected media |
| `npm.cmd run build` | pass | Vinext production build completed |
| `npm.cmd run qa:browser` | pass | 12 Chromium tests |
| `npm.cmd run qa:a11y` | pass | 5 Chromium tests |
| `npm.cmd run qa:visual` | pass | live six-scene capture, 1 test |
| `npm.cmd run qa:raw` | expected red | 8,889,835 / 9,440,112 pixels differ; zero-difference contract is not claimed |

The raw comparison report and six heatmaps are stored under
`artifacts/visual/raw-comparison/1672x941/`. Live captures are stored under
`artifacts/visual/captures/1672x941/` with a capture manifest. The comparator
validates baseline hashes and dimensions and does not allow replacing a
baseline with a live capture.

## Browser evidence

The in-app Browser and terminal Chromium probes were checked against the
production server at all required viewports. The page has one document H1, 18
loaded images, a single `main`, six `section[data-scene]` anchors, a separate
`aside#events` bridge, and the continuous order
`hero → about → menu → gallery → souvenirs → events → contacts`.

| Viewport | client width / scroll width | document height | Notes |
| --- | ---: | ---: | --- |
| 1672×941 | 1672 / 1672 | 6024 px | all six desktop scenes inspected at their anchor positions |
| 1920×1080 | 1920 / 1920 | 6598 px | desktop scaling and navigation inspected |
| 390×844 | 390 / 390 | 9443 px | no horizontal overflow; menu rail, contacts wrap and footer inspected |
| 320×844 | 320 / 320 | 8960 px | no horizontal overflow; `Как нас найти` and footer wrap cleanly |

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
- Events is an anchor bridge (`aside#events`) rather than a seventh reference
  scene; it exists because the navigation promises an events destination but
  no event reference screen was supplied. A semantic footer carries the VK,
  Yandex and provenance/status links without altering the six scene targets.
- The raw pixel gate remains red because generated/reference-compatible media,
  font rasterization, live browser rendering and intentionally live HTML
  overlays are not byte-identical to the supplied concept PNGs. No tolerance or
  mask was introduced. The latest raw report is `8889835 / 9440112` changed
  pixels across the six supplied 1672×941 frames; hero is `1050740` changed
  pixels and about is `1546643`. This is evidence, not a claimed pixel-perfect
  pass. No 1920×1080 or mobile baseline was supplied, so those viewports have
  behavioral/overflow coverage, not raw-zero proof.

Fresh mobile full-page evidence is kept at
`artifacts/visual/captures/mobile/full-390x844.png` and
`artifacts/visual/captures/mobile/full-320x844.png`; these are review captures,
not reference baselines.
