const mongoose = require("mongoose");

const MedicalReceiptsSchema = new mongoose.Schema(
  {
    pollUrl: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
    },
    showPayment: {
      type: Boolean,
      default: false,
    },

    currency: {
      type: String,
      required: true,
      default: "USD",
    },

    receiptNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },

    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalReceipt", MedicalReceiptsSchema);
