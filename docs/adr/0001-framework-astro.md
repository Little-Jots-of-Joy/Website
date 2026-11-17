# 0001. Framework: Astro, static output

- Status: Accepted
- Date: 2026-11-16

## Context

We need a brand site live within days that stays simple to maintain, ships little or no JavaScript, and can later grow into hosted checkout, a Shopify storefront or server endpoints without a rebuild. The owner is technical but not a developer, so mainstream tools with good documentation and regular security releases matter.

## Decision

Use Astro with static output, TypeScript in strict mode and plain CSS. pnpm is the package manager with the lockfile committed. Node.js is pinned to the current LTS release.

Alternative considered: Hugo. It is a single binary with no npm dependencies, so it has the smallest supply-chain surface. Rejected for now because Astro's route to commerce and backend integrations is shorter.

## Consequences

- Zero client-side JavaScript by default; interactive pieces can be added per component when needed.
- We take on npm dependencies. Mitigations: a strict dependency budget, Dependabot, dependency scanning in CI, and pnpm settings in `pnpm-workspace.yaml`:
  - dependency build scripts blocked unless listed in `allowBuilds` (pnpm default, kept strict)
  - `minimumReleaseAge` of 7 days, so freshly published (and possibly malicious) versions are not installed. Trade-off: urgent fixes wait too, unless the package is added to `minimumReleaseAgeExclude` in the same pull request with a reason
  - `trustPolicy: no-downgrade`, which fails the install if a package's publishing trust level drops
- Revisit Hugo if dependency maintenance becomes a burden.
