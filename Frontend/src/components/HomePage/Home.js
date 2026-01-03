// Home.js (or any parent component)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantList from './userRestaurantList';
import UserProductList from './userProductList';
import { CartProvider } from './Cartcontext';
import CartIcon from './CartIcon';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  return (
    <div className="home">
      <CartProvider>
        <CartIcon />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/:id/products" element={<UserProductList />} />
        </Routes>
      </CartProvider>
    </div>
  );
};

export default Home;
