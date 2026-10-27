import React from 'react';
import {theme} from '../theme';

type P = {size?: number; color?: string; fill?: string; sw?: number; style?: React.CSSProperties};

const Svg: React.FC<P & {vb?: string; children?: React.ReactNode}> = ({size = 80, vb = '0 0 100 100', style, children}) => (
  <svg width={size} height={size} viewBox={vb} style={{display: 'block', overflow: 'visible', ...style}}>
    {children}
  </svg>
);
const S = (c: string, sw: number) => ({stroke: c, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const});

export const Flame: React.FC<P> = ({size = 120, color = theme.colors.accent, fill = theme.colors.accent, sw = 0, style}) => (
  <Svg size={size} vb="0 0 100 130" style={style}>
    <path d="M50 6 C58 30 86 46 86 82 C86 108 68 124 50 124 C32 124 14 108 14 82 C14 62 26 52 34 38 C38 52 44 56 48 58 C46 40 44 22 50 6 Z" fill={fill} {...S(color, sw)} />
    <path d="M50 66 C56 80 68 86 68 100 C68 112 60 120 50 120 C40 120 32 112 32 100 C32 90 42 84 50 66 Z" fill={theme.colors.bg} opacity={0.85} />
  </Svg>
);
export const Check: React.FC<P> = ({size = 60, color = theme.colors.primary, sw = 12, style}) => (
  <Svg size={size} style={style}><path d="M18 54 L42 76 L84 26" fill="none" {...S(color, sw)} /></Svg>
);
export const Cross: React.FC<P> = ({size = 60, color = theme.colors.primary, sw = 12, style}) => (
  <Svg size={size} style={style}><path d="M24 24 L76 76 M76 24 L24 76" fill="none" {...S(color, sw)} /></Svg>
);
export const Bell: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = 'none', sw = 7, style}) => (
  <Svg size={size} style={style}>
    <path d="M50 12 C34 12 24 26 24 44 L24 60 L14 76 L86 76 L76 60 L76 44 C76 26 66 12 50 12 Z" fill={fill} {...S(color, sw)} />
    <path d="M40 86 C42 94 58 94 60 86" fill="none" {...S(color, sw)} />
  </Svg>
);
export const Phone: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = 'none', sw = 7, style}) => (
  <Svg size={size} style={style}>
    <rect x="28" y="8" width="44" height="84" rx="10" fill={fill} {...S(color, sw)} />
    <path d="M44 80 L56 80" {...S(color, sw)} />
  </Svg>
);
export const Play: React.FC<P> = ({size = 80, color = theme.colors.primary, fill = theme.colors.primary, sw = 6, style}) => (
  <Svg size={size} style={style}><path d="M32 18 L82 50 L32 82 Z" fill={fill} {...S(color, sw)} /></Svg>
);
export const Sun: React.FC<P> = ({size = 120, color = theme.colors.accent, fill = theme.colors.accent, sw = 7, style}) => (
  <Svg size={size} style={style}>
    <circle cx="50" cy="50" r="18" fill={fill} {...S(color, sw)} />
    {Array.from({length: 8}).map((_, i) => {
      const a = (i * Math.PI) / 4;
      return <path key={i} d={`M${50 + Math.cos(a) * 30} ${50 + Math.sin(a) * 30} L${50 + Math.cos(a) * 42} ${50 + Math.sin(a) * 42}`} {...S(color, sw)} />;
    })}
  </Svg>
);
export const RainCloud: React.FC<P> = ({size = 120, color = theme.colors.primary, fill = theme.colors.cardSolid, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M28 60 C14 60 12 42 26 38 C26 22 48 18 56 32 C70 26 84 38 78 54 C90 58 88 72 74 72 L30 72 C18 72 16 62 28 60 Z" fill={fill} {...S(color, sw)} />
    <path d="M34 82 L28 94 M52 82 L46 94 M70 82 L64 94" {...S(color, sw)} />
  </Svg>
);
export const House: React.FC<P> = ({size = 160, color = theme.colors.primary, fill = theme.colors.cardSolid, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M12 48 L50 14 L88 48" fill="none" {...S(color, sw)} />
    <path d="M22 44 L22 86 L78 86 L78 44" fill={fill} {...S(color, sw)} />
    <rect x="42" y="58" width="16" height="28" rx="3" fill={color} />
  </Svg>
);
export const Toothbrush: React.FC<P> = ({size = 140, color = theme.colors.primary, fill = theme.colors.accent, sw = 5, style}) => (
  <Svg size={size} style={style}>
    <rect x="4" y="46" width="66" height="12" rx="6" fill={theme.colors.cardSolid} {...S(color, sw)} />
    <rect x="60" y="36" width="36" height="22" rx="7" fill={fill} {...S(color, sw)} />
    <path d="M66 36 L66 22 M74 36 L74 20 M82 36 L82 20 M90 36 L90 22" {...S(color, sw)} />
  </Svg>
);
export const Pin: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = theme.colors.accent, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M50 92 C28 66 22 54 22 40 C22 24 34 12 50 12 C66 12 78 24 78 40 C78 54 72 66 50 92 Z" fill={fill} {...S(color, sw)} />
    <circle cx="50" cy="40" r="10" fill={theme.colors.cardSolid} />
  </Svg>
);
export const Repeat: React.FC<P> = ({size = 90, color = theme.colors.primary, sw = 8, style}) => (
  <Svg size={size} style={style}>
    <path d="M20 44 L20 36 C20 28 26 24 34 24 L78 24 M66 12 L78 24 L66 36" fill="none" {...S(color, sw)} />
    <path d="M80 56 L80 64 C80 72 74 76 66 76 L22 76 M34 88 L22 76 L34 64" fill="none" {...S(color, sw)} />
  </Svg>
);
export const Moon: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = theme.colors.accent, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M66 14 C40 16 22 36 24 60 C26 82 46 94 66 90 C48 80 44 52 56 34 C60 26 64 20 66 14 Z" fill={fill} {...S(color, sw)} />
  </Svg>
);
export const Pulse: React.FC<P> = ({size = 90, color = theme.colors.primary, sw = 7, style}) => (
  <Svg size={size} style={style}><path d="M6 54 L26 54 L36 24 L52 82 L62 44 L70 54 L94 54" fill="none" {...S(color, sw)} /></Svg>
);
export const Apple: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = theme.colors.accent, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M50 30 C36 18 14 28 16 52 C18 74 34 90 50 84 C66 90 82 74 84 52 C86 28 64 18 50 30 Z" fill={fill} {...S(color, sw)} />
    <path d="M50 30 C50 20 54 14 62 10" fill="none" {...S(color, sw)} />
  </Svg>
);
export const Sparkle: React.FC<P> = ({size = 90, color = theme.colors.accent, fill = theme.colors.accent, sw = 4, style}) => (
  <Svg size={size} style={style}>
    <path d="M50 6 C54 34 66 46 94 50 C66 54 54 66 50 94 C46 66 34 54 6 50 C34 46 46 34 50 6 Z" fill={fill} {...S(color, sw)} />
  </Svg>
);
export const Book: React.FC<P> = ({size = 110, color = theme.colors.primary, fill = theme.colors.cardSolid, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M14 18 L50 26 L86 18 L86 78 L50 86 L14 78 Z" fill={fill} {...S(color, sw)} />
    <path d="M50 26 L50 86" {...S(color, sw)} />
  </Svg>
);
export const Flag: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = theme.colors.accent, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M26 10 L26 92" {...S(color, sw + 2)} />
    <path d="M26 14 L78 14 L66 32 L78 50 L26 50 Z" fill={fill} {...S(color, sw)} />
  </Svg>
);
export const Bulb: React.FC<P> = ({size = 90, color = theme.colors.primary, fill = theme.colors.accent, sw = 6, style}) => (
  <Svg size={size} style={style}>
    <path d="M50 10 C30 10 20 26 22 42 C24 54 34 60 36 70 L64 70 C66 60 76 54 78 42 C80 26 70 10 50 10 Z" fill={fill} {...S(color, sw)} />
    <path d="M38 80 L62 80 M42 90 L58 90" {...S(color, sw)} />
  </Svg>
);
