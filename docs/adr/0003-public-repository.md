# 0003. Public repository

- Status: Accepted
- Date: 2026-11-16

## Context

On GitHub's free plan, code scanning (CodeQL), secret scanning, push protection and dependency review are free for public repositories. A static brand site holds no secrets, and its artwork is visible on the live site anyway.

## Decision

Keep the `Little-Jots-of-Joy/Website` repository public. Code is MIT licensed; artwork, brand assets and copy are all rights reserved (`CONTENT-LICENSE.md`).

## Consequences

- Free security tooling, and the security posture is open to inspection.
- Anything committed is public, permanently. This raises the stakes on the hard rules: no secrets, no print files or original scans, and no child-identifying information in files, file names, metadata or commit messages.
- Secret scanning with push protection and a local gitleaks hook act as backstops.
- Copyright, not secrecy, protects the art. Web-resolution exports only.
