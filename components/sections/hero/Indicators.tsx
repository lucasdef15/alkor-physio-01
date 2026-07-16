import CountUp from 'react-countup';

const indicators = [
  { base: 'Anos de Experiência', sub: 'em Reabilitação', suffix: ' +', value: 8 },
  { base: 'Pacientes atendidos', sub: 'com Excelência', suffix: ' +', value: 500 },
  { base: 'Satisfação', sub: 'dos Pacientes', suffix: ' %', value: 98 },
];

export default function Indicators() {
  return (
    <section className="mt-10 mb-10 px-6 md:mt-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 select-none md:grid-cols-3">
          {indicators.map((item) => (
            <div className="group flex flex-col items-center text-center" key={item.base}>
              <CountUp
                className="text-primary-foreground cursor-default text-6xl font-semibold tracking-tighter transition-colors duration-300 group-hover:text-emerald-400 md:text-7xl"
                duration={2.2}
                end={item.value}
                start={0}
                suffix={item.suffix}
              />

              <h3 className="text-primary-foreground mt-4 text-xl font-medium">{item.base}</h3>

              <p className="text-primary-foreground-muted mt-1 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
