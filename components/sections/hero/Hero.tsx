'use client';

import { useRef } from 'react';

import { useBackgroundCanvas } from '@/hooks/useBackgroundCanvas';

// import HeroActions from './HeroActions';
// import HeroContent from './HeroContent';
// import Indicators from './Indicators';
// import ScrollBadge from './ScrollBadge';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundCanvas({ canvasRef });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-cyan-50/40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[18%] left-1/2 h-180 w-180 -translate-x-1/2 rounded-full bg-teal-100/35 blur-[180px]" />

        <div className="absolute -top-40 left-[-10%] h-150 w-150 rounded-full bg-sky-100/45 blur-[170px]" />

        <div className="absolute right-[-8%] bottom-[-18%] h-130 w-130 rounded-full bg-cyan-50/70 blur-[170px]" />

        <div className="bg-gradient-radial absolute top-[42%] left-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full from-teal-100/35 via-sky-50/15 to-transparent blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(15,23,42,.025)_100%)]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <canvas
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply"
        ref={canvasRef}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-30 pb-32 text-center md:pb-20"></div>
    </section>
  );
}
