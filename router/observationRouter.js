const express = require('express');
const router = express.Router();
const observationService = require('../services/observationService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new observation
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const observationData = req.body;
        const newObservation = await observationService.createObservation(observationData);
        res.status(201).json({
            message: 'Observation created successfully',
            data: newObservation,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating observation',
            error: error.message,
        });
    }
});

// Route to get all observations
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const observations = await observationService.getAllObservations();
        res.status(200).json({
            message: 'Observations retrieved successfully',
            data: observations,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving observations',
            error: error.message,
        });
    }
});

// Route to fetch an observation by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const observationId = req.params.id;
        const observation = await observationService.getObservationById(observationId);
        if (!observation) {
            return res.status(404).json({ message: 'Observation not found' });
        }
        res.status(200).json({
            message: 'Observation retrieved successfully',
            data: observation,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving observation',
            error: error.message,
        });
    }
});

// Route to fetch observations by visit ID
router.get('/visit/:visitId', authenticateToken, async (req, res) => {
    try {
        const visitId = req.params.visitId;
        const observations = await observationService.getObservationsByVisitId(visitId);
        res.status(200).json({
            message: 'Observations for visit retrieved successfully',
            data: observations,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving observations for visit',
            error: error.message,
        });
    }
});

// Route to fetch observations by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const observations = await observationService.getObservationsByEmployeeId(employeeId);
        res.status(200).json({
            message: 'Observations for employee retrieved successfully',
            data: observations,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving observations for employee',
            error: error.message,
        });
    }
});

// Route to update an observation
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const observationId = req.params.id;
        const updateData = req.body;
        const updatedObservation = await observationService.updateObservation(observationId, updateData);
        if (!updatedObservation) {
            return res.status(404).json({ message: 'Observation not found' });
        }
        res.status(200).json({
            message: 'Observation updated successfully',
            data: updatedObservation,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating observation',
            error: error.message,
        });
    }
});

// Route to delete an observation
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const observationId = req.params.id;
        const deletedObservation = await observationService.deleteObservation(observationId);
        if (!deletedObservation) {
            return res.status(404).json({ message: 'Observation not found' });
        }
        res.status(200).json({
            message: 'Observation deleted successfully',
            data: deletedObservation,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting observation',
            error: error.message,
        });
    }
});

module.exports = router;
