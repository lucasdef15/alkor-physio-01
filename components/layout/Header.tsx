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
    const handleScrool = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScrool();
    window.addEventListener('scroll', handleScrool);

    return () => {
      window.removeEventListener('scroll', handleScrool);
    };
  });

  return (
    <header
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        isScrolled ? 'top-3 max-w-[85%]' : 'top-4 max-w-[92%]'
      } w-full`}
    >
      <div
        className={`rounded-2xl border transition-all duration-500 ${
          isScrolled
            ? 'border-white/15 bg-white/15 backdrop-blur-3xl'
            : 'border-white/20 bg-white/20 backdrop-blur-xl'
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 transition-all duration-500 md:px-6 ${
            isScrolled ? 'py-3' : 'py-3'
          }`}
        >
          <div className="flex items-center">
            <LogoSVG
              className={`w-auto transition-all duration-500 ${isScrolled ? 'md-11 h-10' : 'h-10 md:h-12'}`}
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
              className={`rounded-3xl bg-white text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-white/90 active:scale-95 ${isScrolled ? 'px-4 py-2.5' : 'px-5 py-2.5'}`}
              onClick={() =>
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Agendar Consulta
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            className={`p-2 text-white lg:hidden ${isScrolled ? 'p-1' : 'p-2'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={isScrolled ? 24 : 28} /> : <Menu size={isScrolled ? 24 : 28} />}
          </button>
        </div>

        {isMenuOpen && <MobileHeader Links={Links} setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </header>
  );
}
