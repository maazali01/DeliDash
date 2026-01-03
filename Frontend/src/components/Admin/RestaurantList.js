import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({ name: '', location: '', image: '' });
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [error, setError] = useState(null);

  const token = Cookies.get('token');
  const navigate = useNavigate();

  const fetchRestaurants = useCallback(() => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    axios.get('http://localhost:4000/admin/restaurants', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRestaurants(response.data);
      setError(null);
    })
    .catch(error => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
        if (error.response.status === 401) {
          navigate('/login');
        }
      } else {
        setError('Error fetching restaurants. Please try again later.');
      }
    });
  }, [token, navigate]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleAddRestaurant = () => {
    axios.post('http://localhost:4000/admin/restaurants', newRestaurant, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setNewRestaurant({ name: '', location: '', image: '' });
      document.getElementById('restaurantImageInput').value = ''; // Reset the file input
      fetchRestaurants();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error adding restaurant. Please try again later.');
      }
    });
  };

  const handleDeleteRestaurant = (id) => {
    axios.delete(`http://localhost:4000/admin/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchRestaurants();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error deleting restaurant. Please try again later.');
      }
    });
  };

  const handleUpdateRestaurant = () => {
    axios.put(`http://localhost:4000/admin/restaurants/${editRestaurant._id}`, editRestaurant, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setEditRestaurant(null);
      fetchRestaurants();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error updating restaurant. Please try again later.');
      }
    });
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditRestaurant((prev) => ({ ...prev, image: reader.result }));
        } else {
          setNewRestaurant((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRestaurant({ ...editRestaurant, [name]: value });
  };

  const startEditRestaurant = (restaurant) => {
    setEditRestaurant({ ...restaurant });
  };

  const cancelEdit = () => {
    setEditRestaurant(null);
  };

  const manageProducts = (restaurantId) => {
    navigate(`/admin/restaurants/${restaurantId}/products`);
  };

  return (
    <div className="restaurant-list">
      <h2 className='manage'>Manage Restaurants</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <h3 className='add'>Add New Restaurant</h3>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={newRestaurant.name}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newRestaurant.location}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
        />
        <input
          id="restaurantImageInput"
          type="file"
          onChange={(e) => handleImageChange(e, false)}
        />
        {newRestaurant.image && <img src={newRestaurant.image} alt="New Restaurant" />}
        <button onClick={handleAddRestaurant}>Add Restaurant</button>
      </div>
      {editRestaurant && (
        <div>
          <h3>Edit Restaurant</h3>
          <input
            type="text"
            name="name"
            value={editRestaurant.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="location"
            value={editRestaurant.location}
            onChange={handleEditChange}
          />
          <input type="file" onChange={(e) => handleImageChange(e, true)} />
          {editRestaurant.image && <img src={editRestaurant.image} alt="Edit Restaurant" />}
          <button onClick={handleUpdateRestaurant}>Update Restaurant</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              <span><h3>Restaurant Name: </h3>{restaurant.name}</span>
              <span><h3>Location: </h3>{restaurant.location}</span>
              {restaurant.image && <img src={restaurant.image} alt={restaurant.name} />}
              <button onClick={() => startEditRestaurant(restaurant)}>Edit</button>
              <button onClick={() => handleDeleteRestaurant(restaurant._id)}>Delete</button>
              <button onClick={() => manageProducts(restaurant._id)}>Manage Products</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='no'>No restaurants available.</p>
      )}
    </div>
  );
};

export default RestaurantList;
