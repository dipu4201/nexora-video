import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {useScene} from '../scene';
import {Card, Chip, Stage} from '../components/Ui';
import {DrawPath, Enter, Struck, Words, clamp01, toBn, useEase, useSpring} from '../components/Motion';
import {Check, Cross, Flag, Moon, Phone, Pin, Pulse, RainCloud, Repeat, Sparkle, Book} from '../components/Icons';
import {Sfx} from '../components/AudioKit';

const H: React.CSSProperties = {fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, letterSpacing: 0};
const C: React.CSSProperties = {justifyContent: 'center'};

// ২১ — Bento Grid: গবেষণা — পুনরাবৃত্তি আর পরিবেশ (cue 50–52)
export const Research: React.FC = () => {
  const {at, len} = useScene();
  const t2 = at(51) + Math.round(len(51) / 2);
  const flow = [{t: 'একই সময়', d: at(52)}, {t: 'একই জায়গা', d: at(52) + Math.round(len(52) / 4)}, {t: 'বারবার', d: at(52) + Math.round(len(52) / 2)}];
  return (
    <Stage style={C}>
      <Enter delay={at(50)} dir="down" dist={24}><Chip dark>আচরণ নিয়ে গবেষণা</Chip></Enter>
      <div style={{display: 'flex', gap: 40, marginTop: 36}}>
        <Enter delay={at(51)} dir="up" cfg="bouncy" style={{flex: 1}}>
          <Card dark style={{height: 330, display: 'flex', alignItems: 'center', gap: 36, boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <Repeat size={150} color={theme.colors.accent} /><span style={{...H, fontSize: 92, color: theme.colors.onPrimary}}>পুনরাবৃত্তি</span>
          </Card>
        </Enter>
        <Enter delay={t2} dir="up" cfg="bouncy" style={{flex: 1}}>
          <Card style={{height: 330, display: 'flex', alignItems: 'center', gap: 36}}>
            <Pin size={150} /><span style={{...H, fontSize: 92}}>পরিবেশ</span>
          </Card>
        </Enter>
        <Enter delay={t2 + 20} dir="up" style={{width: 430}}>
          <Card style={{height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
            <span style={{...H, fontSize: 64, color: theme.colors.textDim}}><Struck delay={t2 + 40}>ইচ্ছাশক্তি</Struck></span>
            <Chip>শুধু নয়</Chip>
          </Card>
        </Enter>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 56, justifyContent: 'center'}}>
        {flow.map((f) => (
          <Enter key={f.t} delay={f.d} dir="up" dist={30}><Card style={{padding: '18px 38px', borderRadius: 999}}><span style={{...H, fontWeight: theme.weight.strong, fontSize: 56}}>{f.t}</span></Card></Enter>
        ))}
        <Enter delay={at(52) + Math.round((len(52) * 3) / 4)} dir="right" dist={40}><span style={{...H, fontSize: 70, color: theme.colors.accent}}>→</span></Enter>
        <Enter delay={at(52) + Math.round((len(52) * 3) / 4) + 6} dir="right" dist={40} cfg="bouncy"><Chip dark style={{fontSize: 56, padding: '14px 44px'}}>স্বয়ংক্রিয়</Chip></Enter>
      </div>
      <Sfx at={at(50)} type="pop" />
      <Sfx at={at(51)} type="pop" rate={0.95} />
      <Sfx at={t2} type="pop" rate={1.05} />
      <Sfx at={at(52) + Math.round((len(52) * 3) / 4) + 6} type="chime" />
    </Stage>
  );
};

// ২২ — দ্রুত/ধীরে — সবার জন্য এক নয় (cue 53–56)
export const Pace: React.FC = () => {
  const {at, len} = useScene();
  const fast = useEase(at(55), 50, 'out');
  const slow = useEase(at(55) + 18, 110, 'inOut');
  const Track: React.FC<{label: string; p: number; hero?: boolean; d: number}> = ({label, p, hero, d}) => (
    <Enter delay={d} dir="right" dist={50}>
      <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
        <span style={{...H, fontWeight: theme.weight.strong, fontSize: 64, width: 280}}>{label}</span>
        <div style={{flex: 1, height: 34, borderRadius: 34, background: theme.colors.primarySoft, position: 'relative'}}>
          <div style={{width: `${p * 100}%`, height: '100%', borderRadius: 34, background: hero ? theme.colors.primary : theme.colors.accent}} />
        </div>
        <Flag size={84} />
      </div>
    </Enter>
  );
  return (
    <Stage style={C}>
      <Enter delay={at(53)} dir="down" dist={24}><Chip dark>একটা কথা পরিষ্কার</Chip></Enter>
      <div style={{marginTop: 28}}><Words text="অভ্যাস কত দিনে তৈরি হবে? *সবার জন্য এক নয়*" delay={at(54)} per={4} size={84} /></div>
      <Card style={{marginTop: 50, display: 'flex', flexDirection: 'column', gap: 44, padding: '56px 60px'}}>
        <Track label="কেউ দ্রুত" p={fast} hero d={at(55)} />
        <Track label="কেউ ধীরে" p={slow} d={at(55) + 8} />
      </Card>
      <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 44}}>
        <Enter delay={at(56)} cfg="bouncy" from={0.7}><Sparkle size={80} /></Enter>
        <Words text="কোনো *জাদুকরী সংখ্যা* নেই" delay={at(56) + 4} per={5} size={78} />
      </div>
      <Sfx at={at(53)} type="pop" />
      <Sfx at={at(55)} type="whoosh" vol={0.8} />
      <Sfx at={at(56)} type="click" />
    </Stage>
  );
};

// ২৩ — ম্যাজিক ফর্মুলা নয়, বাস্তবসম্মত পথ (cue 57–58)
export const NoMagic: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const road = 'M120 330 C 420 330, 380 120, 700 150 S 1000 380, 1300 250 S 1500 130, 1700 170';
  const t = useEase(at(58) + 20, Math.max(50, len(58) - 30), 'inOut');
  return (
    <Stage style={C}>
      <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <Enter delay={at(57)} cfg="bouncy" from={0.6}><Sparkle size={130} /></Enter>
        <div style={{...H, fontSize: 112, color: theme.colors.textDim}}><Struck delay={at(57) + 34} thick={9}>ম্যাজিক ফর্মুলা</Struck></div>
      </div>
      <Enter delay={at(58)} dir="up" style={{marginTop: 30}}>
        <Card style={{padding: '24px 20px', overflow: 'hidden'}}>
          <svg width={1620} height={400} viewBox="0 0 1800 420">
            <path d={road} fill="none" stroke={theme.colors.line} strokeWidth={70} strokeLinecap="round" />
            <path d={road} fill="none" stroke={theme.colors.cardSolid} strokeWidth={6} strokeDasharray="4 22" strokeLinecap="round" />
            <DrawPath d={road} delay={at(58) + 12} dur={Math.max(50, len(58) - 30)} color={theme.colors.accent} width={14} />
            <circle cx={120 + (1700 - 120) * t} cy={250 + Math.sin(t * 9) * 60 - (t > 0.5 ? 40 : 0)} r={22 + Math.sin(f / 5)} fill={theme.colors.primary} opacity={clamp01(t * 30)} />
          </svg>
        </Card>
      </Enter>
      <div style={{marginTop: 34}}><Words text="একটা *বাস্তবসম্মত পথ*" delay={at(58) + 6} per={6} size={112} /></div>
      <Sfx at={at(57)} type="pop" />
      <Sfx at={at(57) + 34} type="click" />
      <Sfx at={at(58)} type="whoosh" rate={1.05} />
    </Stage>
  );
};

// ২৪ — Line Draw: হঠাৎ সহজ নয় — চড়াই (cue 59–60)
export const NewPath: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const hill = 'M60 560 L400 520 L620 440 L760 470 L1000 300 L1160 330 L1420 130 L1560 150';
  const t = useEase(at(59) + 24, len(59, 60) - 40, 'inOut');
  const pts = [[60, 560], [400, 520], [620, 440], [760, 470], [1000, 300], [1160, 330], [1420, 130], [1560, 150]];
  const idx = Math.min(pts.length - 2, Math.floor(t * (pts.length - 1)));
  const lt = t * (pts.length - 1) - idx;
  const px = pts[idx][0] + (pts[idx + 1][0] - pts[idx][0]) * lt;
  const py = pts[idx][1] + (pts[idx + 1][1] - pts[idx][1]) * lt;
  return (
    <Stage style={C}>
      <Enter delay={at(59)} dir="down" dist={24}><Chip dark>নতুন পথে</Chip></Enter>
      <div style={{marginTop: 26}}><Words text="আরিফ হাঁটা শুরু করলো" delay={at(59) + 6} per={6} size={96} /></div>
      <Card style={{marginTop: 34, padding: 20}}>
        <svg width={1640} height={620} viewBox="0 0 1640 620" style={{overflow: 'visible'}}>
          <path d="M60 600 L1560 600" stroke={theme.colors.line} strokeWidth={5} strokeDasharray="10 16" />
          <DrawPath d={hill} delay={at(59) + 12} dur={len(59, 60) - 40} color={theme.colors.primary} width={12} />
          <circle cx={px} cy={py - 24} r={24 + Math.sin(f / 5) * 2} fill={theme.colors.accent} />
          <g transform="translate(1520 40)" opacity={useEase(at(60) + 40, 20)}><Flag size={110} /></g>
        </svg>
      </Card>
      <div style={{marginTop: 30}}><Words text="কিন্তু সবকিছু *হঠাৎ সহজ* হয়ে গেল না" delay={at(60)} per={5} size={72} /></div>
      <Sfx at={at(59)} type="pop" />
      <Sfx at={at(60)} type="whoosh" rate={0.92} vol={0.8} />
    </Stage>
  );
};

// ২৫ — Bento 2×2: কঠিন দিনগুলো (cue 61–64)
export const HardDays: React.FC = () => {
  const {at} = useScene();
  const items = [
    {t: 'ঘুম থেকে উঠতে ইচ্ছাই করতো না', d: at(61), icon: <Moon size={110} />},
    {t: 'কাজে বসে মাথা ফাঁকা লাগতো', d: at(62), icon: <RainCloud size={116} />},
    {t: 'লক্ষ্যও ছুঁতে পারতো না', d: at(63), icon: <Flag size={110} />},
    {t: 'একদিন একেবারেই বসতে পারলো না', d: at(64), icon: <Cross size={100} color={theme.colors.accent} />, dark: true},
  ];
  return (
    <Stage style={C}>
      <Enter delay={at(61)} dir="down" dist={24}><Chip>কিছু দিন কঠিন ছিল</Chip></Enter>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 36}}>
        {items.map((it) => (
          <Enter key={it.t} delay={it.d} dir="up" cfg="bouncy">
            <Card dark={it.dark} style={{height: 290, display: 'flex', alignItems: 'center', gap: 40, boxShadow: it.dark ? `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}` : theme.shadow}}>
              {it.icon}
              <span style={{...H, fontWeight: theme.weight.strong, fontSize: 62, lineHeight: 1.4, color: it.dark ? theme.colors.onPrimary : theme.colors.text}}>{it.t}</span>
            </Card>
          </Enter>
        ))}
      </div>
      {items.map((it, i) => <Sfx key={it.t} at={it.d} type="pop" rate={1 - i * 0.04} vol={0.8} />)}
    </Stage>
  );
};

// ২৬ — Before/After (স্ট্যাকড): নিজেকে দোষ নয় (cue 65–66)
export const SelfCompassion: React.FC = () => {
  const {at} = useScene();
  return (
    <Stage style={C}>
      <Enter delay={at(65)} dir="left" dist={70}>
        <Card style={{display: 'flex', alignItems: 'center', gap: 40, padding: '36px 56px'}}>
          <Chip>আগে</Chip>
          <span style={{...H, fontSize: 84, color: theme.colors.textDim}}><Struck delay={at(65) + 30}>নিজেকে দোষ দেওয়া</Struck></span>
        </Card>
      </Enter>
      <Enter delay={at(66)} dir="right" dist={70} cfg="bouncy" style={{marginTop: 50}}>
        <Card dark style={{padding: '50px 60px', boxShadow: `0 0 100px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
          <Chip style={{background: 'rgba(246,241,231,0.14)', color: theme.colors.onPrimary}}>এখন</Chip>
          <div style={{marginTop: 26}}><Words text="ঠিক আছে, আজ হয়নি, *কাল আবার শুরু করবো*" delay={at(66) + 10} per={5} size={92} color={theme.colors.onPrimary} hlColor="rgba(217,144,47,0.35)" /></div>
        </Card>
      </Enter>
      <Sfx at={at(65)} type="pop" />
      <Sfx at={at(65) + 30} type="click" />
      <Sfx at={at(66)} type="whoosh" rate={0.9} />
    </Stage>
  );
};

// ২৭ — Line Draw: ব্যর্থ হয়ে আবার ফিরে আসা (cue 67–69)
export const ComeBack: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const d = 'M80 120 L300 160 L520 250 L640 420 L780 300 L1000 220 L1240 130 L1500 60';
  const t = useEase(at(68) + 6, len(68, 69) - 30, 'inOut');
  const pts = [[80, 120], [300, 160], [520, 250], [640, 420], [780, 300], [1000, 220], [1240, 130], [1500, 60]];
  const idx = Math.min(pts.length - 2, Math.floor(t * (pts.length - 1)));
  const lt = t * (pts.length - 1) - idx;
  const px = pts[idx][0] + (pts[idx + 1][0] - pts[idx][0]) * lt, py = pts[idx][1] + (pts[idx + 1][1] - pts[idx][1]) * lt;
  return (
    <Stage style={C}>
      <Enter delay={at(67)} dir="down" dist={24}><Chip dark>এটাই আসল পার্থক্য</Chip></Enter>
      <Enter delay={at(67) + 6} dir="up" style={{marginTop: 30}}>
        <Card style={{padding: 30}}>
          <svg width={1580} height={460} viewBox="0 0 1580 460" style={{overflow: 'visible'}}>
            <DrawPath d={d} delay={at(68) + 6} dur={len(68, 69) - 30} color={theme.colors.primary} width={12} />
            <circle cx={px} cy={py} r={22 + Math.sin(f / 5) * 2} fill={theme.colors.accent} opacity={clamp01(t * 30)} />
            <g transform="translate(560 330)" opacity={useEase(at(68) + 40, 12)}><Cross size={64} color={theme.colors.textDim} /></g>
          </svg>
        </Card>
      </Enter>
      <div style={{display: 'flex', gap: 60, marginTop: 40, alignItems: 'center'}}>
        <div style={{...H, fontSize: 76, color: theme.colors.textDim}}><Struck delay={at(68) + 30}>ব্যর্থ না হওয়া</Struck></div>
        <Enter delay={at(69)} dir="right" dist={50} cfg="bouncy"><Chip dark style={{fontSize: 62, padding: '14px 44px'}}>আবার ফিরে আসা</Chip></Enter>
      </div>
      <Sfx at={at(67)} type="pop" />
      <Sfx at={at(68) + 30} type="click" />
      <Sfx at={at(69)} type="chime" />
    </Stage>
  );
};

// ২৮ — 3D Carousel-ধাঁচ: তিনটি ছোট ধাপ (cue 70–71)
export const ThreeSteps: React.FC = () => {
  const {at, len} = useScene();
  const steps = ['কাজটা ছোট করো', 'পরিবেশ বদলাও', 'সময়ে বেঁধে ফেলো'];
  return (
    <Stage style={C}>
      <Words text="তিনটি *ছোট ধাপ*" delay={at(70)} per={7} size={120} />
      <div style={{display: 'flex', gap: 44, marginTop: 50, perspective: 1600}}>
        {steps.map((s, i) => {
          const d = at(70) + 18 + Math.round((i * (len(70) - 20)) / 3);
          const p = useSpring(d, 'smooth');
          return (
            <div key={s} style={{flex: 1, opacity: clamp01(p * 1.5), transform: `rotateY(${(1 - p) * (i - 1) * -35}deg) translateY(${(1 - p) * 60}px) scale(${0.9 + p * 0.1})`}}>
              <Card dark={i === 0} style={{height: 380, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: i === 0 ? `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}` : theme.shadow}}>
                <span style={{...H, fontSize: 150, lineHeight: 1.1, color: theme.colors.accent}}>{toBn(i + 1)}</span>
                <span style={{...H, fontSize: 64, lineHeight: 1.4, color: i === 0 ? theme.colors.onPrimary : theme.colors.primary}}>{s}</span>
              </Card>
            </div>
          );
        })}
      </div>
      <Enter delay={at(71)} dir="up" style={{marginTop: 46}}><Chip style={{fontSize: 46, padding: '12px 38px'}}>তোমার জন্যও কাজে লাগতে পারে</Chip></Enter>
      <Sfx at={at(70)} type="whoosh" />
      {steps.map((s, i) => <Sfx key={s} at={at(70) + 18 + Math.round((i * (len(70) - 20)) / 3)} type="pop" rate={1 + i * 0.06} vol={0.8} />)}
    </Stage>
  );
};

// ২৯ — ধাপ ১: কাজ ছোট করো (cue 72–76)
export const Step1: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const ring = useEase(at(74) + 14, 50, 'out');
  const swap = useEase(at(75) - 8, 12, 'in');
  const R = 150, circ = 2 * Math.PI * R;
  const curve = 'M60 330 C 160 40, 300 40, 400 250 S 700 330, 900 320';
  return (
    <Stage style={C}>
      <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
        <div style={{width: 800}}>
          <Enter delay={at(72)} dir="down" dist={24}><Chip dark>প্রথম ধাপ</Chip></Enter>
          <div style={{marginTop: 28}}><Words text="কাজটা এত *ছোট* করো, যেন না বলা কঠিন হয়" delay={at(72) + 6} per={4} size={84} /></div>
          <div style={{marginTop: 40, minHeight: 170}}>
            <Words text="শুরু করাটাই *সবচেয়ে কঠিন* অংশ" delay={at(75)} per={5} size={70} />
          </div>
          <div style={{marginTop: 10}}>
            <Words text="একবার শুরু হলে *চালিয়ে যাওয়া সহজ*" delay={at(76)} per={5} size={70} />
          </div>
        </div>
        <div style={{flex: 1, position: 'relative', height: 760}}>
          <div style={{position: 'absolute', inset: 0, opacity: 1 - swap, transform: `translateY(${-30 * swap}px)`}}>
            <Enter delay={at(73)} dir="left" dist={60}>
              <Card style={{padding: '28px 40px', display: 'flex', alignItems: 'center', gap: 24}}>
                <Cross size={64} /><span style={{...H, fontSize: 60, color: theme.colors.textDim}}><Struck delay={at(73) + 26}>আজ তিন ঘণ্টা পড়বো</Struck></span>
              </Card>
            </Enter>
            <Enter delay={at(74)} dir="up" cfg="bouncy" style={{marginTop: 36}}>
              <Card dark style={{height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 100px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
                <div style={{position: 'relative', width: 340, height: 340}}>
                  <svg width={340} height={340} viewBox="0 0 340 340" style={{transform: 'rotate(-90deg)'}}>
                    <circle cx={170} cy={170} r={R} fill="none" stroke="rgba(246,241,231,0.18)" strokeWidth={24} />
                    <circle cx={170} cy={170} r={R} fill="none" stroke={theme.colors.accent} strokeWidth={24} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - ring * 0.17)} />
                  </svg>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...H, color: theme.colors.onPrimary}}>
                    <span style={{fontSize: 130, lineHeight: 1.1}}>১০</span><span style={{fontSize: 52, fontWeight: theme.weight.strong}}>মিনিট</span>
                  </div>
                </div>
              </Card>
            </Enter>
          </div>
          <div style={{position: 'absolute', inset: 0, top: 60}}>
            <Enter delay={at(75)} dir="up">
              <Card style={{padding: 30}}>
                <svg width={740} height={296} viewBox="0 0 1000 400" style={{overflow: "visible"}}>
                  <DrawPath d={curve} delay={at(75) + 10} dur={len(75, 76) - 20} color={theme.colors.primary} width={12} />
                  <circle cx={60} cy={330} r={22} fill={theme.colors.accent} opacity={useEase(at(75) + 8, 10)} />
                  <g transform="translate(180 -10)" opacity={useEase(at(75) + 30, 14)}><text x={0} y={30} fontFamily={theme.fonts.display} fontWeight={700} fontSize={50} fill={theme.colors.primary}>কঠিন</text></g>
                  <g transform="translate(640 250)" opacity={useEase(at(76) + 24, 14)}><text x={0} y={30} fontFamily={theme.fonts.display} fontWeight={700} fontSize={50} fill={theme.colors.accent}>সহজ</text></g>
                </svg>
              </Card>
            </Enter>
          </div>
        </div>
      </div>
      <Sfx at={at(72)} type="pop" />
      <Sfx at={at(73) + 26} type="click" />
      <Sfx at={at(74)} type="chime" />
      <Sfx at={at(75)} type="whoosh" rate={0.95} />
    </Stage>
  );
};

// ৩০ — ধাপ ২: পরিবেশ বদলাও (cue 77–81)
export const Step2: React.FC = () => {
  const {at} = useScene();
  const away = useEase(at(78) + 14, 20, 'in');
  const inn = useSpring(at(79), 'bouncy');
  return (
    <Stage style={C}>
      <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
        <Enter delay={at(77)} dir="down" dist={24}><Chip dark>দ্বিতীয় ধাপ</Chip></Enter>
        <Words text="*পরিবেশ* বদলাও" delay={at(77) + 6} per={6} size={96} />
      </div>
      <Enter delay={at(78) - 6} dir="up" style={{marginTop: 34}}>
        <Card style={{height: 360, position: 'relative', overflow: 'hidden', padding: 0}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: theme.colors.primary}} />
          <div style={{position: 'absolute', left: 210 + away * 2100, bottom: 110, opacity: 1 - away * 0.4, transform: `rotate(${away * 40}deg)`}}><Phone size={180} /></div>
          <div style={{position: 'absolute', left: 700, bottom: 110, transform: `translateY(${(1 - inn) * -240}px)`, opacity: clamp01(inn)}}><Book size={190} /></div>
          <div style={{position: 'absolute', left: 1000, bottom: 110, transform: `translateY(${(1 - inn) * -240}px)`, opacity: clamp01(inn)}}>
            <div style={{width: 200, height: 150, borderRadius: 14, background: theme.colors.cardSolid, border: `6px solid ${theme.colors.primary}`, position: 'relative'}}>
              <div style={{position: 'absolute', left: 24, right: 24, top: 36, height: 8, background: theme.colors.line}} /><div style={{position: 'absolute', left: 24, right: 60, top: 70, height: 8, background: theme.colors.line}} />
            </div>
          </div>
          <div style={{position: 'absolute', left: 1280, bottom: 24, ...H, fontSize: 48, color: theme.colors.onPrimary, opacity: clamp01(inn)}}>বই আর খাতা</div>
        </Card>
      </Enter>
      <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 46, flexWrap: 'wrap'}}>
        <div style={{...H, fontSize: 70, color: theme.colors.textDim}}><Struck delay={at(80) + 20}>ইচ্ছাশক্তির সঙ্গে প্রতিদিন যুদ্ধ</Struck></div>
      </div>
      <div style={{marginTop: 20}}><Words text="যুদ্ধের কারণটাই *দূরে সরিয়ে* দেওয়া বুদ্ধিমানের কাজ" delay={at(81)} per={4} size={72} /></div>
      <Sfx at={at(77)} type="pop" />
      <Sfx at={at(78) + 14} type="whoosh" rate={1.1} />
      <Sfx at={at(79)} type="thud" vol={0.7} />
      <Sfx at={at(80) + 20} type="click" />
      <Sfx at={at(81)} type="chime" vol={0.8} />
    </Stage>
  );
};
