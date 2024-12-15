const Employee = require('../models/employee/employee'); // Adjust the path as per your project structure

// Service to create a new employee
const createEmployee = async (employeeData) => {
    try {
        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email: employeeData.email });
        if (existingEmployee) {
            throw new Error('Email already exists');
        }

        // Create and save a new employee
        const newEmployee = new Employee(employeeData);
        await newEmployee.save();
        return newEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all employees
const getAllEmployees = async () => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        return employees;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch employee by email
const getEmployeeByEmail = async (email) => {
    try {
        return await Employee.findOne({ email });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch employee by ID
const getEmployeeById = async (id) => {
    try {
        return await Employee.findById(id); // Fetch employee by ID
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update an employee's details
const updateEmployee = async (id, updateData) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        return updatedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete an employee
const deleteEmployee = async (id) => {
    try {
        await Employee.findByIdAndDelete(id);
        return { message: 'Employee deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeByEmail,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
