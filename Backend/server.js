const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 4000, // avoid hanging connections
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const userSideRoutes = require('./routes/userSide');
const adminSideRoutes = require('./routes/adminSide');
const authRoutes = require('./routes/auth');
const { authMiddleware, adminMiddleware } = require('./middlewares/authmiddleware');

app.use('/user/restaurants', userSideRoutes);
app.use('/admin', authMiddleware, adminMiddleware, adminSideRoutes);
app.use('/', authRoutes);

// Health check route (for Vercel)
app.get('/', (req, res) => {
  res.send('🚀 DeliDash API is running successfully!');
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
