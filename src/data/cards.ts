import type { ImageMetadata } from 'astro';
import moose from '../assets/cards/card-moose-holiday.jpg';
import gingerbread from '../assets/cards/card-gingerbread-holiday.jpg';
import cows from '../assets/cards/card-cows-birthday.jpg';
import bear from '../assets/cards/card-bear-birthday.jpg';
import smore from '../assets/cards/card-smore-everyday.jpg';
import paw from '../assets/cards/card-paw-everyday.jpg';

/**
 * Card fronts shown on the home page. Web-resolution crops only (CLAUDE.md
 * rule 5), metadata stripped, no signatures, names or faces (rule 4).
 * Alt text describes the artwork only.
 * The first two also appear in the hero. The cards section hides if this list is empty.
 * Source: Canva print files (Kelly's account), fronts cropped 2026-11-18.
 */
export interface Card {
  image: ImageMetadata;
  alt: string;
}

export const cards: Card[] = [
  {
    image: moose,
    alt: 'Card with a drawing of a smiling moose with ornaments hanging from its antlers in the snow. It reads “Merry ChristMOOSE!”',
  },
  {
    image: gingerbread,
    alt: 'Card with a drawing of a gingerbread cookie in a purple dress and a Santa hat. It reads “Have a WonDOUGHful Holiday!”',
  },
  {
    image: cows,
    alt: 'Card with a drawing of three cows with a balloon, a party hat and a tiny cake. It reads “HERD it’s your birthday!”',
  },
  {
    image: bear,
    alt: 'Card with a drawing of a brown bear in a colourful party hat. It reads “Wishing you a BEARy Happy Birthday!”',
  },
  {
    image: smore,
    alt: 'Card with a drawing of a smiling s’more. It reads “The world needs S’MORE people like you!”',
  },
  {
    image: paw,
    alt: 'Card with a drawing of a grey cat paw raised high. It reads “You are PAWsome!”',
  },
];
