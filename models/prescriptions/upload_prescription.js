const mongoose = require("mongoose");

const UplodePrescriptionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    imagePrescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically manages createdAt and updatedAt fields

module.exports = mongoose.model("UploadPrescription", UplodePrescriptionSchema);
