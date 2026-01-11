import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  const { product, loading, error } = useProduct(productId);

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return <Error message={error || 'Produto não encontrado'} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Voltar para produtos
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <span className="text-sm text-blue-600 font-semibold uppercase">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              </div>

              <div className="flex items-center">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
