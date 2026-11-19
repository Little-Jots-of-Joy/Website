import type { ImageMetadata } from 'astro';

/**
 * Card fronts shown on the home page. Web-resolution crops only (CLAUDE.md
 * rule 5), metadata stripped, no signatures, names or faces (rule 4).
 * Alt text describes the artwork only, for example
 * "Card with a crayon drawing of a yellow sun over a red house".
 * The cards section stays hidden while this list is empty.
 */
export interface Card {
  image: ImageMetadata;
  alt: string;
}

export const cards: Card[] = [];
