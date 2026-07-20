import type { LucideIcon } from 'lucide-react';

import { Activity, Dumbbell, HeartPulse, ShieldCheck, Sparkles, Wind } from 'lucide-react';

interface Specialty {
  description: string;
  featured?: boolean;
  icon: LucideIcon;
  title: string;
}

const specialties: Specialty[] = [
  {
    description:
      'Recondicionamento físico para pacientes pós-infarto, pós-cirurgia cardíaca ou com insuficiência cardíaca, com monitoramento contínuo dos sinais vitais.',
    featured: true,
    icon: HeartPulse,
    title: 'Reabilitação Cardíaca',
  },
  {
    description:
      'Protocolos para DPOC, asma, bronquite e outras condições pulmonares, voltados a melhorar a expansão pulmonar e reduzir a falta de ar.',
    icon: Wind,
    title: 'Reabilitação Pulmonar',
  },
  {
    description:
      'Preparo antes de cirurgias cardíacas e torácicas, e reabilitação acelerada no pós-operatório, reduzindo complicações e tempo de internação.',
    icon: ShieldCheck,
    title: 'Fisioterapia Pré e Pós-Cirúrgica',
  },
  {
    description:
      'Fortalecimento dos músculos respiratórios com equipamentos específicos, ganhando fôlego e resistência para as atividades do dia a dia.',
    icon: Activity,
    title: 'Treinamento Muscular Respiratório',
  },
  {
    description:
      'Acompanhamento para quem convive com sequelas respiratórias e cansaço persistente, com progressão segura e individualizada.',
    icon: Sparkles,
    title: 'Reabilitação Pós-COVID',
  },
  {
    description:
      'Programas de exercício adaptados às suas limitações, elevando gradualmente a capacidade física com segurança e base científica.',
    icon: Dumbbell,
    title: 'Condicionamento Cardiorrespiratório',
  },
];

export default function Specialties() {
  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-[#EDF8FA] via-[#F4FAFB] to-[#F8FCFD]"
      id="especialidades"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[-12%] h-120 w-120 rounded-full bg-teal-300/12 blur-[170px]" />
        <div className="absolute bottom-[-10%] left-[-12%] h-120 w-120 rounded-full bg-sky-300/12 blur-[170px]" />
      </div>

      <div className="site-container section-space relative z-10 flex flex-col items-center text-center">
        <span className="section-eyebrow">Tratamentos</span>

        <h2 className="section-title mt-6 max-w-3xl">
          Um plano clínico para cada etapa da sua recuperação.
        </h2>

        <p className="section-copy mt-6 max-w-2xl">
          Da reabilitação cardíaca ao fortalecimento pulmonar, cada especialidade é conduzida com
          rigor técnico e um olhar humano — para que você respire, se mova e viva com mais
          liberdade.
        </p>

        <div className="mt-14 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {specialties.map(({ description, featured, icon: Icon, title }) => (
            <div
              className={`group relative flex min-h-72 flex-col rounded-[var(--radius-card)] border p-7 shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-premium)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-card-hover)] ${
                featured ? 'border-teal-200/80 bg-teal-50/70' : 'border-white/80 bg-white/80'
              }`}
              key={title}
            >
              {featured && (
                <span className="absolute top-6 right-6 rounded-full bg-white px-3 py-1 text-[10px] font-medium tracking-wide text-teal-600 uppercase shadow-sm">
                  Especialidade principal
                </span>
              )}

              <div className="mb-8 flex size-12 items-center justify-center rounded-2xl border border-teal-500/10 bg-teal-500/[0.08] text-teal-600 transition-colors group-hover:bg-teal-500/[0.12]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <h3 className="font-space-grotesk text-xl font-semibold tracking-[-0.02em] text-slate-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-slate-200/70 pt-10 sm:flex-row sm:justify-center">
          <p className="max-w-md text-sm text-slate-500 italic">
            Não encontrou sua condição na lista? Cada quadro clínico é avaliado de forma individual.
          </p>
          <a className="button-primary shrink-0" href="#contato">
            Fale com a gente
          </a>
        </div>
      </div>
    </section>
  );
}
