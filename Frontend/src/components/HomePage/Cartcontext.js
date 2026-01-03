import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingProductIndex > -1) {
        // Product already in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: (updatedCart[existingProductIndex].quantity || 1) + 1
        };
        return updatedCart;
      } else {
        // New product, add to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            // Decrease quantity if more than 1
            return { ...item, quantity: item.quantity - 1 };
          }
          // Remove item if quantity is 1
          return null;
        }
        return item;
      }).filter(item => item !== null);

      return updatedCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const cartCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, cartCount, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext more conveniently
export const useCart = () => useContext(CartContext);
