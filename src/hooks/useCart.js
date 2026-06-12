import { useState, useCallback } from 'react';
import { MULTIPLIERS } from '../data/products';

/**
 * Cada item del carrito tiene la forma:
 * 
 * Para CakeBuilder (dibujo personalizado):
 * {
 *   cartId: number,       — ID único de la línea del carrito
 *   drawing: Drawing,     — objeto completo del dibujo
 *   phrase: string,       — frase personalizada (≤25 chars)
 *   portions: number,     — número de porciones
 *   fillingId: string,    — ID del relleno
 *   fillingLabel: string, — nombre del relleno
 *   quantity: number,
 *   price: number,
 * }
 * 
 * Para ProductCatalog (producto del catálogo):
 * {
 *   cartId: number,       — ID único de la línea del carrito
 *   productId: string,
 *   productTitle: string,
 *   image: string,
 *   portions: number,
 *   fillingId: string,
 *   fillingLabel: string,
 *   quantity: number,
 *   price: number,
 * }
 */

const BASE_PRICE_PER_CAKE = 45;

export function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((drawing, phrase, portions = 2, filling = {}) => {
    const price = (BASE_PRICE_PER_CAKE * MULTIPLIERS[portions]).toFixed(2);
    setItems(prev => [
      ...prev,
      {
        cartId: Date.now(),
        drawing,
        phrase: phrase.trim(),
        portions,
        fillingId: filling.id || '',
        fillingLabel: filling.label || '',
        quantity: 1,
        price: Number(price),
      },
    ]);
  }, []);

  // Agrega un producto del catálogo (no basado en `drawing`).
  const addProduct = useCallback((product, portions, price, filling) => {
    setItems(prev => [
      ...prev,
      {
        cartId: Date.now(),
        productId: product.id,
        productTitle: product.title,
        image: product.image,
        portions,
        fillingId: filling?.id || product.fillings[0]?.id,
        fillingLabel: filling?.label || product.fillings[0]?.label || '',
        quantity: 1,
        price: Number(price),
      },
    ]);
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addItem, addProduct, removeItem, clearCart, totalItems, totalPrice };
}