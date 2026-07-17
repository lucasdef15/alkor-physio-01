import { CSSProperties, RefObject } from 'react';

interface BreathingIllustrationProps {
  className?: string;
  stageRef: RefObject<HTMLDivElement | null>;
}

/** rgba() referencing the animated color channels written by the hook. */
const c1 = (a: number) => `rgba(var(--c1r), var(--c1g), var(--c1b), ${a})`;
const c2 = (a: number) => `rgba(var(--c2r), var(--c2g), var(--c2b), ${a})`;

const RIGHT_LOBE =
  'M300 232 C338 224 380 244 406 280 C432 316 442 360 434 402 C428 436 408 466 378 476 ' +
  'C360 482 344 476 336 460 C328 444 326 424 322 398 C316 356 314 300 312 262 ' +
  'C310 250 304 238 300 232 Z';

const RIGHT_BRONCHI =
  'M300 206 L300 236 M300 236 C314 250 326 268 334 292 M330 284 C346 296 356 312 360 332 ' +
  'M332 300 C338 322 340 346 339 368 M348 320 C356 328 362 338 365 350';

const PARTICLES = [
  { cx: 150, cy: 300, d: 7.5, delay: 0, r: 2.4 },
  { cx: 470, cy: 250, d: 9, delay: 1.2, r: 1.8 },
  { cx: 120, cy: 420, d: 8, delay: 2.1, r: 2 },
  { cx: 500, cy: 400, d: 10, delay: 0.6, r: 2.6 },
  { cx: 210, cy: 190, d: 7, delay: 1.8, r: 1.6 },
  { cx: 420, cy: 500, d: 9.5, delay: 2.6, r: 2.2 },
  { cx: 300, cy: 150, d: 8.5, delay: 0.9, r: 1.7 },
  { cx: 540, cy: 320, d: 11, delay: 1.5, r: 2 },
  { cx: 95, cy: 350, d: 9, delay: 3, r: 1.5 },
  { cx: 380, cy: 200, d: 8, delay: 2.3, r: 1.9 },
];

const flowStyle = (opacity: number): CSSProperties => ({
  opacity,
  transform: 'translateX(var(--wave-shift)) scaleY(var(--wave-amp))',
  transformBox: 'view-box',
  transformOrigin: '300px 350px',
});

const DEFAULT_VARS = {
  '--breath': 0.5,
  '--c1b': 166,
  '--c1g': 184,
  '--c1r': 20,
  '--c2b': 248,
  '--c2g': 189,
  '--c2r': 56,
  '--cough': 0,
  '--glow': 0.55,
  '--lung-scale': 1,
  '--particle': 0.55,
  '--tilt': '0deg',
  '--wave-amp': 0.8,
  '--wave-shift': '0px',
} as CSSProperties;

export default function BreathingIllustration({ className, stageRef }: BreathingIllustrationProps) {
  return (
    <div className={className} ref={stageRef} style={DEFAULT_VARS}>
      <svg
        aria-hidden="true"
        className="h-full w-full overflow-visible"
        fill="none"
        viewBox="0 0 600 640"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fw-lung" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" style={{ stopColor: c1(0.5) }} />
            <stop offset="0.55" style={{ stopColor: c2(0.26) }} />
            <stop offset="1" style={{ stopColor: c2(0.1) }} />
          </linearGradient>
          <radialGradient cx="0.5" cy="0.46" id="fw-halo" r="0.55">
            <stop offset="0" style={{ stopColor: c1(0.55) }} />
            <stop offset="0.5" style={{ stopColor: c2(0.22) }} />
            <stop offset="1" style={{ stopColor: 'rgba(255,255,255,0)' }} />
          </radialGradient>
          <radialGradient cx="0.5" cy="0.5" id="fw-blob" r="0.5">
            <stop offset="0" style={{ stopColor: c2(0.28) }} />
            <stop offset="1" style={{ stopColor: 'rgba(255,255,255,0)' }} />
          </radialGradient>
          <linearGradient id="fw-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: c1(0) }} />
            <stop offset="0.5" style={{ stopColor: c1(0.9) }} />
            <stop offset="1" style={{ stopColor: c1(0) }} />
          </linearGradient>
          <linearGradient id="fw-figure" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" style={{ stopColor: c1(0.1) }} />
            <stop offset="1" style={{ stopColor: c2(0.02) }} />
          </linearGradient>
          <radialGradient cx="0.4" cy="0.32" id="fw-highlight" r="0.5">
            <stop offset="0" style={{ stopColor: 'rgba(255,255,255,0.6)' }} />
            <stop offset="1" style={{ stopColor: 'rgba(255,255,255,0)' }} />
          </radialGradient>
        </defs>

        {/* Ambient blobs */}
        <g style={{ opacity: 'calc(0.5 + var(--glow, 0.5) * 0.5)' }}>
          <ellipse className="fw-drift-a" cx="200" cy="250" fill="url(#fw-blob)" rx="180" ry="150" />
          <ellipse className="fw-drift-b" cx="410" cy="420" fill="url(#fw-blob)" rx="170" ry="160" />
        </g>

        {/* Breathing waves */}
        <g style={flowStyle(0.9)}>
          <path
            d="M40 330 C110 306 170 306 240 330 C170 354 110 354 40 330 Z"
            fill="none"
            stroke="url(#fw-wave)"
            strokeWidth="2"
          />
          <path
            d="M40 300 C120 282 180 282 250 300"
            stroke="url(#fw-wave)"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
          <path
            d="M40 362 C120 380 180 380 250 362"
            stroke="url(#fw-wave)"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
          <g transform="translate(600 0) scale(-1 1)">
            <path
              d="M40 300 C120 282 180 282 250 300"
              stroke="url(#fw-wave)"
              strokeLinecap="round"
              strokeWidth="1.6"
            />
            <path
              d="M40 362 C120 380 180 380 250 362"
              stroke="url(#fw-wave)"
              strokeLinecap="round"
              strokeWidth="1.6"
            />
          </g>
        </g>

        {/* Glow halo */}
        <ellipse
          cx="300"
          cy="352"
          fill="url(#fw-halo)"
          rx="230"
          ry="230"
          style={{ opacity: 'var(--glow, 0.5)' }}
        />

        {/* Figure + lungs, tilts with posture */}
        <g
          style={{
            transform: 'rotate(var(--tilt, 0deg))',
            transformBox: 'view-box',
            transformOrigin: '300px 600px',
          }}
        >
          {/* Abstract bust silhouette */}
          <path
            d="M300 150 C332 150 356 176 356 208 C356 230 344 248 326 258 C372 268 402 300 414 352 
               C426 404 430 470 430 560 L170 560 C170 470 174 404 186 352 C198 300 228 268 274 258 
               C256 248 244 230 244 208 C244 176 268 150 300 150 Z"
            fill="url(#fw-figure)"
            stroke={c1(0.16)}
            strokeWidth="1"
          />

          {/* Lungs */}
          <g
            style={{
              transform: 'scale(var(--lung-scale, 1))',
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          >
            <path d={RIGHT_LOBE} fill="url(#fw-lung)" stroke={c1(0.5)} strokeWidth="1.4" />
            <path
              d={RIGHT_LOBE}
              fill="url(#fw-lung)"
              stroke={c1(0.5)}
              strokeWidth="1.4"
              transform="translate(600 0) scale(-1 1)"
            />
            <path
              d={RIGHT_BRONCHI}
              stroke={c1(0.55)}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={RIGHT_BRONCHI}
              stroke={c1(0.55)}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transform="translate(600 0) scale(-1 1)"
            />
            <ellipse cx="256" cy="322" fill="url(#fw-highlight)" rx="66" ry="58" />
            <ellipse cx="344" cy="322" fill="url(#fw-highlight)" rx="66" ry="58" />
          </g>
        </g>

        {/* Particles */}
        <g style={{ opacity: 'var(--particle, 0.5)' }}>
          {PARTICLES.map((p, i) => (
            <circle
              className="fw-particle"
              cx={p.cx}
              cy={p.cy}
              fill={c2(0.85)}
              key={i}
              r={p.r}
              style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.d}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
