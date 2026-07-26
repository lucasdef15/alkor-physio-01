'use client';

import { useRef } from 'react';

import { useBackgroundCanvas } from '@/hooks/useBackgroundCanvas';

export default function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundCanvas({
    canvasRef,
    desktopFps: 30,
    mobileFps: 18,
  });

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [contain:strict]"
      data-hero-canvas
      ref={canvasRef}
    />
  );
}
