const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');

// Get all products for a specific restaurant
exports.getProductsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const products = await Product.find({ restaurant: restaurantId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Add a new product to a specific restaurant
exports.addProductToRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, image } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newProduct = new Product({ name, price, image, restaurant: restaurantId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Delete a product from a specific restaurant
exports.deleteProduct = async (req, res) => {
  try {
    const { restaurantId, productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId, restaurant: restaurantId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Update a product from a specific restaurant
exports.updateProduct = async (req, res) => {
  try {
    const { restaurantId, productId } = req.params;
    const { name, price, image } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, restaurant: restaurantId },
      { name, price, image },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};
