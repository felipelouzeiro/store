interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryIcons: Record<string, string> = {
  electronics: '📱',
  jewelery: '💍',
  "men's clothing": '👔',
  "women's clothing": '👗',
};

function getCategoryIcon(category: string): string {
  return categoryIcons[category.toLowerCase()] || '📦';
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Categorias</h2>
      <nav className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth ${
            !selectedCategory
              ? 'bg-primary-100 text-primary-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 font-normal'
          }`}
        >
          <span className="text-xl">👤</span>
          <span>Todos</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth capitalize ${
              selectedCategory === category
                ? 'bg-primary-100 text-primary-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50 font-normal'
            }`}
          >
            <span className="text-xl">{getCategoryIcon(category)}</span>
            <span>{category}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
