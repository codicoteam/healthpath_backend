const express = require("express");
const router = express.Router();
const medicineService = require("../services/pharmacyMedicineService");

// Route to create a new medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = await medicineService.createMedicine(req.body);
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await medicineService.getAllMedicines();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a medicine by its ID
router.get("/:id", async (req, res) => {
  try {
    const medicine = await medicineService.getMedicineById(req.params.id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to get medicines by pharmacy ID
router.get("/pharmacy/:pharmacyId", async (req, res) => {
  try {
    const medicines = await medicineService.getMedicinesByPharmacyId(
      req.params.pharmacyId
    );
    res.status(200).json(medicines);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to update a medicine by its ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMedicine = await medicineService.updateMedicine(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a medicine by its ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await medicineService.deleteMedicine(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to search medicines by a query (e.g., category, price range)
router.get("/search", async (req, res) => {
  try {
    const query = req.query;
    const medicines = await medicineService.searchMedicines(query);
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
