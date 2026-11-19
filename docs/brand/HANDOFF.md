# Brand handoff: building the v1 home page

From the brand session, 2026-11-18. Read `docs/brand/BRAND.md` first.

## Already wired in this repo

- `src/styles/fonts.css`: `@font-face` for Fraunces 500/600 and Nunito Sans 400/700, self-hosted from `public/fonts/` (OFL licences beside the files). Imported by `global.css`, so it ships as an external stylesheet (`inlineStylesheets: 'never'` is already set).
- `src/styles/tokens.css`: brand palette (`--ljj-*`) and role tokens. Existing token names are kept, so `global.css` keeps working.
- `src/layouts/Base.astro`: favicon, Apple touch icon, manifest, theme colour, `color-scheme: light`, preloads for the two above-the-fold fonts, Open Graph and Twitter card tags.
- `src/pages/site.webmanifest.ts`: the manifest, built from `site.ts`.
- `public/`: `favicon.ico` (16/32/48, a bolder single-colour heart for small sizes), `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og-image.png` (1200×630).
- `src/assets/brand/`: logo files. Load them with Astro's `<Image>` / `<Picture>`, which gives responsive WebP/AVIF and re-encodes the files (stripping metadata again). Use the Hadley SVGs through `<Image>` or `<img>`, not inlined.

## Home page v1: structure and draft copy

Visual reference: the design canvas (link in BRAND.md). All copy below is a **draft for Kelly to approve**. Keep the brand name, tagline, handle and addresses in `src/config/site.ts`.

1. **Header**: `heart.png` + `little-jots-of-joy-wordmark.png` side by side, linking to `/`. Nav: Cards · Find us · Contact. Wraps on small screens.
2. **Hero**: H1 (Fraunces 600, `--font-size-xl`): tagline from `site.tagline` (approved 2026-11-18: "Kid-drawn cards for life's little moments."). Lead: "Real drawings by our kids, printed on premium card with an envelope. Made to be sent, kept and pinned to the fridge." Buttons: "Find us at a market" (Sunshine background, Forest text) → `#find-us`; "See the cards" (Forest outline) → `#cards`. Two card images.
3. **Story** (`--color-surface` background), centred, heart above. H2 "It started at our kitchen table." Body: "We sit together and doodle little things. Some of those doodles were too good to keep to ourselves, so we turned them into cards. Every design starts as a real drawing, and every card is a small way to share a happy moment with someone else."
4. **Cards** (`#cards`): `art-cards-by-hadley-lockup.png` as the section header, a one-line intro, then a grid of 4–6 card images (`repeat(auto-fit, minmax(170px, 1fr))`). No card titles. Alt text describes the artwork only, for example "Card with a crayon drawing of a yellow sun over a red house". Nothing identifying.
5. **Find us** (`#find-us`, Sage `--color-surface` background, Paper cards with a 4px Teal top border; changed from a Teal band on 2026-11-19 because stacked Teal/Sunshine/Forest bands felt disjointed): Sunday, November 22, 2026 · [MARKET NAME] · [VENUE] · [HOURS]. Second market: Wednesday, December 2, 2026 · [VENUE] · [HOURS]. Publishing market details is approved by Brion (2026-11-18, action 51). Venue wording waits on a CLAUDE.md rule 4 update; never say which family member will be at the table. Forest text on Sage; Teal Deep for the date label inside the Paper cards.
6. **Join the list**: Paper background (no Sunshine panel, 2026-11-19); Forest button. "Our mailing list is coming soon. For now, follow along on Instagram for new cards and market dates." Link styled as a button: "Follow @littlejotsofjoy" → Instagram. No form and no data collection in v1.
7. **Footer** (`#contact`, `--color-footer-bg`): reversed logo or reversed wordmark + heart, "A family stationery business." (adding "in Ontario" on the website is **pending a decision**; it's approved for card backs only), hello@ and wholesale@ addresses, link to `/privacy`, "© 2026 Little Jots of Joy. Art and designs all rights reserved." (brand name from `site.ts`).

## Inputs still to come

- 4–6 card images: RGB PNG/JPG exports from Canva, at least 1600 px on the long side.
- Kelly's approval of the story copy.
- Market 1 name, venue and hours; market 2 venue wording (after the rule 4 update).

## Known limitations

- The master logo and heart are raster (2000 px source). That's fine at web sizes. A vector rebuild will replace them later under the same file names.
- `og-image.png` contains the proposed tagline as pixels. Regenerate it if the tagline changes.
- Fonts are the Latin subset only (U+0000–00FF and common punctuation): English and French accented characters are covered.
