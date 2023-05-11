const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router
    .post('/loginAdmin', authController.Login('Admin'))
    .post('/loginPatient', authController.Login('Patient'))
    .post('/loginDoctor', authController.Login('Doctor'))
    .get('/logoutAdmin', authController.Logout('Admin'))
    .get('/logoutPatient', authController.Logout('Patient'))
    .get('/logoutDoctor', authController.Logout('Doctor'))


module.exports = router 