const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    medicalAidInfo: {
        type: String,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // Optional: Enum to restrict values
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    allergies: {
        type: [String], // Array of Strings
    },
    email: {
        type: String,
        unique: true, // Ensures email is unique
        required: true,
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    familyMemberIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyMember", // References Family Member collection
            default: [], // Default to an empty array
        },
    ],
    medicalHistory: [
        {
            condition: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ["Ongoing", "Resolved", "Chronic"], // Optional: Enum to restrict values
                required: true,
            },
        },
    ],
});

// Hash password before saving
clientSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Hash password before updating a client
clientSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    
    // Check if password is being updated
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
    
    next();
});

module.exports = mongoose.model("Client", clientSchema);