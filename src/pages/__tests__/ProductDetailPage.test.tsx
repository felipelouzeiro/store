import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from '../ProductDetailPage';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';
import * as useProductHook from '../../hooks/useProduct';

vi.mock('../../hooks/useProduct');

const mockProduct = {
  id: 1,
  title: 'Produto Teste',
  price: 10.99,
  description: 'Descrição completa do produto teste',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/product/:id" element={children} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    window.history.pushState({}, '', '/product/1');
  });

  it('deve renderizar os detalhes do produto', async () => {
    vi.mocked(useProductHook.useProduct).mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Produto Teste')).toBeInTheDocument();
      expect(screen.getByText('Descrição completa do produto teste')).toBeInTheDocument();
      expect(screen.getByText(/R\$/)).toBeInTheDocument();
    });
  });

  it('deve exibir estado de loading quando o produto está carregando', () => {
    vi.mocked(useProductHook.useProduct).mockReturnValue({
      product: null,
      loading: true,
      error: null,
    });

    render(<ProductDetailPage />, { wrapper });

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando o produto não é encontrado', () => {
    vi.mocked(useProductHook.useProduct).mockReturnValue({
      product: null,
      loading: false,
      error: 'Produto não encontrado',
    });

    render(<ProductDetailPage />, { wrapper });

    expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Produto não encontrado')).toBeInTheDocument();
  });

  it('deve exibir botão de adicionar ao carrinho', async () => {
    vi.mocked(useProductHook.useProduct).mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
    });
  });
});
