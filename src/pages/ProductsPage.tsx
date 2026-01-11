import { useState } from 'react';
import { useProducts, useFilteredAndSortedProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { ProductFilters } from '../components/ProductFilters';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';
import type { SortOption } from '../types/product';

export function ProductsPage() {
  const { products, loading, error, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('name');

  const filteredAndSortedProducts = useFilteredAndSortedProducts(
    products,
    selectedCategory,
    sortOption
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Produtos</h1>
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          sortOption={sortOption}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOption}
        />
        <ProductList products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}
