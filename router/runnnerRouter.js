const express = require('express');
const router = express.Router();
const runnerService = require('../services/runnerService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new runner
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const runnerData = req.body;
        const newRunner = await runnerService.createRunner(runnerData);
        res.status(201).json({
            message: 'Runner created successfully',
            data: newRunner,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating runner',
            error: error.message,
        });
    }
});

// Route to get all runners
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const runners = await runnerService.getAllRunners();
        res.status(200).json({
            message: 'Runners retrieved successfully',
            data: runners,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving runners',
            error: error.message,
        });
    }
});

// Route to get a runner by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const runner = await runnerService.getRunnerById(id);
        res.status(200).json({
            message: 'Runner retrieved successfully',
            data: runner,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving runner',
            error: error.message,
        });
    }
});

// Route to get runners by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const runners = await runnerService.getRunnersByEmployeeId(employeeId);
        res.status(200).json({
            message: 'Runners retrieved successfully',
            data: runners,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving runners',
            error: error.message,
        });
    }
});

// Route to update a runner
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedRunner = await runnerService.updateRunner(id, updateData);
        res.status(200).json({
            message: 'Runner updated successfully',
            data: updatedRunner,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error updating runner',
            error: error.message,
        });
    }
});

// Route to delete a runner
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRunner = await runnerService.deleteRunner(id);
        res.status(200).json({
            message: 'Runner deleted successfully',
            data: deletedRunner,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error deleting runner',
            error: error.message,
        });
    }
});

module.exports = router;
