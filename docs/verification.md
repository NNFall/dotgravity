# Verification record

Last full local verification: 2026-08-26 (Europe/Samara), production build served at `http://127.0.0.1:4174/`.

## Automated gates

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | pass | ESLint exited 0 |
| `npm.cmd test` | pass | 25 files, 92 tests |
| `npx.cmd tsc --noEmit` | pass | TypeScript exited 0 |
| `npm.cmd run qa:assets` | pass | 8 registered assets, no unexpected media |
| `npm.cmd run build` | pass | Vinext production build completed |
| `npm.cmd run qa:browser` | pass | 11 Chromium tests |
| `npm.cmd run qa:a11y` | pass | 4 Chromium tests |
| `npm.cmd run qa:visual` | pass | live six-scene capture, 1 test |
| `npm.cmd run qa:raw` | expected red | 9,439,920 / 9,440,112 pixels differ; zero-difference contract is not claimed |

The raw comparison report and six heatmaps are stored under
`artifacts/visual/raw-comparison/1672x941/`. Live captures are stored under
`artifacts/visual/captures/1672x941/` with a capture manifest. The comparator
validates baseline hashes and dimensions and does not allow replacing a
baseline with a live capture.

## Browser evidence

The in-app Browser was checked against the production server at all required
viewports. The page has one document H1, 18 loaded images, a single `main`, and
the scene order `hero → about → menu → gallery → souvenirs → events → contacts`.

| Viewport | client width / scroll width | document height | Notes |
| --- | ---: | ---: | --- |
| 1672×941 | 1672 / 1672 | 5825 px | all six desktop scenes inspected at their anchor positions |
| 1920×1080 | 1920 / 1920 | 6399 px | desktop scaling and navigation inspected |
| 390×844 | 375 / 375 | 9127 px | native scrollbar gutter; no horizontal overflow; menu rail and contacts wrap inspected |
| 320×844 | 320 / 320 | 8602 px | no horizontal overflow; `Как нас найти` wraps cleanly |

The mobile menu traps focus, closes on `Escape`, restores focus to its trigger,
and keeps touch targets at or above 44 px. Reduced-motion behavior is covered
by the accessibility suite.

## Provenance and deviations

- The six supplied target PNGs are design references, not documentary venue
  evidence. The implementation uses bounded regional assets and CSS/SVG scenes;
  it does not import a whole reference PNG.
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
- The raw pixel gate remains red because generated/reference-compatible media,
  font rasterization, and live browser rendering are not byte-identical to the
  supplied concept PNGs. No tolerance or mask was introduced.
