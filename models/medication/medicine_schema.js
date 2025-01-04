const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        prescribedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        visitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Taken"],
            default: "Pending",
            required: true,
        },
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Medication", medicationSchema);
