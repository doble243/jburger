import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { cn } from '../utils/cn';

export function BottomNavBar() {
  const { totalItems, subtotal, openCart, isOpen, justAdded } = useCart();
  const [activeTab, setActiveTab] = useState<'top' | 'menu' | 'info'>('top');

  useEffect(() => {
    const handleScroll = () => {
      const menuEl = document.getElementById('menu');
      const infoEl = document.getElementById('info');
      const scrollY = window.scrollY;

      if (infoEl && scrollY >= infoEl.offsetTop - 250) {
        setActiveTab('info');
      } else if (menuEl && scrollY >= menuEl.offsetTop - 250) {
        setActiveTab('menu');
      } else {
        setActiveTab('top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isOpen) return null;

  const scrollToSection = (id: 'top' | 'menu' | 'info') => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-md rounded-full border border-white/20 bg-charcoal/90 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl ring-1 ring-white/10 flex items-center justify-between gap-1">
        {/* 1. Inicio */}
        <button
          type="button"
          onClick={() => scrollToSection('top')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-full active-haptic transition-all duration-300',
            activeTab === 'top'
              ? 'bg-white/15 text-cheese-light shadow-sm font-extrabold'
              : 'text-cream/90 hover:text-cheese-light hover:bg-white/[0.06]'
          )}
        >
          <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">Inicio</span>
        </button>

        {/* 2. Menú */}
        <button
          type="button"
          onClick={() => scrollToSection('menu')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-full active-haptic transition-all duration-300',
            activeTab === 'menu'
              ? 'bg-white/15 text-cheese-light shadow-sm font-extrabold'
              : 'text-cream/90 hover:text-cheese-light hover:bg-white/[0.06]'
          )}
        >
          <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">Menú</span>
        </button>

        {/* 3. Carrito */}
        <button
          type="button"
          onClick={openCart}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full active-haptic transition-all duration-300 relative',
            totalItems > 0
              ? 'bg-gradient-to-r from-cheese-light to-cheese text-charcoal shadow-md font-black'
              : 'text-cream/90 hover:text-cheese-light hover:bg-white/[0.06]',
            justAdded && 'animate-cart-pop'
          )}
        >
          <div className="relative flex items-center justify-center">
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal text-[9px] font-black text-cheese-light ring-1 ring-cheese">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
            {totalItems > 0 ? formatPrice(subtotal) : 'Carrito'}
          </span>
        </button>

        {/* 4. Info */}
        <button
          type="button"
          onClick={() => scrollToSection('info')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-full active-haptic transition-all duration-300',
            activeTab === 'info'
              ? 'bg-white/15 text-cheese-light shadow-sm font-extrabold'
              : 'text-cream/90 hover:text-cheese-light hover:bg-white/[0.06]'
          )}
        >
          <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">Info</span>
        </button>
      </div>
    </div>
  );
}
