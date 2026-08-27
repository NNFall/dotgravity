# Точка притяжения — финальный отчёт

## Результат

Собран единый адаптивный сайт кафе с непрерывным scroll-потоком: hero → about → menu → gallery → souvenirs → events bridge → contacts → footer. Шесть присланных экранов сохранены как отдельные React-сцены и anchor-состояния, а переходы между ними связаны общей бумажной фактурой, медными контурами, повторяющимися рамками, мягкими clip-path стыками и restrained motion. Цельные PNG-экраны в production не импортируются.

## Ссылки

- GitHub: `https://github.com/NNFall/dotgravity/tree/feat/pixel-accurate-landing`
- Runtime source commit: `cbddfb75f847d7e142daa67294eb445f41925a56` (GitHub `main` and feature branch; current private Sites deployment)
- Production (Sites, owner-only): `https://dotgravity.ferumnikita2009.chatgpt.site`
- Local handoff: `http://127.0.0.1:4180/`
- Desktop captures: `artifacts/visual/captures/1672x941/`
- Mobile review captures: `artifacts/visual/captures/mobile/full-390x844.png`, `artifacts/visual/captures/mobile/full-320x844.png`

## Verification evidence

| Gate | Result |
| --- | --- |
| `npm.cmd run lint` | pass |
| `npx.cmd tsc --noEmit` | pass |
| `npm.cmd run qa:assets` | pass — 30 registered assets / 30 production text files |
| `npm.cmd test` | pass — 31 files / 130 tests |
| `npm.cmd run build` | pass |
| `npm.cmd run qa:browser` | pass — 12 tests |
| `npm.cmd run qa:a11y` | pass — 5 tests |
| `npm.cmd run qa:visual` | pass — 1 six-scene capture test |
| `npm.cmd audit --omit=dev --audit-level=high` | pass — 0 production vulnerabilities |
| `git diff --check` | pass |
| Sites deployment | pass — version 11 published to production, owner-only access |

The strict raw RGBA comparator remains intentionally red: `5,583,911 / 9,440,112` pixels differ across the six 1672×941 captures (hero `789,931`; about `942,133`; menu `1,166,847`; gallery `901,261`; souvenirs `932,845`; contacts `850,894`). No tolerance or mask was introduced. The latest bounded detail pass improved the previous published report by `45,561` changed pixels (`0.81%`), for a cumulative improvement of `1,108,056` pixels (`16.56%`) from the pre-polish report. There are no supplied 1920×1080 or mobile reference baselines, so those viewports have behavioral, responsive and overflow evidence rather than raw-zero proof.

## Provenance and rights

Generated/reference-compatible visual media and bounded `reference-derived` crops are registered separately from documentary Yandex material. VK content could not be confirmed through the managed browser. Yandex facts used in the UI are limited to the confirmed venue name, Samara address and phone; hours, prices, stock and booking availability are not asserted. Documentary-photo usage rights remain unconfirmed and should be cleared before an unrestricted public launch. About/gallery copy uses visual-concept wording, while souvenir copy uses neutral visual descriptions and explicitly labels illustrative motifs. The hero sentence `Сувениры и подарки рядом с великолепным католическим костёлом Самары.` is retained as reference-derived concept copy for visual fidelity and is not independently confirmed venue fact.

The final evidence refresh also adds a production `/favicon.svg` route so the
registered metadata icon is served by Vinext production, co-locates the contacts
reference header without a second interactive header, restores gallery inset
captions/icons, keeps gallery themes phrased as visual motifs rather than
unverified venue facts, and preserves mobile scene continuity.

Sites version 11 is live at the production URL from the exact source commit
above (version 10 is superseded). The deployment is intentionally owner-only; an anonymous request is
expected to show the ChatGPT sign-in screen rather than expose the page publicly.

AntiGravity was not retried after the user reported it unavailable. Independent Codex subagents supplied geometry, asset, responsive, raw-diff and code-review evidence. The current refresh records a 130-test suite, 30 registered assets, a bounded cathedral linework crop, measured menu crop alignment with a responsive offset reset, a flat souvenir paper field, an exact bounded hero plaque, intrinsic contacts photos, a contacts plaque and bounded map artwork; the source is pushed and the owner-only Sites deployment is live.

## Latest bounded rhythm pass — 2026-08-27

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

## Latest bounded reference-detail pass — 2026-08-27

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
