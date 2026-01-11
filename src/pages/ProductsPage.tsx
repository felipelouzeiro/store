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
    <div className="flex min-h-screen">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="flex-1 bg-white">
        <div className="p-6 lg:p-8">
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
    </div>
  );
}
