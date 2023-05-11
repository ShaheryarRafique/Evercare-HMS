const express = require('express');
const departmentController = require('../controllers/DepartmentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/update/:id', authController.protected, departmentController.updateDepartments);
router.post('/delete/:id', authController.protected, departmentController.deleteDepartments);

router
    .route('/')
    .get(authController.protected ,departmentController.getAllDepartments)
    .post(authController.protected, departmentController.createDepartments);

router
    .route('/:id')
    .post(authController.protected, departmentController.getDepartments);

module.exports = router;