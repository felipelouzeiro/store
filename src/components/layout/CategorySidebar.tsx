import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-soft flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="font-medium text-gray-700">Categorias</span>
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-white lg:bg-gray-50 border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out p-5 lg:p-6 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Categorias</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => {
              onCategoryChange(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth ${
              !selectedCategory
                ? 'bg-primary-600 text-white shadow-soft'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="font-medium">Todos</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategoryChange(category);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth capitalize ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-soft'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{getCategoryIcon(category)}</span>
              <span className="font-medium">{category}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
