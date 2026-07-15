import Button from '@/components/ui/Button';

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        className="rounded-2xl bg-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-600/40 transition-all hover:bg-emerald-700 active:scale-95"
        onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
        text="Agendar Avaliação Gratuita"
      />

      <Button
        className="border border-emerald-500 px-8 py-4 text-lg font-medium text-emerald-300 transition-all hover:bg-emerald-500/10"
        onClick={() =>
          document.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth' })
        }
        text="Conhecer Especialidades"
      />
    </div>
  );
}
