// ============================================================
// All editable site content lives here. Swap the placeholder
// strings/paths below with the real ones — nothing elsewhere
// in the codebase needs to change.
// ============================================================

export const site = {
  recipientName: 'loveliest honey Gunnu bachuuuu 😘',
  senderName: 'with all my heart 💖',
  heroTitle: 'A surprise awaits you...',
  heroSubtitle: 'Something small, made with a lot of love — tap the gift when you\u2019re ready.',
  openButtonLabel: 'Tap the gift to open',
};

// Change `code` to whatever 4-digit number means something to the two
// of you (a date, an anniversary) — `hint` is the clue shown above the pad.
export const secretCode = {
  code: '0406',
  hint: 'Enter the date of both of our birthday...',
  wrongMessage: 'Not quite — try again',
  unlockedTitle: 'Unlocked, just for you my love',
};

export const cake = {
  candleCount: 3,
  title: 'Make a wish...',
  subtitle: 'Blow out each candle, or blow into your mic if you\u2019re feeling fancy.',
  micButtonLabel: 'Blow into your mic',
  micUnavailableMessage: 'Mic not available — tap the candles instead',
  wishGrantedTitle: 'Whatever you wished for, I hope it comes true.',
};

// Replace `src` with real photos in /public/photos/ and rewrite the
// captions — placeholders are here so the layout works out of the box.
export const memories = [
  { id: 1, src: '/photos/memory-1.jpg', caption: 'Our first adventure together 🌸' },
  { id: 2, src: '/photos/memory-2.jpg', caption: 'My Little Lovely Joyful Chaos ✨' },
  { id: 3, src: '/photos/memory-3.jpg', caption: 'Mera cutu pyaara bachaaa ☀️😘' },
  { id: 4, src: '/photos/memory-4.jpg', caption: 'Birthday Boy (My Big Broo) 🌺' },
  { id: 5, src: '/photos/memory-5.jpg', caption: 'Your Smile Makes Everything Better💖' },
  { id: 6, src: '/photos/memory-6.jpg', caption: 'Little You big Smile born to brighten my life🫶🫂'},
];

// Each balloon reveals one of these when popped — swap in your own
// words whenever you like, order doesn't matter (colors cycle to match).
export const wishes = [
  'You make my whole world brighter and happier just by having you in my life I feel like the luckiest person in the world💕 🌞',
  'Thank you for every single laugh your smile is the most beautiful thing I have ever seen it is the reason that make my heart smile too ✨ 😄',
  'You were, are and will be  my favourite person always  , forever and ever my love my darlooo 💕.',
  'Here is to so many more years together 😘😉🥂',
  'I am the luckiest, because of you bbs ✨.',
  'No matter how many birthdays pass my favorite gift will always be having you in my life. Happiest  Birthday my love. ❤️🎂✨.',
];

export const puzzle = {
  title: 'Birthday Puzzle 🧩',
  subtitle: 'Slide the tiles to piece the picture back together',
  image: '/photos/memory-3.jpg',
  completedTitle: 'Puzzle completed!',
  shuffleLabel: 'Shuffle Again',
  solveForMeLabel: 'Solve it for me',
  continueLabel: 'One Last Surprise →',
};

// Replace dates/titles/descriptions with your real milestones —
// order matters here (oldest first), icon is any single emoji.
export const timeline = [
  { date: 'Day One', title: 'The day we met', description: 'I didn\u2019t know yet how much that day would matter.', icon: '✨' },
  { date: 'Not long after', title: 'The first time you made me laugh until it hurt', description: 'I remember thinking, oh no, I really like this person.', icon: '😂' },
  { date: 'Somewhere in the middle', title: 'The trip we still bring up', description: 'Everything went a little wrong and it was somehow perfect anyway.', icon: '🧳' },
  { date: 'A quieter day', title: 'The ordinary Tuesday that felt like home', description: 'Nothing happened, and it was one of my favourite days.', icon: '🏡' },
  { date: 'Today', title: 'Right now', description: 'Still choosing you, still grateful, still a little in awe.', icon: '💜' },
];

// The full love letter — rewrite freely, paragraphs render one per line.
export const loveLetter = {
  chapterTitle: 'A Letter Just For You',
  envelopeLabel: 'Tap to open',
  greeting: `My dearest ${site.recipientName},`,
  paragraphs: [
    'On this very special day, I want you to know how deeply you are loved. Every single moment I spend with you feels like a beautiful dream I never want to wake up from.',
    'You make every ordinary day feel extraordinary. Your smile is my favourite thing in the entire world, and your laugh — oh, your laugh — is the most beautiful sound I have ever heard.',
    'Meeting you has been one of the most beautiful things that has ever happened to me. Every memory we have made, every calls, every video calls, every laugh, and every little moment with you has become a treasure I will always keep close to my heart. I promise to keep loving you, supporting you, and choosing you every single day. I hope this birthday is as wonderful as you are.',
    'I wish I could be there to hold your hand, make you laugh, and celebrate this special day with you. Since I can not, I made this little surprise to remind you that no distance could ever lessen my love for you. I hope this website makes you smile because your smile is my favorite thing in the world and I would love to always watch you smile. So if this little surprise made you smile even for a moment then it was all worth it.',
    'Thank you for being you. Thank you for choosing me, every single day. I promise to always be there, to hold your hand through every storm, and to celebrate every little joy with you.',
    'Happiest Bestest Loveliest  Birthday, my love mera bacha the most amazing person in this world. You deserve every good thing the universe has to offer. Today and always. 🌸',
  ],
  signature: `Forever yours,\n${site.senderName}`,
  readAgainLabel: 'Read it again',
};

// Drop your track at public/audio/song.mp3 (any filename — just update
// `src` below to match). Until a real file exists the player shows a
// friendly "add a track" state instead of a broken player.
export const music = {
  src: '/audio/song.mp3',
  title: 'Our Song',
  artist: '',
};

export const finale = {
  title: `Happiest Birthday, Mera Gunnu bachaa my darlinggg! 🎉`,
  subtitle: 'That\u2019s everything I made for you — but not everything I feel. Here\u2019s to another year of us.𓍯𓂃𓏧♡💫👀💞🫶',
  signOff: `forever your's mera bacha, always🫶🏼🧿💕`,
  restartLabel: '↺ Watch it again',
};

// Chapter registry — the site is built chapter by chapter.
// Add an entry here once a chapter component exists in src/sections.
export const chapters = [
  { id: 'hero', label: 'The Gift' },
  // { id: 'countdown', label: 'Countdown' },
  // { id: 'cake', label: 'The Cake' },
  // { id: 'gallery', label: 'Memories' },
  // { id: 'timeline', label: 'Our Timeline' },
  // { id: 'letter', label: 'A Letter Just For You' },
  // { id: 'finale', label: 'Celebration' },
] as const;
