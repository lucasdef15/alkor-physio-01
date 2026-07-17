export default function HeroContent() {
  return (
    <>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300/30 px-4 py-1.5">
        <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
        <span className="text-foreground-muted text-sm font-medium">Atendimento em São Paulo</span>
      </div>
      <h1 className="text-primary-foreground text-[2.6rem] leading-[1.05] font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Recupere Sua Respiração
        <br className="hidden sm:block" />
        <span> e </span>
        <span className="text-primary">Sua Vitalidade</span>
      </h1>
      <p className="text-foreground-muted mx-auto mt-6 max-w-lg text-[1.1rem] sm:max-w-xl sm:text-lg md:max-w-2xl md:text-xl lg:text-2xl">
        Fisioterapia cardiorespiratória especializada em reabilitação pulmonar, pós-cirurgia
        cardíaca e melhora da capacidade funcional com abordagem científica e humanizada.
      </p>
    </>
  );
}
