const { Patient } = require('../models');

// POST /api/patients/ - Add a new patient
// THIS IS THE MISSING FUNCTION
exports.addPatient = async (req, res) => {
    try {
        // req.user.id comes from the authMiddleware
        const patient = await Patient.create({ ...req.body, userId: req.user.id });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error adding patient", error: error.message });
    }
};

// GET /api/patients/ - Retrieve all patients for the authenticated user
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({ where: { userId: req.user.id } });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patients", error: error.message });
    }
};

 
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patient", error: error.message });
    }
};
 
exports.updatePatient = async (req, res) => {
    try {
        const [updated] = await Patient.update(req.body, {
            where: { id: req.params.id, userId: req.user.id }
        });

        if (updated) {
            const updatedPatient = await Patient.findOne({ where: { id: req.params.id } });
            return res.status(200).json({ message: "Patient updated", patient: updatedPatient });
        }
        throw new Error('Patient not found or you do not have permission to update.');
    } catch (error) {
        res.status(500).json({ message: "Error updating patient", error: error.message });
    }
};

 
exports.deletePatient = async (req, res) => {
    try {
        const deleted = await Patient.destroy({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (deleted) {
            return res.status(204).send();  
        }
        throw new Error('Patient not found or you do not have permission to delete.');
    } catch (error) {
        res.status(500).json({ message: "Error deleting patient", error: error.message });
    }
};