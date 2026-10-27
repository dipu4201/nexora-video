#!/usr/bin/env python3
"""কোডে SFX সিন্থেসাইজ: pop, click, whoosh, swipe, chime, thud. (numpy + scipy)
চালানো: python3 scripts/gen-sfx.py  -> public/sfx/*.wav"""
import numpy as np, wave, os
from scipy import signal

SR = 44100
rng = np.random.default_rng(7)
out = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(out, exist_ok=True)

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a=0.004, d=0.06, curve=5.0):
    x = np.arange(n) / SR
    e = np.exp(-curve * x / (n / SR))
    e *= np.minimum(1, x / a)
    r = np.minimum(1, (n / SR - x) / d)
    return e * r
def lowpass(x, fc): b, a = signal.butter(2, fc / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def highpass(x, fc): b, a = signal.butter(2, fc / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bandpass(x, lo, hi): b, a = signal.butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def reverb(x, wet=0.12, length=0.07):
    n = int(SR * length); ir = rng.standard_normal(n) * np.exp(-np.arange(n) / (n / 5)); ir[0] = 0
    y = signal.fftconvolve(x, ir)[: len(x)]
    return x + wet * y / (np.max(np.abs(y)) + 1e-9) * np.max(np.abs(x))
def finish(x, peak=0.89):
    x = lowpass(x, 9000)
    x = reverb(x)
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = int(SR * 0.008); x[-fade:] *= np.linspace(1, 0, fade)
    return x

def pop():
    tt = t(0.2); f = 150 + 520 * np.exp(-tt * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return finish(np.sin(ph) * env(len(tt), 0.003, 0.05, 6))
def click():
    tt = t(0.07); n = highpass(rng.standard_normal(len(tt)), 2400) * env(len(tt), 0.0008, 0.02, 9)
    tk = np.sin(2 * np.pi * 1900 * tt) * np.exp(-tt * 140) * 0.35
    return finish(n + tk)
def whoosh(d=0.62, lo=(300, 1800), peak_at=0.4):
    tt = t(d); n = rng.standard_normal(len(tt)); y = np.zeros_like(n)
    for k in range(10):
        c0 = lo[0] * (lo[1] / lo[0]) ** (k / 9); seg = bandpass(n, c0 * 0.8, c0 * 1.25)
        w = np.exp(-((tt / d - (0.12 + 0.8 * k / 9 * peak_at + 0.2)) ** 2) / 0.05)
        y += seg * w
    sh = np.sin(np.pi * np.clip(tt / d, 0, 1)) ** 1.6
    return finish(y * sh)
def swipe(): return whoosh(0.5, (400, 2600), 0.5)
def chime():
    tt = t(0.5); y = np.zeros_like(tt)
    for m, a, dcy in [(1, 1, 7), (2.0, 0.45, 9), (3.01, 0.22, 12), (4.2, 0.1, 15)]:
        y += a * np.sin(2 * np.pi * 880 * m * tt) * np.exp(-tt * dcy)
    return finish(y * np.minimum(1, tt / 0.004))
def thud():
    tt = t(0.4); f = 52 + 60 * np.exp(-tt * 14)
    ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) * env(len(tt), 0.006, 0.12, 6)
    return finish(lowpass(y, 400))

kit = {'pop': pop(), 'click': click(), 'whoosh': whoosh(), 'swipe': swipe(), 'chime': chime(), 'thud': thud()}
for name, x in kit.items():
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(os.path.join(out, name + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    print(f'{name:7s} {len(x)/SR:.2f}s peak={np.max(np.abs(x)):.2f} rms={np.sqrt(np.mean(x**2)):.3f} clipped={int(np.sum(np.abs(x) >= 0.999))}')
