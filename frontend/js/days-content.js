/**
 * Content for each daily page (/day/14 through /day/1).
 *
 * This is the file you'll come back to and rewrite with real, specific,
 * personal content — inside jokes, real memories, a real puzzle answer.
 * Everything here is a working placeholder, not filler to leave as-is.
 *
 * `type` picks which interactive renderer runs (see js/day-page.js).
 * Each type's extra fields are documented inline below with an example.
 */

const DAY_CONTENT = {
  14: {
    type: 'intro',
    heading: 'Day 14',
    body: "This is the first of fourteen little pages. Each one unlocks with tomorrow's notification — you don't need to come looking for them. Today's just here to say: it's really started.",
  },

  12: {
    type: 'memory',
    heading: 'Day 12',
    prompt: "Tap The Card To Get Today's Message",
    memory: "Some flowers just have a way of making an ordinary day feel a little more beautiful, So heres one for you, just because you deserve a lil extra beauty today 🌸",
  },

  13: {
    type: 'choice',
    heading: 'Day 13',
    question: 'Pick one, honestly:',
    options: [
      { label: 'Coffee', response: "Good — that's what I'd have guessed." },
      { label: 'Tea', response: "Interesting. I'll allow it." },
    ],
  },

  11: {
    type: 'animation',
    heading: 'Day 11',
    caption: "Small thing today. Watch for a second.",
  },

  10: {
    type: 'hidden',
    heading: 'Day 10',
    teaser: 'Click here.',
    reveal: "Replace this with something you've never actually told her.",
  },

  9: {
    type: 'gallery',
    heading: 'Day 9',
    intro: 'A few snapshots — replace these placeholders with real photos later.',
    items: [
      { caption: 'Replace with a real memory + photo' },
      { caption: 'Replace with a real memory + photo' },
      { caption: 'Replace with a real memory + photo' },
    ],
  },

  8: {
    type: 'appreciation',
    heading: 'Day 8',
    intro: '10 things, in no particular order:',
    items: [
      'Replace this list with 10 real, specific things.',
      'Specific beats generic — "the way you..." beats "you\'re nice".',
      '3', '4', '5', '6', '7', '8', '9', '10',
    ],
  },

  7: {
    type: 'puzzle',
    heading: 'Day 7',
    prompt: 'Finish this the way you always do:',
    riddle: '"Replace this with an inside joke or half a sentence only she\'d finish"',
    answer: 'REPLACE ME',
    successMessage: "There it is. You knew it immediately, didn't you.",
  },

  6: {
    type: 'constellation',
    heading: 'Day 6',
    intro: 'Tap a star.',
    words: ['kind', 'funny', 'loyal', 'stubborn (affectionately)', 'brilliant', 'yours'],
  },

  5: {
    type: 'timeline',
    heading: 'Day 5',
    intro: 'A short walk through how we got here — replace these with real ones.',
    milestones: [
      { label: 'How we met', detail: 'Replace with the real story, briefly.' },
      { label: 'A turning point', detail: 'Replace with a real moment.' },
      { label: 'Now', detail: 'Replace with where things are today.' },
    ],
  },

  4: {
    type: 'music',
    heading: 'Day 4',
    intro: 'A song made me think of you today.',
    songTitle: 'Replace with a real song title',
    songArtist: 'Replace with the artist',
    note: "Replace with why this song, specifically.",
    link: '',
  },

  3: {
    type: 'note',
    heading: 'Day 3',
    note: "Replace this whole paragraph with something written in your own voice, like a note you'd actually hand her.",
  },

  2: {
    type: 'game',
    heading: 'Day 2',
    prompt: 'Find the one that doesn\'t belong.',
    items: ['🌙', '⭐', '🌙', '🌙', '🌙'],
    correctIndex: 1,
    successMessage: "Found it. I owe you something for that — I'll figure out what.",
  },

  1: {
    type: 'locked',
    heading: 'Day 1',
    lockedHint: 'Tap to unlock.',
    message: "One day left. Whatever you're doing tomorrow, keep some room in it — I have something for you.",
  },
};
