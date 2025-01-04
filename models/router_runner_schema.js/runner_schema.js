const mongoose = require("mongoose");

const runnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    visits: [
        {
            type:  mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: "Visit"
        }
    ],
    dateAssigned: {
        type: Date,
        required: true,
    },
});


module.exports = mongoose.model("Runner", runnerSchema);
