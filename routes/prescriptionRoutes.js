const express = require('express');
const prescController = require('../controllers/prescController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/update/:id',authController.protected, prescController.updatePrescriptions)
router.post('/delete/:id',authController.protected, prescController.deletePrescriptions);

router
    .route('/')
    .get(authController.protected ,prescController.getAllPrescriptions)
    .post(authController.protected, prescController.createPrescriptions);

router
    .route('/:id')
    .post(authController.protected, prescController.getPrescriptions)


module.exports = router;