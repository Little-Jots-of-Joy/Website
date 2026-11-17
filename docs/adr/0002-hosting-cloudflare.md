# 0002. Hosting: Cloudflare

- Status: Accepted (Cloudflare product to confirm)
- Date: 2026-11-16

## Context

The site must send strict security headers (CSP, HSTS and others), serve over HTTPS on a custom domain, and cost nothing at our scale. GitHub Pages cannot set custom headers. We also want DNS with one-click DNSSEC and CAA records.

## Decision

Host on Cloudflare's free plan, with security headers in `public/_headers`. Deploy through Cloudflare's Git integration scoped to this repository only, so no long-lived deploy token is stored in GitHub. Move DNS hosting to Cloudflare; the registrar stays Namecheap.

**Open point:** Cloudflare Pages was the original choice. Cloudflare may now recommend Workers static assets for new projects. This will be checked against Cloudflare's current documentation before the project is created, and this ADR amended with the result.

## Consequences

- Global CDN, free TLS and custom headers with no servers to run.
- Deployment history gives one-click rollback.
- Cloudflare becomes a service provider that processes visitor IP addresses; this is recorded in the data inventory and must be disclosed on `/privacy`.
- The DNS move carries email risk: MX, SPF, DKIM and DMARC records must be recreated and verified before nameservers switch.
