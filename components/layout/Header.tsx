'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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

  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-[92%] -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-white/95 shadow-xl shadow-zinc-950/5 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <LogoSVG className="h-11 w-auto md:h-12" fill="#0F172A" name="ΛLKOR" surname="PHYSIO" />
          </div>

          <nav className="hidden items-center md:flex">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-700">
              {Links.map((link) => (
                <li key={link.name}>
                  <Link
                    className="transition-colors duration-200 hover:text-emerald-600"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:bg-emerald-700 active:scale-95"
              onClick={() =>
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Agendar Consulta
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            className="p-2 text-slate-700 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && <MobileHeader Links={Links} setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </header>
  );
}
