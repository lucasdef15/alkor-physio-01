/**
 * A fully lerp-able description of how the breathing illustration should feel
 * for a given symptom. Every value is a plain number (or an RGB triple) so the
 * animation hook can smoothly interpolate between two profiles.
 */
export interface BreathingProfile {
  /** Peak expansion of the abstract lungs (relative scale added on inhale). */
  breathDepth: number;
  /** Length of a full breathing cycle, in seconds. Lower = faster breathing. */
  breathRate: number;
  /** Irregularity of the breath — introduces a "catch"/stutter (0..1). */
  catch: number;
  /** Base intensity of the ambient glow behind the lungs (0..1). */
  glow: number;
  /** Slow, gradual swelling of the glow — reads as recovery (0..1). */
  glowSwell: number;
  /** Density/opacity of the floating particles (0..1). */
  particle: number;
  /** Relative float speed of the particles (higher = faster). */
  particleSpeed: number;
  /** Primary gradient color as an RGB triple. */
  primary: RGB;
  /** Secondary gradient color as an RGB triple. */
  secondary: RGB;
  /** Amplitude of a subtle chest sway synced to the breath, in degrees. */
  sway: number;
  /** Subtle postural tilt of the whole figure, in degrees. */
  tilt: number;
  /** Amplitude/opacity of the breath ripples emanating from the chest (0..1). */
  waveAmp: number;
}

export type RGB = readonly [number, number, number];

export interface Symptom {
  /** Longer supporting line shown inside the card. */
  description: string;
  icon: SymptomIconName;
  id: string;
  /** How the illustration should react while this symptom is active. */
  profile: BreathingProfile;
  /** Short caption used by the illustration legend. */
  short: string;
  title: string;
}

export type SymptomIconName = 'breath' | 'cough' | 'limit' | 'recovery' | 'stairs';

const TEAL: RGB = [20, 184, 166];
const SKY: RGB = [56, 189, 248];
const INDIGO: RGB = [129, 140, 248];
const EMERALD: RGB = [52, 211, 153];
const VIOLET: RGB = [167, 139, 250];
const AMBER: RGB = [251, 146, 60];

export const SYMPTOMS: Symptom[] = [
  {
    description: 'Tarefas simples deixam a respiração curta e o peito sem expansão.',
    icon: 'breath',
    id: 'breathless',
    profile: {
      breathDepth: 0.032,
      breathRate: 2.9,
      catch: 0,
      glow: 0.4,
      glowSwell: 0,
      particle: 0.42,
      particleSpeed: 0.6,
      primary: TEAL,
      secondary: SKY,
      sway: 0,
      tilt: 0,
      waveAmp: 0.42,
    },
    short: 'Falta de ar',
    title: 'Você perde o fôlego em tarefas simples',
  },
  {
    description: 'Caminhar ou subir escadas passou a exigir muito mais esforço do que antes.',
    icon: 'stairs',
    id: 'effort',
    profile: {
      breathDepth: 0.088,
      breathRate: 2.05,
      catch: 0,
      glow: 0.6,
      glowSwell: 0,
      particle: 0.85,
      particleSpeed: 1.85,
      primary: INDIGO,
      secondary: SKY,
      sway: 1.4,
      tilt: 2.4,
      waveAmp: 0.9,
    },
    short: 'Esforço ao caminhar',
    title: 'Caminhar ou subir escadas cansa mais que antes',
  },
  {
    description: 'Você está em recuperação de uma cirurgia cardíaca ou pulmonar.',
    icon: 'recovery',
    id: 'recovery',
    profile: {
      breathDepth: 0.1,
      breathRate: 6.4,
      catch: 0,
      glow: 0.5,
      glowSwell: 1,
      particle: 0.32,
      particleSpeed: 0.5,
      primary: EMERALD,
      secondary: TEAL,
      sway: 0,
      tilt: 0,
      waveAmp: 0.6,
    },
    short: 'Recuperação',
    title: 'Está se recuperando de uma cirurgia cardíaca ou pulmonar',
  },
  {
    description: 'Convive com tosse frequente ou uma sensação de aperto no peito.',
    icon: 'cough',
    id: 'cough',
    profile: {
      breathDepth: 0.05,
      breathRate: 3.4,
      catch: 1,
      glow: 0.5,
      glowSwell: 0,
      particle: 0.55,
      particleSpeed: 1,
      primary: VIOLET,
      secondary: SKY,
      sway: 0,
      tilt: -1.2,
      waveAmp: 0.5,
    },
    short: 'Tosse / aperto',
    title: 'Convive com tosse frequente ou aperto no peito',
  },
  {
    description: 'Sente que o corpo já não acompanha o ritmo da sua rotina.',
    icon: 'limit',
    id: 'limitation',
    profile: {
      breathDepth: 0.026,
      breathRate: 4.2,
      catch: 0,
      glow: 0.36,
      glowSwell: 0,
      particle: 0.28,
      particleSpeed: 0.55,
      primary: AMBER,
      secondary: VIOLET,
      sway: 0,
      tilt: 3,
      waveAmp: 0.38,
    },
    short: 'Limitação',
    title: 'Sente que o corpo já não acompanha sua rotina',
  },
];
