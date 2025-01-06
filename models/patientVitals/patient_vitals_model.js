const mongoose = require('mongoose');

const patientVitalsSchema = new mongoose.Schema({
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit', // Reference to the visit document
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the patient document
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
        min: 34, // Minimum realistic body temperature in Celsius
        max: 42, // Maximum realistic body temperature in Celsius
    },
    bloodPressure: {
        systolic: {
            type: Number,
            required: true,
            min: 80, // Minimum realistic systolic pressure
            max: 200, // Maximum realistic systolic pressure
        },
        diastolic: {
            type: Number,
            required: true,
            min: 40, // Minimum realistic diastolic pressure
            max: 120, // Maximum realistic diastolic pressure
        },
    },
    heartRate: {
        type: Number,
        required: true,
        min: 40, // Minimum realistic heart rate
        max: 180, // Maximum realistic heart rate
    },
    respiratoryRate: {
        type: Number,
        required: true,
        min: 8, // Minimum realistic respiratory rate
        max: 40, // Maximum realistic respiratory rate
    },
    oxygenSaturation: {
        type: Number,
        required: true,
        min: 70, // Minimum realistic oxygen saturation in percentage
        max: 100, // Maximum oxygen saturation in percentage
    },
    recordedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    notes: {
        type: String,
        maxlength: 500, // Optional notes with a character limit
    },
});

module.exports = mongoose.model('PatientVitals', patientVitalsSchema);
