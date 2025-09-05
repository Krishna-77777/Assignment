const express = require('express');
const router = express.Router();
const mappingController = require('../controllers/mappingController');
const authMiddleware = require('../middleware/authMiddleware');

 
router.use(authMiddleware);

 
router.post('/', mappingController.assignDoctor);

 
router.get('/', mappingController.getAllMappings);

 
router.get('/:patientId', mappingController.getDoctorsForPatient);

 
router.delete('/', mappingController.removeDoctorFromPatient);


module.exports = router;