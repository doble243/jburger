import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { cn } from '../utils/cn';

export function MobileCartBar() {
  const { totalItems, subtotal, openCart, isOpen, justAdded } = useCart();

  if (totalItems === 0 || isOpen) return null;

  return (
    <div className="animate-slide-up fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={openCart}
        className={cn(
          'flex w-full items-center justify-between rounded-2xl bg-gradient-to-b from-cheese-light to-cheese px-5 py-3.5 text-charcoal shadow-[0_16px_40px_-8px_rgba(240,160,32,0.55)] transition active:scale-[0.98]',
          justAdded && 'animate-cart-pop'
        )}
      >
        <span className="flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-wide">
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-charcoal text-xs text-cheese shadow-inner">
            {totalItems}
          </span>
          Ver pedido
        </span>
        <span className="display-title text-2xl leading-none tracking-wide">
          {formatPrice(subtotal)}
        </span>
      </button>
    </div>
  );
}
