'use client';

import { RefObject, useEffect } from 'react';

interface Particle {
  opacity: number;
  phase: number;
  size: number;
  speedX: number;
  speedY: number;
  x: number;
  y: number;
}

interface UseBackgroundCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function useBackgroundCanvas({ canvasRef }: UseBackgroundCanvasProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    let logicalWidth = window.innerWidth;
    let logicalHeight = window.innerHeight;

    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;

    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;

    ctx.scale(dpr, dpr);

    let time = 0;
    let animationFrameId: number;

    let centerX = logicalWidth / 2;
    let centerY = logicalHeight * 0.42;

    const blobConfig = {
      baseRadius: 0,
      color: {
        b: 148,
        g: 163,
        r: 22,
      },
      complexity: 0.09,
      numPoints: 14,
    };

    const particles: Particle[] = [];
    const maxParticles = 30;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        opacity: Math.random() * 0.12 + 0.04,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.7) * 0.12,
        x: Math.random() * logicalWidth,
        y: Math.random() * logicalHeight,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      time += 0.0015;
      const breath = Math.sin(time * 0.18) * 0.7 + Math.sin(time * 0.07 + 1.8) * 0.3;
      const inhale = (breath + 1) * 0.5;

      const currentIsMobile = logicalWidth < 768;
      const globalPulse = 1 + inhale * 0.025;

      const baseRadius =
        Math.min(logicalWidth, logicalHeight) * (currentIsMobile ? 0.32 : 0.35) * globalPulse;
      const activeParticleCount = currentIsMobile ? 12 : 22;

      const drawPremiumBlob = (
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        radius: number,
      ) => {
        const points = [];
        const step = (Math.PI * 2) / blobConfig.numPoints;

        for (let i = 0; i < blobConfig.numPoints; i++) {
          const angle = i * step + (Math.random() - 0.5) * 0.015;
          const largeWave = Math.sin(time * 0.28 + angle * 2.0);
          const mediumWave = Math.sin(time * 0.65 + angle * 3.4);
          const smallWave = Math.sin(time * 1.2 + angle * 5.2);
          const noise = largeWave * 0.75 + mediumWave * 0.2 + smallWave * 0.05;

          const stretchX = 1;
          const stretchY = 0.92 + inhale * 0.04;
          const r = radius + noise * (radius * blobConfig.complexity);

          points.push({
            x: cx + Math.cos(angle) * r * stretchX,
            y: cy + Math.sin(angle) * r * stretchY,
          });
        }

        ctx.beginPath();
        const first = points[0];
        const last = points[points.length - 1];
        ctx.moveTo((first.x + last.x) / 2, (first.y + last.y) / 2);

        for (let i = 0; i < points.length; i++) {
          const current = points[i];
          const next = points[(i + 1) % points.length];

          const targetX = (current.x + next.x) / 2;
          const targetY = (current.y + next.y) / 2;

          const cp1X = current.x;
          const cp1Y = current.y;

          ctx.bezierCurveTo(cp1X, cp1Y, targetX, targetY, targetX, targetY);
        }

        ctx.closePath();
      };

      const drawBackgroundGlow = () => {
        const glowRadius = baseRadius * (2.15 + inhale * 0.12);
        const glowOpacity = 0.14 + inhale * 0.08;
        const breathingOffset = inhale * 8 - 4;

        let lightX = centerX - baseRadius * 0.12;
        let lightY = centerY - baseRadius * 0.18;

        lightX += breathingOffset * 0.5;
        lightY -= breathingOffset * 0.3;

        const glowGradient = ctx.createRadialGradient(
          lightX,
          lightY,
          baseRadius * 0.1,
          centerX,
          centerY,
          glowRadius,
        );
        glowGradient.addColorStop(0, `rgba(20, 184, 166, ${glowOpacity})`);

        glowGradient.addColorStop(0.45, `rgba(56, 189, 248, ${glowOpacity * 0.55})`);

        glowGradient.addColorStop(0.75, `rgba(186, 230, 253, ${glowOpacity * 0.18})`);

        glowGradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = glowGradient;

        ctx.beginPath();
        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.scale(1.25, 0.92);

        ctx.beginPath();

        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);

        ctx.restore();
        ctx.fill();
      };

      const drawMainBlob = () => {
        ctx.save();

        ctx.shadowColor = `rgba(${blobConfig.color.r}, ${blobConfig.color.g}, ${blobConfig.color.b}, 0.08)`;
        ctx.shadowBlur = 40 + inhale * 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15 + inhale * 5;

        const mainGradient = ctx.createRadialGradient(
          centerX - baseRadius * 0.15,
          centerY - baseRadius * 0.15,
          baseRadius * 0.1,
          centerX,
          centerY,
          baseRadius,
        );
        mainGradient.addColorStop(0, 'rgba(255,255,255,.92)');
        mainGradient.addColorStop(0.28, 'rgba(240,253,250,.85)');
        mainGradient.addColorStop(0.62, 'rgba(94,234,212,.24)');
        mainGradient.addColorStop(1, 'rgba(15,118,110,.08)');

        ctx.fillStyle = mainGradient;

        const breathingOffset = inhale * 8 - 4;

        drawPremiumBlob(ctx, centerX, centerY + breathingOffset, baseRadius);
        ctx.fill();

        ctx.beginPath();

        ctx.ellipse(
          centerX - baseRadius * 0.18,
          centerY - baseRadius * 0.22,
          baseRadius * 0.25,
          baseRadius * 0.14,
          -0.4,
          0,
          Math.PI * 2,
        );

        const lightOffset = breathingOffset * 0.5;

        const highlight = ctx.createRadialGradient(
          centerX - baseRadius * 0.18 + lightOffset,
          centerY - baseRadius * 0.22 - lightOffset * 0.4,
          0,
          centerX - baseRadius * 0.18 + lightOffset,
          centerY - baseRadius * 0.22 - lightOffset * 0.4,
          baseRadius * 0.3,
        );

        highlight.addColorStop(0, 'rgba(255,255,255,.55)');

        highlight.addColorStop(0.4, 'rgba(240,253,250,.22)');

        highlight.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = highlight;
        ctx.fill();

        ctx.restore();
      };

      const drawOrganicBorders = () => {
        ctx.strokeStyle = 'rgba(14,165,164,.55)';
        ctx.lineWidth = 1.5;
        drawPremiumBlob(ctx, centerX, centerY, baseRadius * 0.98);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(125,211,252,.25)';
        ctx.lineWidth = 1;
        drawPremiumBlob(ctx, centerX, centerY, baseRadius * 1.03);
        ctx.stroke();
      };

      const drawParticles = () => {
        for (let i = 0; i < activeParticleCount; i++) {
          const p = particles[i];
          const flow = Math.sin(time * 0.22);

          p.x += p.speedX + Math.sin(time * 0.5 + p.phase) * 0.04;
          p.y += flow * 0.06;
          p.phase += 0.002;

          if (p.x < 0) p.x = logicalWidth;
          if (p.x > logicalWidth) p.x = 0;
          if (p.y < 0) p.y = logicalHeight;
          if (p.y > logicalHeight) p.y = 0;

          const particleColors = [
            [20, 184, 166],
            [56, 189, 248],
            [255, 255, 255],
          ];

          const alpha = p.opacity + Math.sin(p.phase) * 0.015;
          const [r, g, b] = particleColors[i % particleColors.length];

          ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.02, alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawBackgroundGlow();
      drawMainBlob();
      drawOrganicBorders();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      logicalWidth = window.innerWidth;
      logicalHeight = window.innerHeight;

      const currentDpr = window.devicePixelRatio || 1;

      canvas.width = logicalWidth * currentDpr;
      canvas.height = logicalHeight * currentDpr;
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      ctx.resetTransform();
      ctx.scale(currentDpr, currentDpr);

      centerX = logicalWidth / 2;
      centerY = logicalHeight * 0.42;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
}
