# Runbook: deploy and rollback

How the site gets to production, how to check it, and how to undo a bad deploy.

## How deploys work

1. A pull request is merged into `main` (the ruleset requires passing checks first).
2. Cloudflare Workers Builds sees the new commit, runs `pnpm run build`, then `pnpm exec wrangler deploy`.
3. The new version goes live at https://littlejotsofjoy.ca within a minute or two.

Nothing else deploys. There is no deploy token in GitHub: Cloudflare's GitHub app reads this one repository, and Workers Builds holds its own Cloudflare API token internally.

## Check a deploy

1. Cloudflare dashboard → **Workers & Pages** → **website** → **Deployments** (or **Builds**): the newest build shows success.
2. Open https://littlejotsofjoy.ca and confirm the change.
3. Spot-check headers and cookies from a terminal:

   ```sh
   curl -sI https://littlejotsofjoy.ca/ | grep -iE 'content-security|strict-transport|set-cookie'
   ```

   Expect the CSP and HSTS lines and **no** `set-cookie` line.

4. After changes to headers or layout, re-run [Mozilla HTTP Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=littlejotsofjoy.ca). Target: A+.

## Roll back

Use this when a deploy breaks the site or publishes something it shouldn't.

1. Cloudflare dashboard → **Workers & Pages** → **website** → **Deployments**.
2. Find the last good version, select the **⋯** menu → **Rollback**.
3. Confirm the site, then fix the problem in a new pull request. The next merge to `main` deploys over the rollback, so don't merge anything else until the fix is ready.

Notes:

- Rollback works for the 100 most recent versions.
- Pages already open in a visitor's browser may still ask for the newer version's files. For this static site that only risks a missing stylesheet until refresh.
- **If something must disappear immediately** (for example, an image that breaks the child privacy rules): roll back first, then **Caching → Configuration → Purge Everything** in the `littlejotsofjoy.ca` zone, then fix and remove the file from the repository history if it was committed (ask for help: rewriting history on a protected branch needs the ruleset paused).

## When a build fails

Open the failed build's log in the dashboard. Common causes:

| Log says | Cause | Fix |
|---|---|---|
| `supply-chain policies` / `minimumReleaseAge` | A dependency version is under 7 days old | See `dependency-updates.md` |
| `ERR_PNPM_OUTDATED_LOCKFILE` / frozen lockfile | `package.json` changed without the lockfile | Run `pnpm install` locally, commit `pnpm-lock.yaml` |
| `Unsupported engine` / Node errors | Node version mismatch | Check `.nvmrc` (Node 26) and `engines` |
| `ignored build scripts` / `strictDepBuilds` | A new dependency wants an install script | Review it; record `true` or `false` in `allowBuilds` (needs approval) |

The previous version stays live while a build fails, so a failed build never takes the site down.

## Configuration reference

Recorded so the setup can be rebuilt or audited. Change these only with a pull request that updates this table.

| Where | Setting | Value |
|---|---|---|
| Worker → Settings → Builds | Production branch | `main` |
| | Build command | `pnpm run build` |
| | Deploy command | `pnpm exec wrangler deploy` |
| | Build variable | `WRANGLER_SEND_METRICS=false` |
| | Preview builds | On, newer Previews model (ADR 0006). Every push to a non-`main` branch builds a preview |
| Worker → Access | Protect this Worker behind Access | **Previews only**. Policy: allow two named Workspace users (Brion, Kelly) by exact email. Must be on whenever `preview_urls` is `true` |
| Worker → Settings → Domains & Routes | Custom domain | `littlejotsofjoy.ca` |
| | `workers.dev` | Off (`workers_dev: false`) |
| | Preview URLs | On (`preview_urls: true`), behind Access |
| GitHub → org settings → GitHub Apps | Cloudflare Workers and Pages | Only select repositories: `Website` |
| `littlejotsofjoy.ca` zone → SSL/TLS → Edge Certificates | Always Use HTTPS | On |
| | Minimum TLS version | 1.2 or higher |
| | Cloudflare HSTS | Off (HSTS is sent by `public/_headers`) |
| `littlejotsofjoy.ca` zone → Rules | Redirect `www` to apex | `http*://www.littlejotsofjoy.ca/*` → `https://littlejotsofjoy.ca/${2}`, 301 |
| `littlejotsofjoy.com` zone → Rules | Redirect `.com` to `.ca` | `http*://*littlejotsofjoy.com/*` → `https://littlejotsofjoy.ca/${3}`, 301 |

**Must stay off** (they inject scripts, add third-party requests or set cookies, which breaks the CSP and the privacy promises): Web Analytics automatic setup, Scrape Shield email obfuscation, Rocket Loader, Bot Fight Mode, Zaraz. If any of these is ever needed, it needs an ADR and a privacy update.

Builds settings, the repository code and `wrangler.jsonc` define the site. The Cloudflare dashboard settings above do not live in the repository, so check them during the monthly maintenance review (`dependency-updates.md`).
