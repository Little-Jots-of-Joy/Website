import type { APIRoute } from 'astro';
import { site } from '../config/site';

// Built from site.ts so the brand name stays in one place (CLAUDE.md rule 8).
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.name,
        short_name: site.name,
        start_url: '/',
        display: 'browser',
        theme_color: '#104032',
        background_color: '#fffbf3',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
