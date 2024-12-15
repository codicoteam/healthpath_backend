const express = require('express');
const router = express.Router();
const familyMemberService = require('../services/familyMemberService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login route to authenticate family member and return JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if family member exists
        const familyMember = await familyMemberService.getFamilyMemberByEmail(email);
        if (!familyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, familyMember.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: familyMember._id, email: familyMember.email },
            'codicoso2023', // Replace with a secure key
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Route to handle family member signup
router.post('/signup', async (req, res) => {
    try {
        const familyMemberData = req.body;
        const newFamilyMember = await familyMemberService.createFamilyMember(familyMemberData);

        // Generate a token for the new family member
        const token = jwt.sign(
            { id: newFamilyMember._id, email: newFamilyMember.email }, 
            'codicoso2023', 
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Family member registered successfully',
            data: newFamilyMember,
            token, // Include the token in the response
        });
    } catch (error) {
        // Handle specific error for email duplication
        if (error.message === 'Email already exists') {
            return res.status(409).json({
                message: 'Error registering family member',
                error: 'Email already exists',
            });
        }

        res.status(400).json({
            message: 'Error registering family member',
            error: error.message,
        });
    }
});

// Route to fetch all family members
router.get('/getallfamilymembers', authenticateToken, async (req, res) => {
    try {
        const familyMembers = await familyMemberService.getAllFamilyMembers();
        res.status(200).json({
            message: 'Family members retrieved successfully',
            data: familyMembers,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving family members',
            error: error.message,
        });
    }
});

module.exports = router;
