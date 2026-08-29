# Точка притяжения — финальный отчёт

## Текущая опубликованная ревизия — 2026-08-29

Текущий source/runtime-кандидат —
`787e152a5783f650dc72dac59ae94ffdd74dfd78`. Сайт остаётся единым
непрерывным React/TypeScript scroll-потоком с шестью anchor-сценами; целые
reference PNG не импортируются. В этой ревизии Hero heading crop сохраняет
соотношение `626:165` при масштабировании от `1672×941` до `1920×1080`,
сувенирная иконка корзины помечена декоративной (без ложной кнопки), а
reference-derived названия/цены сопровождаются видимой подписью:
`Иллюстративный референс, не актуальный каталог — уточняйте перед визитом.`
About и Menu получили отдельные bounded paper-only texture layers с
прозрачными масками; CSS reference backgrounds теперь используют runtime
variables, поэтому вложенный base path не создаёт 404 для декоративных файлов.

Публичный VPS: [https://kaigo.space/site/dotgravity/](https://kaigo.space/site/dotgravity/).
Архив base-path `dotgravity-787e152-vps.tar.gz` имеет SHA-256
`97d0ae0aad9eb46782776dca3d242c613dd863183f5da1acb100b4dcd1eebb7e`;
`dotgravity.service` active на `127.0.0.1:4181`, а Nginx alias обслуживает
вложенное `/site/dotgravity/_next/` дерево. Предыдущая dist-версия сохранена
как `dist-previous-20260829-2241`.

Финальные проверки: `npm.cmd test` — 58 файлов / 231 тест; lint, TypeScript,
asset audit — 74 ассета, Chromium browser — 12/12, accessibility — 5/5,
visual capture — 1/1, production `npm audit` — 0 уязвимостей. Публичный
Chromium smoke на `1920×1080`, `1672×941`, `390×844` и `320×844` вернул
`200`, нулевые failed/4xx responses, console errors и broken images, равные
client/scroll widths; мобильное меню открылось с `aria-expanded=true` и
закрылось с восстановлением focus.

Строгий raw RGBA gate остаётся NO-GO и не скрывается: `3,559,433 /
9,440,112` пикселей отличаются (hero `623,383`, about `207,088`, menu
`426,722`, gallery `753,177`, souvenirs `880,212`, contacts `668,851`).
Ни tolerance, ни mask, ни подмена baseline не использованы; это проверенный
опубликованный кандидат, а не заявление о завершённом zero-diff.

## Предыдущий runtime-срез — 2026-08-29 (superseded by current candidate)

Опубликованный кандидат собран из runtime-коммита
`69dfd75915b0acdf43b28a9bbe2b667ccc4c4144` и оставлен как единый
непрерывный сайт с шестью anchor-сценами. В production и локальной проверке
нет цельных PNG-экранов: новые изображения — только bounded reference-derived
региональные ассеты поверх живой React/HTML-разметки и responsive fallback.

Ссылки: [GitHub feature branch](https://github.com/NNFall/dotgravity/tree/feat/pixel-accurate-landing), [VPS production](https://kaigo.space/site/dotgravity/), [локальный handoff](http://127.0.0.1:4180/), [Sites production](https://dotgravity.ferumnikita2009.chatgpt.site) (owner-only).

## Previous VPS publication — 2026-08-29 (superseded by current candidate)

The deployment-support commit
`e9b626f84dd52a0e24a1aeba16a5539bcb6f9e32` adds the normalized
`DOTGRAVITY_BASE_PATH` build setting and the Vinext production adapter used by
the requested VPS. The base-path build is installed at `/root/dotgravity`,
served by `dotgravity.service` on `127.0.0.1:4181`, and exposed through the
dedicated Nginx locations at
[https://kaigo.space/site/dotgravity/](https://kaigo.space/site/dotgravity/).
The no-slash form redirects with `308`; the canonical route, current JS chunk,
generated media, prefixed CSS media/font assets, and existing
`https://kaigo.space/` root all returned `200` in remote smoke checks. Public
Chromium checks at `1920×1080`, `1672×941`, `390×844` and `320×844` found six
scenes, no broken images or failed requests, equal client/scroll widths and an
operable mobile menu. No VPS credential is stored in this repository.

Статические и браузерные проверки зелёные: 53 Vitest-файла / 213 тестов,
lint, TypeScript, build, asset-audit (65 зарегистрированных ассетов), Chromium
12/12, accessibility 5/5, visual 1/1, `npm audit` — 0 уязвимостей. На
1672×941, 1920×1080, 390×844 и 320×844 ширина документа равна viewport,
сетевых ошибок нет; высоты страниц — 6129, 6703, 9463 и 8963 px,
соответственно. Порт 4180 выбран потому, что 4173 занят `comod`, а 4174 —
`whitecup`.

Строгий raw RGBA gate остаётся NO-GO (нулевые отличия не заявляются):
`4,447,420 / 9,440,112` различающихся пикселей; по сценам hero `645,197`,
about `722,601`, menu `771,114`, gallery `759,661`, souvenirs `879,997`,
contacts `668,850`. Это последний доказанный срез, а не утверждение полного
pixel-perfect завершения.

В этот срез входят bounded crops: Hero dots/curves и heading flower; About paper
arcs, location card и opaque cathedral edge; Menu topographic field, initial
card rail, five flower badges и opaque cathedral edge; три full-surface Gallery
inset cards и opaque cathedral edge; Souvenirs outer frame ring; Contacts dot
field, route panel и opaque cathedral edge. Editorial labels,
цены и маршрутные подписи в этих reference-derived слоях требуют подтверждения
командой кафе и не являются documentary facts.

Sites version `24` (`appgprj_6a8eaec4754c8191b23a3f8e7a841bb6~appgver_f65717c796488191ba992662a1d88766`) развернута успешно как deployment
`appgdep_6a91fa50e71c81919887f03c77dc05e9`; архив exact runtime имеет hash
`sha256:0daa637ee661a2ed5079d31f28e44f9bec9b9b29d845c79161ebb7c1d21b1aa5`.
Production остаётся owner-only, поэтому анонимный HTTP-запрос ожидаемо
возвращает `401`, а авторизованная Sites-вкладка открывает страницу.

## Результат

Собран единый адаптивный сайт кафе с непрерывным scroll-потоком: hero → about → menu → gallery → souvenirs → events bridge → contacts → footer. Шесть присланных экранов сохранены как отдельные React-сцены и anchor-состояния, а переходы между ними связаны общей бумажной фактурой, медными контурами, повторяющимися рамками, мягкими clip-path стыками и restrained motion. Цельные PNG-экраны в production не импортируются.

## Ссылки

- GitHub: `https://github.com/NNFall/dotgravity/tree/feat/pixel-accurate-landing`
- Runtime source candidate: `787e152a5783f650dc72dac59ae94ffdd74dfd78` (pushed to the GitHub feature branch; the same tree is synchronized to `main` below)
- Production (Sites, owner-only): `https://dotgravity.ferumnikita2009.chatgpt.site`
- Local handoff: `http://127.0.0.1:4180/`
- Desktop captures: `artifacts/visual/captures/1672x941/`
- Mobile review captures: `artifacts/visual/captures/mobile/full-390x844-final.png`, `artifacts/visual/captures/mobile/full-320x844-final.png`

## Verification evidence

| Gate | Result |
| --- | --- |
| `npm.cmd run lint` | pass |
| `npx.cmd tsc --noEmit` | pass |
| `npm.cmd run qa:assets` | pass — 74 registered assets / 31 production text files |
| `npm.cmd test` | pass — 58 files / 231 tests |
| `npm.cmd run build` | pass |
| `npm.cmd run qa:browser` | pass — 12 tests |
| `npm.cmd run qa:a11y` | pass — 5 tests |
| `npm.cmd run qa:visual` | pass — 1 six-scene capture test |
| `npm.cmd audit --omit=dev --audit-level=high` | pass — 0 production vulnerabilities |
| `git diff --check` | pass |
| Sites deployment | pass — version 24 published to production, owner-only access |

The strict raw RGBA comparator remains intentionally red: `3,559,433 / 9,440,112` pixels differ across the six 1672×941 captures (hero `623,383`; about `207,088`; menu `426,722`; gallery `753,177`; souvenirs `880,212`; contacts `668,851`). No tolerance or mask was introduced. The bounded paper-layer calibration reduces the previous mismatch while preserving the mobile fallback. There are no supplied 1920×1080 or mobile reference baselines, so those viewports have behavioral, responsive and overflow evidence rather than raw-zero proof.

## Provenance and rights

Generated/reference-compatible visual media and bounded `reference-derived` crops are registered separately from documentary Yandex material. VK content could not be confirmed through the managed browser. Yandex facts used in the UI are limited to the confirmed venue name, Samara address and phone; hours, prices, stock and booking availability are not asserted. Documentary-photo usage rights remain unconfirmed and should be cleared before an unrestricted public launch. About/gallery copy uses visual-concept wording, while souvenir copy uses neutral visual descriptions and explicitly labels illustrative motifs. The hero sentence `Сувениры и подарки рядом с великолепным католическим костёлом Самары.` is retained as reference-derived concept copy for visual fidelity and is not independently confirmed venue fact.

The final evidence refresh also adds a production `/favicon.svg` route so the
registered metadata icon is served by Vinext production, co-locates the contacts
reference header without a second interactive header, restores gallery inset
captions/icons, keeps gallery themes phrased as visual motifs rather than
unverified venue facts, and preserves mobile scene continuity.

Sites version 24 is live at the production URL from the exact source commit
above. The deployment is intentionally owner-only; an anonymous request is
expected to show the ChatGPT sign-in screen rather than expose the page publicly.

The current read-only AntiGravity audit is `a18418c1-9ad3-4b20-989c-5111947f974f`; its Contacts map-size hypothesis was independently checked and rejected. Earlier bounded audits supplied the Menu, Gallery and Contacts calibration hypotheses. Independent Codex subagents supplied geometry, asset, responsive, raw-diff and code-review evidence. This release records a 231-test suite, 74 registered assets, bounded Hero feature-icon/heading/cathedral/botanical/seal crops, five Menu flower badges, opaque cathedral-edge overlays, reference-safe copy alignment, the exact bounded hero plaque, intrinsic contacts photos, a contacts plaque, bounded map artwork and paper-only texture strips. The source is pushed and the VPS deployment is live; the strict raw-zero gate remains open.

## Latest bounded wide-desktop Menu heading calibration and publication — 2026-08-28

An independent Menu ROI A/B isolated a small desktop raster-origin candidate.
Runtime `6cc049e8d53fada321eedb915cd717e6fa163e1b` moves the wide Menu heading
to `left:24px` and applies `translateY(0.5px) scaleY(0.9)` at
`min-width:1440px`. The relative nudge preserves flow and leaves tablet/mobile
rules untouched; the focused contract is green at `10/10`, and the bounded
read-only review returned PASS.

Fresh verification is green for 34 Vitest files / 166 tests, lint, TypeScript,
42 registered assets, production build, browser behavior 12/12,
accessibility 5/5, visual capture 1/1 and `npm audit --omit=dev` with zero
production vulnerabilities. The local handoff remains
`http://127.0.0.1:4180/`, with equal client/scroll widths at all required
viewports and operable menu/carousel/focus/reduced-motion behavior.

The strict raw comparator remains NO-GO at `5,451,343 / 9,440,112` changed
pixels (hero `705,612`; about `941,731`; menu `1,165,210`; gallery `864,693`;
souvenirs `923,253`; contacts `850,844`). This is 89 fewer changed pixels than
v21; no tolerance, mask or baseline replacement was introduced.

Sites version 22 was saved from the exact commit and deployed successfully as
`appgdep_6a916f59998c81918e8a151232af0573` to the existing owner-only URL.
The archive content hash is
`sha256:a89d6d716829dcf096843ad56de0d349356fa8bb37cfe8a31be410e040f74dcc`
(`133` files, `27,648,000` bytes). The strict zero-difference gate remains open,
so this is a verified published candidate rather than a completed pixel-perfect
claim.

## Latest bounded Menu/Gallery surface calibration and publication — 2026-08-28

Runtime `e2709dbcefaaf7a60e122d1997f7b659487d060c` is pushed to GitHub
`main`, `feat/pixel-accurate-landing` and the configured Sites source. The
bounded desktop calibration keeps the six live React/CSS scene anchors and
adjusts only two reference-compatible surfaces: wide Menu CTA `#a04221`, and
Gallery inset cards/callouts `#f4e7dc` with a `translate(3px, calc(-50% + 1px))`
caption offset. The Menu rule is `min-width:1440px`; Gallery is `min-width:901px`.
Focused TDD contracts cover the declarations and mobile isolation.

Fresh evidence is green for 34 Vitest files / 166 tests, lint, TypeScript,
42 registered assets, production build, browser behavior 12/12, accessibility
5/5, visual capture 1/1 and production dependency audit (0 vulnerabilities).
The local production handoff remains `http://127.0.0.1:4180/`; required desktop
and mobile browser guards report no horizontal overflow and retain operable
menu/carousel behavior.

The strict raw comparator remains NO-GO, with `5,451,432 / 9,440,112` changed
pixels (hero `705,612`; about `941,731`; menu `1,165,299`; gallery `864,693`;
souvenirs `923,253`; contacts `850,844`). This is `3,425` fewer changed pixels
than v20; no tolerance, mask or baseline replacement was introduced.

Sites version 21 was saved from the exact commit and deployed successfully as
`appgdep_6a91521c33e88191b340813079c44cdd` to the existing owner-only URL.
The archive hash is
`sha256:e9ef0351ca1b2efe6e8fc01a6ad2fce3219b880d510879d9b2475d3c27883704`
(`133` files, `27,648,000` bytes). The published URL remains owner-only, so an
anonymous browser is expected to show the ChatGPT sign-in interstitial.

## Latest bounded Hero icon calibration and publication — 2026-08-28

Runtime `d134743e27ac08a6a9f3a97c832ec5dab8cad093` is now pushed to GitHub
`main`, `feat/pixel-accurate-landing` and the configured Sites source. The
bounded Hero pass adds four separate `62×62` transparent, non-documentary
`reference-derived` crops (coffee, art, gift and cathedral) to the wide desktop
feature rail. Their parent-reference hashes, coordinates and chroma-alpha
transform are recorded in the media registry. Mobile and narrow tablet layouts
keep live Phosphor icons, so the responsive composition is not replaced by a
desktop raster.

The feature ROI improved from `44,590` to `38,835` changed pixels (mean channel
delta `8.52877358` to `1.8402`). Full verification is green for 34 Vitest files
/ 164 tests, lint, TypeScript, 42 registered assets, production build,
Chromium behavior 12/12, accessibility 5/5, visual capture 1/1 and the
production dependency audit (0 vulnerabilities). Fresh mobile captures at
`390×844` and `320×844` remain overflow-free, and the local production handoff
is `http://127.0.0.1:4180/`.

Sites version 20 was saved from the same commit and deployed successfully as
`appgdep_6a9144c25efc8191a825e46bdde39b47` to the existing owner-only
production URL. Sites recorded archive hash
`sha256:5694d9611875861b84218aaea4bcbac2c4a8fb3bc2197a18832b1a099ee7440f`
(`133` files, `27,648,000` bytes). The successful read-only AntiGravity audit
`a18418c1-9ad3-4b20-989c-5111947f974f` was independently cross-checked; its
stale Contacts map-size suggestion was rejected, and no unrelated edit was
published.

The strict raw comparator is still NO-GO at `5,454,857 / 9,440,112` changed
pixels, with no tolerance or mask. This is the best current published
candidate, not a literal byte-identity claim; the raw-zero gate remains open.

## Latest bounded desktop calibration and publication — 2026-08-28

Runtime `b9373605e57beca244bd6f6f9289d374b2cc33ce` adds three measured,
desktop-scoped refinements after an independent AntiGravity ROI audit. The wide
Menu heading uses a `-0.004em` tracking value and a `16px` raster-origin nudge;
Gallery inset captions use the supplied vertical callout rhythm (`62%` for the
porcelain card and `56%` for the art/space cards); Contacts route pictograms
receive small wide-desktop-only transforms. Mobile and tablet rules remain
untouched. Each change has focused TDD coverage, and a fresh independent review
gave GO after A/B comparison.

Fresh verification is green for 33 Vitest files / 161 tests, lint, TypeScript,
asset audit (38 assets / 30 production text files), production build,
Chromium behavior 12/12, accessibility 5/5, visual capture 1/1 and the
production dependency audit (0 vulnerabilities). The rebuilt handoff server
at `http://127.0.0.1:4180/` serves the current client bundle; browser probes
from `1920px` through `320px` report equal client and scroll widths, no failed
requests, working menu/carousel/focus behavior, and desktop-only transforms.

The strict raw comparator remains NO-GO at `5,460,612 / 9,440,112` changed
pixels, with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,642 | 5.86854118 |
| gallery | 866,775 | 5.93994049 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.25967346 |
| **Total** | **5,460,612 / 9,440,112** | **—** |

Sites version 19 was saved from the exact source commit above using archive
`sha256:ca4ece7000b492140a927bca1d7babf874f6d3509184856e1362f1684024d817`
(`129` files, `27,596,800` bytes) and deployed successfully as
`appgdep_6a90a5a1704081919bf0f870546c4644` to the existing owner-only URL.
The raw-zero gate and absent responsive reference baselines remain open; the
published runtime is the best current candidate, not a literal byte identity.

## Latest bounded desktop-detail pass and publication — 2026-08-27

Runtime `f977e3612ed3ffc75c28757a31273e550557828e` adds three measured,
desktop-scoped refinements. About now swaps in a separate detailed inline SVG
cathedral only at `min-width: 1081px`, while the original decorative vector is
retained for mobile/tablet; its plaque frame and compact vertical rhythm are
calibrated without changing semantic content. Gallery story details move down
to the supplied CTA rhythm at `min-width: 1440px`. Souvenirs removes the
desktop-only artwork shadow that painted a dark band over the paper surface.
Each rule has focused TDD coverage and the responsive browser audit confirms
the plaque swap, no page overflow and working menu/carousel interactions.

Fresh verification is green for 33 Vitest files / 158 tests, lint, TypeScript,
asset audit (38 assets / 30 production text files), production build,
Chromium behavior 12/12, accessibility 5/5, visual capture 1/1 and the
production dependency audit (0 vulnerabilities). The rebuilt handoff server
at `http://127.0.0.1:4180/` serves the current client bundle; probes from
`1180px` through `320px` report equal client and scroll widths, no failed
requests, and a live mobile menu with focus/body-lock behavior.

The strict raw comparator remains NO-GO at `5,461,466 / 9,440,112` changed
pixels, with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,731 | 5.87446229 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 867,542 | 5.96713371 |
| souvenirs | 923,253 | 6.88134251 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,461,466 / 9,440,112** | **—** |

Sites version 18 was saved from the exact source commit above using archive
`sha256:e15cc03b7c6f39c2875679dd1a52ea12eefbbb6073bd0f923d82df9364458872`
(`129` files, `27,596,800` bytes) and deployed successfully as
`appgdep_6a9091d8835481919516e2335ec809c9` to the existing owner-only URL.
The raw-zero gate and absent responsive reference baselines remain open; the
published runtime is the best current candidate, not a literal byte identity.

## Latest bounded desktop alignment and publication — 2026-08-27

Runtime `32a2249a20592fd1bc99163932d49104058d6fa5` adds four measured,
desktop-scoped CSS calibrations: the About title and location illustration move
onto their supplied reference baselines, the wide Gallery heading drops by
`2px`, the wide Menu CTA shifts `4px` left and `1px` down, and desktop
Souvenirs story copy uses the measured `16px` internal gap. Each change has a
focused TDD contract; Contacts was experimentally tested then rejected because
it increased strict changed-pixel count, so no Contacts rule changed. No new
media, documentary facts, provenance, tolerance or mask rule was introduced.

Fresh verification is green for 33 Vitest files / 152 tests, lint, TypeScript,
asset audit (38 assets / 30 production text files), production build,
Chromium behavior 12/12, accessibility 5/5, visual capture 1/1, and the
production dependency audit (0 vulnerabilities). The fresh local handoff
server on `http://127.0.0.1:4180/` returned HTTP 200; all current client
chunks and the registered header crop returned HTTP 200. The four viewport
probes (`1920×1080`, `1672×941`, `390×844`, `320×844`) had no horizontal
overflow, and the live mobile menu opened and closed.

The strict raw comparator remains NO-GO at `5,473,801 / 9,440,112` changed
pixels, with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,743 | 5.86134826 |
| menu | 1,166,729 | 5.88439507 |
| gallery | 870,690 | 7.99102823 |
| souvenirs | 932,428 | 7.07670598 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,473,801 / 9,440,112** | **—** |

This is a `140`-pixel improvement over Sites v16. Sites version 17 was saved
from the matching archive (`sha256:c65fce7d6a9f105d675e068094a781484c68f3941b57478cfbb7230386977b18`,
129 files, 27,596,800 bytes) and deployment
`appgdep_6a90849d5c2881919fea94dd9c74dc22` reached `succeeded` at the same
owner-only production URL. Raw-zero and absent responsive reference baselines
remain open quality gates; the current release is usable and published but is
not represented as literal pixel identity.

## Latest bounded desktop polish and publication — 2026-08-27

Runtime `81a66760607f907cebc2811b9941791e827858bc` contains four measured,
desktop-scoped surface/crop adjustments: the opaque header surface is restored
on mobile and limited to the desktop breakpoint, the hero feature rail moves
down by `1px`, Contacts route-panel corner pseudo-markers are hidden on wide
desktop, and the Souvenirs story image loses its desktop-only `7px` radius.
Focused TDD contracts cover each breakpoint rule; no documentary media,
provenance, copy, tolerance or mask rule changed.

Fresh verification is green for 33 Vitest files / 147 tests, lint, TypeScript,
asset audit (38 assets / 30 production text files), production build,
Chromium behavior 12/12, accessibility 5/5, visual capture 1/1, and the
production dependency audit (0 vulnerabilities). A fresh server on
`http://127.0.0.1:4180/` returned HTTP 200; its current client chunk and the
registered header crop both returned HTTP 200. The four viewport probes
(`1920×1080`, `1672×941`, `390×844`, `320×844`) had no horizontal overflow;
the mobile menu opened and closed through the live client bundle.

The strict raw comparator remains NO-GO at `5,473,941 / 9,440,112` changed
pixels, with no tolerance or mask:

| Scene | Changed pixels | Mean channel delta |
| --- | ---: | ---: |
| hero | 711,367 | 4.12517653 |
| about | 941,848 | 6.22187359 |
| menu | 1,166,747 | 5.93727866 |
| gallery | 870,707 | 8.09495475 |
| souvenirs | 932,428 | 7.08657233 |
| contacts | 850,844 | 4.26206612 |
| **Total** | **5,473,941 / 9,440,112** | **—** |

This is a `25,247`-pixel improvement over Sites v15. Sites version 16 was
saved from the matching archive (`sha256:3d0c2d407da82856573cd1f2712dfe5825956b059158facc755a8aeb09071b4c`,
129 files, 27,596,800 bytes) and deployment
`appgdep_6a9075a778388191948f72c7d4ab5bbe` reached `succeeded` at the same
owner-only production URL. Raw-zero and absent responsive reference baselines
remain open quality gates; the current release is usable and published but is
not represented as literal pixel identity.

## Latest bounded CSS calibration and publication — 2026-08-27

Runtime `33a84397d01cd1714d5ef7f3a3d89139bb39ba0e` contains two measured,
desktop-only CSS adjustments: the About location-card sidebar track changed from
`124px` to `94px`, and the wide Menu heading uses `scaleY(.9)` with a top-center
origin. The Menu contract test records the breakpoint and transform; the 390px
and 320px mobile compositions remain unchanged. No copy, media provenance or
tolerance/mask rule changed.

Fresh verification is green for 32 Vitest files / 143 tests, lint, TypeScript,
asset audit (38 assets), production build, Chromium behavior 12/12,
accessibility 5/5, visual capture 1/1 and the production dependency audit.
The strict raw comparator remains NO-GO at `5,499,188 / 9,440,112` changed
pixels (hero `736,298`; about `941,848`; menu `1,166,747`; gallery `870,707`;
souvenirs `932,716`; contacts `850,872`), an improvement of 25 changed pixels
over Sites v14, with no tolerance or mask. Sites version 15 was saved from the
matching archive (`sha256:3ade958de437b632f076033eaa8ecf51fe4cb9e9e9dbb2f3e8c7fc528999ad09`,
129 files, 27,596,800 bytes) and deployed successfully to the same owner-only
production URL; anonymous access continues to show the expected sign-in
interstitial.

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

## Previous release-hygiene follow-up — 2026-08-27 (superseded by bounded CSS calibration)

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
