# Design: "Contenido con Carácter" — new "Other work" entry

## Context

The portfolio's home page has two tiers: the numbered "Selected work" list (Lexis,
Heka, Quore, QPH — digital product/UX case studies) and a quieter "Other work"
section below it, introduced for Tiendablau. This adds a second "Other work"
entry, "Contenido con Carácter" (EN: "Brand with Character"), positioned after
Tiendablau.

Source content (already fully written in both languages by the user):
- `/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/case-study_ES.md`
- `/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/case-study_EN.md`
- `/Users/juanmiguelgalarza/Downloads/contenido-con-caracter/images/{lexis,litigant,tiendablau}/*.jpg`

The case study covers freelance brand/content-system consultancy work across
three clients (Lexis, Litigant, Tiendablau), each with a short paragraph and
three images: one Instagram grid overview (`*-grid-feed.jpg`) and two example
posts.

## Decisions

1. **Visual treatment: neutral, matching Tiendablau.** All three brand
   sub-blocks use the existing `tone="neutral"` styling already built for
   `kind: "other"` case studies (gray top borders, no coral/indigo). No new
   color variants are added to `WorkBlock`. This keeps "Other work" a
   deliberately quieter tier than the four numbered case studies — confirmed
   with the user over a brand-color-per-section alternative.
2. **No new components or CSS.** This is a content-only addition. It reuses:
   - `CaseStudyLayout` in its `kind: "other"` mode (neutral header, no index
     number, no "next project" link — same as Tiendablau).
   - `WorkBlock`, one instance per brand, each with exactly 3 images. The
     odd-gallery centering rule (already shipped for Lexis/Tiendablau) applies
     automatically since 3 is odd.
   - `OtherWorkItem` on the home page, same pattern as Tiendablau's "TB" tile.

## Content model

No schema changes needed. Uses the existing `projects` collection fields:
`order`, `slug`, `kind: "other"`, `initials`, `category`, `title`, `thesis`,
`role`, `dates`, `work[]` (three entries, one per brand), `result`, `lesson`.
No `heroImage` (matches Tiendablau/QPH precedent — no designated hero shot in
source content). No `nextSlug` (standalone "other work" entry, not chained).

## Page structure (`kind: "other"`)

Header → Context → Process/My Role → **The Work** (3 `WorkBlock`s: Lexis,
Litigant, Tiendablau, in that order) → Result/Lesson. No "next project" link.

Each brand `WorkBlock`:
- `section`: brand name ("Lexis" / "Litigant" / "Tiendablau")
- `text`: that brand's descriptive paragraph, transcribed verbatim from the
  source markdown (the two sentences per brand, unmodified)
- `images`: 3 entries, in source order — grid-feed image first, then the two
  post examples, matching the `[bracket]` references in the source text

## Image handling

Copy source images verbatim (no cropping/re-encoding needed — these are
already reasonably sized JPGs, unlike the Tiendablau ecommerce screenshots)
into:

```
public/images/contenido-caracter/lexis/lexis-grid-feed.jpg
public/images/contenido-caracter/lexis/lexis-post-mensajeria-app.jpg
public/images/contenido-caracter/lexis/lexis-post-38-anos.jpg
public/images/contenido-caracter/litigant/litigant-grid-feed.jpg
public/images/contenido-caracter/litigant/litigant-post-registra-tiempo.jpg
public/images/contenido-caracter/litigant/litigant-post-metricas-claras.jpg
public/images/contenido-caracter/tiendablau/tiendablau-grid-feed.jpg
public/images/contenido-caracter/tiendablau/tiendablau-sala-zebra.jpg
public/images/contenido-caracter/tiendablau/tiendablau-mesa-madera.jpg
```

Subfolder-per-brand structure mirrors the source folder, same convention used
for Tiendablau's own images.

Alt text: short, literal description of what's in each shot (e.g. "Lexis
Instagram grid overview", "Lexis post — leather briefcase, 'Su aliado
jurídico donde sea que esté'"), no invented narrative beyond what the source
paragraph already states.

## Content files

Create `src/content/projects/en/contenido-con-caracter.md` and
`src/content/projects/es/contenido-con-caracter.md`, transcribed directly
from the two source markdown files — headers, context, process, the three
brand blocks, result, and lesson — with no summarizing or invented copy.

Frontmatter (both locales):
- `order: 6`
- `slug: contenido-con-caracter`
- `kind: other`
- `initials: "CC"`
- `category`: EN "Brand & Content Strategy" / ES "Marca y Estrategia de Contenido"
  (final value — not present verbatim in the source, but built only from
  words already in the source thesis/role: "sistemas visuales y de contenido",
  "Consultoría Freelance")
- `title`: "Brand with Character" (EN) / "Contenido con Carácter" (ES)
- `thesis`, `role`, `dates`: transcribed verbatim from the source header block

## Out of scope

- No hero image (none designated in source).
- No brand-specific color accents (explicitly decided against).
- No changes to the four numbered case studies or their layout.
- No new fields on the content schema.

## Open questions

None — content is fully written in both languages, image references are
unambiguous, and the visual treatment follows an established precedent
exactly.
