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
      <header className="bg-primary-600 text-white sticky top-0 z-50 shadow-medium h-16">
        <div className="max-w-full mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center gap-2">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h1 className="text-2xl font-bold">TechShop</h1>
            </Link>

            <nav className="flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="relative flex items-center gap-2 px-4 py-2 hover:bg-primary-700 rounded-lg transition-smooth"
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
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <div className="flex items-center gap-3">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm font-normal">ol {user?.username}!</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm hover:bg-primary-700 rounded-lg transition-smooth"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-sm font-medium bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-smooth"
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
