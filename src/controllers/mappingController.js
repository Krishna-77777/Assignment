const { Patient, Doctor } = require('../models');

// POST /api/mappings/ - Assign a doctor to a patient
exports.assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        const patient = await Patient.findByPk(patientId);
        const doctor = await Doctor.findByPk(doctorId);

        if (!patient || !doctor) {
            return res.status(404).json({ message: "Patient or Doctor not found" });
        }
        // Security check: Ensure the patient belongs to the logged-in user
        if (patient.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to modify this patient." });
        }

        await patient.addDoctor(doctor);
        res.status(200).json({ message: "Doctor assigned to patient successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error assigning doctor", error: error.message });
    }
};

// GET /api/mappings/ - Retrieve all mappings for the logged-in user
exports.getAllMappings = async (req, res) => {
    try {
        const patientsWithDoctors = await Patient.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Doctor,
                as: 'doctors',
                through: { attributes: [] } // Exclude the join table attributes from the result
            }]
        });
        res.status(200).json(patientsWithDoctors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving mappings", error: error.message });
    }
};

// GET /api/mappings/<patient_id>/ - Get all doctors for a specific patient
exports.getDoctorsForPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { id: req.params.patientId, userId: req.user.id }
        });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found or you do not have permission to view." });
        }

        const doctors = await patient.getDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving doctors for patient", error: error.message });
    }
};

// DELETE /api/mappings/ - Remove a doctor from a patient
exports.removeDoctorFromPatient = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        const patient = await Patient.findByPk(patientId);
        const doctor = await Doctor.findByPk(doctorId);

        if (!patient || !doctor) {
            return res.status(404).json({ message: "Patient or Doctor not found" });
        }
        if (patient.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to modify this patient." });
        }

        await patient.removeDoctor(doctor);
        res.status(200).json({ message: "Doctor removed from patient successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing doctor from patient", error: error.message });
    }
};