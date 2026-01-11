import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductsPage } from '../ProductsPage';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';
import * as useProductsHook from '../../hooks/useProducts';

vi.mock('../../hooks/useProducts');

const mockProducts = [
  {
    id: 1,
    title: 'Produto Teste 1',
    price: 10.99,
    description: 'Descrição do produto',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
  },
  {
    id: 2,
    title: 'Produto Teste 2',
    price: 20.99,
    description: 'Descrição do produto 2',
    category: 'jewelery',
    image: 'https://example.com/image2.jpg',
  },
];

const mockCategories = ['electronics', 'jewelery', "men's clothing"];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('deve renderizar a página de produtos com lista de produtos', async () => {
    vi.mocked(useProductsHook.useProducts).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      categories: mockCategories,
    });

    vi.mocked(useProductsHook.useFilteredAndSortedProducts).mockReturnValue(mockProducts);

    render(<ProductsPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Produto Teste 1')).toBeInTheDocument();
      expect(screen.getByText('Produto Teste 2')).toBeInTheDocument();
    });
  });

  it('deve exibir estado de loading quando os produtos estão carregando', () => {
    vi.mocked(useProductsHook.useProducts).mockReturnValue({
      products: [],
      loading: true,
      error: null,
      categories: [],
    });

    render(<ProductsPage />, { wrapper });

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando há erro ao carregar produtos', () => {
    vi.mocked(useProductsHook.useProducts).mockReturnValue({
      products: [],
      loading: false,
      error: 'Erro ao carregar produtos',
      categories: [],
    });

    render(<ProductsPage />, { wrapper });

    expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Erro ao carregar produtos')).toBeInTheDocument();
  });

  it('deve renderizar a sidebar de categorias', async () => {
    vi.mocked(useProductsHook.useProducts).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      categories: mockCategories,
    });

    vi.mocked(useProductsHook.useFilteredAndSortedProducts).mockReturnValue(mockProducts);

    render(<ProductsPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Categorias')).toBeInTheDocument();
    });
  });
});
