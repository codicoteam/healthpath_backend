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
  },
  price: { type: Number, required: true },
  regularPrice: { type: Number },
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
  },
  dosage: {
    infants: { type: String, default: "Not recommended" },
    children: { type: String },
    adults: { type: String },
    elderly: { type: String },
  },
  requiresPrescription: { type: Boolean, default: false },
  images: { type: [String], default: [] }, // Added images field (array of strings)
});

module.exports = mongoose.model("Medicine", MedicineSchema);
