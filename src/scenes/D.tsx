import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {useScene} from '../scene';
import {Card, Chip, Photo, Stage} from '../components/Ui';
import {Counter, DrawPath, Enter, Struck, Words, clamp01, toBn, useEase, useSpring} from '../components/Motion';
import {Check, Cross, Flame, Moon, Phone, Pin, Play, Sparkle} from '../components/Icons';
import {Sfx} from '../components/AudioKit';

const H: React.CSSProperties = {fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, letterSpacing: 0};
const C: React.CSSProperties = {justifyContent: 'center'};

// ৩১ — ধাপ ৩: নির্দিষ্ট সময়ে বাঁধা (cue 82–85)
export const Step3: React.FC = () => {
  const {at, len} = useScene();
  const fat = useEase(at(85) + 14, 60, 'inOut');
  const pills = [
    {t: 'রাতের খাবারের পর', icon: <Moon size={64} />}, {t: 'এই টেবিলে', icon: <Pin size={64} />}, {t: '১০ মিনিট', icon: <Check size={56} />},
  ].map((p, i) => ({...p, d: at(84) + Math.round((i * len(84)) / 3)}));
  return (
    <Stage style={C}>
      <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
        <Enter delay={at(82)} dir="down" dist={24}><Chip dark>তৃতীয় ধাপ</Chip></Enter>
        <Words text="নির্দিষ্ট সময়ে *বেঁধে ফেলো*" delay={at(82) + 6} per={5} size={88} />
      </div>
      <Enter delay={at(83)} dir="up" style={{marginTop: 34}}>
        <Card style={{display: 'flex', alignItems: 'center', gap: 30, padding: '26px 44px', alignSelf: 'flex-start'}}>
          <Cross size={60} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 60, color: theme.colors.textDim}}><Struck delay={at(83) + 40}>“যখন সময় পাবো তখন করবো”</Struck></span>
        </Card>
      </Enter>
      <div style={{display: 'flex', gap: 28, marginTop: 40}}>
        {pills.map((p) => (
          <Enter key={p.t} delay={p.d} dir="up" cfg="bouncy" style={{flex: 1}}>
            <Card dark style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '28px 24px'}}>
              {p.icon}<span style={{...H, fontSize: 56, color: theme.colors.onPrimary}}>{p.t}</span>
            </Card>
          </Enter>
        ))}
      </div>
      <Enter delay={at(85)} dir="up" style={{marginTop: 40}}>
        <Card style={{display: 'flex', alignItems: 'center', gap: 36, padding: '28px 44px'}}>
          <span style={{...H, fontWeight: theme.weight.strong, fontSize: 54, width: 520}}>সিদ্ধান্তের ক্লান্তি</span>
          <div style={{flex: 1, height: 34, borderRadius: 34, background: theme.colors.primarySoft, overflow: 'hidden'}}>
            <div style={{width: `${interpolate(fat, [0, 1], [92, 14])}%`, height: '100%', borderRadius: 34, background: theme.colors.accent}} />
          </div>
          <Chip dark style={{fontSize: 44}}>কমে যায়</Chip>
        </Card>
      </Enter>
      <Sfx at={at(82)} type="pop" />
      <Sfx at={at(83) + 40} type="click" />
      {pills.map((p, i) => <Sfx key={p.t} at={p.d} type="pop" rate={1 + i * 0.06} vol={0.8} />)}
      <Sfx at={at(85) + 14} type="whoosh" rate={0.9} vol={0.8} />
    </Stage>
  );
};

// ৩২ — Timeline: সপ্তাহ গড়িয়ে যায়, নাটক নেই (cue 86–88)
export const Weeks: React.FC = () => {
  const {at, len} = useScene();
  const labels = ['সপ্তাহ ১', 'সপ্তাহ ২', '…', '…', '…'];
  const dim = useEase(at(87), 14, 'out');
  return (
    <Stage style={C}>
      <Words text="এক সপ্তাহ গেল, দুই সপ্তাহ... *আরও কয়েক সপ্তাহ*" delay={at(86)} per={4} size={72} />
      <div style={{display: 'flex', gap: 28, marginTop: 56, position: 'relative'}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 66, height: 6, background: theme.colors.line}} />
        {labels.map((l, i) => {
          const d = at(86) + 10 + Math.round((i * (len(86) - 20)) / labels.length);
          const p = useSpring(d + 6, 'bouncy');
          return (
            <Enter key={i} delay={d} dir="up" style={{flex: 1}}>
              <Card style={{height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 20}}>
                <div style={{width: 74, height: 74, borderRadius: '50%', background: l === '…' ? theme.colors.primarySoft : theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`}}>
                  {l !== '…' && <Check size={44} color={theme.colors.onPrimary} />}
                </div>
                <span style={{...H, fontSize: 52, color: l === '…' ? theme.colors.textDim : theme.colors.primary}}>{l}</span>
              </Card>
            </Enter>
          );
        })}
      </div>
      <div style={{display: 'flex', gap: 50, marginTop: 60, alignItems: 'center', opacity: dim}}>
        <Enter delay={at(87)} dir="up"><Chip style={{fontSize: 46}}>কোনো নাটকীয় মুহূর্ত নয়</Chip></Enter>
        <Enter delay={at(88)} dir="up"><Card style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 34px', borderRadius: 999}}><Sparkle size={56} color={theme.colors.textFaint} fill="transparent" sw={5} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 50, color: theme.colors.textDim}}><Struck delay={at(88) + 22}>আতশবাজি</Struck></span></Card></Enter>
      </div>
      <Sfx at={at(86)} type="whoosh" rate={0.9} />
      <Sfx at={at(87)} type="pop" vol={0.7} />
      <Sfx at={at(88) + 22} type="click" vol={0.8} />
    </Stage>
  );
};

// ৩৩ — Photo + Counter: ১০ → ২০ মিনিট (cue 89–91)
export const Progress: React.FC = () => {
  const {at} = useScene();
  const conf = useEase(at(91) + 6, 60, 'inOut');
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 80}}>
        <Enter delay={at(89) - 4} dir="left" dist={80} style={{width: 800, height: 760, flexShrink: 0}}>
          <Photo src="images/desk-night.jpg" w={800} h={760} pos="38% 50%" />
        </Enter>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 34}}>
          <Enter delay={at(89)} dir="up" cfg="bouncy">
            <Card dark style={{padding: '36px 50px', boxShadow: `0 0 100px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 22, ...H, color: theme.colors.onPrimary}}>
                <Counter from={10} to={20} delay={at(89) + 24} dur={40} style={{fontSize: 190, lineHeight: 1.15, color: theme.colors.accent}} />
                <span style={{fontSize: 70}}>মিনিট</span>
              </div>
            </Card>
          </Enter>
          <Enter delay={at(90)} dir="up">
            <Card style={{display: 'flex', alignItems: 'center', gap: 26, padding: '24px 36px'}}>
              <Check size={64} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 56}}>আর লড়াই করতে হয় না</span>
            </Card>
          </Enter>
          <Enter delay={at(91)} dir="up">
            <Card style={{padding: '26px 36px'}}>
              <div style={{...H, fontWeight: theme.weight.strong, fontSize: 54, marginBottom: 18}}>নিজের উপর আস্থা</div>
              <div style={{height: 30, borderRadius: 30, background: theme.colors.primarySoft, overflow: 'hidden'}}>
                <div style={{width: `${14 + conf * 62}%`, height: '100%', borderRadius: 30, background: theme.colors.accent}} />
              </div>
            </Card>
          </Enter>
        </div>
      </div>
      <Sfx at={at(89)} type="pop" />
      <Sfx at={at(89) + 24} type="whoosh" rate={1.1} vol={0.7} />
      <Sfx at={at(90)} type="click" />
      <Sfx at={at(91)} type="pop" rate={1.08} />
    </Stage>
  );
};

// ৩৪ — Line Draw: পিছলে গেলেও ফেরার পথ (cue 92–94)
export const Signpost: React.FC = () => {
  const {at, len} = useScene();
  const slip = 'M60 150 L260 190 L400 330 L520 250 L640 160 L760 220 L860 330 L980 180 L1100 90';
  return (
    <Stage style={C}>
      <div style={{display: 'flex', gap: 60, alignItems: 'center'}}>
        <div style={{flex: 1}}>
          <Enter delay={at(92)} dir="up"><Card style={{display: 'flex', alignItems: 'center', gap: 24, padding: '24px 40px', alignSelf: 'flex-start'}}><Moon size={64} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 56}}>দুর্বল দিনে ক্লান্ত হয়</span></Card></Enter>
          <Enter delay={at(93)} dir="up" style={{marginTop: 28}}><Card style={{display: 'flex', alignItems: 'center', gap: 24, padding: '24px 40px', alignSelf: 'flex-start'}}><Cross size={56} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 56}}>মাঝে মাঝে পিছলে যায়</span></Card></Enter>
          <Enter delay={at(94)} dir="up" cfg="bouncy" style={{marginTop: 28}}>
            <Card dark style={{display: 'flex', alignItems: 'center', gap: 24, padding: '28px 44px', boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`}}><Pin size={70} /><span style={{...H, fontSize: 64, color: theme.colors.onPrimary}}>ফিরে আসার পথ জানে</span></Card>
          </Enter>
        </div>
        <Enter delay={at(92)} dir="left" dist={60} style={{width: 880}}>
          <Card style={{padding: 26}}>
            <svg width={830} height={420} viewBox="0 0 1160 420" style={{overflow: 'visible'}}>
              <DrawPath d={slip} delay={at(92) + 10} dur={len(92, 94) - 30} color={theme.colors.primary} width={12} />
              <path d="M980 180 L1100 90" stroke={theme.colors.accent} strokeWidth={14} strokeLinecap="round" opacity={useEase(at(94), 14)} />
            </svg>
          </Card>
        </Enter>
      </div>
      <Sfx at={at(92)} type="pop" vol={0.8} />
      <Sfx at={at(93)} type="pop" rate={0.92} vol={0.8} />
      <Sfx at={at(94)} type="chime" />
    </Stage>
  );
};

// ৩৫ — হুক-এর প্রতিধ্বনি: আবার একটা রাত (cue 95–97)
export const NightAgain: React.FC = () => {
  const {at} = useScene();
  return (
    <AbsoluteFill>
      <Photo src="images/desk-night.jpg" radius={0} pos="40% 50%" zoomOut style={{position: 'absolute', inset: 0, boxShadow: 'none', border: 'none'}} />
      <AbsoluteFill style={{background: `linear-gradient(90deg, ${theme.colors.primary}F0 0%, ${theme.colors.primary}A6 45%, transparent 85%)`}} />
      <Stage>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 30, width: 1000}}>
          <Enter delay={at(95)} dir="down" dist={30}><Moon size={110} /></Enter>
          <Words text="আবার একটা রাত।" delay={at(95) + 4} per={7} size={140} color={theme.colors.onPrimary} />
          <Words text="আগের মতোই নীরব ঘর।" delay={at(96)} per={6} size={84} weight={theme.weight.strong} color={theme.colors.onPrimary} />
          <Words text="আরিফ *টেবিলে* বসে আছে।" delay={at(97)} per={6} size={84} weight={theme.weight.strong} color={theme.colors.onPrimary} hlColor="rgba(217,144,47,0.4)" />
        </div>
      </Stage>
      <Sfx at={at(95)} type="whoosh" rate={0.9} />
      <Sfx at={at(96)} type="pop" vol={0.7} />
      <Sfx at={at(97)} type="pop" rate={0.94} vol={0.7} />
    </AbsoluteFill>
  );
};

// ৩৬ — Minimal: ভিডিও নেই, আগুন নেই, শুধু শান্ত সিদ্ধান্ত (cue 98–100)
export const Calm: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const r = (k: number) => clamp01(((f - at(100) - k * 24) % 90) / 90);
  return (
    <Stage style={C}>
      <div style={{display: 'flex', gap: 56, justifyContent: 'center'}}>
        <Enter delay={at(98)} dir="up"><Card style={{width: 760, display: 'flex', alignItems: 'center', gap: 30, padding: '36px 44px'}}><Play size={90} color={theme.colors.textDim} fill={theme.colors.textFaint} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 62, color: theme.colors.textDim}}><Struck delay={at(98) + 30}>মোটিভেশনাল ভিডিও</Struck></span></Card></Enter>
        <Enter delay={at(99)} dir="up"><Card style={{width: 760, display: 'flex', alignItems: 'center', gap: 30, padding: '36px 44px'}}><div style={{filter: 'grayscale(1)', opacity: 0.55}}><Flame size={90} /></div><span style={{...H, fontWeight: theme.weight.strong, fontSize: 62, color: theme.colors.textDim}}><Struck delay={at(99) + 30}>বুক জ্বালা আগুন</Struck></span></Card></Enter>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 64, position: 'relative', height: 330}}>
        {[0, 1].map((k) => <div key={k} style={{position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: `4px solid ${theme.colors.primary}`, opacity: (1 - r(k)) * 0.25 * clamp01(f - at(100)), transform: `scale(${1 + r(k) * 0.9})`}} />)}
        <Enter delay={at(100)} cfg="bouncy" from={0.6}>
          <div style={{width: 300, height: 300, borderRadius: '50%', background: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: theme.shadow}}><Check size={150} color={theme.colors.onPrimary} /></div>
        </Enter>
        <div style={{marginLeft: 70}}><Words text="একটা *শান্ত সিদ্ধান্ত*" delay={at(100) + 8} per={7} size={110} /></div>
      </div>
      <Sfx at={at(98) + 30} type="click" vol={0.8} />
      <Sfx at={at(99) + 30} type="click" rate={0.92} vol={0.8} />
      <Sfx at={at(100)} type="chime" rate={0.9} />
    </Stage>
  );
};

// ৩৭ — Flat Vector: ছোট ছোট ইট (cue 101–102)
export const SmallChanges: React.FC = () => {
  const {at, len} = useScene();
  const rows = 5, cols = 8, total = rows * cols;
  return (
    <Stage style={C}>
      <div style={{display: 'flex', gap: 80, alignItems: 'center'}}>
        <div style={{flex: 1}}>
          <div style={{...H, fontSize: 88, color: theme.colors.textDim, lineHeight: 1.4}}>বড় <Struck delay={at(101) + 24}>ঘোষণা</Struck> নয়</div>
          <div style={{marginTop: 30}}><Words text="ছোট ছোট *প্রতিদিনের কাজ*" delay={at(102)} per={6} size={96} /></div>
          <Enter delay={at(102) + 40} dir="up" style={{marginTop: 30}}><Chip style={{fontSize: 46}}>যেগুলো কেউ দেখে না</Chip></Enter>
        </div>
        <Enter delay={at(101)} dir="left" dist={50} style={{width: 860}}>
          <Card style={{padding: 34}}>
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12}}>
              {Array.from({length: total}).map((_, i) => {
                const rowFromBottom = rows - 1 - Math.floor(i / cols);
                const order = rowFromBottom * cols + (i % cols);
                const d = at(102) + 6 + Math.round((order * (len(102) - 24)) / total);
                const p = useSpring(d, 'snappy');
                return <div key={i} style={{height: 74, borderRadius: 14, background: order % 7 === 0 ? theme.colors.accent : theme.colors.primary, opacity: clamp01(p * 1.4), transform: `translateY(${(1 - p) * -40}px) scale(${0.7 + p * 0.3})`}} />;
              })}
            </div>
          </Card>
        </Enter>
      </div>
      <Sfx at={at(101) + 24} type="click" />
      <Sfx at={at(102)} type="whoosh" rate={1.1} vol={0.8} />
      <Sfx at={at(102) + Math.round(len(102) * 0.7)} type="pop" vol={0.7} />
    </Stage>
  );
};

// ৩৮ — Checklist: শুধু একটা ছোট কাজ (cue 103–104)
export const Takeaway: React.FC = () => {
  const {at} = useScene();
  const tick = useSpring(at(104) + 40, 'bouncy');
  return (
    <Stage style={C}>
      <Enter delay={at(103)} dir="up">
        <Card style={{display: 'flex', alignItems: 'center', gap: 30, padding: '34px 50px', alignSelf: 'flex-start'}}>
          <Cross size={64} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 70, color: theme.colors.textDim}}><Struck delay={at(103) + 40}>বড় কোনো প্রতিশ্রুতি</Struck></span>
        </Card>
      </Enter>
      <Enter delay={at(104)} dir="up" cfg="bouncy" style={{marginTop: 50}}>
        <Card dark style={{display: 'flex', alignItems: 'center', gap: 44, padding: '56px 64px', boxShadow: `0 0 110px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
          <div style={{width: 130, height: 130, borderRadius: 38, border: `7px solid ${theme.colors.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <div style={{transform: `scale(${tick})`, opacity: clamp01(tick)}}><Check size={92} color={theme.colors.accent} /></div>
          </div>
          <div>
            <div style={{...H, fontSize: 100, color: theme.colors.onPrimary, lineHeight: 1.3}}>শুধু একটা ছোট কাজ</div>
            <div style={{...H, fontWeight: theme.weight.strong, fontSize: 60, color: theme.colors.accent, marginTop: 8}}>কাল সেটা একবার করো</div>
          </div>
        </Card>
      </Enter>
      <Sfx at={at(103)} type="pop" />
      <Sfx at={at(103) + 40} type="click" />
      <Sfx at={at(104)} type="pop" rate={1.05} />
      <Sfx at={at(104) + 40} type="chime" />
    </Stage>
  );
};

// ৩৯ — UI: কমেন্ট বক্স, টাইপরাইটার শুধু ইনপুটে (cue 105–106)
export const CommentBox: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const words = 'কোন ছোট কাজটা দিয়ে আজ শুরু করবে?'.split(' ');
  const start = at(106) + 16, per = Math.max(5, Math.floor((len(106) - 50) / words.length));
  const shown = Math.max(0, Math.min(words.length, Math.floor((f - start) / per) + 1));
  const press = useEase(start + per * words.length + 8, 10, 'out');
  return (
    <Stage style={C}>
      <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
        <Enter delay={at(105)} dir="down" dist={24}><Chip dark>নিচের কমেন্টে</Chip></Enter>
        <Words text="ভিডিওটা কাজে লাগলে *জানাও*" delay={at(105) + 6} per={5} size={78} />
      </div>
      <Enter delay={at(106) - 4} dir="up" cfg="bouncy" style={{marginTop: 50}}>
        <Card style={{padding: '40px 44px'}}>
          <div style={{display: 'flex', gap: 34, alignItems: 'flex-start'}}>
            <div style={{width: 100, height: 100, borderRadius: '50%', background: theme.colors.primary, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...H, fontSize: 52, color: theme.colors.accent}}>তু</div>
            <div style={{flex: 1, minHeight: 190, borderRadius: 28, border: `3px solid ${theme.colors.line}`, background: theme.colors.cardSolid, padding: '28px 36px', ...H, fontWeight: theme.weight.strong, fontSize: 66, lineHeight: 1.5, color: theme.colors.text}}>
              {words.slice(0, shown).join(' ')}
              <span style={{display: 'inline-block', width: 5, height: 70, background: theme.colors.accent, marginLeft: 8, verticalAlign: 'middle', opacity: f % 30 < 18 ? 1 : 0}} />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 26}}>
            <div style={{...H, fontSize: 48, padding: '12px 46px', borderRadius: 999, background: theme.colors.primary, color: theme.colors.onPrimary, transform: `scale(${1 - 0.06 * Math.sin(press * Math.PI)})`, boxShadow: press > 0.5 ? `0 0 60px ${theme.colors.accentGlow}` : 'none'}}>পাঠাও</div>
          </div>
        </Card>
      </Enter>
      <Sfx at={at(105)} type="pop" />
      <Sfx at={at(106) - 4} type="whoosh" rate={1.05} vol={0.8} />
      <Sfx at={start + per * words.length + 8} type="click" />
    </Stage>
  );
};

// ৪০ — সাবস্ক্রাইব + লোগো রিভিল (cue 107–108)
export const Subscribe: React.FC = () => {
  const {at, len} = useScene();
  const tags = ['সিনেমাটিক গল্প', 'মনোবিজ্ঞান', 'বাস্তবসম্মত আত্মউন্নয়ন'].map((t, i) => ({t, d: at(107) + 8 + Math.round((i * (len(107) - 16)) / 3)}));
  const press = useEase(at(108) + 40, 12, 'out');
  const done = press > 0.6;
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 90}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 30}}>
          <Words text="আরও এমন *ভিডিও* পেতে" delay={at(107)} per={5} size={88} />
          {tags.map((t) => (
            <Enter key={t.t} delay={t.d} dir="right" dist={50}>
              <Card style={{display: 'flex', alignItems: 'center', gap: 24, padding: '18px 36px', alignSelf: 'flex-start'}}><Sparkle size={50} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 56}}>{t.t}</span></Card>
            </Enter>
          ))}
          <Enter delay={at(108) + 20} dir="up" cfg="bouncy" style={{marginTop: 20}}>
            <div style={{alignSelf: 'flex-start', ...H, fontSize: 66, padding: '22px 64px', borderRadius: 999, background: done ? theme.colors.primarySoft : theme.colors.primary, color: done ? theme.colors.primary : theme.colors.onPrimary, transform: `scale(${1 - 0.07 * Math.sin(press * Math.PI)})`, boxShadow: done ? 'none' : `0 0 80px ${theme.colors.accentGlow}`, border: `3px solid ${theme.colors.primary}`}}>
              {done ? '✓ সাবস্ক্রাইবড' : 'সাবস্ক্রাইব'}
            </div>
          </Enter>
        </div>
        <Enter delay={at(108)} cfg="bouncy" from={0.6} float={5} style={{flexShrink: 0}}>
          <div style={{width: 640, height: 640, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 120px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <Img src={staticFile('logo.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        </Enter>
      </div>
      {tags.map((t, i) => <Sfx key={t.t} at={t.d} type="pop" rate={1 + i * 0.06} vol={0.75} />)}
      <Sfx at={at(108)} type="chime" />
      <Sfx at={at(108) + 40} type="click" />
    </Stage>
  );
};

// ৪১ — সমাপ্তি: লোগো ও ট্যাগলাইন (cue 109)
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const glow = 0.75 + Math.sin(f / 18) * 0.25;
  return (
    <Stage style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44}}>
        <Enter delay={at(109)} cfg="bouncy" from={0.55} float={4}>
          <div style={{width: 520, height: 520, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 ${140 * glow}px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <Img src={staticFile('logo.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        </Enter>
        <Words text="Better Mind, Bigger Life." delay={at(109) + 22} per={7} size={110} align="center" />
      </div>
      <Sfx at={at(109)} type="chime" />
      <Sfx at={at(109) + 22} type="pop" vol={0.7} />
    </Stage>
  );
};
