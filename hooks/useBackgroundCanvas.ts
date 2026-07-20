/* eslint-disable perfectionist/sort-modules */
/* eslint-disable perfectionist/sort-objects */
'use client';

import { RefObject, useEffect } from 'react';

interface Particle {
  angle: number;
  angleSpeed: number;
  baseOpacity: number;
  orbitRadiusFactor: number;
  radialJitterPhase: number;
  radialJitterSpeed: number;
  size: number;
  x: number;
  y: number;
}

interface UseBackgroundCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

function createNoise2D(seed: number) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  let s = seed >>> 0;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad2 = (hash: number, x: number, y: number) => {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);

  return function noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);

    const aa = perm[X + perm[Y]];
    const ab = perm[X + perm[Y + 1]];
    const ba = perm[X + 1 + perm[Y]];
    const bb = perm[X + 1 + perm[Y + 1]];

    const x1 = lerp(grad2(aa, xf, yf), grad2(ba, xf - 1, yf), u);
    const x2 = lerp(grad2(ab, xf, yf - 1), grad2(bb, xf - 1, yf - 1), u);

    return lerp(x1, x2, v); // aprox. no intervalo [-1, 1]
  };
}

export function useBackgroundCanvas({ canvasRef }: UseBackgroundCanvasProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let logicalWidth = Math.max(1, container.clientWidth);
    let logicalHeight = Math.max(1, container.clientHeight);

    let time = 0;
    let animationFrameId: number;

    let centerX = logicalWidth / 2;
    let centerY = logicalHeight * 0.4;

    const syncCanvasSize = () => {
      logicalWidth = Math.max(1, container.clientWidth);
      logicalHeight = Math.max(1, container.clientHeight);

      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(logicalWidth * currentDpr);
      canvas.height = Math.round(logicalHeight * currentDpr);
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      ctx.resetTransform();
      ctx.scale(currentDpr, currentDpr);

      centerX = logicalWidth / 2;

      const heading = container.querySelector<HTMLElement>('[data-hero-heading]');
      if (heading) {
        const containerRect = container.getBoundingClientRect();
        const headingRect = heading.getBoundingClientRect();
        centerY = headingRect.top - containerRect.top + headingRect.height / 2;
      } else {
        centerY = Math.min(logicalHeight, window.innerHeight) * 0.42;
      }
    };

    syncCanvasSize();

    const noise2D = createNoise2D(1337);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer =
      typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches;
    const parallaxEnabled = !prefersReducedMotion && hasFinePointer;

    const PARALLAX_MAX_OFFSET = 7;
    const PARALLAX_LERP = 0.05;

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / logicalWidth) * 2 - 1;
      const ny = ((event.clientY - rect.top) / logicalHeight) * 2 - 1;
      targetParallaxX = nx * PARALLAX_MAX_OFFSET;
      targetParallaxY = ny * PARALLAX_MAX_OFFSET;
    };

    const handlePointerLeave = () => {
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    if (parallaxEnabled) {
      container.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    const blobConfig = {
      color: { b: 148, g: 163, r: 22 },
      numPoints: 96,
      octaves: [
        { amp: 0.85, freq: 1.15, speed: 0.045 },
        { amp: 0.32, freq: 2.7, speed: 0.09 },
        { amp: 0.12, freq: 5.1, speed: 0.16 },
      ],
      complexity: 0.085,
    };

    const BREATH_PERIOD_SECONDS = 9;
    const breathAngularSpeed = (Math.PI * 2) / BREATH_PERIOD_SECONDS;

    const blobPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < blobConfig.numPoints; i++) {
      blobPoints.push({ x: 0, y: 0 });
    }
    const borderPointsA: { x: number; y: number }[] = [];
    const borderPointsB: { x: number; y: number }[] = [];
    for (let i = 0; i < blobConfig.numPoints; i++) {
      borderPointsA.push({ x: 0, y: 0 });
      borderPointsB.push({ x: 0, y: 0 });
    }

    const particles: Particle[] = [];
    const maxParticles = 26;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() * 0.0006 + 0.00025) * (Math.random() < 0.5 ? -1 : 1),
        baseOpacity: Math.random() * 0.1 + 0.035,
        orbitRadiusFactor: 1.08 + Math.random() * 0.55,
        radialJitterPhase: Math.random() * Math.PI * 2,
        radialJitterSpeed: 0.05 + Math.random() * 0.06,
        size: Math.random() * 2 + 0.7,
        x: 0,
        y: 0,
      });
    }
    const sampleRadiusNoise = (angle: number, t: number): number => {
      let n = 0;
      for (const oct of blobConfig.octaves) {
        const nx = Math.cos(angle) * oct.freq + t * oct.speed;
        const ny = Math.sin(angle) * oct.freq - t * oct.speed * 0.6;
        n += noise2D(nx, ny) * oct.amp;
      }
      return n;
    };

    const computeBlobPoints = (
      out: { x: number; y: number }[],
      cx: number,
      cy: number,
      radius: number,
      t: number,
      stretchY: number,
    ) => {
      const n = out.length;
      const step = (Math.PI * 2) / n;
      for (let i = 0; i < n; i++) {
        const angle = i * step;
        const noise = sampleRadiusNoise(angle, t);
        const r = radius + noise * radius * blobConfig.complexity;
        out[i].x = cx + Math.cos(angle) * r;
        out[i].y = cy + Math.sin(angle) * r * stretchY;
      }
    };

    const strokeOrFillSmoothPath = (points: { x: number; y: number }[]) => {
      const n = points.length;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p0 = points[(i - 1 + n) % n];
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        const p3 = points[(i + 2) % n];

        if (i === 0) ctx.moveTo(p1.x, p1.y);

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      time += 0.008;
      parallaxX += (targetParallaxX - parallaxX) * PARALLAX_LERP;
      parallaxY += (targetParallaxY - parallaxY) * PARALLAX_LERP;

      const breathTime = performance.now() * 0.001;
      const breath = Math.sin(breathTime * breathAngularSpeed);
      const inhale = (breath + 1) * 0.5;
      const inhaleEased = inhale * inhale * (3 - 2 * inhale);

      const currentIsMobile = logicalWidth < 640;
      const currentIsTablet = logicalWidth < 1024;
      const globalPulse = 1 + inhaleEased * 0.022;

      const responsiveRadius = currentIsMobile
        ? Math.min(170, Math.max(124, logicalWidth * 0.38))
        : currentIsTablet
          ? Math.min(330, Math.max(230, logicalWidth * 0.36))
          : Math.min(390, Math.max(300, logicalWidth * 0.225));
      const heightLimit = logicalHeight * (currentIsMobile ? 0.24 : currentIsTablet ? 0.34 : 0.4);
      const baseRadius = Math.min(responsiveRadius, heightLimit) * globalPulse;
      const activeParticleCount = currentIsMobile ? 10 : currentIsTablet ? 16 : 22;

      const breathingOffset = inhaleEased * 7 - 3.5;
      const stretchY = 0.93 + inhaleEased * 0.035;

      const effCenterX = centerX + parallaxX;
      const effCenterY = centerY + parallaxY;

      const drawBackgroundGlow = () => {
        const glowRadius = baseRadius * (2.15 + inhaleEased * 0.1);
        const glowOpacity = 0.14 + inhaleEased * 0.07;

        const lightX = effCenterX - baseRadius * 0.12 + breathingOffset * 0.4;
        const lightY = effCenterY - baseRadius * 0.18 - breathingOffset * 0.25;

        const glowGradient = ctx.createRadialGradient(
          lightX,
          lightY,
          baseRadius * 0.1,
          effCenterX,
          effCenterY,
          glowRadius,
        );
        glowGradient.addColorStop(0, `rgba(20, 184, 166, ${glowOpacity})`);
        glowGradient.addColorStop(0.45, `rgba(56, 189, 248, ${glowOpacity * 0.55})`);
        glowGradient.addColorStop(0.75, `rgba(186, 230, 253, ${glowOpacity * 0.18})`);
        glowGradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = glowGradient;
        ctx.save();
        ctx.translate(effCenterX, effCenterY);
        ctx.scale(1.25, 0.92);
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.restore();
        ctx.fill();
      };

      const drawMainBlob = () => {
        ctx.save();

        ctx.shadowColor = `rgba(${blobConfig.color.r}, ${blobConfig.color.g}, ${blobConfig.color.b}, 0.08)`;
        ctx.shadowBlur = 40 + inhaleEased * 22;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 14 + inhaleEased * 5;

        const mainGradient = ctx.createRadialGradient(
          effCenterX - baseRadius * 0.15,
          effCenterY - baseRadius * 0.15,
          baseRadius * 0.1,
          effCenterX,
          effCenterY,
          baseRadius,
        );
        mainGradient.addColorStop(0, 'rgba(255,255,255,.92)');
        mainGradient.addColorStop(0.28, 'rgba(240,253,250,.85)');
        mainGradient.addColorStop(0.62, 'rgba(94,234,212,.24)');
        mainGradient.addColorStop(1, 'rgba(15,118,110,.08)');
        ctx.fillStyle = mainGradient;

        computeBlobPoints(
          blobPoints,
          effCenterX,
          effCenterY + breathingOffset,
          baseRadius,
          time,
          stretchY,
        );
        strokeOrFillSmoothPath(blobPoints);
        ctx.fill();

        const lightOffset = breathingOffset * 0.45;
        const hlX = effCenterX - baseRadius * 0.18 + lightOffset;
        const hlY = effCenterY - baseRadius * 0.22 - lightOffset * 0.4;

        ctx.beginPath();
        ctx.ellipse(hlX, hlY, baseRadius * 0.25, baseRadius * 0.14, -0.4, 0, Math.PI * 2);

        const highlight = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, baseRadius * 0.3);
        highlight.addColorStop(0, 'rgba(255,255,255,.55)');
        highlight.addColorStop(0.4, 'rgba(240,253,250,.22)');
        highlight.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = highlight;
        ctx.fill();

        ctx.restore();
      };

      const drawOrganicBorders = () => {
        ctx.strokeStyle = 'rgba(14,165,164,.5)';
        ctx.lineWidth = 1.4;
        computeBlobPoints(
          borderPointsA,
          effCenterX,
          effCenterY + breathingOffset,
          baseRadius * 0.985,
          time,
          stretchY,
        );
        strokeOrFillSmoothPath(borderPointsA);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(125,211,252,.22)';
        ctx.lineWidth = 1;
        computeBlobPoints(
          borderPointsB,
          effCenterX,
          effCenterY + breathingOffset,
          baseRadius * 1.03,
          time,
          stretchY,
        );
        strokeOrFillSmoothPath(borderPointsB);
        ctx.stroke();
      };

      const particleColors: [number, number, number][] = [
        [20, 184, 166],
        [56, 189, 248],
        [255, 255, 255],
      ];

      const drawParticles = () => {
        for (let i = 0; i < activeParticleCount; i++) {
          const p = particles[i];
          p.angle += p.angleSpeed;
          p.radialJitterPhase += p.radialJitterSpeed * 0.016;

          const radialJitter = Math.sin(p.radialJitterPhase) * 0.06;
          const orbitRadius = baseRadius * (p.orbitRadiusFactor + radialJitter);
          const shapeNoise = sampleRadiusNoise(p.angle, time) * blobConfig.complexity * 0.6;

          p.x = effCenterX + Math.cos(p.angle) * orbitRadius * (1 + shapeNoise);
          p.y =
            effCenterY +
            breathingOffset +
            Math.sin(p.angle) * orbitRadius * stretchY * (1 + shapeNoise);

          const alpha = p.baseOpacity + Math.sin(p.radialJitterPhase) * 0.012;
          const [r, g, b] = particleColors[i % particleColors.length];

          ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.015, alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawBackgroundGlow();
      drawMainBlob();
      drawOrganicBorders();
      drawParticles();

      if (isRunning) animationFrameId = requestAnimationFrame(animate);
    };

    let isRunning = false;
    const start = () => {
      if (isRunning) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (prefersReducedMotion) return;
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);

    if (prefersReducedMotion) animate();

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      if (prefersReducedMotion) animate();
    });
    resizeObserver.observe(container);

    const heading = container.querySelector<HTMLElement>('[data-hero-heading]');
    if (heading) resizeObserver.observe(heading);

    let disposed = false;
    void document.fonts?.ready.then(() => {
      if (disposed) return;
      syncCanvasSize();
      if (prefersReducedMotion) animate();
    });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      if (parallaxEnabled) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
      observer.disconnect();
      stop();
    };
  }, [canvasRef]);
}
