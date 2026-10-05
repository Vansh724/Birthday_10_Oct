/**
 * Daily message + daily-page configuration.
 *
 * This is the ONE file you'll come back to and edit as the days go by.
 * Each entry is keyed by date (YYYY-MM-DD, Asia/Kolkata) so the backend
 * scheduler (Stage 5) can look up "what do I send today" with no guesswork.
 *
 * dayNumber counts DOWN to the birthday (today = 14, birthday = 0),
 * matching the real number of days between 26 Sep and 10 Oct 2026.
 * "15 Days Until Dhruvi" is the project's name for the 15-date journey —
 * the numbers themselves run 14→0 since that's the true day count.
 * url is the deep link the notification opens (built in Stage 6).
 *
 * Feel free to rewrite any `message` field — this is a starting draft,
 * not final copy. Keep messages short: they need to read naturally as
 * a phone notification (roughly under 120 characters is a safe target).
 */

const DAILY_MESSAGES = [
  {
    date: '2026-09-26',
    dayNumber: 14,
    title: 'Day 14',
    message: "Something starts today. You won't need to check — just wait.",
    url: '/day/14',
  },
  {
    date: '2026-09-27',
    dayNumber: 13,
    title: 'Day 13',
    message: 'Lets Start The Count Down...Everyday I will find you at 9..Stay Tuned..',
    url: '/day/13',
  },
  {
    date: '2026-09-28',
    dayNumber: 12,
    title: 'Day 12',
    message: "Something starts today...You won't need to check - just wait.",
    url: '/day/12',
  },
  {
    date: '2026-09-29',
    dayNumber: 11,
    title: 'Day 11',
    message: "Small thing today...Don't blink..",
    url: '/day/11',
  },
  {
    date: '2026-09-30',
    dayNumber: 10,
    title: 'Day 10',
    message: 'I remembered something today...Click and I might tell you.',
    url: '/day/10',
  },
  {
    date: '2026-10-01',
    dayNumber: 9,
    title: 'Day 9',
    message: 'Halfway. Here — a few little snapshots.',
    url: '/day/9',
  },
  {
    date: '2026-10-02',
    dayNumber: 8,
    title: 'Day 8',
    message: '10 things I appreciate about you. In no particular order.',
    url: '/day/8',
  },
  {
    date: '2026-10-03',
    dayNumber: 7,
    title: 'Day 7',
    message: 'A tiny puzzle for you. No pressure to solve it fast..',
    url: '/day/7',
  },
  {
    date: '2026-10-04',
    dayNumber: 6,
    title: 'Day 6 🌙',
    message: 'Somewhere today, a little world is waiting for you.. 🌎✨',
    url: '/day/6',
  },
  {
    date: '2026-10-05',
    dayNumber: 5,
    title: 'Day 5',
    message: 'A short walk through how we got here.',
    url: '/day/5',
  },
  {
    date: '2026-10-06',
    dayNumber: 4,
    title: 'Day 4',
    message: "Something starts today...You won't need to check - just wait.",
    url: '/day/4',
  },
  {
    date: '2026-10-07',
    dayNumber: 3,
    title: 'Day 3',
    message: "Wrote you something by hand, sort of. Today's a little softer.",
    url: '/day/3',
  },
  {
    date: '2026-10-08',
    dayNumber: 2,
    title: 'Day 2',
    message: 'One small game today. Beat it and I owe you something.',
    url: '/day/2',
  },
  {
    date: '2026-10-09',
    dayNumber: 1,
    title: 'Day 1',
    message: "There's a message here, but it's locked. See if you can guess.",
    url: '/day/1',
  },
  {
    date: '2026-10-10',
    dayNumber: 0,
    title: "It's finally here...",
    message: 'Happy birthday, Dhruvi.',
    url: '/birthday',
  },
];

module.exports = { DAILY_MESSAGES };
