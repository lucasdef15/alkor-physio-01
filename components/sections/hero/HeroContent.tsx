import React from 'react';

export default function HeroContent() {
  return (
    <>
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-900/6 bg-white/70 px-4 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
        </span>
        <span className="text-[13px] font-medium tracking-wide text-slate-600">
          Fisioterapia Cardiorrespiratória Especializada
        </span>
      </div>

      <h1 className="text-[2.75rem] leading-[1.08] font-semibold tracking-tight text-slate-900 sm:text-6xl md:text-[4.25rem]">
        Respire fundo.
        <br />
        <span className="bg-linear-to-r from-teal-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
          Seu coração e pulmões
        </span>
        <br />
        merecem cuidado especializado.
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
        Reabilitação cardiorrespiratória guiada por evidência científica, com acompanhamento próximo
        e humano — para você recuperar fôlego, força e qualidade de vida.
      </p>
    </>
  );
}
