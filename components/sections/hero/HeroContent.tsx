export default function HeroContent() {
  return (
    <>
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-900/6 bg-white/70 px-3 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm min-[360px]:px-4 sm:mb-9">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.06em] text-slate-600 uppercase min-[360px]:text-[11px] min-[360px]:tracking-[0.12em] sm:text-xs">
          <span className="sm:hidden">Fisioterapia cardiorrespiratória</span>
          <span className="hidden sm:inline">Fisioterapia Cardiorrespiratória Especializada</span>
        </span>
      </div>

      <h1
        className="font-space-grotesk text-foreground max-w-[20ch] text-[2.35rem] leading-[1.03] font-semibold tracking-[-0.05em] text-balance min-[360px]:text-[2.65rem] sm:text-6xl md:text-[4.4rem] lg:text-[4.85rem]"
        data-hero-heading
      >
        Respire fundo.
        <br />
        <span className="bg-linear-to-r from-teal-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
          Seu coração e pulmões
        </span>
        <br />
        merecem cuidado especializado.
      </h1>

      <p className="text-foreground-muted mt-7 max-w-2xl text-base leading-7 text-pretty sm:text-lg sm:leading-8 md:mt-8 md:text-xl">
        Reabilitação cardiorrespiratória guiada por evidência científica, com acompanhamento próximo
        e humano — para você recuperar fôlego, força e qualidade de vida.
      </p>
    </>
  );
}
