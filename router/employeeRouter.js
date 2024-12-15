const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login route to authenticate user and return JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if employee exists
        const employee = await employeeService.getEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee._id, email: employee.email },
            'codicoso2023', // Replace 'your_jwt_secret' with a secure key
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Route to handle employee signup
router.post('/signup', async (req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = await employeeService.createEmployee(employeeData);

        // Generate a token for the new employee
        const token = jwt.sign(
            { id: newEmployee._id, email: newEmployee.email },
            'codicoso2023', // Replace with a secure key
            { expiresIn: '1h' } // Token validity: 1 hour
        );

        res.status(201).json({
            message: 'Employee registered successfully',
            data: newEmployee,
            token, // Include the token in the response
        });
    } catch (error) {
        // Handle specific error for email duplication
        if (error.message === 'Email already exists') {
            return res.status(409).json({
                message: 'Error registering employee',
                error: 'Email already exists',
            });
        }

        res.status(400).json({
            message: 'Error registering employee',
            error: error.message,
        });
    }
});

// Route to fetch all employees (secured)
router.get('/getallemployees', authenticateToken, async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({
            message: 'Employees retrieved successfully',
            data: employees,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving employees',
            error: error.message,
        });
    }
});

// Route to fetch employee by email (secured)
router.get('/getemployee/:email', authenticateToken, async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeByEmail(req.params.email);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            message: 'Employee retrieved successfully',
            data: employee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving employee',
            error: error.message,
        });
    }
});

// Route to fetch employee by ID (secured)
router.get('/getemployee/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            message: 'Employee retrieved successfully',
            data: employee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving employee',
            error: error.message,
        });
    }
});

// Route to update employee's details (secured)
router.put('/updateemployee/:id', authenticateToken, async (req, res) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            message: 'Employee updated successfully',
            data: updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating employee',
            error: error.message,
        });
    }
});

// Route to delete an employee (secured)
router.delete('/deleteemployee/:id', authenticateToken, async (req, res) => {
    try {
        await employeeService.deleteEmployee(req.params.id);
        res.status(200).json({
            message: 'Employee deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting employee',
            error: error.message,
        });
    }
});

module.exports = router;
