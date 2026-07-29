import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { useCart } from '../context/CartContext';
import { openWhatsAppSimple } from '../utils/whatsapp';
import { getStoreStatus } from '../utils/storeStatus';

const bannerMessages = [
  '🔥 PAPAS A TU BURGER POR SOLO $70',
  '🛵 DELIVERY SIN CARGO EN TU ZONA',
  '🕒 ABIERTO JUEVES A DOMINGO 20:00 A 00:00',
  '🍔 SMASH BURGERS RECIÉN HECHAS A LA PLANCHA',
];

export function Header() {
  const { totalItems, openCart, justAdded } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % bannerMessages.length);
        setFadeState('in');
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top Banner rotativo con efecto fade */}
      <div className="bg-gradient-to-r from-cheese-light via-cheese to-ember px-3 py-1.5 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-charcoal shadow-md flex items-center justify-center min-h-[30px] overflow-hidden">
        <span
          className={cn(
            'transition-all duration-300 ease-in-out inline-block',
            fadeState === 'in'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-1.5 scale-95'
          )}
        >
          {bannerMessages[msgIndex]}
        </span>
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'border-b border-white/[0.08] bg-charcoal/90 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
            : 'bg-gradient-to-b from-charcoal via-charcoal/90 to-transparent'
        )}
      >
        <div className="mx-auto flex h-[4rem] max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
          <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="J Burger inicio">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-cheese/20 opacity-0 blur-md transition group-hover:opacity-100" />
              <img
                src="/images/logo-jburger.png"
                alt="J Burger"
                className="relative h-11 w-11 object-contain drop-shadow-lg sm:h-12 sm:w-12"
                width={48}
                height={48}
              />
            </span>
            <span className="leading-none">
              <span className="display-title block text-xl tracking-[0.08em] text-cream">
                J Burger
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-cheese-light">
                Smash Burgers
              </span>
            </span>
          </a>

          {(() => {
            const status = getStoreStatus();
            return (
              <div className="hidden sm:flex items-center gap-2 ml-4">
                <span className="relative flex h-2 w-2">
                  <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', status.isOpen ? 'bg-emerald-400' : 'bg-cheese')} />
                  <span className={cn('relative inline-flex h-2 w-2 rounded-full', status.isOpen ? 'bg-emerald-500' : 'bg-cheese')} />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-cream/80">
                  {status.label}
                </span>
              </div>
            );
          })()}

          <div className="ml-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openWhatsAppSimple()}
              className="btn-primary hidden !min-h-10 !px-4 !text-xs sm:inline-flex"
            >
              Pedir por WhatsApp
            </button>

            <button
              id="cart-button"
              type="button"
              onClick={openCart}
              aria-label={`Carrito, ${totalItems} productos`}
              className={cn(
                'relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-black/40 text-cream active-haptic transition-all duration-300 ease-spring hover:scale-110 hover:border-cheese hover:shadow-[0_0_20px_rgba(240,160,32,0.6)]',
                totalItems > 0 && 'border-cheese/80 animate-cart-glow text-cheese-light',
                justAdded && 'animate-cart-pop border-cheese bg-cheese/20'
              )}
            >
              <span id="cart-anchor" className="absolute inset-0 rounded-full" aria-hidden="true" />
              <span className="absolute -inset-1 rounded-full bg-cheese/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              {justAdded && (
                <span
                  aria-hidden="true"
                  className="animate-ring-ping absolute inset-0 rounded-full border-2 border-cheese"
                />
              )}
              <CartIcon
                className={cn(
                  'h-5 w-5 transition-transform duration-500 ease-spring',
                  totalItems > 0 ? 'text-cheese-light scale-105' : 'text-cream',
                  justAdded && 'scale-125 rotate-6 text-cheese-light'
                )}
              />
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="animate-spring-pop absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-b from-cheese-light via-cheese to-ember px-1 text-[11px] font-black text-charcoal shadow-[0_4px_12px_rgba(240,160,32,0.6)] ring-2 ring-charcoal"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h1.5l1.2 9.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" />
      <circle cx="16.5" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}
