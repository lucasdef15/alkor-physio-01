'use client';

import HeroActions from './HeroActions';
import HeroContent from './HeroContent';
import Indicators from './Indicators';
import ScrollBadge from './ScrollBadge';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 bg-[url('/hero-physio.jpg')] bg-cover bg-center brightness-[.45]" />
      <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-30 pb-40 text-center select-none md:pb-20">
        <HeroContent />

        <HeroActions />

        <Indicators />

        <ScrollBadge />
      </div>
    </section>
  );
}
