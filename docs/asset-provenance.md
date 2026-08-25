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
