import Link from 'next/link';

import LogoSVG from '../svg/LogoSVG';
import { NAV_LINKS } from './navLinks';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.06] bg-slate-950 pt-16 pb-10"
      id="contato"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12">
          {/* Logo + Descrição */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoSVG className="h-10 w-auto" fill="#fff" name="ΛLKOR" surname="PHYSIO" />
            </div>

            <p className="mt-6 max-w-md leading-relaxed text-slate-400">
              Fisioterapia especializada com foco em resultados, atendimento humanizado e
              recuperação de qualidade de vida.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <span className="h-1 w-1 rounded-full bg-gradient-to-br from-teal-400 to-sky-400" />
              São Paulo, SP
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">Navegação</h3>
            <ul className="space-y-3.5 text-slate-400">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-4">
            <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">Contato</h3>

            <div className="space-y-3.5 text-slate-400">
              <p>
                <FooterLink href="tel:+5511999999999">(11) 99999-9999</FooterLink>
              </p>
              <p>
                <FooterLink href="mailto:contato@alkorphysio.com">
                  contato@alkorphysio.com
                </FooterLink>
              </p>
            </div>

            <div className="mt-8">
              <a
                className="inline-block rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] hover:border-white/25 hover:bg-white/[0.07] active:scale-[0.97]"
                href="mailto:contato@alkorphysio.com"
              >
                Fazer Agendamento
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-8 text-center text-sm text-slate-500">
          <p>© 2026 ΛLKOR PHYSIO • Todos os direitos reservados</p>
          <p className="mt-2 text-slate-600">Desenvolvido com foco na sua recuperação</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      className="group relative inline-block py-0.5 transition-colors duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] hover:text-white"
      href={href}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-teal-400 to-sky-400 transition-all duration-300 ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:w-full" />
    </Link>
  );
}
