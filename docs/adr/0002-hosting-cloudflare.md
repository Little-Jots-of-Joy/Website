# 0002. Hosting: Cloudflare Workers (static assets)

- Status: Accepted
- Date: 2026-11-16 (amended 2026-11-17: Workers instead of Pages)

## Context

The site must send strict security headers (CSP, HSTS and others), serve over HTTPS on a custom domain, and cost nothing at our scale. GitHub Pages cannot set custom headers. We also want DNS with one-click DNSSEC and CAA records.

The brief originally named Cloudflare Pages, with an instruction to check whether Cloudflare now recommends Workers static assets. On 2026-11-17 the Cloudflare Pages documentation said: "Start new projects with Workers", noting that "Workers supports most Pages use cases and offers a broader feature set". Cloudflare's migration guide confirms that `_headers` and `_redirects` files are supported natively in Workers with static assets, and that static asset requests are free.

## Decision

Host on **Cloudflare Workers with static assets**, Free plan. Astro builds to `dist/`; Workers serves it, including `public/_headers` (ADR 0004). Deploy through Cloudflare's Git integration (Workers Builds) scoped to this repository only, so no long-lived deploy token is stored in GitHub.

DNS for both domains is hosted on Cloudflare (moved 2026-11-17; registrar stays Namecheap). `littlejotsofjoy.com` redirects to `littlejotsofjoy.ca` with a Cloudflare redirect rule (301, path and query kept).

## Consequences

- Global CDN, free TLS and custom headers with no servers to run.
- Deployment history gives rollback.
- The project needs a Workers configuration file (`wrangler.jsonc` or similar) in the repository. Whether the `wrangler` CLI must also be added as a dev dependency, and exactly how Workers Builds authenticates to GitHub, will be checked against Cloudflare's documentation when the project is created. A new dependency needs approval.
- If Pages is ever preferred, the same `dist/` output and `_headers` file work there, so switching is cheap.
- Cloudflare is a service provider that processes visitor IP addresses; this is recorded in the data inventory and must be disclosed on `/privacy`.
