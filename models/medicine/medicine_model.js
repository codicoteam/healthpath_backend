const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  purpose: {
    type: String,
    required: true,
    enum: [
      "Pain Relief",
      "Antibiotic",
      "Allergy",
      "Cold & Flu",
      "Vitamin Supplement",
      "Digestive Aid",
      "Cardiovascular",
      "Diabetes",
      "Other",
    ],
  }, // Limited to common purposes
  price: { type: Number, required: true }, // Discounted or current selling price
  regularPrice: { type: Number }, // Original or regular price before any discounts
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
    required: true,
  },
  stock: { type: Number, required: true, default: 0 },
  category: {
    type: String,
    enum: [
      "Painkillers",
      "Antibiotics",
      "Supplements",
      "Antidepressants",
      "Antifungals",
      "Antivirals",
      "Hormones",
      "Respiratory",
      "Other",
    ],
  }, // Limited to predefined categories
  dosage: {
    infants: { type: String, default: "Not recommended" }, // Dosage for infants (0-2 years)
    children: { type: String }, // Dosage for children (2-12 years)
    adults: { type: String }, // Dosage for adults (12+ years)
    elderly: { type: String }, // Dosage for elderly patients (65+ years)
  },
  requiresPrescription: { type: Boolean, default: false }, // True if a prescription is required
});

module.exports = mongoose.model("Medicine", MedicineSchema);
