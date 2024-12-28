const Observation = require("../models/observation/observation_schema"); // Adjust the path as per your project structure

// Service to create a new observation
const createObservation = async (observationData) => {
  try {
    const newObservation = new Observation(observationData);
    await newObservation.save();
    return newObservation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all observations
const getAllObservations = async () => {
  try {
    const observations = await Observation.find()
      .populate("visitId")
      .populate("employeeId");
    return observations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch an observation by ID
const getObservationById = async (id) => {
  try {
    const observation = await Observation.findById(id)
      .populate("visitId")
      .populate("employeeId");
    if (!observation) {
      throw new Error("Observation not found");
    }
    return observation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch observations by visit ID
const getObservationsByVisitId = async (visitId) => {
  try {
    const observations = await Observation.find({ visitId })
      .populate("visitId")
      .populate("employeeId");
    return observations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch observations by employee ID
const getObservationsByEmployeeId = async (employeeId) => {
  try {
    const observations = await Observation.find({ employeeId })
      .populate("visitId")
      .populate("employeeId");
    return observations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to update an observation
const updateObservation = async (id, updateData) => {
  try {
    const updatedObservation = await Observation.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("visitId")
      .populate("employeeId");
    if (!updatedObservation) {
      throw new Error("Observation not found");
    }
    return updatedObservation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to delete an observation
const deleteObservation = async (id) => {
  try {
    const deletedObservation = await Observation.findByIdAndDelete(id);
    if (!deletedObservation) {
      throw new Error("Observation not found");
    }
    return deletedObservation;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createObservation,
  getAllObservations,
  getObservationById,
  getObservationsByVisitId,
  getObservationsByEmployeeId,
  updateObservation,
  deleteObservation,
};
