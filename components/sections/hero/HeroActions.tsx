export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      <a
        className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.25)] transition-all duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.1),0_12px_28px_-6px_rgba(15,23,42,0.35)] hover:brightness-110"
        href="#contato"
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
        href="#para-quem"
      >
        Conhecer o tratamento
      </a>
    </div>
  );
}
