const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" }, // GeoJSON format
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  contact: {
    phone: { type: String },
    email: { type: String },
    website: { type: String }, // Pharmacy website URL
  },
  logoImage: { type: String }, // URL or path to the logo image
  openingHours: {
    monday: { type: String, default: "08:00 - 18:00" },
    tuesday: { type: String, default: "08:00 - 18:00" },
    wednesday: { type: String, default: "08:00 - 18:00" },
    thursday: { type: String, default: "08:00 - 18:00" },
    friday: { type: String, default: "08:00 - 18:00" },
    saturday: { type: String, default: "08:00 - 14:00" },
    sunday: { type: String, default: "Closed" },
  },
  services: [{ type: String }], // List of services provided (e.g., Blood Pressure Check, Vaccinations)
  is24Hours: { type: Boolean, default: false }, // Whether the pharmacy operates 24/7
  licenseNumber: { type: String, required: true }, // Pharmacy license number
  owner: { type: String, required: true }, // Name of the owner or pharmacist in charge

  medicalAids: [{ type: String }], // List of accepted medical aid providers
});

PharmacySchema.index({ location: "2dsphere" }); // Index for geo queries

module.exports = mongoose.model("Pharmacy", PharmacySchema);
