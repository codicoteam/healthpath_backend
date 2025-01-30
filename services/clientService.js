const Client = require('../models/client_schema'); // Adjust the path as per your project structure

// Service to create a new client
const createClient = async (clientData) => {
    try {
        // Check if email already exists
        const existingClient = await Client.findOne({ email: clientData.email });
        if (existingClient) {
            throw new Error('Email already exists');
        }

        // Create and save a new client
        const newClient = new Client(clientData);
        await newClient.save();
        return newClient;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all clients
const getAllClients = async () => {
    try {
        const clients = await Client.find(); // Fetch all clients from the database
        return clients;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch client by email
const getClientByEmail = async (email) => {
    try {
        return await Client.findOne({ email });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to find a client by email and update their details
const updateClientByEmail = async (email, updateData) => {
    try {
        const updatedClient = await Client.findOneAndUpdate(
            { email }, 
            updateData, 
            { new: true, runValidators: true } // Returns the updated document and applies validation
        );
        
        if (!updatedClient) {
            throw new Error('Client not found');
        }

        return updatedClient;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientByEmail,
    updateClientByEmail
};
