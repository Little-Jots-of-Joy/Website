# Runbook: dependency updates

How updates arrive, how fast to act, and what to do when CI blocks an urgent fix.

## How updates arrive

| Type | Source | When | Target |
|---|---|---|---|
| Security fix | Dependabot security update, titled "Bump the **security** group" | As soon as an advisory is published | Merge within **48 hours** for critical/high (brief section 10) |
| Routine update | Dependabot version update | Mondays, grouped into one PR per ecosystem | Merge within the week |
| GitHub Actions update | Dependabot (github-actions) | Mondays, grouped | Merge within the week |

Brion gets an email for every new Dependabot alert (GitHub account notifications, and Watch → Custom → Security alerts on the repository). Security PRs are merged by hand: no auto-merge (decided 2026-11-26). The PR title says "security group"; GitHub also links the alert from the PR.

Routine updates wait 7 days after release (Dependabot `cooldown`), matching pnpm's `minimumReleaseAge`, so they should pass CI.

## Reviewing a Dependabot pull request

1. Check that CI is green.
2. Skim the release notes Dependabot links. Look for breaking changes or anything odd (new install scripts, new maintainers, a large size jump).
3. Squash and merge.

## When CI fails on a security fix: "supply-chain policies" error

**Why:** Dependabot's cooldown does not apply to security updates. If the fix is less than 7 days old, pnpm refuses to install it and CI fails. This is deliberate: a brand-new version gets a human look before it's trusted.

**What to do (about 5 minutes):**

1. Read the advisory and the fixed version's release notes. Confirm the package and publisher look legitimate.
2. On the Dependabot branch, add the package to `pnpm-workspace.yaml`:

   ```yaml
   minimumReleaseAgeExclude:
     - 'package-name@1.2.3' # CVE-YYYY-NNNN, remove after YYYY-MM-DD
   ```

3. Commit with a message like `build(deps): allow package-name@1.2.3 ahead of release-age policy`.
4. CI re-runs. When green, squash and merge.
5. After 7 days, remove the exclusion in a small follow-up PR.

If you're not comfortable approving the fresh version, waiting out the 7 days is also a valid choice. Record the decision in the PR.

## Monthly check (15 minutes)

- Security tab: no open Dependabot, code scanning or secret scanning alerts
- No Dependabot PRs older than a week
- Scorecard result has not dropped
- `security.txt` expiry is more than a month away (also in the calendar)
- Cloudflare dashboard settings still match the configuration reference in `deploy.md`, and the live site sets no cookies
