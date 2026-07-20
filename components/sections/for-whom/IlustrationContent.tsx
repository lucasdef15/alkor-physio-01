import { useRef } from 'react';

import { useActiveSymptom } from '@/hooks/useActiveSymptom';
import { useBreathingAnimation } from '@/hooks/useBreathingAnimation';

import BreathingIllustration from './BreathingIllustration';
import { SYMPTOMS } from './symptoms';

export default function IlustrationContent() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { active } = useActiveSymptom(SYMPTOMS);

  useBreathingAnimation(stageRef, active.profile);

  const [r, g, b] = active.profile.primary;
  const accent = `${r}, ${g}, ${b}`;
  return (
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
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{active.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
