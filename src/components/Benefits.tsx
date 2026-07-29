import { Reveal } from './Reveal';

const benefits = [
  {
    title: 'SMASH AL MOMENTO',
    desc: 'Carne smash a la plancha, recién hecha.',
    icon: '🔥',
  },
  {
    title: 'DELIVERY',
    desc: 'Te llevamos el pedido a donde estés.',
    icon: '🛵',
  },
  {
    title: 'PAGÁ COMO PREFIERAS',
    desc: 'Efectivo, débito o transferencia.',
    icon: '💳',
  },
];

export function Benefits() {
  return (
    <section className="relative py-4" aria-label="Beneficios J Burger">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/12 bg-gradient-to-r from-surface-2/90 via-surface/95 to-surface-2/90 p-3.5 sm:p-4 shadow-xl backdrop-blur-md">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {benefits.map((b, i) => (
              <Reveal key={b.title} variant="up" delay={i * 100}>
                <div className="flex items-center gap-3 px-2 py-1 sm:first:pl-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cheese/30 bg-cheese/15 text-xl shadow-inner">
                    {b.icon}
                  </span>
                  <div>
                    <h3 className="display-title text-base tracking-wider text-cheese-light leading-none">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-cream/85 leading-tight">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
