const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema(
    {
        visitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
            required: true,
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        images: [
            {
                type: String, // URL of the image
                required: false, // Optional field
            }
        ],
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Observation", observationSchema);
