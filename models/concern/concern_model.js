const mongoose = require('mongoose');

const ConcernSchema = new mongoose.Schema({
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the healthcare professional
        required: true,
    },
    concernType: {
        type: String,
        enum: ['Medication Issue', 'Health Deterioration', 'Equipment Need', 'Other'], // Types of concerns
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open',
    },
    raisedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Concern', ConcernSchema);
