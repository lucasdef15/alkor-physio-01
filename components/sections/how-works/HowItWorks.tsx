import { PILLARS } from './works.data';

export default function HowItWorks() {
  return (
    <section className="relative bg-white" id="como-funciona">
      <div className="site-container section-space">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Como funciona</span>
          <h2 className="section-title mx-auto mt-6">Segurança clínica em cada etapa.</h2>
          <p className="section-copy mx-auto mt-6">
            Um processo claro, próximo e ajustado à sua evolução — da primeira avaliação à retomada
            confiante das atividades do dia a dia.
          </p>
        </div>

        <div className="border-border/70 relative mt-14 overflow-hidden rounded-[var(--radius-panel)] border bg-slate-50/70 shadow-[var(--shadow-card)]">
          <div
            aria-hidden="true"
            className="via-primary/25 pointer-events-none absolute inset-x-[16.67%] top-[5.35rem] hidden h-px bg-gradient-to-r from-transparent to-transparent md:block"
          />

          <div className="divide-border/60 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
            {PILLARS.map((pillar, index) => (
              <article
                className="group relative flex flex-col items-center px-7 py-10 text-center sm:px-10 md:py-14"
                key={pillar.id}
              >
                <span className="absolute top-7 right-8 text-xs font-semibold tracking-[0.16em] text-slate-300">
                  0{index + 1}
                </span>
                <div className="border-border group-hover:border-primary/35 group-hover:bg-primary/[0.06] text-primary relative z-10 mb-7 flex size-14 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 motion-safe:group-hover:scale-105">
                  <pillar.icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-space-grotesk text-xl font-semibold tracking-[-0.025em] text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[29ch] text-sm leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
