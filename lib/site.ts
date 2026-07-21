const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  'http://localhost:3000';

const normalizedDeploymentUrl = deploymentHost.startsWith('http')
  ? deploymentHost
  : `https://${deploymentHost}`;

export const SITE_URL = new URL(normalizedDeploymentUrl);

export const SITE_CONFIG = {
  contact: {
    email: 'contato@alkorphysio.com',
    location: 'São Paulo, SP',
    phoneDisplay: '(11) 99999-9999',
    phoneHref: '+5511999999999',
  },
  description:
    'Reabilitação cardiorrespiratória guiada por evidência científica — recupere fôlego, força e qualidade de vida com acompanhamento próximo e humano.',
  name: 'ΛLKOR Physio',
  professional: {
    manifesto:
      'Acredito que respirar bem é recuperar liberdade. Meu compromisso é oferecer um atendimento humanizado, baseado em evidências científicas e focado em devolver qualidade de vida a cada paciente.',
    name: 'Nilton Petrone',
    title: 'Fisioterapeuta Cardiorrespiratório',
  },
  title: 'ΛLKOR Physio — Fisioterapia Cardiorrespiratória',
} as const;
