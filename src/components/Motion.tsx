import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const useSpring = (delay = 0, cfg: keyof typeof theme.spring = 'smooth') => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: theme.spring[cfg]});
};

// ০ → ১ (bezier ইজিং, লিনিয়ার নয়)
export const useEase = (delay: number, dur: number, kind: 'out' | 'inOut' | 'in' = 'out') => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + dur], [0, 1], {easing: theme.ease[kind], ...clampOpts});
};

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

// প্রিমিয়াম এন্ট্রি: opacity + সরানো + scale একসাথে, সাথে idle ভাসা
export const Enter: React.FC<{
  delay?: number; dir?: Dir; dist?: number; from?: number; cfg?: keyof typeof theme.spring;
  float?: number; style?: React.CSSProperties; children?: React.ReactNode;
}> = ({delay = 0, dir = 'up', dist = 44, from = 0.94, cfg = 'smooth', float = 0, style, children}) => {
  const frame = useCurrentFrame();
  const p = useSpring(delay, cfg);
  const o = clamp01(p * 1.4);
  const dx = dir === 'left' ? -dist : dir === 'right' ? dist : 0;
  const dy = dir === 'up' ? dist : dir === 'down' ? -dist : 0;
  const idle = float ? Math.sin((frame - delay) / 28) * float * clamp01((frame - delay) / 20) : 0;
  return (
    <div
      style={{
        opacity: o,
        transform: `translate(${interpolate(p, [0, 1], [dx, 0])}px, ${interpolate(p, [0, 1], [dy, 0]) + idle}px) scale(${interpolate(p, [0, 1], [from, 1])})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ওয়ার্ড-বাই-ওয়ার্ড স্ট্যাগার্ড। শব্দ শুধু স্পেসে ভাঙে (বাংলা যুক্তাক্ষর অক্ষত)। *শব্দ* = হাইলাইট।
export const Words: React.FC<{
  text: string; delay?: number; per?: number; size?: number; weight?: number;
  color?: string; align?: 'left' | 'center' | 'right'; line?: number; hlColor?: string; style?: React.CSSProperties;
}> = ({text, delay = 0, per = 4, size = theme.size.h2, weight = theme.weight.hero, color = theme.colors.primary,
  align = 'left', line = 1.32, hlColor = theme.colors.accentSoft, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ').filter(Boolean);
  let inHl = false;
  return (
    <div
      style={{
        display: 'flex', flexWrap: 'wrap', columnGap: Math.round(size * 0.26), rowGap: Math.round(size * 0.04),
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        fontFamily: theme.fonts.display, fontSize: size, fontWeight: weight, color, lineHeight: line,
        letterSpacing: 0, ...style,
      }}
    >
      {words.map((w, i) => {
        // *বাক্যাংশ* — একাধিক শব্দ জুড়ে হাইলাইট চলে
        if (w.startsWith('*')) inHl = true;
        const hl = inHl;
        const label = w.replace(/\*/g, '');
        if (w.endsWith('*')) inHl = false;
        const p = spring({frame: frame - delay - i * per, fps, config: theme.spring.snappy});
        const sw = interpolate(frame, [delay + i * per + 6, delay + i * per + 22], [0, 1], {easing: theme.ease.out, ...clampOpts});
        return (
          <span
            key={i}
            style={{
              position: 'relative', display: 'inline-block', opacity: clamp01(p * 1.5),
              transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
            }}
          >
            {hl && (
              <span
                style={{
                  position: 'absolute', left: -10, right: -10, top: '18%', bottom: '8%', borderRadius: 14,
                  background: hlColor, transformOrigin: 'left center', transform: `scaleX(${sw})`, zIndex: 0,
                }}
              />
            )}
            <span style={{position: 'relative', zIndex: 1}}>{label}</span>
          </span>
        );
      })}
    </div>
  );
};

// লাইন মাস্ক রিভিল (প্যাডিং রাখা হয় যাতে বাংলা কার-চিহ্ন কাটা না পড়ে)
export const MaskLine: React.FC<{delay?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({delay = 0, style, children}) => {
  const p = useEase(delay, 22, 'out');
  return (
    <div style={{overflow: 'hidden', padding: '0.22em 0.12em', margin: '-0.22em -0.12em', ...style}}>
      <div style={{transform: `translateY(${interpolate(p, [0, 1], [112, 0])}%) scale(${interpolate(p, [0, 1], [0.97, 1])})`, opacity: clamp01(p * 2)}}>
        {children}
      </div>
    </div>
  );
};

// অ্যানিমেটেড কাটা দাগ (strikethrough)
export const Struck: React.FC<{delay: number; thick?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({delay, thick = 7, children, style}) => {
  const p = useEase(delay, 14, 'out');
  return (
    <span style={{position: 'relative', display: 'inline-block', ...style}}>
      <span style={{opacity: interpolate(p, [0, 1], [1, 0.5])}}>{children}</span>
      <span
        style={{
          position: 'absolute', left: -6, right: -6, top: '55%', height: thick, borderRadius: thick,
          background: theme.colors.accent, transformOrigin: 'left center', transform: `scaleX(${p})`,
        }}
      />
    </span>
  );
};

// SVG পাথ আঁকা (pathLength=1 দিয়ে স্বাভাবিকীকৃত)
export const DrawPath: React.FC<{d: string; delay?: number; dur?: number; color?: string; width?: number; opacity?: number}> = ({
  d, delay = 0, dur = 36, color = theme.colors.primary, width = 8, opacity = 1,
}) => {
  const p = useEase(delay, dur, 'inOut');
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"
      pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={opacity} />
  );
};

// কাউন্টার রোল (শুধু স্ক্রিপ্টের সংখ্যা)
export const Counter: React.FC<{from: number; to: number; delay: number; dur?: number; style?: React.CSSProperties}> = ({from, to, delay, dur = 40, style}) => {
  const p = useEase(delay, dur, 'inOut');
  return <span style={{fontVariantNumeric: 'tabular-nums', ...style}}>{toBn(Math.round(from + (to - from) * p))}</span>;
};
