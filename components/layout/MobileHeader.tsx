'use client';

import Link from 'next/link';
import React from 'react';

interface MobileHeaderProps {
  isOpen: boolean;
  links: { href: string; name: string }[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileHeader({ isOpen, links, setIsMenuOpen }: MobileHeaderProps) {
  return (
    <div
      className={`overflow-hidden rounded-b-3xl border-t border-white/10 bg-slate-900/60 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 lg:hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <nav className="px-5 py-6">
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <li
              className={`border-b border-white/5 transition-all duration-300 last:border-none ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              key={link.name}
              style={{
                transitionDelay: isOpen ? `${index * 60}ms` : '0ms',
              }}
            >
              <Link
                className="block py-4 text-base font-medium text-white transition-all duration-200 hover:translate-x-1 hover:text-emerald-400"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* 
        <button
          className="mt-8 w-full rounded-3xl bg-emerald-600 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 active:scale-[0.985]"
          onClick={() => {
            setIsMenuOpen(false);
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Agendar Consulta
        </button> */}
      </nav>
    </div>
  );
}
