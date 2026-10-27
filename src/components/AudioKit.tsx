import React, {useEffect, useState} from 'react';
import {Audio, Sequence, getRemotionEnvironment, staticFile} from 'remotion';
import {FPS} from '../timing';

// ── ভয়েসওভার প্রিভিউ ──────────────────────────────────────────────
// public/voiceover.mp3 থাকলে Studio-তে বাজে; না থাকলে নীরবে বাদ।
export const PLAY_VOICEOVER_IN_PREVIEW = true; // Studio প্রিভিউতে চালু/বন্ধ
export const PLAY_VOICEOVER_IN_RENDER = false; // রেন্ডারে ডিফল্টে বন্ধ (শুধু SFX থাকবে)

export const PreviewAudio: React.FC = () => {
  const [ready, setReady] = useState(false);
  const rendering = getRemotionEnvironment().isRendering;
  const enabled = rendering ? PLAY_VOICEOVER_IN_RENDER : PLAY_VOICEOVER_IN_PREVIEW;
  useEffect(() => {
    if (!enabled) return;
    let dead = false;
    fetch(staticFile('voiceover.mp3'), {method: 'HEAD'})
      .then((r) => {
        const ct = r.headers.get('content-type') || '';
        if (!dead && r.ok && /audio|mpeg|octet-stream/i.test(ct)) setReady(true);
      })
      .catch(() => undefined);
    return () => {
      dead = true;
    };
  }, [enabled]);
  if (!enabled || !ready) return null;
  return <Audio src={staticFile('voiceover.mp3')} volume={1} />;
};

// ── SFX (পরিষ্কার, ছোট, সংযত) ─────────────────────────────────────
export const SFX = {
  pop: {file: 'sfx/pop.wav', vol: 0.3, sec: 0.2},
  click: {file: 'sfx/click.wav', vol: 0.34, sec: 0.07},
  whoosh: {file: 'sfx/whoosh.wav', vol: 0.22, sec: 0.62},
  swipe: {file: 'sfx/swipe.wav', vol: 0.2, sec: 0.5},
  chime: {file: 'sfx/chime.wav', vol: 0.27, sec: 0.5},
  thud: {file: 'sfx/thud.wav', vol: 0.3, sec: 0.4},
} as const;
export type SfxType = keyof typeof SFX;

export const Sfx: React.FC<{at: number; type: SfxType; rate?: number; vol?: number}> = ({at, type, rate = 1, vol = 1}) => {
  const s = SFX[type];
  return (
    <Sequence from={Math.max(0, Math.round(at))} durationInFrames={Math.ceil((s.sec / rate) * FPS) + 3} layout="none">
      <Audio src={staticFile(s.file)} volume={s.vol * vol} playbackRate={rate} />
    </Sequence>
  );
};
