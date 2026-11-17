/**
 * The single source of truth for brand name, domain and contact details.
 * A rename should only need changes in this file. See CLAUDE.md rule 8.
 */

const domain = 'littlejotsofjoy.ca';

export const site = {
  name: 'Little Jots of Joy',
  /** Placeholder until Kelly approves a tagline. */
  tagline: 'Coming soon',
  /** Placeholder until Kelly approves copy. No location: see child privacy rules. */
  description: 'Cards and paper goods made from children’s artwork.',
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
  },
  /** security.txt must expire within a year. Renew before this date (calendar reminder). */
  securityTxtExpires: '2027-11-16T00:00:00.000Z',
} as const;
