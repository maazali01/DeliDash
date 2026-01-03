// CartIcon.js
import React, { useContext, useState } from 'react';
import { CartContext } from './Cartcontext';
import CartOverlay from './CartOverlay';
import './CartIcon.css'; // Ensure you have styling for CartIcon

const CartIcon = () => {
  const { cartCount } = useContext(CartContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(prev => !prev);
  };

  return (
    <>
      <div className="cart-icon" onClick={toggleOverlay}>
        <i className="fas fa-shopping-cart"></i>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
      {isOverlayVisible && <CartOverlay onClose={toggleOverlay} />}
    </>
  );
};

export default CartIcon;

