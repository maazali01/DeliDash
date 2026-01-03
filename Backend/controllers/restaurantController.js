const Restaurant = require('../models/Restaurant');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

// Add a new restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const { name, location, image } = req.body;
    const newRestaurant = new Restaurant({ name, location, image });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding restaurant' });
  }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant' });
  }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, image } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(id, { name, location, image }, { new: true });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant' });
  }
};
