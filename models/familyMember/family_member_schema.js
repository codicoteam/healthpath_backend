const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const familyMemberSchema = new mongoose.Schema({
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

    relationshipToClient: {
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
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client", // Reference to the Client model
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving
familyMemberSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
