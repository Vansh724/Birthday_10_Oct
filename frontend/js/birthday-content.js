/**
 * Content for the birthday finale page (/birthday).
 *
 * This is the most important file to actually rewrite before 10 October —
 * everything here is a clearly-labeled placeholder, not filler to ship
 * as-is. Take your time with `longMessage` especially; it's the heart
 * of the whole page.
 */

const BIRTHDAY_CONTENT = {
  heroLine: 'Happy Birthday, Dhruvi.',

  // The big one. Multiple paragraphs are fine — each string in the array
  // becomes its own paragraph. Write this last, once everything else
  // is filled in, and write it like you're actually talking to her.
  longMessage: [
    "Replace this paragraph with the real thing. This is the section the last 14 days were building toward, so don't rush it.",
    "A second paragraph is fine if you need more room — write however many you actually need, not a fixed amount.",
  ],

  // Real photos + captions. Leave `src` empty for a placeholder box until
  // you add real images to frontend/assets/ and reference them here,
  // e.g. src: 'assets/photo1.jpg'.
  photos: [
    { src: '', caption: 'Replace with a real photo + caption' },
    { src: '', caption: 'Replace with a real photo + caption' },
    { src: '', caption: 'Replace with a real photo + caption' },
    { src: '', caption: 'Replace with a real photo + caption' },
  ],

  // The full relationship timeline — longer and more detailed than the
  // short one on Day 5, since this is the finale.
  timeline: [
    { label: 'How it started', detail: 'Replace with the real beginning of the story.' },
    { label: 'A memory that stuck', detail: 'Replace with something specific.' },
    { label: 'A harder moment', detail: 'Replace with something real, if it fits — these pages are more meaningful when they are not only the easy parts.' },
    { label: 'Today', detail: 'Replace with where things are now, and what you hope for next.' },
  ],

  // Favorite songs — a small mixtape. `link` is optional (Spotify/YouTube/etc).
  songs: [
    { title: 'Replace with a real song', artist: 'Artist', note: 'Why this one.', link: '' },
    { title: 'Replace with a real song', artist: 'Artist', note: 'Why this one.', link: '' },
    { title: 'Replace with a real song', artist: 'Artist', note: 'Why this one.', link: '' },
  ],

  // Short inside jokes — each one gets a flip-to-reveal card, like Day 13's.
  insideJokes: [
    'Replace with a real inside joke, kept short.',
    'Replace with another one.',
    'Replace with another one.',
  ],

  // Revealed last, after a button press — whatever "one more thing" you
  // want to end on. Could be a surprise plan, a confession, an invitation,
  // anything.
  finalSurprise: {
    buttonLabel: 'One more thing',
    message: "Replace this with the actual final surprise — the thing you've been building up to this whole time.",
  },
};
