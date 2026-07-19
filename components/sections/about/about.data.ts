'use client';

import { LucideIcon } from 'lucide-react';
import { Award, HeartPulse, ShieldCheck, Stethoscope, Users, Activity } from 'lucide-react';
import { ReactNode } from 'react';

export interface AboutDataProps {
  name: string;
  title: string;
  manifesto: string;
}

export interface PillarProps {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CredentialProps {
  id: number;
  icon: LucideIcon;
  label: string;
}

export const PHYSIOTHERAPIST: AboutDataProps = {
  name: 'Michael Kaily',
  title: 'Fisioterapeuta Cardiorrespiratório',
  manifesto:
    'Acredito que respirar bem é recuperar liberdade. Meu compromisso é oferecer um atendimento humanizado, baseado em evidências científicas e focado em devolver qualidade de vida a cada paciente.',
};

export const PILLARS: PillarProps[] = [
  {
    id: 1,
    icon: HeartPulse,
    title: 'Atendimento Humanizado',
    description:
      'Cada paciente recebe um plano de tratamento individualizado, respeitando sua história, limitações e objetivos.',
  },
  {
    id: 2,
    icon: Activity,
    title: 'Baseado em Evidências',
    description:
      'Protocolos modernos e condutas fundamentadas nas melhores evidências científicas disponíveis.',
  },
  {
    id: 3,
    icon: Users,
    title: 'Acompanhamento Contínuo',
    description:
      'Evolução monitorada de perto para garantir segurança, confiança e resultados consistentes durante todo o tratamento.',
  },
];

export const CREDENTIALS: CredentialProps[] = [
  {
    id: 11,
    icon: Stethoscope,
    label: 'Especialista em Fisioterapia Cardiorrespiratória',
  },
  {
    id: 12,
    icon: Award,
    label: 'Mais de 8 anos de experiência clínica',
  },
  {
    id: 13,
    icon: ShieldCheck,
    label: 'Atendimento baseado em evidências científicas',
  },
];
