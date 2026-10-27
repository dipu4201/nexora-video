import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// স্তর ১: ব্যাকগ্রাউন্ড মেশ (কখনো ফ্ল্যাট রং নয়)
export const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 80) * 60;
  const d2 = Math.cos(frame / 95) * 50;
  return (
    <AbsoluteFill style={{background: theme.colors.bg}}>
      <div
        style={{
          position: 'absolute', width: 1300, height: 1300, borderRadius: '50%',
          top: -560, left: -320 + d1, filter: 'blur(60px)',
          background: `radial-gradient(circle, ${theme.colors.accentSoft}, transparent 62%)`,
        }}
      />
      <div
        style={{
          position: 'absolute', width: 1100, height: 1100, borderRadius: '50%',
          bottom: -520, right: -280 - d2, filter: 'blur(70px)',
          background: `radial-gradient(circle, ${theme.colors.primarySoft}, transparent 64%)`,
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          backgroundImage: `radial-gradient(${theme.colors.line} 1.6px, transparent 1.7px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, transparent 35%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 35%, black 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// স্তর ৪: কালার গ্রেড (কনটেন্টের উপরে)
export const Grade: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{backgroundColor: theme.colors.primary, mixBlendMode: 'soft-light', opacity: 0.12}} />
    <AbsoluteFill
      style={{background: 'linear-gradient(180deg, rgba(31,42,68,0.08), transparent 26%, transparent 74%, rgba(31,42,68,0.12))'}}
    />
  </AbsoluteFill>
);

// স্তর ৫ক: গ্রেইন
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none', backgroundImage: noise, backgroundSize: '220px',
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.06, mixBlendMode: 'multiply',
      }}
    />
  );
};

// স্তর ৫খ: ভিনিয়েট
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: `radial-gradient(ellipse at center, transparent 58%, ${theme.colors.vignette} 100%)`,
    }}
  />
);
