const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurants');
const Product = require('../models/Products');

// POST a new restaurant
router.post('/restaurants', async (req, res) => {
  try {
    const { name, location, image } = req.body;
    if (!name || !location || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newRestaurant = new Restaurant({ name, location, image });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    console.error('Error adding restaurant:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a restaurant by ID
router.put('/restaurants/:id', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(updatedRestaurant);
  } catch (err) {
    console.error('Error updating restaurant:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a restaurant by ID
router.delete('/restaurants/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    console.error('Error deleting restaurant:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new product
router.post('/restaurants/:restaurantId/products', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { restaurantId } = req.params;
    if (!name || !price || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newProduct = new Product({ name, price, image, restaurantId });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a product by ID
router.put('/restaurants/:restaurantId/products/:id', async (req, res) => {
  try {
    const { id, restaurantId } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, restaurantId: restaurantId },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a product by ID
router.delete('/restaurants/:restaurantId/products/:id', async (req, res) => {
  try {
    const { id, restaurantId } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ _id: id, restaurantId: restaurantId });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all products for a specific restaurant
router.get('/restaurants/:restaurantId/products', async (req, res) => {
  try {
    const products = await Product.find({ restaurantId: req.params.restaurantId });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
