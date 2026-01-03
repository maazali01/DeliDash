const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurants');
const Product = require('../models/Products');

// Route for fetching all restaurants or searching by name
router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    // Filter restaurants by name if a query is provided
    const filter = query ? { name: { $regex: query, $options: 'i' } } : {};
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const filter = query ? { name: { $regex: query, $options: 'i' } } : {};
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    console.error('Error fetching restaurant:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all products for a specific restaurant
router.get('/:restaurantId/products', async (req, res) => {
  try {
    const products = await Product.find({ restaurantId: req.params.restaurantId });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


