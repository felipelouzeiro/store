import type { Product } from './product';

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

export interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}
