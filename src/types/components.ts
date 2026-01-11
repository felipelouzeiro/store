import type { Product, SortOption } from './product';

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  sortOption: SortOption;
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sort: SortOption) => void;
}

export interface ErrorProps {
  message: string;
  onRetry?: () => void;
}
