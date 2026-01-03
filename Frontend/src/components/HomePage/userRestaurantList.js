import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserRestaurantList.css';
import { Link } from 'react-router-dom';

const UserRestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/restaurants');
        setRestaurants(response.data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.data.message}`);
        } else {
          setError('Error fetching restaurants. Please try again later.');
        }
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-list">
      <h2 className="restaurant-heading">Restaurants</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <li className="card" key={restaurant._id}>
              <div className="card-content">
                <span className="card-name"> {restaurant.name}</span>
                {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
                <span className="card-location">Location: {restaurant.location}</span>
                <Link className="view-products-button" to={`/restaurants/${restaurant._id}/products`}>
                  View Products
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserRestaurantList;
