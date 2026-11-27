# Personal data inventory (website)

Every flow of personal information connected to the website. Update this file in the same pull request as any change to what is collected, where it goes or how long it is kept, and update the `/privacy` page to match (CLAUDE.md rule 6).

This is the website slice of the organization-wide **LJoJ Data Inventory** and **LJoJ Data Retention Policy and Schedule** (Google Drive, approved retention periods 2026-11-18). If they disagree, fix both.

- Accountable person: the designated privacy officer (named in the LJoJ Privacy Policy in Drive; identity given on request, PIPEDA Schedule 1, 4.1.2)
- Privacy contact: privacy@littlejotsofjoy.ca
- Last reviewed: 2026-11-26

## What the website does not do (v1)

- No forms, accounts or sign-ups
- No cookies, local storage or similar (verified on the live site 2026-11-17)
- No analytics scripts, tracking pixels or third-party embeds
- No third-party fonts, scripts or CDNs: every file is served from our own domain
- No request-level visitor logs: Workers Logs are off (`observability.enabled: false` in `wrangler.jsonc`)

## Flows

| # | Source | Data | Purpose | Processor | Location | Retention | Basis |
|---|---|---|---|---|---|---|---|
| 1 | Every website visit | IP address, browser user agent, requested URL, time, referring page | Deliver the site and protect it from abuse | Cloudflare (processor) | Mainly US and EEA (Cloudflare privacy policy) | **We keep none.** Cloudflare retains per its own business purposes (no published period). Aggregate traffic statistics in the dashboard: at least 31 days (Cloudflare analytics docs) | Necessary to provide the service; disclosed on `/privacy` |
| 2 | Visitor emails a public address shown on the site (hello@, support@, orders@, wholesale@, privacy@, security@) | Name, email address, message content, anything the sender includes | Reply to the enquiry | Google Workspace (Business Starter) | Google data centres, may be outside Canada | Enquiries: **24 months** after the last message, unless part of an order record. Privacy requests: until resolved and recourse exhausted (PIPEDA s. 8(8)), then 24 months. Security reports: 24 months after closure | Implied consent by writing to us, limited to answering the enquiry |

### Staff and reviewers (not website visitors)

Not shown on `/privacy`, because it does not affect public visitors.

| # | Source | Data | Purpose | Processor | Location | Retention | Basis |
|---|---|---|---|---|---|---|---|
| S1 | A reviewer opens a branch preview (ADR 0006) | Reviewer's work email, IP address, sign-in time and result; `CF_Authorization` cookie on preview hostnames only | Limit unreleased drafts to approved reviewers | Cloudflare Access (Zero Trust) | Cloudflare (as flow 1) | Cloudflare's Access log retention (not set by us; check the Zero Trust plan) | Internal security control; the two reviewers are the business owners |

Deletion on Business Starter (no Vault) is manual: the annual retention purge every 15 January (calendar reminder; steps in the LJoJ Compliance Implementation Runbook).

## Planned (not live)

| Flow | Phase | Notes |
|---|---|---|
| Email list sign-up | 2 | CASL express consent, double opt-in, consent records. Provider not chosen. Needs its own row, a CSP ADR for `form-action`, a retention rule for consent records, and a `/privacy` update. |
| Square hosted checkout links | 2 | Square collects payment and contact data on its own pages. We receive order details. Needs its own row. |

## Open items

- Have the privacy page and this inventory reviewed by a lawyer when budget allows (brief section 7).
