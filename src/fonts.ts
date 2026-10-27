import {loadFont} from '@remotion/google-fonts/HindSiliguri';

// যুক্তাক্ষর ঠিক রাখে এমন বাংলা ফন্ট। ওজন ৪০০–৭০০।
export const {fontFamily} = loadFont('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
});
