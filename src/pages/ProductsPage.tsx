import { useState } from 'react';
import { useProducts, useFilteredAndSortedProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { ProductFilters } from '../components/ProductFilters';
import { CategorySidebar } from '../components/layout/CategorySidebar';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';
import type { SortOption } from '../types/product';

export function ProductsPage() {
  const { products, loading, error, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');

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
    <div className="flex min-h-screen bg-gray-50">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="flex-1 bg-gray-50">
        <div className="p-6 lg:p-8">
          <ProductFilters sortOption={sortOption} onSortChange={setSortOption} />
          <ProductList products={filteredAndSortedProducts} />
        </div>
      </div>
    </div>
  );
}
