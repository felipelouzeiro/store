import { Link } from 'react-router-dom';
import type { ProductCardProps } from '../types/components';

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-600 font-semibold uppercase mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-grow">
          {product.title}
        </h3>
        <div className="mt-auto">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
