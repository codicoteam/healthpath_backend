const Visit = require('../models/visit/visit_schema'); // Adjust the path as per your project structure

// Service to create a new visit
const createVisit = async (visitData) => {
    try {
        const newVisit = new Visit(visitData);
        await newVisit.save();
        return newVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all visits
const getAllVisits = async () => {
    try {
        const visits = await Visit.find()
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName lastName email');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a visit by ID
const getVisitById = async (id) => {
    try {
        const visit = await Visit.findById(id)
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName lastName email');
        if (!visit) {
            throw new Error('Visit not found');
        }
        return visit;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch visits by client ID
const getVisitsByClientId = async (clientId) => {
    try {
        const visits = await Visit.find({ clientId })
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName email');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch visits by client ID
const getVisitsByEmployeeid = async (careProfessionalId) => {
    try {
        const visits = await Visit.find({ careProfessionalId })
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName lastName email');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Service to update a visit
const updateVisit = async (id, updateData) => {
    try {
        const updatedVisit = await Visit.findByIdAndUpdate(id, updateData, { new: true })
            .populate('clientId', 'firstName lastName')
            .populate('careProfessionalId', 'firstName lastName');
        if (!updatedVisit) {
            throw new Error('Visit not found');
        }
        return updatedVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getVisitsByClientIdAndDate = async (clientId, DateOfVisit) => {
    try {
        const visits = await Visit.find({ clientId, DateOfVisit })
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName lastName email');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getVisitsByEmployeeIdAndDate = async (careProfessionalId, DateOfVisit) => {
    try {
        const visits = await Visit.find({ careProfessionalId, DateOfVisit })
            .populate('clientId', 'firstName lastName email')
            .populate('careProfessionalId', 'firstName lastName email');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Service to delete a visit
const deleteVisit = async (id) => {
    try {
        const deletedVisit = await Visit.findByIdAndDelete(id);
        if (!deletedVisit) {
            throw new Error('Visit not found');
        }
        return deletedVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createVisit,
    getAllVisits,
    getVisitById,
    getVisitsByClientId,
    updateVisit,
    getVisitsByClientIdAndDate,
    getVisitsByEmployeeIdAndDate,
    getVisitsByEmployeeid,
    deleteVisit,
};
