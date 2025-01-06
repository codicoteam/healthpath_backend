const ClientBooking = require('../models/appointments/appointment_model'); // Adjust the path as per your project structure

// Service to create a new booking
const createBooking = async (bookingData) => {
  try {
    const newBooking = new ClientBooking(bookingData);
    await newBooking.save();
    return newBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all bookings (populate clientId)
const getAllBookings = async () => {
  try {
    const bookings = await ClientBooking.find().populate('clientId'); // Populates clientId with client details
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get a booking by ID (populate clientId)
const getBookingById = async (id) => {
  try {
    const booking = await ClientBooking.findById(id).populate('clientId'); // Populates clientId with client details
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get bookings by client ID (populate clientId)
const getBookingsByClientId = async (clientId) => {
  try {
    const bookings = await ClientBooking.find({ clientId }).populate('clientId'); // Populates clientId with client details
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to update a booking by ID (does not populate by default)
const updateBooking = async (id, updateData) => {
  try {
    const updatedBooking = await ClientBooking.findByIdAndUpdate(id, updateData, { new: true }).populate('clientId');
    if (!updatedBooking) {
      throw new Error('Booking not found');
    }
    return updatedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to delete a booking by ID (no population needed)
const deleteBooking = async (id) => {
  try {
    const deletedBooking = await ClientBooking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new Error('Booking not found');
    }
    return deletedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByClientId,
  updateBooking,
  deleteBooking,
};
