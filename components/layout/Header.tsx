'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LogoSVG from '../svg/LogoSVG';
import MobileHeader from './MobileHeader';

const Links = [
  { href: '#inicio', name: 'Início' },
  { href: '#especialidades', name: 'Especialidades' },
  { href: '#como-funciona', name: 'Como Funciona' },
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-all duration-500 ${
        isScrolled ? 'top-3 max-w-[88%]' : 'top-4 max-w-[92%]'
      }`}
    >
      <div
        className={`rounded-3xl border shadow-2xl backdrop-saturate-180 transition-colors duration-500 ${
          isScrolled
            ? 'border-white/15 bg-white/10 shadow-black/35 backdrop-blur-3xl'
            : 'border-white/20 bg-white/15 shadow-black/20 backdrop-blur-2xl'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-5">
          <div className="flex items-center">
            <LogoSVG
              className={`h-12 w-auto transition-transform duration-500 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
              fill="white"
              name="ΛLKOR"
              surname="PHYSIO"
            />
          </div>

          <nav className="hidden items-center lg:flex">
            <ul className="flex items-center gap-8 text-sm font-medium text-white">
              {Links.map((link) => (
                <li key={link.name}>
                  <Link
                    className="transition-all duration-200 hover:scale-105 hover:text-emerald-400"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              className="rounded-3xl bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-white/90 active:scale-95"
              onClick={() =>
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Agendar Consulta
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            className="p-2 text-white transition-[height,width] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <MobileHeader isOpen={isMenuOpen} links={Links} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  );
}
