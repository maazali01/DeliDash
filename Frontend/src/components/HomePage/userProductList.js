import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { CartContext } from './Cartcontext';
import './userProductList.css';

const UserProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); // Use CartContext to access the addToCart function
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/restaurants/${id}/products`);
        setProducts(response.data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.data.message}`);
        } else {
          setError('Error fetching products. Please try again later.');
        }
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (product) => {
    const token = Cookie.get('token');
    if (!token) {
      navigate('/Login');
    } else {
      addToCart(product); // Add the product to the cart using CartContext
    }
  };

  return (
    <div className="product-list">
      <h2 className="product-heading">Products</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li className="pli" key={product._id}>
              <span className="pname">{product.name}</span>
              <span><h3>Price: </h3>${product.price}</span>
              {product.image && <img src={product.image} alt={product.name} />}
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProductList;
