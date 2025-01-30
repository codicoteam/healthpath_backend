const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },

    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract"],
        required: true,
    },
    workingHours: {
        startHour: {
            type: String,
            required: true,
        },
        endHour: {
            type: String,
            required: true,
        },
    },
    hasCar: {
        type: Boolean,
        default: false,
        default:""

    },
    carDetails: {
        type: String,

    },
    insurance: {
        type: Boolean,
        default: false,
    },
    insuranceDetails: {
        type: String,
        default:""
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving
employeeSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Hash password before updating a client
employeeSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    
    // Check if password is being updated
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
    
    next();
});


module.exports = mongoose.model("Employee", employeeSchema);
