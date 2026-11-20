import type { ImageMetadata } from 'astro';
import moose from '../assets/cards/card-moose-holiday.jpg';
import merryEverything from '../assets/cards/card-merry-everything-holiday.jpg';
import owl from '../assets/cards/card-owl-holiday.jpg';
import gnome from '../assets/cards/card-gnome-holiday.jpg';
import raccoon from '../assets/cards/card-raccoon-holiday.jpg';
import ornament from '../assets/cards/card-ornament-holiday.jpg';
import cows from '../assets/cards/card-cows-birthday.jpg';
import snail from '../assets/cards/card-snail-birthday.jpg';
import bear from '../assets/cards/card-bear-birthday.jpg';
import koala from '../assets/cards/card-koala-birthday.jpg';
import hippo from '../assets/cards/card-hippo-birthday.jpg';
import queen from '../assets/cards/card-queen-birthday.jpg';
import smore from '../assets/cards/card-smore-everyday.jpg';
import cowThanks from '../assets/cards/card-cow-thanks-everyday.jpg';
import bike from '../assets/cards/card-bike-everyday.jpg';
import flowers from '../assets/cards/card-flowers-everyday.jpg';
import bandage from '../assets/cards/card-bandage-everyday.jpg';
import unicornCat from '../assets/cards/card-unicorn-cat-everyday.jpg';
import note from '../assets/cards/card-note-everyday.jpg';
import masterpiece from '../assets/cards/card-masterpiece-everyday.jpg';

/**
 * Card fronts shown on the home page: the designs at our market table.
 * Web-resolution crops only (CLAUDE.md rule 5), metadata stripped, no
 * signatures or ages (rule 4). Alt text describes the artwork only.
 * The cards section hides if this list is empty.
 * Source: Kelly's Canva folder "Kids Maker Market", fronts cropped 2026-11-19.
 */
export type Occasion = 'holiday' | 'birthday' | 'everyday';

export interface Card {
  image: ImageMetadata;
  alt: string;
  occasion: Occasion;
}

export const occasions: { id: Occasion; title: string }[] = [
  { id: 'holiday', title: 'Holiday' },
  { id: 'birthday', title: 'Birthday' },
  { id: 'everyday', title: 'Everyday' },
];

export const cards: Card[] = [
  {
    image: moose,
    occasion: 'holiday',
    alt: 'Card with a drawing of a smiling moose with ornaments hanging from its antlers in the snow. It reads “Merry ChristMOOSE!”',
  },
  {
    image: merryEverything,
    occasion: 'holiday',
    alt: 'Card with a drawing of a candy cane, a present, a light bulb and a Christmas tree, all smiling with arms and legs. It reads “Merry Everything!”',
  },
  {
    image: owl,
    occasion: 'holiday',
    alt: 'Card with a drawing of a brown owl in a Santa hat and a striped scarf, sitting on a snowy branch. It reads “Hope Your Holidays are a HOOT!”',
  },
  {
    image: gnome,
    occasion: 'holiday',
    alt: 'Card with a drawing of a gnome with a white beard and a red spotted hat, holding a small present. It reads “There’s GNOME greater gift than spending the holidays with you!”',
  },
  {
    image: raccoon,
    occasion: 'holiday',
    alt: 'Card with a drawing of a raccoon in a holiday sweater in the falling snow. It reads “Happy Holidays from Toronto!”',
  },
  {
    image: ornament,
    occasion: 'holiday',
    alt: 'Card with a drawing of a smiling red and green striped ornament. It reads “Let’s HANG This Holiday!”',
  },
  {
    image: cows,
    occasion: 'birthday',
    alt: 'Card with a drawing of three cows with a balloon, a party hat and a tiny cake. It reads “HERD it’s your birthday!”',
  },
  {
    image: snail,
    occasion: 'birthday',
    alt: 'Card with a drawing of a pink snail carrying a present on its striped shell. It reads “HAPPY BIRTHDAY! (sorry I am a little late)”',
  },
  {
    image: bear,
    occasion: 'birthday',
    alt: 'Card with a drawing of a brown bear in a colourful party hat. It reads “Wishing you a BEARy Happy Birthday!”',
  },
  {
    image: koala,
    occasion: 'birthday',
    alt: 'Card with a drawing of a grey koala in a purple party hat. It reads “Happy Birthday to a KOALA-ty friend!”',
  },
  {
    image: hippo,
    occasion: 'birthday',
    alt: 'Card with a drawing of a grey hippo in a party hat, waving. It reads “Hip Hip HIPPO-ray It’s your birthday today!”',
  },
  {
    image: queen,
    occasion: 'birthday',
    alt: 'Card with a drawing of a smiling queen in a gold crown and a pink dress under a yellow sun. It reads “All Hail the Birthday Queen!”',
  },
  {
    image: smore,
    occasion: 'everyday',
    alt: 'Card with a drawing of a smiling s’more. It reads “The world needs S’MORE people like you!”',
  },
  {
    image: cowThanks,
    occasion: 'everyday',
    alt: 'Card with a drawing of a black and white cow standing on green grass. It reads “MOO-chas Gracias”',
  },
  {
    image: bike,
    occasion: 'everyday',
    alt: 'Card with a drawing of a red and green bicycle. It reads “You’re Going Places!”',
  },
  {
    image: flowers,
    occasion: 'everyday',
    alt: 'Card with a drawing of a row of colourful flowers, including a rose, a daisy and a tulip. It reads “Just Because”',
  },
  {
    image: bandage,
    occasion: 'everyday',
    alt: 'Card with a drawing of a bandage with a heart in the middle. It reads “Get Well Soon”',
  },
  {
    image: unicornCat,
    occasion: 'everyday',
    alt: 'Card with a drawing of a pink cat with a unicorn horn and a rainbow tail. It reads “Everyone needs a UNICORN friend like you!”',
  },
  {
    image: note,
    occasion: 'everyday',
    alt: 'Card with a drawing of a smiling sheet of lined paper holding up a little heart. It reads “This is just a little note to say…”',
  },
  {
    image: masterpiece,
    occasion: 'everyday',
    alt: 'Card with a colourful painting of a yellow crown above a big heart, with no words on the front.',
  },
];

/** The two cards in the home page hero: one landscape, one portrait. */
export const heroCards: Card[] = [cards[0], cards[3]].filter(
  (card): card is Card => card !== undefined,
);
