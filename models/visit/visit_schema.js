const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    careProfessionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        address:{
            type: String,
            required: true
        }
    },
    amount_paid_per_hour: {
        type: String,
        required: true,
    },
    
    DateOfVisit: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Scheduled", "Confirmed", "Ongoing", "Completed"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    officialVisitTime: {
        type: String,
        default: "",
    },
    officialEndTime: {
        type: String,
        default: "",
    },
}, { timestamps: true }); // Automatically manages createdAt and updatedAt fields

module.exports = mongoose.model("Visit", visitSchema);
