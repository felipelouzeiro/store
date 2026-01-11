import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Product, SortOption } from '../types/product';
import type { UseProductsReturn } from '../types/hooks';

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { products, loading, error, categories };
}

export function useFilteredAndSortedProducts(
  products: Product[],
  selectedCategory: string | null,
  sortOption: SortOption
): Product[] {
  return products
    .filter((product) => !selectedCategory || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
}
