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
  /** Intensity of the ambient glow behind the lungs (0..1). */
  glow: number;
  /** How lively the floating particles are (0..1). */
  particle: number;
  /** Primary gradient color as an RGB triple. */
  primary: RGB;
  /** Secondary gradient color as an RGB triple. */
  secondary: RGB;
  /** Subtle postural tilt of the whole figure, in degrees. */
  tilt: number;
  /** Amplitude of the breathing waves that flow outward (0..1). */
  waveAmp: number;
  /** Flow speed of the breathing waves (relative). */
  waveSpeed: number;
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
      breathDepth: 0.05,
      breathRate: 2.6,
      catch: 0,
      glow: 0.5,
      particle: 0.55,
      primary: TEAL,
      secondary: SKY,
      tilt: 0,
      waveAmp: 0.7,
      waveSpeed: 1.45,
    },
    short: 'Falta de ar',
    title: 'Você perde o fôlego em tarefas simples',
  },
  {
    description: 'Caminhar ou subir escadas passou a exigir muito mais esforço do que antes.',
    icon: 'stairs',
    id: 'effort',
    profile: {
      breathDepth: 0.09,
      breathRate: 2.2,
      catch: 0,
      glow: 0.62,
      particle: 0.85,
      primary: INDIGO,
      secondary: SKY,
      tilt: 2,
      waveAmp: 1,
      waveSpeed: 1.95,
    },
    short: 'Esforço ao caminhar',
    title: 'Caminhar ou subir escadas cansa mais que antes',
  },
  {
    description: 'Você está em recuperação de uma cirurgia cardíaca ou pulmonar.',
    icon: 'recovery',
    id: 'recovery',
    profile: {
      breathDepth: 0.11,
      breathRate: 6.4,
      catch: 0,
      glow: 0.72,
      particle: 0.35,
      primary: EMERALD,
      secondary: TEAL,
      tilt: 0,
      waveAmp: 0.62,
      waveSpeed: 0.72,
    },
    short: 'Recuperação',
    title: 'Está se recuperando de uma cirurgia cardíaca ou pulmonar',
  },
  {
    description: 'Convive com tosse frequente ou uma sensação de aperto no peito.',
    icon: 'cough',
    id: 'cough',
    profile: {
      breathDepth: 0.045,
      breathRate: 3.2,
      catch: 1,
      glow: 0.55,
      particle: 0.6,
      primary: VIOLET,
      secondary: SKY,
      tilt: -1.4,
      waveAmp: 0.45,
      waveSpeed: 1.1,
    },
    short: 'Tosse / aperto',
    title: 'Convive com tosse frequente ou aperto no peito',
  },
  {
    description: 'Sente que o corpo já não acompanha o ritmo da sua rotina.',
    icon: 'limit',
    id: 'limitation',
    profile: {
      breathDepth: 0.045,
      breathRate: 4.2,
      catch: 0,
      glow: 0.4,
      particle: 0.3,
      primary: AMBER,
      secondary: VIOLET,
      tilt: 1.6,
      waveAmp: 0.5,
      waveSpeed: 0.9,
    },
    short: 'Limitação',
    title: 'Sente que o corpo já não acompanha sua rotina',
  },
];
