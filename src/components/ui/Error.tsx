import type { ErrorProps } from '../../types/components';

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900">Ops! Algo deu errado</h2>
        <p className="text-gray-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}
