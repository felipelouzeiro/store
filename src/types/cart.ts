import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}
