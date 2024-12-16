const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        criteria: [
            {
                type: Object,
                required: true,
            },
        ],
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100, // Ensures score is between 0 and 100
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Assessment", assessmentSchema);
