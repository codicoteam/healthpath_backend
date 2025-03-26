const express = require("express");
const router = express.Router();
const UploadPrescriptionService = require("../services/upload_prescriptionService");

// Create a new prescription upload
router.post("/", async (req, res) => {
  try {
    const { clientId, medicineId, imagePrescription } = req.body;
    const prescription = await UploadPrescriptionService.createPrescription(
      clientId,
      medicineId,
      imagePrescription
    );
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await UploadPrescriptionService.getAllPrescriptions();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single prescription by ID
router.get("/:id", async (req, res) => {
  try {
    const prescription = await UploadPrescriptionService.getPrescriptionById(
      req.params.id
    );
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all prescriptions by client ID
router.get("/client/:clientId", async (req, res) => {
  try {
    const prescriptions =
      await UploadPrescriptionService.getAllPrescriptionsByClientId(
        req.params.clientId
      );
    if (!prescriptions.length) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this client" });
    }
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update prescription by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPrescription =
      await UploadPrescriptionService.updatePrescription(
        req.params.id,
        req.body
      );
    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete prescription by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPrescription =
      await UploadPrescriptionService.deletePrescription(req.params.id);
    if (!deletedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
