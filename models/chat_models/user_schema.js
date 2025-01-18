const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile_picture: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['Client', 'Care Professional', 'Family Member', 'Admin'], // Example services
  },
  online: { type: Boolean, default: false },
  lastSeen: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema);
