const express = require("express");
const router = express.Router();
const pharmacyService = require("../services/pharmacyService");

// Route to create a new pharmacy
router.post("/create_pharmacies", async (req, res) => {
  try {
    const newPharmacy = await pharmacyService.createPharmacy(req.body);
    res.status(201).json(newPharmacy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all pharmacies
router.get("/get_all_pharmacies", async (req, res) => {
  try {
    const pharmacies = await pharmacyService.getAllPharmacies();
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pagination", async (req, res) => {
  try {
    // Get pagination parameters from query string, defaulting to page 1 and limit 10
    const { page = 1, limit = 10 } = req.query;
    const pharmaciesData = await pharmacyService.getAllPharmacieswithpagination(
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      pharmacies: pharmaciesData.pharmacies,
      totalCount: pharmaciesData.totalCount,
      totalPages: pharmaciesData.totalPages,
      currentPage: pharmaciesData.currentPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a pharmacy by ID
router.get("/get_pharmacy_by:id", async (req, res) => {
  try {
    const pharmacy = await pharmacyService.getPharmacyById(req.params.id);
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to update a pharmacy by ID
router.put("/update_pharmacy:id", async (req, res) => {
  try {
    const updatedPharmacy = await pharmacyService.updatePharmacyById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedPharmacy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a pharmacy by ID
router.delete("/:id", async (req, res) => {
  try {
    await pharmacyService.deletePharmacyById(req.params.id);
    res.status(200).json({ message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
