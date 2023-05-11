const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

const router = express.Router();


router.post('/add/appointments', authController.protected, patientController.createAppointments);
router.get('/info', authController.protected, patientController.getPatientInfo);

router.get('/appointments', authController.protected, patientController.viewAppointment);
router.post('/update/:id', authController.protected, patientController.updatePatient)
router.post('/delete/:id', authController.protected, patientController.deletePatient);
router.post('/register', patientController.register);

router
    .route('/')
    .get(authController.protected, patientController.getAllPatients)
    .post(authController.protected, patientController.createPatient);

router
    .route('/:id')
    .post(authController.protected, patientController.getPatient)


module.exports = router;