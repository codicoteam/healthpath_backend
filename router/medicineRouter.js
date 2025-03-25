const express = require("express");
const router = express.Router();
const medicationService = require("../services/medicineService"); // Adjust the path as per your project structure
const { authenticateToken } = require("../middleware/auth");

// Route to create a new medication
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const medicationData = req.body;
    const newMedication = await medicationService.createMedication(
      medicationData
    );
    res.status(201).json({
      message: "Medication created successfully",
      data: newMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating medication",
      error: error.message,
    });
  }
});

// Route to get all medications
router.get("/getall", authenticateToken, async (req, res) => {
  try {
    const medications = await medicationService.getAllMedications();
    res.status(200).json({
      message: "Medications retrieved successfully",
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medications",
      error: error.message,
    });
  }
});

// Route to fetch a medication by ID
router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    const medicationId = req.params.id;
    const medication = await medicationService.getMedicationById(medicationId);
    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.status(200).json({
      message: "Medication retrieved successfully",
      data: medication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medication",
      error: error.message,
    });
  }
});

// Route to fetch medications by visit ID
router.get("/visit/:visitId", authenticateToken, async (req, res) => {
  try {
    const visitId = req.params.visitId;
    const medications = await medicationService.getMedicationsByVisitId(
      visitId
    );
    res.status(200).json({
      message: "Medications for visit retrieved successfully",
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medications for visit",
      error: error.message,
    });
  }
});

// Route to fetch medications by visit ID
router.get("/client/:clientId", authenticateToken, async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const medications = await medicationService.getMedicationsByClientid(
      clientId
    );
    res.status(200).json({
      message: "Medications for visit retrieved successfully",
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medications for visit",
      error: error.message,
    });
  }
});

// Route to fetch medications by status
router.get("/status/:status", authenticateToken, async (req, res) => {
  try {
    const status = req.params.status;
    const medications = await medicationService.getMedicationsByStatus(status);
    res.status(200).json({
      message: "Medications by status retrieved successfully",
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medications by status",
      error: error.message,
    });
  }
});

// Route to update a medication
router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const medicationId = req.params.id;
    const updateData = req.body;
    const updatedMedication = await medicationService.updateMedication(
      medicationId,
      updateData
    );
    if (!updatedMedication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.status(200).json({
      message: "Medication updated successfully",
      data: updatedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating medication",
      error: error.message,
    });
  }
});

// Route to delete a medication
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const medicationId = req.params.id;
    const deletedMedication = await medicationService.deleteMedication(
      medicationId
    );
    if (!deletedMedication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.status(200).json({
      message: "Medication deleted successfully",
      data: deletedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting medication",
      error: error.message,
    });
  }
});

module.exports = router;
