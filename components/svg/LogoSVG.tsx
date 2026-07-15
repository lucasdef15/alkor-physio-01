'use client';
import { useRef } from 'react';

import { useSvgTextWidth } from '@/hooks/useTextWidth';

interface LogoSVGProps {
  className?: string;
  fill?: string;
  fontSize?: string;
  fontWeight?: string;
  name: string;
  surname: string;
}

export default function LogoSVG({
  className,
  fill,
  fontSize,
  fontWeight,
  name,
  surname,
}: LogoSVGProps) {
  const textRef = useRef<SVGTextElement>(null);
  const width = useSvgTextWidth(textRef, surname);

  const w = width ?? 0;
  const padding = 8;

  const leftLineEnd = Math.max(20, 90 - w / 2 - padding);
  const rightLineStart = Math.min(160, 90 + w / 2 + padding);

  return (
    <svg className={className} fill="none" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">
      <text
        dominantBaseline="middle"
        fill={fill ?? 'currentColor'}
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontSize={fontSize ?? 28}
        fontWeight={fontWeight ?? 700}
        letterSpacing="5px"
        textAnchor="middle"
        x="90"
        y="30"
      >
        {name}
      </text>

      <g opacity=".75" stroke={fill ?? 'currentColor'} strokeLinecap="round" strokeWidth=".5">
        <line x1="20" x2={leftLineEnd} y1="52" y2="52" />
        <line x1={rightLineStart} x2="160" y1="52" y2="52" />
      </g>

      <text
        dominantBaseline="middle"
        fill={fill ?? 'currentColor'}
        fontFamily="var(--font-montserrat), sans-serif"
        fontSize={fontSize ?? 10}
        fontWeight={fontWeight ?? 500}
        letterSpacing="3px"
        ref={textRef}
        textAnchor="middle"
        x="90"
        y="52"
      >
        {surname}
      </text>
    </svg>
  );
}
