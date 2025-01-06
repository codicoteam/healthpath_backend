const Concern = require('../models/concern/concern_model'); // Adjust the path as per your project structure

// Service to create a new concern
const createConcern = async (concernData) => {
    try {
        const newConcern = new Concern(concernData);
        await newConcern.save();
        return newConcern;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all concerns
const getAllConcerns = async () => {
    try {
        const concerns = await Concern.find()
            .populate('visitId')
            .populate('patientId')
            .populate('professionalId');
        return concerns;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get a concern by ID
const getConcernById = async (id) => {
    try {
        const concern = await Concern.findById(id)
            .populate('visitId')
            .populate('patientId')
            .populate('professionalId');
        if (!concern) {
            throw new Error('Concern not found');
        }
        return concern;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get concerns by patient ID
const getConcernsByPatientId = async (patientId) => {
    try {
        const concerns = await Concern.find({ patientId })
            .populate('visitId')
            .populate('patientId')
            .populate('professionalId');
        return concerns;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get concerns by visit ID
const getConcernsByVisitId = async (visitId) => {
    try {
        const concerns = await Concern.find({ visitId })
            .populate('visitId')
            .populate('patientId')
            .populate('professionalId');
        return concerns;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a concern by ID
const updateConcern = async (id, updateData) => {
    try {
        const updatedConcern = await Concern.findByIdAndUpdate(id, updateData, { new: true })
            .populate('visitId')
            .populate('patientId')
            .populate('professionalId');
        if (!updatedConcern) {
            throw new Error('Concern not found');
        }
        return updatedConcern;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a concern by ID
const deleteConcern = async (id) => {
    try {
        const deletedConcern = await Concern.findByIdAndDelete(id);
        if (!deletedConcern) {
            throw new Error('Concern not found');
        }
        return deletedConcern;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createConcern,
    getAllConcerns,
    getConcernById,
    getConcernsByPatientId,
    getConcernsByVisitId,
    updateConcern,
    deleteConcern,
};
