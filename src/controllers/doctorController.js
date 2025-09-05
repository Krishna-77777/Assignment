const { Doctor } = require('../models');

// POST /api/doctors/ - Add a new doctor
exports.addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error adding doctor", error: error.message });
    }
};

// GET /api/doctors/ - Retrieve all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving doctors", error: error.message });
    }
};

// GET /api/doctors/<id>/ - Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving doctor", error: error.message });
    }
};

// PUT /api/doctors/<id>/ - Update a doctor's details
exports.updateDoctor = async (req, res) => {
    try {
        const [updated] = await Doctor.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedDoctor = await Doctor.findByPk(req.params.id);
            return res.status(200).json({ message: "Doctor updated", doctor: updatedDoctor });
        }
        throw new Error('Doctor not found.');
    } catch (error) {
        res.status(500).json({ message: "Error updating doctor", error: error.message });
    }
};

// DELETE /api/doctors/<id>/ - Delete a doctor record
exports.deleteDoctor = async (req, res) => {
    try {
        const deleted = await Doctor.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Doctor not found.');
    } catch (error) {
        res.status(500).json({ message: "Error deleting doctor", error: error.message });
    }
};