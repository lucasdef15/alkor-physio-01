import Link from 'next/link';

import Physiotherapist from '@/public/physiotherapist.jpg';

import { PHYSIOTHERAPIST } from './about.data';
import AboutImage from './AboutImage';

export default function AboutContent() {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-1/2 -z-10 h-[34rem] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.10),transparent_68%)] blur-3xl"
      />

      <div className="flex flex-col gap-24 lg:gap-32">
        <section
          aria-labelledby="specialist-title"
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20 xl:gap-28"
        >
          <AboutImage
            alt="Dr. Davi Faria durante atendimento fisioterapêutico."
            description="Abordagem baseada em evidências científicas e foco na recuperação ágil."
            eyebrow="Destaque clínico"
            icon={
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M8 3v3" />
                <path d="M16 3v3" />
                <path d="M12 13v8" />
                <path d="M8 21h8" />
                <path d="M5 6h14" />
                <path d="M6 6v3a6 6 0 0 0 12 0V6" />
              </svg>
            }
            src={Physiotherapist}
            title="Atendimento humanizado"
          />

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div
              aria-hidden="true"
              className="border-primary/10 bg-primary/[0.03] absolute -top-8 -left-8 hidden size-24 rounded-full border lg:block"
            >
              <div className="border-primary/10 absolute inset-5 rounded-full border" />
            </div>

            <div className="relative">
              <span className="section-eyebrow mb-5">Sobre o especialista</span>

              <h2
                className="font-space-grotesk text-foreground max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-5xl xl:text-6xl"
                id="specialist-title"
              >
                {PHYSIOTHERAPIST.name}
              </h2>

              <p className="text-primary mt-4 text-lg font-medium tracking-[-0.015em] sm:text-xl">
                {PHYSIOTHERAPIST.title}
              </p>

              <div className="from-primary/30 via-primary/10 mt-8 h-px w-full bg-gradient-to-r to-transparent" />

              <blockquote className="border-primary/30 text-foreground-muted relative mt-8 border-l pl-6 text-base leading-8 sm:pl-8 sm:text-lg">
                <span
                  aria-hidden="true"
                  className="text-primary/15 absolute -top-3 left-4 font-serif text-5xl leading-none sm:left-5"
                >
                  “
                </span>

                <p className="relative">{PHYSIOTHERAPIST.manifesto}</p>
              </blockquote>

              <div className="mt-9 flex flex-wrap gap-2.5">
                {['Escuta ativa', 'Evidência científica', 'Cuidado individual'].map((item) => (
                  <span
                    className="border-border/70 bg-background/60 text-foreground-muted inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-[0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur-md"
                    key={item}
                  >
                    <svg
                      aria-hidden="true"
                      className="text-primary size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>

                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Link className="button-primary group/button" href="#contato">
                  Agendar avaliação
                  <svg
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
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

                <p className="text-foreground-muted max-w-52 text-xs leading-relaxed">
                  Avaliação individual para compreender suas necessidades e seus objetivos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="care-manifesto-title"
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/45 px-6 py-14 text-center shadow-[0_24px_80px_-42px_rgba(15,23,42,0.25)] backdrop-blur-2xl sm:px-12 sm:py-16 lg:rounded-[2.75rem] lg:px-20 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="bg-primary/10 absolute top-0 left-1/2 h-40 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          />

          <div
            aria-hidden="true"
            className="via-primary/30 absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="text-primary mb-5 inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
              <span className="bg-primary/40 h-px w-7" />
              Nossa visão
              <span className="bg-primary/40 h-px w-7" />
            </span>

            <h3
              className="font-montserrat text-foreground text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[2.75rem]"
              id="care-manifesto-title"
            >
              Cada pessoa possui uma <span className="text-primary">história única.</span>
            </h3>

            <p className="text-foreground-muted mx-auto mt-6 max-w-2xl text-base leading-8 text-pretty sm:text-lg">
              O tratamento respeita sua realidade, seus objetivos e seu tempo, porque recuperar a
              qualidade de vida vai muito além de aliviar sintomas.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
