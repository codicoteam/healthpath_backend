const Medicine = require("../models/medicine/medicine_model"); // Adjust the path as necessary

// Create a new medicine
const createMedicine = async (medicineData) => {
  try {
    const medicine = new Medicine(medicineData);
    await medicine.save();
    return medicine;
  } catch (error) {
    throw new Error("Error creating medicine: " + error.message);
  }
};

// Get all medicines
const getAllMedicines = async () => {
  try {
    const medicines = await Medicine.find().populate("pharmacy");
    return medicines;
  } catch (error) {
    throw new Error("Error fetching medicines: " + error.message);
  }
};

// Get a single medicine by its ID
const getMedicineById = async (medicineId) => {
  try {
    const medicine = await Medicine.findById(medicineId).populate("pharmacy");
    if (!medicine) {
      throw new Error("Medicine not found");
    }
    return medicine;
  } catch (error) {
    throw new Error("Error fetching medicine: " + error.message);
  }
};

// Get medicines by pharmacy ID
const getMedicinesByPharmacyId = async (pharmacyId) => {
  try {
    const medicines = await Medicine.find({ pharmacy: pharmacyId }).populate(
      "pharmacy"
    );
    if (!medicines || medicines.length === 0) {
      throw new Error("No medicines found for this pharmacy");
    }
    return medicines;
  } catch (error) {
    throw new Error(
      "Error fetching medicines by pharmacy ID: " + error.message
    );
  }
};

// Update a medicine by its ID
const updateMedicine = async (medicineId, updateData) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(medicineId, updateData, {
      new: true, // Returns the updated document
    });
    if (!medicine) {
      throw new Error("Medicine not found");
    }
    return medicine;
  } catch (error) {
    throw new Error("Error updating medicine: " + error.message);
  }
};

// Delete a medicine by its ID
const deleteMedicine = async (medicineId) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(medicineId);
    if (!medicine) {
      throw new Error("Medicine not found");
    }
    return { message: "Medicine deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting medicine: " + error.message);
  }
};

// Search medicines by query (e.g., by category, price range, etc.)
const searchMedicines = async (query) => {
  try {
    const medicines = await Medicine.find(query).populate("pharmacy");
    return medicines;
  } catch (error) {
    throw new Error("Error searching medicines: " + error.message);
  }
};

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  getMedicinesByPharmacyId, // Added function to get medicines by pharmacyId
  updateMedicine,
  deleteMedicine,
  searchMedicines,
};
