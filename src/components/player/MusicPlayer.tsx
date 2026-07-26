import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';
import { music } from '../../data/content';

/**
 * Persistent floating player, glass-styled, bottom-corner — visible
 * across every chapter rather than being its own chapter. If no audio
 * file exists yet at `music.src` it fails gracefully into a small
 * "add a track" hint instead of a broken control.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackMissing, setTrackMissing] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onError = () => setTrackMissing(true);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || trackMissing) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setTrackMissing(true));
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-5 right-5 z-50 glass rounded-2xl px-4 py-3 flex items-center gap-3 max-w-[240px] shadow-glow-sm"
    >
      <audio ref={audioRef} src={music.src} loop preload="none" />

      <button
        onClick={toggle}
        disabled={trackMissing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="h-9 w-9 shrink-0 rounded-full bg-aura-500/30 flex items-center justify-center hover:bg-aura-500/50 transition-colors disabled:opacity-40"
      >
        {trackMissing ? <FiMusic /> : playing ? <FiPause /> : <FiPlay />}
      </button>

      <div className="min-w-0 flex-1">
        {trackMissing ? (
          <p className="text-xs text-white/40 leading-tight">
            Add a track at
            <br />
            <code className="text-white/60">public/audio/song.mp3</code>
          </p>
        ) : (
          <>
            <p className="text-xs font-medium truncate">{music.title}</p>
            <div
              onClick={seek}
              className="mt-1.5 h-1 rounded-full bg-white/15 cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-aura-400 to-blush-400"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </>
        )}
      </div>

      {!trackMissing && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {muted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      )}
    </motion.div>
  );
}
