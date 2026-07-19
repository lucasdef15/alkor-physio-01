import Image from 'next/image';

import Physiotherapist from '@/public/physiotherapist.jpg';

export default function AboutImage() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-teal-300/20 via-cyan-200/10 to-transparent blur-3xl" />

      <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-[2.5rem] border backdrop-blur-sm">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={Physiotherapist}
            alt="Dr. Davi Faria durante atendimento fisioterapêutico."
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" />
        </div>

        <div className="absolute bottom-6 left-6">
          <div className="border-border/40 bg-background/75 rounded-2xl border px-5 py-4 backdrop-blur-xl">
            <p className="text-foreground text-lg font-semibold">Atendimento Humanizado</p>

            <p className="text-foreground-muted mt-1 text-sm">
              Foco na recuperação e qualidade de vida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
