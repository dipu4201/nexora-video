import {SRT} from './data/script';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const LEAD = 5; // ভিজ্যুয়াল কথার ৪–৬ ফ্রেম আগে ঢোকে
export const TRANS = 10; // সিনের এক্সিট/ওভারল্যাপ ফ্রেম

export type Cue = {n: number; start: number; end: number; text: string};

const toSec = (t: string) => {
  const m = t.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  if (!m) throw new Error('Bad SRT time: ' + t);
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4]) / 1000;
};

export const parseSrt = (src: string): Cue[] =>
  src
    .replace(/\r/g, '')
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n');
      const [a, b] = lines[1].split('-->');
      return {n: Number(lines[0]), start: toSec(a), end: toSec(b), text: lines.slice(2).join(' ')};
    });

export const cues = parseSrt(SRT);

export const cueStart = (n: number) => Math.round(cues[n - 1].start * FPS);
export const cueEnd = (n: number) => Math.round(cues[n - 1].end * FPS);
export const TOTAL_FRAMES = cueEnd(cues.length);
