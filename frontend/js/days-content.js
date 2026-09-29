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
  heading: 'Day 10',
  intro: 'Some things are meant to be noticed...Some are meant to be discovered...Please start from THE FIRST DOOR',

  items: [
    {
      title: '01',
      message: "Don't get too comfortable...You probably think you've figured out how this works by now...You haven't.. Clue: Add the first three positive whole numbers: 1 + 2 + 3 = ?"
    },

    {
      title: '02',
      message: "Let's make this one easy. You've already passed through numbers that looked random. Maybe they're not. Clue: How many days are there in a week?"
    },

    {
      title: '03',
      message: "You're getting better at this. Three was useful for a while. But now let's make it bigger without adding anything new. Clue: Take my number. Multiply it by itself."
    },

    {
      title: '04 The First Door..',
      message: "1 mystery never hurt anyone..Some things are more fun when you don't know where they're going...So let's start somewhere that definitely isn't the beginning. Clue To Next: Think of a stop sign. How many sides does it have ?"
    },

    {
      title: '05',
      message: "Funny how ten little doors can make you look at numbers completely differently. If you've been paying attention, you might want to look back at the first character of every message you've opened. Don't read them as sentences. Read them as pieces. Clue: You're one door away. Take my number and double it."
    },

    {
      title: '06',
      message: "And now we're getting somewhere. You weren't supposed to find these in numerical order...You were supposed to find them in the right order. Clue: My number has a very simple next step...Take half of me."
    },

    {
      title: '07',
      message: "Everything you've opened so far has been saying more than it seems. Maybe you've noticed something. Maybe you haven't. Either way, there's only one way forward. Clue: How many letters are there in the word THREE?"
    },

    {
      title: '08',
      message: "0ne thing I've learnt about puzzles: the obvious answer isn't always the interesting one. You're doing fine. Keep going. Clue: There is exactly one number that is neither prime nor composite."
    },

    {
      title: '09',
      message: "Sometimes the answer is much simpler than the question makes it seem. You've made it this far. Don't overthink this one. Clue: How many eyes does a person normally have?"
    },

    {
      title: '10',
      message: "Take a second. Don't rush this one. Look at the first character of every message, but read them in the order you discovered them. You should have: 1 → 0 → D → A → Y → S → L → E → F → T. Now put the space where it belongs. 10 DAYS LEFT. You weren't opening ten messages. You were assembling one. And if you figured that out before reaching this door... I guess you were paying attention. ✨ Tomorrow: 9."
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
