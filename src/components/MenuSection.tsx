import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  categoryLabels,
  getProductsByCategory,
  type Product,
  type ProductCategory,
} from '../data/products';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import { Reveal, RevealLines } from './Reveal';
import { PapasPromoCard } from './PapasPromoCard';
import { getStoreStatus } from '../utils/storeStatus';
import { cn } from '../utils/cn';

const tabs: ProductCategory[] = ['hamburguesas', 'combos', 'extras'];

const tabIcons: Record<ProductCategory, string> = {
  hamburguesas: '🍔',
  combos: '🍟',
  extras: '🥤',
};

const tabMeta: Record<ProductCategory, { count: string; hint: string }> = {
  hamburguesas: { count: '5', hint: 'Smash de 1 a 4 carnes vacunas' },
  combos: { count: '3', hint: 'Burger + papas + bebida' },
  extras: { count: '4', hint: 'Papas, cheddar y bacon' },
};

interface MenuSectionProps {
  onOpenProduct: (product: Product) => void;
  category: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export function MenuSection({
  onOpenProduct,
  category,
  onCategoryChange,
}: MenuSectionProps) {
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabsWrapRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  const measure = useCallback(() => {
    const el = tabRefs.current[category];
    const wrap = tabsWrapRef.current;
    if (!el || !wrap) return;
    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
      ready: true,
    });
  }, [category]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    const wrap = tabsWrapRef.current;
    wrap?.addEventListener('scroll', onResize, { passive: true });
    const t = window.setTimeout(measure, 200);
    return () => {
      window.removeEventListener('resize', onResize);
      wrap?.removeEventListener('scroll', onResize);
      window.clearTimeout(t);
    };
  }, [measure]);

  const list = useMemo(() => getProductsByCategory(category), [category]);

  const selectCategory = (cat: ProductCategory) => {
    if (cat === category) return;
    setSwitching(true);
    window.setTimeout(() => {
      onCategoryChange(cat);
      setSwitching(false);
    }, 180);

    const el = document.getElementById('menu');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > top + 40) window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16" aria-labelledby="menu-title">
      <div className="glow-orb right-0 top-16 h-72 w-72 bg-cheese/15 pointer-events-none blur-3xl" />
      <div className="glow-orb -left-16 bottom-40 h-64 w-64 bg-ember/10 pointer-events-none blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-3.5 sm:px-6">
        {/* Integrated Hero Title Bar */}
        <div className="mb-6 text-center">
          {(() => {
            const status = getStoreStatus();
            return (
              <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-full border border-cheese/40 bg-cheese/10 px-4 py-1.5 shadow-[0_0_24px_-6px_rgba(240,160,32,0.5)] backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', status.isOpen ? 'bg-emerald-400' : 'bg-cheese')} />
                    <span className={cn('relative inline-flex h-2 w-2 rounded-full', status.isOpen ? 'bg-emerald-500' : 'bg-cheese')} />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-cheese-light">
                    {status.label}
                  </span>
                </div>
                <span className="hidden sm:inline text-cream/40">•</span>
                <span className="text-[10px] font-bold text-cream/80 tracking-wide">
                  {status.sublabel}
                </span>
              </div>
            );
          })()}

          <h1 id="menu-title" className="display-title mt-2 text-[2.8rem] sm:text-6xl lg:text-7xl text-cream tracking-tight leading-[0.92]">
            <span className="shimmer-text bg-gradient-to-r from-cheese-light via-cheese to-ember bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(240,160,32,0.45)]">
              SMASH BURGERS
            </span>
          </h1>
        </div>

        <div id="menu" className="scroll-mt-28" />
        <div id="combos" className="scroll-mt-28" />
        <div id="extras" className="scroll-mt-28" />

        {/* Sticky Mobile-First Category Control Bar */}
        <div className="sticky top-[5.75rem] z-30 -mx-3.5 mb-6 px-3.5 sm:mx-0 sm:px-0">
          <div className="rounded-2xl border border-white/12 bg-charcoal/90 p-1.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:flex sm:items-center sm:justify-between sm:gap-4 sm:pr-4">
            <div
              ref={tabsWrapRef}
              role="tablist"
              aria-label="Categorías del menú"
              className="no-scrollbar relative flex gap-1 overflow-x-auto"
            >
              <span
                aria-hidden="true"
                className="tab-indicator"
                style={{
                  width: indicator.width,
                  transform: `translateX(${indicator.left}px)`,
                  opacity: indicator.ready ? 1 : 0,
                }}
              />
              {tabs.map((tab) => {
                const isActive = tab === category;
                return (
                  <button
                    key={tab}
                    ref={(el) => {
                      tabRefs.current[tab] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectCategory(tab)}
                    className={cn(
                      'relative z-10 shrink-0 rounded-full px-4 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider active-haptic transition-colors duration-300 sm:px-6',
                      isActive ? 'text-charcoal' : 'text-cream/60 hover:text-cream'
                    )}
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-sm sm:text-base">{tabIcons[tab]}</span>
                      <span>{categoryLabels[tab]}</span>
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none transition-colors duration-300',
                          isActive ? 'bg-charcoal/15 text-charcoal' : 'bg-white/10 text-cheese-light'
                        )}
                      >
                        {tabMeta[tab].count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              key={category}
              className="animate-fade-up hidden text-xs font-semibold uppercase tracking-[0.16em] text-cream/50 sm:block"
            >
              {tabMeta[category].hint}
            </p>
          </div>
        </div>

        {/* Animated Product Grid: 2 Columns on Mobile, 3 on Desktop */}
        <div
          ref={listRef}
          className={cn(
            'transition-all duration-300 ease-smooth',
            switching ? 'translate-y-2 opacity-0 blur-[4px]' : 'translate-y-0 opacity-100 blur-0 animate-tab-slide'
          )}
        >
          <ProductGrid
            key={category}
            loading={loading}
            products={list}
            onOpen={onOpenProduct}
            emptyLabel={`No hay ${categoryLabels[category].toLowerCase()} disponibles por ahora.`}
          />
        </div>

        {/* Card promocional de Papas por $70 al final del menú */}
        <div className="mt-10">
          <PapasPromoCard variant="banner" />
        </div>
      </div>
    </section>
  );
}

function ProductGrid({
  loading,
  products,
  onOpen,
  emptyLabel,
}: {
  loading: boolean;
  products: Product[];
  onOpen: (p: Product) => void;
  emptyLabel: string;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
          🍔
        </div>
        <p className="display-title text-2xl text-cream/80">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
      {products.map((product, idx) => (
        <div
          key={product.id}
          className="animate-fade-up"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <ProductCard product={product} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}
