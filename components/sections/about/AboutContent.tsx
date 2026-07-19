'use client';

import Link from 'next/link';

import AboutImage from './AboutImage';
import { PHYSIOTHERAPIST, PILLARS } from './about.data';

export default function AboutContent() {
  return (
    <div className="flex flex-col gap-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <AboutImage />
        <div className="flex flex-col">
          <span className="text-primary mb-4 text-xs font-bold tracking-[0.2em] uppercase">
            Sobre o especialista
          </span>
          <h2 className="font-montserrat text-foreground text-5xl font-extrabold tracking-tight">
            {PHYSIOTHERAPIST.name}
          </h2>

          <p className="text-primary mt-3 text-xl font-medium">{PHYSIOTHERAPIST.title}</p>

          <p className="text-foreground-muted border-primary/20 mt-8 border-l-2 pl-6 text-lg leading-relaxed">
            {PHYSIOTHERAPIST.manifesto}
          </p>

          <div className="mt-10">
            <Link
              href="#contato"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-full px-7 py-3 font-semibold transition"
            >
              Agendar avaliação
            </Link>
          </div>
        </div>
      </div>

      {/* Frase */}

      <div className="mx-auto max-w-4xl text-center">
        <p className="text-foreground text-3xl leading-relaxed font-light md:text-4xl">
          Cada pessoa possui uma história única.
        </p>

        <p className="text-foreground-muted mt-5 text-xl leading-relaxed">
          O tratamento respeita sua realidade, seus objetivos e seu tempo, porque recuperar a
          qualidade de vida vai muito além de aliviar sintomas.
        </p>
      </div>

      {/* Pilares */}

      <div>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Como é o atendimento
          </span>

          <h3 className="text-foreground mt-5 text-4xl font-bold">Um cuidado pensado para você.</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="bg-surface/50 border-border/60 rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-primary-soft text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <pillar.icon className="h-7 w-7" />
              </div>

              <h4 className="text-foreground text-xl font-semibold">{pillar.title}</h4>

              <p className="text-foreground-muted mt-4 leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
