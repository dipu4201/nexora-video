import React, {createContext, useContext} from 'react';
import {LEAD, cueEnd, cueStart} from './timing';

export type SceneInfo = {start: number; dur: number; from: number; to: number};

export const SceneCtx = createContext<SceneInfo>({start: 0, dur: 1, from: 1, to: 1});

// সিনের ভেতরের সময় সবসময় SRT cue থেকে আসে (LEAD ফ্রেম আগে)।
export const useScene = () => {
  const info = useContext(SceneCtx);
  const at = (n: number, extra = 0) => Math.max(0, cueStart(n) - LEAD - info.start) + extra;
  const len = (n: number, m = n) => cueEnd(m) - cueStart(n);
  return {...info, at, len};
};

export type SceneDef = {id: string; from: number; to: number; C: React.FC};
