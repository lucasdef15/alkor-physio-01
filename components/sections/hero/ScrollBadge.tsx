export default function ScrollBadge({ text = 'Explore' }: { text?: string }) {
  return (
    <div className="animate-badge-breathe absolute bottom-0 left-1/2 flex w-full flex-col items-center gap-3 text-slate-400">
      <span className="text-[11px] font-medium tracking-[0.24em] text-slate-400 uppercase">
        {text}
      </span>

      <div className="relative flex h-10 w-6 items-center justify-center rounded-full border border-slate-300/70 bg-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm">
        <div className="animate-scroll-dot absolute h-2 w-1 rounded-full bg-linear-to-b from-teal-500 to-sky-500" />
      </div>
    </div>
  );
}
