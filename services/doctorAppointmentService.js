// const doctorAppointment = require("../models/appointments/Doctor_Appointment_model");
const doctorAppointment = require("../models/appointments/doctorAppointment_model")
const mongoose = require('mongoose');

class DoctorAppointmentService {
  // Create a new appointment
  async createAppointment(appointmentData) {
    try {
      const appointment = new doctorAppointment(appointmentData);
      await appointment.save();
      return appointment;
    }
     catch (error) {
      throw new Error(`Error encountered during appointment creation: ${error.message}`);
    }
  }

  // Get appointment by ID
  async getAppointmentById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID');
      }
      const appointment = await doctorAppointment.findById(id).populate('clientId');
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error(`Error fetching appointment: ${error.message}`);
    }
  }

  // Get all appointments for a specific client
  async getAppointmentsByClient(clientId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        throw new Error('Invalid client ID');
      }
      const appointments = await doctorAppointment.find({ clientId }).populate('clientId');
      return appointments;
    } catch (error) {
      throw new Error(`Error fetching client appointments: ${error.message}`);
    }
  }

  // Update an appointment
  async updateAppointment(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID');
      }
      const appointment = await doctorAppointment.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error(`Error updating appointment: ${error.message}`);
    }
  }

  // Delete an appointment
  async deleteAppointment(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid appointment ID');
      }
      const appointment = await doctorAppointment.findByIdAndDelete(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error(`Error deleting appointment: ${error.message}`);
    }
  }

  // Get appointments by date range
  async getAppointmentsByDateRange(startDate, endDate) {
    try {
      const appointments = await doctorAppointment.find({
        AppointmentDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }).populate('clientId');
      return appointments;
    } catch (error) {
      throw new Error(`Error fetching appointments by date range: ${error.message}`);
    }
  }

  // Get appointments by specialty
  async getAppointmentsBySpecialty(specialty) {
    try {
      const appointments = await doctorAppointment.find({
        alternative: specialty
      }).populate('clientId');
      return appointments;
    } catch (error) {
      throw new Error(`Error fetching appointments by specialty: ${error.message}`);
    }
  }

  // Get all appointments
  async getAllAppointments() {
    try {
      const appointments = await doctorAppointment.find().populate('clientId');
      return appointments;
    } catch (error) {
      throw new Error(`Error fetching all appointments: ${error.message}`);
    }
  }
}

module.exports = new DoctorAppointmentService();