/**
 * The single source of truth for brand name, domain and contact details.
 * A rename should only need changes in this file. See CLAUDE.md rule 8.
 */

const domain = 'littlejotsofjoy.ca';

export const site = {
  name: 'Little Jots of Joy',
  /** Approved 2026-11-18. Also baked into public/og-image.png: regenerate that if this changes. */
  tagline: 'Kid-drawn cards for life’s little moments.',
  /** Approved 2026-11-18. Search results and link previews. */
  description: 'Kid-drawn greeting cards from a family stationery business in Ontario.',
  domain,
  url: `https://${domain}`,
  locale: 'en-CA',
  repoUrl: 'https://github.com/Little-Jots-of-Joy/Website',
  email: {
    hello: `hello@${domain}`,
    support: `support@${domain}`,
    orders: `orders@${domain}`,
    wholesale: `wholesale@${domain}`,
    privacy: `privacy@${domain}`,
    security: `security@${domain}`,
  },
  social: {
    instagram: 'littlejotsofjoy',
    instagramUrl: 'https://www.instagram.com/littlejotsofjoy/',
  },
  /** security.txt must expire within a year. Renew before this date (calendar reminder). */
  securityTxtExpires: '2027-11-16T00:00:00.000Z',
} as const;
