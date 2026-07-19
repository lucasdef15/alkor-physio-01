import AboutContent from './AboutContent';

export default function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-linear-to-b from-[#EDF8FA] via-[#F4FAFB] to-[#F8FCFD]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[8%] right-[-12%] h-120 w-120 rounded-full bg-teal-300/12 blur-[170px]" />
        <div className="absolute bottom-[-10%] left-[-12%] h-120 w-120 rounded-full bg-sky-300/12 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-36">
        <AboutContent />
      </div>
    </section>
  );
}
