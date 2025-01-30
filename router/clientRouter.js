const express = require('express');
const router = express.Router();
const clientService = require('../services/clientService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Login route to authenticate user and return JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if client exists
        const client = await clientService.getClientByEmail(email);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, client.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log('Entered Password:', password);
console.log('Stored Hashed Password:', client.password);
console.log('Password Validity:', isPasswordValid);

        // Generate JWT token
        const token = jwt.sign(
            { id: client._id, email: client.email },
            'codicoso2023', // Replace 'your_jwt_secret' with a secure key
            { expiresIn: '8h' }
        );

        res.status(200).json({ message: 'Login successful', data: client,token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});


// Route to get client by email
router.get('/getclient/:email', authenticateToken, async (req, res) => {
    try {
        const { email } = req.params;
        
        // Fetch client by email
        const client = await clientService.getClientByEmail(email);
        
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        res.status(200).json({
            message: 'Client retrieved successfully',
            data: client,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving client',
            error: error.message,
        });
    }
});
// Route to update client by email
router.put('/updateclient/:email', authenticateToken, async (req, res) => {
    try {
        const { email } = req.params;
        const updatedData = req.body;
        const updatedClient = await clientService.updateClientByEmail(email, updatedData);
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client updated successfully', data: updatedClient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating client', error: error.message });
    }
});

// Route to handle client signup
router.post('/signup', async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData);

        // Generate a token for the new client
        const token = jwt.sign(
            { id: newClient._id, email: newClient.email }, 
            "codicoso2023", 
            { expiresIn: '8h' } // Token validity: 1 hour
        );

        res.status(201).json({
            message: 'Client registered successfully',
            data: newClient,
            token, // Include the token in the response
        });
    } catch (error) {
        // Handle specific error for email duplication
        if (error.message === 'Email already exists') {
            return res.status(409).json({
                message: 'Error registering client',
                error: 'Email already exists',
            });
        }

        res.status(400).json({
            message: 'Error registering client',
            error: error.message,
        });
    }
});
// Route to fetch all clients


router.get('/getallclients', authenticateToken, async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json({
            message: 'Clients retrieved successfully',
            data: clients,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving clients',
            error: error.message,
        });
    }
});

module.exports = router;
