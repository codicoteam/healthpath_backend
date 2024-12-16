const Assessment = require('../models/assessments/assessment'); // Adjust the path as per your project structure

// Service to create a new assessment
const createAssessment = async (assessmentData) => {
    try {
        const newAssessment = new Assessment(assessmentData);
        await newAssessment.save();
        return newAssessment;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all assessments
const getAllAssessments = async () => {
    try {
        const assessments = await Assessment.find()
            .populate('employeeId', 'firstName lastName email')
            .populate('adminId', 'firstName lastName email');
        return assessments;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch an assessment by ID
const getAssessmentById = async (id) => {
    try {
        const assessment = await Assessment.findById(id)
            .populate('employeeId', 'firstName lastName email')
            .populate('adminId', 'firstName lastName email');
        if (!assessment) {
            throw new Error('Assessment not found');
        }
        return assessment;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch assessments by employee ID
const getAssessmentsByEmployeeId = async (employeeId) => {
    try {
        const assessments = await Assessment.find({ employeeId })
            .populate('employeeId', 'firstName lastName email')
            .populate('adminId', 'firstName lastName email');
        return assessments;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update an assessment
const updateAssessment = async (id, updateData) => {
    try {
        const updatedAssessment = await Assessment.findByIdAndUpdate(id, updateData, { new: true })
            .populate('employeeId', 'firstName lastName')
            .populate('adminId', 'firstName lastName');
        if (!updatedAssessment) {
            throw new Error('Assessment not found');
        }
        return updatedAssessment;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Service to delete an assessment
const deleteAssessment = async (id) => {
    try {
        const deletedAssessment = await Assessment.findByIdAndDelete(id);
        if (!deletedAssessment) {
            throw new Error('Assessment not found');
        }
        return deletedAssessment;
    } catch (error) {
        throw new Error(error.message);
    }
};




module.exports = {
    createAssessment,
    getAllAssessments,
    getAssessmentById,
    getAssessmentsByEmployeeId,
    updateAssessment,
    deleteAssessment,
};
