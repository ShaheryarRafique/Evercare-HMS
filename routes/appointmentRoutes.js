const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/update/:id',authController.protected, appointmentController.updateAppointments)
router.post('/delete/:id',authController.protected, appointmentController.deleteAppointments);

router
    .route('/')
    .get(authController.protected ,appointmentController.getAllAppointments)
    .post(authController.protected, appointmentController.createAppointments);

router
    .route('/:id')
    .post(authController.protected, appointmentController.getAppointments)


module.exports = router;