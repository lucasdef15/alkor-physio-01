import type { LucideIcon } from 'lucide-react';

import { BatteryCharging, Footprints, Moon, ShieldCheck, Smile, Wind } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  label: string;
}

interface Stat {
  featured?: boolean;
  label: string;
  value: string;
}
const STATS: Stat[] = [
  { label: 'pacientes acompanhados', value: '+500' },
  { label: 'de experiência clínica', value: '10 anos' },
  { featured: true, label: 'relatam menos falta de ar*', value: '94%' },
  { label: 'indicariam o tratamento', value: '98%' },
];

const BENEFITS: Benefit[] = [
  { icon: Wind, label: 'Fôlego para o dia a dia' },
  { icon: BatteryCharging, label: 'Mais disposição' },
  { icon: Moon, label: 'Sono mais tranquilo' },
  { icon: Footprints, label: 'Autonomia para se movimentar' },
  { icon: ShieldCheck, label: 'Recuperação acompanhada' },
  { icon: Smile, label: 'Confiança para retomar a rotina' },
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
          <span className="section-eyebrow">Evolução percebida</span>
          <h2 className="section-title mx-auto mt-6">
            Resultados que aparecem na vida, não apenas nos exames.
          </h2>
          <p className="section-copy mx-auto mt-6">
            A evolução é acompanhada de perto para que cada ganho se traduza em mais capacidade
            respiratória, condicionamento físico, autonomia e qualidade de vida.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[var(--radius-panel)] border border-slate-200/70 bg-white/75 shadow-[var(--shadow-card)] backdrop-blur-xl">
          <div className="divide-border/60 grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
            {STATS.map((stat) => (
              <div
                className="flex min-h-40 flex-col items-center justify-center gap-2 px-4 py-7"
                key={stat.label}
              >
                <span
                  className={`font-space-grotesk text-3xl font-semibold tracking-[-0.04em] tabular-nums sm:text-4xl ${
                    stat.featured ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-foreground-muted max-w-[16ch] text-center text-xs leading-5 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-foreground-muted/70 mt-4 text-center text-xs">
          *Com base no acompanhamento das primeiras 8 semanas de tratamento.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <span
              className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-2.5 text-sm shadow-sm"
              key={label}
            >
              <Icon className="text-primary size-4" strokeWidth={1.75} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
