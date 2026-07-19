'use client';

import { useRef } from 'react';

import { useActiveSymptom } from '@/hooks/useActiveSymptom';
import { useBreathingAnimation } from '@/hooks/useBreathingAnimation';

import BreathingIllustration from './BreathingIllustration';
import SymptomCard from './SymptomCard';
import { SYMPTOMS } from './symptoms';

export default function ForWhom() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { active, clearHover, hover, isActive, onKeyNavigate, select } = useActiveSymptom(SYMPTOMS);

  useBreathingAnimation(stageRef, active.profile);

  const [r, g, b] = active.profile.primary;
  const accent = `${r}, ${g}, ${b}`;

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-[#EDF8FA] via-[#F4FAFB] to-[#F8FCFD]"
      id="para-quem"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[-12%] h-120 w-120 rounded-full bg-teal-300/12 blur-[170px]" />
        <div className="absolute bottom-[-10%] left-[-12%] h-120 w-120 rounded-full bg-sky-300/12 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-16 gap-y-16 px-6 py-28 md:py-36 lg:grid-cols-12">
        {/* Text + symptoms */}
        <div className="lg:col-span-5">
          <span className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">
            Para quem é
          </span>

          <h2 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Este cuidado é
            <br />
            <span className="bg-linear-to-r from-teal-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              para você que:
            </span>
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
            A fisioterapia cardiorrespiratória é indicada para quem enfrenta limitações que afetam a
            respiração, a energia e a qualidade de vida.
          </p>

          <div
            aria-label="Situações atendidas pela fisioterapia cardiorrespiratória"
            className="mt-10 flex flex-col gap-2.5"
            onKeyDown={onKeyNavigate}
            role="group"
          >
            {SYMPTOMS.map((symptom) => (
              <SymptomCard
                active={isActive(symptom.id)}
                key={symptom.id}
                onLeave={clearHover}
                onPeek={hover}
                onSelect={select}
                symptom={symptom}
              />
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
            <BreathingIllustration className="h-full w-full" stageRef={stageRef} />

            <div className="pointer-events-none absolute top-2 right-2 hidden max-w-[13rem] text-right sm:top-6 sm:right-4 sm:block">
              <p className="text-[13px] font-semibold text-slate-600">
                A ilustração reage ao que você sente.
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                Passe o mouse ou use o teclado para explorar cada situação.
              </p>
            </div>

            <div className="pointer-events-none absolute bottom-1 left-1/2 w-[min(90%,22rem)] -translate-x-1/2">
              <div
                className="fw-rise rounded-2xl border border-white/60 bg-white/70 px-5 py-4 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-28px_rgba(15,23,42,0.5)] backdrop-blur-md"
                key={active.id}
              >
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: `rgb(${accent})` }}
                >
                  {active.short}
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="relative z-10 mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 pb-20 text-sm text-slate-400">
        <svg
          className="h-4 w-4 text-teal-500/70"
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
        Cada pessoa tem uma história. O tratamento é sempre individualizado.
      </p>
    </section>
  );
}
