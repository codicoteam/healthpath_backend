const Pharmacy = require("../models/pharmacy/pharmacy_model"); // Adjust the path as per your project structure

// Service to create a new pharmacy
const createPharmacy = async (pharmacyData) => {
  try {
    // Check if a pharmacy with the same license number already exists
    const existingPharmacy = await Pharmacy.findOne({
      licenseNumber: pharmacyData.licenseNumber,
    });
    if (existingPharmacy) {
      throw new Error("Pharmacy with this license number already exists");
    }

    // Create and save a new pharmacy
    const newPharmacy = new Pharmacy(pharmacyData);
    await newPharmacy.save();
    return newPharmacy;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all pharmacies
const getAllPharmacies = async () => {
  try {
    return await Pharmacy.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllPharmacieswithpagination = async (page = 1, limit = 10) => {
  try {
    // Convert page and limit to integers, and set defaults if not provided
    const skip = (page - 1) * limit;

    const pharmacies = await Pharmacy.find()
      .skip(skip) // Skip documents based on page
      .limit(limit) // Limit the number of documents per page
      .exec();

    // Get total count of pharmacies for pagination info
    const totalCount = await Pharmacy.countDocuments();

    return {
      pharmacies,
      totalCount,
      totalPages: Math.ceil(totalCount / limit), // Calculate total pages
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get a pharmacy by ID
const getPharmacyById = async (pharmacyId) => {
  try {
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
      throw new Error("Pharmacy not found");
    }
    return pharmacy;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to update pharmacy details by ID
const updatePharmacyById = async (pharmacyId, updateData) => {
  try {
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPharmacy) {
      throw new Error("Pharmacy not found");
    }

    return updatedPharmacy;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to delete a pharmacy by ID
const deletePharmacyById = async (pharmacyId) => {
  try {
    const deletedPharmacy = await Pharmacy.findByIdAndDelete(pharmacyId);
    if (!deletedPharmacy) {
      throw new Error("Pharmacy not found");
    }
    return deletedPharmacy;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPharmacy,
  getAllPharmacies,
  getPharmacyById,
  updatePharmacyById,
  deletePharmacyById,
  getAllPharmacieswithpagination,
};
