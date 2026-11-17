# Website

Source for the Little Jots of Joy website: a static brand site built with [Astro](https://astro.build) and hosted on Cloudflare.

## Status

Phase 0 (foundations). The site scaffold, local checks and CI arrive in the next pull requests.

## Key documents

| Document | Purpose |
|---|---|
| [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md) | Goals, decisions, phases and requirements |
| [`CLAUDE.md`](CLAUDE.md) | Working rules for contributors, human and AI |
| [`docs/adr/`](docs/adr/) | Architecture decision records |
| [`docs/privacy/data-inventory.md`](docs/privacy/data-inventory.md) | Every flow of personal information |
| [`SECURITY.md`](SECURITY.md) | How to report a vulnerability |

## Licensing

- **Code:** MIT. See [`LICENSE`](LICENSE).
- **Artwork, brand assets, photos and copy:** all rights reserved. See [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md).

## Local setup (macOS)

```sh
brew install node@26 pnpm lefthook gitleaks exiftool lychee
pnpm install       # install dependencies from the lockfile
lefthook install   # turn on the pre-commit checks (secrets, formatting, image metadata)
pnpm dev           # preview at http://localhost:4321
```

## Checks

`pnpm check` runs the full local suite: type check, formatting, build, HTML validation, inline-code check (CSP) and image metadata check. Run it before opening a pull request. `pnpm format` fixes formatting. Markdown files are not auto-formatted, so they can be edited on github.com.

To strip metadata from an image before adding it: `exiftool -all= -overwrite_original <file>`.

## Contributing

Feature branch, pull request into `main`, checks must pass, Conventional Commits. See `CLAUDE.md` for the hard rules, especially on privacy, third-party requests and the Content-Security-Policy.
