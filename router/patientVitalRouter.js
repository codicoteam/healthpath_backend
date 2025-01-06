const express = require('express');
const router = express.Router();
const patientVitalsService = require('../services/patientVitalsService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new patient vital record
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const vitalsData = req.body;
        const newVitals = await patientVitalsService.createPatientVitals(vitalsData);
        res.status(201).json({
            message: 'Patient vitals created successfully',
            data: newVitals,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating patient vitals',
            error: error.message,
        });
    }
});

// Route to get all patient vital records
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const vitals = await patientVitalsService.getAllPatientVitals();
        res.status(200).json({
            message: 'Patient vitals retrieved successfully',
            data: vitals,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving patient vitals',
            error: error.message,
        });
    }
});

// Route to get a patient vital record by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const vitals = await patientVitalsService.getPatientVitalsById(id);
        res.status(200).json({
            message: 'Patient vitals retrieved successfully',
            data: vitals,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving patient vitals',
            error: error.message,
        });
    }
});

// Route to get patient vital records by patient ID
router.get('/patient/:patientId', authenticateToken, async (req, res) => {
    try {
        const { patientId } = req.params;
        const vitals = await patientVitalsService.getPatientVitalsByPatientId(patientId);
        res.status(200).json({
            message: 'Patient vitals retrieved successfully',
            data: vitals,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving patient vitals',
            error: error.message,
        });
    }
});


// Route to get patient vital records by patient ID
router.get('/visit/:visitId', authenticateToken, async (req, res) => {
    try {
        const { visitId } = req.params;
        const vitals = await patientVitalsService.getPatientVitalsByVisitId(visitId);
        res.status(200).json({
            message: 'Patient vitals retrieved successfully',
            data: vitals,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving patient vitals',
            error: error.message,
        });
    }
});

// Route to update a patient vital record by ID
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedVitals = await patientVitalsService.updatePatientVitals(id, updateData);
        res.status(200).json({
            message: 'Patient vitals updated successfully',
            data: updatedVitals,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error updating patient vitals',
            error: error.message,
        });
    }
});

// Route to delete a patient vital record by ID
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVitals = await patientVitalsService.deletePatientVitals(id);
        res.status(200).json({
            message: 'Patient vitals deleted successfully',
            data: deletedVitals,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error deleting patient vitals',
            error: error.message,
        });
    }
});

module.exports = router;
