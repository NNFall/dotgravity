# «Точка притяжения»: pixel-accurate landing design specification

## Operative goal

Создать, визуально отполировать, протестировать, опубликовать и запушить в `https://github.com/NNFall/dotgravity` единый адаптивный React/TypeScript-сайт кафе «Точка притяжения» в `D:\papka for all\work\sites\dotgravity`, фактически достигнув результата **«ОДИН В ОДИН ДО ПИКСЕЛЯ И ВСЕХ МЕЛОЧЕЙ»** относительно шести локальных референсных экранов. Не считать сайт завершённым, пока каждый desktop reference screen не воспроизведён настоящими компонентами, CSS, отдельными ассетами и интерактивами, а не вставкой цельного PNG.

Для каждой сцены повторно сравнивать snapshot реализации с исходником 1672×941 и с основной композицией 1920×1080: композиция, сетка, расстояния, типографика, цвета, линии, арки, диагональные срезы, фоны, фото-слои и кропы, CTA, навигация, карточки, map/contact layout и декоративные элементы должны совпадать до визуально неразличимого уровня. Строгий Playwright/pixel-comparison gate должен быть зелёным; неизбежное исключение допускается только после фиксации причины и явного подтверждения пользователя. Одновременно сайт обязан быть цельным прокручиваемым опытом и иметь отдельную качественную mobile-композицию на 390×844 и 320 px без overflow, с рабочими якорями, carousel, контактными действиями, hover/scroll-reveal transitions и `prefers-reduced-motion`.

Использовать реальные публичные материалы Яндекс Карт/VK только как документальные при подтверждённом происхождении и доступе. Активно создавать, редактировать, расширять или кадрировать reference-compatible декоративные и композиционные ассеты через Image Generation Skill, не выдавая синтетику за фактические фото заведения. Remove Background применять только после визуального A/B-сравнения пользы. Обязательны свежие spec/plan/operations log, TDD на ключевые визуальные и поведенческие контракты, независимые субагенты для аудита референсов, ассетов, visual diff, spec compliance и code quality; попытка и результат Antigravity Worker; in-app Browser и Playwright на 1920×1080, 1672×941, 390×844 и 320 px; доказательные screenshots/metrics; Git commits и push только после зелёных финальных проверок. Не оставлять секреты и не объявлять результат готовым до строгого визуального pass, подтверждённого public URL и передачи результата пользователю.

## Authoritative references

Target screens, all 1672×941:

1. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_31 (1).png` — hero/header.
2. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_32 (6).png` — about/positioning.
3. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_32 (3).png` — gallery/atmosphere.
4. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_32 (4).png` — menu carousel.
5. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_32 (5).png` — souvenirs/catalog.
6. `C:\Users\User\Downloads\ChatGPT Image 24 авг. 2026 г., 21_41_31 (2).png` — contacts/route.

`C:\Users\User\Downloads\94587012-ea1a-4ec6-b884-4f0785e715e1.png` is not a target scene. It is an unrelated Komod concept used only as a quality bar for hero confidence and CTA clarity; its orange palette, logo and content must not enter the target brand.

## Information architecture

The production page order is:

1. sticky header and hero;
2. about / coffee meets art;
3. gallery / atmosphere;
4. menu carousel;
5. compact events/visit invitation in the same visual language, derived because navigation promises events;
6. souvenirs and rare finds;
7. contacts, route, hours and final CTA;
8. restrained footer with source/status links and legal/provenance note where appropriate.

The six referenced sections keep exact desktop compositions. Derived bridge/footer content may improve continuity but may not shift the reference anchor screenshots or weaken their pixel gate.

## Architecture and component boundaries

- One route renders a semantic page shell and six stable `<section data-scene="...">` targets.
- Content and media metadata live outside view components so facts, labels and provenance can be verified independently.
- Each major scene owns its layout file and CSS module/style scope; shared primitives cover header, CTA, ornament, framed image, icon-label and reveal behavior.
- Motion is isolated and progressive. Base HTML remains usable without JavaScript; animation uses `transform`/`opacity`, IntersectionObserver or the framework-approved motion layer, and reduced-motion disables choreography.
- `picture`/`srcset`, explicit intrinsic sizes and deterministic object-position rules prevent layout shift and make screenshot crops stable.
- The booking CTA must use a verified external action if one exists; otherwise it becomes an honest contact/route action, never a fake successful reservation form.

## Visual contracts

### Shared

- Paper background and subtle texture must remain stable across scenes without a visible tiling seam.
- Desktop content follows the reference gutter and vertical rhythm; 1920×1080 is a fluid extension, not a centered 1672 screenshot with empty bars.
- Display and body fonts are locally loaded or deterministically fetched and awaited before screenshots.
- All reference text remains real selectable text unless it is inseparable from documentary signage inside a photo.
- Decorative church line art, floral/compass marks, dotted grids, thin rules and arcs are separate assets/CSS layers.

### Hero

- Header geometry, logo cluster, anchors, address and phone reproduce the first reference.
- Left copy and right image form the same diagonal split; the photo region is assembled from independent media and overlays.
- Primary CTA and four value markers align to measured baselines.

### About

- Large left arch photo and right copy preserve the original 47/53 balance.
- Three feature columns, church line art and lower CTA align to the reference.

### Gallery

- Large interior image and three smaller callout images retain the overlapping collage geometry.
- Labels remain real HTML overlays; no screenshot fragment may contain UI text that duplicates live text.

### Menu

- Five visible desktop cards, cut-corner frames, centered heading and navigation arrows match the reference.
- Mobile uses one-card scroll-snap with working buttons, swipe and keyboard; content remains complete without JS.

### Souvenirs

- Editorial left column plus dominant right image and bottom product strip match the reference.
- Product names/prices are marked stale or omitted until current values are verified; generated product imagery is labelled in provenance, not as documentary inventory.

### Contacts

- Left contact stack, paired top images, stylized route/map panel and directions column reproduce the reference.
- Address/phone/hours use current verified facts. Route links directly to the supplied Yandex Maps URL.

## Responsive contracts

- At 390×844 the hero immediately identifies name, positioning, location and one primary action.
- At 320 px all text wraps intentionally, controls remain at least 44 px, no scene has horizontal overflow, and fixed/sticky elements never cover content or footer.
- Asymmetric desktop grids collapse to a deliberate single-column story; photo order and object-position are tuned per breakpoint rather than scaled mechanically.
- Tablet/1024 is included as a diagnostic viewport even though the two hard mobile gates are 390 and 320.

## Media and provenance policy

Three physical directories and manifest classes are mandatory:

- `documentary`: directly sourced public venue photos with source URL, access date and unresolved usage-rights status;
- `reference-derived`: crops or transformations extracted from supplied concept screens, never described as a real venue photo;
- `generated`: Image Generation outputs with prompt, input roles, generation date and intended decorative/compositional use.

Reference PNGs may be stored outside the production bundle for tests, but never imported by page code. Whole-screen image rendering, CSS background usage of a full reference screen and large overlay tricks intended to fake the page are prohibited.

## Behavior and accessibility

- Header anchors scroll to correct scene and update active state without trapping focus.
- Mobile menu supports keyboard, Escape, outside click and scroll locking without layout jump.
- Carousel supports previous/next, swipe/scroll, keyboard and disabled edge states or explicit looping.
- External links expose their destination, phone uses `tel:`, route uses the supplied Yandex link.
- Focus-visible, reduced motion, semantic headings/landmarks, alt text and contrast are tested.

## Testing and visual acceptance

- TDD red/green evidence is required for navigation, mobile menu, carousel, provenance validation and reference-import prohibition.
- Static checks: typecheck, lint if configured, unit/component tests, production build.
- Browser checks: real in-app Browser plus terminal Playwright where appropriate, exact viewports 1672×941, 1920×1080, 390×844 and 320×844.
- Per-scene deterministic snapshots compare every pixel. Reports must include raw changed-pixel count/ratio, perceptual metric and diff images; perceptual similarity alone cannot hide large raw mismatches.
- Hard failures: missing scene, full-reference image in DOM/bundle, unloaded font, console error, horizontal overflow, broken anchor/action, obscured footer, undocumented media or synthetic-as-documentary claim.
- Baseline/threshold updates require written reason. Material exceptions require user approval before completion.

## Required skill and review flow

Use and report: brainstorming, writing-plans, test-driven-development, design-taste-frontend, impeccable, imagegen, remove-background-local when useful, antigravity-worker, browser control, playwright, dispatching-parallel-agents, subagent-driven-development, visual-reference-landing-qa, verification-before-completion, requesting-code-review and finishing-a-development-branch. The Sites workflow owns project initialization, first meaningful preview and hosting; spawned agents must not initialize or edit the Site checkout unless they receive a narrow non-overlapping file scope from the primary Site-owning agent.

## Completion gate

Completion requires all of the following at the same revision:

- six reference scenes implemented from real components and separate assets;
- desktop and mobile visual gates green or explicit user-approved exceptions recorded;
- functional and accessibility checks green;
- provenance manifest complete and source-access status precise;
- independent spec review and code-quality review closed;
- Antigravity result inspected and independently verified;
- production build green, actual hosted URL opened and checked;
- clean scoped Git status, no secrets, commits pushed to `NNFall/dotgravity`;
- final report links evidence and clearly separates build, browser, deployment and rights status.
