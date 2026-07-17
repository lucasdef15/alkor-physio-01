import SymptomIcon from './SymptomIcon';
import { Symptom } from './symptoms';

interface SymptomCardProps {
  active: boolean;
  onLeave: () => void;
  onPeek: (id: string) => void;
  onSelect: (id: string) => void;
  symptom: Symptom;
}

export default function SymptomCard({
  active,
  onLeave,
  onPeek,
  onSelect,
  symptom,
}: SymptomCardProps) {
  const [r, g, b] = symptom.profile.primary;
  const rgb = `${r}, ${g}, ${b}`;

  return (
    <button
      aria-pressed={active}
      className="group relative flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      onBlur={onLeave}
      onClick={() => onSelect(symptom.id)}
      onFocus={() => onPeek(symptom.id)}
      onMouseEnter={() => onPeek(symptom.id)}
      onMouseLeave={onLeave}
      style={{
        background: active ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.4)',
        borderColor: active ? `rgba(${rgb}, 0.35)` : 'rgba(226, 232, 240, 0.6)',
        boxShadow: active
          ? `0 1px 2px rgba(15, 23, 42, 0.04), 0 18px 36px -20px rgba(${rgb}, 0.55)`
          : '0 1px 2px rgba(15, 23, 42, 0.03)',
      }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500"
        style={{
          background: `rgba(${rgb}, ${active ? 0.16 : 0.1})`,
          color: `rgb(${rgb})`,
        }}
      >
        <SymptomIcon className="h-5 w-5" name={symptom.icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug font-medium text-slate-800">
          {symptom.title}
        </span>
      </span>

      <span
        className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center"
        style={{ color: `rgb(${rgb})` }}
      >
        <span
          className="absolute inline-flex h-2.5 w-2.5 rounded-full transition-opacity duration-500"
          style={{ background: 'currentColor', opacity: active ? 0.25 : 0 }}
        />
        <span
          className="relative inline-flex rounded-full transition-all duration-500"
          style={{
            background: active ? 'currentColor' : 'rgba(148, 163, 184, 0.5)',
            height: active ? '0.4rem' : '0.3rem',
            width: active ? '0.4rem' : '0.3rem',
          }}
        />
      </span>
    </button>
  );
}
