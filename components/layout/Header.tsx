'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import LogoSVG from '../svg/LogoSVG';
import MobileHeader from './MobileHeader';
import { NAV_LINKS } from './navLinks';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const menuIconRef = useRef<SVGSVGElement>(null);
  const closeIconRef = useRef<SVGSVGElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const header = headerRef.current;
      const shell = shellRef.current;
      const content = contentRef.current;
      const logo = logoRef.current;

      if (!header || !shell || !content || !logo) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.set(header, {
        force3D: true,
        y: 16,
      });

      gsap.set(shell, {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        force3D: true,
        scaleX: 1,
        transformOrigin: 'center center',
      });

      gsap.set(content, {
        paddingBottom: 12,
        paddingTop: 12,
      });

      gsap.set(logo, {
        force3D: true,
        scale: 1,
        transformOrigin: 'left center',
      });

      if (reduceMotion) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          end: '+=140',
          invalidateOnRefresh: true,
          scrub: 0.65,
          start: 'top top',
          trigger: document.documentElement,
        },
      });

      timeline
        .to(
          header,
          {
            duration: 1,
            y: 8,
          },
          0,
        )
        .to(
          shell,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.82)',
            borderColor: 'rgba(15, 23, 42, 0.07)',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 30px -12px rgba(15, 23, 42, 0.18)',
            duration: 1,
            scaleX: 0.965,
          },
          0,
        )
        .to(
          content,
          {
            duration: 1,
            paddingBottom: 6,
            paddingTop: 6,
          },
          0,
        )
        .to(
          logo,
          {
            duration: 1,
            scale: 0.9,
          },
          0,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: headerRef,
    },
  );

  useGSAP(
    () => {
      const menuIcon = menuIconRef.current;
      const closeIcon = closeIconRef.current;

      if (!menuIcon || !closeIcon) return;

      gsap.set(menuIcon, {
        autoAlpha: 1,
        rotation: 0,
        scale: 1,
        transformOrigin: 'center',
      });

      gsap.set(closeIcon, {
        autoAlpha: 0,
        rotation: -45,
        scale: 0.82,
        transformOrigin: 'center',
      });

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.32,
          ease: 'power3.out',
          overwrite: 'auto',
        },
        paused: true,
      });

      timeline
        .to(
          menuIcon,
          {
            autoAlpha: 0,
            rotation: 45,
            scale: 0.82,
          },
          0,
        )
        .to(
          closeIcon,
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
          },
          0.06,
        );

      menuTimelineRef.current = timeline;

      return () => {
        timeline.kill();
        menuTimelineRef.current = null;
      };
    },
    {
      scope: headerRef,
    },
  );

  useEffect(() => {
    const timeline = menuTimelineRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!timeline) return;

    if (reduceMotion) {
      timeline.pause(isMenuOpen ? timeline.duration() : 0);
      return;
    }

    if (isMenuOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className="fixed top-0 left-1/2 z-50 w-[calc(100%-1rem)] max-w-[92%] -translate-x-1/2 will-change-transform sm:w-[calc(100%-2rem)]"
      ref={headerRef}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl border border-white/40 bg-white/50 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_20px_48px_-16px_rgba(15,23,42,0.14)] backdrop-blur-xl backdrop-saturate-150 will-change-transform"
          ref={shellRef}
        />

        <div
          className="relative flex items-center justify-between px-5 sm:px-10 lg:px-15"
          ref={contentRef}
        >
          <Link
            aria-label="Ir para o início"
            className="flex shrink-0 items-center"
            href="#inicio"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="will-change-transform" ref={logoRef}>
              <LogoSVG className="h-12 w-auto" fill="#0f172a" name="ΛLKOR" surname="PHYSIO" />
            </div>
          </Link>

          <nav className="hidden items-center lg:flex">
            <ul className="flex items-center gap-7 text-sm font-medium text-slate-700 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    className="group relative block py-2 transition-colors duration-300 hover:text-slate-950"
                    href={link.href}
                  >
                    {link.name}

                    <span className="absolute right-0 bottom-1 left-0 h-px origin-left scale-x-0 bg-linear-to-r from-teal-500 to-sky-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center lg:flex">
            <a
              className="group relative isolate overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.3)] transition-[box-shadow,filter,transform] duration-300 outline-none hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
              href="#contato"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-y-full bg-linear-to-r from-teal-600 to-sky-600 transition-transform duration-500 ease-out group-hover:translate-y-0"
              />

              <span className="relative">Agendar Consulta</span>
            </a>
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-900 transition-colors duration-300 outline-none hover:bg-slate-900/5 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            ref={menuButtonRef}
            type="button"
          >
            <Menu
              className="absolute will-change-transform"
              ref={menuIconRef}
              size={25}
              strokeWidth={1.8}
            />

            <X
              className="invisible absolute will-change-transform"
              ref={closeIconRef}
              size={25}
              strokeWidth={1.8}
            />
          </button>
        </div>

        <MobileHeader
          isOpen={isMenuOpen}
          links={NAV_LINKS}
          setIsMenuOpen={setIsMenuOpen}
          triggerRef={menuButtonRef}
        />
      </div>
    </header>
  );
}
