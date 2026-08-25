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
| Intended scene and allowance | Hero photo region only; production use is allowed only for that bounded region |
| Reference shape | `not-reference`; it is not a full target screen or a reference composite |
| Crop strategy | `cover` the bounded hero photo region, keeping the window frame and church view focal; responsive crops must not expand it into a full-page reference screen |

Non-secret prompt summary: warm cafe-window composition with a church view for the bounded hero photo region, with no readable signage, logos, or real-venue claim.

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

## Audit policy

`npm.cmd run qa:assets` runs the shared runtime registry validation, then fails when any registered media file is missing, has a different SHA-256, or has different intrinsic dimensions as reported by Sharp. It also rejects:

- any unregistered file under `public/media`;
- a record marked as a full reference screen or reference composite;
- a production asset whose hash equals one of the six authoritative target references;
- an authoritative target-reference file copied anywhere else under `public`, including a top-level image referenced by app code;
- baseline fixture paths or any authoritative target-reference hash embedded in production `app`, `src`, or `public` text/CSS.

The six target PNGs remain nonproduction visual-test baselines. They must never be copied into `public/media`, imported by application code, used as CSS backgrounds, or represented in the registry as a production asset. Missing future `app`, `src`, or `public` source directories are treated as empty by the audit so the registry can be checked before those areas exist.
