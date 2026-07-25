'use client';

import Link from 'next/link';

import { useRevealAnimation } from '@/components/motion/useRevealAnimation';

import { EVOLUTION_AREAS, EVOLUTION_DIMENSIONS } from './results.data';

export default function Results() {
  const { containerRef } = useRevealAnimation<HTMLElement>({
    start: 'top 82%',
  });

  return (
    <section
      aria-labelledby="results-title"
      className="relative overflow-hidden bg-white"
      id="resultados"
      ref={containerRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.08),transparent_68%)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-200/80 to-transparent"
      />

      <div className="site-container section-space relative">
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-[#07131f] shadow-[0_45px_110px_-52px_rgba(2,15,27,0.78)] sm:rounded-[2.25rem] lg:rounded-[2.75rem]"
          data-reveal="media"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.024)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_92%)] bg-size-[46px_46px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-44 -left-36 size-[30rem] rounded-full bg-teal-400/12 blur-[130px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-48 -bottom-44 size-[34rem] rounded-full bg-sky-400/8 blur-[150px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-300/30 to-transparent"
          />

          <div className="relative grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <header className="relative flex flex-col px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[42rem] lg:px-12 lg:py-14 xl:px-14 xl:py-16">
              <div>
                <div data-reveal>
                  <span className="inline-flex items-center gap-3 text-[0.62rem] font-semibold tracking-[0.2em] text-teal-300 uppercase">
                    <span className="h-px w-7 bg-teal-300/50" />
                    Evolução funcional
                  </span>
                </div>

                <h2
                  className="font-space-grotesk mt-6 max-w-xl text-[clamp(2rem,4.5vw,3.45rem)] leading-[1.03] font-semibold tracking-[-0.045em] text-balance text-white"
                  data-reveal
                  id="results-title"
                >
                  Quando o corpo volta a responder,
                  <span className="mt-1 block bg-linear-to-r from-teal-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                    a rotina começa a mudar.
                  </span>
                </h2>

                <p
                  className="mt-6 max-w-md text-sm leading-7 text-slate-300 sm:text-base sm:leading-8"
                  data-reveal
                >
                  A evolução é observada em capacidades que podem ser afetadas após internações,
                  ventilação mecânica, AVC ou por condições respiratórias.
                </p>
              </div>

              <div className="mt-10 border-t border-white/8 pt-6 lg:mt-auto" data-reveal>
                <span className="block text-[0.58rem] font-semibold tracking-[0.17em] text-teal-300/80 uppercase">
                  Quatro dimensões acompanhadas
                </span>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  {EVOLUTION_DIMENSIONS.map((dimension, index) => (
                    <span
                      className="group/dimension inline-flex items-center gap-2 text-xs text-slate-400"
                      key={dimension}
                    >
                      <span className="font-mono text-[0.55rem] font-semibold tracking-[0.14em] text-white/20 transition-colors duration-300 group-hover/dimension:text-teal-300/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="transition-colors duration-300 group-hover/dimension:text-slate-300">
                        {dimension}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <ol className="relative grid border-t border-white/8 lg:grid-rows-4 lg:border-t-0 lg:border-l">
              {EVOLUTION_AREAS.map(({ description, id, indicators, title }, index) => {
                const number = String(index + 1).padStart(2, '0');

                return (
                  <li
                    className="group relative flex overflow-hidden border-b border-white/8 last:border-b-0"
                    data-reveal
                    key={id}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-r from-teal-400/[0.065] via-teal-400/[0.018] to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-linear-to-b from-teal-300 via-teal-400/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute top-1/2 right-8 size-24 -translate-y-1/2 rounded-full bg-teal-300/[0.035] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 px-5 py-7 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-6 sm:px-8 sm:py-8 lg:items-start lg:px-10 lg:py-9">
                      <div className="relative pt-1">
                        <span className="font-mono text-[0.62rem] font-semibold tracking-[0.18em] text-slate-500 transition-colors duration-300 group-hover:text-teal-300/80">
                          {number}
                        </span>

                        <span
                          aria-hidden="true"
                          className="absolute top-7 left-[0.1rem] h-0 w-px bg-linear-to-b from-teal-300/50 to-transparent transition-all duration-500 ease-out group-hover:h-8"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-space-grotesk max-w-md text-lg leading-[1.2] font-semibold tracking-[-0.025em] text-white transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1 sm:text-xl lg:text-[1.35rem]">
                          {title}
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-[0.95rem] sm:leading-7">
                          {description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/6 pt-4">
                          {indicators.map((indicator) => (
                            <span
                              className="inline-flex items-center gap-2 text-[0.58rem] font-semibold tracking-[0.12em] text-slate-500 uppercase transition-colors duration-300 group-hover:text-slate-400"
                              key={indicator}
                            >
                              <span className="size-1 rounded-full bg-teal-400/60 shadow-[0_0_0_3px_rgba(45,212,191,0.04)] transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(45,212,191,0.07)]" />

                              {indicator}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <footer
            className="relative grid gap-5 border-t border-white/8 px-6 py-6 sm:px-10 sm:py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-12 xl:px-14"
            data-reveal
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/[0.035] to-transparent"
            />

            <p className="max-w-3xl text-xs leading-5 text-slate-400">
              Os objetivos e a progressão são definidos após a avaliação e variam conforme o quadro
              clínico, as necessidades e a resposta individual de cada paciente.
            </p>

            <Link
              className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:border-teal-300/30 hover:bg-teal-300/[0.07] hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
              href="#contato"
            >
              <span>Conversar sobre sua recuperação</span>

              <svg
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}
