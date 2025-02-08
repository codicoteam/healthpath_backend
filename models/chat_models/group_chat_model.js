const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  users: [{ type: String, ref: 'User' }], // Store userId instead of ObjectId
});

module.exports = mongoose.model('Group', groupSchema);
