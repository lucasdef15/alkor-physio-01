export default function HeroContent() {
  return (
    <>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5">
        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-sm font-medium text-white">Atendimento em São Paulo</span>
      </div>

      <h1 className="text-5xl leading-tight font-semibold tracking-tighter text-white md:text-6xl lg:text-7xl">
        Recupere seu movimento
        <br />
        com <span className="text-emerald-400">qualidade e cuidado</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300 md:text-2xl">
        Fisioterapia especializada com abordagem moderna, resultados comprovados e atendimento
        humanizado.
      </p>
    </>
  );
}
