import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { UseProductReturn } from '../types/hooks';
import type { Product } from '../types/product';

export function useProduct(id: number): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const productData = await api.getProduct(id);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
