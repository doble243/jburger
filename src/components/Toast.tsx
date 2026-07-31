import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice, getProductById } from '../data/products';

export function Toast() {
  const { lastAdded, justAdded, openCart, isOpen, addItem, warningNotice, clearWarning } = useCart();
  const [papasAdded, setPapasAdded] = useState(false);

  if (warningNotice && !isOpen) {
    return (
      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-3 sm:px-4 md:bottom-8"
        role="status"
        aria-live="polite"
      >
        <div className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-charcoal/95 p-3.5 sm:px-5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-amber-500/20 max-w-md">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-xs font-bold leading-tight text-amber-200">{warningNotice}</p>
          <button
            type="button"
            onClick={clearWarning}
            className="ml-auto text-cream/40 hover:text-cream text-xs font-black p-1"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  if (!justAdded || !lastAdded || isOpen) return null;

  const isBurger = lastAdded.product.category === 'hamburguesas';
  const papasProduct = getProductById('extra-papas-burger');

  const handleAddPapas = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (papasProduct) {
      addItem(papasProduct, 1);
      setPapasAdded(true);
      setTimeout(() => setPapasAdded(false), 2400);
    }
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-3 sm:px-4 md:bottom-8"
      role="status"
      aria-live="polite"
    >
      <div className="animate-toast-in pointer-events-auto flex flex-col sm:flex-row items-center gap-2.5 rounded-2xl border border-white/15 bg-charcoal/95 p-2.5 sm:px-4 sm:py-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={openCart}
          className="flex items-center gap-3 text-left transition hover:opacity-90"
        >
          <span className="relative shrink-0">
            <img
              src={lastAdded.product.image}
              alt=""
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover ring-1 ring-white/15"
            />
            <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-to-b from-cheese-light to-cheese text-[10px] font-black text-charcoal shadow">
              ✓
            </span>
          </span>
          <div>
            <span className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-cheese-light">
              Agregado al carrito
            </span>
            <span className="display-title block text-base sm:text-lg leading-none tracking-wide text-cream">
              {lastAdded.product.name}
            </span>
          </div>
        </button>

        {isBurger && (
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-white/12 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={handleAddPapas}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition-all shadow active:scale-95 ${
                papasAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-b from-cheese-light to-cheese text-charcoal hover:brightness-110'
              }`}
            >
              {papasAdded ? '✓ Papas sumadas 🍟' : '+ Sumar papas $70'}
            </button>
            <button
              type="button"
              onClick={openCart}
              className="text-[11px] font-extrabold uppercase tracking-wide text-cream/70 hover:text-cream underline decoration-cream/30 underline-offset-2"
            >
              Ver carrito
            </button>
          </div>
        )}

        {!isBurger && (
          <button
            type="button"
            onClick={openCart}
            className="ml-auto shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-cream hover:bg-white/15 ring-1 ring-white/10"
          >
            Ver · {formatPrice(lastAdded.subtotal)}
          </button>
        )}
      </div>
    </div>
  );
}
