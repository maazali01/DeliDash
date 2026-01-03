import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  const fetchProducts = useCallback(() => {
    axios.get(`http://localhost:4000/admin/restaurants/${id}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setProducts(response.data);
        setError(null);  // Clear any previous errors
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized. Please log in again.');
            // Optionally, redirect to login page or clear token
          } else {
            setError(`Error: ${error.response.data.message}`);
          }
        } else {
          setError('Error fetching products. Please try again later.');
        }
      });
  }, [id, token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, token]);

  const handleAddProduct = () => {
    axios.post(`http://localhost:4000/admin/restaurants/${id}/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error adding product. Please try again later.');
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:4000/admin/restaurants/${id}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchProducts();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error deleting product. Please try again later.');
      }
    });
  };

  const handleUpdateProduct = () => {
    axios.put(`http://localhost:4000/admin/restaurants/${id}/products/${editProduct._id}`, editProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setEditProduct(null);
      fetchProducts();
    })
    .catch((error) => {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error updating product. Please try again later.');
      }
    });
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditProduct((prev) => ({ ...prev, image: reader.result }));
        } else {
          setNewProduct((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const startEditProduct = (product) => {
    setEditProduct({ ...product });
  };

  const cancelEdit = () => {
    setEditProduct(null);
  };

  return (
    <div className="admin-product-list">
      <h2>Manage Products</h2>
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-add-product">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {products.length > 0 ? (
        <>
          <h3>Existing Products</h3>
          <ul className="admin-product-list-ul">
            {products.map((product) => (
              <li className="admin-product-list-li" key={product._id}>
                {editProduct && editProduct._id === product._id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={handleEditChange}
                    />
                    <input
                      type="number"
                      name="price"
                      value={editProduct.price}
                      onChange={handleEditChange}
                    />
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
                    <button onClick={handleUpdateProduct}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>{product.name} - {product.price}</p>
                    {product.image && <img src={product.image} alt={product.name} />}
                    <button onClick={() => startEditProduct(product)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
