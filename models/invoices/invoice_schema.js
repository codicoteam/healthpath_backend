const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        familyMemberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyMember",
            required: false, // Optional field
            default:""
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dateIssued: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Paid"],
            required: true,
        },
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Invoice", invoiceSchema);
