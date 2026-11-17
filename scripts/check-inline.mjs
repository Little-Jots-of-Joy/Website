// Fails if any built HTML page contains inline code the CSP would block (ADR 0004).
// Run after `astro build`. No dependencies.

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';

const rules = [
  // <script> without src. JSON-LD data blocks are allowed: browsers don't execute them.
  {
    name: 'inline <script>',
    test: (html) =>
      [...html.matchAll(/<script\b([^>]*)>/gi)].filter(
        ([, attrs]) =>
          !/\bsrc\s*=/i.test(attrs) && !/type\s*=\s*["']?application\/ld\+json/i.test(attrs),
      ).length,
  },
  { name: '<style> element', test: (html) => (html.match(/<style\b/gi) ?? []).length },
  { name: 'style="" attribute', test: (html) => (html.match(/\sstyle\s*=/gi) ?? []).length },
  { name: 'on*="" event handler', test: (html) => (html.match(/\son[a-z]+\s*=/gi) ?? []).length },
  { name: 'javascript: URL', test: (html) => (html.match(/javascript:/gi) ?? []).length },
];

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

let failures = 0;
let checked = 0;
for await (const file of htmlFiles(DIST)) {
  checked++;
  const html = await readFile(file, 'utf8');
  for (const rule of rules) {
    const count = rule.test(html);
    if (count > 0) {
      console.error(`✗ ${file}: ${count} × ${rule.name}`);
      failures++;
    }
  }
}

if (checked === 0) {
  console.error(`✗ No HTML found in ${DIST}/. Run the build first.`);
  process.exit(1);
}
if (failures > 0) {
  console.error(
    `\nInline code found. The CSP forbids it: see docs/adr/0004-content-security-policy.md`,
  );
  process.exit(1);
}
console.log(`✓ No inline code in ${checked} HTML file(s)`);
