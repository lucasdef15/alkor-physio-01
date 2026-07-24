const INDICATORS = ['Avaliação detalhada', 'Plano 100% individualizado', 'Acompanhamento contínuo'];
export default function Indicators() {
  return (
    <div className="mt-12 mb-10 grid w-full max-w-2xl grid-cols-1 gap-3 text-xs text-slate-500 sm:mt-14 sm:grid-cols-3 sm:text-sm">
      {INDICATORS.map((label, index) => (
        <div
          className={`flex items-center justify-center gap-2 py-1 ${index > 0 ? 'sm:border-l sm:border-slate-200/80' : ''}`}
          key={label}
        >
          <svg className="h-4 w-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fillRule="evenodd"
            />
          </svg>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
