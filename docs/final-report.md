# Точка притяжения — финальный отчёт

## Результат

Собран единый адаптивный сайт кафе с непрерывным scroll-потоком: hero → about → menu → gallery → souvenirs → events bridge → contacts → footer. Шесть присланных экранов сохранены как отдельные React-сцены и anchor-состояния, а переходы между ними связаны общей бумажной фактурой, медными контурами, повторяющимися рамками, мягкими clip-path стыками и restrained motion. Цельные PNG-экраны в production не импортируются.

## Ссылки

- GitHub: `https://github.com/NNFall/dotgravity/tree/feat/pixel-accurate-landing`
- Runtime source commit: `6457765628b5156bb9e42322cef653d52495a66d` (GitHub `main` and feature branch; current private Sites deployment)
- Production (Sites, owner-only): `https://dotgravity.ferumnikita2009.chatgpt.site`
- Local handoff: `http://127.0.0.1:4180/`
- Desktop captures: `artifacts/visual/captures/1672x941/`
- Mobile review captures: `artifacts/visual/captures/mobile/full-390x844.png`, `artifacts/visual/captures/mobile/full-320x844.png`

## Verification evidence

| Gate | Result |
| --- | --- |
| `npm.cmd run lint` | pass |
| `npx.cmd tsc --noEmit` | pass |
| `npm.cmd run qa:assets` | pass — 38 registered assets / 30 production text files |
| `npm.cmd test` | pass — 32 files / 142 tests |
| `npm.cmd run build` | pass |
| `npm.cmd run qa:browser` | pass — 12 tests |
| `npm.cmd run qa:a11y` | pass — 5 tests |
| `npm.cmd run qa:visual` | pass — 1 six-scene capture test |
| `npm.cmd audit --omit=dev --audit-level=high` | pass — 0 production vulnerabilities |
| `git diff --check` | pass |
| Sites deployment | pass — version 14 published to production, owner-only access |

The strict raw RGBA comparator remains intentionally red: `5,499,213 / 9,440,112` pixels differ across the six 1672×941 captures (hero `736,298`; about `941,854`; menu `1,166,766`; gallery `870,707`; souvenirs `932,716`; contacts `850,872`). No tolerance or mask was introduced. The latest bounded header-mark pass improved the previous published report by `23` changed pixels, for a cumulative improvement of `1,192,754` pixels (`17.82%`) from the pre-polish report. There are no supplied 1920×1080 or mobile reference baselines, so those viewports have behavioral, responsive and overflow evidence rather than raw-zero proof.

## Provenance and rights

Generated/reference-compatible visual media and bounded `reference-derived` crops are registered separately from documentary Yandex material. VK content could not be confirmed through the managed browser. Yandex facts used in the UI are limited to the confirmed venue name, Samara address and phone; hours, prices, stock and booking availability are not asserted. Documentary-photo usage rights remain unconfirmed and should be cleared before an unrestricted public launch. About/gallery copy uses visual-concept wording, while souvenir copy uses neutral visual descriptions and explicitly labels illustrative motifs. The hero sentence `Сувениры и подарки рядом с великолепным католическим костёлом Самары.` is retained as reference-derived concept copy for visual fidelity and is not independently confirmed venue fact.

The final evidence refresh also adds a production `/favicon.svg` route so the
registered metadata icon is served by Vinext production, co-locates the contacts
reference header without a second interactive header, restores gallery inset
captions/icons, keeps gallery themes phrased as visual motifs rather than
unverified venue facts, and preserves mobile scene continuity.

Sites version 14 is live at the production URL from the exact source commit
above (version 13 is superseded). The deployment is intentionally owner-only; an anonymous request is
expected to show the ChatGPT sign-in screen rather than expose the page publicly.

AntiGravity Worker was available for this refresh. Its analysis job `deea0e25-5a71-4f6c-a04e-da6ac32f319b` identified a Gallery order hypothesis; the follow-up edit job `b8946fe6-022b-485e-aec6-96a41800509b` was allowed to test the bounded DOM change but timed out after its browser suite. Independent A/B measurement showed the reorder was worse, so it was reverted; no tolerance or mask was added. Independent Codex subagents supplied geometry, asset, responsive, raw-diff and code-review evidence. The current refresh records a 142-test suite, 38 registered assets, bounded header/cathedral/botanical/seal linework crops, reference-safe copy alignment, the exact bounded hero plaque, intrinsic contacts photos, a contacts plaque and bounded map artwork; the source is pushed and the owner-only Sites deployment is live.

## Previous bounded header-mark pass — 2026-08-27 (superseded by release-hygiene follow-up)

Runtime `31b8f3b3044e4dbde88fae354e253001a92ec8e0` adds one 47×49
`reference-derived` header rosette crop from the supplied hero concept. The
desktop header uses the bounded crop while the live SVG mark remains the
mobile fallback; the crop is non-documentary and does not include text or a
whole reference screen. The Contacts photo test was narrowed to exclude this
header decoration from its two-photo assertion.

Fresh evidence is green for 32 Vitest files / 142 tests, lint, TypeScript,
asset audit (38 assets), production build, Chromium behavior 12/12,
accessibility 5/5, visual capture 1/1, and the production dependency audit.
The raw comparator remains NO-GO at `5,499,213 / 9,440,112` changed pixels
(hero `736,298`; about `941,854`; menu `1,166,766`; gallery `870,707`;
souvenirs `932,716`; contacts `850,872`), with no tolerance, mask or approval
exception. Sites version 13 was deployed from the matching archive to the same
owner-only URL; anonymous access shows the expected sign-in interstitial.

## Latest release-hygiene follow-up — 2026-08-27

Runtime `6457765628b5156bb9e42322cef653d52495a66d` keeps the same rendered
geometry and pixel metrics while resolving the release-review recommendations:
the desktop header crop is obtained from the validated `mediaManifest`, and the
intentional raw `<img>` usage is locally documented for lint. No visual asset or
responsive rule changed in this follow-up.

Fresh evidence remains green for 32 Vitest files / 142 tests, lint, TypeScript,
asset audit (38 assets), production build, Chromium behavior 12/12,
accessibility 5/5, visual capture 1/1, and the production dependency audit.
The strict raw comparator remains NO-GO at `5,499,213 / 9,440,112` changed
pixels, unchanged from the bounded header candidate. Sites version 14 is
deployed from the matching archive (`sha256:6a15fc7cbc29ace4a2b105d1a8f13da432562ab471573db6ea915a7eeb1ad441`,
129 files, 27,596,800 bytes) to the same owner-only URL; anonymous access
continues to show the expected sign-in interstitial.

## Previous bounded ornament and copy pass — 2026-08-27 (superseded)

Runtime `ddc687f6689ffc9850ebc712a578dd463a8ad51c` adds seven bounded,
non-documentary reference-derived ornament assets across hero, about, menu,
gallery, souvenirs and contacts. The assets are rendered as separate desktop
edge layers with responsive vector/fallback behavior or deliberate hiding on
mobile. Souvenir motif labels now follow the supplied concept wording without
reintroducing unverified product facts. The Gallery details control remains
before the motif list because that order matches the supplied screen; the
AntiGravity alternative was measured and rejected after a negative A/B result.

Fresh evidence is green for 31 Vitest files / 140 tests, lint, TypeScript,
asset audit (37 assets), production build, Chromium behavior 12/12,
accessibility 5/5, visual capture 1/1, and the production dependency audit.
The strict raw comparator is still NO-GO at `5,499,236 / 9,440,112` changed
pixels, with no tolerance, mask or approval exception. The latest candidate is
published as Sites version 12 from the exact source/archive pair to the same
owner-only URL; anonymous in-app Browser access shows the expected sign-in
interstitial.

## Previous bounded rhythm pass — 2026-08-27 (superseded)

The post-publication candidate tightened the remaining reference geometry without
introducing a whole-screen image: desktop hero dot-grid registration and copy
offsets, the about CTA label, contacts route/sidebar typography and row rhythm,
gallery inset image corner treatment, menu card offsets plus wide-desktop paper
and heading rhythm, and souvenir topographic/story alignment. Mobile overrides
remain isolated and the live semantic structure is unchanged.

The candidate is runtime commit
`a8f6e1cd40414143a28e1925fdd99886809aac41`. Sites version 10 is deployed to the
same owner-only URL from that exact source/archive pair. Fresh gates are green
for 31 Vitest files / 125 tests, lint, TypeScript, assets (29), build, browser
12/12, accessibility 5/5, visual 1/1, and the production dependency audit.
The strict raw comparator remains NO-GO for literal pixel identity at
`5,629,472 / 9,440,112`; this is reported without a tolerance, mask or
exception. The latest private deployment was rechecked in the in-app Browser;
anonymous access still shows the expected ChatGPT sign-in interstitial.

## Previous bounded reference-detail pass — 2026-08-27 (superseded)

The follow-up candidate is runtime commit
`cbddfb75f847d7e142daa67294eb445f41925a56`. It adds a transparent,
bounded cathedral-linework asset from the supplied menu concept, keeps the
menu card border and desktop rhythm calibrated, tunes the desktop contacts
header/title surface, and flattens the desktop About/Gallery paper tones while
explicitly restoring their previous responsive mobile surfaces. The source,
asset registry and focused accessibility/provenance contracts are synchronized
and the new decoration remains `aria-hidden` and non-documentary.

Fresh gates are green for 31 Vitest files / 130 tests, lint, TypeScript, assets
(30), build, browser 12/12, accessibility 5/5, visual 1/1, and the production
dependency audit. The strict raw comparator remains NO-GO at
`5,583,911 / 9,440,112` changed pixels: hero `789,931`, about `942,133`, menu
`1,166,847`, gallery `901,261`, souvenirs `932,845`, contacts `850,894`.
No tolerance, mask or approval exception was introduced. Sites version 11 is
deployed from the exact source/archive pair to the same owner-only URL; the
anonymous in-app Browser check continues to show the expected sign-in
interstitial.

## Remaining quality work

For a literal zero-diff claim, capture and approve canonical baselines for 1920×1080, 390×844 and 320px, then iterate against the current raw comparator until all six desktop reference captures and the new responsive baselines satisfy the agreed pixel contract. The current result is published and usable, but this stricter evidence gate is not being represented as complete.
