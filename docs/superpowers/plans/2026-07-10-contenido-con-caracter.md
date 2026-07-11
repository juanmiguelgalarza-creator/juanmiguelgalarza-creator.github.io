# "Contenido con Carácter" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Contenido con Carácter" (EN: "Brand with Character") as a new "Other work" entry on the portfolio home page and its own case-study detail page, in both locales.

**Architecture:** Content-only addition to an existing Astro content-collections site. Reuses `CaseStudyLayout` in its already-built `kind: "other"` mode (neutral header, no index number, no "next project" link) and `WorkBlock` for the three brand sub-sections. One small, backward-compatible fix to `WorkBlock`'s text rendering is required (see Task 1) because this content has multi-paragraph blurbs per brand, which no existing case study has needed before.

**Tech Stack:** Astro 7, content collections (Zod schema in `src/content.config.ts`), no test runner in this repo — verification is `astro check` (type/schema validation) plus manual browser verification via the preview tooling (screenshots, console/network checks), matching how every prior change in this project has been verified.

## Global Constraints

- No new components, no new CSS classes beyond what Task 1 adds. (Per approved design: neutral tone only, matching Tiendablau — confirmed with user, no per-brand accent colors.)
- No content may be invented or summarized — all body copy is transcribed verbatim from `/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/case-study_{ES,EN}.md`, with only the inline `[bracket]` image-reference markers stripped out (those are authoring instructions, not display copy).
- `order: 6`, `slug: contenido-con-caracter`, `kind: other`, `initials: "CC"` (from the approved spec).
- No `heroImage`, no `nextSlug` (matches spec — no designated hero shot in source, standalone entry not chained to another case study).
- This project has no git repository initialized (confirmed via `git status` → "not a git repository"), so there are no commit steps in this plan. Each task ends with a manual verification step instead.

---

## Deviation from the approved spec (flagging before implementation)

The approved spec described each brand's `text` as "that brand's descriptive paragraph" (singular). Re-reading the source markdown while drafting this plan, each brand actually has **three paragraphs**: an intro (no image reference), a paragraph about the visual system (references the grid-feed image), and a paragraph about specific example pieces (references the two post images). `WorkBlock`'s `text` prop currently renders one `<p>` only — collapsing three paragraphs into one would either lose content or require silently merging sentences, both of which violate the "no summarizing" constraint.

**Fix:** Task 1 changes `WorkBlock`'s text rendering to split on a blank line (`\n\n`) and render one `<p class="work-block__text">` per paragraph, instead of a single paragraph. This is additive and backward-compatible — every existing single-paragraph `text` value across all other case studies (Lexis, Heka, Quore, QPH, Tiendablau) contains no `\n\n`, so it renders exactly as before (one `<p>`, unchanged output). No visual/CSS change, just letting multi-paragraph strings render as multiple paragraphs instead of one run-on block.

---

### Task 1: Multi-paragraph support in `WorkBlock`

**Files:**
- Modify: `src/components/WorkBlock.astro`

**Interfaces:**
- Consumes: nothing new — `text?: string` prop already exists.
- Produces: `WorkBlock` now renders one `<p class="work-block__text">` per `\n\n`-separated paragraph in `text`, instead of always exactly one `<p>`. Every other prop and class name is unchanged, so Tasks 3–4 (content files) and every existing case study keep working unmodified.

- [ ] **Step 1: Read the current file to confirm line numbers before editing**

Run: `sed -n '1,46p' src/components/WorkBlock.astro`

Expected: matches the version already in this repo — a frontmatter block with `renderInline()`, then a template with `{text && <p class="work-block__text" set:html={renderInline(text)} />}`.

- [ ] **Step 2: Replace the single-paragraph render with a multi-paragraph render**

In `src/components/WorkBlock.astro`, replace:

```astro
  {text && <p class="work-block__text" set:html={renderInline(text)} />}
```

with:

```astro
  {text &&
    text
      .split('\n\n')
      .map((paragraph) => <p class="work-block__text" set:html={renderInline(paragraph)} />)}
```

- [ ] **Step 3: Verify existing single-paragraph case studies still render identically**

Start the dev server (background mode per this repo's `AGENTS.md`: `astro dev --background`), then check Lexis's "Homepage" section (single-paragraph `text`, unaffected by this change):

Run in the browser preview: navigate to `http://localhost:4321/en/work/lexis`, then in the page console:
```js
document.querySelectorAll('.work-block__text').length
```
Expected: same count as before this change (one `<p class="work-block__text">` per existing single-paragraph `text` block — this task must not change that count for any existing project). Visually confirm the Lexis "Homepage" paragraph still reads as one unbroken paragraph, not split.

- [ ] **Step 4: Manual verification checkpoint**

Run `npx astro check` — expected: `0 errors` (matches the baseline already established in this project; this task touches only template logic, no schema changes).

---

### Task 2: Copy and verify the source images

**Files:**
- Create: `public/images/contenido-caracter/lexis/lexis-grid-feed.jpg`
- Create: `public/images/contenido-caracter/lexis/lexis-post-mensajeria-app.jpg`
- Create: `public/images/contenido-caracter/lexis/lexis-post-38-anos.jpg`
- Create: `public/images/contenido-caracter/litigant/litigant-grid-feed.jpg`
- Create: `public/images/contenido-caracter/litigant/litigant-post-registra-tiempo.jpg`
- Create: `public/images/contenido-caracter/litigant/litigant-post-metricas-claras.jpg`
- Create: `public/images/contenido-caracter/tiendablau/tiendablau-grid-feed.jpg`
- Create: `public/images/contenido-caracter/tiendablau/tiendablau-sala-zebra.jpg`
- Create: `public/images/contenido-caracter/tiendablau/tiendablau-mesa-madera.jpg`

**Interfaces:**
- Consumes: source files at `/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/images/{lexis,litigant,tiendablau}/*.jpg`.
- Produces: nine JPGs under `public/images/contenido-caracter/`, at the exact paths Tasks 3–4's content files reference via `src:`.

- [ ] **Step 1: Create the destination folders and copy all nine files**

```bash
mkdir -p /Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter/lexis
mkdir -p /Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter/litigant
mkdir -p /Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter/tiendablau

SRC=/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/images
DEST=/Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter

cp "$SRC/lexis/lexis-grid-feed.jpg" "$DEST/lexis/"
cp "$SRC/lexis/lexis-post-mensajeria-app.jpg" "$DEST/lexis/"
cp "$SRC/lexis/lexis-post-38-anos.jpg" "$DEST/lexis/"
cp "$SRC/litigant/litigant-grid-feed.jpg" "$DEST/litigant/"
cp "$SRC/litigant/litigant-post-registra-tiempo.jpg" "$DEST/litigant/"
cp "$SRC/litigant/litigant-post-metricas-claras.jpg" "$DEST/litigant/"
cp "$SRC/tiendablau/tiendablau-grid-feed.jpg" "$DEST/tiendablau/"
cp "$SRC/tiendablau/tiendablau-sala-zebra.jpg" "$DEST/tiendablau/"
cp "$SRC/tiendablau/tiendablau-mesa-madera.jpg" "$DEST/tiendablau/"
```

- [ ] **Step 2: Verify all nine files landed and check their sizes are sane for web use**

Run:
```bash
find /Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter -type f | sort
du -h /Users/juanmiguelgalarza/portafolio/public/images/contenido-caracter/**/*.jpg
```

Expected: 9 files listed, each well under a few MB (these are already-sized Instagram exports, unlike Tiendablau's raw ecommerce screenshots — no resizing step is expected to be necessary; if any file is unexpectedly large — e.g. over ~5MB — stop and re-check with the user before downscaling, since these are finished creative assets, not raw screenshots).

---

### Task 3: English content file

**Files:**
- Create: `src/content/projects/en/contenido-con-caracter.md`

**Interfaces:**
- Consumes: `kind: z.enum(['work', 'other'])`, `initials: z.string().optional()`, and the rest of the `projects` schema already defined in `src/content.config.ts` (no schema changes in this plan). Depends on Task 1's multi-paragraph `WorkBlock` rendering and Task 2's image files existing at the referenced paths.
- Produces: a `projects` collection entry with `id` starting `en/`, `data.slug === 'contenido-con-caracter'`, consumed by `src/pages/en/index.astro` (via `HomeView.astro`) and `src/pages/en/work/[slug].astro`.

- [ ] **Step 1: Create the file with this exact content**

```markdown
---
order: 6
slug: contenido-con-caracter
kind: other
initials: "CC"
category: "Brand & Content Strategy"
title: "Brand with Character"
thesis: "Brands without a clear identity or guidelines, turned into coherent visual and content systems for social media."
role: "Freelance Consultant"
dates: "2015, present (ongoing)"
work:
  - section: "Lexis"
    text: "Lexis is a law firm with 38 years in business, but its social presence didn't reflect that weight. The challenge was building a feed that felt solid and trustworthy without falling into the stiffness so common in legal branding.\n\nThe system was built on deep blues, soft earth tones, and a serif typeface for headlines that gives every piece an editorial feel, paired with real office photography (not generic stock) to keep it authentic.\n\nPieces like the leather briefcase post with the line \"Your legal ally, wherever you are\" show how the system flexes across formats, from product launches to institutional content. That consistency holds even in commemorative pieces, like the one marking the firm's 38th anniversary, where the tone warms up without losing the brand's underlying seriousness."
    images:
      - src: /images/contenido-caracter/lexis/lexis-grid-feed.jpg
        alt: "Lexis Instagram grid overview"
      - src: /images/contenido-caracter/lexis/lexis-post-mensajeria-app.jpg
        alt: "Lexis post, leather briefcase, \"Your legal ally, wherever you are\""
      - src: /images/contenido-caracter/lexis/lexis-post-38-anos.jpg
        alt: "Lexis post marking the firm's 38th anniversary"
  - section: "Litigant"
    text: "Litigant+ launched as Lexis's software arm, a legal management tool. The challenge here was different from the parent brand: it needed to feel tech-forward and agile, without cutting ties with the credibility Lexis already brought to the table.\n\nThe solution was a darker, more contemporary visual system, with monospaced typography for headlines (a direct nod to the software world) and electric blue accents over near-black backgrounds, deliberately contrasting with Lexis's warmer palette.\n\nThe content focuses on solving concrete user problems, \"track your time,\" \"bill without losing a minute,\" instead of talking about the brand in the abstract. That same logic carries into more institutional pieces, where the message shifts from a specific feature to the bigger promise of strategic management, without losing the product's visual language."
    images:
      - src: /images/contenido-caracter/litigant/litigant-grid-feed.jpg
        alt: "Litigant+ Instagram grid overview"
      - src: /images/contenido-caracter/litigant/litigant-post-registra-tiempo.jpg
        alt: "Litigant+ post, \"track your time, bill without losing a minute\""
      - src: /images/contenido-caracter/litigant/litigant-post-metricas-claras.jpg
        alt: "Litigant+ post, \"clear metrics, legal management that drives your team forward\""
  - section: "Tiendablau"
    text: "Custom furniture, and the identity challenge was specific: visually represent the combination of wood's warmth with metal's modernity, without the system feeling cold or generic within the home decor space.\n\nThe solution was a feed that mixes product renders in soft colors (sage green, ochre, terracotta) with real photography of pieces installed in clients' homes, showing that \"custom-made\" isn't just a catalog concept.\n\nPieces like the living room with the zebra-print sofa, shot directly in the client's home, reinforce the idea that every piece of furniture adapts to the client's style, not the other way around. That same balance between warmth and modernity shows up in the solid wood side table next to a contemporary chair, where both materials coexist without competing."
    images:
      - src: /images/contenido-caracter/tiendablau/tiendablau-grid-feed.jpg
        alt: "Tiendablau Instagram grid overview"
      - src: /images/contenido-caracter/tiendablau/tiendablau-sala-zebra.jpg
        alt: "Tiendablau post, living room with zebra-print sofa, shot in a client's home"
      - src: /images/contenido-caracter/tiendablau/tiendablau-mesa-madera.jpg
        alt: "Tiendablau post, solid wood side table next to a contemporary chair"
result: "Giving a brand a clear image and identity where there wasn't one translates directly into results: content that amplifies what the brand already is, instead of working against it. Lexis, Litigant, and Tiendablau are examples of brands that now have a visual and content system they can sustain over time."
lesson: "No two brands are alike, and that's the richest part of the process. Every new project means starting from zero in exploration and discovery, there's no formula that repeats from client to client."
---

## Context

Since 2015 I've worked as a freelance consultant helping brands solve a problem that comes up again and again: they have a presence on social media, but no defined identity behind it. They post content without a clear visual system, without tone or voice guidelines, and without a brand vision that gives their posts any real direction.

This shows up both in new brands just starting to build a digital presence, and in established businesses that grew without ever thinking about identity (clients like Lexis, Litigant, and Tiendablau, among others, came to me at different stages of this same problem).

The challenge isn't just "making nice-looking content." It's building an identity system (visual and content-wise) the brand can carry forward on its own, without depending on me for every new piece.

## Process / My Role

With every client, I start with an in-depth conversation to understand the brand: who they are, what they sell, how they see themselves. From that conversation, we build a brief together that turns loose ideas into something concrete.

With the brief as a foundation, I research the market, the product, and the competition before proposing anything visual. That leads to a brand manual built specifically for social media (not a generic corporate brand guide), where the visual system and content tone are defined together, not separately.

Depending on the scope, I either hand off the manual for the client's team to run with, or stay on to produce the content myself. I work solo, though I bring in other professionals (photographers, community managers) when a project calls for it.
```

- [ ] **Step 2: Verify the frontmatter parses**

Run: `npx astro check`
Expected: `0 errors` — if the YAML frontmatter has a syntax error (e.g. an unescaped quote inside a double-quoted string), `astro check` will report it against this file. Every embedded `"` inside the `text` and `alt` values above is already escaped as `\"`, matching the pattern used in Lexis's existing `\"Cuáles son los derechos...\"` style content — if `astro check` still fails on a quoting issue, fix the specific line it points to the same way (escape the inner quote) and re-run.

---

### Task 4: Spanish content file

**Files:**
- Create: `src/content/projects/es/contenido-con-caracter.md`

**Interfaces:**
- Consumes: same as Task 3, but for the `es/` locale.
- Produces: a `projects` collection entry with `id` starting `es/`, `data.slug === 'contenido-con-caracter'`, consumed by `src/pages/es/index.astro` and `src/pages/es/proyectos/[slug].astro`.

- [ ] **Step 1: Create the file with this exact content**

```markdown
---
order: 6
slug: contenido-con-caracter
kind: other
initials: "CC"
category: "Marca y Estrategia de Contenido"
title: "Contenido con Carácter"
thesis: "Marcas sin identidad clara ni lineamientos, convertidas en sistemas visuales y de contenido coherentes para redes sociales."
role: "Consultoría Freelance"
dates: "2015, actualidad (en curso)"
work:
  - section: "Lexis"
    text: "Lexis es una firma legal con 38 años de trayectoria, pero su presencia en redes no reflejaba ese peso. El reto era construir un feed que transmitiera solidez y confianza sin caer en lo acartonado que suele verse en el sector legal.\n\nEl sistema se armó sobre una paleta de azules profundos, tonos tierra suaves y una tipografía serif para los titulares que le da carácter editorial a cada pieza, combinada con fotografía de oficina real (no stock genérico) para mantener autenticidad.\n\nPiezas como la del maletín de cuero con la promesa \"Su aliado jurídico donde sea que esté\" muestran cómo el sistema se adapta a distintos formatos, desde lanzamientos de producto hasta contenido institucional. La consistencia se sostiene incluso en piezas conmemorativas, como la que celebra los 38 años de la firma, donde el tono se vuelve más cercano sin perder la seriedad de marca."
    images:
      - src: /images/contenido-caracter/lexis/lexis-grid-feed.jpg
        alt: "Vista general del grid de Instagram de Lexis"
      - src: /images/contenido-caracter/lexis/lexis-post-mensajeria-app.jpg
        alt: "Post de Lexis, maletín de cuero, \"Su aliado jurídico donde sea que esté\""
      - src: /images/contenido-caracter/lexis/lexis-post-38-anos.jpg
        alt: "Post de Lexis celebrando los 38 años de la firma"
  - section: "Litigant"
    text: "Litigant+ nace como el brazo de software de Lexis, una herramienta de gestión legal. El reto acá era distinto al de la marca madre: necesitaba sentirse tecnológico y ágil, pero sin desconectarse de la seriedad que ya tenía Lexis como respaldo.\n\nLa solución fue un sistema visual más oscuro y contemporáneo, con tipografía monoespaciada para los titulares (un guiño directo al mundo del software) y acentos en celeste eléctrico sobre fondos casi negros, que contrasta a propósito con los tonos cálidos de Lexis.\n\nEl contenido se enfoca en resolver problemas concretos del usuario, \"registra tu tiempo\", \"factura sin perder nada\", en vez de hablar de la marca en abstracto. Esa misma lógica se sostiene en piezas más institucionales, donde el mensaje pasa de la función puntual a la promesa mayor de gestión estratégica, sin perder el lenguaje visual del producto."
    images:
      - src: /images/contenido-caracter/litigant/litigant-grid-feed.jpg
        alt: "Vista general del grid de Instagram de Litigant+"
      - src: /images/contenido-caracter/litigant/litigant-post-registra-tiempo.jpg
        alt: "Post de Litigant+, \"registra tu tiempo, factura sin perder nada\""
      - src: /images/contenido-caracter/litigant/litigant-post-metricas-claras.jpg
        alt: "Post de Litigant+, \"métricas claras, gestión legal que impulsa a tu equipo\""
  - section: "Tiendablau"
    text: "Muebles a medida, y el reto de identidad era específico: representar visualmente la combinación de calidez de la madera con la modernidad del metal, sin que el sistema se sintiera frío ni tampoco genérico dentro del rubro de decoración.\n\nLa solución fue un feed que mezcla renders de producto en colores suaves (verde salvia, ocre, terracota) con fotografía real de las piezas ya instaladas en espacios de clientes, mostrando que lo \"a medida\" no es solo un concepto de catálogo.\n\nPiezas como la sala con sofá de print cebra, fotografiada directamente en la casa del cliente, refuerzan la idea de que cada mueble se adapta al estilo de quien lo compra, no al revés. Ese mismo balance entre calidez y modernidad se ve en el detalle de la mesa de madera maciza junto a una silla contemporánea, donde ambos materiales conviven sin competir."
    images:
      - src: /images/contenido-caracter/tiendablau/tiendablau-grid-feed.jpg
        alt: "Vista general del grid de Instagram de Tiendablau"
      - src: /images/contenido-caracter/tiendablau/tiendablau-sala-zebra.jpg
        alt: "Post de Tiendablau, sala con sofá de print cebra, fotografiada en casa de un cliente"
      - src: /images/contenido-caracter/tiendablau/tiendablau-mesa-madera.jpg
        alt: "Post de Tiendablau, mesa de madera maciza junto a una silla contemporánea"
result: "Darle una imagen e identidad clara a una marca que no la tenía se traduce directamente en resultados: contenido que potencia lo que la marca ya es, en vez de competir contra ella. Lexis, Litigant y Tiendablau son ejemplos de marcas que hoy tienen un sistema visual y de contenido que pueden sostener en el tiempo."
lesson: "No hay dos marcas iguales, y eso es lo más rico del proceso. Cada proyecto nuevo obliga a empezar de cero en exploración y descubrimiento, no hay una fórmula que se repita de cliente en cliente."
---

## Contexto

Desde 2015 trabajo como consultor freelance ayudando a marcas a resolver un problema que se repite con frecuencia: tienen presencia en redes sociales, pero no tienen una identidad definida detrás. Publican contenido sin un sistema visual claro, sin lineamientos de tono o voz, y sin una visión de marca que le dé sentido a lo que publican.

Esto pasa tanto en marcas nuevas que recién empiezan a construir su presencia digital, como en negocios ya establecidos que crecieron sin pensar en identidad (clientes como Lexis, Litigant y Tiendablau, entre otros, llegaron en distintas etapas de este mismo problema).

El reto no es solo "crear contenido bonito", es construir un sistema de identidad (visual y de contenido) que la marca pueda sostener en el tiempo sin depender de mí para cada pieza nueva.

## Proceso / Mi rol

Con cada cliente empiezo con una reunión a profundidad para entender la marca: quiénes son, qué venden, cómo se ven a sí mismos. De esa conversación armamos juntos un brief que aterriza las ideas sueltas en algo concreto.

Con el brief como base, investigo el mercado, el producto y la competencia antes de proponer nada visual. De ahí sale un manual de marca enfocado específicamente para redes sociales (no una guía genérica de marca corporativa), donde el sistema visual y el tono de contenido se definen juntos, no por separado.

Dependiendo del alcance del proyecto, entrego el manual para que el equipo del cliente lo ejecute, o me quedo produciendo el contenido directamente. Trabajo solo, aunque puedo recomendar otros profesionales (fotógrafos, community managers) cuando el proyecto lo requiere.
```

- [ ] **Step 2: Verify the frontmatter parses**

Run: `npx astro check`
Expected: `0 errors`, same as Task 3's check (both content files are validated together in one `astro check` run).

---

### Task 5: End-to-end verification

**Files:** none (verification only).

**Interfaces:**
- Consumes: Tasks 1–4's outputs (the `WorkBlock` change, nine images, two content files).
- Produces: confirmation the feature works before calling the plan done.

- [ ] **Step 1: Restart the dev server clean**

This project has hit stale-HMR issues before when content/schema files change while the dev server is running (documented in this project's own session history). Stop and restart it:

```bash
astro dev stop
astro dev --background
astro dev status
```

Expected: status shows the server running on port 4321.

- [ ] **Step 2: Verify the home page shows the new "Other work" entry, both locales**

In the browser preview, navigate to `http://localhost:4321/en/` and run:
```js
Array.from(document.querySelectorAll('.other-work-item__title')).map(el => el.textContent)
```
Expected: `["Tiendablau", "Brand with Character"]` (order matches `order: 5` then `order: 6`).

Then check the initials badge specifically:
```js
document.querySelectorAll('.other-work-item')[1].querySelector('.other-work-item__index').textContent
```
Expected: `"CC"`.

Repeat at `http://localhost:4321/es/` — expected titles: `["Tiendablau", "Contenido con Carácter"]`.

- [ ] **Step 3: Verify the case-study detail page renders in both locales**

Navigate to `http://localhost:4321/en/work/contenido-con-caracter` and run:
```js
({
  title: document.title,
  h2s: Array.from(document.querySelectorAll('h2')).map(h => h.textContent),
  h3s: Array.from(document.querySelectorAll('h3')).map(h => h.textContent),
  imgCount: document.querySelectorAll('.work-block img').length,
  hasIndexNumber: !!document.querySelector('.case-header__number'),
  hasNextLink: !!document.querySelector('.case-next'),
})
```
Expected:
- `title`: `"Brand with Character — Juan Miguel Galarza"`
- `h2s`: `["Context", "Process / My Role", "The Work", "The Result", "The Lesson"]`
- `h3s`: `["Lexis", "Litigant", "Tiendablau"]`
- `imgCount`: `9`
- `hasIndexNumber`: `false` (confirms the neutral `kind: "other"` header, no colored index block)
- `hasNextLink`: `false` (confirms no `nextSlug`, matching the spec)

Repeat at `http://localhost:4321/es/proyectos/contenido-con-caracter`, expecting the Spanish `h2s` (`["Contexto", "Proceso / Mi rol", "El trabajo", "El resultado", "La lección"]`) and the same `h3s`, `imgCount`, `hasIndexNumber`, `hasNextLink`.

- [ ] **Step 4: Confirm every image actually loads (no 404s)**

On the English detail page, scroll through the full page (lazy-loaded images only fetch once visible) then run:
```js
Array.from(document.querySelectorAll('.work-block img')).map(img => ({ src: img.src.replace(location.origin, ''), complete: img.complete, naturalWidth: img.naturalWidth }))
```
Expected: 9 entries, every one with `complete: true` and `naturalWidth > 0`.

- [ ] **Step 5: Confirm the odd-gallery centering rule applies (3rd image per brand)**

At a desktop viewport (1280×1000), for one brand section (e.g. Lexis), check that the third figure spans and centers rather than sitting flush left with empty space beside it:
```js
(function () {
  const figures = document.querySelectorAll('.work-block__gallery .work-block__figure');
  const last = figures[figures.length - 1];
  const cs = getComputedStyle(last);
  return { gridColumn: cs.gridColumn, width: last.getBoundingClientRect().width, parentWidth: last.parentElement.getBoundingClientRect().width };
})()
```
Expected: `gridColumn` is `"1 / -1"` and `width` is roughly half of `parentWidth` (matching the same centered-odd-image behavior already verified for Lexis and Tiendablau earlier in this project).

- [ ] **Step 6: Check for console/network errors and take a final screenshot**

```js
// no JS call needed — use the browser tool's console-log and network-request readers
```
Read console messages (errors only) and network requests (failed only) for both detail pages. Expected: no errors, no failed requests. Take one desktop screenshot of each detail page's top section (header + first work block) as visual confirmation, plus one mobile-width screenshot of the home page's "Other work" section.

- [ ] **Step 7: Confirm no regressions in the four numbered case studies or Tiendablau**

```js
Array.from(document.querySelectorAll('.project-item__title, .other-work-item__title')).map(el => el.textContent)
```
Run on `http://localhost:4321/en/`. Expected: `["Lexis", "Heka", "Quore", "QPH — Ideation and Feasibility", "Tiendablau", "Brand with Character"]` — six total, nothing missing or duplicated, nothing renamed.

---

## Self-Review

**Spec coverage:** Home page entry (Task 5 Step 2) ✅. Neutral `kind: "other"` detail page, no hero, no next-link (Task 5 Step 3) ✅. Three brand `WorkBlock`s in Lexis → Litigant → Tiendablau order with verbatim text and correctly-mapped images (Tasks 3–4, verified Task 5 Step 3–4) ✅. Images copied preserving per-brand subfolders (Task 2) ✅. Both locales (Tasks 3, 4; verified throughout Task 5) ✅. `order: 6`, `slug`, `kind`, `initials` (Tasks 3–4 frontmatter) ✅.

**Placeholder scan:** No TBD/TODO. The one open item flagged mid-plan (multi-paragraph text) is fully resolved with a concrete code change (Task 1), not deferred.

**Type consistency:** `WorkBlock`'s `text?: string` prop type is unchanged (still a string — paragraphs are joined with `\n\n` inside that same string, not a new array type), so no signature changes ripple into other tasks. `kind`, `initials`, and every other frontmatter field already exist in `src/content.config.ts`'s schema from prior work in this project — no schema edits needed in this plan.
