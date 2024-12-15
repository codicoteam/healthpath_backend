const Medication = require("../models/medication/medicine_schema"); // Adjust the path as per your project structure

// Service to create a new medication
const createMedication = async (medicationData) => {
  try {
    const newMedication = new Medication(medicationData);
    await newMedication.save();
    return newMedication;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all medications
const getAllMedications = async () => {
  try {
    const medications = await Medication.find()
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("clientId", "firstName lastName email")
      .populate("prescribedBy", "firstName lastName email");
    return medications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch a medication by ID
const getMedicationById = async (id) => {
  try {
    const medication = await Medication.findById(id)
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("clientId", "firstName lastName email")
      .populate("prescribedBy", "firstName lastName email");
    if (!medication) {
      throw new Error("Medication not found");
    }
    return medication;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch medications by visit ID
const getMedicationsByVisitId = async (visitId) => {
  try {
    const medications = await Medication.find({ visitId })
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("clientId", "firstName lastName email")

      .populate("prescribedBy", "firstName lastName email");
    return medications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch medications by visit ID
const getMedicationsByClientid = async (clientId) => {
  try {
    const medications = await Medication.find({ clientId })
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("clientId", "firstName lastName email")
      .populate("prescribedBy", "firstName lastName email");
    return medications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch medications by status
const getMedicationsByStatus = async (status) => {
  try {
    const medications = await Medication.find({ status })
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("prescribedBy", "firstName lastName email");
    return medications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to update a medication
const updateMedication = async (id, updateData) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("visitId", "DateOfVisit startTime endTime status")
      .populate("prescribedBy", "firstName lastName email");
    if (!updatedMedication) {
      throw new Error("Medication not found");
    }
    return updatedMedication;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to delete a medication
const deleteMedication = async (id) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(id);
    if (!deletedMedication) {
      throw new Error("Medication not found");
    }
    return deletedMedication;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createMedication,
  getAllMedications,
  getMedicationById,
  getMedicationsByVisitId,
  getMedicationsByStatus,
  updateMedication,
  deleteMedication,
  getMedicationsByClientid
};
