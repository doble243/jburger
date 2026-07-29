import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LastAdded {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  justAdded: boolean;
  lastAdded: LastAdded | null;
}

const CartContext = createContext<CartContextValue | null>(null);

function cleanCartItems(list: CartItem[]): CartItem[] {
  const burgerCount = list
    .filter((i) => i.product.category === 'hamburguesas')
    .reduce((sum, i) => sum + i.quantity, 0);

  if (burgerCount === 0) {
    return list.filter((i) => i.product.id !== 'extra-papas-burger');
  }

  return list
    .map((i) => {
      if (i.product.id === 'extra-papas-burger') {
        return { ...i, quantity: Math.min(i.quantity, burgerCount) };
      }
      return i;
    })
    .filter((i) => i.quantity > 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);
  const addTimer = useRef<number | undefined>(undefined);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const next = existing
        ? prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...prev, { product, quantity }];

      setLastAdded({
        product,
        quantity,
        subtotal: next.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      });
      return cleanCartItems(next);
    });
    setJustAdded(true);
    window.clearTimeout(addTimer.current);
    addTimer.current = window.setTimeout(() => setJustAdded(false), 2600);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => cleanCartItems(prev.filter((i) => i.product.id !== productId)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return cleanCartItems(prev.filter((i) => i.product.id !== productId));
      }
      return cleanCartItems(
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () =>
      items
        .filter((i) => i.product.id !== 'extra-papas-burger')
        .reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      justAdded,
      lastAdded,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      justAdded,
      lastAdded,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
