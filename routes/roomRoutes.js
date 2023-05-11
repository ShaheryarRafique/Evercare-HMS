const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/update/:id', authController.protected, roomController.updateRooms)
router.post('/delete/:id', authController.protected, roomController.deleteRooms);

router
    .route('/')
    .get(authController.protected, roomController.getAllRooms)
    .post(authController.protected, roomController.createRooms);

router
    .route('/:id')
    .post(authController.protected, roomController.getRooms)


module.exports = router;