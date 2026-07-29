import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice, getProductById } from '../data/products';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { PapasPromoCard } from './PapasPromoCard';
import { cn } from '../utils/cn';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
  } = useCart();
  const [name, setName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMsg('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!items.length) return;

    if (!name.trim()) {
      setErrorMsg('Por favor ingresá tu Nombre para continuar.');
      if (nameInputRef.current) {
        nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameInputRef.current.focus();
      }
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setErrorMsg('Por favor ingresá tu Dirección de envío.');
      if (addressInputRef.current) {
        addressInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        addressInputRef.current.focus();
      }
      return;
    }

    setErrorMsg('');
    openWhatsAppOrder({ items, subtotal, name, deliveryType, address, notes });
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/75 backdrop-blur-md animate-fade-in"
        aria-label="Cerrar carrito"
        onClick={closeCart}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 flex max-h-[92dvh] flex-col rounded-t-[1.75rem] border border-white/10 bg-surface shadow-[0_0_80px_-10px_rgba(0,0,0,0.9)] animate-drawer-up sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:rounded-l-[1.75rem] sm:animate-drawer-slide">
        <div className="absolute left-1/2 top-2.5 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20 sm:hidden" />
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 pb-4 pt-6 sm:pt-4">
          <div>
            <p className="section-kicker text-[10px]">Tu pedido</p>
            <h2 id="cart-title" className="display-title mt-1 text-2xl tracking-wide text-cream">
              {totalItems > 0
                ? `${totalItems} producto${totalItems === 1 ? '' : 's'}`
                : 'Carrito vacío'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cream transition hover:bg-white/10"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {(() => {
            const displayItems = items.filter((i) => i.product.id !== 'extra-papas-burger');
            const papasItem = items.find((i) => i.product.id === 'extra-papas-burger');
            let papasAvailable = papasItem ? papasItem.quantity : 0;
            const papasProduct = getProductById('extra-papas-burger');

            if (displayItems.length === 0) {
              return (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
                  <img src="/empty-cart.svg" alt="" className="mb-4 h-24 w-auto opacity-90 drop-shadow-md" />
                  <p className="display-title text-2xl tracking-wide text-cream">Todavía no hay nada</p>
                  <p className="mt-2 max-w-[230px] text-sm text-cream-muted">
                    Elegí tu smash y armá el pedido en segundos.
                  </p>
                  <button type="button" onClick={closeCart} className="btn-primary mt-6 !min-h-11 !px-6">
                    Ver menú
                  </button>
                </div>
              );
            }

            return (
              <ul className="space-y-3">
                {displayItems.map((item) => {
                  const isBurger = item.product.category === 'hamburguesas';
                  let burgerPapasCount = 0;

                  if (isBurger && papasAvailable > 0) {
                    burgerPapasCount = Math.min(item.quantity, papasAvailable);
                    papasAvailable -= burgerPapasCount;
                  }

                  const unitBasePrice = item.product.price;
                  const itemTotalPrice = (unitBasePrice * item.quantity) + (burgerPapasCount * 70);

                  const handleAddBurgerPapas = () => {
                    if (papasProduct) {
                      addItem(papasProduct, 1);
                    }
                  };

                  const handleRemoveBurgerPapas = () => {
                    if (papasItem) {
                      updateQuantity('extra-papas-burger', papasItem.quantity - 1);
                    }
                  };

                  return (
                    <li
                      key={item.product.id}
                      className={cn(
                        'flex flex-col gap-3 rounded-2xl border p-3.5 transition-all',
                        burgerPapasCount > 0
                          ? 'border-cheese/60 bg-gradient-to-b from-surface via-surface to-cheese/10 shadow-md'
                          : 'border-white/[0.07] bg-white/[0.03]'
                      )}
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt=""
                          className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="display-title text-lg leading-none tracking-wide text-cream">
                                {item.product.name}
                              </p>
                              {burgerPapasCount > 0 && (
                                <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-cheese/20 px-2 py-0.5 text-[9px] font-black uppercase text-cheese-light border border-cheese/40">
                                  🍟 Con Papas +$70
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="text-cream/35 transition hover:text-cream"
                              aria-label={`Eliminar ${item.product.name}`}
                            >
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 7h14M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7l1 12h6l1-12" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-1.5 flex items-baseline gap-2">
                            <span className="text-base font-extrabold text-cheese">
                              {formatPrice(itemTotalPrice)}
                            </span>
                            {burgerPapasCount > 0 && (
                              <span className="text-[11px] font-semibold text-cream/40 line-through">
                                {formatPrice(unitBasePrice * item.quantity)}
                              </span>
                            )}
                          </div>

                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-white/10 bg-black/35">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center text-cream hover:bg-white/[0.04] transition rounded-l-full"
                                aria-label="Restar"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-xs font-extrabold text-cream">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center text-cream hover:bg-white/[0.04] transition rounded-r-full"
                                aria-label="Sumar"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {isBurger && burgerPapasCount > 0 && (
                        <div className="flex items-center justify-between rounded-xl border border-cheese/80 bg-gradient-to-r from-cheese-light via-cheese to-ember px-3 py-2 text-charcoal shadow-md">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold">
                            <span>🍟</span>
                            <span>Porción de Papas ($70) incluida</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveBurgerPapas}
                            className="rounded-lg bg-charcoal px-2 py-1 text-[10px] font-black text-cheese-light hover:bg-black transition active:scale-95"
                          >
                            Quitar papas
                          </button>
                        </div>
                      )}

                      {isBurger && burgerPapasCount < item.quantity && (
                        <button
                          type="button"
                          onClick={handleAddBurgerPapas}
                          className="flex items-center justify-between rounded-xl border border-cheese/40 bg-cheese/10 px-3 py-2 text-xs font-bold text-cheese-light hover:bg-cheese/20 transition active:scale-98"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>🍟</span>
                            <span>¿Sumar papas a esta burger?</span>
                          </span>
                          <span className="font-black text-cheese-light bg-charcoal/80 px-2 py-0.5 rounded text-[10px]">
                            +$70
                          </span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          })()}

          {items.length > 0 && (
            <div className="mt-5 space-y-3.5">
              <PapasPromoCard variant="compact" />

              {/* Delivery vs Pickup Selector */}
              <div>
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-cream/50">
                  Modalidad de entrega
                </span>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all active-haptic',
                      deliveryType === 'delivery'
                        ? 'bg-cheese text-charcoal font-black shadow-md'
                        : 'text-cream/70 hover:text-cream'
                    )}
                  >
                    <span>🛵 Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all active-haptic',
                      deliveryType === 'pickup'
                        ? 'bg-cheese text-charcoal font-black shadow-md'
                        : 'text-cream/70 hover:text-cream'
                    )}
                  >
                    <span>📍 Retiro en local</span>
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <label className="block">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cream/50">
                    Tu Nombre <span className="text-cheese-light">*</span>
                  </span>
                  {errorMsg && !name.trim() && (
                    <span className="text-[10px] font-extrabold text-red-400">Requerido</span>
                  )}
                </div>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="¿A nombre de quién va el pedido?"
                  className={cn(
                    'w-full rounded-xl border bg-black/35 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:ring-2',
                    errorMsg && !name.trim()
                      ? 'border-red-500 ring-2 ring-red-500/40 bg-red-500/10'
                      : 'border-white/10 focus:border-cheese/50 focus:ring-cheese/30'
                  )}
                />
              </label>

              {/* Address or Pickup info */}
              {deliveryType === 'delivery' ? (
                <label className="block">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cream/50">
                      Dirección de envío <span className="text-cheese-light">*</span>
                    </span>
                    {errorMsg && !address.trim() && (
                      <span className="text-[10px] font-extrabold text-red-400">Requerido</span>
                    )}
                  </div>
                  <input
                    ref={addressInputRef}
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Calle, número, piso/depto..."
                    className={cn(
                      'w-full rounded-xl border bg-black/35 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:ring-2',
                      errorMsg && !address.trim()
                        ? 'border-red-500 ring-2 ring-red-500/40 bg-red-500/10'
                        : 'border-white/10 focus:border-cheese/50 focus:ring-cheese/30'
                    )}
                  />
                </label>
              ) : (
                <div className="rounded-xl border border-cheese/30 bg-cheese/10 p-3 text-xs font-semibold text-cheese-light">
                  📍 Retirás en el local de J Burger (Jueves a Domingo de 20:00 a 00:00 hs)
                </div>
              )}

              {/* Notes Input */}
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-cream/50">
                  Notas / Aclaraciones (opcional)
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sin cebolla, punto de la carne, etc."
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/35 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-cheese/50 focus:ring-2 focus:ring-cheese/30"
                />
              </label>

              <div className="rounded-2xl border border-white/[0.07] bg-black/30 p-3.5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cream/45">
                  Medios de pago
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Efectivo', 'Débito', 'Transferencia'].map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-white/[0.04] px-3 py-1 text-xs font-semibold text-cream/75 ring-1 ring-white/10"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/[0.07] bg-gradient-to-t from-black/40 to-transparent p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {errorMsg && (
              <div className="mb-3 flex items-center gap-2 rounded-xl border border-red-500/60 bg-red-500/20 px-3.5 py-2.5 text-xs font-extrabold text-red-200 shadow-md">
                <span className="text-base shrink-0">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}
            <div className="mb-3 flex items-end justify-between">
              <span className="text-sm font-bold uppercase tracking-wide text-cream/50">
                Subtotal
              </span>
              <span className="display-title text-3xl tracking-wide text-cream">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleSend}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition hover:brightness-110 active-haptic"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Enviar pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return <img src="/icon-whatsapp.svg" alt="" className={cn('h-5 w-5', className)} />;
}
