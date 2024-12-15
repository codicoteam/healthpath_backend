const Task = require('../models/task/task_schema'); // Adjust the path as per your project structure

// Service to create a new task
const createTask = async (taskData) => {
    try {
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all tasks
const getAllTasks = async () => {
    try {
        const tasks = await Task.find()
            .populate('visitId', 'DateOfVisit startTime endTime status')
            .populate('assignedBy', 'firstName lastName email');
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a task by ID
const getTaskById = async (id) => {
    try {
        const task = await Task.findById(id)
            .populate('visitId', 'DateOfVisit startTime endTime status')
            .populate('assignedBy', 'firstName lastName email');
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch tasks by visit ID
const getTasksByVisitId = async (visitId) => {
    try {
        const tasks = await Task.find({ visitId })
            .populate('visitId', 'DateOfVisit startTime endTime status')
            .populate('assignedBy', 'firstName lastName email');
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch tasks by status
const getTasksByStatus = async (status) => {
    try {
        const tasks = await Task.find({ status })
            .populate('visitId', 'DateOfVisit startTime endTime status')
            .populate('assignedBy', 'firstName lastName email');
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a task
const updateTask = async (id, updateData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true })
            .populate('visitId', 'DateOfVisit startTime endTime status')
            .populate('assignedBy', 'firstName lastName email');
        if (!updatedTask) {
            throw new Error('Task not found');
        }
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a task
const deleteTask = async (id) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new Error('Task not found');
        }
        return deletedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    getTasksByVisitId,
    getTasksByStatus,
    updateTask,
    deleteTask,
};
