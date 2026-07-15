'use client';

import Link from 'next/link';

import LogoSVG from '../svg/LogoSVG';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12">
          {/* Logo + Descrição */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoSVG className="h-10 w-auto" fill="#fff" name="ΛLKOR" surname="PHYSIO" />
            </div>

            <p className="mt-6 max-w-md text-slate-400">
              Fisioterapia especializada com foco em resultados, atendimento humanizado e
              recuperação de qualidade de vida.
            </p>

            <div className="mt-8 text-sm text-slate-500">São Paulo, SP</div>
          </div>

          {/* Links Rápidos */}
          <div className="md:col-span-3">
            <h3 className="mb-5 font-semibold text-white">Navegação</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link className="transition-colors hover:text-emerald-400" href="#especialidades">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-emerald-400" href="#como-funciona">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-emerald-400" href="#sobre">
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-emerald-400" href="#depoimentos">
                  Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-4">
            <h3 className="mb-5 font-semibold text-white">Contato</h3>

            <div className="space-y-4 text-slate-400">
              <p>
                <a className="transition-colors hover:text-emerald-400" href="tel:+5511999999999">
                  (11) 99999-9999
                </a>
              </p>
              <p>
                <a
                  className="transition-colors hover:text-emerald-400"
                  href="mailto:contato@alkorphysio.com"
                >
                  contato@alkorphysio.com
                </a>
              </p>
            </div>

            <div className="mt-8">
              <button
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/5"
                onClick={() =>
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Fazer Agendamento
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>© 2026 ΛLKOR PHYSIO • Todos os direitos reservados</p>
          <p className="mt-2">Desenvolvido com foco na sua recuperação</p>
        </div>
      </div>
    </footer>
  );
}
