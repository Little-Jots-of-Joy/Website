# Personal data inventory

Every flow of personal information connected to the website. Update this file in the same pull request as any change to what is collected, where it goes or how long it is kept, and update the `/privacy` page to match.

- Accountable person: Kelly (CEO)
- Privacy contact: privacy@littlejotsofjoy.ca
- Last reviewed: 2026-11-16

## What the website does not do (v1)

- No forms, accounts or sign-ups
- No cookies, local storage or similar
- No analytics scripts, tracking pixels or third-party embeds
- No third-party fonts, scripts or CDNs: every file is served from our own domain

## Flows

| # | Source | Data | Purpose | Processor | Location | Retention | Basis |
|---|---|---|---|---|---|---|---|
| 1 | Every website visit | IP address, browser user agent, requested URL, time, referring page | Deliver the site, protect it from abuse, aggregate traffic statistics (Cloudflare server-side analytics, no script) | Cloudflare | Global network; Cloudflare is US-based | **TBD**: confirm from Cloudflare's current documentation for the plan in use | Necessary to provide the service; disclosed on `/privacy` |
| 2 | Visitor emails a public address shown on the site (hello@, support@, privacy@, security@ and others) | Name, email address, message content, anything the sender includes | Reply to the enquiry | Google (Workspace) | Google data centres, may be outside Canada | **TBD**: set a retention period and document it | Implied consent by writing to us, limited to answering the enquiry |

## Planned (not live)

| Flow | Phase | Notes |
|---|---|---|
| Email list sign-up | 2 | CASL express consent, double opt-in, consent records. Provider not chosen. Needs its own row, a CSP ADR for `form-action`, and a `/privacy` update. |
| Square hosted checkout links | 2 | Square collects payment and contact data on its own pages. We receive order details. Needs its own row. |

## Open items

- Confirm Cloudflare's log and analytics retention for our plan, and whether any data stays in Canada.
- Decide how long enquiry emails are kept, and how they are deleted.
- Have the privacy page and this inventory reviewed by a lawyer when budget allows (brief section 7).
