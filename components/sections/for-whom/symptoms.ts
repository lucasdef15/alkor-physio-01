export interface BreathingProfile {
  breathDepth: number;

  breathRate: number;

  catch: number;

  compression: number;

  flow: number;

  glow: number;

  glowSwell: number;

  particle: number;

  particleSpeed: number;

  primary: RGB;

  secondary: RGB;

  sway: number;

  tilt: number;

  waveAmp: number;
}

export type RGB = readonly [number, number, number];

export interface Symptom {
  description: string;
  icon: SymptomIconName;
  id: string;
  profile: BreathingProfile;
  readout: {
    expansion: string;
    focus: string;
    rhythm: string;
  };
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
      compression: 0.72,
      flow: 0.34,
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
    readout: {
      expansion: 'Reduzida',
      focus: 'Controle do fôlego',
      rhythm: 'Curto',
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
      compression: 0.46,
      flow: 0.95,
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
    readout: {
      expansion: 'Sob esforço',
      focus: 'Ganho de resistência',
      rhythm: 'Acelerado',
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
      compression: 0.12,
      flow: 0.5,
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
    readout: {
      expansion: 'Progressiva',
      focus: 'Retorno seguro',
      rhythm: 'Profundo',
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
      compression: 0.82,
      flow: 0.7,
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
    readout: {
      expansion: 'Interrompida',
      focus: 'Mobilidade torácica',
      rhythm: 'Irregular',
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
      compression: 0.68,
      flow: 0.24,
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
    readout: {
      expansion: 'Limitada',
      focus: 'Autonomia gradual',
      rhythm: 'Contido',
    },
    short: 'Limitação',
    title: 'Sente que o corpo já não acompanha sua rotina',
  },
];
