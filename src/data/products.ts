export type ProductCategory = 'hamburguesas' | 'combos' | 'extras';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
  stars?: number;
  badge?: string;
}

/** Catálogo local listo para migrar a base de datos */
export const products: Product[] = [
  {
    id: 'simple',
    name: 'Simple',
    description: '1 carne smash, cheddar, mayonesa, ketchup.',
    price: 260,
    category: 'hamburguesas',
    image: 'https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/simple-smash.webp',
    available: true,
    stars: 1,
  },
  {
    id: 'doble-classic',
    name: 'Doble Classic',
    description: 'Doble carne smash, cheddar, bacon, aros de cebolla.',
    price: 320,
    category: 'hamburguesas',
    image: '/images/doble-smash.webp',
    available: true,
    stars: 2,
    badge: 'Clásica',
  },
  {
    id: 'triple',
    name: 'Triple',
    description: 'Triple carne smash, cheddar x3, bacon, huevo a la plancha y salsa J.',
    price: 420,
    category: 'hamburguesas',
    image: '/images/triple-smash.webp',
    available: true,
    stars: 3,
  },
  {
    id: 'j-cuadruple',
    name: 'J Cuádruple',
    description: '4 carnes smash, cheddar, jamón, muzza, cebolla colorada y huevo a la plancha.',
    price: 470,
    category: 'hamburguesas',
    image: '/images/j-cuadruple.webp',
    available: true,
    stars: 4,
  },
  {
    id: 'the-j-2',
    name: 'The J 2.0',
    description: '4 carnes smash, cheddar x4, bacon, aros de cebolla y salsa J.',
    price: 520,
    category: 'hamburguesas',
    image: '/images/the-j-2-0.webp',
    available: true,
    stars: 5,
    badge: 'La más pedida',
  },
  {
    id: 'combo-doble',
    name: 'Combo Doble Classic',
    description: 'Doble Classic + papas + bebida.',
    price: 415,
    category: 'combos',
    image: '/images/doble-smash.webp',
    available: true,
    badge: 'Combo',
  },
  {
    id: 'combo-triple',
    name: 'Combo Triple',
    description: 'Triple + papas + bebida.',
    price: 505,
    category: 'combos',
    image: '/images/triple-smash.webp',
    available: true,
    badge: 'Combo',
  },
  {
    id: 'combo-cuadruple',
    name: 'Combo Cuádruple',
    description: 'Cuádruple + papas + bebida.',
    price: 560,
    category: 'combos',
    image: '/images/j-cuadruple.webp',
    available: true,
    badge: 'Combo',
  },
  {
    id: 'extra-papas-burger',
    name: 'Sumale papas a tu hamburguesa',
    description: 'Porción de papas para acompañar tu burger.',
    price: 70,
    category: 'extras',
    image: '/images/fritas-porcion.webp',
    available: true,
  },
  {
    id: 'extra-papas-cheddar-bacon',
    name: 'Papas con cheddar y bacon',
    description: 'Fritas crocantes con cheddar fundido y bacon.',
    price: 210,
    category: 'extras',
    image: '/images/papas-cheddar-bacon.webp',
    available: true,
  },
  {
    id: 'extra-fritas',
    name: 'Porción de fritas',
    description: 'Papas fritas crocantes, porción generosa.',
    price: 110,
    category: 'extras',
    image: '/images/fritas-porcion.webp',
    available: true,
  },
  {
    id: 'extra-fritas-cheddar',
    name: 'Fritas con cheddar',
    description: 'Fritas bañadas en cheddar fundido.',
    price: 170,
    category: 'extras',
    image: '/images/fritas-cheddar.webp',
    available: true,
  },
];

export const WHATSAPP_NUMBER = '59899567139';
export const WHATSAPP_DISPLAY = '099 567 139';
export const INSTAGRAM_HANDLE = '@Jburger.uy';
export const INSTAGRAM_URL = 'https://www.instagram.com/Jburger.uy';
export const SCHEDULE = 'Jueves a domingo · 20:00 a 00:00';

export const categoryLabels: Record<ProductCategory, string> = {
  hamburguesas: 'Hamburguesas',
  combos: 'Combos',
  extras: 'Extras',
};

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category && p.available);
}
