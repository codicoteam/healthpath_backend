const express = require("express");
const router = express.Router();
const medicineService = require("../services/pharmacyMedicineService");
const { authenticateToken } = require("../middleware/auth");

// Route to create a new medicine
router.post("/create_medicine", authenticateToken, async (req, res) => {
  try {
    const newMedicine = await medicineService.createMedicine(req.body);
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all medicines
router.get("/get_all_medicines", authenticateToken, async (req, res) => {
  try {
    const medicines = await medicineService.getAllMedicines();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get medicines with pagination
router.get("/get_paginated_medicines", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const medicinesData = await medicineService.getAllMedicineswithpagiation(
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      medicines: medicinesData.medicines,
      totalCount: medicinesData.totalCount,
      totalPages: medicinesData.totalPages,
      currentPage: medicinesData.currentPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a medicine by ID
router.get("/get_medicine/:id", authenticateToken, async (req, res) => {
  try {
    const medicine = await medicineService.getMedicineById(req.params.id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to get medicines by pharmacy ID
router.get(
  "/get_medicines_by_pharmacy/:pharmacyId",
  authenticateToken,
  async (req, res) => {
    try {
      const medicines = await medicineService.getMedicinesByPharmacyId(
        req.params.pharmacyId
      );
      res.status(200).json(medicines);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

// Route to get paginated medicines by pharmacy ID
router.get(
  "/get_paginated_medicines_by_pharmacy/:pharmacyId",
  authenticateToken,
  async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const medicinesData =
        await medicineService.getMedicinesByPharmacyIdwithpagination(
          req.params.pharmacyId,
          Number(page),
          Number(limit)
        );

      res.status(200).json({
        medicines: medicinesData.medicines,
        totalCount: medicinesData.totalCount,
        totalPages: medicinesData.totalPages,
        currentPage: medicinesData.currentPage,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

// Route to update a medicine by ID
router.put("/update_medicine/:id", authenticateToken, async (req, res) => {
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

// Route to delete a medicine by ID
router.delete("/delete_medicine/:id", authenticateToken, async (req, res) => {
  try {
    const result = await medicineService.deleteMedicine(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to search medicines by query
router.get("/search_medicines", authenticateToken, async (req, res) => {
  try {
    const query = req.query;
    const medicines = await medicineService.searchMedicines(query);
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
