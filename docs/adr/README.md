# Architecture decision records

One short file per significant decision: context, decision, consequences. Number them in order and never reuse a number. To change a decision, write a new ADR that supersedes the old one and update the old one's status.

| ADR | Title | Status |
|---|---|---|
| [0001](0001-framework-astro.md) | Framework: Astro, static output | Accepted |
| [0002](0002-hosting-cloudflare.md) | Hosting: Cloudflare | Accepted (product to confirm) |
| [0003](0003-public-repository.md) | Public repository | Accepted |
| [0004](0004-content-security-policy.md) | Content-Security-Policy | Accepted |
| [0005](0005-main-branch-ruleset.md) | `main` branch ruleset without required approvals | Accepted |

## Template

```markdown
# NNNN. Title

- Status: Proposed | Accepted | Superseded by NNNN
- Date: YYYY-MM-DD

## Context
What problem or force makes this decision necessary?

## Decision
What we chose.

## Consequences
What gets easier, what gets harder, what we must watch.
```
