# Birthday Website — Complete (Chapters 1–9 + Music Player)

## Setup (run locally)
```bash
npm install
npm run dev
```
Then open the local URL Vite prints (usually http://localhost:5173).

> This was built in an environment without internet access, so dependencies
> haven't been installed or run yet here — do that on your machine first.

## What's built so far
- **Animated background** (`src/components/background/AnimatedBackground.tsx`):
  deep purple gradient, two soft drifting glow blobs, and a canvas starfield
  with gentle twinkle. Respects `prefers-reduced-motion`.
- **Gift box** (`src/components/gift/GiftBox.tsx`): original SVG illustration
  (not traced from any reference) that floats, shakes on tap, pops its lid
  open, and bursts confetti + a glow. Fully keyboard-accessible button.
- **Hero/Gift chapter** (`src/sections/HeroGiftSection.tsx`): heading,
  subtitle, the gift, then reveals the "something my heart has been waiting
  to say" message card once opened.

- **Secret code chapter** (`src/sections/SecretCodeSection.tsx` +
  `src/components/ui/PinPad.tsx`): a lock icon, a hint, and a 4-digit
  PIN pad. Wrong code shakes and clears; correct code unlocks with a
  confetti burst and a "Continue" button.
- **Cake chapter** (`src/components/cake/Cake.tsx` + `src/sections/CakeSection.tsx`):
  an original two-tier SVG cake with piped frosting details and candles with
  flickering flames (subtle randomized scale animation, not a static icon).
  Tap any candle to blow it out, or tap "Blow into your mic" to grant mic
  access and blow them all out at once via `src/hooks/useMicBlow.ts` (listens
  for a volume spike, ~8s timeout, graceful "mic not available" fallback —
  tapping candles always works regardless of mic permission). Once every
  candle is out: confetti burst + wish-granted message + Continue.
- **Gallery chapter** (`src/components/gallery/PolaroidCard.tsx` +
  `src/sections/GallerySection.tsx`): one polaroid-style photo at a time,
  each with a slight tilt, a handwritten-style caption, and a progress-dot
  row. "Next Memory" advances; on the last one it becomes "Continue".
  Five soft gradient placeholder images are already in `public/photos/`
  so the layout looks right immediately — swap those files for real
  photos (same filenames) and edit captions in `content.ts`.
- **Pop the Wishes chapter** (`src/components/balloons/Balloon.tsx` +
  `src/sections/WishesSection.tsx`): a grid of gently bobbing SVG balloons;
  tapping one pops it (small confetti burst) and reveals one of the six
  wishes from `content.ts` below the grid. Once all are popped, Continue
  appears.
- **Puzzle chapter** (`src/components/puzzle/SlidingPuzzle.tsx` +
  `src/sections/PuzzleSection.tsx`): a classic 3×3 sliding tile puzzle
  built from one of the memory photos (`memory-3.jpg` by default — change
  in `content.ts`), shuffled via random valid slides so it's always
  solvable. Move counter, "Shuffle Again", and "Solve it for me" (snaps
  to solved). Solving triggers confetti and reveals "One Last Surprise".
- **Timeline chapter** (`src/components/timeline/TimelineCard.tsx` +
  `src/sections/TimelineSection.tsx`): the one chapter that isn't a
  single centered screen — a vertical connecting line with five
  milestone cards alternating left/right (stacked on mobile), each
  fading/sliding in as it scrolls into view. Dates/titles/descriptions
  are placeholders in `content.ts`, ready for your real milestones.
- **Love letter chapter** (`src/components/letter/Envelope.tsx` +
  `src/components/letter/LetterPaper.tsx` + `src/sections/LoveLetterSection.tsx`):
  a floating envelope with a wax-seal heart; tapping it plays the flap
  swinging open (real 3D `rotateX`, not a fake fade), then the full letter
  fades in with each paragraph and the signature staggered in one at a
  time. "Read it again" resets to the closed envelope. Greeting and
  signature reuse `site.recipientName` / `site.senderName` automatically.
- **Music player** (`src/components/player/MusicPlayer.tsx`): unlike the
  other chapters, this isn't a full-screen step — it's a persistent
  floating glass widget, bottom-right corner, visible across every
  chapter (mounted once in `App.tsx`). Play/pause, a clickable/seekable
  progress bar, and mute. Drop a real track at `public/audio/song.mp3`
  (or change the path in `content.ts`) — until then it shows a small
  "add a track here" hint instead of a broken player.
- **Fireworks finale** (`src/components/finale/Fireworks.tsx` +
  `src/components/finale/FloatingHearts.tsx` + `src/sections/FinaleSection.tsx`):
  canvas-based fireworks bursting at random spots on a loop, a stream of
  drifting heart/sparkle emoji, and the closing message + sign-off,
  staggered in. "Watch it again" resets the whole journey back to
  Chapter 1 (each chapter's local state resets naturally since the
  components remount).

## How chapters connect
`src/App.tsx` holds a small state machine (`chapter` state + `CHAPTERS`
list) and crossfades between chapter section components — it's not a long
scroll page, it's one chapter on screen at a time, like the reference.
Each section takes an `onContinue` prop it calls when the person is ready
to move on; `App.tsx` advances `chapter` in response. The music player is
the one exception — it's mounted globally and stays visible throughout.

## Before you share this with her — a checklist
All of it lives in `src/data/content.ts`:
1. Set `site.recipientName` / `site.senderName` for real (if not already).
2. Rewrite `secretCode.code` + `.hint` to something meaningful, or leave
   the default `0411`.
3. Swap the 5 files in `public/photos/` for real photos (same filenames,
   or update `memories` with new paths) and rewrite the captions.
4. Rewrite the 6 entries in `wishes`.
5. Point `puzzle.image` at whichever photo you want pieced together.
6. Rewrite the 5 `timeline` milestones with your real ones.
7. Rewrite `loveLetter.paragraphs` and `.signature` in your own words —
   this is the most personal chapter, worth the most editing time.
8. Drop a real song at `public/audio/song.mp3` (or update `music.src`).
9. Adjust `finale.title` / `.subtitle` / `.signOff` if you want something
   other than the defaults.

Then `npm install && npm run dev` to preview, and `npm run build` when
you're ready to deploy the `dist/` folder anywhere static (Vercel,
Netlify, GitHub Pages all work fine for this).
