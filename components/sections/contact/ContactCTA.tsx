import { ArrowRight, CalendarCheck, Phone } from 'lucide-react';

import { SITE_CONFIG } from '@/lib/site';

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950" id="contato">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.18),transparent_46%)]"
      />
      <div className="site-container section-space relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-teal-300 uppercase">
            <CalendarCheck className="size-4" strokeWidth={1.75} />
            Próximo passo
          </span>
          <h2 className="font-space-grotesk mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance text-white sm:text-5xl lg:text-6xl">
            Sua recuperação pode começar com uma conversa tranquila.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-pretty text-slate-300 sm:text-lg">
            Agende uma avaliação individual para entender seu momento, esclarecer dúvidas e definir
            um plano seguro para respirar melhor e retomar sua rotina.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_36px_-18px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-50"
              href={`mailto:${SITE_CONFIG.contact.email}`}
            >
              Agendar avaliação
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
              href={`tel:${SITE_CONFIG.contact.phoneHref}`}
            >
              <Phone className="size-4" strokeWidth={1.75} />
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-slate-400">
            Atendimento individualizado • {SITE_CONFIG.contact.location} • CREFITO ativo
          </p>
        </div>
      </div>
    </section>
  );
}
