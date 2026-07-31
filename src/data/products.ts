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
  // HAMBURGUESAS
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
    id: 'garlic-deluxe',
    name: 'Garlic Deluxe',
    description: 'Doble carne smash, cheddar, panceta crocante y nuestra mayonesa alioli especial.',
    price: 360,
    category: 'hamburguesas',
    image: '/images/garlic-deluxe.jpg',
    available: true,
    stars: 5,
    badge: 'Nueva',
  },
  {
    id: 'bbq-deluxe',
    name: 'BBQ Deluxe',
    description: 'Doble carne smash, cheddar, panceta, pepinillos y salsa BBQ artesanal.',
    price: 360,
    category: 'hamburguesas',
    image: '/images/bbq-deluxe.jpg',
    available: true,
    stars: 5,
    badge: 'Nueva',
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

  // COMBOS & PROMOS
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

  // PROMOS PARA 2
  {
    id: 'promo-dos-doble',
    name: 'Promo Para 2 · 2 Doble Classic',
    description: '2 Doble Classic + porciones de papas fritas.',
    price: 650,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Promo 2',
  },
  {
    id: 'promo-dos-triple',
    name: 'Promo Para 2 · 2 Triple',
    description: '2 Triple Smash + porciones de papas fritas.',
    price: 850,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Promo 2',
  },
  {
    id: 'promo-dos-cuadruple',
    name: 'Promo Para 2 · 2 Cuádruple',
    description: '2 Cuádruple Smash + porciones de papas fritas.',
    price: 950,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Promo 2',
  },

  // COMBOS PARA 3
  {
    id: 'combo-tres-doble',
    name: 'Combo Para 3 · 3 Doble Classic',
    description: '3 Doble Classic + porciones de papas fritas.',
    price: 990,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 3',
  },
  {
    id: 'combo-tres-triple',
    name: 'Combo Para 3 · 3 Triple',
    description: '3 Triple Smash + porciones de papas fritas.',
    price: 1260,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 3',
  },
  {
    id: 'combo-tres-cuadruple',
    name: 'Combo Para 3 · 3 Cuádruple',
    description: '3 Cuádruple Smash + porciones de papas fritas.',
    price: 1410,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 3',
  },

  // COMBOS PARA 4
  {
    id: 'combo-cuatro-simple',
    name: 'Combo Para 4 · 4 Simples',
    description: '4 Hamburguesas Simples + porciones de papas fritas.',
    price: 1050,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 4',
  },
  {
    id: 'combo-cuatro-doble',
    name: 'Combo Para 4 · 4 Doble Classic',
    description: '4 Doble Classic + porciones de papas fritas.',
    price: 1320,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 4',
  },
  {
    id: 'combo-cuatro-triple',
    name: 'Combo Para 4 · 4 Triple',
    description: '4 Triple Smash + porciones de papas fritas.',
    price: 1640,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 4',
  },
  {
    id: 'combo-cuatro-cuadruple',
    name: 'Combo Para 4 · 4 Cuádruple',
    description: '4 Cuádruple Smash + porciones de papas fritas.',
    price: 1880,
    category: 'combos',
    image: '/images/promos-menu.jpg',
    available: true,
    badge: 'Combo 4',
  },

  // EXTRAS
  {
    id: 'extra-cheddar',
    name: 'Extra Cheddar',
    description: 'Porción extra de queso cheddar fundido.',
    price: 20,
    category: 'extras',
    image: '/images/extra-cheddar.jpg',
    available: true,
  },
  {
    id: 'extra-bacon',
    name: 'Extra Bacon',
    description: 'Tiras de panceta bien crocante.',
    price: 30,
    category: 'extras',
    image: '/images/extra-bacon.jpg',
    available: true,
  },
  {
    id: 'extra-huevo',
    name: 'Huevo a la plancha',
    description: 'Huevo dorado a la plancha.',
    price: 20,
    category: 'extras',
    image: '/images/huevo-plancha.jpg',
    available: true,
  },
  {
    id: 'extra-bano-cheddar',
    name: 'Baño de Cheddar',
    description: 'Abundante baño de cheddar derretido para tu burger o papas.',
    price: 50,
    category: 'extras',
    image: '/images/bano-cheddar.jpg',
    available: true,
  },
  {
    id: 'extra-carne',
    name: 'Extra Carne Smash',
    description: 'Un medallón adicional de carne smash 100% vacuna.',
    price: 70,
    category: 'extras',
    image: '/images/extra-carne.jpg',
    available: true,
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
