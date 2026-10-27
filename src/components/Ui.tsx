import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

export const Stage: React.FC<{pad?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({pad = 110, style, children}) => (
  <AbsoluteFill style={{boxSizing: 'border-box', padding: pad, fontFamily: theme.fonts.body, color: theme.colors.text, ...style}}>{children}</AbsoluteFill>
);

export const Card: React.FC<{style?: React.CSSProperties; dark?: boolean; children?: React.ReactNode}> = ({style, dark, children}) => (
  <div
    style={{
      background: dark ? theme.colors.primary : theme.colors.card,
      color: dark ? theme.colors.onPrimary : theme.colors.text,
      border: `1.5px solid ${dark ? 'rgba(246,241,231,0.14)' : theme.colors.line}`,
      borderRadius: theme.radius, boxShadow: theme.shadow, padding: 40, boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{children?: React.ReactNode; dark?: boolean; style?: React.CSSProperties}> = ({children, dark, style}) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 14, padding: '10px 28px', borderRadius: 999,
      fontFamily: theme.fonts.body, fontWeight: theme.weight.strong, fontSize: theme.size.label, lineHeight: 1.4,
      background: dark ? theme.colors.primary : theme.colors.accentSoft,
      color: dark ? theme.colors.onPrimary : theme.colors.primary,
      border: `1.5px solid ${dark ? 'transparent' : theme.colors.line}`, ...style,
    }}
  >
    {children}
  </div>
);

// প্রতিটি স্থির ছবিতে Ken Burns (ধীর zoom + pan), গোলাকার কার্ডে মাস্ক করা
export const Photo: React.FC<{
  src: string; w?: number | string; h?: number | string; radius?: number; zoomOut?: boolean; pos?: string;
  panX?: number; style?: React.CSSProperties; children?: React.ReactNode;
}> = ({src, w = '100%', h = '100%', radius = theme.radius, zoomOut, pos = 'center', panX = -22, style, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], zoomOut ? [1.18, 1.08] : [1.08, 1.18], {easing: theme.ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pan = interpolate(frame, [0, durationInFrames], [0, panX], {easing: theme.ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{width: w, height: h, borderRadius: radius, overflow: 'hidden', position: 'relative', boxShadow: theme.shadow, border: `1.5px solid ${theme.colors.line}`, ...style}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${t}) translateX(${pan}px)`}} />
      {children}
    </div>
  );
};
