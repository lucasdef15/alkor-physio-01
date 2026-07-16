export default function ScrollBadge({ text = 'Explore' }: { text?: string }) {
  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center text-xs tracking-widest text-slate-400 uppercase">
      <span>{text}</span>

      <div className="relative mt-2 flex h-9 w-5 items-center justify-center rounded-full border border-slate-400/60">
        <div className="animate-scroll bg-primary absolute h-3 w-1 rounded-full" />
      </div>
    </div>
  );
}
