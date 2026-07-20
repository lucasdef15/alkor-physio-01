'use client';

import { CSSProperties, useEffect, useRef } from 'react';

import { useActiveSymptom } from '@/hooks/useActiveSymptom';
import { useBreathingAnimation } from '@/hooks/useBreathingAnimation';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

import BreathingIllustration from './BreathingIllustration';
import SymptomCard from './SymptomCard';
import { SYMPTOMS } from './symptoms';

export default function ForWhom() {
  const stageRef = useRef<HTMLDivElement>(null);
  const symptomsRef = useRef<HTMLDivElement>(null);
  const {
    active,
    clearHover,
    clearSelection,
    hasSelection,
    hover,
    isActive,
    onKeyNavigate,
    select,
  } = useActiveSymptom(SYMPTOMS);
  const horizontalScroll = useHorizontalScroll(symptomsRef);

  useEffect(() => {
    const clearWhenOutside = (event: PointerEvent) => {
      if (!symptomsRef.current?.contains(event.target as Node)) clearSelection();
    };

    document.addEventListener('pointerdown', clearWhenOutside);
    return () => document.removeEventListener('pointerdown', clearWhenOutside);
  }, [clearSelection]);

  useBreathingAnimation(stageRef, active.profile);

  const [r, g, b] = active.profile.primary;
  const [r2, g2, b2] = active.profile.secondary;
  const accent = `${r}, ${g}, ${b}`;
  const panelStyle = {
    '--fw-accent': accent,
    '--fw-accent-secondary': `${r2}, ${g2}, ${b2}`,
  } as CSSProperties;

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-[#f7fbfc] via-white to-[#f5fafb]"
      id="para-quem"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,.1),transparent_62%)]" />

      <div className="site-container section-space relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Para quem é</span>
          <h2 className="section-title mt-5">
            O que você sente também
            <span className="block bg-linear-to-r from-teal-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
              pode ser compreendido.
            </span>
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-2xl">
            Cada sintoma muda a forma como o corpo respira. Explore os sinais abaixo e veja como um
            cuidado individualizado começa pela escuta certa.
          </p>
        </div>
        <div
          className="fw-console relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#07131f] shadow-[0_42px_100px_-42px_rgba(2,15,27,.72)] md:mt-16 md:rounded-[2.5rem]"
          style={panelStyle}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-size-[48px_48px]" />
          <div
            className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full blur-[120px] transition-colors duration-700"
            style={{ background: `rgba(${accent}, .2)` }}
          />

          <div className="relative flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                  style={{ background: `rgb(${accent})` }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: `rgb(${accent})` }}
                />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-300 uppercase">
                Resposta respiratória
              </span>
            </div>
            <span className="hidden text-[10px] tracking-[0.14em] text-slate-500 uppercase sm:block">
              Selecione um sinal para explorar
            </span>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(320px,0.84fr)_minmax(0,1.5fr)]">
            <div className="min-w-0 border-b border-white/8 p-4 sm:p-6 lg:border-r lg:border-b-0 lg:p-7 xl:p-9">
              <p className="mb-5 max-w-sm text-sm leading-relaxed text-slate-400">
                A visualização reage ao ritmo, à expansão e ao esforço percebido em cada situação.
              </p>

              <div
                aria-label="Situações atendidas pela fisioterapia cardiorrespiratória"
                className="flex cursor-grab snap-x snap-mandatory touch-pan-x select-none [scrollbar-width:none] gap-2 overflow-x-auto pb-2 data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none sm:grid sm:cursor-auto sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:select-auto lg:grid-cols-1 [&::-webkit-scrollbar]:hidden"
                onKeyDown={onKeyNavigate}
                ref={symptomsRef}
                role="group"
                {...horizontalScroll}
              >
                {SYMPTOMS.map((symptom, index) => (
                  <SymptomCard
                    active={isActive(symptom.id)}
                    index={index}
                    key={symptom.id}
                    onLeave={clearHover}
                    onPeek={hover}
                    onSelect={select}
                    symptom={symptom}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[530px] min-w-0 flex-col overflow-hidden sm:min-h-[600px] lg:min-h-0">
              <div className="relative min-h-0 flex-1">
                <div className="absolute top-6 left-6 z-10 sm:top-8 sm:left-8">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                    {hasSelection ? 'Sinal selecionado' : 'Resposta em exploração'}
                  </span>
                  <div className="mt-2 flex items-center gap-2.5">
                    <span
                      className="h-px w-7 transition-colors duration-500"
                      style={{ background: `rgb(${accent})` }}
                    />
                    <span className="text-sm font-medium text-white">{active.short}</span>
                  </div>
                </div>

                <BreathingIllustration
                  className="absolute inset-0 h-full w-full px-2 pt-14 sm:px-10 sm:pt-8"
                  stageRef={stageRef}
                />

                <div className="pointer-events-none absolute right-5 bottom-4 left-5 sm:right-8 sm:bottom-7 sm:left-8">
                  <div
                    className="fw-rise overflow-hidden rounded-2xl border border-white/10 bg-[#0a1927]/78 shadow-[0_18px_50px_rgba(0,0,0,.28)] backdrop-blur-xl"
                    key={active.id}
                  >
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                      <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                        {active.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 border-t border-white/8">
                      <Readout label="Ritmo" value={active.readout.rhythm} />
                      <Readout label="Expansão" value={active.readout.expansion} />
                      <Readout label="Foco do cuidado" value={active.readout.focus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between gap-3 rounded-lg p-3 text-xs leading-relaxed text-slate-500">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-teal-600">
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
          </span>
          <p className="flex-1 text-left">
            Esta experiência é ilustrativa, não diagnóstica. A avaliação profissional é o que
            transforma sinais em um plano de cuidado seguro e individualizado.
          </p>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-r border-white/8 px-3 py-3.5 last:border-r-0 sm:px-5">
      <span className="block text-[8px] font-semibold tracking-[0.13em] text-slate-500 uppercase sm:text-[9px]">
        {label}
      </span>
      <span className="mt-1.5 block text-[9px] leading-snug font-medium text-slate-200 sm:text-xs">
        {value}
      </span>
    </div>
  );
}
