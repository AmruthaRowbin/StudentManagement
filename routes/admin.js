// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST request to create a new admin
router.post('/admins', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;
