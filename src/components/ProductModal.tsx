import { useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { formatPrice, products as catalogProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export function ProductModal({ product, onClose, onSelectProduct }: ProductModalProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [visible, setVisible] = useState(false);
  const [animDir, setAnimDir] = useState<'next' | 'prev' | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Swipe touch state
  const touchStartX = useRef<number | null>(null);

  // Current category product list
  const categoryProducts = catalogProducts.filter(
    (p) => product && p.category === product.category
  );
  const currentIndex = categoryProducts.findIndex((p) => p.id === product?.id);

  useEffect(() => {
    if (product) {
      setQty(1);
      setDragOffset(0);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  const handlePrev = () => {
    if (!categoryProducts.length || !onSelectProduct || currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + categoryProducts.length) % categoryProducts.length;
    setAnimDir('prev');
    setQty(1);
    setDragOffset(0);
    onSelectProduct(categoryProducts[prevIdx]);
    window.setTimeout(() => setAnimDir(null), 350);
  };

  const handleNext = () => {
    if (!categoryProducts.length || !onSelectProduct || currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % categoryProducts.length;
    setAnimDir('next');
    setQty(1);
    setDragOffset(0);
    onSelectProduct(categoryProducts[nextIdx]);
    window.setTimeout(() => setAnimDir(null), 350);
  };

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, currentIndex]);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 200);
  };

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, qty);
    handleClose();
  };

  // Real-Time Touch Drag Swipe Physics
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const delta = e.touches[0].clientX - touchStartX.current;
      setDragOffset(delta);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 35) {
      if (dragOffset < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragOffset(0);
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        aria-label="Cerrar"
        onClick={handleClose}
      />

      {/* Floating 3D Navigation Arrow Left */}
      {categoryProducts.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="hidden sm:flex absolute left-6 top-1/2 z-30 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal/80 text-cheese-light shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-cheese hover:bg-cheese/20 active-haptic"
          aria-label="Producto anterior"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Floating 3D Navigation Arrow Right */}
      {categoryProducts.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="hidden sm:flex absolute right-6 top-1/2 z-30 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal/80 text-cheese-light shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-cheese hover:bg-cheese/20 active-haptic"
          aria-label="Producto siguiente"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] border border-white/12 bg-surface shadow-[0_50px_120px_-20px_rgba(0,0,0,0.95)] transition-all duration-300 ease-smooth sm:rounded-[1.75rem]',
          visible ? 'translate-y-0 scale-100 opacity-100 blur-0' : 'animate-modal-out'
        )}
      >
        <div className="absolute left-1/2 top-3 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/30 backdrop-blur-md sm:hidden" />

        {/* Carousel Progress Indicator Dots */}
        {categoryProducts.length > 1 && (
          <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
            {categoryProducts.map((p, idx) => (
              <span
                key={p.id}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  idx === currentIndex ? 'w-5 bg-cheese' : 'w-1.5 bg-white/30'
                )}
              />
            ))}
          </div>
        )}

        <div
          key={product.id}
          style={{
            transform: dragOffset !== 0 ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.025}deg)` : undefined,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={cn(
            'flex flex-1 flex-col overflow-hidden',
            animDir === 'next' && 'animate-slide-next',
            animDir === 'prev' && 'animate-slide-prev'
          )}
        >
          <div className="relative aspect-[5/4] shrink-0 overflow-hidden bg-smoke sm:aspect-[16/11]">
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                'h-full w-full object-cover transition-all duration-[1200ms] ease-smooth',
                visible ? 'scale-100 blur-0' : 'scale-110 blur-md'
              )}
            />

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-cream backdrop-blur transition hover:bg-black/75 active-haptic"
              aria-label="Cerrar detalle"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                {product.badge && (
                  <span className="mb-2 inline-block rounded-full bg-gradient-to-b from-cheese-light to-cheese px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-charcoal">
                    {product.badge}
                  </span>
                )}
                <h2
                  id="product-modal-title"
                  className="display-title text-3xl tracking-[0.04em] text-cream sm:text-4xl"
                >
                  {product.name}
                </h2>
              </div>
              <span className="price-tag shrink-0 text-2xl">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-base leading-relaxed text-cream-muted">{product.description}</p>

            {product.category === 'combos' && (
              <div className="inline-flex items-center gap-2 rounded-xl border border-cheese/40 bg-cheese/10 px-3.5 py-2 text-xs font-bold text-cheese-light backdrop-blur">
                <span className="text-base">🍟🥤</span>
                <span>Incluye porción de papas fritas + bebida a elección</span>
              </div>
            )}

            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-cream transition hover:bg-white/10 active-haptic"
                  aria-label="Menos"
                >
                  −
                </button>
                <span className="w-8 text-center font-extrabold text-cream" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-cream transition hover:bg-white/10 active-haptic"
                  aria-label="Más"
                >
                  +
                </button>
              </div>

              <button type="button" onClick={handleAdd} className="btn-primary min-h-12 flex-1 !px-4 active-haptic">
                Agregar · {formatPrice(product.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
