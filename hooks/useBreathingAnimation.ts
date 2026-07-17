'use client';

import { RefObject, useEffect, useRef } from 'react';

import { BreathingProfile, RGB } from '@/components/sections/for-whom/symptoms';

interface AnimatedState {
  breathDepth: number;
  breathRate: number;
  catch: number;
  glow: number;
  particle: number;
  phase: number;
  primary: [number, number, number];
  secondary: [number, number, number];
  tilt: number;
  waveAmp: number;
  waveShift: number;
  waveSpeed: number;
}

const WAVE_TILE = 120;

/**
 * Drives the breathing illustration entirely through CSS custom properties
 * written onto a single element. No React re-render happens per frame: the
 * loop lerps every visual parameter toward the active symptom's profile, so
 * switching symptoms feels like a natural, continuous change of state.
 */
export function useBreathingAnimation(
  targetRef: RefObject<HTMLElement | null>,
  profile: BreathingProfile,
): void {
  const profileRef = useRef(profile);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const initial = profileRef.current;
    const state: AnimatedState = {
      breathDepth: initial.breathDepth,
      breathRate: initial.breathRate,
      catch: initial.catch,
      glow: initial.glow,
      particle: initial.particle,
      phase: 0,
      primary: [...initial.primary] as [number, number, number],
      secondary: [...initial.secondary] as [number, number, number],
      tilt: initial.tilt,
      waveAmp: initial.waveAmp,
      waveShift: 0,
      waveSpeed: initial.waveSpeed,
    };

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const target = profileRef.current;
      const ease = 1 - Math.exp(-3.2 * dt);
      const easeColor = 1 - Math.exp(-2.6 * dt);

      state.breathDepth = lerp(state.breathDepth, target.breathDepth, ease);
      state.breathRate = lerp(state.breathRate, target.breathRate, ease);
      state.catch = lerp(state.catch, target.catch, ease);
      state.glow = lerp(state.glow, target.glow, ease);
      state.particle = lerp(state.particle, target.particle, ease);
      state.tilt = lerp(state.tilt, target.tilt, ease);
      state.waveAmp = lerp(state.waveAmp, target.waveAmp, ease);
      state.waveSpeed = lerp(state.waveSpeed, target.waveSpeed, ease);
      state.primary = lerpRGB(state.primary, target.primary, easeColor);
      state.secondary = lerpRGB(state.secondary, target.secondary, easeColor);

      let breath = 0.5;
      let coughPulse = 0;
      let sway = 0;

      if (!prefersReducedMotion) {
        state.phase += (dt * (Math.PI * 2)) / Math.max(0.6, state.breathRate);
        breath = smootherstep((Math.sin(state.phase - Math.PI / 2) + 1) / 2);
        coughPulse = state.catch * Math.pow(Math.max(0, Math.sin(state.phase * 2.15)), 14);
        sway = Math.sin(state.phase) * 0.45;
        state.waveShift = (state.waveShift + dt * state.waveSpeed * 26) % WAVE_TILE;
      }

      const lungScale = 1 + breath * state.breathDepth - coughPulse * 0.055;
      const glow = Math.min(1, state.glow * (0.72 + 0.28 * breath) + coughPulse * 0.22);
      const waveAmp = state.waveAmp * (0.85 + 0.25 * breath);

      const [r1, g1, b1] = state.primary;
      const [r2, g2, b2] = state.secondary;

      const s = el.style;
      s.setProperty('--breath', breath.toFixed(4));
      s.setProperty('--lung-scale', lungScale.toFixed(4));
      s.setProperty('--glow', glow.toFixed(4));
      s.setProperty('--wave-amp', waveAmp.toFixed(4));
      s.setProperty('--wave-shift', `${state.waveShift.toFixed(2)}px`);
      s.setProperty('--particle', state.particle.toFixed(4));
      s.setProperty('--tilt', `${(state.tilt + sway).toFixed(3)}deg`);
      s.setProperty('--cough', coughPulse.toFixed(4));
      s.setProperty('--c1r', Math.round(r1).toString());
      s.setProperty('--c1g', Math.round(g1).toString());
      s.setProperty('--c1b', Math.round(b1).toString());
      s.setProperty('--c2r', Math.round(r2).toString());
      s.setProperty('--c2g', Math.round(g2).toString());
      s.setProperty('--c2b', Math.round(b2).toString());

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [targetRef]);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRGB(a: [number, number, number], b: RGB, t: number): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function smootherstep(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * c * (c * (c * 6 - 15) + 10);
}
