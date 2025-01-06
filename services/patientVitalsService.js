const PatientVitals = require('../models/patientVitals/patient_vitals_model'); // Adjust the path as per your project structure

// Service to create a new patient vital record
const createPatientVitals = async (vitalsData) => {
    try {
        const newVitals = new PatientVitals(vitalsData);
        await newVitals.save();
        return newVitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all patient vital records
const getAllPatientVitals = async () => {
    try {
        const vitals = await PatientVitals.find()
            .populate('visitId')
            .populate('patientId');
        return vitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get a patient vital record by ID
const getPatientVitalsById = async (id) => {
    try {
        const vitals = await PatientVitals.findById(id)
            .populate('visitId')
            .populate('patientId');
        if (!vitals) {
            throw new Error('Patient vitals not found');
        }
        return vitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get patient vital records by patient ID
const getPatientVitalsByPatientId = async (patientId) => {
    try {
        const vitals = await PatientVitals.find({ patientId })
            .populate('visitId')
            .populate('patientId');
        return vitals;
    } catch (error) {
        throw new Error(error.message);
    }
};




// Service to get patient vital records by patient ID
const getPatientVitalsByVisitId = async (visitId) => {
    try {
        const vitals = await PatientVitals.find({ visitId })
            .populate('visitId')
            .populate('patientId');
        return vitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a patient vital record by ID
const updatePatientVitals = async (id, updateData) => {
    try {
        const updatedVitals = await PatientVitals.findByIdAndUpdate(id, updateData, { new: true })
            .populate('visitId')
            .populate('patientId');
        if (!updatedVitals) {
            throw new Error('Patient vitals not found');
        }
        return updatedVitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a patient vital record by ID
const deletePatientVitals = async (id) => {
    try {
        const deletedVitals = await PatientVitals.findByIdAndDelete(id);
        if (!deletedVitals) {
            throw new Error('Patient vitals not found');
        }
        return deletedVitals;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createPatientVitals,
    getAllPatientVitals,
    getPatientVitalsById,
    getPatientVitalsByPatientId,
    updatePatientVitals,
    deletePatientVitals,
    getPatientVitalsByVisitId
};
