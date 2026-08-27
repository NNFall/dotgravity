# Asset provenance register

This register distinguishes visual design references, documentary venue media and synthetic/reference-compatible media. Public availability does not establish publication rights; release clearance remains open until the owner confirms it.

## Design references

The six target `1672×941` PNG files listed in the design specification are generated concept screens supplied by the user. They define visual geometry and may yield small `reference-derived` crops, but they are not documentary evidence and may not be rendered as whole page screens.

Independent file audit found C2PA metadata identifying `gpt-image` and `trainedAlgorithmicMedia` in every target reference. Authoritative SHA-256 values:

| Scene | SHA-256 |
| --- | --- |
| hero | `21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559` |
| about | `5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9` |
| menu | `DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924` |
| gallery | `8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5` |
| souvenirs | `1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0` |
| contacts | `DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457` |

The orange Komod PNG is excluded from production media and target comparison.

## Prior documentary package

Source snapshot: 2026-08-24, Yandex Maps organisation `81550465378`.

- `01-yandex-cover.jpg`: venue door/window with church reflection, documentary.
- `02-yandex-interior.jpg`: espresso on black saucer, documentary.
- `03-yandex-photo-square-1.jpg`: blue vintage cup, documentary, low resolution.
- `04-yandex-photo-square-2.jpg`: alternate blue vintage cup crop, documentary, low resolution.
- `05-yandex-third.jpg`: interior with pink mirrored pendants, documentary.

Original research files remain outside this repository until copied through an explicit asset task. Their current usage-rights status is `unconfirmed`.

Independent dimension/quality audit:

- `01-yandex-cover.jpg`: 577×1280, entrance/window and church reflection; too narrow for the reference desktop hero.
- `02-yandex-interior.jpg`: 881×1280, real black-cup cappuccino with hand; useful only as a detail.
- `03-yandex-photo-square-1.jpg`: 500×500, blue vintage cup; low resolution.
- `04-yandex-photo-square-2.jpg`: 500×500, alternate crop of the same cup; low resolution.
- `05-yandex-third.jpg`: 576×1280, real interior with mirrored pink pendants; closest documentary match for the gallery.

The documentary package alone cannot reproduce any target scene exactly. Gallery is the closest partial match; menu and souvenirs require mostly reference-derived or generated media. Contact-map geometry must remain live HTML/CSS rather than a generated raster.

## Source-access status

Fresh check: 2026-08-25 around 22:10 Europe/Samara.

- Yandex short link `https://yandex.ru/maps/-/CTDBI0~o`: blocked by the managed safety policy and not retried.
- Direct Yandex organisation card `https://yandex.ru/maps/org/tochka_prityazheniya/81550465378/`: directly opened with a redirect to Yandex.com; overview, menu, gallery and reviews were crawled today. Confirmed: name, `Самара, ул. Фрунзе, 130`, `+7 (846) 263-04-04`, rating `5.0`, `178` ratings, `116` reviews, `226` photos, average price level and cappuccino range `210–260 ₽`. The accessible text reported `Closed until tomorrow`; a complete weekly schedule was not exposed. Menu is marked as not updated for a while.
- VK `https://vk.ru/samaratochkaprityazheniya`: direct opening was blocked and exact search returned nothing. Status is `не подтверждено`; the group was not read.

## Generated and reference-derived assets

Every created asset must be appended with: file path, class (`generated` or `reference-derived`), source/input images and roles, prompt or transformation, creation date, intended section, and statement that it is not documentary venue evidence.

## Production media registry

The typed registry records the following production assets. Each record is intentionally narrower than a general venue-photo claim.

### `hero-window-church`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/hero-window-church.png` (served locally as `/media/generated/hero-window-church.png`) |
| SHA-256 | `7598C48D9E51326F743A8D8E20C2190A4FAEC6454EAABE181EA1262DC2FB0861` |
| Intrinsic dimensions | `1672×941` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-25` via Image Generation |
| Intended scene and allowance | Hero or contacts photo region only; production use is allowed only for either bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded hero or contacts photo region, keeping the window frame and church view focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm cafe-window composition with a church view for bounded hero or contacts photo regions, with no readable signage, logos, or real-venue claim.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### `about-arch-interior`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/about-arch-interior.png` (served locally as `/media/generated/about-arch-interior.png`) |
| SHA-256 | `5A4BADA813E31DD2877A8306F8A7DF74AFE78316FE722F0889260AAD85114BB0` |
| Intrinsic dimensions | `1024×1536` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | About photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded about photo region, keeping the tall cream arch and ceramic display focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm cafe-like interior with a tall cream arch, ceramic display and stained-glass church-inspired view, with no real-venue claim or readable signage.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### `menu-iced-coffee-croissant`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/menu-iced-coffee-croissant.png` (served locally as `/media/generated/menu-iced-coffee-croissant.png`) |
| SHA-256 | `9C17818567C35E022AB248F8B278C63E380754F3182C94ACDF9E0672CDF188FE` |
| Intrinsic dimensions | `1122×1402` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | Menu photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded menu photo region, keeping the iced coffee glass and croissant focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm editorial still life with iced coffee, espresso, a croissant and dried citrus, with no real-venue claim or readable signage.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### Menu reference-derived crops

The five menu cards use bounded photo-only crops from the supplied generated menu concept (`DCB62718375D93C4B61D6A0764859575885A0331A940C560DF664D90AFAC0924`). Created 2026-08-26, each crop is `250×265` PNG, classified `reference-derived`, `documentary: false`, and allowed only in the bounded menu card photo region (`bounded-reference-region`). The transformation removes the repeated UI flower badge and clipped card-corner pixels while retaining no copy, prices or arrows; the live flower mark and card frame remain React/CSS.

| Asset | SHA-256 | Crop / role |
| --- | --- | --- |
| `menu-reference-cappuccino.png` | `881BD0DAE160C87BB9E513D3F5F7E4B732F214BF2833EC9538E50CB0AA41D8D5` | `x=115,y=349,w=250,h=265`; cappuccino card |
| `menu-reference-berry-dessert.png` | `6F6DD5DF972A41568C20597B7EE26A571F169596F00B49DFFE00CC3E3F12EE68` | `x=411,y=349,w=250,h=265`; berry dessert card |
| `menu-reference-pistachio-cake.png` | `2DD28E974E27337A21F4A2E1FBD8498D63D4F6052AA70C2E2AF045F3EA927F2F` | `x=706,y=349,w=250,h=265`; pistachio cake card |
| `menu-reference-red-velvet.png` | `C55F076C6A9B96355CA045D9444281D7EE455AF49DC95CB10A76ACEC2C3B793A` | `x=1001,y=349,w=250,h=265`; red velvet card |
| `menu-reference-cheesecake.png` | `437F25968CFE07C25006BD3AFC536976C0BD19B538E6417ED39C5C03419BAED9` | `x=1303,y=349,w=250,h=265`; cheesecake card |

These are concept-derived visual references, not photographs of the real cafe, and must not be presented as documentary venue evidence. On mobile they remain bounded to the responsive menu rail and are never used as a full-screen reference composite.

### `gallery-arched-interior`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/gallery-arched-interior.png` (served locally as `/media/generated/gallery-arched-interior.png`) |
| SHA-256 | `95CC57209EBA6A9DB4A11E77397D81803FBEB65C829BE6DC6D7EF2F88CEA9F27` |
| Intrinsic dimensions | `1536×1024` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | Gallery photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded gallery photo region, keeping the arched window, flower artwork and porcelain display focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm arched cafe-like interior with a stained-glass window, flower artwork, mirrored disco balls and a porcelain display, with no real-venue claim or readable signage.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### Gallery reference-derived crops

The gallery desktop collage uses four bounded, photo-only crops from the supplied generated concept screen (`8FF8EC7190A48985D57F7BF05590A392049BFBBC5E4C36BBE4C2EA164B85EFB5`). The crops intentionally exclude copy, prices, labels, caption badges and decorative frame strokes; all surrounding structure remains React/CSS/SVG.

| Asset | Crop / role | Status |
| --- | --- | --- |
| `gallery-reference-main-arch.png` | `x=676,y=52,w=582,h=830`; main arch photo region | `reference-derived`, non-documentary |
| `gallery-reference-inset-porcelain.png` | `x=1284,y=136,w=198,h=208`; porcelain inset | `reference-derived`, non-documentary |
| `gallery-reference-inset-art.png` | `x=1284,y=395,w=198,h=195`; artwork inset | `reference-derived`, non-documentary |
| `gallery-reference-inset-space.png` | `x=1284,y=647,w=198,h=198`; seating inset | `reference-derived`, non-documentary |

These are concept-derived visual references, not photographs of the real cafe. On mobile they remain bounded to the responsive gallery frames and are never used as a full-screen reference composite.

### Contacts reference-derived crops

The contacts desktop photo pair uses two photo-only crops from the supplied generated contacts concept (`DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457`). Created 2026-08-26, both assets are classified `reference-derived`, have `documentary: false`, and are allowed only inside the bounded contacts photo regions (`bounded-reference-region`). The plaque, captions, labels and schematic route remain live HTML/CSS/SVG; they are not duplicated in the PNGs.

| Asset | SHA-256 | Crop / treatment |
| --- | --- | --- |
| `contacts-reference-window-crop.png` | `9C339940840CDB19C7690CAB529DD57B77414EDCD3DF23327C4C3124B09DD703` | `x=656,y=106,w=429,h=477`; alpha-masked polygon follows `(790,106)` to `(656,582)` and removes heading/frame/plaque pixels |
| `contacts-reference-street-crop.png` | `9DF641E07DA51B7361391F4785189201B0EA8445ABDA37C2A663E8FAE8C22F53` | `x=1158,y=106,w=514,h=477`; excludes header, divider, lower route panel and DOM labels; source facade signage remains part of the concept crop |

These are bounded fragments of the supplied concept, not photographs of the real cafe. They must not be presented as documentary venue evidence, and responsive layouts may crop them further but may not expand either fragment into a full reference screen.

### Souvenirs reference-derived crops

The souvenirs desktop composition uses five bounded, photo-only crops from the supplied generated concept screen (`1D154C8FBF7EDD02616B0AE624AB79F803BED47305863F758E93BBF061D6DAE0`). The crops exclude the outer frame, caption, card copy and decorative overlays; all surrounding structure remains React/CSS/SVG. The facade sign visible inside the main crop is baked into the source image and is not an independently authored venue claim.

| Asset | SHA-256 | Crop / role |
| --- | --- | --- |
| `souvenirs-reference-main-photo.png` | `A86165D939862917E61AEBEF2D690C99076804E275C491D3F7E2C24ED6B7A174` | `x=818,y=101,w=764,h=512`; main photo region |
| `souvenirs-reference-bracelet.png` | `7640E3AAECAE82591E8609DB4B3C025C8CB32D38A57849A2EB8C753DFF4F3748` | `x=50,y=674,w=212,h=184`; bracelet card photo |
| `souvenirs-reference-ring.png` | `C5A1EEA39027D9669E2261E59E524B23F5183CC216A2B55978338135CD4F1A97` | `x=462,y=674,w=204,h=184`; ring card photo |
| `souvenirs-reference-teacup.png` | `52F7246A42E33A37149367378DA44A7BD7F7001015C46100052072E5CD506D73` | `x=849,y=674,w=203,h=184`; teacup card photo |
| `souvenirs-reference-tea-set.png` | `D3FB908D377A9373390D80832C4E6A75C7C550EA25992E12EB32168C5C71C800` | `x=1237,y=674,w=216,h=184`; tea-set card photo |

These are concept-derived visual references, not photographs of the real cafe. They remain bounded to the main artwork frame and responsive story-card visuals and are never used as a full-screen reference composite. The previously reviewed generated bracelet cutout remains registered for provenance, but the scene uses the reference bracelet crop because it matches the supplied card geometry more faithfully.

### `souvenirs-window-still-life`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/souvenirs-window-still-life.png` (served locally as `/media/generated/souvenirs-window-still-life.png`) |
| SHA-256 | `B3282A1935F124EC54934396AF1A9F75257D2739DB84561850CD25683F1AC7B0` |
| Intrinsic dimensions | `1672×941` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | Souvenirs photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded souvenirs photo region, keeping the open jewelry case and porcelain cups focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm window still life with an open jewelry case, porcelain cups, flowers, a candle and framed architecture, with no real-venue claim or readable signage.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### `souvenir-rose-quartz-bracelet-source`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/souvenir-rose-quartz-bracelet-source.png` (served locally as `/media/generated/souvenir-rose-quartz-bracelet-source.png`) |
| SHA-256 | `4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653` |
| Intrinsic dimensions | `1254×1254` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | Souvenirs source-only input; production use is **not allowed** |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | Source-only; it must never render in a production scene. The registered transparent derivative is the allowable product cutout. |

Non-secret prompt summary: isolated pink rose-quartz-style bracelet with gold-tone accents on a pale background, with no real-product or real-venue claim.

This file is generated source artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its merchandise, inventory, signage, or current appearance.

### `souvenir-rose-quartz-bracelet-cutout`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/souvenir-rose-quartz-bracelet-cutout.png` (served locally as `/media/generated/souvenir-rose-quartz-bracelet-cutout.png`) |
| SHA-256 | `65AA3C2AA0AB04DFBFC393856A357328134490467437D5F49702F61ECA69229D` |
| Intrinsic dimensions | `1254×1254` PNG with alpha |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation, then transformed locally |
| Parent asset | `souvenir-rose-quartz-bracelet-source`, SHA-256 `4A0D6A67707FF40A63C56B0D363EACA45C94C4A6D9E57A59D4CE1F5C4C790653` |
| Derivation | `Remove Background Local`; aggressiveness `0.30`; checkerboard preview visually reviewed before registration |
| Intended scene and allowance | Souvenirs product cutout only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `contain` the bounded product cutout, keeping the full bracelet silhouette in its product card; never expand it into a full-page reference screen |

Non-secret prompt summary: transparent cutout of the registered generated pink rose-quartz-style bracelet, with no real-product or real-venue claim.

This file is generated reference-compatible artwork with a locally removed background. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its merchandise, inventory, signage, or current appearance.

### `contacts-brick-street`

| Field | Registered value |
| --- | --- |
| Path | `public/media/generated/contacts-brick-street.png` (served locally as `/media/generated/contacts-brick-street.png`) |
| SHA-256 | `A53AB8414DC021C3EAB7E488569D81F033701BA7888C92C2230B36C66BABCB82` |
| Intrinsic dimensions | `1536×1024` PNG |
| Class | `generated/reference-compatible` |
| Documentary status | `false` |
| Created | `2026-08-26` via Image Generation |
| Intended scene and allowance | Contacts photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded contacts photo region, keeping the brick street, tower and warm window facade focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: dusk brick street with a church-like tower, warm cafe-like windows and flower planters, with no real-venue claim or readable signage.

This file is generated reference-compatible artwork. It is **not a documentary venue photograph** and must not be presented as evidence of the venue, its inventory, its signage, or its current appearance.

### Hero reference-derived crop

The desktop hero photo layer uses one bounded, alpha-masked crop from the supplied generated hero concept (`21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559`). Created 2026-08-26, `hero-reference-photo.png` is `947×836` PNG, classified `reference-derived`, `documentary: false`, and allowed only inside the desktop hero photo polygon (`bounded-reference-region`). The source rectangle is `x=725,y=105,w=947,h=836`; the mask follows the measured diagonal through the crop edges, with deterministic dark-wood inpainting over the plaque safety region `x=1411..1547,y=131..509` in full-reference coordinates so the live DOM plaque sits over a continuous photo layer. The live diagonal hairline, plaque, copy and all surrounding structure remain React/CSS.

| Asset | SHA-256 | Crop / role |
| --- | --- | --- |
| `hero-reference-photo.png` | `789791B7809699ABDA65EBF2D2AB03A9E2EE2448FB43D12CA24AE0F12FBAC624` | `x=725,y=105,w=947,h=836`; edge-to-edge diagonal alpha mask with deterministic dark-wood inpaint beneath the live plaque |

This is a bounded fragment of the supplied concept, not a photograph of the real cafe. The generated hero asset remains the responsive fallback at mobile widths; the reference crop is never expanded into a full-screen composite.

### About reference-derived crop

The desktop about photo frame uses one bounded, alpha-masked crop from the supplied generated about concept (`5569EA6A855915480D98A9760A91F9D9D914D53410DCA1FF2EC99143B74A4DC9`). Created 2026-08-26, `about-reference-arch.png` is `797×941` PNG, classified `reference-derived`, `documentary: false`, and allowed only inside the about arch frame (`bounded-reference-region`). The source rectangle is `x=17,y=0,w=797,h=941`; the mask follows the measured inner arch and removes the location-card safety region `x=1..433,y=676..906` in full-reference coordinates. The live frame, location card, disclosure, text and cathedral drawing remain React/CSS.

| Asset | SHA-256 | Crop / role |
| --- | --- | --- |
| `about-reference-arch.png` | `36ED679595E6BC5131328BD579E1873AD745EA8C73635983852F690772A085B5` | `x=17,y=0,w=797,h=941`; masked about arch interior photo layer |

This is a bounded fragment of the supplied concept, not a photograph of the real cafe. The generated about asset remains the responsive fallback at mobile widths; the reference crop is never expanded into a full-screen composite.

### Final bounded plaque and map layers — 2026-08-27

The final desktop polish adds three small, non-documentary `reference-derived`
layers from the supplied generated concepts. They are deliberately bounded to
measured visual regions; live React/CSS/SVG structure, copy and ARIA markup
remain responsible for the surrounding interface. None is a documentary venue
photograph or a real map screenshot.

| Asset | SHA-256 | Intrinsic size | Parent / source ROI | Production role |
| --- | --- | --- | --- | --- |
| `hero-reference-plaque-strip.png` | `76AC5E8232573A91849487531C5F71E24A776E6A251D4B323B50829D183A7E02` | `137×379` | hero concept `21380897A08D9C2375C1755DEDEB0E7F4BBFA62271979EE05C0A33D79F0DB559`; `x=1411,y=131,w=137,h=379` | desktop hero plaque only; hidden below desktop breakpoint |
| `contacts-reference-plaque-strip.png` | `8A183366677132F156B40C55EED43BED57CBCB275BA5C568B581D4BC94348AD3` | `73×477` | contacts concept `DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457`; `x=1085,y=106,w=73,h=477` | desktop photo-pair gap plaque only; hidden below desktop breakpoint |
| `contacts-reference-map-crop.png` | `7A027FB903E6071F933CDDC5847FA3E1645D33E633CD11ECE5ADBC8D6BCD46AF` | `634×312` | contacts concept `DC6958CC6FB22CB2892C5D4708B907468EE52A01251A6378F2E3E001B2E88457`; `x=624,y=596,w=634,h=312` | desktop map artwork only; live route sidebar/SVG remains semantic |

The plaque strips preserve only reference ornament, lettering and frame pixels;
the map crop preserves only the supplied visual artwork. They must not be
expanded into full-screen composites or described as evidence of the café,
its signage, or its geography. The hero sentence paired with the plaque is
reference-derived concept copy and is not independently confirmed venue fact.

### Inline About plaque cathedral vector — 2026-08-27

The wide-desktop About plaque now includes a hand-authored inline SVG
(`PlaqueCathedralDrawing`) calibrated from the supplied concept's linework. It
is a `decorative` / non-documentary vector, has no external file or venue-photo
claim, and is rendered only at `min-width: 1081px`; the original live SVG
remains the responsive fallback on tablet and mobile. The surrounding plaque,
copy, disclosure and ARIA-hidden semantics remain live React/CSS. Because this
is inline vector markup rather than a media file, it is intentionally tracked
here instead of the raster registry and is excluded from documentary asset
counts.

## Audit policy

`npm.cmd run qa:assets` runs the shared runtime registry validation, then fails when any registered media file is missing, has a different SHA-256, or has different intrinsic dimensions as reported by Sharp. It also rejects:

- any unregistered file under `public/media`;
- a record marked as a full reference screen or reference composite;
- a production asset whose hash equals one of the six authoritative target references;
- an authoritative target-reference file copied anywhere else under `public`, including a top-level image referenced by app code;
- baseline fixture paths or any authoritative target-reference hash embedded in production `app`, `src`, or `public` text/CSS.

The six target PNGs remain nonproduction visual-test baselines. They must never be copied into `public/media`, imported by application code, used as CSS backgrounds, or represented in the registry as a production asset. Missing future `app`, `src`, or `public` source directories are treated as empty by the audit so the registry can be checked before those areas exist.
