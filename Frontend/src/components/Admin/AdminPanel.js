import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import axios from 'axios';
import './AdminPanel.css';


const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchAdminData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/admin/restaurants', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRestaurants(response.data);
          setError(null);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 403) {
              setError('You are not authorized to access this page.');
              navigate('/unauthorized');
            } else {
              setError(`Error: ${error.response.data.message}`);
            }
          } else {
            setError('Error fetching restaurants. Please try again later.');
          }
          console.error('Error fetching restaurants:', error);
        }
      };

      fetchAdminData();
    }
  }, [navigate]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="admin-panel">
      <h1 className='dash'>Admin Dashboard</h1>
      <div className="admin-buttons">
        <button onClick={() => navigate('/admin/restaurants')}>Manage Restaurants</button>
      </div>
      <div className="restaurant-cards">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant._id}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
              {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
              <button onClick={() => navigate(`/admin/restaurants/${restaurant._id}/products`)}>Manage Products</button>
            </div>
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

