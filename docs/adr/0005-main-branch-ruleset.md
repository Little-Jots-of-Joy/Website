# 0005. `main` branch ruleset without required approvals

- Status: Accepted
- Date: 2026-11-16

## Context

Every change reaches `main` through a pull request that Brion reviews and merges. Pull requests prepared with Claude Code are opened under Brion's own GitHub account, and GitHub does not let an author approve their own pull request. Requiring an approval would block every merge.

## Decision

The ruleset on `main` requires:

- a pull request (no direct pushes)
- all required status checks to pass
- no force pushes and no branch deletion

It does **not** require an approving review for now.

## Consequences

- Automated checks are the hard gate. Brion's review is a process control, not a technical one.
- Revisit when Kelly or another person can act as a second reviewer, or if pull requests come from a separate bot account.
