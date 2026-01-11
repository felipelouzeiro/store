import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';
import { LoginModal } from '../components/ui/LoginModal';
import { formatPrice } from '../utils/formatPrice';

function generateMockRating() {
  return {
    rate: Number((Math.random() * 2 + 3).toFixed(1)),
    count: Math.floor(Math.random() * 500 + 50),
  };
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  const { product, loading, error } = useProduct(productId);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [rating] = useState(() => generateMockRating());

  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return <Error message={error || 'Produto não encontrado'} />;
  }

  return (
    <>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium transition-smooth group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar para produtos
          </Link>

          <div className="bg-white rounded-xl shadow-medium border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8">
              <div className="bg-gray-50 rounded-xl flex items-center justify-center p-8 lg:p-12">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>

              <div className="flex flex-col space-y-6">
                <div>
                  <span className="text-sm text-primary-600 font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-4 leading-tight">
                    {product.title}
                  </h1>
                </div>

                <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                  <div>
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{rating.rate}</span>
                      <span className="text-xs text-gray-600">({rating.count} avaliações)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Descrição</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full lg:w-auto px-8 py-3.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-soft hover:shadow-medium"
                >
                  {isAdding ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Adicionar ao carrinho
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}
