'use client';

import type { RefObject } from 'react';

import { useEffect } from 'react';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface Particle {
  alpha: number;
  phase: number;
  radius: number;
  x: number;
  y: number;
}

interface QualityProfile {
  dprLimit: number;
  fps: number;
  particleCount: number;
  pointCount: number;
}

interface UseBackgroundCanvasOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  desktopFps?: number;
  mobileFps?: number;
}

const TAU = Math.PI * 2;

export function useBackgroundCanvas({
  canvasRef,
  desktopFps = 30,
  mobileFps = 18,
}: UseBackgroundCanvasOptions): void {
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return;
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const navigatorInfo = navigator as NavigatorWithMemory;
    const processorCount = navigator.hardwareConcurrency ?? 8;
    const memory = navigatorInfo.deviceMemory ?? 8;

    const isLowPowerDevice = processorCount <= 4 || memory <= 4;
    const isVeryLowPowerDevice = processorCount <= 2 || memory <= 2;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let resizeFrame = 0;
    let startTimer = 0;
    let lastFrameTime = 0;
    let isRunning = false;
    let isIntersecting = true;
    let animationEnabled = false;
    let particles: Particle[] = [];
    let fillGradient: CanvasGradient | null = null;

    const getQualityProfile = (): QualityProfile => {
      const isMobile = mobileQuery.matches;

      if (isVeryLowPowerDevice) {
        return {
          dprLimit: 1,
          fps: 0,
          particleCount: 0,
          pointCount: 24,
        };
      }

      if (isMobile || isLowPowerDevice) {
        return {
          dprLimit: 1.15,
          fps: mobileFps,
          particleCount: isLowPowerDevice ? 4 : 7,
          pointCount: isLowPowerDevice ? 28 : 32,
        };
      }

      return {
        dprLimit: 1.5,
        fps: desktopFps,
        particleCount: 12,
        pointCount: 44,
      };
    };

    const rebuildCanvas = () => {
      const bounds = canvas.getBoundingClientRect();

      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));

      const quality = getQualityProfile();
      const dpr = Math.min(window.devicePixelRatio || 1, quality.dprLimit);
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;

      const centerX = width * 0.5;
      const centerY = height * (mobileQuery.matches ? 0.43 : 0.45);
      const gradientRadius = Math.max(width, height) * 0.42;

      fillGradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        gradientRadius,
      );

      fillGradient.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
      fillGradient.addColorStop(0.38, 'rgba(204, 251, 241, 0.34)');
      fillGradient.addColorStop(0.72, 'rgba(103, 232, 249, 0.12)');
      fillGradient.addColorStop(1, 'rgba(103, 232, 249, 0)');

      particles = createParticles(quality.particleCount, width, height);

      drawFrame(0, true);
    };

    const drawFrame = (time: number, staticFrame = false) => {
      if (width <= 0 || height <= 0) {
        return;
      }

      const quality = getQualityProfile();
      const animationTime = staticFrame ? 0 : time * 0.001;

      context.clearRect(0, 0, width, height);

      drawParticles(context, particles, animationTime, staticFrame);

      const centerX = width * 0.5;
      const centerY = height * (mobileQuery.matches ? 0.43 : 0.45);

      const radiusX = Math.min(
        width * (mobileQuery.matches ? 0.43 : 0.27),
        mobileQuery.matches ? 220 : 470,
      );
      const radiusY = Math.min(
        height * (mobileQuery.matches ? 0.31 : 0.44),
        mobileQuery.matches ? 290 : 395,
      );

      const breathing = staticFrame ? 0 : Math.sin(animationTime * 0.54) * 0.012;
      const phase = staticFrame ? 0.75 : animationTime * 0.32;

      context.save();

      traceOrganicBlob(
        context,
        centerX,
        centerY,
        radiusX + 14,
        radiusY + 10,
        phase + 0.72,
        quality.pointCount,
      );
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(14, 165, 233, 0.13)';
      context.stroke();

      traceOrganicBlob(
        context,
        centerX,
        centerY,
        radiusX * (1 + breathing),
        radiusY * (1 + breathing * 0.72),
        phase,
        quality.pointCount,
      );

      if (fillGradient) {
        context.fillStyle = fillGradient;
        context.fill();
      }

      context.lineWidth = mobileQuery.matches ? 1 : 1.25;
      context.strokeStyle = 'rgba(13, 148, 136, 0.38)';
      context.stroke();

      context.restore();
    };

    const stopAnimation = () => {
      if (!isRunning) {
        return;
      }

      isRunning = false;
      window.cancelAnimationFrame(animationFrame);
    };

    const animationLoop = (time: number) => {
      if (!isRunning) {
        return;
      }

      const { fps } = getQualityProfile();
      const frameInterval = fps > 0 ? 1000 / fps : Number.POSITIVE_INFINITY;
      const elapsed = time - lastFrameTime;

      if (elapsed >= frameInterval) {
        lastFrameTime = time - (elapsed % frameInterval);
        drawFrame(time);
      }

      animationFrame = window.requestAnimationFrame(animationLoop);
    };

    const shouldAnimate = () => {
      const { fps } = getQualityProfile();

      return (
        animationEnabled &&
        fps > 0 &&
        isIntersecting &&
        !document.hidden &&
        !reduceMotionQuery.matches
      );
    };

    const syncAnimationState = () => {
      if (!shouldAnimate()) {
        stopAnimation();
        return;
      }

      if (isRunning) {
        return;
      }

      isRunning = true;
      lastFrameTime = 0;
      animationFrame = window.requestAnimationFrame(animationLoop);
    };

    const scheduleResize = () => {
      window.cancelAnimationFrame(resizeFrame);

      resizeFrame = window.requestAnimationFrame(() => {
        rebuildCanvas();
        syncAnimationState();
      });
    };

    const handleVisibilityChange = () => {
      syncAnimationState();
    };

    const handleMediaChange = () => {
      scheduleResize();
    };

    const intersectionObserver =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              isIntersecting = entry?.isIntersecting ?? true;
              syncAnimationState();
            },
            {
              rootMargin: '120px 0px',
              threshold: 0.01,
            },
          )
        : null;

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(() => {
            scheduleResize();
          })
        : null;

    rebuildCanvas();

    intersectionObserver?.observe(canvas);
    resizeObserver?.observe(canvas);

    if (!resizeObserver) {
      window.addEventListener('resize', scheduleResize, { passive: true });
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    mobileQuery.addEventListener('change', handleMediaChange);
    reduceMotionQuery.addEventListener('change', handleMediaChange);

    startTimer = window.setTimeout(() => {
      animationEnabled = true;
      syncAnimationState();
    }, 160);

    return () => {
      stopAnimation();
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(resizeFrame);

      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();

      if (!resizeObserver) {
        window.removeEventListener('resize', scheduleResize);
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mobileQuery.removeEventListener('change', handleMediaChange);
      reduceMotionQuery.removeEventListener('change', handleMediaChange);
    };
  }, [canvasRef, desktopFps, mobileFps]);
}

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const horizontalSeed = pseudoRandom(index * 17 + 11);
    const verticalSeed = pseudoRandom(index * 29 + 7);
    const radiusSeed = pseudoRandom(index * 37 + 5);

    return {
      alpha: 0.12 + pseudoRandom(index * 43 + 3) * 0.18,
      phase: pseudoRandom(index * 53 + 13) * TAU,
      radius: 0.8 + radiusSeed * 1.3,
      x: horizontalSeed * width,
      y: verticalSeed * height,
    };
  });
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  time: number,
  staticFrame: boolean,
): void {
  if (particles.length === 0) {
    return;
  }

  context.save();
  context.fillStyle = 'rgb(20, 184, 166)';

  particles.forEach((particle) => {
    const pulse = staticFrame ? 0.5 : (Math.sin(time * 0.55 + particle.phase) + 1) / 2;

    context.globalAlpha = particle.alpha * (0.55 + pulse * 0.45);
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, TAU);
    context.fill();
  });

  context.restore();
}

function pseudoRandom(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function traceOrganicBlob(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  phase: number,
  pointCount: number,
): void {
  const points: { x: number; y: number }[] = [];

  for (let index = 0; index < pointCount; index += 1) {
    const angle = (index / pointCount) * TAU;
    const distortion =
      Math.sin(angle * 3 + phase) * 0.033 +
      Math.sin(angle * 5 - phase * 0.72) * 0.018 +
      Math.sin(angle * 2 + 1.35) * 0.012;

    points.push({
      x: centerX + Math.cos(angle) * radiusX * (1 + distortion),
      y: centerY + Math.sin(angle) * radiusY * (1 + distortion),
    });
  }

  const first = points[0];
  const last = points[points.length - 1];

  if (!first || !last) {
    return;
  }

  context.beginPath();
  context.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];

    if (!current || !next) {
      continue;
    }

    context.quadraticCurveTo(
      current.x,
      current.y,
      (current.x + next.x) / 2,
      (current.y + next.y) / 2,
    );
  }

  context.closePath();
}
