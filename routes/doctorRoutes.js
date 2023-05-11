const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/info', authController.protected, doctorController.getDoctorInfo);
router.get('/theme', doctorController.themeDoctors);

router.get('/appointments', authController.protected, doctorController.viewAppointment);
router.post('/update/:id', authController.protected, doctorController.updateDoctor);
router.post('/delete/:id', authController.protected, doctorController.deleteDoctor);

router
    .route('/')
    .get(authController.protected ,doctorController.getAllDoctors)
    .post(authController.protected, doctorController.createDoctor);

router
    .route('/:id')
    .post(authController.protected, doctorController.getDoctor)

module.exports = router;