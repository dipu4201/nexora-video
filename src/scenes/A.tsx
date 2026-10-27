import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {useScene} from '../scene';
import {Card, Chip, Photo, Stage} from '../components/Ui';
import {Counter, DrawPath, Enter, MaskLine, Struck, Words, clamp01, useEase, useSpring} from '../components/Motion';
import {Apple, Bell, Check, Cross, Flame, Moon, Phone, Play, Sparkle} from '../components/Icons';
import {Sfx} from '../components/AudioKit';

const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ১ — হুক: Kinetic Typography + ছবির উপরে (cue 1–3)
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const blink = f % 30 < 18 ? 1 : 0.25;
  return (
    <AbsoluteFill>
      <Photo src="images/night-phone.jpg" radius={0} pos="70% 50%" style={{position: 'absolute', inset: 0, boxShadow: 'none', border: 'none'}} />
      <AbsoluteFill style={{background: `linear-gradient(90deg, ${theme.colors.primary}F2 0%, ${theme.colors.primary}B3 45%, transparent 85%)`}} />
      <Stage>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 30, width: 1000}}>
          <Enter delay={at(1)} dir="down" dist={30}>
            <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 92, color: theme.colors.accent, letterSpacing: 0, fontVariantNumeric: 'tabular-nums'}}>
              ০২<span style={{opacity: blink}}>:</span>০০
            </div>
          </Enter>
          <Words text="রাত দুটো বাজে।" delay={at(1) + 6} per={7} size={156} color={theme.colors.onPrimary} />
          <Enter delay={at(2)} dir="up">
            <Chip style={{background: 'rgba(246,241,231,0.14)', color: theme.colors.onPrimary, border: '1.5px solid rgba(246,241,231,0.25)', fontSize: 44, padding: '14px 34px'}}>
              <Play size={44} color={theme.colors.accent} fill={theme.colors.accent} /> মোটিভেশনাল ভিডিও
            </Chip>
          </Enter>
          <div style={{marginTop: 6}}>
            <Words text="ভিডিও শেষ হলো।" delay={at(3)} per={6} size={80} weight={theme.weight.strong} color={theme.colors.onPrimary} />
          </div>
        </div>
      </Stage>
      <Sfx at={at(1) + 4} type="thud" />
      <Sfx at={at(2)} type="pop" />
      <Sfx at={at(3)} type="click" />
    </AbsoluteFill>
  );
};

// ২ — Glossy UI Mockup + Glass Cards: ফোনে ভিডিও শেষ, আগুন জ্বলে ওঠে, তিন শপথ (cue 4–6)
export const FlameVideo: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const fp = useSpring(at(4), 'bouncy');
  const pulse = 1 + Math.sin(f / 7) * 0.035;
  const hide4 = useEase(at(5) - 6, 10, 'in');
  const pledges = ['ভোরে উঠবো', 'পড়তে বসবো', 'নতুন জীবন শুরু'];
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 120}}>
        <div style={{position: 'relative', width: 520, height: 860, flexShrink: 0}}>
          <div style={{position: 'absolute', left: 60, bottom: 160, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${theme.colors.accentGlow}, transparent 68%)`, opacity: fp}} />
          <Enter delay={at(4) - 6} dir="up" float={5} style={{position: 'absolute', left: 60, bottom: 0}}>
            <Card dark style={{width: 400, height: 760, padding: 22, borderRadius: 64}}>
              <div style={{width: '100%', height: '100%', borderRadius: 44, background: 'rgba(246,241,231,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 32, boxSizing: 'border-box', gap: 26}}>
                <div style={{width: 120, height: 120, borderRadius: '50%', background: 'rgba(246,241,231,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Play size={56} color={theme.colors.onPrimary} fill={theme.colors.onPrimary} />
                </div>
                <div style={{width: '100%', height: 10, borderRadius: 10, background: 'rgba(246,241,231,0.2)', overflow: 'hidden'}}>
                  <div style={{width: '100%', height: '100%', background: theme.colors.accent}} />
                </div>
              </div>
            </Card>
          </Enter>
          <div style={{position: 'absolute', left: 130, bottom: 330, transform: `scale(${fp * pulse}) translateY(${(1 - fp) * 80}px)`, transformOrigin: '50% 100%', opacity: fp, filter: `drop-shadow(0 0 40px ${theme.colors.accentGlow})`}}>
            <Flame size={260} />
          </div>
        </div>
        <div style={{flex: 1, position: 'relative', height: 760}}>
          <div style={{position: 'absolute', top: 40, left: 0, right: 0, opacity: 1 - hide4, transform: `translateY(${-24 * hide4}px)`}}>
            <Words text="বুকের ভেতরটা যেন *জ্বলে উঠলো*" delay={at(4) + 8} per={5} size={96} />
          </div>
          <div style={{position: 'absolute', top: 40, left: 0, right: 0}}>
            <Words text="আজ থেকেই *সব বদলে* যাবে" delay={at(5)} per={5} size={104} />
          </div>
          <div style={{position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 26}}>
            {pledges.map((p, i) => (
              <Enter key={p} delay={at(6) + Math.round((i * len(6)) / 3)} dir="right" dist={60}>
                <Card style={{display: 'flex', alignItems: 'center', gap: 30, padding: '24px 36px'}}>
                  <div style={{width: 58, height: 58, borderRadius: 18, border: `4px solid ${theme.colors.primary}`}} />
                  <span style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.strong, fontSize: 58, color: theme.colors.text}}>{p}</span>
                </Card>
              </Enter>
            ))}
          </div>
        </div>
      </div>
      <Sfx at={at(4)} type="pop" />
      <Sfx at={at(5)} type="whoosh" rate={1.05} />
      {pledges.map((p, i) => <Sfx key={p} at={at(6) + Math.round((i * len(6)) / 3)} type="pop" rate={1 + i * 0.06} vol={0.8} />)}
    </Stage>
  );
};

// ৩ — Glossy UI Mockup: অ্যালার্ম বাজে → ফোন বন্ধ → চোখ বোজে (cue 7–9)
export const Alarm: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const off = useEase(at(8), 14, 'out');
  const eye = useEase(at(9), 16, 'out');
  const ring = (1 - off) * Math.sin(f * 1.1) * 14 * clamp01((f - at(7)) / 8);
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 90}}>
        <div style={{width: 760, display: 'flex', flexDirection: 'column', gap: 36}}>
          <Words text="কিন্তু পরদিন সকালে *অ্যালার্ম* বাজলো" delay={at(7)} per={5} size={92} />
          <Enter delay={at(8)} dir="up">
            <Chip dark style={{fontSize: 44}}>ফোন বন্ধ</Chip>
          </Enter>
          <MaskLine delay={at(9)}>
            <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 88, color: theme.colors.primary, lineHeight: 1.4}}>আবার চোখ বুজলো</div>
          </MaskLine>
        </div>
        <Enter delay={at(7) - 4} dir="left" dist={90} float={4} style={{flex: 1}}>
          <Card style={{height: 560, padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 1 - eye * 0.35, filter: `saturate(${1 - eye * 0.6})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
              <div style={{position: 'relative', width: 200, height: 200, borderRadius: 56, background: theme.colors.primarySoft}}>
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - eye, transform: `rotate(${ring}deg)`, transformOrigin: '50% 20%'}}>
                  <Bell size={130} color={theme.colors.primary} fill={off < 0.5 ? theme.colors.accent : 'none'} />
                </div>
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: eye, transform: `scale(${0.8 + eye * 0.2})`}}>
                  <svg width={130} height={130} viewBox="0 0 100 100">
                    <path d="M12 44 Q50 78 88 44" fill="none" stroke={theme.colors.primary} strokeWidth={7} strokeLinecap="round" />
                    <path d="M26 60 L20 74 M50 68 L50 84 M74 60 L80 74" fill="none" stroke={theme.colors.primary} strokeWidth={7} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div style={{fontFamily: theme.fonts.display, fontSize: 96, fontWeight: theme.weight.hero, color: theme.colors.text}}>অ্যালার্ম</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Chip style={{fontSize: 52, padding: '10px 36px'}}>সকাল</Chip>
              <div style={{width: 190, height: 96, borderRadius: 96, background: off < 0.5 ? theme.colors.accent : theme.colors.line, position: 'relative', transition: 'none'}}>
                <div style={{position: 'absolute', top: 9, left: interpolate(off, [0, 1], [102, 9]), width: 78, height: 78, borderRadius: '50%', background: theme.colors.cardSolid, boxShadow: theme.shadow}} />
              </div>
            </div>
          </Card>
        </Enter>
      </div>
      <Sfx at={at(7)} type="pop" />
      <Sfx at={at(8)} type="click" />
      <Sfx at={at(9)} type="whoosh" rate={0.9} vol={0.7} />
    </Stage>
  );
};

// ৪ — Statement Card: আগুন নিভে যায় (cue 10)
export const LostFire: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const die = useEase(at(10) + Math.round(len(10) * 0.45), 26, 'inOut');
  const flick = 1 + Math.sin(f / 5) * 0.04 * (1 - die);
  return (
    <Stage style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
        <Enter delay={at(10)} cfg="bouncy" dir="up">
          <div style={{transform: `scale(${flick * (1 - die * 0.78)})`, transformOrigin: '50% 100%', opacity: 1 - die * 0.7, filter: `drop-shadow(0 0 ${50 * (1 - die)}px ${theme.colors.accentGlow}) grayscale(${die})`}}>
            <Flame size={330} />
          </div>
        </Enter>
        <Words text="রাতের সেই আগুনটা" delay={at(10) + 10} per={5} size={128} align="center" />
        <Words text="*গেল কোথায়?*" delay={at(10) + 28} per={7} size={156} align="center" />
      </div>
      <Sfx at={at(10)} type="chime" />
    </Stage>
  );
};

// ৫ — Kinetic + Before/After: অনুপ্রেরণা নয়, শৃঙ্খলা (cue 11–12)
export const Agenda: React.FC = () => {
  const {at} = useScene();
  const out = useEase(at(12) - 8, 12, 'in');
  return (
    <Stage>
      <div style={{position: 'absolute', left: 110, top: 0, bottom: 0, width: 1050, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34, opacity: 1 - out, transform: `translateY(${-30 * out}px)`}}>
        <Enter delay={at(11)} dir="down" dist={24}><Chip style={{alignSelf: 'flex-start'}}>আজকের ভিডিওতে</Chip></Enter>
        <Words text="এই প্রশ্নের *উত্তর* খুঁজবো" delay={at(11) + 8} per={6} size={134} />
      </div>
      <div style={{position: 'absolute', right: 150, top: 230, opacity: 1 - out, transform: `translateY(${-30 * out}px)`}}>
        <Enter delay={at(11) + 4} cfg="bouncy" from={0.6} float={6}>
          <div style={{width: 470, height: 470, borderRadius: '50%', background: theme.colors.primary, boxShadow: `0 0 100px ${theme.colors.accentGlow}, ${theme.shadow}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 340, lineHeight: 1.2, color: theme.colors.accent}}>?</span>
          </div>
        </Enter>
      </div>
      <div style={{position: 'absolute', left: 110, right: 110, top: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70}}>
        <Enter delay={at(12) + 4} dir="left" dist={70}>
          <Card style={{width: 700, height: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
            <Cross size={90} />
            <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 104, color: theme.colors.textDim}}>
              <Struck delay={at(12) + 30}>অনুপ্রেরণা</Struck>
            </div>
          </Card>
        </Enter>
        <Enter delay={at(12) + 14} dir="right" dist={70} float={5}>
          <Card dark style={{width: 700, height: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <Check size={90} color={theme.colors.accent} />
            <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 118, color: theme.colors.onPrimary}}>শৃঙ্খলা</div>
          </Card>
        </Enter>
      </div>
      <div style={{position: 'absolute', left: 110, right: 110, bottom: 130, display: 'flex', justifyContent: 'center'}}>
        <Enter delay={at(12) + 36} dir="up"><Chip dark style={{fontSize: 48, padding: '14px 40px'}}>তোমাকে বদলাতে পারে</Chip></Enter>
      </div>
      <Sfx at={at(11)} type="whoosh" />
      <Sfx at={at(12) + 4} type="pop" />
      <Sfx at={at(12) + 30} type="click" />
      <Sfx at={at(12) + 14} type="pop" rate={1.1} vol={0.8} />
    </Stage>
  );
};

// ৬ — Venn: আরিফের গল্প ∩ তোমার গল্প (cue 13)
export const Venn: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const cx1 = 760, cx2 = 1160, cy = 520, r = 330;
  const k = useEase(at(13) + Math.round(len(13) * 0.35), 30, 'inOut');
  const dx = interpolate(k, [0, 1], [150, 0]);
  const lens = useSpring(at(13) + Math.round(len(13) * 0.5), 'bouncy');
  const circle = (x: number) => `M${x - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
  return (
    <Stage pad={0}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(${-dx} 0)`}>
          <circle cx={cx1} cy={cy} r={r} fill={theme.colors.primarySoft} opacity={useEase(at(13), 20)} />
          <DrawPath d={circle(cx1)} delay={at(13)} dur={34} width={8} />
        </g>
        <g transform={`translate(${dx} 0)`}>
          <circle cx={cx2} cy={cy} r={r} fill={theme.colors.accentSoft} opacity={useEase(at(13) + 8, 20)} />
          <DrawPath d={circle(cx2)} delay={at(13) + 8} dur={34} color={theme.colors.accent} width={8} />
        </g>
      </svg>
      <div style={{position: 'absolute', left: cx1 - dx - 290, top: cy - 90, width: 290, textAlign: 'center'}}>
        <Enter delay={at(13) + 14}><div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 64, lineHeight: 1.3, color: theme.colors.primary}}>আরিফের<br />গল্প</div></Enter>
      </div>
      <div style={{position: 'absolute', left: cx2 + dx, top: cy - 90, width: 290, textAlign: 'center'}}>
        <Enter delay={at(13) + 22}><div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 64, lineHeight: 1.3, color: theme.colors.primary}}>তোমার<br />গল্প</div></Enter>
      </div>
      <div style={{position: 'absolute', left: 960 - 130, top: cy - 70, width: 260, textAlign: 'center', transform: `scale(${lens})`, opacity: clamp01(lens)}}>
        <Sparkle size={64} />
        <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 48, color: theme.colors.text, marginTop: 6}}>মিলে যায়</div>
      </div>
      <Sfx at={at(13)} type="whoosh" rate={0.95} />
      <Sfx at={at(13) + Math.round(len(13) * 0.5)} type="chime" />
    </Stage>
  );
};

// ৭ — Photo + Glass Cards: প্রথম দিন, পুরো উদ্যমে (cue 14–15)
export const Day1: React.FC = () => {
  const {at, len} = useScene();
  const items = ['রুটিন বানায়', 'নোটবুক সাজায়', 'নোটিফিকেশন বন্ধ'];
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 90}}>
        <Enter delay={at(14) - 4} dir="left" dist={80} style={{width: 860, height: 700, flexShrink: 0}}>
          <Photo src="images/morning-journal.jpg" w={860} h={700} pos="50% 50%" panX={-20} zoomOut />
        </Enter>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 30}}>
          <Enter delay={at(14)} dir="down" dist={24}><Chip dark>প্রথম দিন</Chip></Enter>
          <Words text="সে শুরু করে *পুরো উদ্যমে*" delay={at(14) + 6} per={5} size={84} />
          <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 14}}>
            {items.map((t, i) => {
              const d = at(15) + Math.round((i * len(15)) / 3);
              return (
                <Enter key={t} delay={d} dir="right" dist={56}>
                  <Card style={{display: 'flex', alignItems: 'center', gap: 28, padding: '22px 34px'}}>
                    <div style={{width: 64, height: 64, borderRadius: 20, background: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${useSpring(d + 8, 'bouncy')})`}}>
                      <Check size={40} color={theme.colors.onPrimary} />
                    </div>
                    <span style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.strong, fontSize: 56}}>{t}</span>
                  </Card>
                </Enter>
              );
            })}
          </div>
        </div>
      </div>
      <Sfx at={at(14)} type="pop" />
      {items.map((t, i) => <Sfx key={t} at={at(15) + Math.round((i * len(15)) / 3) + 8} type="click" rate={1 + i * 0.05} vol={0.8} />)}
    </Stage>
  );
};

// ৮ — Data-like Bars (সংখ্যাহীন): উদ্যম কমে আসে, "কাল" আসে না (cue 16–19)
export const Decline: React.FC = () => {
  const {at} = useScene();
  const bars = [
    {label: 'প্রথম দিন', h: 460, d: at(16) - 2},
    {label: 'দ্বিতীয় দিন', h: 310, d: at(16) + 6},
    {label: 'তৃতীয় দিন', h: 140, d: at(17)},
  ];
  const fly = useEase(at(19) + 16, 22, 'in');
  return (
    <Stage>
      <div style={{position: 'absolute', left: 130, bottom: 160, display: 'flex', alignItems: 'flex-end', gap: 56}}>
        {bars.map((b, i) => {
          const g = useEase(b.d, 26, 'out');
          return (
            <div key={b.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
              <div style={{width: 180, height: b.h * g, borderRadius: 30, background: i === 2 ? theme.colors.textFaint : i === 0 ? theme.colors.primary : theme.colors.accent, boxShadow: theme.shadow}} />
              <Enter delay={b.d + 6} dir="up" dist={20}><div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.strong, fontSize: 42, color: theme.colors.text}}>{b.label}</div></Enter>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 130, top: 130, width: 820}}>
        <Enter delay={at(18)} dir="left" dist={60} cfg="bouncy">
          <Card style={{padding: '34px 44px', borderRadius: 48}}>
            <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 64, lineHeight: 1.4, color: theme.colors.primary}}>
              আজ একটু বিশ্রাম নিই, <span style={{background: theme.colors.accentSoft, padding: '0 10px', borderRadius: 12}}>কাল থেকে</span> আবার।
            </div>
          </Card>
        </Enter>
      </div>
      <div style={{position: 'absolute', right: 250, top: 480, display: 'flex', alignItems: 'center', gap: 40, transform: `translateX(${fly * 900}px)`, opacity: 1 - fly}}>
        <Enter delay={at(19)} dir="up" cfg="bouncy" float={4}>
          <Card style={{width: 330, height: 340, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            <div style={{background: theme.colors.primary, color: theme.colors.onPrimary, fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 80, textAlign: 'center', padding: '10px 0', lineHeight: 1.3}}>কাল</div>
            <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, padding: 24}}>
              {Array.from({length: 8}).map((_, i) => <div key={i} style={{borderRadius: 10, background: theme.colors.primarySoft}} />)}
            </div>
          </Card>
        </Enter>
      </div>
      <div style={{position: 'absolute', right: 130, top: 560, width: 700}}>
        <Enter delay={at(19) + 22} dir="up"><Words text="কখনো আসে না" delay={at(19) + 24} per={6} size={88} /></Enter>
      </div>
      <Sfx at={at(16) - 2} type="pop" vol={0.7} />
      <Sfx at={at(16) + 6} type="pop" rate={0.95} vol={0.7} />
      <Sfx at={at(17)} type="pop" rate={0.9} vol={0.7} />
      <Sfx at={at(18)} type="pop" />
      <Sfx at={at(19) + 14} type="whoosh" vol={0.8} />
    </Stage>
  );
};

// ৯ — Photo + কোট: অপরাধবোধ (cue 20–22)
export const Guilt: React.FC = () => {
  const {at} = useScene();
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 90}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 38}}>
          <Enter delay={at(20)} dir="down" dist={24}><Chip dark>তারপর শুরু হয়</Chip></Enter>
          <Words text="অপরাধবোধ" delay={at(20) + 6} per={6} size={156} />
          <Enter delay={at(21)} dir="up" cfg="bouncy">
            <Card style={{padding: '34px 44px', borderRadius: 44}}>
              <MaskLine delay={at(21) + 4}>
                <div style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.strong, fontSize: 62, lineHeight: 1.45, color: theme.colors.text}}>“আমি পারি না, আমার দ্বারা কিছু হবে না।”</div>
              </MaskLine>
            </Card>
          </Enter>
          <Enter delay={at(22)} dir="up">
            <Card style={{display: 'flex', alignItems: 'center', gap: 26, padding: '20px 34px', alignSelf: 'flex-start'}}>
              <Phone size={74} />
              <span style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.strong, fontSize: 52}}>আবার ফোন হাতে নেয়</span>
            </Card>
          </Enter>
        </div>
        <Enter delay={at(20) - 4} dir="right" dist={80} style={{width: 700, height: 840, flexShrink: 0}}>
          <Photo src="images/tired-hoodie.jpg" w={700} h={840} pos="45% 40%" zoomOut />
        </Enter>
      </div>
      <Sfx at={at(20)} type="whoosh" rate={0.9} />
      <Sfx at={at(21)} type="pop" />
      <Sfx at={at(22)} type="click" />
    </Stage>
  );
};

// ১০ — Process loop: অনুপ্রেরণার চক্র (cue 23–26)
export const Loop: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const cx = 960, cy = 540, rx = 560, ry = 300;
  const nodes = [
    {t: 'নতুন ভিডিও', x: cx, y: cy - ry, d: at(23), icon: <Play size={56} />},
    {t: 'নতুন আগুন', x: cx + rx, y: cy, d: at(24), icon: <Flame size={52} />},
    {t: 'নতুন শপথ', x: cx, y: cy + ry, d: at(24) + Math.round(len(24) / 2), icon: <Check size={52} />},
    {t: 'একই পরিণতি', x: cx - rx, y: cy, d: at(25), icon: <Moon size={56} />},
  ];
  const ring = `M${cx} ${cy - ry} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy} A${rx} ${ry} 0 0 1 ${cx} ${cy + ry} A${rx} ${ry} 0 0 1 ${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx} ${cy - ry}`;
  const ang = (f / 90) * Math.PI * 2 - Math.PI / 2;
  const dot = useEase(at(26), 10);
  return (
    <Stage pad={0}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <DrawPath d={ring} delay={at(23)} dur={Math.max(60, len(23, 25) - 10)} color={theme.colors.line} width={10} />
        <circle cx={cx + Math.cos(ang) * rx} cy={cy + Math.sin(ang) * ry} r={14} fill={theme.colors.accent} opacity={dot} />
      </svg>
      {nodes.map((n) => (
        <div key={n.t} style={{position: 'absolute', left: n.x - 190, top: n.y - 62, width: 380}}>
          <Enter delay={n.d} cfg="bouncy" from={0.8}>
            <Card style={{height: 124, padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              {n.icon}
              <span style={{fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, fontSize: 50, color: theme.colors.primary}}>{n.t}</span>
            </Card>
          </Enter>
        </div>
      ))}
      <div style={{position: 'absolute', left: 0, right: 0, top: cy - 90, display: 'flex', justifyContent: 'center'}}>
        <Words text="অনুপ্রেরণার *চক্র*" delay={at(26)} per={8} size={100} align="center" />
      </div>
      {nodes.map((n, i) => <Sfx key={n.t} at={n.d} type="pop" rate={1 + i * 0.05} vol={0.8} />)}
      <Sfx at={at(26)} type="chime" />
    </Stage>
  );
};
