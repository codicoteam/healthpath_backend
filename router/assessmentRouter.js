const express = require('express');
const router = express.Router();
const assessmentService = require('../services/assessmentService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new assessment
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const assessmentData = req.body;
        const newAssessment = await assessmentService.createAssessment(assessmentData);
        res.status(201).json({
            message: 'Assessment created successfully',
            data: newAssessment,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating assessment',
            error: error.message,
        });
    }
});

// Route to get all assessments
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const assessments = await assessmentService.getAllAssessments();
        res.status(200).json({
            message: 'Assessments retrieved successfully',
            data: assessments,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving assessments',
            error: error.message,
        });
    }
});

// Route to get an assessment by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const assessment = await assessmentService.getAssessmentById(id);
        res.status(200).json({
            message: 'Assessment retrieved successfully',
            data: assessment,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving assessment',
            error: error.message,
        });
    }
});

// Route to get assessments by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const assessments = await assessmentService.getAssessmentsByEmployeeId(employeeId);
        res.status(200).json({
            message: 'Assessments retrieved successfully',
            data: assessments,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving assessments',
            error: error.message,
        });
    }
});

// Route to update an assessment
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedAssessment = await assessmentService.updateAssessment(id, updateData);
        res.status(200).json({
            message: 'Assessment updated successfully',
            data: updatedAssessment,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error updating assessment',
            error: error.message,
        });
    }
});

// Route to delete an assessment
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAssessment = await assessmentService.deleteAssessment(id);
        res.status(200).json({
            message: 'Assessment deleted successfully',
            data: deletedAssessment,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error deleting assessment',
            error: error.message,
        });
    }
});

module.exports = router;
