/**
 * Contrato de catálogo listo para migrar a base de datos / CMS.
 * Los productos actuales viven en `src/data/products.ts` como fuente local.
 */
export type ProductCategory = 'hamburguesas' | 'combos' | 'extras';

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  /** Precio en moneda local (UYU) */
  price: number;
  category: ProductCategory;
  /** URL o path de imagen */
  image: string;
  available: boolean;
  stars?: number;
  badge?: string;
  sortOrder?: number;
  updatedAt?: string;
}

export interface CatalogConfig {
  whatsappNumber: string;
  instagramHandle: string;
  scheduleLabel: string;
  paymentMethods: string[];
}
