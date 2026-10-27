// theme.ts — রং, ইজিং, spring প্রিসেট ও ফন্টের একমাত্র উৎস। কম্পোনেন্টে সরাসরি হেক্স নয়।
import {Easing} from 'remotion';

export const theme = {
  colors: {
    // স্কিম ৩ — Dawn Clarity
    bg: '#F6F1E7',
    bgAlt: '#EDE4D1',
    primary: '#1F2A44', // হিরো (প্রতি ফ্রেমে সর্বোচ্চ একটি জোরালো উপাদান)
    accent: '#D9902F',
    text: '#1B1F2A',
    textDim: 'rgba(27,31,42,0.62)',
    textFaint: 'rgba(27,31,42,0.30)',
    onPrimary: '#F6F1E7',
    card: 'rgba(255,252,246,0.88)',
    cardSolid: '#FFFCF6',
    line: 'rgba(31,42,68,0.14)',
    accentSoft: 'rgba(217,144,47,0.22)',
    accentGlow: 'rgba(217,144,47,0.45)',
    primarySoft: 'rgba(31,42,68,0.08)',
    vignette: 'rgba(31,42,68,0.22)',
    shadow: 'rgba(31,42,68,0.34)',
  },
  fonts: {
    display: '"Hind Siliguri", "Noto Sans Bengali", "FreeSans", sans-serif',
    body: '"Hind Siliguri", "Noto Sans Bengali", "FreeSans", sans-serif',
  },
  weight: {hero: 700, strong: 600, body: 500},
  size: {h1: 148, h2: 108, h3: 76, body: 54, label: 38, small: 30},
  radius: 36,
  shadow: '0 36px 70px -28px rgba(31,42,68,0.38), 0 6px 18px -8px rgba(31,42,68,0.18)',
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: {damping: 14, stiffness: 160, mass: 0.6},
    smooth: {damping: 20, stiffness: 90, mass: 1},
    bouncy: {damping: 11, stiffness: 170, mass: 0.7},
  },
} as const;
