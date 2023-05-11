const express = require('express')
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(authController.protected, adminController.getAdmin)

module.exports = router;