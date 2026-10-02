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

  8: {
  type: 'hidden',
  heading: 'Today is the 2nd of October, and there are 8 days left… 👀✨ And guess what? 2 + 8 = 10. 🫣🎂',
  teaser: 'There might be something waiting for you here...',
  reveal: 'Okay… this one is a little different. Some things are better discovered than explained. So instead of leaving another message here, I made something for you...✨ If you’ve made it this far, I think you deserve to see it...',
  buttonText: 'I wonder what it is 👀',
  buttonUrl: 'https://nurture-memories.vercel.app',
},

  7: {
  type: 'gallery',
  heading: 'Day 09',
  intro: 'A few snapshots — replace these placeholders with real photos later.',
  items: [
    { src: '../../images/day09-1.png', caption: 'Real memory here' },
    { src: '../../images/day09-2.png', caption: 'Another memory' },
    { src: '../../images/day09-3.png', caption: 'And another' },
  ],
},


 10: {
  type: 'appreciation',
  heading: 'The Date == Number Of Days Left..',
  intro: 'Some things are meant to be noticed...Some are meant to be discovered...Please start from THE ENTRY DOOR..and follow the clues',

  items: [
    {
      title: 'ORBIT',
      message: "Not sure how someone can jump between making things, reading things, creating content, and teaching machines how to learn… but somehow you make all of that look like a normal Tuesday.😯✨ Clue: I have hands but cannot hold you. I have a face but cannot smile. I keep moving, even when you stand still.🕰️🤔"
    },

    {
      title: 'BOOK',
      message: "There's a certain charm in sending little pieces of yourself out into the world and seeing where they land. A few people here, a few more there… Maybe 153 on one side, 63 on another...That's probably the best part.. ✨📨 Clue: I have a flap but I'm not a bird. I can carry a secret without knowing it. People open me when something important has arrived. 📩🤫"
    },

    {
      title: 'THUNDER',
      message: "Every now and then, I just feel like reminding you how grateful I am to have a good boy as my friend..you may believe it or not but yeahh...🥹🫶🏻✨ Clue: I have no walls, but I have shores. I have no voice, but I make waves. You can never see all of me from one place.🌊🤔"
    },

    {
      title: 'The ENTRY DOOR..',
      message: "There's something special about people who can turn tiny things into something that didn't exist before..A little thread, a little patience, a little imagination… and suddenly there's something worth keeping..close to your heart...Maybe that's why this one felt like a good place to begin.. 🧶✨🤍 Clue: I stand where land meets water. I don't move, but I guide those who do. When everything around you goes dark, I am the thing people look for. 🌊💡🌙"
    },

    {
      title: 'RAINBOW',
      message: "If you've made it this far, you might have noticed something strange. These aren't just random cards, and you definitely weren't supposed to find them in numerical order. There may be more hiding here than just the riddles. 👀🧩✨ Clue: I am the smallest positive whole number. I come before two. There is only ___ of me. 🔢☝️"
    },

    {
      title: 'CLOCK',
      message: "Lil things probably give away your personality more than you realise. The things you create, the details you put on your nails, the ideas that suddenly become projects… like some random walking robot...there's always some tiny spark turning into something bigger. 🤖✨ Clue: You may see the flash before you hear me. I have no mouth, but I can shake the sky. I arrive after lightning and leave an echo behind. ⚡🌩️"
    },

    {
      title: 'ENVELOPE',
      message: "There's something about Jaipur that makes colour feel like it belongs everywhere in old walls, bright streets, little details, and probably somewhere in your camera roll too.. Maybe that's why this next one feels appropriate... 🩷🌈✨ Clue: I appear after the rain but never get wet. I have many colours but no paint. You can see me, but you can never reach me. 🌦️🌈👀"
    },

    {
      title: 'LIGHTHOUSE',
      message: "Everyone has their own little world they disappear into sometimes..Yours probably has a book somewhere, a half-finished idea, a new thing you're trying to make, and at least one episode of a sitcom waiting in the background. 📖🧶📺✨ Clue: I am not a circle, but I can look like one. I have no beginning or end. Planets follow me, but I never have to move. 🌍🪐🔄"
    },

    {
      title: 'OCEAN',
      message: "For someone who effortlessly gets lost in her own thoughts and then somehow finds her way back with another beautiful idea bring to life, I suppose ten mysterious cards aren't the strangest thing to leave you with. Besides, every good story needs a little mystery...Jse hr pyaara mausam needs a company... 🌸✨ Clue: The Alchemist.📖🌍✨"
    },

    {
      title: '1',
      message: "Look back at everything you've just opened. Not the card names. Not the riddles. Look at the first character of every message, in the order you discovered them. Then do the same with the answers you got.. You might want to write both down. Last Clue: I represent nothing...I come before one. On a countdown, reaching me means there is nothing left to wait for..itss a 0..hehe"
    }
  ],
},

 9: {
  type: 'puzzle',
  heading: "What if we reverse today’s date? 👀🔄 Let’s see how much you actually remember… because this isn’t a game of knowledge, it’s a game of memory. 🧠🫶🏻",

  questions: [
    {
      prompt: 'Finish this the way you always used to do… 🫠',
      riddle: "Seedha Seedha Raasta Tha… 🛣️ Kisi Se Bhi Na Vaasta Tha… Na Koi Fikar Na Koi Tension… 😌 Main Kaise Bhatak Gaya… 🫠 Raha Na Main Banda Kaam Ka… Jo Bana Main _____ Aapka… ",
      answer: 'baby',
      successMessage: "Ohooo…! 😂 Itni jaldi pehchaan liya?...Lagta hai purane records abhi bhi delete nahi hue...👀"
    },

    {
      prompt: "I don't know what is thiss.. you can tell if you know.. Hint: Answer is a word..",
      riddle: "16 - 7 - 12 - 1 - 9 - 20",
      answer: 'pglait',
      successMessage: "Jo mai nhi huu...kaha tha na… ek na ek din references mai mil hi jaayega...😂"
    },

    {
      prompt: 'Do you remember...',
      riddle: 'Would you like a ____? 🍓 Or would you like to jam along? 🎶 Or will bread be enough? 👀',
      answer: 'jaam',
      successMessage: "Omgggg, yaad hai...😂 Ek random snap thi… aur dekho, ab iska bhi exam liya jaa rha haai..."
    },

    {
      prompt: 'Heavyy mistakee hogyaa...soryy..',
      riddle: "What year of college are you in?...Answer is just a number.. 🎓👀",
      answer: '4',
      successMessage: "Meanwhile, your YouTube description is still living in the past… “A Sophomore from NIT KKR..” 👀"
    },

    {
      prompt: 'Okay This One is Easyy..',
      riddle: "Dhruvi Khandelwal is a ____ ...Born To Rule..",
      answer: 'queen',
      successMessage: "I mean it...A Queen or maybe a Kingg :)).. 📖"
    },

    {
      prompt: 'Can you guess the poet... ?',
      riddle: '“The woods are lovely, dark and deep…But I have promises to keep..”',
      answer: 'robert frost',
      successMessage: "I knew you'd remember that one...its a masterpiece after...Two roads diverged in a wood 😭"
    },

    {
      prompt: "Tell me the song....Its not that SRK oneee hehee..Don't use apostrophe",
      riddle: '👠 + 🕛 + 🚫🤴🏻 + 💀 = ?',
      answer: 'cinderellas dead',
      successMessage: "If no one’s told you this today… you’re doing great... And yes, this is your daily reminder from me..."
    },


    {
      prompt: 'Thiss One Is Personal...',
      riddle: "Okayy, no thinking too much 👀😂 Whose name would you put next to Best Friend ?",
      answer: 'vansh',
      successMessage: "Correct...😌😂 It’s my game, my rules… obviously I get to decide the answer...✨… Attitude ? Haan 😏✨"
    },


    {
      prompt: 'One lasttt thingy:',
      riddle: "How many days are left...in October 10 ?",
      answer: '9',
      successMessage: "Exactly...9 days to go..Some random Numbers : 29.946695004231646, 76.81568670986067👀"
    }
  ]
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
