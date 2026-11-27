# 0006. Branch previews behind Cloudflare Access

- Status: Accepted
- Date: 2026-11-26

## Context

Kelly approves copy and visuals, and she needs to see changes before they go live. At launch, preview builds and preview URLs were turned off (action 47, PR #8), because Cloudflare preview URLs are public by default and would expose unreviewed drafts, which could include something that breaks the child privacy rules before review catches it.

Cloudflare now offers per-branch **Previews**: a stable URL per branch on `workers.dev`, built by Workers Builds on every push to a non-production branch. Cloudflare Access can protect a Worker's previews only ("Previews only"), leaving production untouched.

## Decision

- Turn on preview URLs (`preview_urls: true` in `wrangler.jsonc`). Keep `workers_dev: false`, so production stays on `littlejotsofjoy.ca` only.
- Use the newer Previews model for Workers Builds. Brion approved this on 2026-11-26, knowing that Cloudflare does not allow switching back to the older model.
- Protect previews with Cloudflare Access (Worker, **Previews only**). The policy allows two named Workspace users (Brion and Kelly) by exact email address, not the whole domain, so membership of Google Groups such as `hello@` never grants access. The addresses are kept in Cloudflare, not in this public repository.
- Access must be on **before** any deploy with `preview_urls: true`.

## Consequences

- Kelly can review a branch at a stable link before Brion merges.
- Production is unchanged: no Access, no cookies, same headers.
- Preview visitors (only the two reviewers) get a Cloudflare login page, a one-time PIN by email and Access cookies (`CF_AppSession`, `CF_Authorization`) on preview hostnames. Cloudflare logs their sign-ins. This is recorded in the data inventory as a staff flow. `/privacy` is unchanged because public visitors are not affected.
- To verify after switching on: unauthenticated requests to a preview are refused; previews send the same CSP and security headers; previews send `X-Robots-Tag: noindex`; branches from forks are not built.
- Adding a reviewer means changing the Access policy (and this ADR if the rule changes).
- If Access is ever turned off, set `preview_urls` back to `false` in the same change.
