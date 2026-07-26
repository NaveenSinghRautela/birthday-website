import { useCallback, useRef, useState } from 'react';

type MicBlowStatus = 'idle' | 'listening' | 'unavailable';

/**
 * Requests mic access, watches input volume for a short window, and
 * calls onBlow if it sees a loud sustained burst (roughly what blowing
 * into a laptop/phone mic produces). Cleans itself up after one attempt.
 */
export function useMicBlow(onBlow: () => void) {
  const [status, setStatus] = useState<MicBlowStatus>('idle');
  const stopRef = useRef<() => void>();

  const listen = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unavailable');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx: AudioContext = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      setStatus('listening');

      let rafId: number;
      let done = false;
      const THRESHOLD = 55; // empirical: a clear blow/exhale spikes average amplitude
      const started = performance.now();

      const tick = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > THRESHOLD && !done) {
          done = true;
          onBlow();
          cleanup();
          return;
        }
        if (performance.now() - started > 8000) {
          cleanup();
          return;
        }
        rafId = requestAnimationFrame(tick);
      };

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        stream.getTracks().forEach((t) => t.stop());
        ctx.close();
        setStatus('idle');
      };
      stopRef.current = cleanup;
      rafId = requestAnimationFrame(tick);
    } catch {
      setStatus('unavailable');
    }
  }, [onBlow]);

  return { status, listen };
}
