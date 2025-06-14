const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require("./models/Entry")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.Mongo_URI)   
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
