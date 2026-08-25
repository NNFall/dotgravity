---
name: "Точка притяжения"
description: "Кофе, искусство и редкие вещи в историческом центре Самары"
colors:
  paper: "#F5EEE6"
  paper-deep: "#EADBCF"
  ink: "#2E2723"
  copper: "#B44725"
  copper-deep: "#8F321D"
  copper-line: "#CF9677"
  porcelain: "#E9E2D8"
typography:
  display:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(3rem, 6.1vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.018em"
  headline:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.4vw, 4.7rem)"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "clamp(0.72rem, 0.85vw, 0.9rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.09em"
rounded:
  control: "8px"
  image: "22px"
  arch: "999px 999px 32px 32px"
spacing:
  unit: "8px"
  gutter-mobile: "20px"
  gutter-desktop: "clamp(56px, 6.5vw, 112px)"
  scene-y: "clamp(72px, 8vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "18px 34px"
  button-primary-hover:
    backgroundColor: "{colors.copper-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "18px 34px"
---

# Design System: Точка притяжения

## Overview

**Creative North Star: "Салон у костёла"**

Система ощущается как тёплый печатный каталог частной коллекции, который ожил в браузере. Кремовая бумага, тонкие медные линии, спокойная высокая антиква, фарфор и архитектурные контуры формируют основу; крупные фотографии и асимметричные арки дают реальному пространству главную роль.

Шесть desktop-сцен повторяют утверждённые экраны 1672×941 и соединяются без визуального обрыва. На мобильном сохраняются бумажная фактура, медный ритм, типографический контраст и характерные фото-кропы, но композиция становится последовательной и одноколоночной. Запрещены «generic café template», оранжевая айдентика «Комода», цельный PNG вместо вёрстки и синтетические фотографии под видом документальных.

**Key Characteristics:**

- бумажная светлая основа без чистого белого;
- медно-терракотовый акцент и тонкая линейная графика;
- высокая контрастная кириллическая антиква плюс точный нейтральный гротеск;
- асимметричные арки, диагональные срезы и составные фотоколлажи;
- один доминирующий визуальный жест на сцену;
- сдержанная scroll-хореография только через transform и opacity.

## Colors

Палитра повторяет тёплую бумагу, обожжённую медь и мягкий уголь референсов; значения frontmatter являются нормативными.

### Primary

- **Обожжённая медь:** основной CTA, акцентные слова, пиктограммы и активные состояния.
- **Глубокая медь:** hover/active и редкие участки повышенного контраста.

### Neutral

- **Галерейная бумага:** основной фон всех сцен.
- **Тёплая тень бумаги:** вложенные поверхности, рамки и мягкие переходы между сценами.
- **Чернильный уголь:** основной текст; чистый `#000000` запрещён.
- **Фарфор:** светлые подложки карточек и фото-паспарту.

**The Copper Restraint Rule.** Медный цвет ведёт взгляд, но не превращает страницу в оранжевую заливку: на одной сцене он занимает примерно 8–18% площади, кроме CTA-состояний.

## Typography

**Display Font:** Prata (Georgia fallback)  
**Body Font:** Montserrat (Arial fallback)

**Character:** Prata даёт референсную кириллическую вертикаль и ощущение музейной афиши; Montserrat удерживает адреса, меню, подписи и интерфейсную навигацию ясными на desktop и mobile.

### Hierarchy

- **Display** (400, fluid 48–104 px, line-height 0.98): hero и единственный главный тезис сцены.
- **Headline** (400, fluid 36–75 px, line-height 1.08): заголовки «Как нас найти», «Искусство, посуда и атмосфера» и «Подарки…».
- **Title** (500, 18–24 px, line-height 1.25): карточки блюд, сувениров и контактные группы.
- **Body** (400, 16–20 px, line-height 1.55, max 68ch): объясняющий текст.
- **Label** (500, 12–15 px, letter-spacing 0.09em): короткие разделы и служебные подписи; длинный body uppercase запрещён.

**The Measured Type Rule.** Кегль, ширина строки и переносы проверяются относительно reference bounding boxes; ручные `<br>` допускаются только для сохранения утверждённой композиции на соответствующем диапазоне ширины.

## Elevation

Система почти плоская. Глубина создаётся фотослоями, рамками, тональными переходами бумаги и редкими тёплыми ambient shadows. Интенсивная тёмная тень и декоративное стекло запрещены.

### Shadow Vocabulary

- **Паспарту:** `0 18px 48px rgba(83, 49, 31, 0.10)` для крупных фото, которые физически лежат над бумажной сценой.
- **Тактильный CTA:** `0 10px 24px rgba(143, 50, 29, 0.16)` только на hover/focus.

**The Flat-at-Rest Rule.** Большинство поверхностей плоские; тень появляется только когда слой действительно перекрывает другой слой или реагирует на действие.

## Components

### Buttons

- **Shape:** короткое мягкое скругление (8 px), внутренняя светлая hairline-рамка и внешний медный контур.
- **Primary:** медная поверхность, бумажный текст, стрелка справа, высота не менее 56 px desktop и 52 px mobile.
- **Hover / Focus:** затемнение к глубокой меди, сдвиг по Y не более 2 px, видимый двойной focus без изменения layout.
- **Secondary:** прозрачная бумажная поверхность, медный текст и 1 px line.

### Cards / Containers

- **Corner Style:** фото 22 px; товарные карточки используют reference-cut углы через mask/clip-path, а не стандартный rounded rectangle.
- **Background:** бумага или фарфор; карточка не создаётся там, где достаточно ритма и линии.
- **Border:** 1 px медной линии с пониженной непрозрачностью.
- **Internal Padding:** 16–28 px в зависимости от плотности сцены.

### Navigation

- Desktop: единая верхняя полоса, логотип слева, якоря по центру, адрес и телефон справа; sticky-состояние компактнее, но сохраняет бумажный фон.
- Mobile: компактная шапка и раскрываемое меню с теми же якорями; touch target 44 px, Esc/overlay-close и focus management обязательны.
- Active/hover: тонкая медная линия или малый цветочный знак без скачка текста.

### Scene Frame

Каждая из шести сцен имеет стабильный `data-scene`, desktop-контракт 1672×941 и fluid-адаптацию на 1920×1080. Фотоколлажи строятся отдельными `<picture>`/`img`, рамками и декоративными слоями. Цельный reference PNG никогда не рендерится в пользовательском DOM.

### Menu Carousel

На desktop видны пять референсных карточек; на mobile карточки листаются по одной с scroll-snap, кнопками и клавиатурой. Статический fallback сохраняет весь контент при отключённом JavaScript.

## Do's and Don'ts

### Do:

- **Do** измерять каждый reference screen на 1672×941 и хранить проверяемые scene snapshots.
- **Do** сохранять отдельные каталоги и manifest для documentary, reference-derived и generated media.
- **Do** использовать реальные компоненты, текст, ссылки, изображения и CSS-геометрию.
- **Do** проектировать mobile 390×844 и 320 px как самостоятельную композицию.
- **Do** обеспечивать `prefers-reduced-motion`, клавиатуру, focus-visible и отсутствие overflow.

### Don't:

- **Don't** делать «generic café template» с повторяющейся сеткой одинаковых карточек.
- **Don't** переносить оранжевую айдентику «Комода» в целевые сцены.
- **Don't** вставлять цельный PNG-скриншот вместо адаптивной вёрстки.
- **Don't** использовать холодный SaaS, неон, фиолетово-синий AI-градиент или декоративное glassmorphism.
- **Don't** выдавать generated/reference-derived media за документальные фотографии заведения.
- **Don't** анимировать layout-свойства или запускать perpetual motion без reduced-motion fallback.
