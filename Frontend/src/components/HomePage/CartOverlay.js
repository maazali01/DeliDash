import React, { useContext } from 'react';
import { CartContext } from '../HomePage/Cartcontext';
import './CartOverlay.css';

const CartOverlay = ({ onClose }) => {
  const { cart, clearCart, removeFromCart, getTotal } = useContext(CartContext);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="overlay">
      <div className="cart-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div>
                  <span>{item.name}</span> - <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="total">
          Total: ${getTotal().toFixed(2)}
        </div>
        <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartOverlay;
