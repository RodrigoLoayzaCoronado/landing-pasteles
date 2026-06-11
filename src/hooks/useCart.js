import { useState, useCallback } from 'react';

/**
 * Cada item del carrito tiene la forma:
 * {
 *   cartId: number,       — ID único de la línea del carrito
 *   drawing: Drawing,     — objeto completo del dibujo
 *   phrase: string,       — frase personalizada (≤25 chars)
 *   quantity: number,
 *   price: number,
 * }
 */

const PRICE_PER_CAKE = 45;

export function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((drawing, phrase) => {
    setItems(prev => [
      ...prev,
      {
        cartId: Date.now(),
        drawing,
        phrase: phrase.trim(),
        quantity: 1,
        price: PRICE_PER_CAKE,
      },
    ]);
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addItem, removeItem, clearCart, totalItems, totalPrice };
}