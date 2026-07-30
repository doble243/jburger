import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import type { Product, ProductCategory } from './data/products';
import { Header } from './components/Header';
import { Benefits } from './components/Benefits';
import { MenuSection } from './components/MenuSection';
import { CombosBanner } from './components/CombosBanner';
import { CartDrawer } from './components/CartDrawer';
import { BottomNavBar } from './components/BottomNavBar';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { InstagramStrip } from './components/InstagramStrip';
import { ProductModal } from './components/ProductModal';
import { Toast } from './components/Toast';

export default function App() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuCategory, setMenuCategory] = useState<ProductCategory>('hamburguesas');

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent<ProductCategory>).detail;
      if (cat) setMenuCategory(cat);
    };
    window.addEventListener('jburger:category', handler);
    return () => window.removeEventListener('jburger:category', handler);
  }, []);

  return (
    <CartProvider>
      <div
        className="page-shell grain min-h-dvh text-cream antialiased pb-16 relative"
      >
        <div className="relative z-[2]">
          <Header />
          <main>
            <MenuSection
              onOpenProduct={setSelected}
              category={menuCategory}
              onCategoryChange={setMenuCategory}
            />
            <Benefits />
            <CombosBanner />
            <InstagramStrip />
          </main>
          <Footer />
          <CartDrawer />
          <BottomNavBar />
          <WhatsAppWidget />
          <Toast />
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onSelectProduct={setSelected}
          />
        </div>
      </div>
    </CartProvider>
  );
}
