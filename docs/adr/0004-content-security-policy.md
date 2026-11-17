# 0004. Content-Security-Policy

- Status: Accepted
- Date: 2026-11-16

## Context

We have promised no third-party requests, no trackers and no inline code. A strict Content-Security-Policy makes the browser enforce that promise, and limits the damage if anything malicious ever reaches the page.

## Decision

Serve this policy on every path from `public/_headers`:

```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; manifest-src 'self'; upgrade-insecure-requests
```

alongside HSTS (one year, include subdomains, no preload yet), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`, as listed in the brief.

- No inline scripts or styles, so no `'unsafe-inline'`, hashes or nonces. Astro's build output must be configured and checked so that it does not inline CSS or scripts.
- Fonts are self-hosted.

## Consequences

- Any new external origin (for example an email sign-up provider in `form-action`) needs a new ADR that names the exact origin.
- Some Astro features or third-party components may be unusable without loosening the policy; that cost is accepted.
- HSTS preload waits until the site has run for a few weeks without issues and every subdomain is confirmed HTTPS.
