'use strict';
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.use(authenticateToken);

router.get('/', locationController.getAllLocations);
router.post('/', locationController.createLocation);
router.get('/:id', locationController.getLocationById); 
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;