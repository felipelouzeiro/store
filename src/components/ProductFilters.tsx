import type { ProductFiltersProps } from '../types/components';
import type { SortOption } from '../types/product';

export function ProductFilters({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 h-14 flex items-center gap-6">
      <div className="flex-1 flex items-center gap-3">
        <label className="text-sm font-normal text-gray-600 whitespace-nowrap">
          Filtrar por: Categoria
        </label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          className="flex-1 max-w-xs px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth bg-white text-gray-900 text-sm font-normal"
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm font-normal text-gray-600 whitespace-nowrap">
          Ordenar por:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth bg-white text-gray-900 text-sm font-normal w-48"
        >
          <option value="name">Nome</option>
          <option value="price-asc">Preço: Menor para Maior</option>
          <option value="price-desc">Preço: Maior para Menor</option>
        </select>
      </div>
    </div>
  );
}
