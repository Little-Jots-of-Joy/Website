# CLAUDE.md: Little Jots of Joy website

Read `docs/PROJECT_BRIEF.md` before starting any task. It holds the goals, decisions, phases and requirements. This file holds the working rules.

## Who you're working with

- **Brion**: technical owner and reviewer. A CISO, technical but not a developer. Explain trade-offs plainly, state your confidence, and flag anything you're unsure of instead of guessing.
- **Kelly**: CEO and brand owner. Brand, copy and visual decisions are hers.

## Hard rules

1. **No third-party requests.** Do not add external scripts, fonts, analytics, embeds, CDNs or tracking pixels without explicit approval and an ADR in `docs/adr/`.
2. **No new dependencies without approval.** Propose the package, why it's needed, its maintenance health and its alternatives. Prefer no dependency.
3. **No secrets in the repo.** No API keys, tokens or credentials in code, config, commits or logs.
4. **Child privacy.** No children's faces, surnames, ages, school, neighbourhood or location anywhere: images, copy, alt text, file names, commit messages, metadata. First name only, inside the approved sub-brand name. Every image must have EXIF/GPS metadata stripped.
5. **Art is not open source.** Only web-resolution exports go in the repo. Never commit print files or original scans. Artwork and brand assets are all rights reserved.
6. **Privacy changes travel together.** Any change to what personal data is collected, where it goes or how long it's kept must update `docs/privacy/data-inventory.md` and the `/privacy` page in the same pull request.
7. **CSP is a contract.** Keep the Content-Security-Policy in `public/_headers` strict. No inline scripts or styles. Loosening it needs an ADR.
8. **Brand name lives in one place**: `src/config/site.ts`. Never hard-code the brand name, domain or contact addresses elsewhere (a rename may be needed).

## How to work

- Small, shippable pull requests from feature branches into `main`. Conventional Commits. Brion merges.
- Before opening a pull request, run the full local check suite and confirm it passes.
- Record significant decisions as ADRs (context, decision, consequences). Keep them short.
- When a requirement is legal (PIPEDA, CASL, accessibility), say what you're relying on and how confident you are. Do not present legal conclusions as certain.
- Verify current versions, defaults and platform behaviour (Astro, pnpm, Cloudflare, GitHub) from official documentation instead of relying on memory.
- If a task conflicts with these rules or the brief, stop and ask.

## Copy and tone

Warm, simple, playful, honest. Short sentences, Canadian spelling. No hype words, no emoji in page copy. Draft copy is a proposal for Kelly to approve.
