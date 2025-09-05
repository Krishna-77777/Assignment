const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
console.log('Is patientController an object with functions?', patientController);
 
router.use(authMiddleware);

 
router.post('/', patientController.addPatient);

 
router.get('/', patientController.getAllPatients);

 
router.get('/:id', patientController.getPatientById);

 
router.put('/:id', patientController.updatePatient);

 
router.delete('/:id', patientController.deletePatient);

module.exports = router;