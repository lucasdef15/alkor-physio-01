import Link from 'next/link';
import React from 'react';

interface MobileHeaderProps {
  isMenuOpen?: boolean;
  Links: { href: string; name: string }[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileHeader({ Links, setIsMenuOpen }: MobileHeaderProps) {
  return (
    <div className="flex rounded-b-2xl border-t border-slate-100 bg-white/95 backdrop-blur-xl lg:hidden">
      <nav className="px-6 py-6">
        <ul className="flex flex-col gap-6 text-base font-medium text-slate-700">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                className="block transition-colors hover:text-emerald-600"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="mt-8 w-full rounded-2xl bg-emerald-600 py-3.5 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.985]"
          onClick={() => {
            setIsMenuOpen(false);
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Agendar Consulta
        </button>
      </nav>
    </div>
  );
}
