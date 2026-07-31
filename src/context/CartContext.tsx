import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { isStandaloneExtra, type Product } from '../data/products';

export interface CartExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedExtras?: CartExtra[];
}

export interface LastAdded {
  product: Product;
  quantity: number;
  subtotal: number;
  selectedExtras?: CartExtra[];
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedExtras?: CartExtra[]) => boolean;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  attachExtraToItem: (itemId: string, extra: CartExtra) => void;
  totalItems: number;
  subtotal: number;
  justAdded: boolean;
  lastAdded: LastAdded | null;
  warningNotice: string | null;
  clearWarning: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function getItemPrice(item: CartItem): number {
  const extrasCost = item.selectedExtras?.reduce((sum, e) => sum + e.price, 0) ?? 0;
  return item.product.price + extrasCost;
}

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
  const [warningNotice, setWarningNotice] = useState<string | null>(null);
  const addTimer = useRef<number | undefined>(undefined);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);
  const clearWarning = useCallback(() => setWarningNotice(null), []);

  const attachExtraToItem = useCallback((itemId: string, extra: CartExtra) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const currentExtras = item.selectedExtras ?? [];
          const hasExtra = currentExtras.some((e) => e.id === extra.id);
          const nextExtras = hasExtra ? currentExtras : [...currentExtras, extra];
          return { ...item, selectedExtras: nextExtras };
        }
        return item;
      })
    );
    setWarningNotice(null);
    setJustAdded(true);
    window.clearTimeout(addTimer.current);
    addTimer.current = window.setTimeout(() => setJustAdded(false), 2800);
  }, []);

  const addItem = useCallback((product: Product, quantity = 1, selectedExtras: CartExtra[] = []) => {
    // Rule: Ingredient extras (non-standalone) cannot be bought alone without a burger or combo in the cart
    const isIngredientExtra = product.category === 'extras' && !isStandaloneExtra(product.id);

    if (isIngredientExtra) {
      const hasMainItem = items.some(
        (i) => i.product.category === 'hamburguesas' || i.product.category === 'combos'
      );
      if (!hasMainItem) {
        setWarningNotice(
          'Los agregados (cheddar, bacon, huevo, etc.) son para sumar a tu burger o combo. Seleccioná primero una hamburguesa.'
        );
        window.clearTimeout(addTimer.current);
        addTimer.current = window.setTimeout(() => setWarningNotice(null), 4000);
        return false;
      }
    }

    setItems((prev) => {
      // Unique key based on product id and sorted selected extras
      const extrasKey = selectedExtras.map((e) => e.id).sort().join('-');
      const itemId = `${product.id}${extrasKey ? `-${extrasKey}` : ''}`;

      const existing = prev.find((i) => i.id === itemId);
      const next = existing
        ? prev.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...prev, { id: itemId, product, quantity, selectedExtras }];

      setLastAdded({
        product,
        quantity,
        selectedExtras,
        subtotal: next.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0),
      });
      return cleanCartItems(next);
    });

    setWarningNotice(null);
    setJustAdded(true);
    window.clearTimeout(addTimer.current);
    addTimer.current = window.setTimeout(() => setJustAdded(false), 2800);
    return true;
  }, [items]);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => cleanCartItems(prev.filter((i) => i.id !== itemId)));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return cleanCartItems(prev.filter((i) => i.id !== itemId));
      }
      return cleanCartItems(
        prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
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
    () => items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0),
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
      attachExtraToItem,
      totalItems,
      subtotal,
      justAdded,
      lastAdded,
      warningNotice,
      clearWarning,
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
      attachExtraToItem,
      totalItems,
      subtotal,
      justAdded,
      lastAdded,
      warningNotice,
      clearWarning,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
