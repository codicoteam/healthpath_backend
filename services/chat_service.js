const User = require("../models/chat_models/user_schema");
const Group = require("../models/chat_models/group_chat_model");
const Message = require("../models/chat_models/message_models");

const addUserToGroup = async (userId, groupId) => {
  const group = await Group.findOneAndUpdate(
    { groupId },
    { $addToSet: { users: userId } }, // Ensure no duplicates
    { upsert: true, new: true }
  );
  return group;
};

const getUsersInGroup = async (groupId) => {
  const group = await Group.findOne({ groupId }).populate("users");
  return group ? group.users : [];
};

const saveMessage = async ({ groupId, senderId, images, message }) => {
  const newMessage = await Message.create({
    groupId,
    sender: senderId,
    images,
    message,
  });
  return newMessage;
};

const saveGroup = async (groupId) => {
  const group = new Group({ groupId });
  return group.save();
};

const saveUser = async (
  email,
  first_name,
  last_name,
  profile_picture,
  role,
  userId,
  online = false,
  lastSeen = null
) => {
  // Check if user already exists with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create a new user if not exists
  const user = new User({
    userId,
    email,
    first_name,
    last_name,
    profile_picture,
    role,
    online,
    lastSeen,
  });

  return user.save(); // Save the new user to the database
};
const getMessagesInGroup = async (groupId) => {
  return Message.find({ groupId }).populate("sender"); // Include sender details
};

async function updateUserStatus(socketId, online, lastSeen) {
  try {
    const user = await User.findOneAndUpdate(
      { socketId },
      { online, lastSeen },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
}
// New service function to find user by userId
const getUserById = async (userId) => {
    return User.findById(userId);
  };

module.exports = {
  addUserToGroup,
  getUsersInGroup,
  saveMessage,
  saveGroup,
  saveUser,
  getMessagesInGroup,
  updateUserStatus,
  getUserById
};
