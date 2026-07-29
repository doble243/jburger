import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import { cn } from '../utils/cn';

interface PapasPromoCardProps {
  variant?: 'banner' | 'compact';
  className?: string;
}

export function PapasPromoCard({ variant = 'banner', className }: PapasPromoCardProps) {
  const { items, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const papasProduct = getProductById('extra-papas-burger');

  // Cantidad total de burgers individuales en el carrito (excluye combos que ya traen papas y extras)
  const totalBurgers = items.reduce((acc, item) => {
    if (item.product.category === 'hamburguesas') {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  // Cantidad de papas promo agregadas actualmente
  const papasInCart = items.reduce((acc, item) => {
    if (item.product.id === 'extra-papas-burger') {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  // Papas pendientes (máximo 1 por cada burger)
  const papasNeeded = Math.max(0, totalBurgers - papasInCart);

  // Ocultar la promo si no hay burgers en el carrito o si todas las burgers ya tienen su porción de papas
  if (totalBurgers === 0 || papasNeeded === 0) {
    return null;
  }

  const handleAdd = () => {
    if (papasProduct && papasNeeded > 0) {
      addItem(papasProduct, papasNeeded);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2200);
    }
  };

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border-2 border-cheese/80 bg-gradient-to-br from-[#ffd56b] via-[#f0a020] to-[#d97706] p-3.5 text-charcoal shadow-lg transition-all duration-300',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-charcoal/20 bg-charcoal/10 shadow-inner">
            <img
              src="/images/fritas-porcion.webp"
              alt="Papas fritas"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0.5 right-0.5 rounded bg-charcoal px-1 py-0.2 text-[8px] font-black text-cheese-light">
              +$70
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-charcoal px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-cheese-light">
                🔥 Promo papas
              </span>
            </div>
            <p className="display-title mt-0.5 text-base leading-none text-charcoal">
              Sumá papas por $70 c/u
            </p>
            <p className="text-[11px] font-semibold text-charcoal/80 leading-tight">
              {papasNeeded > 1 ? `1 porción para cada una de tus ${papasNeeded} burgers faltantes` : 'Porción crocante recién hecha'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black transition-all shadow active:scale-95 ${
              justAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-charcoal text-cheese-light hover:bg-black'
            }`}
          >
            {justAdded ? '✓ Sumadas' : papasNeeded > 1 ? `+ ${papasNeeded} ($${70 * papasNeeded})` : '+ $70'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-3xl border-2 border-cheese/80 bg-gradient-to-br from-[#ffda7a] via-[#f0a020] to-[#d97706] p-6 text-charcoal shadow-[0_20px_50px_-12px_rgba(240,160,32,0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-8px_rgba(240,160,32,0.8)]',
        className
      )}
    >
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/25 blur-2xl pointer-events-none" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-2xl border-2 border-charcoal/20 bg-charcoal/10 shadow-xl">
            <img
              src="/images/fritas-porcion.webp"
              alt="Porción de papas fritas crocantes"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute bottom-1 right-1 rounded-md bg-charcoal px-1.5 py-0.5 text-xs font-black text-cheese-light shadow">
              +$70 c/u
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="rounded-md bg-charcoal px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-cheese-light shadow">
                PROMO IMPERDIBLE
              </span>
              <span className="text-xs font-black uppercase tracking-wide text-charcoal/85">
                ¡Sumás papas a cada burger del carrito!
              </span>
            </div>
            <h3 className="display-title text-2xl sm:text-3xl leading-none text-charcoal">
              ¿Le sumás papas a cada burger por $70?
            </h3>
            <p className="mt-1 text-xs sm:text-sm font-bold text-charcoal/85">
              {papasNeeded > 1
                ? `Al hacer clic se agregará 1 porción de papas para cada una de tus ${papasNeeded} burgers.`
                : 'Porción de papas fritas doradas y crocantes al momento.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black transition-all shadow-xl active:scale-95 ${
            justAdded
              ? 'bg-emerald-800 text-white scale-105'
              : 'bg-charcoal text-cheese-light hover:bg-black hover:scale-105'
          }`}
        >
          {justAdded ? (
            <>
              <svg className="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>¡Papas agregadas a tu pedido!</span>
            </>
          ) : (
            <>
              <span>
                {papasNeeded > 1
                  ? `+ Sumar papas a tus ${papasNeeded} burgers ($${70 * papasNeeded})`
                  : '+ Sumar papas por $70'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
