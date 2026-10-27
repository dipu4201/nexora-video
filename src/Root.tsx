import React from 'react';
import {Composition} from 'remotion';
import './fonts';
import {Main} from './Main';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './timing';

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
);
