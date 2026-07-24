'use client';

import { useRef } from 'react';

import { useBackgroundCanvas } from '@/hooks/useBackgroundCanvas';

export default function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundCanvas({ canvasRef });

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply"
      ref={canvasRef}
    />
  );
}
