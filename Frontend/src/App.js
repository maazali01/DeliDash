import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Navbar from './components/NavBar/navbar';
import Contact from './components/Contact/contact';
import Background from './components/background/view/background';
import AdminPanel from './components/Admin/AdminPanel';
import Home from './components/HomePage/Home';
import RestaurantList from './components/Admin/RestaurantList';
import ProductList from './components/Admin/ProductList';
import Unauthorized from './components/Admin/Unauthorized';


function App() {
  return (

    <div className="container">
      <Background />
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/restaurants" element={<RestaurantList />} />
          <Route path="/admin/restaurants/:id/products" element={<ProductList />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
