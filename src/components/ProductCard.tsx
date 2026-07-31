import { useRef, useState } from 'react';
import type { Product } from '../data/products';
import { formatPrice, isStandaloneExtra } from '../data/products';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/flyToCart';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [bump, setBump] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isIngredientExtra = product.category === 'extras' && !isStandaloneExtra(product.id);
    if (isIngredientExtra) {
      const hasMainItem = items.some(
        (i) => i.product.category === 'hamburguesas' || i.product.category === 'combos'
      );
      if (!hasMainItem) {
        addItem(product, 1);
        return;
      }
      onOpen(product);
      return;
    }

    flyToCart(mediaRef.current, product.image);
    addItem(product, 1);
    setBump(true);
    window.setTimeout(() => setBump(false), 900);
  };

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(product)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(product);
        }
      }}
      style={
        {
          transform:
            'perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)',
        } as React.CSSProperties
      }
      className="card-premium group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl sm:rounded-[1.75rem] transition-[transform,box-shadow,border-color] duration-500 ease-smooth hover:border-cheese/40 hover:shadow-[0_24px_50px_-20px_rgba(240,160,32,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cheese"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl sm:rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(350px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.09), transparent 45%)',
        }}
      />

      <div ref={mediaRef} className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-smoke">
        {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            'h-full w-full object-cover transition-all duration-[900ms] ease-smooth group-hover:scale-[1.09]',
            imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
          )}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <span className="shine-layer" aria-hidden="true" />

        {product.badge && (
          <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-cheese-light to-cheese px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-charcoal shadow-lg shadow-black/60 border border-amber-300/60 backdrop-blur-sm">
            <img
              src={product.category === 'combos' ? '/badge-combo.svg' : '/badge-most-wanted.svg'}
              alt=""
              className="h-3 w-3 inline-block"
            />
            <span>{product.badge}</span>
          </span>
        )}

        {product.category === 'combos' && (
          <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 inline-flex items-center gap-1.5 rounded-lg bg-charcoal/90 border border-cheese/60 px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-cheese-light shadow-lg backdrop-blur-md">
            <span>🍟🥤 Incluye papas + bebida</span>
          </span>
        )}

        <span className="price-tag absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 text-sm sm:text-lg transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:scale-105">
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-2.5 p-3 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-1">
            <h3 className="display-title text-lg sm:text-[1.8rem] tracking-[0.03em] text-cream transition-colors duration-300 group-hover:text-cheese-light leading-tight">
              {product.name}
            </h3>
            {product.stars ? (
              <span className="text-[10px] sm:text-xs text-cheese font-black shrink-0">
                {'★'.repeat(product.stars)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-xs sm:text-sm leading-relaxed text-cream-muted">
            {product.description}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            'relative mt-auto inline-flex min-h-9 sm:min-h-11 w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl sm:rounded-full bg-cream text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.1em] text-charcoal active-haptic hover:bg-white hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.5)]',
            bump && '!bg-gradient-to-b from-cheese-light to-cheese !text-charcoal animate-spring-pop'
          )}
        >
          <span className="flex items-center gap-1.5">
            {bump ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                ¡Agregado!
              </>
            ) : (
              <>
                <PlusIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
                Agregar
              </>
            )}
          </span>
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-premium overflow-hidden rounded-[1.75rem]">
      <div className="aspect-[5/4] skeleton-shimmer" />
      <div className="space-y-3 p-5">
        <div className="h-7 w-1/2 skeleton-shimmer rounded" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-2/3 skeleton-shimmer rounded" />
        <div className="h-11 w-full skeleton-shimmer rounded-full" />
      </div>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
