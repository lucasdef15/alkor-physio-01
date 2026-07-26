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

interface PointerGesture {
  eligible: boolean;
  id: number;
  moved: boolean;
  x: number;
  y: number;
}

interface PulseState {
  startedAt: number;
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
  interactionRootSelector?: string;
  mobileFps?: number;
}

const TAU = Math.PI * 2;
const PULSE_DURATION = 1200;
const POINTER_MOVE_TOLERANCE = 10;
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '[data-hero-ignore-interaction]',
].join(',');

export function useBackgroundCanvas({
  canvasRef,
  desktopFps = 30,
  interactionRootSelector,
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

    const interactionRoot = interactionRootSelector
      ? canvas.closest<HTMLElement>(interactionRootSelector)
      : canvas.parentElement;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
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
    let lastDrawTime = 0;
    let isRunning = false;
    let isIntersecting = true;
    let animationEnabled = false;
    let particles: Particle[] = [];
    let pointerGesture: PointerGesture | null = null;
    let pulse: PulseState | null = null;

    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

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

    const getCanvasPoint = (clientX: number, clientY: number) => {
      const bounds = canvas.getBoundingClientRect();

      return {
        x: clamp(clientX - bounds.left, 0, bounds.width),
        y: clamp(clientY - bounds.top, 0, bounds.height),
      };
    };

    const isIgnoredTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;

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

      particles = createParticles(quality.particleCount, width, height);
      lastDrawTime = 0;

      drawFrame(0, true);
    };

    const drawFrame = (time: number, staticFrame = false) => {
      if (width <= 0 || height <= 0) {
        return;
      }

      const quality = getQualityProfile();
      const animationTime = staticFrame ? 0 : time * 0.001;
      const deltaSeconds = staticFrame
        ? 0
        : Math.min(0.08, Math.max(0.001, (time - lastDrawTime) / 1000 || 0.016));

      lastDrawTime = time;

      const followStrength = staticFrame ? 1 : 1 - Math.exp(-6.5 * deltaSeconds);

      pointerOffsetX += (pointerTargetX - pointerOffsetX) * followStrength;
      pointerOffsetY += (pointerTargetY - pointerOffsetY) * followStrength;

      const pulseSample = getPulseSample(pulse, time);

      if (pulse && pulseSample.finished) {
        pulse = null;
      }

      const baseCenterX = width * 0.5;
      const baseCenterY = height * (mobileQuery.matches ? 0.43 : 0.45);

      const pulseDirectionX = pulse ? (pulse.x / width - 0.5) * 2 : 0;
      const pulseDirectionY = pulse ? (pulse.y / height - 0.5) * 2 : 0;
      const pulseOffsetLimit = mobileQuery.matches ? 8 : 13;

      const centerX =
        baseCenterX +
        pointerOffsetX +
        pulseDirectionX * pulseOffsetLimit * pulseSample.attraction;
      const centerY =
        baseCenterY +
        pointerOffsetY +
        pulseDirectionY * pulseOffsetLimit * pulseSample.attraction;

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
      const interactiveScale = 1 + pulseSample.scale;

      context.clearRect(0, 0, width, height);

      drawParticles(context, particles, animationTime, staticFrame, {
        pulse,
        pulseIntensity: pulseSample.intensity,
      });

      if (pulse && pulseSample.intensity > 0) {
        drawPulseRing(context, pulse, pulseSample.progress, mobileQuery.matches);
      }

      context.save();

      traceOrganicBlob(
        context,
        centerX,
        centerY,
        (radiusX + 14) * interactiveScale,
        (radiusY + 10) * interactiveScale,
        phase + 0.72,
        quality.pointCount,
      );
      context.lineWidth = 1 + pulseSample.intensity * 0.18;
      context.strokeStyle = `rgba(14, 165, 233, ${0.13 + pulseSample.intensity * 0.07})`;
      context.stroke();

      traceOrganicBlob(
        context,
        centerX,
        centerY,
        radiusX * (1 + breathing) * interactiveScale,
        radiusY * (1 + breathing * 0.72) * interactiveScale,
        phase,
        quality.pointCount,
      );

      const gradientRadius = Math.max(width, height) * 0.42;
      const fillGradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        gradientRadius,
      );

      fillGradient.addColorStop(
        0,
        `rgba(255, 255, 255, ${0.88 + pulseSample.intensity * 0.05})`,
      );
      fillGradient.addColorStop(
        0.38,
        `rgba(204, 251, 241, ${0.34 + pulseSample.intensity * 0.08})`,
      );
      fillGradient.addColorStop(
        0.72,
        `rgba(103, 232, 249, ${0.12 + pulseSample.intensity * 0.045})`,
      );
      fillGradient.addColorStop(1, 'rgba(103, 232, 249, 0)');

      context.fillStyle = fillGradient;
      context.fill();

      context.lineWidth = (mobileQuery.matches ? 1 : 1.25) + pulseSample.intensity * 0.35;
      context.strokeStyle = `rgba(13, 148, 136, ${0.38 + pulseSample.intensity * 0.18})`;
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
      lastDrawTime = 0;
      animationFrame = window.requestAnimationFrame(animationLoop);
    };

    const triggerPulse = (clientX: number, clientY: number) => {
      if (reduceMotionQuery.matches || getQualityProfile().fps <= 0) {
        return;
      }

      const point = getCanvasPoint(clientX, clientY);

      pulse = {
        startedAt: performance.now(),
        x: point.x,
        y: point.y,
      };

      syncAnimationState();
    };

    const updatePointerTarget = (clientX: number, clientY: number) => {
      if (!finePointerQuery.matches || reduceMotionQuery.matches) {
        return;
      }

      const point = getCanvasPoint(clientX, clientY);
      const normalizedX = point.x / Math.max(1, width) - 0.5;
      const normalizedY = point.y / Math.max(1, height) - 0.5;

      pointerTargetX = normalizedX * 14;
      pointerTargetY = normalizedY * 10;
    };

    const resetPointerTarget = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) {
        return;
      }

      pointerGesture = {
        eligible: !isIgnoredTarget(event.target),
        id: event.pointerId,
        moved: false,
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerTarget(event.clientX, event.clientY);

      if (!pointerGesture || pointerGesture.id !== event.pointerId) {
        return;
      }

      const distanceX = event.clientX - pointerGesture.x;
      const distanceY = event.clientY - pointerGesture.y;

      if (
        distanceX * distanceX + distanceY * distanceY >
        POINTER_MOVE_TOLERANCE * POINTER_MOVE_TOLERANCE
      ) {
        pointerGesture.moved = true;
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const gesture = pointerGesture;
      pointerGesture = null;

      if (
        !gesture ||
        gesture.id !== event.pointerId ||
        gesture.moved ||
        !gesture.eligible ||
        isIgnoredTarget(event.target)
      ) {
        return;
      }

      triggerPulse(event.clientX, event.clientY);
    };

    const handlePointerCancel = () => {
      pointerGesture = null;
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
      resetPointerTarget();
      pointerGesture = null;
      pulse = null;
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

    interactionRoot?.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    interactionRoot?.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    interactionRoot?.addEventListener('pointerup', handlePointerUp, {
      passive: true,
    });
    interactionRoot?.addEventListener('pointercancel', handlePointerCancel, {
      passive: true,
    });
    interactionRoot?.addEventListener('pointerleave', resetPointerTarget, {
      passive: true,
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    mobileQuery.addEventListener('change', handleMediaChange);
    finePointerQuery.addEventListener('change', handleMediaChange);
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

      interactionRoot?.removeEventListener('pointerdown', handlePointerDown);
      interactionRoot?.removeEventListener('pointermove', handlePointerMove);
      interactionRoot?.removeEventListener('pointerup', handlePointerUp);
      interactionRoot?.removeEventListener('pointercancel', handlePointerCancel);
      interactionRoot?.removeEventListener('pointerleave', resetPointerTarget);

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mobileQuery.removeEventListener('change', handleMediaChange);
      finePointerQuery.removeEventListener('change', handleMediaChange);
      reduceMotionQuery.removeEventListener('change', handleMediaChange);
    };
  }, [canvasRef, desktopFps, interactionRootSelector, mobileFps]);
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
  interaction: {
    pulse: PulseState | null;
    pulseIntensity: number;
  },
): void {
  if (particles.length === 0) {
    return;
  }

  context.save();
  context.fillStyle = 'rgb(20, 184, 166)';

  particles.forEach((particle) => {
    const pulse = staticFrame ? 0.5 : (Math.sin(time * 0.55 + particle.phase) + 1) / 2;

    let x = particle.x;
    let y = particle.y;
    let proximity = 0;

    if (interaction.pulse && interaction.pulseIntensity > 0) {
      const distanceX = particle.x - interaction.pulse.x;
      const distanceY = particle.y - interaction.pulse.y;
      const distance = Math.hypot(distanceX, distanceY);
      const influenceRadius = 240;

      proximity = Math.max(0, 1 - distance / influenceRadius);

      if (distance > 0) {
        const displacement = proximity * interaction.pulseIntensity * 5;
        x += (distanceX / distance) * displacement;
        y += (distanceY / distance) * displacement;
      }
    }

    context.globalAlpha =
      particle.alpha *
      (0.55 + pulse * 0.45) *
      (1 + proximity * interaction.pulseIntensity * 0.3);

    context.beginPath();
    context.arc(x, y, particle.radius, 0, TAU);
    context.fill();
  });

  context.restore();
}

function drawPulseRing(
  context: CanvasRenderingContext2D,
  pulse: PulseState,
  progress: number,
  isMobile: boolean,
): void {
  const easedProgress = easeOutCubic(progress);
  const radius = 12 + easedProgress * (isMobile ? 58 : 82);
  const alpha = (1 - easedProgress) * 0.13;

  context.save();
  context.beginPath();
  context.arc(pulse.x, pulse.y, radius, 0, TAU);
  context.lineWidth = 1;
  context.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
  context.stroke();
  context.restore();
}

function getPulseSample(pulse: PulseState | null, time: number) {
  if (!pulse || time <= 0) {
    return {
      attraction: 0,
      finished: false,
      intensity: 0,
      progress: 0,
      scale: 0,
    };
  }

  const progress = clamp((time - pulse.startedAt) / PULSE_DURATION, 0, 1);

  return {
    attraction: sampleKeyframes(progress, [0, 0.16, 0.52, 1], [0, 1, 0.62, 0]),
    finished: progress >= 1,
    intensity: sampleKeyframes(progress, [0, 0.15, 0.56, 1], [0, 1, 0.72, 0]),
    progress,
    scale: sampleKeyframes(progress, [0, 0.16, 0.48, 1], [0, -0.01, 0.016, 0]),
  };
}

function sampleKeyframes(
  progress: number,
  times: number[],
  values: number[],
): number {
  for (let index = 0; index < times.length - 1; index += 1) {
    const startTime = times[index];
    const endTime = times[index + 1];
    const startValue = values[index];
    const endValue = values[index + 1];

    if (
      startTime === undefined ||
      endTime === undefined ||
      startValue === undefined ||
      endValue === undefined
    ) {
      continue;
    }

    if (progress <= endTime) {
      const localProgress = clamp(
        (progress - startTime) / Math.max(0.0001, endTime - startTime),
        0,
        1,
      );
      const eased = smoothstep(localProgress);

      return startValue + (endValue - startValue) * eased;
    }
  }

  return values.at(-1) ?? 0;
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function easeOutCubic(value: number): number {
  return 1 - (1 - value) ** 3;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
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
