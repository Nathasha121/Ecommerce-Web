// Import packages
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing JSON requests
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});