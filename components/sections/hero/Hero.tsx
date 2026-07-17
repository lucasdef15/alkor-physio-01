'use client';

import { useRef } from 'react';

import { useBackgroundCanvas } from '@/hooks/useBackgroundCanvas';

import HeroActions from './HeroActions';
import HeroContent from './HeroContent';
import Indicators from './Indicators';
import ScrollBadge from './ScrollBadge';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundCanvas({ canvasRef });

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-white to-cyan-50/30"
      data-header-theme="light"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-12%] h-140 w-140 rounded-full bg-sky-100/30 blur-[190px]" />
        <div className="absolute right-[-10%] bottom-[-15%] h-130 w-130 rounded-full bg-teal-50/50 blur-[190px]" />
      </div>

      <canvas
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply"
        ref={canvasRef}
      />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 pb-32 text-center md:pb-24">
        <HeroContent />
        <HeroActions />
        <Indicators />
        <ScrollBadge />
      </div>
    </section>
  );
}
