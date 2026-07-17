'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LogoSVG from '../svg/LogoSVG';
import MobileHeader from './MobileHeader';

const Links = [
  { href: '#inicio', name: 'Início' },
  { href: '#especialidades', name: 'Especialidades' },
  { href: '#sobre', name: 'Sobre' },
  { href: '#depoimentos', name: 'Depoimentos' },
  { href: '#contato', name: 'Contato' },
];

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

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-header-theme]');

    const handleScroll = () => {
      const headerY = 80;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= headerY && rect.bottom >= headerY) {
          setTheme(section.dataset.headerTheme as 'dark' | 'light');
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-[top,max-width] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
        isScrolled ? 'top-3 max-w-[88%]' : 'top-4 max-w-[92%]'
      }`}
    >
      <div className="relative overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 -z-10 rounded-[inherit] bg-white/20 blur-3xl" />

        <div
          className={`relative overflow-hidden rounded-[inherit] border backdrop-blur-[32px] backdrop-saturate-[180%] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
            theme === 'dark'
              ? 'border-white/10 bg-slate-900/25 shadow-[0_8px_32px_rgba(0,0,0,.25),0_24px_80px_rgba(0,0,0,.18)]'
              : 'border-white/40 bg-white/45 shadow-[0_8px_32px_rgba(15,23,42,.08),0_24px_80px_rgba(15,23,42,.10)]'
          }`}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

          <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/20 ring-inset" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-transparent" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,.9) 1px, transparent 0)',
              backgroundSize: '6px 6px',
            }}
          />

          <div className="flex items-center justify-between px-4 py-3 md:px-5">
            <div className="flex items-center">
              <LogoSVG
                className={`h-12 w-auto transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
                  isScrolled ? 'scale-90' : 'scale-100'
                }`}
                fill={theme === 'dark' ? '#ffffff' : '#0f172a'}
                name="ΛLKOR"
                surname="PHYSIO"
              />
            </div>

            <nav className="hidden items-center lg:flex">
              <ul
                className={`flex items-center gap-8 text-sm font-medium transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white/80' : 'text-slate-700'
                }`}
              >
                {Links.map((link) => (
                  <li key={link.name}>
                    <Link
                      className={`group relative py-1 transition-colors duration-300 ${
                        theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                      }`}
                      href={link.href}
                    >
                      {link.name}

                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[.97] ${
                  theme === 'dark'
                    ? 'bg-white text-slate-900 shadow-[0_6px_20px_rgba(255,255,255,.12)] hover:bg-white/95'
                    : 'bg-slate-900 text-white shadow-[0_6px_20px_rgba(15,23,42,.22)] hover:brightness-110'
                }`}
                onClick={() =>
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Agendar Consulta
              </button>
            </div>

            <button
              aria-label="Toggle menu"
              className={`relative h-9 w-9 transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              } lg:hidden`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isMenuOpen ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`}
                size={26}
              />

              <X
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isMenuOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-90 opacity-0'
                }`}
                size={26}
              />
            </button>
          </div>

          <MobileHeader isOpen={isMenuOpen} links={Links} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  );
}
