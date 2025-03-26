const UploadPrescription = require("../models/prescriptions/upload_prescription");

class UploadPrescriptionService {
  // Create a new prescription upload
  static async createPrescription(clientId, medicineId, imagePrescription) {
    try {
      const newPrescription = new UploadPrescription({
        clientId,
        medicineId,
        imagePrescription,
      });
      return await newPrescription.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get all prescriptions with populated clientId and medicineId
  static async getAllPrescriptions() {
    try {
      return await UploadPrescription.find()
        .populate("clientId")
        .populate("medicineId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get a single prescription by ID with populated clientId and medicineId
  static async getPrescriptionById(id) {
    try {
      return await UploadPrescription.findById(id)
        .populate("clientId")
        .populate("medicineId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get all prescriptions for a specific clientId with populated medicineId
  static async getAllPrescriptionsByClientId(clientId) {
    try {
      return await UploadPrescription.find({ clientId })
        .populate("clientId")
        .populate("medicineId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update prescription by ID
  static async updatePrescription(id, updateData) {
    try {
      return await UploadPrescription.findByIdAndUpdate(id, updateData, {
        new: true,
      })
        .populate("clientId")
        .populate("medicineId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete prescription by ID
  static async deletePrescription(id) {
    try {
      return await UploadPrescription.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UploadPrescriptionService;
