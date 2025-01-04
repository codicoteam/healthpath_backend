const Runner = require('../models/router_runner_schema.js/runner_schema'); // Adjust the path as per your project structure

// Service to create a new runner
const createRunner = async (runnerData) => {
    try {
        const newRunner = new Runner(runnerData);
        await newRunner.save();
        return newRunner;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all runners
const getAllRunners = async () => {
    try {
        const runners = await Runner.find()
            .populate('employeeId', 'firstName lastName email')
            .populate({
                path: 'visits',
                populate: {
                    path: 'clientId careProfessionalId'                }
            });
        return runners;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a runner by ID
const getRunnerById = async (id) => {
    try {
        const runner = await Runner.findById(id)
            .populate('employeeId', 'firstName lastName email')
            .populate({
                path: 'visits',
                populate: {
                    path: 'clientId careProfessionalId'                }
            });
        if (!runner) {
            throw new Error('Runner not found');
        }
        return runner;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch runners by employee ID
const getRunnersByEmployeeId = async (employeeId) => {
    try {
        const runners = await Runner.find({ employeeId })
            .populate('employeeId', 'firstName lastName email')
            .populate({
                path: 'visits',
                populate: {
                    path: 'clientId careProfessionalId'                }
            });
        return runners;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a runner
const updateRunner = async (id, updateData) => {
    try {
        const updatedRunner = await Runner.findByIdAndUpdate(id, updateData, { new: true })
            .populate('employeeId', 'firstName lastName email')
            .populate({
                path: 'visits',
                populate: {
                    path: 'clientId careProfessionalId'                }
            });
        if (!updatedRunner) {
            throw new Error('Runner not found');
        }
        return updatedRunner;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a runner
const deleteRunner = async (id) => {
    try {
        const deletedRunner = await Runner.findByIdAndDelete(id);
        if (!deletedRunner) {
            throw new Error('Runner not found');
        }
        return deletedRunner;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createRunner,
    getAllRunners,
    getRunnerById,
    getRunnersByEmployeeId,
    updateRunner,
    deleteRunner,
};
