const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: { type: String, required: true },
  senderId: { type: String, required: true },
  first_name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  images: { type: [String], default: [] } // List of image locations (optional field)
});

module.exports = mongoose.model('Message', messageSchema);
