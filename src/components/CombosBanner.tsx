import { getProductsByCategory, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { Reveal, RevealLines } from './Reveal';

export function CombosBanner() {
  const combos = getProductsByCategory('combos');
  const { addItem, openCart } = useCart();

  const scrollToCombos = () => {
    window.dispatchEvent(new CustomEvent('jburger:category', { detail: 'combos' }));
    const el = document.getElementById('menu');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12" aria-labelledby="combos-banner-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-cheese/25 bg-[#16120c]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-cheese/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-ember/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
            <div>
              <Reveal variant="down">
                <p className="section-kicker">Combos</p>
              </Reveal>
              <h2
                id="combos-banner-title"
                className="display-title mt-3 text-4xl text-cream sm:text-5xl lg:text-6xl"
              >
                <RevealLines
                  lines={[
                    <>BURGER + PAPAS</>,
                    <span className="text-cheese">+ BEBIDA</span>,
                  ]}
                />
              </h2>
              <Reveal variant="up" delay={260}>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-muted sm:text-base">
                  Armá el combo completo en un toque. Ideal para no pensar de más.
                </p>
              </Reveal>
              <Reveal variant="up" delay={360}>
                <button
                  type="button"
                  onClick={scrollToCombos}
                  className="btn-primary group relative mt-7 overflow-hidden hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Ver combos</span>
                  <span className="shine-layer" aria-hidden="true" />
                </button>
              </Reveal>
            </div>

            <ul className="space-y-3">
              {combos.map((combo, i) => (
                <Reveal
                  as="li"
                  key={combo.id}
                  variant="right"
                  delay={i * 140}
                  className="group flex items-center gap-2.5 sm:gap-4 rounded-2xl sm:rounded-[1.25rem] border border-white/10 bg-black/40 p-2.5 sm:p-3.5 backdrop-blur-md transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-cheese/35 hover:bg-black/55 hover:shadow-[0_24px_50px_-30px_rgba(240,160,32,0.7)]"
                >
                  <div className="relative h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <img
                      src={combo.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="display-title truncate text-base sm:text-[1.35rem] tracking-wide text-cream">
                      {combo.name}
                    </p>
                    <p className="line-clamp-1 sm:line-clamp-2 text-[11px] sm:text-xs text-cream-muted">
                      {combo.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end justify-center gap-1.5">
                    <span className="price-tag text-xs sm:text-base whitespace-nowrap">
                      {formatPrice(combo.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(combo, 1);
                        openCart();
                      }}
                      className="rounded-full bg-cream/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide text-cream ring-1 ring-white/10 active-haptic hover:bg-cheese hover:text-charcoal hover:ring-cheese"
                    >
                      Agregar
                    </button>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
