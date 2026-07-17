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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-[#F8FCFD] via-[#F3FAFB] to-[#EDF8FA]"
      id="inicio"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-15%] h-144 w-xl rounded-full bg-cyan-300/18 blur-[180px]" />
        <div className="absolute right-[-15%] bottom-[-10%] h-136 w-136 rounded-full bg-teal-300/18 blur-[180px]" />
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
