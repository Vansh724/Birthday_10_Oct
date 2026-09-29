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
    memory: "Humre gola par it's a rule to celebrate best friends early! I genuinely loved this message enough to let it go all the way to your planet... Happy 12 days to your birthday!🛸",
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

  6: {
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
  heading: 'Day 09',
  intro: 'A few snapshots — replace these placeholders with real photos later.',
  items: [
    { src: '../../images/day09-1.png', caption: 'Real memory here' },
    { src: '../../images/day09-2.png', caption: 'Another memory' },
    { src: '../../images/day09-3.png', caption: 'And another' },
  ],
},


 8: {
  type: 'appreciation',
  heading: '10 little things',
  intro: 'Some things are meant to be noticed. Some are meant to be discovered.',

  items: [
    {
      title: 'Something you probably don’t realise',
      message: 'You have this weird ability to make completely ordinary moments feel memorable.'
    },

    {
      title: 'You probably forgot this one',
      message: 'There are tiny things you’ve said or done that stayed with me much longer than you probably expected.'
    },

    {
      title: 'Three words',
      message: 'Sorry. Thank you. Please. Somehow, these became very you.'
    },

    {
      title: 'A tiny plot twist',
      message: 'I thought I was just collecting memories. Turns out, I was collecting reasons to smile.'
    },

    {
      title: 'For the reader',
      message: 'For someone who loves getting lost in a Palace of Illusions, you have a pretty interesting little world of your own.'
    },

    {
      title: 'Something specific',
      message: 'It’s the little details. The things you probably don’t think anyone notices.'
    },

    {
      title: 'This one is suspicious',
      message: 'I’m not saying you’re secretly the main character… but the evidence is getting stronger.'
    },

    {
      title: 'You know this one',
      message: 'Some references don’t need explanations. If you know, you know.'
    },

    {
      title: 'Almost there',
      message: 'One of the nicest things about knowing someone is slowly discovering all the little things that make them them.'
    },

    {
      title: 'The last one',
      message: 'Okay. Maybe these weren’t really 10 things I appreciate. Maybe they were just 10 excuses to remind you that you’re pretty special.'
    }
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

  11: {
    type: 'constellation',
    heading: 'Day 11',
    intro: 'Warning: These Stars Contain Some Random Messages...Tap On Your Own Risk...',
    words: ['Glad to have a friend who loves getting lost in a Palace of Illusions...✨', 'Six stars...One constellation and somehow, six feels like the right number...I’ll let you figure out why..', 'Today is 29th... 2 + 9 = 11...thats exactly the number of days left..', 'Jaande jaande ek gal sundi jaa… if you got all the references, I owe you a chocolate. 🍫', 'You know why the ducklings follow the frog? A lil mistake… sorry… sorrry… aapka hi joke tha :)) 🐸', '11 days to go… 🌹 A little closer to your day, a little more magic along the way,and until then, here’s a rose for the girl who deserves a whole garden of them..'],
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
