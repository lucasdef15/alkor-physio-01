interface SpecialtiesCardProps {
  description: string;
  featured?: boolean;
  number: string;
  title: string;
}

export default function SpecialtiesCard({
  description,
  featured,
  number,
  title,
}: SpecialtiesCardProps) {
  return (
    <li
      className={[
        'group relative isolate flex min-h-[13.5rem] flex-col overflow-hidden',
        'rounded-[1.4rem] border p-5',
        'shadow-[0_20px_55px_-42px_rgba(15,23,42,0.35)]',
        'backdrop-blur-xl',
        'transition-all duration-500 ease-[var(--ease-premium)]',
        'motion-safe:hover:-translate-y-1',
        'motion-safe:hover:shadow-[0_28px_70px_-44px_rgba(15,118,110,0.32)]',
        'sm:min-h-[16rem] sm:p-6',
        'lg:min-h-[17.5rem] lg:p-7',
        featured ? 'border-primary/25 bg-primary/[0.055]' : 'border-slate-200/70 bg-white/80',
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="from-primary/0 via-primary/45 to-primary/0 absolute inset-x-7 top-0 h-px bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="bg-primary/[0.055] absolute -top-16 -right-16 -z-10 size-40 rounded-full blur-3xl transition-transform duration-700 motion-safe:group-hover:scale-125"
      />

      <div className="flex items-center gap-3">
        <span
          className={[
            'font-mono text-[0.65rem] font-semibold tracking-[0.18em]',
            'transition-colors duration-300',
            featured ? 'text-primary/75' : 'group-hover:text-primary/65 text-slate-300',
          ].join(' ')}
        >
          {number}
        </span>

        <span
          aria-hidden="true"
          className={[
            'h-px min-w-6 flex-1',
            featured
              ? 'bg-primary/25'
              : 'group-hover:bg-primary/25 bg-slate-200 transition-colors duration-300',
          ].join(' ')}
        />

        {featured && (
          <span className="text-primary/75 text-[0.58rem] leading-none font-semibold tracking-[0.16em] uppercase">
            Continuidade do cuidado
          </span>
        )}
      </div>

      <div className="mt-auto pt-12 sm:pt-16">
        <h3 className="font-space-grotesk text-foreground max-w-[18ch] text-lg leading-[1.18] font-semibold tracking-[-0.025em] sm:text-xl">
          {title}
        </h3>

        <p className="text-foreground-muted mt-3 max-w-[38ch] text-sm leading-6">{description}</p>
      </div>

      <div
        aria-hidden="true"
        className="from-primary/55 absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r to-transparent transition-[width] duration-500 ease-out group-hover:w-full"
      />
    </li>
  );
}
