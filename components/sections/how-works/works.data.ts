import { Activity, HeartPulse, Users } from 'lucide-react';

export interface PillarProps {
  description: string;
  icon: typeof Activity | typeof HeartPulse | typeof Users;
  id: number;
  title: string;
}

export const PILLARS: PillarProps[] = [
  {
    description:
      'Cada paciente recebe um plano de tratamento individualizado, respeitando sua história, limitações e objetivos.',
    icon: HeartPulse,
    id: 1,
    title: 'Atendimento Humanizado',
  },
  {
    description:
      'Protocolos modernos e condutas fundamentadas nas melhores evidências científicas disponíveis.',
    icon: Activity,
    id: 2,
    title: 'Baseado em Evidências',
  },
  {
    description:
      'Evolução monitorada de perto para garantir segurança, confiança e resultados consistentes durante todo o tratamento.',
    icon: Users,
    id: 3,
    title: 'Acompanhamento Contínuo',
  },
];
