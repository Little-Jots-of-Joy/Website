// Fails if any image in the repository or the build output carries metadata
// that could identify a person or place: EXIF, GPS, XMP, IPTC, camera details,
// authors, comments. Child privacy rule: see CLAUDE.md rule 4.
//
// Requires exiftool (brew install exiftool; apt install libimage-exiftool-perl).
// Usage: node scripts/check-image-metadata.mjs [extra files or folders...]

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const RASTER = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
  '.tif',
  '.tiff',
  '.heic',
  '.heif',
]);

// Whole metadata blocks that should never survive in a web image.
const FORBIDDEN_GROUPS = new Set([
  'EXIF',
  'XMP',
  'IPTC',
  'MakerNotes',
  'Photoshop',
  'APP12',
  'FlashPix',
]);
// Individual tags that can hide in other blocks (PNG text chunks, JPEG comments, etc.).
const FORBIDDEN_TAG =
  /GPS|Comment|Author|Artist|Copyright|Creator|Owner|Description|Title|Keywords|Subject|Make$|Model$|Serial|Location|City|Country|DateTimeOriginal|CreateDate|Software/i;
// Groups describing the file itself, not its contents.
const IGNORED_GROUPS = new Set(['ExifTool', 'File', 'System', 'Composite']);

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
}

// Every tracked or new (not ignored) file in the repo, plus the build output and any CLI arguments.
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean)
  .filter(existsSync);
if (existsSync('dist')) walk('dist', files);
for (const arg of process.argv.slice(2)) {
  if (statSync(arg).isDirectory()) walk(arg, files);
  else files.push(arg);
}

const images = [...new Set(files)].filter((f) => RASTER.has(extname(f).toLowerCase()));
const svgs = [...new Set(files)].filter((f) => extname(f).toLowerCase() === '.svg');
const problems = [];

if (images.length > 0) {
  let report;
  try {
    report = JSON.parse(
      execFileSync('exiftool', ['-json', '-G0', '-a', '-q', ...images], {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      }),
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('✗ exiftool is not installed. Install it: brew install exiftool');
      process.exit(1);
    }
    throw err;
  }
  for (const entry of report) {
    const found = Object.keys(entry).filter((key) => {
      const [group, tag] = key.includes(':') ? key.split(':') : ['', key];
      if (key === 'File:Comment') return true; // JPEG comment block
      if (IGNORED_GROUPS.has(group)) return false;
      return FORBIDDEN_GROUPS.has(group) || FORBIDDEN_TAG.test(tag);
    });
    if (found.length > 0) problems.push(`${entry.SourceFile}: ${found.join(', ')}`);
  }
}

// SVGs are text: look for editor and RDF metadata blocks.
for (const file of svgs) {
  const svg = readFileSync(file, 'utf8');
  if (/<metadata|<rdf:|sodipodi:|inkscape:|xmlns:dc=/i.test(svg))
    problems.push(`${file}: SVG metadata block`);
}

if (problems.length > 0) {
  console.error(
    '✗ Image metadata found. Strip it before committing (for example: exiftool -all= -overwrite_original <file>).\n',
  );
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`✓ No identifying metadata in ${images.length} image(s) and ${svgs.length} SVG(s)`);
