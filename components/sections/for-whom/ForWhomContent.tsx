import { useActiveSymptom } from '@/hooks/useActiveSymptom';

import SymptomCard from './SymptomCard';
import { SYMPTOMS } from './symptoms';

export default function ForWhomContent() {
  const { clearHover, hover, isActive, onKeyNavigate, select } = useActiveSymptom(SYMPTOMS);

  return (
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
  );
}
