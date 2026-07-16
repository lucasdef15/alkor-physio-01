import Button from '@/components/ui/Button';

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-2xl px-10 py-4 text-lg font-semibold shadow-xl shadow-emerald-600/40 transition-colors duration-400 active:scale-95"
        onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
        text="Agendar Avaliação Gratuita"
      />

      <Button
        className="border-primary text-primary-soft hover:bg-primary-soft/10 border px-8 py-4 text-lg font-medium transition-colors duration-400"
        onClick={() =>
          document.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth' })
        }
        text="Conhecer Especialidades"
      />
    </div>
  );
}
