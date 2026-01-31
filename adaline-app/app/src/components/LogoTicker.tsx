// Logo ticker component with CSS animation

const logos = [
  { name: 'STATFLO', svg: (
    <svg viewBox="0 0 100 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold tracking-wider">STATFLO</text>
    </svg>
  )},
  { name: 'DOORDASH', svg: (
    <svg viewBox="0 0 100 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold tracking-wider">DOORDASH</text>
    </svg>
  )},
  { name: 'Gusto', svg: (
    <svg viewBox="0 0 60 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">Gusto</text>
    </svg>
  )},
  { name: 'Reforge', svg: (
    <svg viewBox="0 0 70 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">Reforge</text>
    </svg>
  )},
  { name: 'McKinsey', svg: (
    <svg viewBox="0 0 100 24" className="h-5 w-auto">
      <text x="0" y="14" className="fill-current text-xs font-semibold">McKinsey</text>
      <text x="0" y="22" className="fill-current text-[8px]">& Company</text>
    </svg>
  )},
  { name: 'SimpleDocs', svg: (
    <svg viewBox="0 0 90 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">SimpleDocs</text>
    </svg>
  )},
  { name: 'HubSpot', svg: (
    <svg viewBox="0 0 70 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">HubSpot</text>
    </svg>
  )},
  { name: 'serif', svg: (
    <svg viewBox="0 0 50 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-bold italic">serif</text>
    </svg>
  )},
  { name: 'Jusbrasil', svg: (
    <svg viewBox="0 0 70 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">Jusbrasil</text>
    </svg>
  )},
  { name: 'Daybreak', svg: (
    <svg viewBox="0 0 70 24" className="h-5 w-auto">
      <text x="0" y="18" className="fill-current text-sm font-semibold">Daybreak</text>
    </svg>
  )},
];

const LogoTicker = () => {
  return (
    <div className="w-full overflow-hidden py-8">
      <p className="text-center text-xs text-muted-foreground mb-6 tracking-widest uppercase">
        Trusted by
      </p>
      <div className="relative">
        <div className="flex animate-ticker">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-8 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
