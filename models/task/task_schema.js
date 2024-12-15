const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visit",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
        required: true,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
}, { timestamps: true }); // Automatically manages createdAt and updatedAt fields

module.exports = mongoose.model("Task", taskSchema);
