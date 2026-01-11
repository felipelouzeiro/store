import type { Product, SortOption } from './product';

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductFiltersProps {
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export interface ErrorProps {
  message: string;
  onRetry?: () => void;
}
