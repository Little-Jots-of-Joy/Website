import type { APIRoute } from 'astro';
import { site } from '../../config/site';

// RFC 9116. Renew `securityTxtExpires` in src/config/site.ts before it lapses.
export const GET: APIRoute = () => {
  const lines = [
    `Contact: mailto:${site.email.security}`,
    `Contact: ${site.repoUrl}/security/advisories/new`,
    `Expires: ${site.securityTxtExpires}`,
    'Preferred-Languages: en',
    `Canonical: ${site.url}/.well-known/security.txt`,
    `Policy: ${site.repoUrl}/security/policy`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
