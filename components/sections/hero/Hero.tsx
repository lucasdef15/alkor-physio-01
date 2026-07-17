'use client';

import { useRef } from 'react';

import { useBackgroundCanvas } from '@/hooks/useBackgroundCanvas';

import ScrollBadge from './ScrollBadge';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundCanvas({ canvasRef });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-cyan-50/30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-12%] h-140 w-140 rounded-full bg-sky-100/30 blur-[190px]" />
        <div className="absolute right-[-10%] bottom-[-15%] h-130 w-130 rounded-full bg-teal-50/50 blur-[190px]" />
      </div>

      <canvas
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply"
        ref={canvasRef}
      />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 pb-32 text-center md:pb-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-900/[0.06] bg-white/70 px-4 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
          </span>
          <span className="text-[13px] font-medium tracking-wide text-slate-600">
            Fisioterapia Cardiorrespiratória Especializada
          </span>
        </div>

        <h1 className="text-[2.75rem] leading-[1.08] font-semibold tracking-tight text-slate-900 sm:text-6xl md:text-[4.25rem]">
          Respire fundo.
          <br />
          <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
            Seu coração e pulmões
          </span>
          <br />
          merecem cuidado especializado.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
          Reabilitação cardiorrespiratória guiada por evidência científica, com acompanhamento
          próximo e humano — para você recuperar fôlego, força e qualidade de vida.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.25)] transition-all duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.1),0_12px_28px_-6px_rgba(15,23,42,0.35)] hover:brightness-110"
            href="#agendar"
          >
            Agendar avaliação
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-7 py-3.5 text-[15px] font-medium text-slate-700 backdrop-blur-sm transition-colors duration-300 hover:border-slate-300 hover:bg-white"
            href="#tratamentos"
          >
            Conhecer tratamentos
          </a>
        </div>

        <div className="mt-16 mb-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>
            <span>CREFITO ativo</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>
            <span>+10 anos de experiência</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>
            <span>Atendimento personalizado</span>
          </div>
        </div>
        <ScrollBadge />
      </div>
    </section>
  );
}
