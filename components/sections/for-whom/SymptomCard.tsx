import SymptomIcon from './SymptomIcon';
import { Symptom } from './symptoms';

interface SymptomCardProps {
  active: boolean;
  index: number;
  onLeave: () => void;
  onPeek: (id: string) => void;
  onSelect: (id: string) => void;
  selected: boolean;
  symptom: Symptom;
}

export default function SymptomCard({
  active,
  index,
  onLeave,
  onPeek,
  onSelect,
  selected,
  symptom,
}: SymptomCardProps) {
  const [r, g, b] = symptom.profile.primary;
  const rgb = `${r}, ${g}, ${b}`;

  return (
    <button
      aria-pressed={selected}
      className="group relative flex min-h-[74px] w-[278px] min-w-[278px] snap-start items-center gap-3 overflow-hidden rounded-2xl border px-3.5 py-3 text-left transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f] sm:w-full sm:min-w-0 sm:gap-4 sm:px-4"
      onBlur={onLeave}
      onClick={() => onSelect(symptom.id)}
      onFocus={() => onPeek(symptom.id)}
      onMouseEnter={() => onPeek(symptom.id)}
      onMouseLeave={onLeave}
      style={{
        background: active
          ? `linear-gradient(135deg, rgba(${rgb}, .16), rgba(255,255,255,.075))`
          : 'rgba(255, 255, 255, 0.035)',
        borderColor: active ? `rgba(${rgb}, 0.44)` : 'rgba(255, 255, 255, 0.08)',
        boxShadow: active
          ? `inset 0 1px rgba(255,255,255,.09), 0 18px 38px -24px rgba(${rgb}, .72)`
          : 'inset 0 1px rgba(255,255,255,.025)',
      }}
    >
      <span
        className="absolute inset-y-3 left-0 w-px rounded-full transition-opacity duration-500"
        style={{ background: `rgb(${rgb})`, opacity: active ? 1 : 0 }}
      />

      <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.12em] text-slate-400">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500"
        style={{
          background: `rgba(${rgb}, ${active ? 0.2 : 0.07})`,
          borderColor: `rgba(${rgb}, ${active ? 0.24 : 0.08})`,
          color: active ? `rgb(${rgb})` : 'rgb(148 163 184)',
        }}
      >
        <SymptomIcon className="h-5 w-5" name={symptom.icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block text-[13px] leading-snug font-medium text-slate-300 transition-colors duration-500 sm:text-sm"
          style={{ color: active ? 'white' : undefined }}
        >
          {symptom.title}
        </span>
        <span
          aria-hidden="true"
          className="mt-1 block overflow-hidden text-[9px] font-semibold tracking-[0.12em] uppercase transition-all duration-500 md:text-[10px]"
          style={{ color: `rgb(${rgb})`, maxHeight: active ? 20 : 0, opacity: active ? 0.9 : 0 }}
        >
          Explorar resposta
        </span>
      </span>

      <span
        aria-hidden="true"
        className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
        style={{ color: `rgb(${rgb})` }}
      >
        <svg
          className="h-3 w-3 transition-transform duration-500"
          fill="none"
          style={{ transform: active ? 'translateX(1px)' : 'none' }}
          viewBox="0 0 12 12"
        >
          <path
            d="M3.5 2.5 7 6 3.5 9.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
