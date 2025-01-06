const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new booking
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        res.status(201).json({
            message: 'Booking created successfully',
            data: newBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message,
        });
    }
});

// Route to get all bookings (populates clientId)
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json({
            message: 'Bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error: error.message,
        });
    }
});

// Route to get a booking by ID (populates clientId)
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingService.getBookingById(id);
        res.status(200).json({
            message: 'Booking retrieved successfully',
            data: booking,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving booking',
            error: error.message,
        });
    }
});

// Route to get bookings by client ID (populates clientId)
router.get('/client/:clientId', authenticateToken, async (req, res) => {
    try {
        const { clientId } = req.params;
        const bookings = await bookingService.getBookingsByClientId(clientId);
        res.status(200).json({
            message: 'Bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error: error.message,
        });
    }
});

// Route to update a booking by ID
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedBooking = await bookingService.updateBooking(id, updateData);
        res.status(200).json({
            message: 'Booking updated successfully',
            data: updatedBooking,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error updating booking',
            error: error.message,
        });
    }
});

// Route to delete a booking by ID
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await bookingService.deleteBooking(id);
        res.status(200).json({
            message: 'Booking deleted successfully',
            data: deletedBooking,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Error deleting booking',
            error: error.message,
        });
    }
});

module.exports = router;
