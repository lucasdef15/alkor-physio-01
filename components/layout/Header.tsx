'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LogoSVG from '../svg/LogoSVG';
import MobileHeader from './MobileHeader';
import { NAV_LINKS } from './navLinks';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);

    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-[top,max-width] duration-500 ease-[cubic-bezier(0.45,0,0.2,1)] ${
        isScrolled ? 'top-3 max-w-[88%]' : 'top-4 max-w-[92%]'
      }`}
    >
      <div
        className={`rounded-3xl border backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.45,0,0.2,1)] ${
          isScrolled
            ? 'border-slate-900/6 bg-white/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.18)]'
            : 'border-white/40 bg-white/45 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_20px_48px_-16px_rgba(15,23,42,0.14)]'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-5">
          <Link aria-label="Ir para o início" className="flex items-center" href="#inicio">
            <LogoSVG
              className={`h-12 w-auto transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.2,1)] ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
              fill="#0f172a"
              name="ΛLKOR"
              surname="PHYSIO"
            />
          </Link>

          <nav className="hidden items-center lg:flex">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-700">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    className="group relative py-1 transition-colors duration-300 hover:text-slate-900"
                    href={link.href}
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r from-teal-500 to-sky-500 transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.3)] transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.1),0_10px_24px_-6px_rgba(15,23,42,0.4)] hover:brightness-110 active:scale-[0.97]"
              href="#contato"
            >
              Agendar Consulta
            </a>
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="relative h-9 w-9 rounded-full text-slate-900 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu
              className={`absolute inset-0 m-auto transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] ${
                isMenuOpen ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
              }`}
              size={26}
            />
            <X
              className={`absolute inset-0 m-auto transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] ${
                isMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-90 opacity-0'
              }`}
              size={26}
            />
          </button>
        </div>

        <MobileHeader isOpen={isMenuOpen} links={NAV_LINKS} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  );
}
