'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Dispatch, KeyboardEvent, RefObject, SetStateAction, useEffect, useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface MobileHeaderProps {
  isOpen: boolean;
  links: {
    href: string;
    name: string;
  }[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function MobileHeader({
  isOpen,
  links,
  setIsMenuOpen,
  triggerRef,
}: MobileHeaderProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useGSAP(
    () => {
      const menu = menuRef.current;

      if (!menu) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set(menu, {
        force3D: true,
        scaleX: 1,
        transformOrigin: 'center top',
      });

      if (reduceMotion) return;

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

      timeline.to(
        menu,
        {
          duration: 1,
          scaleX: 0.965,
        },
        0,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: menuRef,
    },
  );

  useEffect(() => {
    if (isOpen) {
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }

    wasOpen.current = isOpen;
  }, [isOpen, triggerRef]);

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen || event.key !== 'Tab') return;

    const focusableElements = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') ?? []);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`overflow-hidden rounded-b-3xl border-t border-slate-900/6 bg-white/85 backdrop-blur-2xl backdrop-saturate-150 transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.45,0,0.2,1)] will-change-transform motion-reduce:transition-none lg:hidden ${
        isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
      }`}
      id="mobile-menu"
      inert={!isOpen}
      onKeyDown={trapFocus}
      ref={menuRef}
    >
      <nav className="px-5 py-6">
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <li
              className={`border-b border-slate-900/5 transition-all duration-400 ease-[cubic-bezier(0.45,0,0.2,1)] last:border-none motion-reduce:transition-none ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              key={link.name}
              style={{
                transitionDelay: isOpen ? `${index * 75}ms` : '0ms',
              }}
            >
              <Link
                className="group flex items-center gap-3 py-4 text-base font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-linear-to-br from-teal-500 to-sky-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <a
          className={`mt-6 block w-full rounded-full bg-slate-900 py-3.5 text-center text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.3)] transition-all duration-400 ease-[cubic-bezier(0.45,0,0.2,1)] active:scale-[0.98] motion-reduce:transition-none ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          href="#contato"
          onClick={() => setIsMenuOpen(false)}
          style={{
            transitionDelay: isOpen ? `${links.length * 75}ms` : '0ms',
          }}
        >
          Agendar Consulta
        </a>
      </nav>
    </div>
  );
}
