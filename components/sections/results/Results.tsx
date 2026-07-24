import type { LucideIcon } from 'lucide-react';

import {
  Activity,
  Footprints,
  HeartPulse,
  House,
  PersonStanding,
  ShieldCheck,
  Wind,
} from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  label: string;
}

interface EvolutionArea {
  description: string;
  featured?: boolean;
  icon: LucideIcon;
  title: string;
}

const EVOLUTION_AREAS: EvolutionArea[] = [
  {
    description:
      'Estratégias direcionadas ao controle respiratório e à melhor tolerância às atividades.',
    featured: true,
    icon: Wind,
    title: 'Capacidade respiratória',
  },
  {
    description:
      'Progressão cuidadosa para caminhar, realizar esforços e enfrentar as atividades da rotina.',
    icon: Activity,
    title: 'Condicionamento físico',
  },
  {
    description:
      'Recuperação de movimentos, equilíbrio e segurança para realizar tarefas com menos dependência.',
    icon: PersonStanding,
    title: 'Mobilidade e autonomia',
  },
  {
    description:
      'Continuidade da reabilitação iniciada no hospital, adaptada à realidade do paciente em casa.',
    icon: House,
    title: 'Recuperação pós-hospitalar',
  },
];

const BENEFITS: Benefit[] = [
  {
    icon: Wind,
    label: 'Respirar com mais conforto',
  },
  {
    icon: Footprints,
    label: 'Caminhar com mais segurança',
  },
  {
    icon: Activity,
    label: 'Aumentar a tolerância ao esforço',
  },
  {
    icon: PersonStanding,
    label: 'Recuperar movimentos e autonomia',
  },
  {
    icon: ShieldCheck,
    label: 'Evoluir com acompanhamento',
  },
  {
    icon: HeartPulse,
    label: 'Retomar a rotina gradualmente',
  },
];

export default function Results() {
  return (
    <section className="relative overflow-hidden bg-white" id="resultados">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-teal-100/35 blur-[130px]"
      />

      <div className="site-container section-space relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Evolução acompanhada</span>

          <h2 className="section-title mx-auto mt-6">
            Cada avanço ajuda o paciente a recuperar segurança e autonomia.
          </h2>

          <p className="section-copy mx-auto mt-6">
            A evolução é acompanhada de acordo com a condição clínica, as limitações e os objetivos
            de cada paciente. O tratamento busca recuperar capacidades importantes para respirar,
            movimentar-se e retomar a rotina com mais segurança.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {EVOLUTION_AREAS.map(({ description, featured, icon: Icon, title }) => (
            <article
              className={[
                'relative flex min-h-60 flex-col rounded-[1.5rem] border p-6',
                'shadow-[var(--shadow-card)] backdrop-blur-xl',
                'transition-transform duration-300 hover:-translate-y-1',
                featured
                  ? 'border-primary/20 bg-primary/[0.055]'
                  : 'border-slate-200/70 bg-white/75',
              ].join(' ')}
              key={title}
            >
              <div
                className={[
                  'flex size-11 items-center justify-center rounded-2xl border',
                  featured
                    ? 'border-primary/20 bg-primary/10 text-primary'
                    : 'text-foreground border-slate-200 bg-slate-50',
                ].join(' ')}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </div>

              <h3 className="font-space-grotesk text-foreground mt-6 text-lg font-semibold tracking-[-0.025em]">
                {title}
              </h3>

              <p className="text-foreground-muted mt-3 text-sm leading-6">{description}</p>
            </article>
          ))}
        </div>

        <p className="text-foreground-muted/75 mx-auto mt-5 max-w-2xl text-center text-xs leading-5">
          Cada paciente possui necessidades e tempos de recuperação diferentes. A evolução depende
          do quadro clínico, da avaliação e da resposta individual ao acompanhamento.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 lg:mt-12">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <span
              className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-2.5 text-sm shadow-sm"
              key={label}
            >
              <Icon
                aria-hidden="true"
                className="text-primary size-4 shrink-0"
                strokeWidth={1.75}
              />

              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
