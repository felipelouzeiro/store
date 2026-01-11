import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import { LoginModal } from '../ui/LoginModal';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">FakeStore</h1>
            </Link>

            <nav className="flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{user?.username}</span>
                    </div>
                  </div>
                  <Link
                    to="/cart"
                    className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-600 transition-smooth rounded-lg hover:bg-gray-50"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-smooth rounded-lg hover:bg-gray-50"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  Entrar
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}
