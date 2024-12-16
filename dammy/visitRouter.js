const express = require('express');
const router = express.Router();
const visitService = require('../services/visitService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new visit
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const visitData = req.body;
        const newVisit = await visitService.createVisit(visitData);
        res.status(201).json({
            message: 'Visit created successfully',
            data: newVisit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating visit',
            error: error.message,
        });
    }
});

// Route to get all visits
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const visits = await visitService.getAllVisits();
        res.status(200).json({
            message: 'Visits retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits',
            error: error.message,
        });
    }
});

module.exports = router;
