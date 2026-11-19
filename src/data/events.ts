/**
 * Markets and events shown in "Find us". Each listing needs Brion's approval
 * (CLAUDE.md rule 4 exception). Never say which family member will be there.
 * Past events drop off at the next build after `endsAt`.
 */
export interface MarketEvent {
  name: string;
  /** ISO date-time when the event ends, Toronto time. Used to hide past events. */
  endsAt: string;
  /** ISO date for the <time> element. */
  date: string;
  dateLabel: string;
  hours: string;
  venue: string;
  note?: string;
}

export const events: MarketEvent[] = [
  {
    name: 'Kid Maker Market, Winter Edition',
    endsAt: '2026-11-22T14:00:00-05:00',
    date: '2026-11-22',
    dateLabel: 'Sunday, November 22',
    hours: '11 am to 2 pm',
    venue: 'Mischief Makers, 247 Coxwell Ave',
  },
  {
    name: 'Ladies Night Sip N’ Shop',
    endsAt: '2026-12-02T20:00:00-05:00',
    date: '2026-12-02',
    dateLabel: 'Wednesday, December 2',
    hours: '5 to 8 pm',
    venue: 'Bloor West Village',
    note: 'Find us at Red Square, where it starts.',
  },
];

export const upcomingEvents = (now = new Date()) =>
  events.filter((event) => new Date(event.endsAt) > now);
