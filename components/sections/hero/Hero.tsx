import HeroActions from './HeroActions';
import HeroBackgroundCanvas from './HeroBackgroundCanvas';
import HeroContent from './HeroContent';
import HeroMotion from './HeroMotion';
import Indicators from './Indicators';
import ScrollBadge from './ScrollBadge';

export default function Hero() {
  return (
    <HeroMotion>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(103,232,249,.22),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(45,212,191,.18),transparent_32%),radial-gradient(circle_at_50%_78%,rgba(153,246,228,.11),transparent_36%)]"
        data-hero-ambient
      />

      <HeroBackgroundCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-32 pb-40 text-center sm:px-8 md:pt-36 md:pb-36">
        <HeroContent />
        <HeroActions />
        <Indicators />
        <ScrollBadge />
      </div>
    </HeroMotion>
  );
}
