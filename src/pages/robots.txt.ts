import type { APIRoute } from 'astro';

// A Sitemap line (built from site.url) is added in Phase 1 when the sitemap exists.
export const GET: APIRoute = () =>
  new Response(['User-agent: *', 'Allow: /', ''].join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
