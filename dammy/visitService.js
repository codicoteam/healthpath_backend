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
module.exports = {
    createVisit,
    getAllVisits,
};
