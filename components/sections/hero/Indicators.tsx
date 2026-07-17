export default function Indicators() {
  return (
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
  );
}
