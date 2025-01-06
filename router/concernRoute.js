const express = require('express');
const router = express.Router();
const concernService = require('../services/concernService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new concern
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const concernData = req.body;
        const newConcern = await concernService.createConcern(concernData);
        res.status(201).json({
            message: 'Concern created successfully',
            data: newConcern,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating concern',
            error: error.message,
        });
    }
});

// Route to get all concerns
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const concerns = await concernService.getAllConcerns();
        res.status(200).json({
            message: 'Concerns retrieved successfully',
            data: concerns,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving concerns',
            error: error.message,
        });
    }
});

// Route to get a concern by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const concern = await concernService.getConcernById(id);
        res.status(200).json({
            message: 'Concern retrieved successfully',
            data: concern,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving concern',
            error: error.message,
        });
    }
});

// Route to get concerns by patient ID
router.get('/patient/:patientId', authenticateToken, async (req, res) => {
    try {
        const { patientId } = req.params;
        const concerns = await concernService.getConcernsByPatientId(patientId);
        res.status(200).json({
            message: 'Concerns retrieved successfully',
            data: concerns,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving concerns',
            error: error.message,
        });
    }
});

// Route to get concerns by visit ID
router.get('/visit/:visitId', authenticateToken, async (req, res) => {
    try {
        const { visitId } = req.params;
        const concerns = await concernService.getConcernsByVisitId(visitId);
        res.status(200).json({
            message: 'Concerns retrieved successfully',
            data: concerns,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving concerns',
            error: error.message,
        });
    }
});

// Route to update a concern by ID
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedConcern = await concernService.updateConcern(id, updateData);
        res.status(200).json({
            message: 'Concern updated successfully',
            data: updatedConcern,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error updating concern',
            error: error.message,
        });
    }
});

// Route to delete a concern by ID
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConcern = await concernService.deleteConcern(id);
        res.status(200).json({
            message: 'Concern deleted successfully',
            data: deletedConcern,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error deleting concern',
            error: error.message,
        });
    }
});

module.exports = router;
