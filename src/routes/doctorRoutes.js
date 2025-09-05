const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

 
router.use(authMiddleware);

 
router.post('/', doctorController.addDoctor);

 
router.get('/', doctorController.getAllDoctors);

 
router.get('/:id', doctorController.getDoctorById);

 
router.put('/:id', doctorController.updateDoctor);

 
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;