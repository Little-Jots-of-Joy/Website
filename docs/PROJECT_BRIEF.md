# Little Jots of Joy: Website Project Brief

Version 1.0 · 2026-11-16 · Owner: Brion (tech) · Business owner: Kelly (CEO)

## 1. Purpose

Build the web presence for **Little Jots of Joy**, a Toronto family stationery business turning children's artwork into premium cards and paper goods. The first product line is **Art Cards by Hadley** (sub-brand naming still being confirmed).

The site starts as a single static brand page and grows in small, safe increments. Privacy and security are foundations, not features.

**First deadline:** v1 live by **Wednesday 2026-11-18**, ahead of the first kid maker market on **Saturday 2026-11-21**. A second market follows about two weeks later.

## 2. Non-negotiables

1. **Privacy by design.** Collect the minimum. No trackers, no third-party scripts, no cookies in v1. Every data flow is documented and disclosed.
2. **Security by default.** Strict security headers, HTTPS only, no secrets in the repo, automated vulnerability detection and patching.
3. **Compliance.** PIPEDA (federal private-sector privacy law) and CASL (anti-spam law) from day one. Accessibility target WCAG 2.2 AA.
4. **Maintainability.** Small dependency footprint, mainstream tools, automated updates, every decision recorded.
5. **Built to extend.** Static today; ready for hosted checkout, a Shopify store, or backend services later without a rebuild.
6. **Iterative and incremental.** Small pull requests, each one shippable.
7. **Child privacy.** The children are not the face of the brand. See section 7.

## 3. Brand context

- **Master brand:** Little Jots of Joy. Sub-brands per product line, each a section of the one site (for example `/hadley`), not separate domains.
- **Story:** families sitting together, doodling, and turning those moments into things that bring joy to others.
- **Tone:** warm, simple, playful, honest. Short sentences. No hype.
- **Visual identity:** **TBD** (logo and colours pending from Kelly). Build with design tokens (CSS custom properties) so the palette and type swap in one place.
- **Name risk:** a trademark opinion is pending on the name. Keep the brand name, tagline, domain and contact addresses in **one config file** so a rename is a one-file change.

## 4. Decisions already made

| Area | Decision |
|---|---|
| Primary domain | `littlejotsofjoy.ca`; `littlejotsofjoy.com` redirects to it |
| Email | Google Workspace. Public addresses: hello@, support@, orders@, wholesale@, privacy@, security@ |
| Payments | Square for in-person and web. Web uses Square-hosted checkout links only. Shopify later, if the catalogue justifies it |
| Online sales v1 | None on the site. Holiday bundles via Square links may follow in phase 2 |
| Selling online | Bundles only, not single cards (fixed per-transaction fee makes single cards uneconomic) |

## 5. Technical approach

### Stack (recommended)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro**, static output | Ships zero JavaScript by default, simple to maintain, large community and regular security releases. Grows into interactive pieces, Shopify's Storefront API or server endpoints later without changing frameworks |
| Language | TypeScript (strict) + plain CSS | Types catch mistakes; no CSS framework dependency |
| Package manager | **pnpm**, lockfile committed | Strict dependency resolution. Verify whether the current version blocks dependency install scripts by default; if not, configure it to |
| Runtime | Current Node.js LTS, pinned in `.nvmrc` and `package.json` `engines` | Reproducible builds |
| Hosting | **Cloudflare Pages** (free plan) | Custom security headers via a `_headers` file, global CDN, free TLS. GitHub Pages cannot set headers. Check whether Cloudflare now recommends Workers static assets instead, and use whichever is current |
| DNS | Move DNS hosting to Cloudflare (registrar stays Namecheap) | One-click DNSSEC, CAA records, faster. **Recreate MX, SPF, DKIM and DMARC exactly before switching nameservers**, then verify |
| Images | Astro's built-in image pipeline (sharp) | Responsive WebP/AVIF; re-encoding strips metadata. Verify with a check |

**Alternative considered:** Hugo (single binary, no npm dependencies, smallest supply-chain surface). Rejected for now because Astro's route to commerce and backend integrations is shorter. Revisit if dependency maintenance becomes a burden.

**Dependency budget:** Astro plus essentials only. Every new dependency needs a short justification in the pull request and an ADR (see section 10) if it adds runtime behaviour.

### Repository

- GitHub **organization** `Little-Jots-of-Joy` (free plan). Owners: Brion and Kelly (two owners for continuity). Require 2FA for all members. Organization billing/contact email: ap@littlejotsofjoy.ca.
- Repository `Website`. **Recommended public:** public repositories get GitHub code scanning, secret scanning, push protection and dependency review free. A static brand site holds no secrets. Art is visible on the live site regardless.
- Licensing: code under MIT (`LICENSE`); **all artwork, brand assets and copy are © Little Jots of Joy, all rights reserved** (`CONTENT-LICENSE.md`, referenced from the README).
- Never commit print-ready files, original scans or full-resolution art. Web-resolution exports only.

### Proposed structure

```
/
├── CLAUDE.md
├── README.md
├── LICENSE                     # code (MIT)
├── CONTENT-LICENSE.md          # art, brand, copy: all rights reserved
├── SECURITY.md                 # how to report vulnerabilities
├── .nvmrc
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── adr/                    # architecture decision records
│   ├── privacy/
│   │   └── data-inventory.md   # every personal-data flow
│   └── runbooks/               # deploy, rollback, incident, dependency updates
├── public/
│   ├── _headers                # security headers
│   ├── _redirects
│   ├── robots.txt
│   └── .well-known/security.txt
├── src/
│   ├── config/site.ts          # brand name, tagline, domain, contacts, socials
│   ├── content/
│   │   ├── products/           # one entry per product (schema-validated)
│   │   ├── lines/              # sub-brands (e.g. hadley)
│   │   └── events/             # markets and dates
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── privacy.astro
│   │   └── 404.astro
│   └── styles/tokens.css       # colours, type, spacing
└── .github/
    ├── dependabot.yml
    ├── CODEOWNERS
    └── workflows/
```

### Product data model (prepared now, used from phase 2)

Each product entry: `id`, `name`, `line` (sub-brand), `type` (single, bundle), `images[]` (with alt text), `price`, `status` (draft, available, sold-out, retired), `buyUrl` (Square checkout link today; Shopify later), `season` tags. Pages read from this data, so switching checkout provider means changing `buyUrl` values, not templates.

### Path to growth (not built now)

- **Commerce:** Square checkout links → Shopify (separate `shop.` subdomain, or headless via Storefront API).
- **Backend services:** independent deployables behind `api.littlejotsofjoy.ca` (for example Cloudflare Workers or containers), each in its own repository with its own data inventory entry. Do not add a backend until a feature needs one.
- **Mail club:** subscription billing will likely need a dedicated platform; evaluate when scoped.

## 6. Security baseline

### HTTP headers (`public/_headers`)

Starting policy; tighten or loosen only through an ADR:

```
/*
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; manifest-src 'self'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
```

- No inline scripts or styles. Check Astro's build output for inlined CSS and configure it so the CSP holds.
- When the email sign-up form is added, add only the provider's exact origin to `form-action`.
- HSTS preload: only after a few weeks without issues, and only after confirming every subdomain is HTTPS.

### Other controls

- `/.well-known/security.txt` (RFC 9116): `Contact: mailto:security@littlejotsofjoy.ca`, `Expires` (one year, calendar reminder to renew), `Preferred-Languages: en`, `Canonical`.
- DNS: DNSSEC on; CAA records limited to the certificate authorities Cloudflare actually uses (verify the current list before setting).
- GitHub: rulesets on `main` (pull request required, status checks must pass, no force pushes, no deletions); Dependabot alerts and security updates; CodeQL; secret scanning and push protection; actions pinned to commit SHAs; `GITHUB_TOKEN` least-privilege permissions per workflow.
- Deployment via Cloudflare's Git integration scoped to this one repository, so no long-lived deploy token is stored in GitHub. If a token is ever needed, scope it to Pages edit for this project only.
- Targets: Mozilla HTTP Observatory A+ (or its current equivalent), internet.nl website and email tests passing, zero third-party requests on page load.

## 7. Privacy (PIPEDA)

PIPEDA's ten fair information principles apply regardless of business size: accountability, identifying purposes, consent, limiting collection, limiting use/disclosure/retention, accuracy, safeguards, openness, individual access, challenging compliance.

### What the site does

- **v1 collects nothing directly.** No forms posting to our own servers, no cookies, no analytics scripts, no embedded third-party content (link to Instagram; do not embed it).
- Use Cloudflare's server-side traffic analytics only (no script). If script-based analytics is ever added, it must be cookieless, disclosed, and approved through an ADR.
- Self-host all fonts.

### Required artefacts

- **`/privacy` page** in plain language covering: who we are and the privacy contact (privacy@littlejotsofjoy.ca, accountable person: Kelly); what we collect and why; service providers and that some store data outside Canada (Google, Square, email platform, Cloudflare); retention; how to access, correct or withdraw consent; how to complain, including the right to contact the Office of the Privacy Commissioner of Canada; last-updated date.
- **`docs/privacy/data-inventory.md`**: every flow of personal information (source, data, purpose, processor, location, retention, legal basis). Update it in the same pull request as any change to data handling.
- **Breach runbook** (`docs/runbooks/privacy-breach.md`): how to assess "real risk of significant harm", report to the OPC and notify people, and keep a record of every breach. Verify the current record-retention period with OPC guidance.
- Have the privacy policy reviewed by a lawyer when the trademark opinion is sought, if budget allows.

### Child privacy rules (strict)

- No children's faces, surnames, ages, school, neighbourhood or location in any image, copy, file name, alt text, commit message or metadata.
- First name only, and only within the approved sub-brand name.
- Strip all EXIF/GPS metadata from every image; add an automated check that fails the build if metadata is present.
- Process photos are hands and artwork only.
- The site is aimed at adults. Sign-up forms state they are for adults; do not knowingly collect information from children.

## 8. Email marketing (CASL)

The email list is a phase 2 feature, but its requirements shape v1.

- **Express consent only.** Unchecked consent box, plain statement of what they'll receive, who is asking (Little Jots of Joy with contact details), and that they can unsubscribe at any time. Do not rely on implied consent from market purchases.
- **Double opt-in** (confirmation email) recommended for proof of consent and list quality.
- **Keep consent records**: date and time, form and wording version, source (website, market QR code). The sender carries the burden of proof.
- **Every commercial email includes**: sender name, a valid mailing address, and a working contact method (email or web); a clear, free, one-click unsubscribe that keeps working for at least 60 days and is honoured within 10 business days (aim for immediately).
- **Mailing address decision pending:** do not publish the family home address. Use a commercial mailbox with a street address. Sources disagree on whether a plain PO box is sufficient, so confirm before relying on one.
- **Market sign-ups:** QR code to the online form, not a paper sheet, so consent is captured and recorded consistently.

**Email platform requirements** (decision pending): hosted double opt-in form or a form that posts directly to the provider; CASL footer fields; consent record export; one-click unsubscribe; data processing terms; Canadian data hosting a plus; API for later; free tier for a small list. Shortlist to evaluate: Canadian providers (Cyberimpact, Cakemail) and general ones (Buttondown, MailerLite, Brevo).

## 9. Quality and accessibility

- WCAG 2.2 AA target: semantic HTML, keyboard navigation, visible focus, colour contrast, meaningful alt text for every artwork, reduced-motion support. (Ontario's AODA website rules may not legally apply to a business this size; follow them anyway.)
- Performance budget: Lighthouse 95+ in all categories on mobile; page weight under 1 MB for the home page.
- SEO basics: titles, descriptions, Open Graph image, sitemap, canonical URLs, structured data for the organization.

## 10. Engineering workflow

- **Branching:** short-lived feature branches, pull requests into `main`, squash merge. Brion reviews and merges.
- **Commits:** Conventional Commits.
- **ADRs:** one short markdown file per significant decision in `docs/adr/` (context, decision, consequences). First ADRs: framework, hosting, repository visibility, CSP.
- **CI on every pull request:** build, type check, format check, HTML validation, link check, accessibility scan, Lighthouse budgets, dependency vulnerability scan, secret scan, image metadata check.
- **Patching:** Dependabot security updates merged within 48 hours for critical/high, weekly grouped version updates otherwise. Monthly 15-minute maintenance check (runbook).
- **Rollback:** Cloudflare deployment history; document the one-click rollback in `docs/runbooks/deploy.md`.

### Free and open-source tooling

| Purpose | Tool |
|---|---|
| Code hosting, CI, security | GitHub (organization, Actions, rulesets, Dependabot, CodeQL, secret scanning, push protection, dependency review) |
| Supply-chain posture | OpenSSF Scorecard action; OSV-Scanner |
| Local secret checks | gitleaks (pre-commit) |
| Git hooks | lefthook (single binary) |
| Formatting and checks | Prettier; `astro check` |
| HTML validation | html-validate |
| Link checking | lychee |
| Accessibility | pa11y-ci (axe-core) |
| Performance budgets | Lighthouse CI |
| Image metadata | exiftool (verification in CI) |
| External verification | Mozilla HTTP Observatory, internet.nl, SSL Labs |
| Secrets and credentials | 1Password (already in use) |

## 11. Phased plan

### Phase 0: Foundations (Tue 2026-11-17)
- [ ] GitHub organization, 2FA enforced, second owner added
- [ ] Repository created with licences, SECURITY.md, CLAUDE.md, this brief, rulesets
- [ ] Astro scaffold, pnpm, Node pinned, design tokens, site config
- [ ] CI pipeline (section 10) green on an empty page
- [ ] Cloudflare account (owner: account@), Pages project connected
- [ ] DNS moved to Cloudflare with email records recreated and verified; DNSSEC on

### Phase 1: v1 brand page (live by Wed 2026-11-18)
- [ ] Home page: wordmark, tagline, two to three sentence story, Art Cards by Hadley preview (4 to 6 card images), "Find us" with market dates, Instagram link, contact (hello@)
- [ ] "Join the list" call to action: link to hosted sign-up page if the platform is chosen; otherwise a "coming soon, follow us on Instagram" placeholder (no data collection)
- [ ] `/privacy`, `404`, `security.txt`, `robots.txt`, sitemap, favicon, Open Graph image
- [ ] Security headers live and verified (Observatory A+)
- [ ] Accessibility and Lighthouse targets met
- [ ] QR code for the market table pointing to the home page (or a `/join` page)

### Phase 2: After market 1 (before market 2)
- Product gallery from the products data
- Holiday bundles with Square checkout links
- Email platform live with double opt-in and CASL-compliant form
- About page and market/events page

### Phase 3: Later
- Mail club, wholesale page, Shopify evaluation, privacy policy legal review, HSTS preload

## 12. Inputs needed

| Input | From | Needed by |
|---|---|---|
| Logo or wordmark, two to three colours, font preference | Kelly | Phase 1 |
| 4 to 6 card images, exported as RGB PNG/JPG from Canva (not print PDFs) | Kelly | Phase 1 |
| Two to three sentence brand story | Kelly | Phase 1 |
| Sub-brand naming decision | Kelly | Phase 1 |
| Market 1 venue and hours; market 2 date | Kelly | Phase 1 |
| Email platform choice | Brion and Kelly | Phase 2 |
| Mailing address solution for CASL | Brion and Kelly | Phase 2 |

## 13. Definition of done (every pull request)

- CI green; no new high or critical vulnerabilities
- No new third-party requests unless approved via ADR
- Data inventory and privacy page updated if data handling changed
- Images checked for metadata and child-privacy rules
- Accessible (keyboard, contrast, alt text)
- Docs and ADRs updated where relevant
