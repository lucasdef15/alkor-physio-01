import CountUp from 'react-countup';

const indicators = [
  { base: 'Anos de Experiência', sub: 'em Reabilitação', value: 8 },
  { base: 'Pacientes atendidos', sub: 'com Excelência', value: 500 },
  { base: 'Satisfação', sub: 'dos Pacientes', value: 98 },
];

export default function Indicators() {
  return (
    <div>
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-sm font-semibold tracking-tight text-slate-400">
        {indicators.map((text, index) => (
          <div className="flex items-center gap-3" key={index}>
            <CountUp
              className="text-5xl font-semibold text-white"
              end={text.value}
              start={0}
              suffix={text.value === 98 ? '%' : '+'}
            />
            <div className="flex flex-col items-start text-white">
              <p className="font-medium">{text.base}</p>
              <p className="text-slate-300/70">{text.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
