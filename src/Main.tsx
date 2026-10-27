import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from './theme';
import {SceneCtx} from './scene';
import {SCENES} from './scenes';
import {LEAD, TOTAL_FRAMES, TRANS, cueStart} from './timing';
import {BgMesh, Grade, Grain, Vignette} from './components/Layers';
import {PreviewAudio, Sfx} from './components/AudioKit';

const starts = SCENES.map((s, i) => (i === 0 ? 0 : Math.max(0, cueStart(s.from) - LEAD)));
const durs = SCENES.map((_, i) => (i === SCENES.length - 1 ? TOTAL_FRAMES - starts[i] : starts[i + 1] - starts[i] + TRANS));

// সিন-এক্সিট: এন্ট্রির চেয়ে দ্রুত (১০ ফ্রেম), শেষ সিনে নয়
const Shell: React.FC<{last: boolean; children?: React.ReactNode}> = ({last, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = last ? 0 : interpolate(frame, [durationInFrames - TRANS, durationInFrames - 1], [0, 1], {
    easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{opacity: 1 - p, transform: `translateY(${-34 * p}px) scale(${1 - 0.02 * p})`}}>{children}</AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
    <BgMesh />
    {SCENES.map((s, i) => (
      <Sequence key={s.id} from={starts[i]} durationInFrames={durs[i]}>
        <SceneCtx.Provider value={{start: starts[i], dur: durs[i], from: s.from, to: s.to}}>
          <Shell last={i === SCENES.length - 1}>
            <s.C />
          </Shell>
        </SceneCtx.Provider>
      </Sequence>
    ))}
    <Grade />
    <Grain />
    <Vignette />
    {SCENES.map((s, i) =>
      i === 0 ? null : <Sfx key={s.id} at={starts[i]} type="swipe" rate={0.94 + ((i * 7) % 5) * 0.03} />,
    )}
    <PreviewAudio />
  </AbsoluteFill>
);
