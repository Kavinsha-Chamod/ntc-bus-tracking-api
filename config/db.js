'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected - Scalable persistence ready');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  models: {
    Route: require('../models/routesModel'),
    Bus: require('../models/busModel'),
    Trip: require('../models/tripModel'),
    Location: require('../models/locationModel'),
    User: require('../models/userModel')
  }
};

