import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {useScene} from '../scene';
import {Card, Chip, Photo, Stage} from '../components/Ui';
import {DrawPath, Enter, MaskLine, Struck, Words, clamp01, useEase, useSpring} from '../components/Motion';
import {Apple, Book, Check, Cross, House, Moon, Play, Pulse, RainCloud, Sparkle, Sun, Toothbrush, Bulb} from '../components/Icons';
import {Sfx} from '../components/AudioKit';

const H: React.CSSProperties = {fontFamily: theme.fonts.display, fontWeight: theme.weight.hero, letterSpacing: 0};

// ১১ — Statement Card + Photo: সৎ প্রশ্ন (cue 27–28)
export const Honest: React.FC = () => {
  const {at} = useScene();
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 90}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 34}}>
          <Enter delay={at(27)} dir="down" dist={24}><Chip dark>একটা সৎ প্রশ্ন</Chip></Enter>
          <Enter delay={at(28)} dir="up" cfg="bouncy">
            <Card style={{padding: '50px 54px', borderRadius: 52, position: 'relative'}}>
              <div style={{...H, position: 'absolute', top: -30, left: 36, fontSize: 200, lineHeight: 1, color: theme.colors.accent}}>“</div>
              <div style={{paddingTop: 54}}>
                <Words text="আমি তো জানি কি করতে হবে, *তাহলে করছি না কেন?*" delay={at(28) + 8} per={5} size={80} />
              </div>
            </Card>
          </Enter>
        </div>
        <Enter delay={at(27) - 4} dir="right" dist={80} style={{width: 720, height: 840, flexShrink: 0}}>
          <Photo src="images/thoughtful.jpg" w={720} h={840} pos="38% 30%" zoomOut />
        </Enter>
      </div>
      <Sfx at={at(27)} type="pop" />
      <Sfx at={at(28)} type="whoosh" rate={1.05} />
    </Stage>
  );
};

// ১২ — তথ্যের অভাব নয় + মুড গেজ (cue 29–30)
export const NotInfo: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const sw = interpolate(Math.sin(f / 9) + Math.sin(f / 4.3) * 0.6, [-1.6, 1.6], [-62, 62]);
  const h1 = useEase(at(30) - 6, 10, 'in');
  const gp = useSpring(at(30), 'smooth');
  return (
    <Stage style={{justifyContent: 'center'}}>
      <div style={{position: 'relative', height: 200}}>
        <div style={{position: 'absolute', inset: 0, opacity: 1 - h1, transform: `translateY(${-24 * h1}px)`}}>
          <Words text="সমস্যা *তথ্যের অভাব* নয়" delay={at(29)} per={6} size={104} />
        </div>
        <div style={{position: 'absolute', inset: 0}}>
          <Words text="প্রতিদিন নিজের *মনের অবস্থার* উপর ভরসা" delay={at(30) + 2} per={5} size={96} />
        </div>
      </div>
      <div style={{display: 'flex', gap: 70, marginTop: 40, justifyContent: 'center'}}>
        <Enter delay={at(29) + 10} dir="right" dist={60}>
          <Card style={{width: 780, height: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
            <Book size={190} />
            <div style={{...H, fontSize: 92, color: theme.colors.textDim}}><Struck delay={at(29) + 40}>তথ্যের অভাব</Struck></div>
          </Card>
        </Enter>
        <Enter delay={at(30) + 6} dir="left" dist={60}>
          <Card dark style={{width: 780, height: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <svg width={520} height={300} viewBox="0 0 520 300" style={{opacity: gp}}>
              <path d="M40 270 A220 220 0 0 1 480 270" fill="none" stroke="rgba(246,241,231,0.22)" strokeWidth={30} strokeLinecap="round" />
              <path d="M40 270 A220 220 0 0 1 150 80" fill="none" stroke={theme.colors.accent} strokeWidth={30} strokeLinecap="round" opacity={0.5} />
              <g transform={`rotate(${sw} 260 270)`}>
                <path d="M260 270 L260 90" stroke={theme.colors.onPrimary} strokeWidth={12} strokeLinecap="round" />
              </g>
              <circle cx={260} cy={270} r={26} fill={theme.colors.accent} />
            </svg>
            <div style={{...H, fontSize: 66, color: theme.colors.onPrimary}}>মনের অবস্থা</div>
          </Card>
        </Enter>
      </div>
      <Sfx at={at(29)} type="whoosh" />
      <Sfx at={at(29) + 40} type="click" />
      <Sfx at={at(30) + 6} type="pop" />
    </Stage>
  );
};

// ১৩ — Before/After: মন ভালো বনাম মন খারাপ (cue 31–32)
export const Mood: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const mid = at(31) + Math.round(len(31) / 2);
  return (
    <Stage style={{justifyContent: 'center'}}>
      <div style={{display: 'flex', gap: 70, justifyContent: 'center', marginTop: 20}}>
        <Enter delay={at(31)} dir="up" cfg="bouncy">
          <Card style={{width: 780, height: 460, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22}}>
            <Sun size={150} />
            <div style={{...H, fontSize: 84}}>মন ভালো</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}><Check size={56} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 60}}>কাজ করে</span></div>
          </Card>
        </Enter>
        <Enter delay={mid} dir="up" cfg="bouncy">
          <Card style={{width: 780, height: 460, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22}}>
            <RainCloud size={150} />
            <div style={{...H, fontSize: 84}}>মন খারাপ</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}><Cross size={56} /><span style={{...H, fontWeight: theme.weight.strong, fontSize: 60, color: theme.colors.textDim}}>করে না</span></div>
          </Card>
        </Enter>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50, marginTop: 56}}>
        <Enter delay={at(32)} cfg="bouncy" from={0.6}>
          <svg width={150} height={150} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={42} fill={theme.colors.cardSolid} stroke={theme.colors.primary} strokeWidth={6} />
            <path d="M50 50 L50 20" stroke={theme.colors.primary} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 4} 50 50)`} />
            <circle cx={50} cy={50} r={5} fill={theme.colors.accent} />
          </svg>
        </Enter>
        <Words text="জীবন তো *মনের মেজাজ* বুঝে চলে না?" delay={at(32) + 6} per={5} size={78} />
      </div>
      <Sfx at={at(31)} type="pop" />
      <Sfx at={mid} type="pop" rate={0.92} />
      <Sfx at={at(32)} type="whoosh" rate={1.1} vol={0.8} />
    </Stage>
  );
};

// ১৪ — Glossy "শুরু" বাটন (cue 33–34)
export const Idea: React.FC = () => {
  const f = useCurrentFrame();
  const {at} = useScene();
  const ring = (k: number) => clamp01(((f - at(34) - k * 14) % 56) / 56);
  const bp = useSpring(at(34), 'bouncy');
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 60}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 34}}>
          <Enter delay={at(33)} dir="down" dist={24}><Chip>প্রথমবার</Chip></Enter>
          <Words text="একটা *নতুন কথা* ভাবলো" delay={at(33) + 6} per={5} size={104} />
          <div style={{marginTop: 28}}><Words text="ইচ্ছা না থাকলেও *শুরু করার উপায়?*" delay={at(34)} per={5} size={92} /></div>
        </div>
        <div style={{width: 640, height: 860, position: 'relative', flexShrink: 0}}>
          <div style={{position: 'absolute', left: 190, top: 40}}>
            <Enter delay={at(33) + 4} cfg="bouncy" from={0.5} float={6}>
              <div style={{filter: `drop-shadow(0 0 40px ${theme.colors.accentGlow})`}}><Bulb size={260} /></div>
            </Enter>
          </div>
          <div style={{position: 'absolute', left: 120, top: 400, width: 400, height: 400}}>
            {[0, 1].map((k) => (
              <div key={k} style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${theme.colors.accent}`, opacity: (1 - ring(k)) * 0.6 * clamp01(f - at(34)), transform: `scale(${1 + ring(k) * 0.55})`}} />
            ))}
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: theme.colors.primary, boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${bp})`, flexDirection: 'column', gap: 6}}>
              <Play size={110} color={theme.colors.onPrimary} fill={theme.colors.onPrimary} />
              <span style={{...H, fontSize: 60, color: theme.colors.onPrimary}}>শুরু</span>
            </div>
          </div>
        </div>
      </div>
      <Sfx at={at(33)} type="chime" />
      <Sfx at={at(34)} type="pop" />
    </Stage>
  );
};

// ১৫ — Checklist: শৃঙ্খলা মানে কী নয়, কী (cue 35–37)
export const Definition: React.FC = () => {
  const {at} = useScene();
  const no = [{t: 'নিজের উপর কঠোর হওয়া', d: at(35) + 8}, {t: 'নিজেকে শাস্তি দেওয়া', d: at(36)}];
  return (
    <Stage style={{justifyContent: 'center'}}>
      <Enter delay={at(35)} dir="down" dist={24}><Chip dark>শৃঙ্খলা মানে</Chip></Enter>
      <div style={{display: 'flex', gap: 56, marginTop: 40}}>
        {no.map((n) => (
          <Enter key={n.t} delay={n.d} dir="up" style={{flex: 1}}>
            <Card style={{height: 270, display: 'flex', alignItems: 'center', gap: 34}}>
              <Cross size={90} />
              <div style={{...H, fontSize: 68, lineHeight: 1.35, color: theme.colors.textDim}}><Struck delay={n.d + 24}>{n.t}</Struck> <span style={{fontWeight: theme.weight.strong}}>নয়</span></div>
            </Card>
          </Enter>
        ))}
      </div>
      <Enter delay={at(37)} dir="up" cfg="bouncy" style={{marginTop: 50}}>
        <Card dark style={{padding: '46px 60px', boxShadow: `0 0 100px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
            {['মন চাইলেও কাজটা করা', 'মন না চাইলেও কাজটা করা'].map((t, i) => (
              <Enter key={t} delay={at(37) + 10 + i * 36} dir="right" dist={50} style={{display: 'flex', alignItems: 'center', gap: 34}}>
                <Check size={76} color={theme.colors.accent} />
                <span style={{...H, fontSize: 88, color: theme.colors.onPrimary}}>{t}</span>
              </Enter>
            ))}
          </div>
        </Card>
      </Enter>
      <Sfx at={at(35) + 8} type="pop" />
      <Sfx at={at(36)} type="pop" rate={0.94} />
      <Sfx at={at(37)} type="whoosh" />
      <Sfx at={at(37) + 46} type="click" />
    </Stage>
  );
};

// ১৬ — দাঁত ব্রাশ: অভ্যাসের অংশ (cue 38–40)
export const Brush: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const days = 7;
  const wig = Math.sin(f * 0.9) * 6 * clamp01((f - at(39)) / 6) * (1 - useEase(at(40), 10, 'in'));
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 80}}>
        <Enter delay={at(39) - 4} dir="right" dist={70} style={{width: 760, flexShrink: 0}}>
          <Card style={{height: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56}}>
            <div style={{transform: `rotate(${-18 + wig}deg)`}}><Toothbrush size={300} /></div>
            <div style={{display: 'flex', gap: 18}}>
              {Array.from({length: days}).map((_, i) => {
                const d = at(39) + 14 + Math.round((i * (len(39) - 20)) / days);
                const p = useSpring(d, 'bouncy');
                return (
                  <div key={i} style={{width: 76, height: 76, borderRadius: 24, background: theme.colors.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{transform: `scale(${p})`}}><Check size={46} /></div>
                  </div>
                );
              })}
            </div>
            <Enter delay={at(39) + 10}><Chip>প্রতিদিন</Chip></Enter>
          </Card>
        </Enter>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 40}}>
          <Enter delay={at(38)} dir="down" dist={24}><Chip dark>একটু ভাবো</Chip></Enter>
          <Words text="প্রতিবার *অনুপ্রেরণা* খোঁজে?" delay={at(39) + 6} per={6} size={96} />
          <div style={{display: 'flex', alignItems: 'center', gap: 36, marginTop: 20}}>
            <Enter delay={at(40)} cfg="bouncy" from={0.5}><span style={{...H, fontSize: 180, color: theme.colors.accent, lineHeight: 1.1}}>না</span></Enter>
            <Words text="কাজটা *অভ্যাসের অংশ*" delay={at(40) + 10} per={6} size={80} />
          </div>
        </div>
      </div>
      <Sfx at={at(38)} type="pop" />
      <Sfx at={at(39)} type="whoosh" rate={1.05} />
      <Sfx at={at(40)} type="thud" vol={0.7} />
    </Stage>
  );
};

// ১৭ — Flat Vector: আবহাওয়া বনাম ভিটি (cue 41–44)
export const Weather: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const aOut = useEase(at(43) - 8, 12, 'in');
  const collapse = useEase(at(43) + Math.round(len(43) * 0.45), 26, 'in');
  const firm = useSpring(at(44), 'bouncy');
  const base = useSpring(at(44) - 6, 'smooth');
  const wob = Math.sin(f / 4) * 3 * (1 - collapse) + collapse * 22;
  const houseOnCloud = 1 - useEase(at(44) - 8, 10, 'in');
  return (
    <Stage>
      <div style={{display: 'flex', height: '100%', gap: 60}}>
        <div style={{width: 760, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34}}>
          <Enter delay={at(41)} dir="down" dist={24}><Chip dark>অনুপ্রেরণা মানে</Chip></Enter>
          <Words text="*আবহাওয়ার* মতো" delay={at(41) + 6} per={6} size={112} />
          <div style={{minHeight: 220}}>
            <Words text="তার উপর *বাড়ি বানানো* যায় না" delay={at(43) + 6} per={5} size={78} />
          </div>
          <div style={{minHeight: 150}}>
            <Words text="শৃঙ্খলা হলো সেই *ভিটি*" delay={at(44) + 6} per={5} size={78} />
          </div>
        </div>
        <div style={{flex: 1, position: 'relative'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', gap: 40, justifyContent: 'center', opacity: 1 - aOut, transform: `translateY(${-30 * aOut}px)`}}>
            <Enter delay={at(42)} cfg="bouncy" float={5}>
              <Card style={{width: 380, height: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24}}>
                <Sun size={190} /><span style={{...H, fontSize: 72}}>আজ রোদ</span>
              </Card>
            </Enter>
            <Enter delay={at(42) + Math.round(len(42) / 2)} cfg="bouncy" float={5}>
              <Card style={{width: 380, height: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24}}>
                <RainCloud size={190} /><span style={{...H, fontSize: 72}}>কাল বৃষ্টি</span>
              </Card>
            </Enter>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 160, height: 700}}>
            <div style={{position: 'absolute', left: 150, top: 90, opacity: houseOnCloud}}>
              <Enter delay={at(43)} dir="up">
                <div style={{transform: `translateY(${collapse * 120}px) rotate(${wob}deg)`, opacity: 1 - collapse * 0.5}}>
                  <House size={340} />
                </div>
                <div style={{marginTop: -50, marginLeft: 20}}><RainCloud size={300} /></div>
              </Enter>
            </div>
            <div style={{position: 'absolute', left: 130, top: 450, width: 440, height: 110, borderRadius: 24, background: theme.colors.primary, transform: `scaleX(${base})`, opacity: base, display: 'flex', alignItems: 'center', justifyContent: 'center', ...H, fontSize: 56, color: theme.colors.onPrimary, boxShadow: theme.shadow}}>
              শৃঙ্খলা
            </div>
            <div style={{position: 'absolute', left: 190, top: 120, transform: `translateY(${(1 - firm) * -100}px)`, opacity: clamp01(firm)}}>
              <House size={320} />
            </div>
          </div>
        </div>
      </div>
      <Sfx at={at(41)} type="whoosh" />
      <Sfx at={at(42)} type="pop" />
      <Sfx at={at(42) + Math.round(len(42) / 2)} type="pop" rate={0.92} />
      <Sfx at={at(43)} type="pop" rate={0.9} />
      <Sfx at={at(44)} type="thud" />
    </Stage>
  );
};

// ১৮ — Line Draw: আবেগ ও শক্তির ওঠানামা (cue 45–46)
export const Wave: React.FC = () => {
  const f = useCurrentFrame();
  const {at, len} = useScene();
  const W = 1560, Hh = 460;
  const pts = Array.from({length: 61}, (_, i) => {
    const x = (i / 60) * W; const y = Hh / 2 + Math.sin(i / 60 * Math.PI * 4.2 + 0.6) * 150 + Math.sin(i / 60 * Math.PI * 9) * 40;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const t = useEase(at(46) + 10, Math.max(60, len(46) - 20), 'inOut');
  const idx = Math.min(60, Math.round(t * 60));
  return (
    <Stage style={{justifyContent: 'center'}}>
      <Enter delay={at(45)} dir="down" dist={24}><Chip dark>মনোবিজ্ঞান</Chip></Enter>
      <div style={{marginTop: 28}}><Words text="আবেগ আর শক্তির মাত্রা *ওঠানামা* করে" delay={at(46)} per={5} size={88} /></div>
      <Enter delay={at(45) + 8} dir="up" style={{marginTop: 44}}>
        <Card style={{padding: '36px 40px'}}>
          <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`} style={{overflow: 'visible'}}>
            <path d={`M0 ${Hh / 2} L${W} ${Hh / 2}`} stroke={theme.colors.line} strokeWidth={4} strokeDasharray="10 14" />
            <DrawPath d={d} delay={at(46) + 10} dur={Math.max(60, len(46) - 20)} color={theme.colors.primary} width={10} />
            <circle cx={pts[idx][0]} cy={pts[idx][1]} r={20 + Math.sin(f / 5) * 2} fill={theme.colors.accent} opacity={clamp01(t * 20)} />
          </svg>
        </Card>
      </Enter>
      <Sfx at={at(45)} type="pop" />
      <Sfx at={at(46) + 10} type="whoosh" rate={0.95} />
    </Stage>
  );
};

// ১৯ — Hub and Spoke: প্রভাবকারী চার উপাদান (cue 47)
export const Hub: React.FC = () => {
  const {at, len} = useScene();
  const cx = 960, cy = 540;
  const nodes = [
    {t: 'ঘুম', dx: -540, dy: -230, icon: <Moon size={80} />},
    {t: 'মানসিক চাপ', dx: 540, dy: -230, icon: <Pulse size={84} />},
    {t: 'খাবার', dx: -540, dy: 230, icon: <Apple size={80} />},
    {t: 'পরিবেশ', dx: 540, dy: 230, icon: <House size={84} />},
  ].map((n, i) => ({...n, d: at(47) + 16 + Math.round((i * (len(47) - 30)) / 4)}));
  return (
    <Stage pad={0}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {nodes.map((n) => <DrawPath key={n.t} d={`M${cx} ${cy} L${cx + n.dx} ${cy + n.dy}`} delay={n.d - 6} dur={20} color={theme.colors.accent} width={7} />)}
      </svg>
      <div style={{position: 'absolute', left: cx - 190, top: cy - 190, width: 380, height: 380}}>
        <Enter delay={at(47)} cfg="bouncy" from={0.5} float={4}>
          <div style={{width: 380, height: 380, borderRadius: '50%', background: theme.colors.primary, boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', ...H, fontSize: 66, lineHeight: 1.35, color: theme.colors.onPrimary}}>
            আবেগ ও<br />শক্তি
          </div>
        </Enter>
      </div>
      {nodes.map((n) => (
        <div key={n.t} style={{position: 'absolute', left: cx + n.dx - 230, top: cy + n.dy - 70, width: 460}}>
          <Enter delay={n.d} cfg="bouncy" from={0.8} dir={n.dx < 0 ? 'right' : 'left'} dist={40}>
            <Card style={{height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '0 28px'}}>
              {n.icon}<span style={{...H, fontSize: 60, color: theme.colors.primary}}>{n.t}</span>
            </Card>
          </Enter>
        </div>
      ))}
      <Sfx at={at(47)} type="pop" />
      {nodes.map((n, i) => <Sfx key={n.t} at={n.d} type="pop" rate={1 + i * 0.05} vol={0.75} />)}
    </Stage>
  );
};

// ২০ — আজ সহজ, কাল কঠিন — এটা স্বাভাবিক (cue 48–49)
export const TodayTomorrow: React.FC = () => {
  const {at} = useScene();
  const bar = (d: number, w: number) => {
    const g = useEase(d + 10, 26, 'out');
    return <div style={{height: 26, borderRadius: 26, background: theme.colors.primarySoft, overflow: 'hidden', width: '100%'}}><div style={{height: '100%', width: `${w * g}%`, borderRadius: 26, background: w > 50 ? theme.colors.primary : theme.colors.accent}} /></div>;
  };
  const d1 = at(48), d2 = at(48) + 26;
  return (
    <Stage style={{justifyContent: 'center'}}>
      <div style={{display: 'flex', gap: 70, justifyContent: 'center'}}>
        <Enter delay={d1} dir="up"><Card style={{width: 780, height: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}><Chip>আজ</Chip><span style={{...H, fontSize: 104}}>সহজ</span></div>{bar(d1, 22)}
        </Card></Enter>
        <Enter delay={d2} dir="up"><Card style={{width: 780, height: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}><Chip dark>কাল</Chip><span style={{...H, fontSize: 104}}>কঠিন</span></div>{bar(d2, 88)}
        </Card></Enter>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, marginTop: 70}}>
        <Enter delay={at(49)} dir="left" dist={50}>
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}><Cross size={70} /><span style={{...H, fontSize: 88, color: theme.colors.textDim}}><Struck delay={at(49) + 14}>দুর্বলতা</Struck></span></div>
        </Enter>
        <Enter delay={at(49) + 30} dir="right" dist={50} cfg="bouncy">
          <Card dark style={{display: 'flex', alignItems: 'center', gap: 26, padding: '22px 46px', boxShadow: `0 0 90px ${theme.colors.accentGlow}, ${theme.shadow}`}}>
            <Check size={70} color={theme.colors.accent} /><span style={{...H, fontSize: 88, color: theme.colors.onPrimary}}>স্বাভাবিক ধর্ম</span>
          </Card>
        </Enter>
      </div>
      <Sfx at={d1} type="pop" />
      <Sfx at={d2} type="pop" rate={0.92} />
      <Sfx at={at(49) + 14} type="click" />
      <Sfx at={at(49) + 30} type="chime" />
    </Stage>
  );
};
