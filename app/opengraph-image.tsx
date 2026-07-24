import { ImageResponse } from 'next/og';

import { SITE_CONFIG } from '@/lib/site';

export const alt = 'ΛLKOR Physio — Fisioterapia Cardiorrespiratória';
export const contentType = 'image/png';
export const size = { height: 630, width: 1200 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fcfd 0%, #ecfeff 55%, #ccfbf1 100%)',
        color: '#0f172a',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: '72px',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '960px',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#0d9488', fontSize: 24, fontWeight: 700, letterSpacing: 5 }}>
          {SITE_CONFIG.name.toUpperCase()}
        </span>
        <h1
          style={{
            fontSize: 68,
            fontWeight: 600,
            letterSpacing: -3,
            lineHeight: 1.04,
            margin: '38px 0 26px',
          }}
        >
          Fisioterapia cardiorrespiratória com cuidado especializado.
        </h1>
        <p style={{ color: '#475569', fontSize: 27, lineHeight: 1.45, margin: 0 }}>
          Evidência científica, acompanhamento próximo e uma experiência construída para gerar
          confiança.
        </p>
      </div>
    </div>,
    size,
  );
}
