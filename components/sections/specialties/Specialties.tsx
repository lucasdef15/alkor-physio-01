import Link from 'next/link';

interface PracticeArea {
  description: string;
  featured?: boolean;
  id: number;
  title: string;
}

const PRACTICE_AREAS: PracticeArea[] = [
  {
    description:
      'Continuidade do cuidado após a alta, com foco em força, mobilidade e segurança para retomar atividades.',
    featured: true,
    id: 1,
    title: 'Recuperação após internação',
  },
  {
    description:
      'Acompanhamento da recuperação respiratória e funcional após períodos de suporte ventilatório.',
    id: 2,
    title: 'Após ventilação mecânica',
  },
  {
    description:
      'Cuidado voltado à mobilidade, ao equilíbrio e à independência nas atividades do dia a dia.',
    id: 3,
    title: 'Reabilitação após AVC',
  },
  {
    description:
      'Atendimento para limitações respiratórias, falta de ar e redução da tolerância aos esforços da rotina.',
    id: 4,
    title: 'DPOC, asma e outras condições',
  },
  {
    description:
      'Plano realizado em casa e adaptado à condição clínica, ao ambiente e às necessidades do paciente.',
    id: 5,
    title: 'Reabilitação no domicílio',
  },
  {
    description:
      'Progressão de força, condicionamento e tolerância ao esforço após imobilidade ou perda funcional.',
    id: 6,
    title: 'Recuperação funcional',
  },
];

export default function Specialties() {
  return (
    <section
      aria-labelledby="practice-areas-title"
      className="relative overflow-hidden bg-linear-to-b from-[#EDF8FA] via-[#F4FAFB] to-[#F8FCFD]"
      id="especialidades"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-12rem] right-[-14rem] size-[34rem] rounded-full bg-teal-300/10 blur-[150px]" />

        <div className="absolute bottom-[-15rem] left-[-16rem] size-[38rem] rounded-full bg-sky-300/10 blur-[170px]" />

        <div className="absolute top-0 left-1/2 h-px w-full max-w-5xl -translate-x-1/2 bg-linear-to-r from-transparent via-teal-500/15 to-transparent" />
      </div>

      <div className="site-container section-space relative z-10">
        <header className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
          <div>
            <span className="section-eyebrow">Áreas de atuação</span>

            <h2 className="section-title mt-6 max-w-3xl" id="practice-areas-title">
              Cuidado respiratório e funcional em diferentes momentos da recuperação.
            </h2>
          </div>

          <p className="section-copy max-w-2xl lg:justify-self-end">
            O atendimento acompanha pacientes após internações e em condições que afetam a
            respiração, o movimento e a autonomia, com continuidade no domicílio quando necessário.
          </p>
        </header>

        <ol className="mt-12 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {PRACTICE_AREAS.map(({ description, featured, id, title }, index) => {
            const number = String(index + 1).padStart(2, '0');

            return (
              <li
                className={[
                  'group relative isolate flex min-h-[13.5rem] flex-col overflow-hidden',
                  'rounded-[1.4rem] border p-5',
                  'shadow-[0_20px_55px_-42px_rgba(15,23,42,0.35)]',
                  'backdrop-blur-xl',
                  'transition-all duration-500 ease-[var(--ease-premium)]',
                  'motion-safe:hover:-translate-y-1',
                  'motion-safe:hover:shadow-[0_28px_70px_-44px_rgba(15,118,110,0.32)]',
                  'sm:min-h-[16rem] sm:p-6',
                  'lg:min-h-[17.5rem] lg:p-7',
                  featured
                    ? 'border-primary/25 bg-primary/[0.055]'
                    : 'border-slate-200/70 bg-white/80',
                ].join(' ')}
                key={id}
              >
                <div
                  aria-hidden="true"
                  className="from-primary/0 via-primary/45 to-primary/0 absolute inset-x-7 top-0 h-px bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div
                  aria-hidden="true"
                  className="bg-primary/[0.055] absolute -top-16 -right-16 -z-10 size-40 rounded-full blur-3xl transition-transform duration-700 motion-safe:group-hover:scale-125"
                />

                <div className="flex items-center gap-3">
                  <span
                    className={[
                      'font-mono text-[0.65rem] font-semibold tracking-[0.18em]',
                      'transition-colors duration-300',
                      featured ? 'text-primary/75' : 'group-hover:text-primary/65 text-slate-300',
                    ].join(' ')}
                  >
                    {number}
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      'h-px min-w-6 flex-1',
                      featured
                        ? 'bg-primary/25'
                        : 'group-hover:bg-primary/25 bg-slate-200 transition-colors duration-300',
                    ].join(' ')}
                  />

                  {featured && (
                    <span className="text-primary/75 text-[0.58rem] leading-none font-semibold tracking-[0.16em] uppercase">
                      Continuidade do cuidado
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-12 sm:pt-16">
                  <h3 className="font-space-grotesk text-foreground max-w-[18ch] text-lg leading-[1.18] font-semibold tracking-[-0.025em] sm:text-xl">
                    {title}
                  </h3>

                  <p className="text-foreground-muted mt-3 max-w-[38ch] text-sm leading-6">
                    {description}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="from-primary/55 absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r to-transparent transition-[width] duration-500 ease-out group-hover:w-full"
                />
              </li>
            );
          })}
        </ol>

        <div className="border-border/70 mx-auto mt-12 grid max-w-6xl gap-6 border-t pt-8 sm:mt-14 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p className="text-foreground-muted max-w-2xl text-sm leading-6">
            <strong className="text-foreground font-medium">
              Cada caso exige uma avaliação individual.
            </strong>{' '}
            Converse com o fisioterapeuta para compreender se o acompanhamento é indicado para o seu
            momento.
          </p>

          <Link className="button-primary w-full justify-center sm:w-fit" href="#contato">
            Conversar com o fisioterapeuta
            <svg
              aria-hidden="true"
              className="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
