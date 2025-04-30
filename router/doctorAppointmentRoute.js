const express = require('express');
const router = express.Router();
const doctorAppointmentService = require('../services/doctorAppointmentService');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

// Validation middleware for creating/updating appointments
const validateAppointment = [
  body('clientId').isMongoId().withMessage('Invalid client ID'),
  body('FullName').notEmpty().trim().withMessage('Full name is required'),
  body('PhoneNumber').notEmpty().withMessage('Phone number is required'),
  body('Gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('DateOfBirth').isDate().withMessage('Invalid date of birth'),
  body('AppointmentDetails').notEmpty().trim().withMessage('Appointment details are required'),
  body('alternative').isIn(['Cardiology','Pediatrics','Dermatology','Neurology','Orthopedics','Psychiatry','General Medicine','Gynecology','Ophthalmology','ENT']).withMessage('Invalid specialty'),
  body('AppointmentDate').isDate().withMessage('Invalid appointment date'),
  body('TimeSlot').isIn(['9:00 AM - 10:00 AM','10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 1:00 PM','1:00 PM - 2:00 PM','2:00 PM - 3:00 PM','3:00 PM - 4:00 PM','4:00 PM - 5:00 PM']).withMessage('Invalid time slot'),
  body('ReasonForVisit').notEmpty().trim().withMessage('Reason for visit is required'),
  body('MedicalHistory').isIn(['Diabetes','Hypertension','Heart Disease','Asthma','Allergies','Cancer','Chronic Pain','Obesity','Arthritis','Other']).withMessage('Invalid medical history'),
  body('emailAddress').optional().isEmail().withMessage('Invalid email address'),
  body('InsuranceDetails').optional().trim(),
  body('PolicyNumber').optional().trim()
];

// Create a new appointment
router.post('/createAppointment', validateAppointment, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const appointment = await doctorAppointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments
router.get('/allAppointments', async (req, res) => {
  try {
    const appointments = await doctorAppointmentService.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointment by ID
router.get('/appointmentBy/:id', async (req, res) => {
  try {
    const appointment = await doctorAppointmentService.getAppointmentById(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get all appointments for a client
router.get('/client/:clientId', async (req, res) => {
  try {
    const appointments = await doctorAppointmentService.getAppointmentsByClient(req.params.clientId);
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an appointment
router.put('updateBy/:id', validateAppointment, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const appointment = await doctorAppointmentService.updateAppointment(
      req.params.id,
      req.body
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an appointment
router.delete('/deleteBy/:id', async (req, res) => {
  try {
    const appointment = await doctorAppointmentService.deleteAppointment(req.params.id);
    res.json({ message: 'Appointment deleted successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get appointments by date range
router.get('/date-range/:startDate/:endDate', async (req, res) => {
  try {
    const appointments = await doctorAppointmentService.getAppointmentsByDateRange(
      req.params.startDate,
      req.params.endDate
    );
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get appointments by specialty
router.get('/specialty/:specialty', async (req, res) => {
  try {
    const appointments = await doctorAppointmentService.getAppointmentsBySpecialty(
      req.params.specialty
    );
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;