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
      className={`overflow-hidden rounded-b-3xl border-t border-slate-900/6 bg-white/85 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.45,0,0.2,1)] lg:hidden ${
        isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <nav className="px-5 py-6">
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <li
              className={`border-b border-slate-900/5 transition-all duration-400 ease-[cubic-bezier(0.45,0,0.2,1)] last:border-none ${
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

        <button
          className={`mt-6 w-full rounded-full bg-slate-900 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-6px_rgba(15,23,42,0.3)] transition-all duration-400 ease-[cubic-bezier(0.45,0,0.2,1)] active:scale-[0.98] ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          onClick={() => {
            setIsMenuOpen(false);
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            transitionDelay: isOpen ? `${links.length * 75}ms` : '0ms',
          }}
        >
          Agendar Consulta
        </button>
      </nav>
    </div>
  );
}
