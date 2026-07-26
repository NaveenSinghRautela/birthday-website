import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { puzzle as puzzleContent } from '../../data/content';

const GRID = 3;
const BLANK = 0;
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, BLANK];

type SlidingPuzzleProps = {
  image: string;
  onSolved?: () => void;
};

function isSolved(tiles: number[]) {
  return tiles.every((t, i) => t === SOLVED[i]);
}

function shuffledTiles(): number[] {
  let tiles = [...SOLVED];
  let blankIndex = tiles.indexOf(BLANK);
  // Perform random valid slides from the solved state — guarantees the
  // result is always solvable, unlike a fully random permutation.
  for (let i = 0; i < 120; i++) {
    const neighbors = neighborIndices(blankIndex);
    const swapWith = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[blankIndex], tiles[swapWith]] = [tiles[swapWith], tiles[blankIndex]];
    blankIndex = swapWith;
  }
  return isSolved(tiles) ? shuffledTiles() : tiles;
}

function neighborIndices(index: number): number[] {
  const row = Math.floor(index / GRID);
  const col = index % GRID;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - GRID);
  if (row < GRID - 1) neighbors.push(index + GRID);
  if (col > 0) neighbors.push(index - 1);
  if (col < GRID - 1) neighbors.push(index + 1);
  return neighbors;
}

function tileBackgroundPosition(tileValue: number) {
  const originalIndex = tileValue - 1; // tileValue 1..8 map to original cells 0..7
  const row = Math.floor(originalIndex / GRID);
  const col = originalIndex % GRID;
  return `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`;
}

export default function SlidingPuzzle({ image, onSolved }: SlidingPuzzleProps) {
  const [tiles, setTiles] = useState<number[]>(() => shuffledTiles());
  const [moves, setMoves] = useState(0);
  const solved = isSolved(tiles);

  useEffect(() => {
    if (solved) onSolved?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const trySlide = (index: number) => {
    if (solved) return;
    const blankIndex = tiles.indexOf(BLANK);
    if (!neighborIndices(blankIndex).includes(index)) return;
    const next = [...tiles];
    [next[blankIndex], next[index]] = [next[index], next[blankIndex]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  const shuffle = () => {
    setTiles(shuffledTiles());
    setMoves(0);
  };

  const solveForMe = () => {
    setTiles(SOLVED);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-white/40 mb-3">{moves} move{moves === 1 ? '' : 's'}</p>

      <div className="relative grid grid-cols-3 gap-1 w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden glass p-1">
        {tiles.map((value, index) =>
          value === BLANK ? (
            <div key="blank" className="rounded-md bg-black/20" />
          ) : (
            <motion.button
              key={value}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
              onClick={() => trySlide(index)}
              className="rounded-md bg-cover focus-visible:ring-2 focus-visible:ring-aura-400 outline-none"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: tileBackgroundPosition(value),
                gridRowStart: Math.floor(index / GRID) + 1,
                gridColumnStart: (index % GRID) + 1,
              }}
              aria-label={`Puzzle tile ${value}`}
            />
          ),
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={shuffle}
          className="rounded-full glass px-4 py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors"
        >
          {puzzleContent.shuffleLabel}
        </button>
        <button
          onClick={solveForMe}
          className="rounded-full glass px-4 py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors"
        >
          {puzzleContent.solveForMeLabel}
        </button>
      </div>
    </div>
  );
}
