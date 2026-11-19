# Little Jots of Joy: Brand guide (v2)

Approved 2026-11-18 by Kelly (CEO). Design canvas: https://claude.ai/artifact/314AVEgLmssQQEgxqV3ZZK (page "v2 — from Kelly's logo").
Tokens: `src/styles/tokens.css` · Fonts: `src/styles/fonts.css` · Assets: `src/assets/brand/`, `public/`.

Every page, component and image must follow this guide. If something here conflicts with a request, ask before deviating.

## 1. Brand architecture

- **Little Jots of Joy** is the master brand.
- **Art Cards by Hadley** is the first product line (sub-brand). The name is always written exactly like that. In Hadley's handwriting the capital C looks like a lowercase c; it's still a capital.
- Future lines get their own lead colour (Sunshine is reserved for line #2) and share everything else.

## 2. Logos

| File (`src/assets/brand/`) | Use | Alt text |
|---|---|---|
| `little-jots-of-joy-logo.png` | Master logo (heart + "Little" + "Jots of Joy"). Light backgrounds. | `Little Jots of Joy` |
| `little-jots-of-joy-logo-reversed.png` | Master logo on Forest or other dark backgrounds. | `Little Jots of Joy` |
| `little-jots-of-joy-wordmark.png` / `-reversed.png` | Wordmark without the heart: header, footer, tight spaces. Pair with `heart.png` for a horizontal header. | `Little Jots of Joy` |
| `heart.png` / `heart-reversed.png` | The hand-drawn heart on its own. Decorative next to the wordmark. | `""` (empty, decorative) |
| `art-cards-by-hadley-teal.svg` / `.png` | Hadley's wordmark. Default on light backgrounds (Teal Deep). | `Art Cards by Hadley` |
| `art-cards-by-hadley-forest.svg` / `.png` | Hadley's wordmark on bright Teal backgrounds. | `Art Cards by Hadley` |
| `art-cards-by-hadley-reversed.svg` / `.png` | Hadley's wordmark on Forest / Teal Deep backgrounds. | `Art Cards by Hadley` |
| `art-cards-by-hadley-lockup.png` | **Combined logo** (approved option F): Hadley's wordmark, then a heart divider with thin Forest lines, then the Little Jots of Joy wordmark. Use for the Hadley section header and anywhere a Hadley product needs the family tie. | `Art Cards by Hadley, from Little Jots of Joy` |
| `art-cards-by-hadley-lockup-reversed.png` | Combined logo on dark backgrounds. | same as above |

Rules:
- Never redraw, recolour, stretch, slant, add effects to or re-typeset the logos. Use the files.
- **Hadley's wordmark is her real handwriting** (a font made from her printing). Never substitute another "handwriting" font for it, anywhere.
- The combined logo has **no connector words** ("from", "by"). The divider lines are **Forest, never Teal**.
- Clear space around any logo: at least the height of the heart.
- Minimum widths on screen: master logo 120 px, Hadley wordmark 160 px, combined logo 180 px.
- The master logo is raster (from a 2000 px source), which is fine at web sizes. A vector rebuild is planned; it will keep the same file names.

## 3. Colour

Use the tokens, never raw hex values in components.

| Token | Hex | Role | Text use |
|---|---|---|---|
| `--ljj-forest` | #104032 | Primary text, headings, wordmarks, divider lines, footer | 11.3:1 on Paper |
| `--ljj-rose` | #DE6775 | The heart and decorative accents | **Never text** |
| `--ljj-rose-deep` | #B94452 | Links and rose text | 5.1:1 on Paper |
| `--ljj-teal` | #3BB8AE | Art Cards by Hadley background colour | Forest text on it: 4.8:1 |
| `--ljj-teal-deep` | #0E7A73 | Hadley wordmark, teal text, focus ring | 5.0:1 on Paper |
| `--ljj-sunshine` | #FFC23D | Primary buttons, highlights | Forest text on it: 7.2:1. Never as text. |
| `--ljj-paper` | #FFFBF3 | Page background | |
| `--ljj-sage` | #EEF1EA | Alternate section background | Forest 10.2:1. Rose Deep 4.6:1 and Teal Deep 4.5:1 just pass: use them only at body size or larger. |
| `--ljj-ink-soft` | #2C4B42 | Secondary text | 9.3:1 on Paper |

- Teal belongs to Hadley's line: it marks her section and products. It's not a general site accent and never a divider line.
- Print uses white, not Paper. Paper is screen only.

## 4. Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Headings | **Fraunces** | 600 (500 for very large hero text) | Chosen over Grenze, Lora and sans-only. |
| Body, UI, buttons, small print | **Nunito Sans** | 400, 700 | 17px base on the web. |
| Logo only | Yellowtail, Grenze | — | Live inside the logo artwork. **Never used as site text.** |
| Hadley's handwriting | Custom font (Kelly, Canva) | — | Inside the cards. Not on the site unless the font file is supplied. |

All fonts are self-hosted from `/public/fonts` (OFL 1.1). No Google Fonts requests.

## 5. Voice

Warm, simple, playful, honest. Short sentences. No hype, no exclamation-mark pile-ups. The kids' art is the loud part; the words frame it.

Approved lines:
- Instagram: **@littlejotsofjoy**
- Card-back small print (approved 2026-11-18, buy-local appeal): "Original artwork · littlejotsofjoy.ca · @littlejotsofjoy · Made with joy in Ontario"
- Cards have no titles.
- Tagline (approved 2026-11-18): "Kid-drawn cards for life's little moments." Lives in `site.tagline`; also baked into `public/og-image.png`.

## 6. Child privacy (non-negotiable, from the project brief §7)

- No children's faces, surnames, ages, school, neighbourhood or location anywhere: images, copy, file names, alt text, commit messages, metadata.
- Hadley's first name appears **only** inside the sub-brand name "Art Cards by Hadley".
- Strip all metadata from images. The brand assets in this package were saved without metadata.
- Process photos show hands and artwork only.
- Location: "Ontario" is approved on card backs only. On the website, no location until Brion decides (any use of "Ontario" there needs that decision first).

## 7. Card print specs (for reference)

- Half-letter stock (5.5×8.5 in), folded to 4.25×5.5 in. Both orientations.
- Portrait: side fold. Landscape: top fold, with the back panel printed rotated 180°.
- Back stamp: combined logo plus small print, bottom centre, about 1.8 in wide and 0.4 in from the bottom edge.
