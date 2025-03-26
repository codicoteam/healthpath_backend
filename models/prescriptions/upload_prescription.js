const mongoose = require("mongoose");

const UplodePrescriptionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },

    imagePrescription: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"], // Added status field with enums
      default: "Pending", // Default status is 'Pending'
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("UploadPrescription", UplodePrescriptionSchema);
