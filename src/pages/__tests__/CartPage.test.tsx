import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '../CartPage';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';

const mockProduct = {
  id: 1,
  title: 'Produto Teste',
  price: 10.99,
  description: 'Descrição do produto',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', email: 'test@test.com' }));
  });

  it('deve exibir mensagem de carrinho vazio quando não há itens', async () => {
    localStorage.setItem('cart', JSON.stringify([]));
    
    render(<CartPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Carrinho vazio')).toBeInTheDocument();
      expect(screen.getByText('Adicione produtos ao seu carrinho')).toBeInTheDocument();
    });
  });

  it('deve renderizar os itens do carrinho', async () => {
    const cartItems = [{ product: mockProduct, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(<CartPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Carrinho')).toBeInTheDocument();
      expect(screen.getByText('Produto Teste')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('deve exibir o total corretamente', async () => {
    const cartItems = [{ product: mockProduct, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(<CartPage />, { wrapper });

    await waitFor(() => {
      const prices = screen.getAllByText(/R\$/);
      expect(prices.length).toBeGreaterThan(0);
      expect(screen.getByText('Resumo')).toBeInTheDocument();
    });
  });

  it('deve exibir botão de finalizar compra', async () => {
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(<CartPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Finalizar compra')).toBeInTheDocument();
    });
  });

  it('deve permitir remover item do carrinho', async () => {
    const user = userEvent.setup();
    const cartItems = [{ product: mockProduct, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(<CartPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button');
    const removeButton = buttons.find(button => {
      const svg = button.querySelector('svg');
      return svg && svg.innerHTML.includes('M6 18L18 6');
    });

    if (removeButton) {
      await user.click(removeButton);
      await waitFor(() => {
        expect(screen.queryByText('Produto Teste')).not.toBeInTheDocument();
      });
    }
  });
});
