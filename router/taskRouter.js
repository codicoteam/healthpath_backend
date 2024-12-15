const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new task
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json({
            message: 'Task created successfully',
            data: newTask,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
});

// Route to get all tasks
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json({
            message: 'Tasks retrieved successfully',
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving tasks',
            error: error.message,
        });
    }
});

// Route to fetch a task by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.getTaskById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task retrieved successfully',
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving task',
            error: error.message,
        });
    }
});

// Route to fetch tasks by visit ID
router.get('/visit/:visitId', authenticateToken, async (req, res) => {
    try {
        const visitId = req.params.visitId;
        const tasks = await taskService.getTasksByVisitId(visitId);
        res.status(200).json({
            message: 'Tasks for visit retrieved successfully',
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving tasks for visit',
            error: error.message,
        });
    }
});

// Route to fetch tasks by status
router.get('/status/:status', authenticateToken, async (req, res) => {
    try {
        const status = req.params.status;
        const tasks = await taskService.getTasksByStatus(status);
        res.status(200).json({
            message: 'Tasks by status retrieved successfully',
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving tasks by status',
            error: error.message,
        });
    }
});

// Route to update a task
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;
        const updatedTask = await taskService.updateTask(taskId, updateData);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task',
            error: error.message,
        });
    }
});

// Route to delete a task
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await taskService.deleteTask(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task deleted successfully',
            data: deletedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting task',
            error: error.message,
        });
    }
});

module.exports = router;
