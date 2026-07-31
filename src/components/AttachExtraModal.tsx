import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

interface AttachExtraModalProps {
  product: Product | null;
  onClose: () => void;
}

export function AttachExtraModal({ product, onClose }: AttachExtraModalProps) {
  const { items, attachExtraToItem } = useCart();

  if (!product) return null;

  const mainItems = items.filter(
    (i) => i.product.category === 'hamburguesas' || i.product.category === 'combos'
  );

  const handleSelect = (itemId: string) => {
    attachExtraToItem(itemId, {
      id: product.id,
      name: product.name,
      price: product.price,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-end justify-center p-3 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="attach-extra-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        aria-label="Cerrar"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-white/15 bg-surface p-5 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] animate-drawer-up">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={product.image}
              alt=""
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/15 shrink-0"
            />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cheese-light">
                Sumar agregado (+{formatPrice(product.price)})
              </span>
              <h3 id="attach-extra-title" className="display-title text-xl text-cream leading-tight">
                {product.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 shrink-0"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-cream-muted mb-4">
          ¿A cuál de las hamburguesas o combos de tu carrito querés sumarle este extra?
        </p>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {mainItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-3 text-left transition hover:border-cheese hover:bg-cheese/10 active-haptic group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.product.image}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10 shrink-0"
                />
                <div className="min-w-0">
                  <p className="display-title text-base text-cream leading-none truncate group-hover:text-cheese-light">
                    {item.product.name}
                  </p>
                  {item.selectedExtras && item.selectedExtras.length > 0 && (
                    <p className="text-[10px] text-cream/50 truncate mt-0.5">
                      Actual: {item.selectedExtras.map((e) => e.name).join(', ')}
                    </p>
                  )}
                </div>
              </div>
              <span className="rounded-full bg-cheese px-3 py-1 text-xs font-black uppercase text-charcoal shrink-0">
                Sumar acá
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
